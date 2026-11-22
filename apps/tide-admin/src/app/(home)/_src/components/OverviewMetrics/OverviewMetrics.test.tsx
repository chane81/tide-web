import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { formatCurrency } from "@/libs/formatCurrency";

import { overviewMetricsMock } from "../../apis/overview.mock";
import { OverviewMetrics } from "./OverviewMetrics";

// Recharts는 jsdom에서 크기를 잴 수 없어 그림 대신 받은 점 개수만 보인다(차트 그림은 테스트하지 않는다).
vi.mock("@/components/TrendLineChart", () => ({
  TrendLineChart: ({ title, data }: { title: string; data: unknown[] }) => (
    <p>
      {title}: 점 {data.length}개
    </p>
  ),
}));

// 스파크라인도 같은 이유로 이름과 점 개수만 보인다.
vi.mock("@/components/Sparkline", () => ({
  Sparkline: ({ title, values }: { title: string; values: number[] }) => (
    <p>
      {title}: 점 {values.length}개
    </p>
  ),
}));

describe("OverviewMetrics", () => {
  it("처음에는 12개월 지표를 보인다", () => {
    render(<OverviewMetrics metrics={overviewMetricsMock} />);

    expect(screen.getByRole("tab", { name: "12개월" })).toHaveAttribute("aria-selected", "true");
    expect(
      screen.getByText(formatCurrency(overviewMetricsMock["12m"].mrr.current)),
    ).toBeInTheDocument();
    expect(screen.getByText("MRR 추이: 점 12개")).toBeInTheDocument();
    expect(screen.getByText("최근 12개월 전체 회원 추이: 점 12개")).toBeInTheDocument();
  });

  it("기간 탭을 바꾸면 증감률·보조 지표와 차트가 바뀐다", async () => {
    const user = userEvent.setup();
    render(<OverviewMetrics metrics={overviewMetricsMock} />);

    // 12개월 전체 회원: 3,190 → 4,862
    expect(screen.getByText("+52.4%")).toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "7일" }));

    expect(screen.getByRole("tab", { name: "7일" })).toHaveAttribute("aria-selected", "true");
    // 7일 전체 회원: 4,801 → 4,862
    expect(screen.getByText("+1.3%")).toBeInTheDocument();
    expect(screen.queryByText("+52.4%")).not.toBeInTheDocument();
    expect(screen.getByText("MRR 추이: 점 7개")).toBeInTheDocument();
    // MRR과 보조 지표 세 칸이 모두 같은 비교 기준을 보인다.
    expect(screen.getAllByText("7일 전 대비")).toHaveLength(4);
  });

  it("증감률을 부호와 방향 글자로 보인다", () => {
    render(<OverviewMetrics metrics={overviewMetricsMock} />);

    // 12개월 전체 회원: 3,190 → 4,862 (+52.4%)
    expect(screen.getByText("+52.4%")).toBeInTheDocument();
    expect(screen.getAllByText("증가").length).toBeGreaterThan(0);
  });
});
