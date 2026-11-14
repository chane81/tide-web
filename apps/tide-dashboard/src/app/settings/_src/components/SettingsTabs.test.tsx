import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ToastRegion } from "@tide-design/components";
import { toasts } from "@/libs/toasts";

import type { GetSettingsResponse } from "../apis/settings.types";
import { SettingsTabs } from "./SettingsTabs";

const settings: GetSettingsResponse = {
  profile: {
    name: "김하늘",
    email: "haneul@example.com",
    bio: "",
    role: "editor",
    timezone: "Asia/Seoul",
  },
  notifications: { channels: { email: true, push: false, sms: false }, topics: ["orders"] },
  security: { twoFactor: "app" },
};

function setup() {
  const user = userEvent.setup();
  render(
    <>
      <SettingsTabs initialSettings={settings} />
      <ToastRegion queue={toasts} />
    </>,
  );
  return user;
}

/** 목업 저장(600ms)을 기다린다 */
const SAVE_WAIT = { timeout: 2_000 };

afterEach(() => {
  toasts.clear();
});

describe("SettingsTabs", () => {
  it("프로필 탭이 초기값으로 열린다", () => {
    setup();

    expect(screen.getByRole("tab", { name: "프로필" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("textbox", { name: /이름/ })).toHaveValue("김하늘");
    expect(screen.getByRole("textbox", { name: /이메일/ })).toHaveValue("haneul@example.com");
    expect(screen.getByRole("combobox", { name: /시간대/ })).toHaveValue("서울 (UTC+09:00)");
  });

  it("이름이 비었거나 이메일 형식이 틀리면 Field 오류를 보이고 저장하지 않는다", async () => {
    const user = setup();
    const name = screen.getByRole("textbox", { name: /이름/ });
    const email = screen.getByRole("textbox", { name: /이메일/ });

    await user.clear(name);
    await user.clear(email);
    await user.type(email, "haneul@");
    await user.click(screen.getByRole("button", { name: "저장" }));

    expect(name).toHaveAccessibleDescription("이름을 입력하세요.");
    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(name).toHaveFocus();
    expect(email).toHaveAccessibleDescription(/이메일 형식이 올바르지 않습니다/);

    // 고치면 바로 다시 검사한다.
    await user.type(name, "하늘");
    expect(name).not.toHaveAttribute("aria-invalid", "true");
    expect(screen.queryByText("설정을 저장했습니다")).not.toBeInTheDocument();
  });

  it("올바르게 저장하면 잠시 뒤 저장 완료 Toast가 뜬다", async () => {
    const user = setup();

    await user.click(screen.getByRole("button", { name: "저장" }));

    expect(await screen.findByText("설정을 저장했습니다", {}, SAVE_WAIT)).toBeInTheDocument();
  });

  it("저장한 값은 탭을 옮겼다 와도 남는다", async () => {
    const user = setup();
    await user.type(screen.getByRole("textbox", { name: /이름/ }), "님");
    await user.click(screen.getByRole("button", { name: "저장" }));
    await screen.findByText("설정을 저장했습니다", {}, SAVE_WAIT);

    await user.click(screen.getByRole("tab", { name: "알림" }));
    await user.click(screen.getByRole("tab", { name: "프로필" }));

    expect(screen.getByRole("textbox", { name: /이름/ })).toHaveValue("김하늘님");
  });

  it("알림 탭: 채널 Switch와 알림 종류 Checkbox를 바꾼다", async () => {
    const user = setup();
    await user.click(screen.getByRole("tab", { name: "알림" }));

    const push = screen.getByRole("switch", { name: "브라우저 푸시" });
    expect(push).not.toBeChecked();
    await user.click(push);
    expect(push).toBeChecked();

    const group = screen.getByRole("group", { name: "알림 종류" });
    expect(within(group).getByRole("checkbox", { name: "새 주문" })).toBeChecked();
    await user.click(within(group).getByRole("checkbox", { name: "주간 보고서" }));
    expect(within(group).getByRole("checkbox", { name: "주간 보고서" })).toBeChecked();

    await user.click(screen.getByRole("button", { name: "저장" }));
    expect(await screen.findByText("설정을 저장했습니다", {}, SAVE_WAIT)).toBeInTheDocument();
  });

  it("보안 탭: 2단계 인증 방식을 라디오로 고른다", async () => {
    const user = setup();
    await user.click(screen.getByRole("tab", { name: "보안" }));

    const group = screen.getByRole("radiogroup", { name: "인증 방식" });
    expect(within(group).getByRole("radio", { name: /인증 앱/ })).toBeChecked();
    await user.click(within(group).getByRole("radio", { name: /문자 메시지/ }));
    expect(within(group).getByRole("radio", { name: /문자 메시지/ })).toBeChecked();
  });

  it("계정 삭제는 AlertDialog 확인을 거친다", async () => {
    const user = setup();
    await user.click(screen.getByRole("tab", { name: "보안" }));

    await user.click(screen.getByRole("button", { name: "계정 삭제" }));
    const dialog = screen.getByRole("alertdialog", { name: "계정을 삭제할까요?" });
    await user.click(within(dialog).getByRole("button", { name: "취소" }));
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    expect(screen.queryByText("계정 삭제를 요청했습니다")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "계정 삭제" }));
    await user.click(within(screen.getByRole("alertdialog")).getByRole("button", { name: "삭제" }));
    expect(await screen.findByText("계정 삭제를 요청했습니다")).toBeInTheDocument();
  });
});
