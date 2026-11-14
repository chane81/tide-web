import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SidebarAnnouncement } from "./SidebarAnnouncement";

describe("SidebarAnnouncement", () => {
  it("닫기 버튼을 누르면 공지가 사라진다", async () => {
    const user = userEvent.setup();
    render(<SidebarAnnouncement />);

    expect(screen.getByText("새 기능: 고객 일괄 내보내기")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "공지 닫기" }));

    expect(screen.queryByText("새 기능: 고객 일괄 내보내기")).not.toBeInTheDocument();
  });
});
