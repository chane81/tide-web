import type { ProfileSettings } from "../apis/settings.types";

export type ProfileErrors = Partial<Record<"name" | "email", string>>;

/** 흔한 오타만 거르는 느슨한 형식 검사(로컬@도메인.최상위). 실제 도달 여부는 확인하지 않는다. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** 프로필 입력 검사. 문제가 없으면 빈 객체다. */
export function validateProfile(values: Pick<ProfileSettings, "name" | "email">): ProfileErrors {
  const errors: ProfileErrors = {};
  const email = values.email.trim();

  if (values.name.trim() === "") errors.name = "이름을 입력하세요.";
  if (email === "") errors.email = "이메일을 입력하세요.";
  else if (!EMAIL_PATTERN.test(email))
    errors.email = "이메일 형식이 올바르지 않습니다. 예: name@example.com";

  return errors;
}
