import React from "react";
import { AlertTriangle, X, Trash2 } from "lucide-react";

export default function DeleteConfirmModal({
  isOpen,
  title = "Delete Item",
  message = "Are you sure you want to delete this? This action cannot be undone.",
  confirmLabel = "Delete",
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-backdrop">
      <div
        className="w-full max-w-md rounded-xl p-6 shadow-2xl modal-content"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 rounded-full"
              style={{ background: "var(--negative-soft)", color: "var(--negative)" }}
            >
              <AlertTriangle size={20} />
            </div>
            <h3 className="ledger-display text-lg font-semibold">{title}</h3>
          </div>
          <button
            onClick={onCancel}
            className="p-1 rounded hover:opacity-70 transition"
            style={{ color: "var(--text-dim)" }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
          {message}
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded text-sm transition"
            style={{
              background: "var(--surface-2)",
              color: "var(--text)",
              border: "1px solid var(--border)",
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition"
            style={{
              background: "var(--negative)",
              color: "#FFFFFF",
            }}
          >
            <Trash2 size={15} /> {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
