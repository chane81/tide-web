# tide-web

npm에 배포된 tide 디자인 시스템(`@tide-design/components`, `@tide-design/icons`)으로 대시보드 웹을 만든다. 디자인 시스템을 실제 화면에 썼을 때 어떻게 보이는지, 무엇이 부족한지 확인하는 것이 목적이다.

- 테크 스택: Next.js(App Router, Turbopack), pnpm, TypeScript, Tailwind CSS v4, oxlint, oxfmt, Vitest + React Testing Library, Recharts
- 화면: 공통 셸(사이드바·헤더·다크 테마 전환) + `/`(개요) · `/sales` · `/cards` · `/customers` · `/settings`. 데이터는 목업이다.
- 문서와 주석은 한글로 작성한다.
- 파일·폴더 배치는 `.claude/rules/app-structure.md`를 따른다(콜로케이션, 폴더 이름 `components`·`hooks`·`libs`·`constants`·`apis`, 파일 하나에 컴포넌트 하나).
- tide에 있는 UI는 다시 만들지 않는다. tide에 없어서 직접 조립하거나 덮어쓴 것은 `docs/tide-gaps.md`에 적는다.
- 색은 hex를 쓰지 않고 tide 토큰만 쓴다. 차트도 tide CSS 변수를 넘긴다(ADR 0002).
- 라이브러리 API는 설치된 버전 기준으로 확인하고 쓴다. tide API는 `node_modules/@tide-design/*`의 타입 선언을 기준으로 한다.

## 명령

```sh
pnpm dev          # 개발 서버
pnpm build
pnpm typecheck
pnpm test         # Vitest
pnpm lint         # oxlint
pnpm format       # oxfmt
```

## Agent skills

### Issue tracker

Local markdown 트래커를 `docs/progress/` 아래에 둔다. 리서치 결과는 `docs/research/`에 커밋한다. See `docs/agents/issue-tracker.md`.

### Triage labels

기본 라벨 다섯 개(`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`)를 `Status:` 줄에 쓴다. See `docs/agents/triage-labels.md`.

### Domain docs

single-context 구조: 루트에 `GLOSSARY.md`, ADR은 `docs/decisions/`. See `docs/agents/domain.md`.
