import React from "react";

export default function Field({ label, error, children }) {
  return (
    <label className="block">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider font-medium" style={{ color: "var(--text-muted)" }}>
          {label}
        </span>
        {error && (
          <span className="text-[11px] font-medium" style={{ color: "var(--negative)" }}>
            {error}
          </span>
        )}
      </div>
      <div className="mt-1">{children}</div>
    </label>
  );
}
