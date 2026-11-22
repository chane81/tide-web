import type { Customer } from "../apis/customers/customers.types";

/** 테스트용 고객. 필요한 값만 덮어쓴다. */
export function customerFixture(overrides: Partial<Customer> & Pick<Customer, "id">): Customer {
  return {
    name: "고객",
    email: `${overrides.id}@example.com`,
    status: "active",
    joinedAt: "2026-01-01T00:00:00.000Z",
    lastSeenAt: "2026-11-13T00:00:00.000Z",
    orders: 1,
    totalSpent: 100,
    avatarColor: "blue",
    ...overrides,
  };
}
