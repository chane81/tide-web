import { Badge } from "@tide-design/components";
import type { CSSProperties } from "react";

import { getComponentGroups } from "../apis/componentGroups.api";

/**
 * 3번 화면: Component 35종을 네 묶음으로(moment pinned-chapters, 두 화면). 구역이 두 화면 동안 멈춰 있고
 * 왼쪽 단계가 하나씩 열리며 오른쪽 틀이 그 단계의 그림으로 바뀐다. 그림은 그 묶음 Component 이름을 tide Badge로 늘어놓은 판이다.
 */
export async function GroupsSection() {
  const { groups } = await getComponentGroups();

  return (
    <section
      className="section"
      id="groups"
      style={{ "--h": 2 } as CSSProperties}
      data-moment="pinned-chapters"
      aria-labelledby="groups-h"
    >
      <div className="wrap mo-pc__grid">
        <div className="mo-pc__text">
          <h2 id="groups-h">Component 35종을 네 묶음으로 봅니다</h2>
          <ol className="mo-pc__steps">
            {groups.map((group) => (
              <li key={group.id} className="mo-pc__step">
                <h3>{group.title}</h3>
                <p>{group.body}</p>
                <figure className="mo-pc__visual" data-ui="">
                  <div className="cat-board">
                    <span className="cat-board__count">{group.components.length}종</span>
                    {group.components.map((name) => (
                      <Badge key={name} size="md" color="primary" variant="subtle">
                        {name}
                      </Badge>
                    ))}
                  </div>
                </figure>
              </li>
            ))}
          </ol>
        </div>
        <div className="mo-pc__visuals frame" />
      </div>
    </section>
  );
}
