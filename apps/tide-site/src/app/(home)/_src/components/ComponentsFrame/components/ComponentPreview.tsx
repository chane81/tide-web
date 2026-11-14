"use client";

import {
  Alert,
  Avatar,
  Badge,
  Button,
  Checkbox,
  Progress,
  Select,
  SelectItem,
  Skeleton,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "@tide-design/components";
import { PlusIcon } from "@tide-design/icons";

import type { ComponentName } from "../constants/componentList";

const ROLES = ["primary", "success", "warning", "danger", "info", "neutral"] as const;

export interface ComponentPreviewProps {
  name: ComponentName;
}

/** 고른 Component를 실제로 그린다. 크기·색·상태를 한 화면에 늘어놓는다. */
export function ComponentPreview({ name }: ComponentPreviewProps) {
  switch (name) {
    case "Button":
      return (
        <div className="preview-stack">
          <div className="preview-row">
            <Button startIcon={<PlusIcon />}>고객 추가</Button>
            <Button variant="subtle">초안 저장</Button>
            <Button variant="outline" color="neutral">
              취소
            </Button>
            <Button variant="ghost" color="neutral">
              건너뛰기
            </Button>
          </div>
          <div className="preview-row">
            <Button size="xs">xs 24px</Button>
            <Button size="sm">sm 32px</Button>
            <Button size="md">md 40px</Button>
            <Button size="lg">lg 48px</Button>
          </div>
          <div className="preview-row">
            <Button color="danger">계정 삭제</Button>
            <Button disabled>보내는 중</Button>
          </div>
        </div>
      );
    case "Badge":
      return (
        <div className="preview-stack">
          {(["solid", "subtle", "faint"] as const).map((variant) => (
            <div className="preview-row" key={variant}>
              {ROLES.map((role) => (
                <Badge key={role} variant={variant} color={role}>
                  {role}
                </Badge>
              ))}
            </div>
          ))}
        </div>
      );
    case "Switch":
      return (
        <div className="preview-stack">
          <Switch defaultChecked>메일 알림</Switch>
          <Switch>주간 보고서 받기</Switch>
          <Switch size="lg" color="success" defaultChecked>
            자동 결제
          </Switch>
          <Switch disabled>관리자만 바꿀 수 있음</Switch>
        </div>
      );
    case "Tabs":
      return (
        <Tabs defaultValue="profile" className="preview-tabs">
          <TabList aria-label="설정">
            <Tab value="profile">프로필</Tab>
            <Tab value="alerts">알림</Tab>
            <Tab value="security">보안</Tab>
          </TabList>
          <TabPanel value="profile">이름과 이메일을 바꿉니다.</TabPanel>
          <TabPanel value="alerts">메일·푸시 알림을 고릅니다.</TabPanel>
          <TabPanel value="security">2단계 인증을 켭니다.</TabPanel>
        </Tabs>
      );
    case "Select":
      return (
        <div className="preview-stack preview-narrow">
          <Select aria-label="고객 상태" defaultValue="active">
            <SelectItem value="all">모든 상태</SelectItem>
            <SelectItem value="active">활성</SelectItem>
            <SelectItem value="dormant">휴면</SelectItem>
            <SelectItem value="churned">해지</SelectItem>
          </Select>
          <Select aria-label="시간대" defaultValue="seoul" size="sm">
            <SelectItem value="seoul">서울 (UTC+09:00)</SelectItem>
            <SelectItem value="tokyo">도쿄 (UTC+09:00)</SelectItem>
          </Select>
        </div>
      );
    case "Checkbox":
      return (
        <div className="preview-stack">
          <Checkbox defaultChecked>결제 알림</Checkbox>
          <Checkbox>마케팅 메일</Checkbox>
          <Checkbox indeterminate>모든 고객</Checkbox>
          <Checkbox invalid>약관에 동의합니다</Checkbox>
        </div>
      );
    case "Progress":
      return (
        <div className="preview-stack preview-narrow">
          <Progress aria-label="이번 달 한도" value={78} />
          <Progress aria-label="저장 공간" value={92} color="warning" />
          <Progress aria-label="한도 초과" value={100} color="danger" size="sm" />
        </div>
      );
    case "Alert":
      return (
        <div className="preview-stack">
          <Alert color="info" title="새 기능: 고객 일괄 내보내기">
            고객 화면에서 여러 명을 골라 한 번에 내보냅니다.
          </Alert>
          <Alert color="warning" title="카드 한도의 80%를 썼습니다" />
        </div>
      );
    case "Avatar":
      return (
        <div className="preview-row">
          <Avatar alt="김하늘" size="lg" color="blue" />
          <Avatar alt="한지아" size="md" color="green" />
          <Avatar alt="장하은" size="sm" color="amber" />
          <Avatar alt="임도윤" size="xs" color="red" />
        </div>
      );
    case "Skeleton":
      return (
        <div className="preview-stack preview-narrow">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      );
  }
}
