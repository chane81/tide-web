/** 목업 인물 사진의 성별 폴더 */
export type PortraitGender = "men" | "women";

/**
 * 목업용 실제 인물 사진 주소(randomuser.me). 같은 인자면 늘 같은 사진이다.
 * 사진을 불러오지 못하면 tide Avatar가 fallback 아이콘을 보여 준다.
 * @param index 0~99. 범위를 넘으면 100으로 나눈 나머지를 쓴다.
 */
export function portraitUrl(gender: PortraitGender, index: number): string {
  const n = ((Math.trunc(index) % 100) + 100) % 100;

  return `https://randomuser.me/api/portraits/${gender}/${n}.jpg`;
}
