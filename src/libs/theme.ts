import { THEMES } from "@/constants/theme";

export type Theme = (typeof THEMES)[number];

/** 저장소 값이 테마 이름인지 본다. 지운 값·손으로 고친 값은 거른다. */
export function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && (THEMES as readonly string[]).includes(value);
}

/** 저장된 선택이 있으면 그것을, 없으면 운영체제 설정을 따른다. */
export function resolveTheme(stored: string | null, prefersDark: boolean): Theme {
  if (isTheme(stored)) return stored;

  return prefersDark ? "dark" : "light";
}
