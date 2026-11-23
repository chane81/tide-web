// 전 라우트가 공통으로 쓰는 Pretendard 공식 subset 번호(실측). 안 쓰는 파일을 받지 않도록 공통분만 preload한다.
const PRELOADED_SUBSETS = [79, 82, 86, 87, 88, 89, 90, 91];

export const PRELOADED_FONT_URLS = PRELOADED_SUBSETS.map(
  (subset) => `/fonts/pretendard-1.3.9/PretendardVariable.subset.${subset}.woff2`,
);
