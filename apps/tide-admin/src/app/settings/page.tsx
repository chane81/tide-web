import type { Metadata } from "next";

import { PageHeader } from "@/components/PageHeader";

import { getSettings } from "./_src/apis/settings.api";
import { SettingsTabs } from "./_src/components/SettingsTabs";

export const metadata: Metadata = { title: "설정" };

export default async function Page() {
  const settings = await getSettings();

  return (
    <>
      <PageHeader title="설정" description="프로필, 알림, 보안 설정을 바꿉니다." />
      <SettingsTabs initialSettings={settings} />
    </>
  );
}
