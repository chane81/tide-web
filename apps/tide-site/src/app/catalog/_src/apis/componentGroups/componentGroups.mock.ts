import type { ComponentGroup } from "./componentGroups.types";

/**
 * Component 35종을 쓰임새로 나눈 네 묶음. 묶음 이름은 이 사이트가 붙였고, Component 이름은 타입 선언 그대로다.
 * 설명의 사실 출처: 24×24px(tide 접근성 기준, 소개 페이지 #access), Field·Dialog 동작(docs/tide-gaps.md 「잘 맞았던 점」),
 * 서버 컴포넌트 import(소개 페이지 질문).
 */
export const componentGroupsMock: ComponentGroup[] = [
  {
    id: "actions",
    title: "누르고 옮겨 가는 7종",
    body: "행동과 이동을 맡습니다. 가장 작은 Button과 IconButton도 24×24px입니다.",
    components: ["Button", "IconButton", "Link", "Menu", "Tabs", "Pagination", "Breadcrumb"],
  },
  {
    id: "inputs",
    title: "값을 받는 11종",
    body: "Field가 label·설명·오류 문구와 required를 입력 칸에 이어 줍니다.",
    components: [
      "Field",
      "Input",
      "Textarea",
      "Select",
      "Combobox",
      "Checkbox",
      "CheckboxGroup",
      "Radio",
      "RadioGroup",
      "Switch",
      "Tag",
    ],
  },
  {
    id: "overlays",
    title: "알리고 겹치는 6종",
    body: "Dialog와 AlertDialog는 포커스를 안에 가두고, 닫으면 연 버튼으로 돌려보냅니다.",
    components: ["Alert", "Toast", "Dialog", "AlertDialog", "Popover", "Tooltip"],
  },
  {
    id: "display",
    title: "보여 주고 기다리는 11종",
    body: "Card, Badge, Typography처럼 상태가 없는 Component는 서버 컴포넌트에서 바로 씁니다.",
    components: [
      "Card",
      "Table",
      "Badge",
      "Avatar",
      "Typography",
      "Separator",
      "Accordion",
      "Progress",
      "Spinner",
      "Skeleton",
      "VisuallyHidden",
    ],
  },
];
