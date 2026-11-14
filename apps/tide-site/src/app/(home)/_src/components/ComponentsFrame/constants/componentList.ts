/** 창 왼쪽 목록. tide 0.11.4에 있는 Component만 적는다. 한 줄 설명은 그 Component가 하는 일이다. */
export const COMPONENT_LIST = [
  { name: "Button", summary: "주요 행동을 누릅니다" },
  { name: "Badge", summary: "상태를 짧은 글자로 보입니다" },
  { name: "Switch", summary: "켜고 끄는 설정을 바로 바꿉니다" },
  { name: "Tabs", summary: "같은 자리의 화면을 나눕니다" },
  { name: "Select", summary: "목록에서 하나를 고릅니다" },
  { name: "Checkbox", summary: "여러 항목을 함께 고릅니다" },
  { name: "Progress", summary: "얼마나 찼는지 보입니다" },
  { name: "Alert", summary: "화면 안에서 알립니다" },
  { name: "Avatar", summary: "사람을 사진이나 글자로 보입니다" },
  { name: "Skeleton", summary: "읽는 동안 자리를 잡습니다" },
] as const;

export type ComponentName = (typeof COMPONENT_LIST)[number]["name"];
