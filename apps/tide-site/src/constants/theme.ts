/** 소개 사이트가 테마 선택을 저장하는 localStorage 키(대시보드와 따로 둔다) */
export const THEME_STORAGE_KEY = "tide-site-theme";

/**
 * 첫 방문 테마. 디자인 배정(design-taste-frontend)은 어두운 바탕을 냈지만 사용자가 밝은 바탕을 골라 light로 연다.
 * 저장된 선택이 있으면 그 값을 따른다.
 */
export const DEFAULT_THEME = "light" as const;
