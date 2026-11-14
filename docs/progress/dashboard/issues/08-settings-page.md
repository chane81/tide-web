# 08: 설정 화면 (`/settings`)

Status: done
Blocked by: 02
Spec: [../spec.md](../spec.md) (User Stories 56–62)

## What to build

tide 폼 컴포넌트를 한 화면에서 확인하는 설정 화면. 프로필·알림·보안 탭, client 검증, 저장 Toast, 계정 삭제 확인. 저장은 목업이다.

## Acceptance criteria

- [x] tide Tabs로 프로필·알림·보안을 나눈다.
- [x] 프로필: 이름·이메일 Input, 소개 Textarea, 역할 Select, 시간대 Combobox. 초기값은 `apis/` 함수로 읽는다.
- [x] 이름이 비었거나 이메일 형식이 틀리면 tide Field 오류 표시로 문구가 보인다(RTL 테스트).
- [x] 알림: 채널 Switch, 알림 종류 CheckboxGroup.
- [x] 보안: 2단계 인증 방식 RadioGroup.
- [x] 저장을 누르면 잠시 뒤 저장 완료 Toast가 뜬다(RTL 테스트).
- [x] 계정 삭제는 tide AlertDialog 확인을 거친다.
- [x] 검사 명령 통과.

## Comments

### 2026-11-14 구현 결과

구성(`src/app/settings/`, 라우트 하나에서만 쓰여 `_src`):

- 데이터: `_src/apis/settings.{types,mock,api}.ts` — `getSettings`(프로필·알림·보안 초기값, `'use cache'`라 프리렌더).
- `SettingsTabs`(client): tide Tabs. TabPanel은 고른 탭만 그리므로 저장한 값은 여기서 들고 있다가 탭을 다시 열 때 초기값으로 넘긴다(저장하지 않은 편집은 탭을 옮기면 버려진다).
- `ProfileForm`: 이름·이메일 Input, 소개 Textarea, 역할 Select, 시간대 Combobox. 저장 시 `validateProfile`(`_src/libs/`, 단위 테스트)로 검사해 `Field error`로 보이고 첫 오류 칸으로 포커스. 한 번 제출한 뒤에는 고칠 때마다 다시 검사. 브라우저 기본 말풍선은 `noValidate`로 끔.
- `NotificationsForm`: 채널 Switch 3개(Field 안), 알림 종류 `Field group` + CheckboxGroup.
- `SecurityForm`: 2단계 인증 `Field group` + RadioGroup, 계정 삭제 섹션(`DeleteAccountDialog`, tide AlertDialog).
- 저장: `_src/hooks/useMockSave.ts`(600ms 뒤 `onSaved` + 저장 완료 Toast). 세 폼이 함께 쓴다.
- 다섯 화면이 모두 채워져 `src/components/PageBodyPlaceholder.tsx`를 지웠다.

확인:

- RTL(`SettingsTabs.test.tsx` 7개): 초기값, 이름 빔·이메일 형식 오류(Field 설명·`aria-invalid`·포커스), 고치면 다시 검사, 저장 Toast, 저장 값이 탭 이동 뒤에도 남음, 알림 Switch·CheckboxGroup, 보안 RadioGroup, 계정 삭제 AlertDialog 취소·확인.
- 브라우저(dev 서버): 1440px light·dark, 390px. 이메일 형식 오류 표시와 포커스 확인.
- `docs/tide-gaps.md`: Radio·Checkbox 설명 자리, Field 가로 배치, 폼 수준 검사 3건 추가. 점선 Card 행은 PageBodyPlaceholder를 지운 사실을 적음.
- 검사 다섯 개 통과(테스트 120개).
- 커밋: `6d4ce36`(설정 화면).
