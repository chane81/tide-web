import {
  Button,
  Combobox,
  ComboboxItem,
  Field,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@tide-design/components";
import { type FormEvent, useState } from "react";

import type { MemberRole, ProfileSettings } from "../apis/settings.types";
import { ROLE_OPTIONS, TIMEZONE_OPTIONS } from "../constants/settingsOptions";
import { useMockSave } from "../hooks/useMockSave";
import { type ProfileErrors, validateProfile } from "../libs/validateProfile";
import { SettingsSection } from "./SettingsSection";

export interface ProfileFormProps {
  initialValues: ProfileSettings;
  onSaved: (values: ProfileSettings) => void;
}

function isRole(value: string): value is MemberRole {
  return ROLE_OPTIONS.some((option) => option.value === value);
}

/**
 * 프로필 탭. 저장을 누르면 검사하고, 오류가 있으면 Field 오류로 보이고 첫 오류 칸으로 포커스를 옮긴다.
 * 한 번 저장을 시도한 뒤에는 고칠 때마다 다시 검사한다.
 */
export function ProfileForm({ initialValues, onSaved }: ProfileFormProps) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const { saving, save } = useMockSave(onSaved);

  function update(patch: Partial<ProfileSettings>) {
    const next = { ...values, ...patch };
    setValues(next);
    if (submitted) setErrors(validateProfile(next));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateProfile(values);
    setSubmitted(true);
    setErrors(nextErrors);

    const firstInvalid = (["name", "email"] as const).find((key) => nextErrors[key]);
    if (firstInvalid) {
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    void save(values);
  }

  return (
    <SettingsSection
      titleId="profile-title"
      title="프로필"
      description="다른 팀원에게 보이는 정보입니다."
    >
      {/* 검사는 앱이 하고 오류는 Field로 보인다. 브라우저 기본 말풍선은 끈다. */}
      <form noValidate onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-5">
        <Field label="이름" required error={errors.name}>
          <Input
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update({ name: event.target.value })}
          />
        </Field>
        <Field label="이메일" required error={errors.email}>
          <Input
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update({ email: event.target.value })}
          />
        </Field>
        <Field label="소개" description="프로필 카드에 보입니다. 200자까지 씁니다.">
          <Textarea
            name="bio"
            maxLength={200}
            value={values.bio}
            onChange={(event) => update({ bio: event.target.value })}
          />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="역할">
            <Select
              name="role"
              value={values.role}
              onValueChange={(role) => {
                if (isRole(role)) update({ role });
              }}
            >
              {ROLE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
          </Field>
          <Field label="시간대" description="도시 이름으로 찾습니다.">
            <Combobox
              name="timezone"
              value={values.timezone}
              onValueChange={(timezone) => {
                if (timezone) update({ timezone });
              }}
            >
              {TIMEZONE_OPTIONS.map((option) => (
                <ComboboxItem key={option.value} value={option.value}>
                  {option.label}
                </ComboboxItem>
              ))}
            </Combobox>
          </Field>
        </div>
        <div>
          <Button type="submit" loading={saving}>
            저장
          </Button>
        </div>
      </form>
    </SettingsSection>
  );
}
