import React from "react";
import { stageMeta } from "../utils.js";

export default function StageBadge({ stage }) {
  const m = stageMeta(stage);
  return (
    <span
      className="text-xs px-2 py-0.5 rounded-full font-medium"
      style={{ background: `${m.color}22`, color: m.color, border: `1px solid ${m.color}55` }}
    >
      {m.label}
    </span>
  );
}
