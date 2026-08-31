import React, { useState } from "react";
import { Check, X, Plus } from "lucide-react";
import Field from "./Field.jsx";
import { STAGES, stageMeta } from "../utils.js";

export default function DealForm({ initial, contacts, onCancel, onSave, onQuickAddContact }) {
  const defaultContactId = initial?.contactId || (contacts.length > 0 ? contacts[0].id : "");

  const [form, setForm] = useState(
    initial || {
      title: "",
      contactId: defaultContactId,
      value: "",
      stage: "lead",
      expectedClose: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
      probability: 0.1,
      notes: "",
    }
  );

  const [errors, setErrors] = useState({});

  const set = (k) => (e) => {
    const val = e.target.value;
    setForm((prev) => {
      const updated = { ...prev, [k]: val };
      if (k === "stage") {
        const meta = stageMeta(val);
        updated.probability = meta.probability;
      }
      return updated;
    });
    if (errors[k]) setErrors({ ...errors, [k]: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.title || form.title.trim().length < 2) {
      errs.title = "Deal title is required";
    }
    if (form.value === "" || isNaN(Number(form.value)) || Number(form.value) < 0) {
      errs.value = "Please enter a valid numeric value";
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    onSave({
      ...form,
      title: form.title.trim(),
      value: Number(form.value) || 0,
      probability: Number(form.probability) ?? 0.5,
      closeDate: form.expectedClose || form.closeDate || "",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-backdrop">
      <div
        className="w-full max-w-lg rounded-xl shadow-2xl overflow-hidden modal-content"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        <div
          className="p-5 flex items-center justify-between"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <h3 className="ledger-display text-lg font-semibold">
            {initial ? "Edit Deal" : "Create New Deal"}
          </h3>
          <button
            onClick={onCancel}
            className="p-1 rounded hover:opacity-70 transition"
            style={{ color: "var(--text-dim)" }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto scrollbar-ledger">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Field label="Deal Title *" error={errors.title}>
                <input
                  className="ledger-input w-full rounded px-3 py-2 text-sm"
                  value={form.title}
                  onChange={set("title")}
                  placeholder="e.g. Annual Platform Enterprise License"
                  autoFocus
                />
              </Field>
            </div>

            <Field label="Deal Value (Amount) *" error={errors.value}>
              <input
                type="number"
                min="0"
                step="100"
                className="ledger-input w-full rounded px-3 py-2 text-sm ledger-mono"
                value={form.value}
                onChange={set("value")}
                placeholder="25000"
              />
            </Field>

            <Field label="Associated Contact">
              <div className="flex gap-1.5">
                <select
                  className="ledger-input flex-1 rounded px-3 py-2 text-sm"
                  value={form.contactId || ""}
                  onChange={set("contactId")}
                >
                  <option value="">— Unassigned —</option>
                  {contacts.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c.company ? `(${c.company})` : ""}
                    </option>
                  ))}
                </select>
                {onQuickAddContact && (
                  <button
                    type="button"
                    onClick={onQuickAddContact}
                    className="p-2 rounded text-xs shrink-0"
                    style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
                    title="Add new contact"
                  >
                    <Plus size={14} />
                  </button>
                )}
              </div>
            </Field>

            <Field label="Pipeline Stage">
              <select
                className="ledger-input w-full rounded px-3 py-2 text-sm"
                value={form.stage}
                onChange={set("stage")}
              >
                {STAGES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label} ({Math.round((s.probability || 0) * 100)}% Win Prob)
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Expected Close Date">
              <input
                type="date"
                className="ledger-input w-full rounded px-3 py-2 text-sm"
                value={form.expectedClose || form.closeDate || ""}
                onChange={set("expectedClose")}
              />
            </Field>

            <div className="sm:col-span-2">
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                  Win Probability: {Math.round((Number(form.probability) || 0) * 100)}%
                </label>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                className="w-full accent-amber-500 cursor-pointer"
                value={form.probability ?? 0.5}
                onChange={(e) => setForm({ ...form, probability: parseFloat(e.target.value) })}
              />
            </div>

            <div className="sm:col-span-2">
              <Field label="Notes & Next Steps">
                <textarea
                  className="ledger-input w-full rounded px-3 py-2 text-sm resize-none"
                  rows={3}
                  value={form.notes || ""}
                  onChange={set("notes")}
                  placeholder="Budget timeline, stakeholders involved, competition notes…"
                />
              </Field>
            </div>
          </div>

          <div
            className="pt-4 flex items-center justify-end gap-2"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded text-sm transition hover:bg-surface-2"
              style={{ color: "var(--text-muted)" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 rounded text-sm font-medium transition shadow-sm"
              style={{ background: "var(--accent)", color: "#1B1F1D" }}
            >
              <Check size={15} /> Save Deal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
