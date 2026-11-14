"use client";

import { Tab, TabList, TabPanel, Tabs } from "@tide-design/components";
import { useState } from "react";

import type { GetSettingsResponse } from "../apis/settings.types";
import { NotificationsForm } from "./NotificationsForm";
import { ProfileForm } from "./ProfileForm";
import { SecurityForm } from "./SecurityForm";

export interface SettingsTabsProps {
  initialSettings: GetSettingsResponse;
}

/**
 * 프로필·알림·보안 탭. tide TabPanel은 고른 탭만 그리므로 저장한 값은 여기서 들고 있다가
 * 탭을 다시 열 때 초기값으로 넘긴다(저장하지 않은 편집은 탭을 옮기면 버려진다).
 */
export function SettingsTabs({ initialSettings }: SettingsTabsProps) {
  const [settings, setSettings] = useState(initialSettings);

  return (
    <Tabs defaultValue="profile" className="flex flex-col gap-6">
      <TabList aria-label="설정" className="self-start">
        <Tab value="profile">프로필</Tab>
        <Tab value="notifications">알림</Tab>
        <Tab value="security">보안</Tab>
      </TabList>
      <TabPanel value="profile">
        <ProfileForm
          initialValues={settings.profile}
          onSaved={(profile) => setSettings((prev) => ({ ...prev, profile }))}
        />
      </TabPanel>
      <TabPanel value="notifications">
        <NotificationsForm
          initialValues={settings.notifications}
          onSaved={(notifications) => setSettings((prev) => ({ ...prev, notifications }))}
        />
      </TabPanel>
      <TabPanel value="security">
        <SecurityForm
          initialValues={settings.security}
          onSaved={(security) => setSettings((prev) => ({ ...prev, security }))}
        />
      </TabPanel>
    </Tabs>
  );
}
