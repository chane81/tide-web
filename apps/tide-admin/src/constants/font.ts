/**
 * Pretendard 가변 dynamic subset(jsDelivr). 버전은 고정한다.
 * 조각 URL을 preload하므로 버전을 바꾸면 조각 번호·범위·경로가 그대로인지 다시 확인한다.
 */
const PRETENDARD_CDN_ROOT = "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9";

export const PRETENDARD_ORIGIN = "https://cdn.jsdelivr.net";

export const PRETENDARD_STYLESHEET_HREF = `${PRETENDARD_CDN_ROOT}/dist/web/variable/pretendardvariable-dynamic-subset.min.css`;

/**
 * 첫 화면을 그리기 전에 미리 받을 subset 조각.
 * 번호가 클수록 자주 쓰는 글자를 담는다(91번 = 라틴·숫자·기본 문장부호, 84~90번 = 자주 쓰는 한글).
 * 앱 문구가 걸치는 조각을 세어 위에서부터 골랐다(조각당 약 20~37KB, 합계 약 200KB).
 * 나머지 조각은 CSS의 unicode-range대로 필요할 때 받는다.
 */
const PRELOAD_SUBSET_INDEXES = [91, 90, 89, 88, 87, 86, 85, 84];

/**
 * min.css가 woff2를 `../../../packages/pretendard/dist/...`로 가리키므로 그 경로를 그대로 쓴다.
 * preload URL이 CSS가 요청하는 URL과 한 글자라도 다르면 같은 파일을 두 번 받는다.
 */
export const PRETENDARD_PRELOAD_HREFS = PRELOAD_SUBSET_INDEXES.map(
  (index) =>
    `${PRETENDARD_CDN_ROOT}/packages/pretendard/dist/web/variable/woff2-dynamic-subset/PretendardVariable.subset.${index}.woff2`,
);
