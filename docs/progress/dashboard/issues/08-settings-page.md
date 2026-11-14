# 08: 설정 화면 (`/settings`)

Status: ready-for-agent
Blocked by: 02
Spec: [../spec.md](../spec.md) (User Stories 56–62)

## What to build

tide 폼 컴포넌트를 한 화면에서 확인하는 설정 화면. 프로필·알림·보안 탭, client 검증, 저장 Toast, 계정 삭제 확인. 저장은 목업이다.

## Acceptance criteria

- [ ] tide Tabs로 프로필·알림·보안을 나눈다.
- [ ] 프로필: 이름·이메일 Input, 소개 Textarea, 역할 Select, 시간대 Combobox. 초기값은 `apis/` 함수로 읽는다.
- [ ] 이름이 비었거나 이메일 형식이 틀리면 tide Field 오류 표시로 문구가 보인다(RTL 테스트).
- [ ] 알림: 채널 Switch, 알림 종류 CheckboxGroup.
- [ ] 보안: 2단계 인증 방식 RadioGroup.
- [ ] 저장을 누르면 잠시 뒤 저장 완료 Toast가 뜬다(RTL 테스트).
- [ ] 계정 삭제는 tide AlertDialog 확인을 거친다.
- [ ] 검사 명령 통과.

## Comments
