/* oxlint-disable nextjs/no-html-link-for-pages -- 페이지 사이 이동은 <a>로 새로 읽는다. 키트 스크립트(system.js·moments)가 페이지를 처음 읽을 때 한 번만 붙어서, next/link 클라이언트 이동이면 새 페이지의 moment·효과가 붙지 않는다. */
/**
 * 푸터 법적 줄의 사진 출처 한 줄. 출처 이름만 적고 목록(촬영자·라이선스)은 /credits에 둔다
 * (스킬 copy.md 「Credits」, photos.mjs credits가 내준 문구 그대로).
 */
export function ShowcaseCredits() {
  return (
    <a className="credits" href="/credits">
      Photographs via Wikimedia Commons
    </a>
  );
}
