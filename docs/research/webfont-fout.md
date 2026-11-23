# Pretendard 웹폰트 FOUT(글자 움찔) 해결 리서치

- 조사일: 2026-11-23
- 대상: `apps/tide-admin`, `apps/tide-site`
- 근거 버전: Next.js 16.4.6, Tailwind CSS 4.3.5, `pretendard` 1.3.9(OFL-1.1), `@tide-design/foundation` 0.19.0
- 상태: 리서치만 했다. 저장소 코드는 바꾸지 않았고, 실험은 저장소 밖 임시 복사본에서 했다.

## 1. 결론

**앱별 "실제 화면 글자" subset 파일 하나를 `next/font/local`로 preload하고 `font-display: block`으로 쓴다. 그 밖의 글자는 공식 동적 subset 92개를 번들에 넣어 `swap`으로 받는다.**

| 층                | 파일                                   | 역할                          | `font-display` |
| ----------------- | -------------------------------------- | ----------------------------- | -------------- |
| 1. 화면 글자 폰트 | 앱별 woff2 1개 (admin 78KB, site 98KB) | 화면 글자 전부를 한 번에 처리 | `block`        |
| 2. 나머지 글자    | 공식 동적 subset 92개 (수정 없음)      | 데이터에 새로 나온 글자       | `swap`(원본)   |

이 조합은 앞선 후보 A(자체 호스팅 + 주요 subset preload + `block`)를 개선한 것이다. A의 방향은 맞지만, **subset 12~19개를 그대로 preload하는 부분이 병목**이었다.

세 가지 전제를 함께 받아들여야 한다.

1. 느린 망의 첫 방문에서 글자가 현재보다 약 0.3초 늦게 보인다(admin 1,534ms → 1,840~1,896ms). 대신 대체 글꼴이 보이는 시간은 1,850ms에서 0ms가 되고, 화면 안정 시점은 약 1.3초 빨라진다.
2. 명세는 `block`을 "글꼴이 있어야 페이지를 쓸 수 있는 경우의 작은 텍스트"로 한정한다. 본문에 쓰는 것은 **명세 권고를 벗어나는 선택**이다([CSS Fonts 4 §4.9](https://www.w3.org/TR/css-fonts-4/#font-display-desc)). 파일을 작게 만들어 차단 시간을 줄이는 것으로 보완한다.
3. 화면 글자 subset은 OFL상 **수정본**이라 폰트 이름을 바꿔야 한다(§3.6).

"움찔 제거"를 화면 프레임으로 확인한 브라우저는 **Chrome뿐**이다. Firefox·WebKit은 §7의 확인이 남아 있다.

## 2. 측정 결과

### 조건

- 두 앱의 프로덕션 빌드 `/`, 뷰포트 1440×900(프레임 측정은 1280×800), macOS.
- 로컬 HTTP/2 프록시가 지연과 대역폭을 흉내 냈다. Fast는 40ms·9Mbps, Slow는 150ms·1.6Mbps. HTML·CSS·JS는 Brotli로 압축했다.
- 현재 구성의 CDN 연결 비용은 첫 CSS 요청에 2 RTT를 더해 모델링했다. **실제 CDN 측정이 아니다.**
- Chrome admin은 변형별 5회, 나머지는 3회의 중앙값이다.
- 프레임 지표는 Chrome 화면 캡처에서 글자 영역의 픽셀을 최종 화면과 비교해 구했다. 임계값은 직접 정한 휴리스틱이라 절대값보다 변형 간 비교로 읽는다.

### 변형

| 기호  | 구성                                                                               |
| ----- | ---------------------------------------------------------------------------------- |
| 현재  | CDN CSS, `swap`                                                                    |
| A     | 자체 호스팅, 화면이 쓰는 subset 전부 preload, `block`                              |
| B     | A와 같되 `optional`                                                                |
| C     | A와 같되 `swap` + 대체 글꼴 메트릭 보정(macOS 기준 값)                             |
| D     | 화면 글자 subset 1개 preload + `block`, 나머지는 같은 family의 `swap` (range 겹침) |
| **E** | D와 같되 나머지를 **별도 family**로 분리 (추천 구조)                               |
| G     | D와 같되 나머지의 `unicode-range`에서 화면 글자를 뺌                               |
| Do    | D와 같되 화면 글자 subset이 `optional`                                             |
| Di    | D의 subset을 HTML에 base64로 인라인                                                |

### tide-admin `/`, Chrome, 첫 방문

| 변형  | Slow 첫 글자 | Slow 대체 글꼴 노출 | Slow 화면 안정 | Fast 대체 글꼴 노출 | Fast 화면 안정 | 폰트 파일 | 폰트 전송량 |
| ----- | -----------: | ------------------: | -------------: | ------------------: | -------------: | --------: | ----------: |
| 현재  |      1,534ms |             1,850ms |        3,916ms |                 0ms |          770ms |        12 |       309KB |
| A     |      2,893ms |                 0ms |        3,765ms |                 0ms |          839ms |        12 |       309KB |
| B     |      1,580ms |             2,183ms |        3,763ms |               367ms |          850ms |        12 |       309KB |
| C     |      1,573ms |             1,333ms |        3,758ms |                67ms |          844ms |        12 |       309KB |
| D     |      1,841ms |                 0ms |        2,574ms |                 0ms |          632ms |         1 |        78KB |
| **E** |  **1,896ms** |             **0ms** |    **2,562ms** |             **0ms** |      **624ms** |     **1** |    **78KB** |
| G     |      1,840ms |                 0ms |        2,569ms |                 0ms |          615ms |         1 |        78KB |
| Do    |        787ms |             3,200ms |        4,170ms |               450ms |          923ms |        13 |       388KB |
| Di    |        919ms |                 0ms |        2,452ms |                 0ms |          574ms | 0(인라인) | HTML에 포함 |

- **A의 반증:** A는 대체 글꼴 노출을 없애지만 Slow에서 글자가 2.9초에야 보인다. 같은 `block`이어도 D·E는 1.8~1.9초다.
- **B의 반증:** `optional`은 "교체 없음"을 기대하지만, 이 측정에서는 Slow에서 대체 글꼴이 2.2초 보인 뒤 최종 화면이 Pretendard 100%로 바뀌었다(CDP `CSS.getPlatformFontsForNode`). 원인은 확인하지 못했다.
- **C:** 메트릭 보정은 노출 시간을 줄이지 못하고, 글자 모양이 바뀌는 것도 막지 못한다.
- **Di:** Chrome의 첫 글자는 가장 빠르지만 Slow FCP가 Firefox 1,246ms → 1,942ms, WebKit 1,234ms → 1,959ms로 나빠졌다(D 대비). 문서마다 약 80KB(Brotli 후)가 캐시 없이 붙는다.

### tide-site `/`, Chrome, 첫 방문

| 변형  | Slow 첫 글자 | Slow 대체 글꼴 노출 | Slow 화면 안정 | 폰트 파일 | 폰트 전송량 |
| ----- | -----------: | ------------------: | -------------: | --------: | ----------: |
| 현재  |      3,644ms |               700ms |        4,649ms |        19 |       502KB |
| A     |      4,113ms |                 0ms |        4,696ms |        19 |       502KB |
| **E** |  **2,259ms** |             **0ms** |    **2,616ms** |     **1** |    **98KB** |

tide-site는 입장 애니메이션이 있어 위치 변화 지표를 쓸 수 없었고 캡처 프레임도 적다(8~9장). admin보다 신뢰도가 낮다.

### 다른 브라우저 (admin, Slow, 3회)

| 브라우저          | 변형 |     FCP | 폰트 파일 | 폰트 전송량 |
| ----------------- | ---- | ------: | --------: | ----------: |
| Firefox           | 현재 | 1,421ms |        24 |       618KB |
| Firefox           | E    | 1,177ms |        13 |       388KB |
| Playwright WebKit | 현재 | 1,456ms |        12 |       310KB |
| Playwright WebKit | E    | 1,265ms |         3 |       124KB |

- **Firefox는 화면 글자 subset이 있어도 공식 subset 12개를 함께 받았다.** family를 분리한 E와 range를 뺀 G 모두 같았고 원인은 확인하지 못했다. Firefox에서는 전송량 절감이 Chrome보다 작다.
- Firefox 현재 구성의 24개·618KB는 정확히 2배라 Resource Timing 중복 집계일 수 있다. 확인하지 못했다.
- Playwright WebKit은 Safari와 같지 않다.

## 3. 조사 항목별 근거

### 3.1 `font-display`

| 값         | block period               | swap period    | 근거                                                                            |
| ---------- | -------------------------- | -------------- | ------------------------------------------------------------------------------- |
| `block`    | 짧음(3초 권장)             | 무한           | [CSS Fonts 4 §4.9](https://www.w3.org/TR/css-fonts-4/#font-display-desc)        |
| `swap`     | 극히 짧음(100ms 이하 권장) | 무한           | 같은 절                                                                         |
| `fallback` | 극히 짧음                  | 짧음(3초 권장) | 같은 절                                                                         |
| `optional` | 극히 짧음                  | 없음           | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) |

- Chrome 83부터 preload + `optional`로 레이아웃 흔들림을 없앨 수 있다고 안내한다([web.dev](https://web.dev/articles/preload-optional-fonts)). 다만 이 저장소처럼 **한 화면이 여러 파일로 나뉘면** 파일별로 도착 시점이 달라, 위 측정처럼 기대대로 동작하지 않았다.
- 브라우저별 실제 block 시간은 이번에 따로 재지 않았다.

### 3.2 preload, unicode-range, preconnect, 103 Early Hints

- `preload`는 `unicode-range`를 무시한다([web.dev](https://web.dev/articles/font-best-practices)). 그래서 화면마다 글자가 다른 동적 subset을 preload하면 낭비가 생기거나 빠지는 파일이 생긴다. 파일을 하나로 합치면 이 선택 문제가 없어진다.
- 겹치는 `unicode-range`는 나중에 선언한 규칙이 먼저 검사된다([CSS Fonts 4 §4.5.1](https://www.w3.org/TR/css-fonts-4/#composite-fonts)). D는 이 순서에 의존하므로, 순서 의존이 없는 E를 고른다.
- 자체 호스팅으로 폰트가 같은 출처가 되면 CDN `preconnect`는 필요 없다.
- **103 Early Hints는 지금 쓰지 않는다.**
  - Next 16.4.6의 `dist/server`에서 `writeEarlyHints`는 `lib/mock-request.js`에만 있어, Next가 103을 보내는 경로를 찾지 못했다.
  - 대신 `next/font` preload는 최종 응답의 `Link` 헤더로 나간다(실험 빌드에서 확인).
  - Chrome은 탐색 요청에서만 지원하고, HTTP/2 이상을 권장한다([Chrome 문서](https://developer.chrome.com/docs/web-platform/early-hints)).
  - Dokploy의 Traefik이 103을 전달하는지는 확인 불가다.

### 3.3 빌드 타임 subset과 인라인

크롤링한 9개 라우트의 글자로 만든 가변 subset 크기(기본 ASCII·문장부호 포함, `wght` 축과 OpenType 기능 유지)다.

| 범위                  | 글자 수 | woff2 |
| --------------------- | ------: | ----: |
| admin 전체 라우트     |     337 |  80KB |
| site 전체 라우트      |     441 | 100KB |
| 두 앱 합침            |     496 | 109KB |
| admin, `wght` 400~700 |     337 |  60KB |

(표의 KB는 1,000바이트 기준이고, 측정 표의 78KB·98KB는 브라우저 집계값이다.)

- 현재 admin `/`는 subset 12개 309KB, site `/`는 19개 502KB를 받는다.
- `wght` 축을 줄이면 25% 더 작아지지만, tide가 쓰는 굵기 전체를 확인하지 못해 추천에서 뺐다.
- base64 인라인은 admin 107KB(Brotli 후 약 81KB)로, woff2가 이미 압축돼 있어 Brotli 이득이 거의 없다. 문서마다 반복되므로 쓰지 않는다.

### 3.4 `next/font/local` (16.4.6 소스)

경로: `node_modules/.pnpm/next@16.4.6_*/node_modules/next/dist/compiled/@next/font/dist/local/`

- `src` 배열 항목은 `path`·`weight`·`style`만 받는다. `declarations`는 호출 하나의 모든 파일에 똑같이 붙으므로(`loader.js`), **파일별 `unicode-range`는 호출을 나눠야 한다.** 92개 subset을 이 방식으로 관리하는 것은 비현실적이다.
- `declarations`로 `font-family`와 `unicode-range`를 지정할 수 있다. `src`·`font-display`·`font-weight`·`font-style`만 금지된다(`validate-local-font-function-call.js`). 실험 빌드에서 지정한 값이 CSS에 나오는 것을 확인했다.
- `preload: true`인 파일만 `.p.`가 붙은 이름으로 나오고, 응답에 `Link: rel=preload; as="font"`가 붙는다. 파일은 `Cache-Control: public, max-age=31536000, immutable`이다(실험 빌드).
- 생성 클래스는 `font-family`를 호출 시의 변수명(`b`)으로 지정했다. `declarations`로 family를 바꾸면 **`className`은 글꼴 적용에 쓸 수 없다.** 적용은 tide 폰트 스택 쪽에서 한다.
- `adjustFontFallback`은 `false`면 끄고, `'Times New Roman'`이면 serif, 그 밖에는 Arial 기준이다(`loader.js`, `get-fallback-metrics-from-font-file.js`). 평균 폭은 **라틴 소문자 문자열**로 계산하고 Arial에는 한글이 없어, **한글 대체 글꼴은 보정되지 않는다.**

### 3.5 메트릭 보정과 시스템 폰트

브라우저 지원([MDN BCD](https://github.com/mdn/browser-compat-data/blob/main/css/at-rules/font-face.json)):

| 서술자                                                     | Chrome | Firefox | Safari        |
| ---------------------------------------------------------- | -----: | ------: | ------------- |
| `size-adjust`                                              |     92 |      92 | 17            |
| `ascent-override`, `descent-override`, `line-gap-override` |     87 |      89 | **preview만** |

폰트 파일에서 직접 읽은 메트릭(em 기준, 폭은 표본 평균):

| 폰트                | 한글 폭 | 라틴 폭 | 숫자 폭 | ascent / descent |
| ------------------- | ------: | ------: | ------: | ---------------- |
| **Pretendard**      |  0.8643 |  0.4634 |  0.5844 | 0.952 / 0.241    |
| Apple SD Gothic Neo |  0.8650 |  0.4348 |  0.5283 | 0.900 / 0.300    |
| SF (시스템)         |       - |  0.4280 |  0.5778 | 0.967 / 0.211    |
| Arial               |       - |  0.4563 |  0.5562 | 0.905 / 0.212    |
| Noto Sans KR        |  0.9200 |       - |       - | 1.160 / 0.288    |

- Pretendard는 Inter, 본고딕(Source Han Sans), M PLUS 1p를 바탕으로 만들었다([공식 README](https://github.com/orioncactus/pretendard/blob/main/packages/pretendard/README.md)).
- macOS 한글 폭은 Apple SD Gothic Neo와 거의 같다. 움찔의 큰 몫은 **라틴·숫자 폭과 세로 메트릭 차이**다.
- 라틴·숫자·한글·세로 메트릭이 모두 맞는 시스템 폰트는 위 표에 없다. **폰트 스택 순서만 바꿔서는 해결되지 않는다.**
- Safari에는 세로 보정이 없고, 시스템 글꼴은 OS마다 달라 `local()` 보정값을 하나로 유지할 수 없다. `local()`은 family가 아니라 개별 폰트 이름을 찾는다([CSS Fonts 4 §4.3.3](https://www.w3.org/TR/css-fonts-4/#local-font-fallback)).
- Windows의 Malgun Gothic 메트릭은 파일이 없어 확인 불가다.

### 3.6 Pretendard 공식 권장과 라이선스

- 공식 README는 CDN의 **가변 다이나믹 서브셋**을 모던 브라우저용으로 안내한다. FOUT 대응 방식은 따로 안내하지 않는다.
- 패키지 파일 크기:

| 형식                  | 크기                   |
| --------------------- | ---------------------- |
| 가변 전체 woff2       | 2,057,688B (약 2.06MB) |
| 정적 woff2 굵기 1개   | 694,804~800,404B       |
| 가변 동적 subset 전체 | 92개, 3,080KB          |
| 정적 동적 subset 전체 | 828개, 12,016KB        |

- 가변 파일 경로는 `dist/web/variable/woff2/PretendardVariable.woff2`다. jsDelivr는 `npm/pretendard@1.3.9/...`와 `gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/...`가 200이고, `gh/.../v1.3.9/dist/...`는 404다.
- **라이선스:** Pretendard는 `Pretendard`, `Source`, `Inter`, `M PLUS 1`을 Reserved Font Name으로 둔다([LICENSE](https://github.com/orioncactus/pretendard/blob/main/LICENSE)). 전체 글자를 유지하지 않는 최적화 폰트는 원본과 기능이 같다고 보지 않으므로([OFL-FAQ 2장](https://openfontlicense.org/ofl-faq/)), 화면 글자 subset은 **이 이름들을 빼고 새 이름을 붙이며 저작권·라이선스 메타데이터는 유지**한다. 공식 subset 92개는 수정하지 않으므로 그대로 쓴다.

### 3.7 CSS Font Loading API, Incremental Font Transfer

- **CSS Font Loading API**는 널리 지원된다([MDN](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Font_Loading_API)). 하지만 JS가 실행된 뒤에야 제어할 수 있어 첫 페인트의 움찔을 막는 데 맞지 않고, 전환을 직접 관리하는 비용이 든다. 측정은 하지 않았다.
- **Incremental Font Transfer**는 W3C Candidate Recommendation Draft(2026-10-13)이고 구현 보고서가 아직 없다([W3C](https://www.w3.org/TR/IFT/)). Chrome은 [Intent to Prototype](https://groups.google.com/a/chromium.org/g/blink-dev/c/3emvPjUOtaM) 단계, Firefox는 [구현 버그가 NEW](https://bugzilla.mozilla.org/show_bug.cgi?id=1977870)다. Safari 현황은 확인 불가다. 지금 채택할 수 없다.

## 4. 후보 비교

| 후보                           | 움찔 제거             | 느린 망 동작                 | 전송량(admin `/`)        | 구현 비용 | 유지보수                  |
| ------------------------------ | --------------------- | ---------------------------- | ------------------------ | --------- | ------------------------- |
| 현재 (CDN + `swap`)            | 없음                  | 대체 글꼴 1.9초 후 교체      | 309KB                    | 없음      | 없음                      |
| A 주요 subset preload + block  | 높음                  | 글자가 2.9초까지 안 보임     | 309KB                    | 중        | 화면별 preload 목록 관리  |
| B `optional`                   | 낮음(측정)            | 대체 글꼴 2.2초 후 바뀜      | 309KB                    | 중        | A와 같음                  |
| C `swap` + 메트릭 보정         | 부분                  | 대체 글꼴 1.3초              | 309KB                    | 중        | OS별 보정값, Safari 제한  |
| **E 화면 글자 subset + block** | **높음(Chrome 확인)** | **1.9초에 최종 글꼴로 표시** | **78KB** (Firefox 388KB) | **중상**  | **글자 목록 재생성**      |
| Di 인라인                      | 높음                  | 첫 글자 가장 빠름(Chrome)    | HTML +약 80KB, 매번      | 중상      | E와 같음 + 문서 크기 증가 |
| 103 Early Hints                | 단독 효과 없음        | preload 시작만 앞당김        | 변화 없음                | 높음      | Next·프록시 지원 필요     |
| IFT                            | 해당 없음             | -                            | -                        | 불가      | 브라우저 미지원           |

## 5. 구현 개요

코드는 아직 바꾸지 않았다. 아래는 저장소 규칙에 맞춘 방향이다.

1. **의존성:** `pnpm-workspace.yaml`의 `catalog`에 `pretendard: 1.3.9`를 넣고, 두 앱의 `package.json`에 `"catalog:"`로 추가한다.
2. **나머지 글자:** 각 앱 `globals.css`에서 공식 CSS를 import하고 CDN `<link>`를 지운다. 실험 빌드에서 92개 woff2가 `.next/static/media`로 나왔다. 이 경로는 `apps/tide-admin/Dockerfile`이 이미 복사하므로 **`public/`과 달리 Dockerfile을 고칠 필요가 없다**(현재 Dockerfile은 `public/`을 복사하지 않는다).

   ```css
   @import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
   ```

   실험은 패키지 경로가 아니라 같은 CSS의 로컬 복사본으로 했다. 패키지 경로 import는 구현 때 확인한다.

3. **화면 글자 subset 생성:** 빌드된 전체 라우트의 글자를 모아 subset을 만들고 결과 woff2를 커밋한다. 폰트 내부 이름은 RFN을 피해 바꾼다(예: `Tide Critical`). Python `fonttools`가 필요하므로 CI가 아니라 **글자가 바뀔 때 수동 실행**한다.
4. **폰트 선언:** 앱마다 `src/constants/fonts/`에 woff2와 선언을 둔다(앱별로 글자가 달라 `packages`로 올리지 않는다, 규칙 2·5).

   ```ts
   import localFont from "next/font/local";

   // 화면 글자만 담은 subset. 없는 글자는 다음 family(공식 동적 subset)로 넘어간다.
   export const criticalFont = localFont({
     src: "./tide-critical.woff2",
     weight: "45 920",
     display: "block",
     preload: true,
     adjustFontFallback: false,
     variable: "--font-critical",
     declarations: [
       { prop: "font-family", value: "'Tide Critical'" },
       { prop: "unicode-range", value: "/* 생성된 글자 목록 */" },
     ],
   });
   ```

5. **폰트 스택:** 앱 `globals.css`에서 `--tide-font-sans` 맨 앞에 `"Tide Critical"`을 더한다. hex를 쓰지 않으며 tide 토큰을 유지한다. 루트 layout의 `<html>`에 `criticalFont.variable`을 붙여 폰트 CSS가 번들에 남게 한다.
6. **문서:** tide가 앱별 critical font 방식을 제공하지 않으므로 `docs/tide-gaps.md`에 적는다.
7. **누락 방지(선택):** 라우트 글자가 subset 안에 있는지 검사하는 테스트를 둔다. 빠진 글자는 깨지지 않고 `swap`으로 보이지만, 그 글자만 움찔할 수 있다.

## 6. 검증 방법

1. `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`.
2. 응답 헤더에 critical 폰트의 `Link: rel=preload`가 있고, 해당 파일이 `immutable`인지 확인한다.
3. Chrome DevTools에서 Disable cache + Slow 4G로 `/`를 녹화한다. 대체 글꼴 프레임이 없어야 한다.
4. Network에서 첫 방문의 woff2가 Chrome 기준 **1개**인지 본다.
5. CDP `CSS.getPlatformFontsForNode`로 최종 글꼴을 확인한다.
6. 실제 Safari(macOS·iOS), Firefox, Windows Chrome에서 3번을 반복한다.
7. 배포 도메인에서 HTTP/2와 실제 지연으로 다시 측정한다.
8. 임의의 새 한글이 들어간 화면에서 공식 subset이 받아지는지 본다.

## 7. 미확인 사항

- **Firefox·실제 Safari·Windows의 시각적 움찔.** 프레임 측정은 macOS Chrome만 했다.
- **Firefox가 화면 글자 subset이 있어도 공식 subset을 받는 원인**과 618KB 집계의 중복 여부.
- **Chrome에서 `optional`이 늦게 도착한 폰트로 바뀐 원인.**
- **추천 구성 그대로의 측정.** 측정한 E는 "화면 글자 family → 나머지 family" 구조지만 family 이름이 `Pretendard Variable` / `Pretendard`였다. `Tide Critical` 이름, `--tide-font-sans` 덮어쓰기, `criticalFont.variable`만으로 CSS가 유지되는지는 구현 때 확인한다.
- **`pretendard/...` 패키지 경로의 CSS import** 동작.
- **실제 운영망·실제 CDN에서의 수치.** 이번 값은 로컬 프록시 시뮬레이션이다.
- **실제 데이터가 들어올 때 화면 글자 적중률.** 지금은 목업 데이터 기준이다.
- **tide가 쓰는 굵기 전체.** 확인되면 `wght` 축을 줄여 약 25% 더 줄일 수 있다.
- **Dokploy Traefik의 103 전달 여부**, Malgun Gothic 메트릭, 브라우저별 실제 block 시간, Safari의 IFT 계획.
