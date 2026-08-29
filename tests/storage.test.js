import { describe, it, expect, beforeEach } from "vitest";
import { getJSON, setJSON } from "../src/storage.js";

describe("storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns fallback when key missing", async () => {
    const val = await getJSON("missing_key", []);
    expect(val).toEqual([]);
  });

  it("round-trips JSON values", async () => {
    await setJSON("contacts", [{ id: "1", name: "Ada" }]);
    const val = await getJSON("contacts", []);
    expect(val).toHaveLength(1);
    expect(val[0].name).toBe("Ada");
  });
});
