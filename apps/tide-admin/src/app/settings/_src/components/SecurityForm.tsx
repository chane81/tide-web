import { Button, Field, Radio, RadioGroup } from "@tide-design/components";
import { type FormEvent, useState } from "react";

import type { SecuritySettings, TwoFactorMethod } from "../apis/settings/settings.types";
import { TWO_FACTOR_OPTIONS } from "../constants/settingsOptions";
import { useMockSave } from "../hooks/useMockSave";
import { DeleteAccountDialog } from "./DeleteAccountDialog";
import { SettingsSection } from "./SettingsSection";

export interface SecurityFormProps {
  initialValues: SecuritySettings;
  onSaved: (values: SecuritySettings) => void;
}

function isTwoFactor(value: string): value is TwoFactorMethod {
  return TWO_FACTOR_OPTIONS.some((option) => option.value === value);
}

/** 보안 탭: 2단계 인증 방식 RadioGroup과 계정 삭제 */
export function SecurityForm({ initialValues, onSaved }: SecurityFormProps) {
  const [values, setValues] = useState(initialValues);
  const { saving, save } = useMockSave(onSaved);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void save(values);
  }

  return (
    <div className="flex flex-col gap-6">
      <SettingsSection
        titleId="security-title"
        title="2단계 인증"
        description="로그인할 때 비밀번호 말고 한 번 더 확인합니다."
      >
        <form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-6">
          <Field label="인증 방식" group>
            <RadioGroup
              name="twoFactor"
              value={values.twoFactor}
              onValueChange={(value) => {
                if (isTwoFactor(value)) setValues({ twoFactor: value });
              }}
            >
              {TWO_FACTOR_OPTIONS.map((option) => (
                <Radio key={option.value} value={option.value}>
                  <span className="flex flex-col">
                    <span>{option.label}</span>
                    <span className="text-body-sm text-muted">{option.description}</span>
                  </span>
                </Radio>
              ))}
            </RadioGroup>
          </Field>
          <div>
            <Button type="submit" loading={saving}>
              저장
            </Button>
          </div>
        </form>
      </SettingsSection>
      <SettingsSection
        titleId="danger-title"
        title="계정 삭제"
        description="계정과 모든 데이터를 지웁니다. 되돌릴 수 없습니다."
      >
        <div>
          <DeleteAccountDialog />
        </div>
      </SettingsSection>
    </div>
  );
}
