import type { GetSettingsResponse } from "./settings.types";

export const settingsMock: GetSettingsResponse = {
  profile: {
    name: "김하늘",
    email: "haneul.kim@example.com",
    bio: "tide 디자인 시스템을 만들고 있습니다.",
    role: "admin",
    timezone: "Asia/Seoul",
  },
  notifications: {
    channels: { email: true, push: true, sms: false },
    topics: ["orders", "paymentFailures"],
  },
  security: { twoFactor: "app" },
};
