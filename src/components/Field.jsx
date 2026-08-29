import React from "react";

export default function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
        {label}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
