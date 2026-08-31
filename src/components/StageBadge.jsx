import React from "react";
import { stageMeta } from "../utils.js";

export default function StageBadge({ stage }) {
  const m = stageMeta(stage);
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded-full font-medium"
      style={{
        background: `${m.color}22`,
        color: m.color,
        border: `1px solid ${m.color}44`,
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: m.color }} />
      <span>{m.label}</span>
    </span>
  );
}
