import {
  Breadcrumb,
  BreadcrumbCurrent,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@tide-design/components";
import NextLink from "next/link";
import type { ReactNode } from "react";

/** Breadcrumb 한 칸. `href`가 없으면 마지막 칸은 현재 페이지, 중간 칸은 페이지 없는 묶음이다. */
export interface PageHeaderCrumb {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  /** 현재 페이지까지의 경로. 마지막 칸이 현재 페이지다. */
  breadcrumbs?: PageHeaderCrumb[];
  /** 오른쪽 주요 액션(Button 등) */
  actions?: ReactNode;
}

/** 화면 위쪽 머리: Breadcrumb, 제목, 설명, 액션. 서버 컴포넌트다. */
export function PageHeader({ title, description, breadcrumbs, actions }: PageHeaderProps) {
  return (
    <header className="mb-6 flex flex-col gap-3">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb>
          {breadcrumbs.map((crumb, index) => (
            <BreadcrumbItem key={crumb.label}>
              {crumb.href ? (
                <BreadcrumbLink render={<NextLink href={crumb.href} />}>
                  {crumb.label}
                </BreadcrumbLink>
              ) : index === breadcrumbs.length - 1 ? (
                <BreadcrumbCurrent>{crumb.label}</BreadcrumbCurrent>
              ) : (
                <span className="text-muted">{crumb.label}</span>
              )}
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      )}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-1">
          <h1 className="text-heading-md">{title}</h1>
          {description && <p className="text-body-md text-muted">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
    </header>
  );
}
