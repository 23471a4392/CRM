import React, { useState } from "react";
import { Check } from "lucide-react";
import Field from "./Field.jsx";
import { STAGES } from "../utils.js";

export default function DealForm({ initial, contacts, onCancel, onSave }) {
  const [form, setForm] = useState(
    initial || {
      title: "",
      contactId: contacts[0]?.id || "",
      value: "",
      stage: "lead",
      closeDate: "",
      notes: "",
    }
  );
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const valid = form.title.trim().length > 0 && form.value !== "";

  return (
    <div className="rounded-lg p-5 mb-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Deal title *">
          <input
            className="ledger-input w-full rounded px-3 py-2 text-sm"
            value={form.title}
            onChange={set("title")}
            placeholder="Q3 platform renewal"
            autoFocus
          />
        </Field>
        <Field label="Value (USD) *">
          <input
            type="number"
            className="ledger-input w-full rounded px-3 py-2 text-sm ledger-mono"
            value={form.value}
            onChange={set("value")}
            placeholder="12000"
          />
        </Field>
        <Field label="Contact">
          <select className="ledger-input w-full rounded px-3 py-2 text-sm" value={form.contactId} onChange={set("contactId")}>
            <option value="">— none —</option>
            {contacts.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
                {c.company ? ` (${c.company})` : ""}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Stage">
          <select className="ledger-input w-full rounded px-3 py-2 text-sm" value={form.stage} onChange={set("stage")}>
            {STAGES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Expected close">
          <input type="date" className="ledger-input w-full rounded px-3 py-2 text-sm" value={form.closeDate} onChange={set("closeDate")} />
        </Field>
        <Field label="Notes">
          <input className="ledger-input w-full rounded px-3 py-2 text-sm" value={form.notes} onChange={set("notes")} placeholder="Optional" />
        </Field>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <button
          disabled={!valid}
          onClick={() => valid && onSave({ ...form, value: Number(form.value) || 0 })}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium disabled:opacity-40"
          style={{ background: "var(--accent)", color: "#1B1F1D" }}
        >
          <Check size={14} /> Save deal
        </button>
        <button onClick={onCancel} className="px-3 py-1.5 rounded text-sm" style={{ color: "var(--text-muted)" }}>
          Cancel
        </button>
      </div>
    </div>
  );
}
