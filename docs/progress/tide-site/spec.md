# 스펙: tide 소개 사이트

Status: ready-for-human

## Problem Statement

tide 디자인 시스템을 처음 보는 개발자에게 무엇을 주는지(Component 35종, 아이콘, 토큰, 테마, 접근성 기준)와 어떻게 설치하는지를 한 페이지로 보여 줄 곳이 없다. Storybook은 Component 하나씩 보는 곳이라 소개 페이지 역할을 못 한다.

## Solution

`apps/tide-site`에 Next.js(App Router, Cache Components) 사이트를 만든다. 처음엔 정적 내보내기 한 페이지였고, 지금은 라우트마다 렌더 정책을 정한다(`/`·`/showcase`·`/catalog` 정적, `/stats` 요청마다). 구성(구역·히어로 배치)·카피·모션·검사는 design-taste-frontend 스킬에서 가져오고, 색·글꼴·반경·버튼은 tide 토큰과 tide Component를 쓴다. 화면 속 견본 UI도 그림이 아니라 실제 tide Component다. 카피는 tide README·`docs/standards`에서 온 사실만 쓴다.

## 구성

- 히어로(centred): tide Component로 그린 대시보드 창, 바탕 효과 silk-folds
- `#components`: Component 목록에서 고르면 실제 Component를 그리는 창
- `#theme`: `data-theme` 전환 견본(이 페이지의 테마를 실제로 바꿈)
- `#access`: 접근성 네 가지, 페이지와 반대 테마의 띠(moment iris-opens)
- `#principles`: tide 원칙(moment letters-assemble)
- `#install`: Next.js 설치 3단계, `#faq`: 질문, 마무리 + 푸터

## 페이지

| 주소        | 내용                                                                                        | 렌더(빌드 표시)                                        |
| ----------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `/`         | 소개(`app/(home)`), 위 구성                                                                 | ○ 기본 프리렌더                                        |
| `/showcase` | 빛 번짐 판 위에 뜬 흰 카드(실제 tide 조각·tide 사실), 사진 없음, moment word-highlight      | ○ 기본 프리렌더                                        |
| `/catalog`  | 패키지 3종 카드 + Component 35종 네 묶음(moment pinned-chapters), 데이터는 `_src/apis` 목업 | ○ `'use cache'` + `cacheLife('days')`(api 함수 안)     |
| `/stats`    | npm 최신 버전·지난 7일 다운로드(moment liquid-type)                                         | ◐ `connection()`(api 함수 안) + `<Suspense>`(Skeleton) |

## 바뀐 결정

- 기본 테마 dark → **light**(사용자 요청). `themeColor`는 tide light canvas(`#ffffff`).
- `#access` 띠 rhythm dark-band → **surface-pairs**(사용자 요청): 반대 테마로 뒤집지 않고 `ground-surface` + tide primary·info 토큰의 옅은 빛. 반대 테마 스크립트·`InverseThemeSync`는 지웠다. moment iris-opens는 `from: base` 그대로.
- 히어로 바탕: 배정 효과 silk-folds → 사용자 참고 사이트(밝은 바탕 위 파랑~하늘색 빛)에 맞춰 gradient-mesh를 시도했으나, 키트 셰이더가 4:1로 넓은 히어로 창에서 seed에 따라 검은 구멍을 그려 효과 없이 tide 토큰의 정지 CSS 빛으로 바꿨다. 창 오른쪽 아래에 tide Progress·Badge로 만든 보조 카드(1280px 미만 숨김).

- `/showcase`: 사진(대역 4장)과 `/credits`를 빼고 빛 번짐 판 위 흰 카드 구성으로 바꿨다(사용자 요청, 참고: 밝은 B2B 사이트의 후기 카드 장면). 후기·인물 이름 대신 출처 라벨(패키지 이름·문서 항목).
- 보라 사용: 사용자가 스킬의 「never violet」 규칙에 예외를 뒀다(2026-11-14). tide `--tide-purple-*` 토큰만 쓴다.

- 전 라우트 배경: 흰 바탕만 쓰지 않고 다색 메시(코랄·주황·노랑·파랑·보라)를 정지 CSS로 깐다(사용자 요청, 참고: 밝은 에이전시 사이트). 히어로는 진하게, 아래 구역은 옅게 a·b·c 세 조합을 돌려 쓴다. 공통 CSS는 `globals.css`의 `--mesh-*`·`--glow-ground` 한 곳.

- 히어로 판 제거: 네 라우트 히어로 모두 안쪽 둥근 판(빛 바탕 판) 없이 라우트 메시 위에 창·카드·조각이 바로 뜬다. 쇼케이스 히어로 카드는 아래쪽이 바탕으로 사라지고(mask), 판의 고리는 둘째 화면 판 두 장에서도 뺐다(판 두 장은 유지). 사용자 요청.

## 검사

design-taste-frontend gate(`apps/tide-site/.taste-skill/`): `next build && next start --port 3021`에 URL로 돌린다(`gate.mjs --start http://localhost:3021/<route> --new` 후 `gate.mjs <url>`). 네 페이지 모두 `GATE: PASS`, 면제 4개(`waivers.json`, 이유 포함). 면제는 키트 규칙과 tide 우선 결정이 부딪히는 곳이다.

## 사용자가 채울 것

- 배포 도메인: `metadataBase`(canonical·공유 이미지 절대 주소)가 없다. 빌드 경고가 난다.
- 공유 이미지: `public/share.jpg`는 예전(dark) 히어로 화면 캡처(1440×900)다. light 기본에 맞는 전용 이미지로 바꿀 수 있다. 모든 페이지가 같은 그림을 쓴다.
