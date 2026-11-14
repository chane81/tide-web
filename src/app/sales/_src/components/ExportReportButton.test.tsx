import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ToastRegion } from "@tide-design/components";
import { toasts } from "@/libs/toasts";

import { ExportReportButton } from "./ExportReportButton";

afterEach(() => {
  toasts.clear();
});

describe("ExportReportButton", () => {
  it("누르면 완료 Toast가 뜬다", async () => {
    const user = userEvent.setup();
    render(
      <>
        <ExportReportButton />
        <ToastRegion queue={toasts} />
      </>,
    );

    await user.click(screen.getByRole("button", { name: "보고서 내보내기" }));

    expect(await screen.findByText("보고서를 내보냈습니다")).toBeInTheDocument();
    expect(screen.getByText("sales-report.csv")).toBeInTheDocument();
  });
});
