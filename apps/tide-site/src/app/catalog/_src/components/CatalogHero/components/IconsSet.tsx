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

import { CollagePiece } from "./CollagePiece";
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
      <CollagePiece x="4%" y="6%" w="58%">
        <div className="cat-icons">
          {ICONS.map((Icon, i) => (
            <Icon key={i} size={24} aria-hidden="true" />
          ))}
        </div>
      </CollagePiece>
      <CollagePiece x="66%" y="18%" w="30%">
        <span className="flex items-end gap-3 text-primary">
          <PlusIcon size={16} aria-hidden="true" />
          <PlusIcon size={20} aria-hidden="true" />
          <PlusIcon size={24} aria-hidden="true" />
        </span>
      </CollagePiece>
      <CountPiece count="2,029개" label="아이콘 Component" />
      <CollagePiece x="36%" y="70%" w="60%" h="26%">
        <span className="font-mono text-body-sm">{"<PlusIcon size={24} />"}</span>
      </CollagePiece>
    </div>
  );
}
