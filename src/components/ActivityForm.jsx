import React, { useState } from "react";
import { Check, X, Phone, Calendar, Mail, FileText, CheckSquare } from "lucide-react";
import Field from "./Field.jsx";

const ACTIVITY_TYPES = [
  { id: "call", label: "Phone Call", icon: Phone },
  { id: "meeting", label: "Meeting", icon: Calendar },
  { id: "email", label: "Email", icon: Mail },
  { id: "task", label: "Task / To-Do", icon: CheckSquare },
  { id: "note", label: "Note", icon: FileText },
];

export default function ActivityForm({
  initial,
  contacts,
  deals,
  preselectedContactId,
  preselectedDealId,
  onCancel,
  onSave,
}) {
  const [form, setForm] = useState(
    initial || {
      type: "call",
      title: "",
      contactId: preselectedContactId || (contacts[0]?.id || ""),
      dealId: preselectedDealId || "",
      dueDate: new Date().toISOString().split("T")[0],
      description: "",
      completed: false,
    }
  );

  const [errors, setErrors] = useState({});

  const set = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
    if (errors[k]) setErrors({ ...errors, [k]: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || form.title.trim().length < 2) {
      setErrors({ title: "Title / Summary is required" });
      return;
    }

    onSave({
      ...form,
      title: form.title.trim(),
      description: (form.description || "").trim(),
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
            {initial ? "Edit Activity" : "Log New Activity"}
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
          {/* Type Selector Buttons */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>
              Activity Type
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {ACTIVITY_TYPES.map((t) => {
                const Icon = t.icon;
                const isSelected = form.type === t.id;
                return (
                  <button
                    type="button"
                    key={t.id}
                    onClick={() => setForm({ ...form, type: t.id })}
                    className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-lg transition border text-xs font-medium"
                    style={{
                      background: isSelected ? "var(--accent)" : "var(--surface-2)",
                      color: isSelected ? "#1B1F1D" : "var(--text)",
                      borderColor: isSelected ? "var(--accent)" : "var(--border)",
                    }}
                  >
                    <Icon size={16} />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <Field label="Summary / Title *" error={errors.title}>
            <input
              className="ledger-input w-full rounded px-3 py-2 text-sm"
              value={form.title}
              onChange={set("title")}
              placeholder="e.g. Discovery call regarding enterprise renewal"
              autoFocus
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Contact">
              <select
                className="ledger-input w-full rounded px-3 py-2 text-sm"
                value={form.contactId || ""}
                onChange={set("contactId")}
              >
                <option value="">— Select Contact —</option>
                {contacts.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} {c.company ? `(${c.company})` : ""}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Related Deal">
              <select
                className="ledger-input w-full rounded px-3 py-2 text-sm"
                value={form.dealId || ""}
                onChange={set("dealId")}
              >
                <option value="">— None / General —</option>
                {deals.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.title}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Date">
              <input
                type="date"
                className="ledger-input w-full rounded px-3 py-2 text-sm"
                value={form.dueDate || ""}
                onChange={set("dueDate")}
              />
            </Field>

            <Field label="Status">
              <div className="pt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="activity-completed"
                  className="w-4 h-4 rounded accent-amber-500 cursor-pointer"
                  checked={form.completed}
                  onChange={(e) => setForm({ ...form, completed: e.target.checked })}
                />
                <label htmlFor="activity-completed" className="text-xs cursor-pointer select-none">
                  Mark as completed
                </label>
              </div>
            </Field>
          </div>

          <Field label="Detailed Notes / Outcome">
            <textarea
              className="ledger-input w-full rounded px-3 py-2 text-sm resize-none"
              rows={3}
              value={form.description || ""}
              onChange={set("description")}
              placeholder="Action items, takeaways, customer feedback…"
            />
          </Field>

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
              <Check size={15} /> Save Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
