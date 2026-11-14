/** 역할 */
export type MemberRole = "admin" | "editor" | "viewer";

/** 알림 채널 */
export type NotificationChannel = "email" | "push" | "sms";

/** 알림 종류 */
export type NotificationTopic = "orders" | "paymentFailures" | "weeklyReport" | "productNews";

/** 2단계 인증 방식 */
export type TwoFactorMethod = "app" | "sms" | "none";

export interface ProfileSettings {
  name: string;
  email: string;
  bio: string;
  role: MemberRole;
  /** IANA 시간대. 예: `Asia/Seoul` */
  timezone: string;
}

export interface NotificationSettings {
  channels: Record<NotificationChannel, boolean>;
  topics: NotificationTopic[];
}

export interface SecuritySettings {
  twoFactor: TwoFactorMethod;
}

/** `getSettings` 응답: 설정 화면 세 탭의 초기값 */
export interface GetSettingsResponse {
  profile: ProfileSettings;
  notifications: NotificationSettings;
  security: SecuritySettings;
}
