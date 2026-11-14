# 04: 개요 화면 (`/`)

Status: ready-for-agent
Blocked by: 02
Spec: [../spec.md](../spec.md) (User Stories 24–30, 63)

## What to build

개요 화면 전체를 목업 데이터로 완성한다. 기간 탭에 따라 핵심 지표(MRR)와 보조 지표, 라인 차트가 바뀐다. 이 티켓에서 데이터 읽기(`apis/`), 포맷·증감률 가공(`libs/`), tide 토큰으로 색을 칠하는 Recharts 차트 래퍼가 처음 생긴다.

## Acceptance criteria

- [ ] 개요 지표는 `apis/` 함수로만 읽고, 목업은 결정적이다(두 번 불러도 같음, 단위 테스트).
- [ ] 포맷(통화·퍼센트·날짜)과 증감률·방향(증가·감소·같음) 판정은 순수 함수이고 단위 테스트가 있다.
- [ ] 기간 Tabs(12개월·30일·7일·24시간)를 바꾸면 지표 숫자와 차트가 바뀐다(RTL 테스트).
- [ ] 증감률은 tide Badge로, 증가는 success·감소는 danger 색이다.
- [ ] MRR 라인 차트는 Recharts이고 색·격자·축 글자색이 tide CSS 변수에서 온다(hex 없음). 차트 래퍼만 `'use client'`.
- [ ] 바로가기 카드 2개, 상위 회원 목록(Avatar, 가입일, 온라인 표시).
- [ ] 라우트 로딩 시 tide Skeleton으로 카드 모양 자리를 보인다.
- [ ] 차트 색 처리 방식과 아쉬운 점을 `docs/tide-gaps.md`에 기록한다.
- [ ] 검사 명령 통과.

## Comments
