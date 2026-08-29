import React, { useState } from "react";
import { Plus, Search, Trash2, Pencil, Building2, Mail, Phone } from "lucide-react";
import ContactForm from "./ContactForm.jsx";
import { currency } from "../utils.js";

export default function ContactsView({ contacts, deals, onAdd, onUpdate, onDelete }) {
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const filtered = contacts.filter((c) =>
    `${c.name} ${c.company} ${c.email}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
          <input
            className="ledger-input w-full rounded pl-8 pr-3 py-2 text-sm"
            placeholder="Search contacts…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
          }}
          className="flex items-center gap-1.5 px-3 py-2 rounded text-sm font-medium"
          style={{ background: "var(--accent)", color: "#1B1F1D" }}
        >
          <Plus size={14} /> Add contact
        </button>
      </div>

      {showForm && (
        <ContactForm
          onCancel={() => setShowForm(false)}
          onSave={(data) => {
            onAdd(data);
            setShowForm(false);
          }}
        />
      )}

      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="text-sm py-10 text-center" style={{ color: "var(--text-muted)" }}>
            {contacts.length === 0 ? "No contacts yet. Add your first one above." : "No contacts match that search."}
          </div>
        )}
        {filtered.map((c) =>
          editingId === c.id ? (
            <ContactForm
              key={c.id}
              initial={c}
              onCancel={() => setEditingId(null)}
              onSave={(data) => {
                onUpdate(c.id, data);
                setEditingId(null);
              }}
            />
          ) : (
            <div key={c.id} className="row-hover rounded-lg p-4 flex items-center justify-between" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <div>
                <div className="font-medium">{c.name}</div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                  {c.company && (
                    <span className="flex items-center gap-1">
                      <Building2 size={12} /> {c.company}
                    </span>
                  )}
                  {c.email && (
                    <span className="flex items-center gap-1">
                      <Mail size={12} /> {c.email}
                    </span>
                  )}
                  {c.phone && (
                    <span className="flex items-center gap-1">
                      <Phone size={12} /> {c.phone}
                    </span>
                  )}
                </div>
                {c.notes && (
                  <div className="text-xs mt-1.5" style={{ color: "var(--text-muted)" }}>
                    {c.notes}
                  </div>
                )}
                {deals.some((d) => d.contactId === c.id) && (
                  <div className="text-xs mt-1.5 ledger-mono" style={{ color: "var(--accent)" }}>
                    {currency(deals.filter((d) => d.contactId === c.id).reduce((s, d) => s + d.value, 0))} across{" "}
                    {deals.filter((d) => d.contactId === c.id).length} deal(s)
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => {
                    setEditingId(c.id);
                    setShowForm(false);
                  }}
                  className="p-2 rounded"
                  style={{ color: "var(--text-muted)" }}
                  aria-label="Edit contact"
                >
                  <Pencil size={14} />
                </button>
                <button onClick={() => onDelete(c.id)} className="p-2 rounded" style={{ color: "var(--negative)" }} aria-label="Delete contact">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
