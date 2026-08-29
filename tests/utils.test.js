import { describe, it, expect } from "vitest";
import { uid } from "../src/utils.js";

describe("utils", () => {
  it("uid generates a non-empty string", () => {
    const id = uid();
    expect(typeof id).toBe("string");
    expect(id.length).toBeGreaterThan(4);
  });

  it("uid values are unique", () => {
    const a = uid();
    const b = uid();
    expect(a).not.toBe(b);
  });
});
