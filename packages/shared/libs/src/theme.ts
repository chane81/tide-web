/** tide가 `<html data-theme>`로 받는 테마 이름 */
export const THEMES: readonly ["light", "dark"] = ["light", "dark"];

export type Theme = (typeof THEMES)[number];

/** 저장소 값이 테마 이름인지 본다. 지운 값·손으로 고친 값은 거른다. */
export function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && (THEMES as readonly string[]).includes(value);
}

/**
 * 첫 방문 테마를 정한다. 저장된 선택이 있으면 그것을, 없으면 `defaultTheme`을, 그것도 없으면 운영체제 설정을 따른다.
 * tide는 운영체제 설정을 읽지 않으므로 어느 쪽을 따를지는 앱이 정한다.
 */
export function resolveTheme(
  stored: string | null,
  prefersDark: boolean,
  defaultTheme?: Theme,
): Theme {
  if (isTheme(stored)) return stored;
  if (defaultTheme) return defaultTheme;

  return prefersDark ? "dark" : "light";
}
