import {
  Badge,
  Card,
  Progress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Typography,
} from "@tide-design/components";

import { formatCurrency } from "@/libs/formatCurrency";
import { formatNumber } from "@/libs/formatNumber";
import { formatPercent } from "@/libs/formatPercent";

import type { SegmentSummary } from "../libs/summarizeSegments";

export interface SegmentTableProps {
  segments: SegmentSummary[];
}

/** 세그먼트별 고객 수·비중·결제 금액 표 */
export function SegmentTable({ segments }: SegmentTableProps) {
  return (
    <Card className="flex flex-col gap-4 p-5">
      <Typography id="segments-title" variant="heading-xs" level={2}>
        세그먼트별 현황
      </Typography>
      <Table aria-labelledby="segments-title">
        <TableHead>
          <TableRow>
            <TableHeaderCell>세그먼트</TableHeaderCell>
            <TableHeaderCell>고객 수</TableHeaderCell>
            <TableHeaderCell className="hidden md:table-cell">비중</TableHeaderCell>
            <TableHeaderCell className="hidden sm:table-cell">총 결제</TableHeaderCell>
            <TableHeaderCell className="hidden lg:table-cell">평균 결제</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {segments.map((segment) => (
            <TableRow key={segment.id}>
              <TableCell>
                <div className="flex flex-col items-start gap-1">
                  <Badge size="sm" color={segment.color}>
                    {segment.label}
                  </Badge>
                  <span className="text-body-sm text-muted">{segment.description}</span>
                </div>
              </TableCell>
              <TableCell>{formatNumber(segment.count)}명</TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex min-w-32 items-center gap-3">
                  <Progress
                    aria-label={`${segment.label} 비중`}
                    value={segment.share * 100}
                    size="sm"
                    color={segment.color}
                    className="flex-1"
                  />
                  <span className="w-12 text-end text-body-sm text-muted">
                    {formatPercent(segment.share)}
                  </span>
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {formatCurrency(segment.totalSpent)}
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                {formatCurrency(segment.averageSpent)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
