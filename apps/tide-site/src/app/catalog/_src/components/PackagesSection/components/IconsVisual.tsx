import {
  BellIcon,
  CalendarIcon,
  ChartLineIcon,
  CodeIcon,
  HouseIcon,
  PaletteIcon,
  SearchIcon,
  SettingsIcon,
} from "@tide-design/icons";

const ICONS = [
  HouseIcon,
  SearchIcon,
  BellIcon,
  CalendarIcon,
  ChartLineIcon,
  SettingsIcon,
  PaletteIcon,
  CodeIcon,
] as const;

/** icons 카드 그림: 실제 tide 아이콘 여덟 개 */
export function IconsVisual() {
  return (
    <div className="cat-icons cat-icons--four">
      {ICONS.map((Icon, i) => (
        <Icon key={i} size={28} aria-hidden="true" />
      ))}
    </div>
  );
}
