import type {
  MemberRole,
  NotificationChannel,
  NotificationTopic,
  TwoFactorMethod,
} from "../apis/settings/settings.types";

export const ROLE_OPTIONS: { value: MemberRole; label: string }[] = [
  { value: "admin", label: "관리자" },
  { value: "editor", label: "편집자" },
  { value: "viewer", label: "뷰어" },
];

/** 시간대 Combobox 항목. 글자를 쳐서 거른다. */
export const TIMEZONE_OPTIONS: { value: string; label: string }[] = [
  { value: "Pacific/Honolulu", label: "호놀룰루 (UTC−10:00)" },
  { value: "America/Los_Angeles", label: "로스앤젤레스 (UTC−08:00)" },
  { value: "America/New_York", label: "뉴욕 (UTC−05:00)" },
  { value: "Europe/London", label: "런던 (UTC+00:00)" },
  { value: "Europe/Berlin", label: "베를린 (UTC+01:00)" },
  { value: "Asia/Singapore", label: "싱가포르 (UTC+08:00)" },
  { value: "Asia/Seoul", label: "서울 (UTC+09:00)" },
  { value: "Asia/Tokyo", label: "도쿄 (UTC+09:00)" },
  { value: "Australia/Sydney", label: "시드니 (UTC+11:00)" },
];

export const CHANNEL_OPTIONS: { value: NotificationChannel; label: string; description: string }[] =
  [
    { value: "email", label: "이메일", description: "프로필의 이메일로 보냅니다." },
    { value: "push", label: "브라우저 푸시", description: "이 브라우저에 알림을 띄웁니다." },
    { value: "sms", label: "문자", description: "등록한 휴대폰 번호로 보냅니다." },
  ];

export const TOPIC_OPTIONS: { value: NotificationTopic; label: string }[] = [
  { value: "orders", label: "새 주문" },
  { value: "paymentFailures", label: "결제 실패" },
  { value: "weeklyReport", label: "주간 보고서" },
  { value: "productNews", label: "제품 소식" },
];

export const TWO_FACTOR_OPTIONS: { value: TwoFactorMethod; label: string; description: string }[] =
  [
    { value: "app", label: "인증 앱", description: "Google Authenticator 등 앱의 6자리 코드" },
    { value: "sms", label: "문자 메시지", description: "로그인할 때마다 문자로 코드를 받습니다." },
    { value: "none", label: "사용 안 함", description: "권장하지 않습니다." },
  ];
