import {
  Avatar,
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tide-design/components";

import { SAMPLE_CUSTOMERS, SAMPLE_METRICS, SAMPLE_NAV } from "../constants/windowSample";

/**
 * 히어로 창: tide Component로 그린 대시보드 한 화면. 그림이 아니라 실제 Component다.
 * 눌러도 동작하지 않는 견본이라 스크린 리더에는 창 전체를 그림 하나로 알린다(바깥 role="img").
 * `data-ui`: design-taste-frontend 키트와 검사기가 읽는 「제품 UI 조각」 표시. 값이 비어 있어 키트가 자기 조각을 그려 넣지 않는다.
 * 바깥 창(.hero__window)이 이 조각의 아래를 잘라 바탕으로 흐린다(키트 layout.css).
 */
export function HeroWindow() {
  return (
    <div className="hero-win" data-ui="" aria-hidden="true">
      <div className="hero-win__bar">
        <span className="hero-win__dots">
          <i />
          <i />
          <i />
        </span>
        <span className="text-label-sm text-muted">tide-admin · 고객</span>
      </div>
      <div className="hero-win__body">
        <ul className="hero-win__side">
          {SAMPLE_NAV.map((item) => (
            <li key={item} data-on={item === "고객" ? "" : undefined}>
              {item}
            </li>
          ))}
        </ul>
        <div className="hero-win__main">
          <div className="hero-win__metrics">
            {SAMPLE_METRICS.map((metric) => (
              <Card key={metric.label} className="flex flex-col gap-1">
                <span className="text-label-sm text-muted">{metric.label}</span>
                <span className="flex items-center gap-2">
                  <span className="text-heading-sm">{metric.value}</span>
                  <Badge size="sm" variant="faint" color="success">
                    {metric.change}
                  </Badge>
                </span>
              </Card>
            ))}
          </div>
          <Card className="p-0">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>이름</TableHeaderCell>
                  <TableHeaderCell>상태</TableHeaderCell>
                  <TableHeaderCell className="text-end">결제 금액</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {SAMPLE_CUSTOMERS.map((customer) => (
                  <TableRow key={customer.email}>
                    <TableCell>
                      <span className="flex items-center gap-2">
                        <Avatar alt="" size="sm" color="blue" />
                        <span className="flex flex-col">
                          <span className="text-label-md">{customer.name}</span>
                          <span className="text-caption text-muted">{customer.email}</span>
                        </span>
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge size="sm" color={customer.color}>
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-end tabular-nums">{customer.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
}
