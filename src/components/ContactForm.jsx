import React, { useState } from "react";
import { Check } from "lucide-react";
import Field from "./Field.jsx";

export default function ContactForm({ initial, onCancel, onSave }) {
  const [form, setForm] = useState(
    initial || { name: "", company: "", email: "", phone: "", notes: "" }
  );
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const valid = form.name.trim().length > 0;

  return (
    <div className="rounded-lg p-5 mb-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Name *">
          <input
            className="ledger-input w-full rounded px-3 py-2 text-sm"
            value={form.name}
            onChange={set("name")}
            placeholder="Jordan Blake"
            autoFocus
          />
        </Field>
        <Field label="Company">
          <input
            className="ledger-input w-full rounded px-3 py-2 text-sm"
            value={form.company}
            onChange={set("company")}
            placeholder="Acme Co."
          />
        </Field>
        <Field label="Email">
          <input
            className="ledger-input w-full rounded px-3 py-2 text-sm"
            value={form.email}
            onChange={set("email")}
            placeholder="jordan@acme.com"
          />
        </Field>
        <Field label="Phone">
          <input
            className="ledger-input w-full rounded px-3 py-2 text-sm"
            value={form.phone}
            onChange={set("phone")}
            placeholder="(555) 010-1234"
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Notes">
            <textarea
              className="ledger-input w-full rounded px-3 py-2 text-sm resize-none"
              rows={2}
              value={form.notes}
              onChange={set("notes")}
              placeholder="How you met, context, anything worth remembering"
            />
          </Field>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <button
          disabled={!valid}
          onClick={() => valid && onSave(form)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium disabled:opacity-40"
          style={{ background: "var(--accent)", color: "#1B1F1D" }}
        >
          <Check size={14} /> Save contact
        </button>
        <button onClick={onCancel} className="px-3 py-1.5 rounded text-sm" style={{ color: "var(--text-muted)" }}>
          Cancel
        </button>
      </div>
    </div>
  );
}
