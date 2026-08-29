import { describe, it, expect } from "vitest";
import { parseCSV, toCSV } from "../src/engines/csvEngine.js";

describe("csvEngine", () => {
  it("parses a simple CSV", () => {
    const text = "name,email\nAda,ada@example.com\n";
    const { headers, rows } = parseCSV(text);
    expect(headers).toEqual(["name", "email"]);
    expect(rows[0].name).toBe("Ada");
  });

  it("round-trips via toCSV", () => {
    const headers = ["id", "name"];
    const rows = [{ id: "1", name: "Bob" }];
    const csv = toCSV(headers, rows);
    const parsed = parseCSV(csv);
    expect(parsed.rows[0].name).toBe("Bob");
  });
});
