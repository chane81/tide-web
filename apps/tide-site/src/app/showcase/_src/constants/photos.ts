/**
 * /showcase 사진. 모두 Wikimedia Commons의 대역(stand-in) 사진이다(design-taste-frontend photos.mjs search·fetch).
 * tide를 쓰는 고객이나 팀이 아니다: 화면을 만드는 일의 장면만 보여 주고, 사람 얼굴·다른 회사 이름이 읽히는 사진은 뺐다.
 * 출처·라이선스는 public/img/credits.json과 푸터 credits 한 줄에 있다. 실제 작업 사진으로 바꿀 자리다.
 */
export interface ShowcasePhoto {
  id: string;
  alt: string;
  /** 큰 파일 이름(1280 너비) */
  src: string;
  srcSet: string;
}

const photo = (id: string, largest: string, alt: string): ShowcasePhoto => ({
  id,
  alt,
  src: `/img/photo-${id}${largest}.jpg`,
  srcSet: `/img/photo-${id}-500.jpg 500w, /img/photo-${id}-960.jpg 960w, /img/photo-${id}${largest}.jpg 1280w`,
});

export const HERO_PHOTO = photo(
  "f61361651",
  "",
  "나무 책상 위 종이에 화면 뼈대를 연필로 그리는 손, 옆에 노트북과 머그잔",
);

export const STEP_PHOTOS = {
  sketch: photo(
    "f39636530",
    "",
    "나무 탁자에 펼친 종이 몇 장, 앞장에 표와 버튼 칸을 그린 웹 화면 스케치",
  ),
  code: photo("f95306325", "", "밝은 나무 책상 위에서 위로 내려다본 노트북, 커피 잔, 연필 두 자루"),
  check: photo("f186238644", "", "흰 책상 위 흰 키보드를 가까이 찍은 사진, 뒤로 꺼진 모니터"),
} as const;
