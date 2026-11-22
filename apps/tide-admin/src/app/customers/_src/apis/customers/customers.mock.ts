import type { ColorFamilyName } from "@tide-design/components";

import { portraitUrl, type PortraitGender } from "@/libs/portraitUrl";
import { seededRandom } from "@/libs/seededRandom";

import type { Customer, CustomerStatus } from "./customers.types";

/** 목업 기준 시각. `Date.now()`를 쓰지 않아 서버·클라이언트·테스트 결과가 같다. */
const ANCHOR = Date.UTC(2026, 10, 14, 0, 0, 0);
const DAY = 24 * 60 * 60 * 1000;

const FAMILY = ["김", "이", "박", "최", "정", "강", "조", "윤", "장", "임", "한", "오"];
const GIVEN = ["서연", "도윤", "지우", "민준", "하은", "시우", "수아", "예준", "지아", "주원"];
const ROMAN: Record<string, string> = {
  김: "kim",
  이: "lee",
  박: "park",
  최: "choi",
  정: "jung",
  강: "kang",
  조: "cho",
  윤: "yoon",
  장: "jang",
  임: "lim",
  한: "han",
  오: "oh",
  서연: "seoyeon",
  도윤: "doyun",
  지우: "jiwoo",
  민준: "minjun",
  하은: "haeun",
  시우: "siwoo",
  수아: "sua",
  예준: "yejun",
  지아: "jia",
  주원: "juwon",
};
/** 이름별 사진 성별. 지우는 중성 이름이라 여성으로 둔다. */
const GENDER: Record<string, PortraitGender> = {
  서연: "women",
  도윤: "men",
  지우: "women",
  민준: "men",
  하은: "women",
  시우: "men",
  수아: "women",
  예준: "men",
  지아: "women",
  주원: "men",
};
/** 이 간격마다 한 명은 사진 없이 둬서 fallback 아이콘을 보여 준다. */
const NO_PHOTO_EVERY = 6;
const COLORS: ColorFamilyName[] = ["blue", "purple", "mint", "amber", "cyan", "green", "red"];

/** 고객 수. 한 페이지 10명이라 다섯 페이지가 된다. */
const COUNT = 46;

function status(random: () => number): CustomerStatus {
  const r = random();
  return r < 0.6 ? "active" : r < 0.85 ? "dormant" : "churned";
}

function buildCustomers(): Customer[] {
  const random = seededRandom(46);

  return Array.from({ length: COUNT }, (_, i) => {
    const family = FAMILY[i % FAMILY.length] as string;
    const given = GIVEN[(i * 7) % GIVEN.length] as string;
    const s = status(random);
    const joinedAt = ANCHOR - Math.round((30 + random() * 900) * DAY);
    // 활성은 최근, 휴면은 몇 달 전, 이탈은 더 오래전에 마지막으로 접속했다.
    const idleDays = s === "active" ? random() * 7 : s === "dormant" ? 60 + random() * 90 : 200;
    const orders = s === "churned" ? 1 + Math.floor(random() * 3) : 2 + Math.floor(random() * 40);

    return {
      id: `cus-${String(i + 1).padStart(3, "0")}`,
      name: `${family}${given}`,
      email: `${ROMAN[given]}.${ROMAN[family]}${i + 1}@example.com`,
      status: s,
      joinedAt: new Date(joinedAt).toISOString(),
      lastSeenAt: new Date(Math.max(joinedAt, ANCHOR - Math.round(idleDays * DAY))).toISOString(),
      orders,
      totalSpent: Math.round(orders * (20 + random() * 120)),
      avatarUrl:
        i % NO_PHOTO_EVERY === NO_PHOTO_EVERY - 1
          ? undefined
          : portraitUrl(GENDER[given] as PortraitGender, i),
      avatarColor: COLORS[i % COLORS.length] as ColorFamilyName,
    };
  });
}

/** 모든 고객, 가입 최신순 */
export const customersMock: Customer[] = buildCustomers().toSorted((a, b) =>
  b.joinedAt.localeCompare(a.joinedAt),
);
