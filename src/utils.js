export const STAGES = [
  { id: "lead", label: "Lead", color: "#9AA39B", probability: 0.1 },
  { id: "contacted", label: "Contacted", color: "#C9A961", probability: 0.3 },
  { id: "proposal", label: "Proposal", color: "#7C9CBF", probability: 0.6 },
  { id: "negotiation", label: "Negotiation", color: "#A585C1", probability: 0.8 },
  { id: "won", label: "Won", color: "#7FA98C", probability: 1.0 },
  { id: "lost", label: "Lost", color: "#C17A5C", probability: 0.0 },
];

export function stageMeta(id) {
  return STAGES.find((s) => s.id === id) || STAGES[0];
}

export function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export function currency(n, currencyCode = "USD") {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      maximumFractionDigits: 0,
    }).format(Number(n) || 0);
  } catch {
    return `$${Number(n || 0).toLocaleString()}`;
  }
}

export function pipelineValue(deals) {
  return deals
    .filter((d) => d.stage !== "won" && d.stage !== "lost")
    .reduce((sum, d) => sum + (Number(d.value) || 0), 0);
}

export function wonValue(deals) {
  return deals
    .filter((d) => d.stage === "won")
    .reduce((sum, d) => sum + (Number(d.value) || 0), 0);
}

export function weightedPipelineValue(deals) {
  return deals
    .filter((d) => d.stage !== "won" && d.stage !== "lost")
    .reduce((sum, d) => {
      const prob = typeof d.probability === "number" ? d.probability : (stageMeta(d.stage).probability || 0.5);
      return sum + (Number(d.value) || 0) * prob;
    }, 0);
}

export function dealsByStage(deals) {
  return STAGES.map((s) => ({
    ...s,
    value: deals
      .filter((d) => d.stage === s.id)
      .reduce((sum, d) => sum + (Number(d.value) || 0), 0),
    count: deals.filter((d) => d.stage === s.id).length,
  }));
}

export function topContactsByValue(contacts, deals, limit = 5) {
  return contacts
    .map((c) => ({
      ...c,
      total: deals
        .filter((d) => d.contactId === c.id)
        .reduce((sum, d) => sum + (Number(d.value) || 0), 0),
      dealCount: deals.filter((d) => d.contactId === c.id).length,
    }))
    .filter((c) => c.total > 0)
    .sort((a, b) => b.total - a.total)
    .slice(0, limit);
}

export function formatDate(dateVal) {
  if (!dateVal) return "";
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) return String(dateVal);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getInitials(name) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const AVATAR_PALETTES = [
  { bg: "#3D4F46", text: "#A9D6BA" },
  { bg: "#4A3B52", text: "#D8B4E2" },
  { bg: "#524430", text: "#EED1A3" },
  { bg: "#2E4759", text: "#9BCBEB" },
  { bg: "#59362E", text: "#EBB4A7" },
  { bg: "#364B54", text: "#A5DBE8" },
  { bg: "#4D4637", text: "#DFD1B3" },
];

export function getAvatarColor(str) {
  if (!str) return AVATAR_PALETTES[0];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const idx = Math.abs(hash) % AVATAR_PALETTES.length;
  return AVATAR_PALETTES[idx];
}
