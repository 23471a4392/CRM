import React from "react";
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from "lucide-react";

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => {
        const type = t.type || "success";
        let Icon = CheckCircle2;
        let borderColor = "var(--positive)";
        let iconColor = "var(--positive)";

        if (type === "error") {
          Icon = AlertCircle;
          borderColor = "var(--negative)";
          iconColor = "var(--negative)";
        } else if (type === "warning") {
          Icon = AlertTriangle;
          borderColor = "var(--warning)";
          iconColor = "var(--warning)";
        } else if (type === "info") {
          Icon = Info;
          borderColor = "var(--info)";
          iconColor = "var(--info)";
        }

        return (
          <div
            key={t.id}
            className="pointer-events-auto rounded-lg px-4 py-3 shadow-xl flex items-start gap-3 modal-content"
            style={{
              background: "var(--surface)",
              border: `1px solid ${borderColor}`,
              color: "var(--text)",
            }}
          >
            <Icon size={16} className="shrink-0 mt-0.5" style={{ color: iconColor }} />
            <div className="flex-1 text-xs">
              {t.title && <div className="font-semibold mb-0.5">{t.title}</div>}
              <div style={{ color: "var(--text-muted)" }}>{t.message}</div>
            </div>
            <button
              onClick={() => onDismiss(t.id)}
              className="shrink-0 p-1 rounded hover:opacity-80 transition"
              style={{ color: "var(--text-dim)" }}
              aria-label="Dismiss notification"
            >
              <X size={12} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
