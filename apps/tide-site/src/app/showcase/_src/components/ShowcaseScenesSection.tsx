import { Badge, Progress } from "@tide-design/components";

import { GlowStage } from "./GlowStage";
import { SceneCard } from "./SceneCard";

const ROLES = ["neutral", "primary", "success", "warning", "danger", "info"] as const;

/**
 * 2번 화면: 빛 번짐 판 두 장. 왼쪽은 tide 대비 기준(사실 문장), 오른쪽은 색 Role을 실제 tide Badge·Progress로.
 * 사실 출처: 대비 단계는 소개 페이지 #access(tide 접근성 기준), Role 여섯 개는 tide README 「색과 Theme」.
 */
export function ShowcaseScenesSection() {
  return (
    <section className="section" id="scenes" aria-labelledby="scenes-h">
      <div className="wrap">
        <div className="section-head">
          <h2 id="scenes-h">Component가 지키는 대비와 색</h2>
          <p>
            글자·테두리 대비는 tide 기준 그대로, 색은 Role 이름으로 고릅니다. 오른쪽 카드의 배지와
            막대는 실제 tide Component입니다.
          </p>
        </div>
        <div className="grid">
          <div className="span-6">
            <GlowStage>
              <SceneCard
                title="정지 상태 글자 4.5:1, 테두리·포커스 링 3:1"
                source="WCAG 2.2 AA"
                note="tide 대비 기준, light·dark 모두 CI가 검사"
              />
            </GlowStage>
          </div>
          <div className="span-6">
            <GlowStage>
              <SceneCard
                title="색은 Role 여섯 개로 고릅니다"
                source="@tide-design/foundation · Role"
                note="hex 대신 Token 이름으로 칠함"
              >
                <span className="flex flex-wrap gap-2">
                  {ROLES.map((role) => (
                    <Badge key={role} color={role}>
                      {role}
                    </Badge>
                  ))}
                </span>
                <Progress value={72} aria-label="견본 진행률" />
              </SceneCard>
            </GlowStage>
          </div>
        </div>
      </div>
    </section>
  );
}
