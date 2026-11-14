import type { CSSProperties } from "react";
import {
  BellIcon,
  CalendarIcon,
  ChartLineIcon,
  CodeIcon,
  HeartIcon,
  HouseIcon,
  MoonIcon,
  PaletteIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
} from "@tide-design/icons";

import { CountPiece } from "./CountPiece";

const ICONS = [
  HouseIcon,
  SearchIcon,
  BellIcon,
  UserIcon,
  CalendarIcon,
  ChartLineIcon,
  SettingsIcon,
  PaletteIcon,
  CodeIcon,
  MoonIcon,
  HeartIcon,
  PlusIcon,
] as const;

/** 콜라주 둘째 벌: @tide-design/icons 조각. 아이콘 열두 개와 크기 세 단계. */
export function IconsSet() {
  return (
    <div className="ly-collage__set" aria-hidden="true">
      <div
        className="ly-piece cat-piece"
        style={{ "--x": "4%", "--y": "6%", "--w": "58%" } as CSSProperties}
      >
        <div className="cat-icons">
          {ICONS.map((Icon, i) => (
            <Icon key={i} size={24} aria-hidden="true" />
          ))}
        </div>
      </div>
      <div
        className="ly-piece cat-piece"
        style={{ "--x": "66%", "--y": "18%", "--w": "30%" } as CSSProperties}
      >
        <span className="flex items-end gap-3 text-primary">
          <PlusIcon size={16} aria-hidden="true" />
          <PlusIcon size={20} aria-hidden="true" />
          <PlusIcon size={24} aria-hidden="true" />
        </span>
      </div>
      <CountPiece count="2,029개" label="아이콘 Component" />
      <div
        className="ly-piece cat-piece cat-piece--fill"
        style={{ "--x": "36%", "--y": "70%", "--w": "60%", "--ph": "26%" } as CSSProperties}
      >
        <span className="font-mono text-body-sm">{"<PlusIcon size={24} />"}</span>
      </div>
    </div>
  );
}
