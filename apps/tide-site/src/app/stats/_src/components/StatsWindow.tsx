import {
  Alert,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tide-design/components";

import { getNpmPackages } from "../apis/npmPackages.api";
import { summarizeNpmPackages } from "../libs/summarizeNpmPackages";
import { StatsFrame } from "./StatsFrame";
import { StatsNote } from "./StatsNote";

/**
 * npm에서 읽은 tide 패키지 표와 합계 카드. 요청마다 읽는다(`getNpmPackages`의 `connection()`),
 * 그래서 이 컴포넌트는 페이지의 `<Suspense>` 안에 있어야 한다. 읽지 못하면 tide Alert로 안내한다.
 */
export async function StatsWindow() {
  const data = await getNpmPackages();

  if (!data) {
    return (
      <StatsFrame>
        <Alert color="warning" title="npm에서 읽지 못했습니다">
          npm 공개 API가 응답하지 않았습니다. 잠시 뒤 페이지를 새로 고치면 다시 읽습니다.
        </Alert>
      </StatsFrame>
    );
  }

  const summary = summarizeNpmPackages(data.packages);

  return (
    <>
      <StatsFrame>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>패키지</TableHeaderCell>
              <TableHeaderCell>최신 버전</TableHeaderCell>
              <TableHeaderCell className="text-end">지난 7일</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {summary.rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell>
                  <span className="font-mono text-body-sm">{row.label}</span>
                </TableCell>
                <TableCell>
                  <Badge color="primary" variant="subtle">
                    {row.version}
                  </Badge>
                </TableCell>
                <TableCell className="text-end tabular-nums whitespace-nowrap">
                  {row.downloads}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StatsFrame>
      <StatsNote summary={summary} />
    </>
  );
}
