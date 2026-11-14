import { ButtonLink } from "@/components/ButtonLink";
import { STORYBOOK_URL } from "@/constants/links";
import { MAIN_ACTION, SECTIONS } from "@/constants/sections";

/** 컴포넌트 메뉴판: 묶음별 이름(tide 패키지에 있는 것만) */
const COMPONENT_GROUPS = [
  { title: "누르고 고르기", items: ["Button", "IconButton", "Menu", "Tabs"] },
  { title: "입력", items: ["Input", "Select", "Combobox", "Switch"] },
  { title: "알림과 겹침", items: ["Alert", "Toast", "Dialog", "Tooltip"] },
] as const;

function Chevron() {
  return (
    <svg className="chev" viewBox="0 0 12 12" aria-hidden="true">
      <path
        d="M3 4.5l3 3 3-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * 고정 내비(design-taste-frontend nav-centre). 키트 마크업에 tide Button을 넣는다.
 * 좁은 화면의 시트 열기·닫기와 메뉴판은 키트 system.js가 맡는다.
 */
export function SiteNav() {
  return (
    <header className="nav nav--centre">
      <div className="wrap nav__bar">
        <a className="skip-link" href="#top">
          본문으로 건너뛰기
        </a>
        <a className="nav__logo" href="#top">
          <span className="mark" data-mark="dots" aria-hidden="true" />
          tide
        </a>
        <nav className="nav__links" aria-label="주 메뉴">
          {SECTIONS.map((section) =>
            section.id === "components" ? (
              <div className="nav__item" key={section.id}>
                <a className="nav__link" href={`#${section.id}`}>
                  {section.label} <Chevron />
                </a>
                <div className="nav__menu">
                  <div className="wrap grid">
                    {COMPONENT_GROUPS.map((group) => (
                      <div className="menu-col span-3" key={group.title}>
                        <p className="t-label">{group.title}</p>
                        {group.items.map((name) => (
                          <a href="#components" key={name}>
                            {name}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="nav__item" key={section.id}>
                <a className="nav__link" href={`#${section.id}`}>
                  {section.label}
                </a>
              </div>
            ),
          )}
        </nav>
        <div className="nav__actions">
          <a className="nav__link" href={STORYBOOK_URL}>
            문서
          </a>
          <ButtonLink size="lg" href={MAIN_ACTION.href}>
            {MAIN_ACTION.label}
          </ButtonLink>
        </div>
        <button className="nav__toggle" type="button" aria-expanded="false" aria-label="메뉴">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path
              d="M2 5h14M2 13h14"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
