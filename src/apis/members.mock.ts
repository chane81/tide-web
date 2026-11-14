import type { Member } from "./members.types";

export const topMembersMock: Member[] = [
  {
    id: "m-1",
    name: "박서연",
    email: "seoyeon.park@example.com",
    joinedAt: "2024-03-02T09:00:00.000Z",
    online: true,
  },
  {
    id: "m-2",
    name: "이도윤",
    email: "doyun.lee@example.com",
    joinedAt: "2024-07-19T09:00:00.000Z",
    online: false,
  },
  {
    id: "m-3",
    name: "최지우",
    email: "jiwoo.choi@example.com",
    joinedAt: "2025-01-08T09:00:00.000Z",
    online: true,
  },
  {
    id: "m-4",
    name: "정민준",
    email: "minjun.jung@example.com",
    joinedAt: "2025-05-27T09:00:00.000Z",
    online: false,
  },
  {
    id: "m-5",
    name: "강하은",
    email: "haeun.kang@example.com",
    joinedAt: "2025-10-11T09:00:00.000Z",
    online: true,
  },
];
