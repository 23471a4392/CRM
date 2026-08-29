export const STAGES = [
  { id: "lead", label: "Lead", color: "#9AA39B" },
  { id: "contacted", label: "Contacted", color: "#C9A961" },
  { id: "proposal", label: "Proposal", color: "#7C9CBF" },
  { id: "won", label: "Won", color: "#7FA98C" },
  { id: "lost", label: "Lost", color: "#C17A5C" },
];

export function stageMeta(id) {
  return STAGES.find((s) => s.id === id) || STAGES[0];
}

export function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export function currency(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(n) || 0);
}

export function pipelineValue(deals) {
  return deals
    .filter((d) => d.stage !== "won" && d.stage !== "lost")
    .reduce((sum, d) => sum + d.value, 0);
}

export function wonValue(deals) {
  return deals.filter((d) => d.stage === "won").reduce((sum, d) => sum + d.value, 0);
}

export function dealsByStage(deals) {
  return STAGES.map((s) => ({
    ...s,
    value: deals.filter((d) => d.stage === s.id).reduce((sum, d) => sum + d.value, 0),
    count: deals.filter((d) => d.stage === s.id).length,
  }));
}

export function topContactsByValue(contacts, deals, limit = 5) {
  return contacts
    .map((c) => ({
      ...c,
      total: deals.filter((d) => d.contactId === c.id).reduce((sum, d) => sum + d.value, 0),
    }))
    .filter((c) => c.total > 0)
    .sort((a, b) => b.total - a.total)
    .slice(0, limit);
}
