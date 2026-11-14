import { getSettings } from "./settings.api";

describe("getSettings", () => {
  it("세 탭의 초기값을 준다", async () => {
    const settings = await getSettings();

    expect(settings.profile.email).toContain("@");
    expect(Object.keys(settings.notifications.channels)).toEqual(["email", "push", "sms"]);
    expect(["app", "sms", "none"]).toContain(settings.security.twoFactor);
  });
});
