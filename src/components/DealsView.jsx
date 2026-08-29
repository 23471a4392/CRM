import React, { useState } from "react";
import { Plus, Trash2, Pencil } from "lucide-react";
import DealForm from "./DealForm.jsx";
import StageBadge from "./StageBadge.jsx";
import { STAGES, stageMeta, currency } from "../utils.js";

export default function DealsView({ deals, contacts, onAdd, onUpdate, onDelete }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [stageFilter, setStageFilter] = useState("all");

  const contactName = (id) => contacts.find((c) => c.id === id)?.name || "—";
  const filtered = deals.filter((d) => stageFilter === "all" || d.stage === stageFilter);
  const total = filtered.reduce((s, d) => s + d.value, 0);

  return (
    <div>
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-1 flex-wrap">
          <button
            onClick={() => setStageFilter("all")}
            className="text-xs px-2.5 py-1 rounded-full"
            style={{
              background: stageFilter === "all" ? "var(--accent-soft)" : "transparent",
              border: "1px solid var(--border)",
              color: stageFilter === "all" ? "var(--accent)" : "var(--text-muted)",
            }}
          >
            All
          </button>
          {STAGES.map((s) => (
            <button
              key={s.id}
              onClick={() => setStageFilter(s.id)}
              className="text-xs px-2.5 py-1 rounded-full"
              style={{
                background: stageFilter === s.id ? `${s.color}22` : "transparent",
                border: `1px solid ${stageFilter === s.id ? s.color : "var(--border)"}`,
                color: stageFilter === s.id ? s.color : "var(--text-muted)",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
          }}
          className="flex items-center gap-1.5 px-3 py-2 rounded text-sm font-medium ml-auto"
          style={{ background: "var(--accent)", color: "#1B1F1D" }}
        >
          <Plus size={14} /> Add deal
        </button>
      </div>

      {showForm && (
        <DealForm
          contacts={contacts}
          onCancel={() => setShowForm(false)}
          onSave={(data) => {
            onAdd(data);
            setShowForm(false);
          }}
        />
      )}

      <div className="space-y-2 mb-4">
        {filtered.length === 0 && (
          <div className="text-sm py-10 text-center" style={{ color: "var(--text-muted)" }}>
            {deals.length === 0 ? "No deals yet. Add your first one above." : "No deals in this stage."}
          </div>
        )}
        {filtered.map((d) =>
          editingId === d.id ? (
            <DealForm
              key={d.id}
              initial={d}
              contacts={contacts}
              onCancel={() => setEditingId(null)}
              onSave={(data) => {
                onUpdate(d.id, data);
                setEditingId(null);
              }}
            />
          ) : (
            <div key={d.id} className="row-hover rounded-lg p-4 flex items-center justify-between gap-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium truncate">{d.title}</span>
                  <StageBadge stage={d.stage} />
                </div>
                <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                  {contactName(d.contactId)}
                  {d.closeDate && ` · expected ${d.closeDate}`}
                </div>
                {d.notes && (
                  <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                    {d.notes}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="ledger-mono text-sm" style={{ color: "var(--accent)" }}>
                  {currency(d.value)}
                </span>
                <button
                  onClick={() => {
                    setEditingId(d.id);
                    setShowForm(false);
                  }}
                  className="p-2 rounded"
                  style={{ color: "var(--text-muted)" }}
                  aria-label="Edit deal"
                >
                  <Pencil size={14} />
                </button>
                <button onClick={() => onDelete(d.id)} className="p-2 rounded" style={{ color: "var(--negative)" }} aria-label="Delete deal">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          )
        )}
      </div>

      <div className="sticky bottom-0 rounded-lg px-5 py-3 flex items-center justify-between" style={{ background: "var(--surface-2)", border: "1px solid var(--accent)" }}>
        <span className="text-xs uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
          {stageFilter === "all" ? "Total, all stages" : `Total, ${stageMeta(stageFilter).label}`} · {filtered.length} deal(s)
        </span>
        <span className="ledger-mono text-lg" style={{ color: "var(--accent)" }}>
          {currency(total)}
        </span>
      </div>
    </div>
  );
}
