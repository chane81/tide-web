/** 회원 한 명 */
export interface Member {
  id: string;
  name: string;
  email: string;
  /** 가입 시각(ISO 8601, UTC) */
  joinedAt: string;
  online: boolean;
  avatarUrl?: string;
}

/** `getTopMembers` 응답 */
export interface GetTopMembersResponse {
  items: Member[];
}
