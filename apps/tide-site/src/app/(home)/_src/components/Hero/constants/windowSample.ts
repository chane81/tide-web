/** 히어로 창에 그리는 대시보드 견본 값. tide-dashboard 개요·고객 화면을 줄인 것이다. */
export const SAMPLE_METRICS = [
  { label: "MRR", value: "$48,230", change: "+25%" },
  { label: "유료 회원", value: "2,041", change: "+58.5%" },
  { label: "메일 열람률", value: "48.2%", change: "+9.3%" },
] as const;

export const SAMPLE_CUSTOMERS = [
  {
    name: "한지아",
    email: "jia.han35@example.com",
    status: "휴면",
    color: "warning",
    amount: "$5,045",
  },
  {
    name: "장하은",
    email: "haeun.jang33@example.com",
    status: "휴면",
    color: "warning",
    amount: "$3,200",
  },
  {
    name: "임도윤",
    email: "doyun.lim34@example.com",
    status: "활성",
    color: "success",
    amount: "$1,735",
  },
  {
    name: "조하은",
    email: "haeun.cho43@example.com",
    status: "활성",
    color: "success",
    amount: "$200",
  },
  {
    name: "윤민준",
    email: "minjun.yoon20@example.com",
    status: "휴면",
    color: "warning",
    amount: "$848",
  },
] as const;

export const SAMPLE_NAV = ["개요", "매출", "카드", "고객", "설정"] as const;

/** 창 오른쪽 아래에 겹치는 보조 카드의 견본 값: MRR(위 SAMPLE_METRICS와 같은 값)과 목표 */
export const SAMPLE_MRR_GOAL = {
  value: "$48,230",
  goal: "$60,000",
  percent: 80,
  change: "+25%",
} as const;
