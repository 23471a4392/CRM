import { describe, it, expect } from "vitest";
import { scoreLead, weightedPipeline, stageProbability } from "../src/engines/leadPipeline.js";

describe("leadPipeline", () => {
  it("scores a complete contact higher than an empty one", () => {
    const rich = scoreLead({ email: "a@b.com", phone: "123", company: "Acme", source: "referral" });
    const poor = scoreLead({});
    expect(rich).toBeGreaterThan(poor);
  });

  it("stageProbability is 1 for won and 0 for lost", () => {
    expect(stageProbability("won")).toBe(1);
    expect(stageProbability("lost")).toBe(0);
  });

  it("weightedPipeline ignores closed deals", () => {
    const deals = [
      { stage: "proposal", value: 10000 },
      { stage: "won", value: 50000 },
      { stage: "lost", value: 20000 },
    ];
    const w = weightedPipeline(deals);
    expect(w).toBeGreaterThan(0);
    expect(w).toBeLessThan(10000);
  });
});
