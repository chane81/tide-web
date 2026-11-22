import { Button, Checkbox, CheckboxGroup, Field, Switch } from "@tide-design/components";
import { type FormEvent, useState } from "react";

import type { NotificationSettings, NotificationTopic } from "../apis/settings/settings.types";
import { CHANNEL_OPTIONS, TOPIC_OPTIONS } from "../constants/settingsOptions";
import { useMockSave } from "../hooks/useMockSave";
import { SettingsSection } from "./SettingsSection";

export interface NotificationsFormProps {
  initialValues: NotificationSettings;
  onSaved: (values: NotificationSettings) => void;
}

/** 알림 탭: 채널 Switch와 알림 종류 CheckboxGroup */
export function NotificationsForm({ initialValues, onSaved }: NotificationsFormProps) {
  const [values, setValues] = useState(initialValues);
  const { saving, save } = useMockSave(onSaved);

  function toggleTopic(topic: NotificationTopic, checked: boolean) {
    setValues((prev) => ({
      ...prev,
      topics: checked ? [...prev.topics, topic] : prev.topics.filter((t) => t !== topic),
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void save(values);
  }

  return (
    <SettingsSection
      titleId="notifications-title"
      title="알림"
      description="어디로, 어떤 알림을 받을지 고릅니다."
    >
      <form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-6">
        <div className="flex flex-col gap-4">
          {CHANNEL_OPTIONS.map((channel) => (
            <Field key={channel.value} label={channel.label} description={channel.description}>
              <Switch
                name={`channel-${channel.value}`}
                checked={values.channels[channel.value]}
                onChange={(event) => {
                  const checked = event.target.checked;
                  setValues((prev) => ({
                    ...prev,
                    channels: { ...prev.channels, [channel.value]: checked },
                  }));
                }}
              />
            </Field>
          ))}
        </div>
        <Field label="알림 종류" description="고른 종류만 보냅니다." group>
          <CheckboxGroup>
            {TOPIC_OPTIONS.map((topic) => (
              <Checkbox
                key={topic.value}
                name="topics"
                value={topic.value}
                checked={values.topics.includes(topic.value)}
                onChange={(event) => toggleTopic(topic.value, event.target.checked)}
              >
                {topic.label}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </Field>
        <div>
          <Button type="submit" loading={saving}>
            저장
          </Button>
        </div>
      </form>
    </SettingsSection>
  );
}
