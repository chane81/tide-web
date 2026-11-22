import { portraitUrl } from "@/libs/portraitUrl";

import type { GetCurrentUserResponse } from "./currentUser.types";

export const currentUserMock: GetCurrentUserResponse = {
  id: "user-1",
  name: "김하늘",
  email: "haneul.kim@example.com",
  avatarUrl: portraitUrl("women", 68),
};
