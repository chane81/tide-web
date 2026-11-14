/** `getCurrentUser` 응답: 로그인한 사용자(목업) */
export interface GetCurrentUserResponse {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}
