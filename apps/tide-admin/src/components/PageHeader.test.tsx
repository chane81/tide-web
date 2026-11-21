import { render, screen } from "@testing-library/react";

import { PageHeader } from "./PageHeader";

describe("PageHeader", () => {
  it("제목·설명·Breadcrumb·액션을 보여 준다", () => {
    render(
      <PageHeader
        title="매출"
        description="기간별 매출"
        breadcrumbs={[{ label: "개요", href: "/" }, { label: "매출" }]}
        actions={<button type="button">보고서 내보내기</button>}
      />,
    );

    expect(screen.getByRole("heading", { level: 1, name: "매출" })).toBeInTheDocument();
    expect(screen.getByText("기간별 매출")).toBeInTheDocument();

    const breadcrumb = screen.getByRole("navigation", { name: "이동 경로" });
    expect(breadcrumb).toContainElement(screen.getByRole("link", { name: "개요" }));
    expect(screen.getByText("매출", { selector: "[aria-current=page]" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "보고서 내보내기" })).toBeInTheDocument();
  });

  it("href 없는 중간 칸은 현재 페이지로 표시하지 않는다", () => {
    render(<PageHeader title="매출" breadcrumbs={[{ label: "분석" }, { label: "매출" }]} />);

    expect(screen.getByText("분석")).not.toHaveAttribute("aria-current");
    expect(screen.getByText("매출", { selector: "[aria-current=page]" })).toBeInTheDocument();
  });
});
