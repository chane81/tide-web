# 스펙: tide 소개 사이트

Status: ready-for-human

## Problem Statement

tide 디자인 시스템을 처음 보는 개발자에게 무엇을 주는지(Component 35종, 아이콘, 토큰, 테마, 접근성 기준)와 어떻게 설치하는지를 한 페이지로 보여 줄 곳이 없다. Storybook은 Component 하나씩 보는 곳이라 소개 페이지 역할을 못 한다.

## Solution

`apps/tide-site`에 Next.js(App Router, `output: "export"`) 한 페이지 사이트를 만든다. 구성(구역·히어로 배치)·카피·모션·검사는 design-taste-frontend 스킬에서 가져오고, 색·글꼴·반경·버튼은 tide 토큰과 tide Component를 쓴다. 화면 속 견본 UI도 그림이 아니라 실제 tide Component다. 카피는 tide README·`docs/standards`에서 온 사실만 쓴다.

## 구성

- 히어로(centred): tide Component로 그린 대시보드 창, 바탕 효과 silk-folds
- `#components`: Component 목록에서 고르면 실제 Component를 그리는 창
- `#theme`: `data-theme` 전환 견본(이 페이지의 테마를 실제로 바꿈)
- `#access`: 접근성 네 가지, 페이지와 반대 테마의 띠(moment iris-opens)
- `#principles`: tide 원칙(moment letters-assemble)
- `#install`: Next.js 설치 3단계, `#faq`: 질문, 마무리 + 푸터

## 검사

design-taste-frontend gate(`apps/tide-site/.taste-skill/`): 1라운드 `GATE: PASS`, 면제 5개(`waivers.json`, 이유 포함). 면제는 키트 규칙과 tide 우선 결정이 부딪히는 곳이다.

## 사용자가 채울 것

- 배포 도메인: `metadataBase`(canonical·공유 이미지 절대 주소)가 없다. 빌드 경고가 난다.
- 공유 이미지: `public/share.jpg`는 히어로 화면 캡처(1440×900)다. 전용 이미지로 바꿀 수 있다.
