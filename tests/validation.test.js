import { describe, it, expect } from "vitest";
import { validateEmail, validateContact, canTransition } from "../src/engines/validationRules.js";

describe("validationRules", () => {
  it("rejects invalid email", () => {
    expect(validateEmail("not-an-email").ok).toBe(false);
  });

  it("accepts valid email", () => {
    expect(validateEmail("user@example.com").ok).toBe(true);
  });

  it("validateContact requires name", () => {
    const r = validateContact({ email: "a@b.com" });
    expect(r.ok).toBe(false);
  });

  it("allows lead -> contacted transition", () => {
    expect(canTransition("lead", "contacted")).toBe(true);
  });

  it("blocks won -> lead transition", () => {
    expect(canTransition("won", "lead")).toBe(false);
  });
});
