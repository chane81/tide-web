#!/usr/bin/env python3
"""앱 빌드 산출물에 쓰인 글자만 담은 critical 폰트와 next/font 선언을 만든다.

사용법: 앱을 빌드한 뒤 저장소 루트에서 실행한다.
    pip install fonttools brotli
    pnpm build
    pnpm fonts:critical

화면 문구나 목업 데이터의 글자가 바뀌었을 때 수동으로 실행하고 결과를 커밋한다.
빠진 글자는 깨지지 않고 공식 동적 subset(swap)으로 표시된다.
"""

import re
import sys
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
APPS = ("tide-admin", "tide-site")
FAMILY = "Tide Critical"
POSTSCRIPT_NAME = "TideCritical"

# OFL Reserved Font Name. 수정본의 이름에 남으면 안 된다.
RESERVED_NAMES = re.compile(r"pretendard|source|inter\b|m plus 1", re.IGNORECASE)
# 저작권(0)·라이선스(13, 14)는 OFL에 따라 그대로 둔다.
KEPT_NAME_IDS = {0, 13, 14}
RENAMED_NAME_IDS = {1: FAMILY, 3: f"{POSTSCRIPT_NAME}-Variable", 4: FAMILY, 6: POSTSCRIPT_NAME}
RENAMED_NAME_IDS |= {16: FAMILY, 25: POSTSCRIPT_NAME}

# 빌드 산출물에 안 보여도 입력값·숫자 표시에 쓰일 수 있는 기본 글자.
# U+00A0(줄바꿈 없는 공백)은 isprintable()이 거짓이라 문서 수집에 안 잡히므로 여기서 넣는다.
BASE_CHARS = {chr(code) for code in range(0x20, 0x7F)} | set("\u00a0·…—–‘’“”₩←↑→↓")

HANGUL = re.compile(r"[가-힣]")
UNICODE_ESCAPE = re.compile(r"\\u([0-9a-fA-F]{4})")


def decode_escapes(text: str) -> str:
    """번들러가 \\uXXXX로 바꾼 글자를 되돌린다."""
    return UNICODE_ESCAPE.sub(lambda match: chr(int(match.group(1), 16)), text)


def collect_chars(app_dir: Path) -> set[str]:
    """주석이 제거된 빌드 산출물에서 글자를 모은다."""
    next_dir = app_dir / ".next"
    if not (next_dir / "BUILD_ID").exists():
        sys.exit(f"{app_dir.name} 빌드 산출물이 없다. pnpm build를 먼저 실행한다.")

    chars = set(BASE_CHARS)
    # 한글은 JS까지 본다. client에서만 그려지는 문구와 목업 데이터가 여기에 있다.
    for base in (next_dir / "server", next_dir / "static" / "chunks"):
        for path in base.rglob("*"):
            if path.suffix in {".js", ".html", ".rsc"} and path.is_file():
                text = decode_escapes(path.read_text(encoding="utf-8", errors="ignore"))
                chars.update(HANGUL.findall(text))

    # 한글 외 기호는 라이브러리 문자열이 섞이지 않도록 실제 문서에서만 모은다.
    for path in (next_dir / "server" / "app").rglob("*"):
        if path.suffix in {".html", ".rsc"} and path.is_file():
            text = decode_escapes(path.read_text(encoding="utf-8", errors="ignore"))
            chars.update(char for char in text if ord(char) > 0x7F and char.isprintable())
    return chars


def rename_font(font: TTFont) -> None:
    """OFL Reserved Font Name을 뺀 새 이름을 붙인다."""
    name_table = font["name"]
    for record in list(name_table.names):
        if record.nameID in RENAMED_NAME_IDS:
            record.string = RENAMED_NAME_IDS[record.nameID]
        elif record.nameID not in KEPT_NAME_IDS and RESERVED_NAMES.search(record.toUnicode()):
            name_table.removeNames(nameID=record.nameID)


def build_font(source: Path, output: Path, chars: set[str]) -> set[int]:
    """가변 축과 OpenType 기능을 유지한 woff2 subset을 쓰고 담긴 코드포인트를 돌려준다."""
    font = TTFont(source)
    available = set(font.getBestCmap())
    codepoints = {ord(char) for char in chars} & available

    options = subset.Options()
    options.layout_features = ["*"]
    options.name_IDs = ["*"]
    options.notdef_outline = True
    subsetter = subset.Subsetter(options)
    subsetter.populate(unicodes=codepoints)
    subsetter.subset(font)

    rename_font(font)
    font.flavor = "woff2"
    output.parent.mkdir(parents=True, exist_ok=True)
    font.save(output)
    return codepoints


def to_unicode_range(codepoints: set[int]) -> str:
    """연속된 코드포인트를 CSS unicode-range 문자열로 묶는다."""
    ranges: list[tuple[int, int]] = []
    for code in sorted(codepoints):
        if ranges and ranges[-1][1] == code - 1:
            ranges[-1] = (ranges[-1][0], code)
        else:
            ranges.append((code, code))
    return ",".join(
        f"U+{start:X}" if start == end else f"U+{start:X}-{end:X}" for start, end in ranges
    )


def write_declaration(output: Path, unicode_range: str) -> None:
    """next/font는 인자를 정적으로 분석하므로 값이 박힌 선언 파일을 만든다."""
    output.write_text(
        f"""// scripts/generate-critical-font.py가 만든 파일이다. 직접 고치지 않는다.
import localFont from "next/font/local";

// 화면 글자만 담은 subset. 없는 글자는 다음 family(공식 동적 subset)로 넘어간다.
export const criticalFont = localFont({{
  src: "./tide-critical.woff2",
  weight: "45 920",
  display: "block",
  preload: true,
  adjustFontFallback: false,
  variable: "--font-critical",
  declarations: [
    {{ prop: "font-family", value: "'{FAMILY}'" }},
    {{
      prop: "unicode-range",
      value:
        "{unicode_range}",
    }},
  ],
}});
""",
        encoding="utf-8",
    )


def main() -> None:
    for app in APPS:
        app_dir = ROOT / "apps" / app
        source = (
            app_dir
            / "node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2"
        )
        fonts_dir = app_dir / "src" / "constants" / "fonts"
        font_path = fonts_dir / "tide-critical.woff2"

        codepoints = build_font(source, font_path, collect_chars(app_dir))
        write_declaration(fonts_dir / "criticalFont.ts", to_unicode_range(codepoints))

        size = font_path.stat().st_size / 1000
        print(f"{app}: {len(codepoints)}글자, {size:.0f}KB")


if __name__ == "__main__":
    main()
