import React, { useMemo } from "react";
import { Users, Wallet, LayoutGrid } from "lucide-react";
import { currency, pipelineValue, wonValue, dealsByStage, topContactsByValue } from "../utils.js";

export default function DashboardView({ contacts, deals }) {
  const stats = useMemo(() => {
    const byStage = dealsByStage(deals);
    const maxStageValue = Math.max(1, ...byStage.map((s) => s.value));
    return {
      pipeline: pipelineValue(deals),
      won: wonValue(deals),
      byStage,
      maxStageValue,
      topContacts: topContactsByValue(contacts, deals),
    };
  }, [contacts, deals]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg p-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
            <Users size={14} /> <span className="text-xs uppercase tracking-wider">Contacts</span>
          </div>
          <div className="text-2xl mt-1 ledger-display">{contacts.length}</div>
        </div>
        <div className="rounded-lg p-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
            <Wallet size={14} /> <span className="text-xs uppercase tracking-wider">Open pipeline</span>
          </div>
          <div className="text-2xl mt-1 ledger-mono" style={{ color: "var(--accent)" }}>
            {currency(stats.pipeline)}
          </div>
        </div>
        <div className="rounded-lg p-4" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div className="flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
            <LayoutGrid size={14} /> <span className="text-xs uppercase tracking-wider">Won to date</span>
          </div>
          <div className="text-2xl mt-1 ledger-mono" style={{ color: "var(--positive)" }}>
            {currency(stats.won)}
          </div>
        </div>
      </div>

      <div className="rounded-lg p-5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <h3 className="ledger-display text-sm uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>
          Pipeline by stage
        </h3>
        <div className="space-y-3">
          {stats.byStage.map((s) => (
            <div key={s.id} className="flex items-center gap-3">
              <div className="w-24 text-sm">{s.label}</div>
              <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "var(--surface-2)" }}>
                <div className="h-full rounded-full" style={{ width: `${(s.value / stats.maxStageValue) * 100}%`, background: s.color }} />
              </div>
              <div className="w-24 text-right text-sm ledger-mono" style={{ color: "var(--text-muted)" }}>
                {currency(s.value)}
              </div>
              <div className="w-10 text-right text-xs" style={{ color: "var(--text-muted)" }}>
                ×{s.count}
              </div>
            </div>
          ))}
        </div>
      </div>

      {stats.topContacts.length > 0 && (
        <div className="rounded-lg p-5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <h3 className="ledger-display text-sm uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>
            Top contacts by deal value
          </h3>
          <div className="space-y-2">
            {stats.topContacts.map((c) => (
              <div key={c.id} className="flex items-center justify-between text-sm">
                <span>
                  {c.name} {c.company && <span style={{ color: "var(--text-muted)" }}>· {c.company}</span>}
                </span>
                <span className="ledger-mono" style={{ color: "var(--accent)" }}>
                  {currency(c.total)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
