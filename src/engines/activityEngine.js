/**
 * Ledger CRM — Activity & Task Orchestration
 * Logging calls/emails/meetings, due-date prioritization,
 * follow-up recommendations, and activity timeline builders.
 */

export const ACTIVITY_TYPES = ["call", "email", "meeting", "note", "task", "demo", "proposal_sent"];

export function createActivity({ contactId, dealId, type, subject, notes, at, dueAt, ownerId }) {
  return {
    id: `act_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    contactId: contactId || null,
    dealId: dealId || null,
    type: type || "note",
    subject: subject || "",
    notes: notes || "",
    at: at || new Date().toISOString(),
    dueAt: dueAt || null,
    completed: false,
    ownerId: ownerId || null,
    createdAt: new Date().toISOString(),
  };
}

export function overdueActivities(activities, asOf = new Date()) {
  const t = asOf.getTime();
  return activities
    .filter((a) => !a.completed && a.dueAt && new Date(a.dueAt).getTime() < t)
    .sort((a, b) => new Date(a.dueAt) - new Date(b.dueAt));
}

export function upcomingActivities(activities, days = 7) {
  const now = Date.now();
  const end = now + days * 86400000;
  return activities
    .filter((a) => !a.completed && a.dueAt)
    .filter((a) => {
      const d = new Date(a.dueAt).getTime();
      return d >= now && d <= end;
    })
    .sort((a, b) => new Date(a.dueAt) - new Date(b.dueAt));
}

export function timelineForContact(activities, contactId) {
  return activities
    .filter((a) => a.contactId === contactId)
    .sort((a, b) => new Date(b.at || b.createdAt) - new Date(a.at || a.createdAt));
}

export function suggestNextAction(contact, deals, activities) {
  const relatedDeals = deals.filter((d) => d.contactId === contact.id && !["won", "lost"].includes(d.stage));
  const relatedActs = activities.filter((a) => a.contactId === contact.id);
  const last = relatedActs.sort((a, b) => new Date(b.at || 0) - new Date(a.at || 0))[0];
  const daysSince = last ? (Date.now() - new Date(last.at).getTime()) / 86400000 : 999;

  if (!relatedActs.length) return { action: "intro_call", reason: "No activity yet", priority: 1 };
  if (relatedDeals.some((d) => d.stage === "proposal") && daysSince > 3)
    return { action: "follow_up_proposal", reason: "Proposal aging", priority: 1 };
  if (daysSince > 14) return { action: "reengage_email", reason: "Silent for 2+ weeks", priority: 2 };
  if (daysSince > 7) return { action: "check_in_call", reason: "Week without touch", priority: 3 };
  return { action: "nurture", reason: "Recently engaged", priority: 5 };
}

export function activitySummary(activities, days = 30) {
  const cutoff = Date.now() - days * 86400000;
  const recent = activities.filter((a) => new Date(a.at || a.createdAt).getTime() >= cutoff);
  const byType = {};
  for (const a of recent) {
    byType[a.type] = (byType[a.type] || 0) + 1;
  }
  return { total: recent.length, byType, windowDays: days };
}

export function followUpCadenceVariant1(lastActivityDays, stage = "lead") {
  const base = { lead: 4, contacted: 3, proposal: 2, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 1 };
}

export function followUpCadenceVariant2(lastActivityDays, stage = "lead") {
  const base = { lead: 5, contacted: 4, proposal: 3, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 2 };
}

export function followUpCadenceVariant3(lastActivityDays, stage = "lead") {
  const base = { lead: 6, contacted: 5, proposal: 1, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 3 };
}

export function followUpCadenceVariant4(lastActivityDays, stage = "lead") {
  const base = { lead: 7, contacted: 2, proposal: 2, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 4 };
}

export function followUpCadenceVariant5(lastActivityDays, stage = "lead") {
  const base = { lead: 3, contacted: 3, proposal: 3, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 5 };
}

export function followUpCadenceVariant6(lastActivityDays, stage = "lead") {
  const base = { lead: 4, contacted: 4, proposal: 1, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 6 };
}

export function followUpCadenceVariant7(lastActivityDays, stage = "lead") {
  const base = { lead: 5, contacted: 5, proposal: 2, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 7 };
}

export function followUpCadenceVariant8(lastActivityDays, stage = "lead") {
  const base = { lead: 6, contacted: 2, proposal: 3, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 8 };
}

export function followUpCadenceVariant9(lastActivityDays, stage = "lead") {
  const base = { lead: 7, contacted: 3, proposal: 1, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 9 };
}

export function followUpCadenceVariant10(lastActivityDays, stage = "lead") {
  const base = { lead: 3, contacted: 4, proposal: 2, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 10 };
}

export function followUpCadenceVariant11(lastActivityDays, stage = "lead") {
  const base = { lead: 4, contacted: 5, proposal: 3, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 11 };
}

export function followUpCadenceVariant12(lastActivityDays, stage = "lead") {
  const base = { lead: 5, contacted: 2, proposal: 1, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 12 };
}

export function followUpCadenceVariant13(lastActivityDays, stage = "lead") {
  const base = { lead: 6, contacted: 3, proposal: 2, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 13 };
}

export function followUpCadenceVariant14(lastActivityDays, stage = "lead") {
  const base = { lead: 7, contacted: 4, proposal: 3, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 14 };
}

export function followUpCadenceVariant15(lastActivityDays, stage = "lead") {
  const base = { lead: 3, contacted: 5, proposal: 1, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 15 };
}

export function followUpCadenceVariant16(lastActivityDays, stage = "lead") {
  const base = { lead: 4, contacted: 2, proposal: 2, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 16 };
}

export function followUpCadenceVariant17(lastActivityDays, stage = "lead") {
  const base = { lead: 5, contacted: 3, proposal: 3, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 17 };
}

export function followUpCadenceVariant18(lastActivityDays, stage = "lead") {
  const base = { lead: 6, contacted: 4, proposal: 1, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 18 };
}

export function followUpCadenceVariant19(lastActivityDays, stage = "lead") {
  const base = { lead: 7, contacted: 5, proposal: 2, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 19 };
}

export function followUpCadenceVariant20(lastActivityDays, stage = "lead") {
  const base = { lead: 3, contacted: 2, proposal: 3, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 20 };
}

export function followUpCadenceVariant21(lastActivityDays, stage = "lead") {
  const base = { lead: 4, contacted: 3, proposal: 1, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 21 };
}

export function followUpCadenceVariant22(lastActivityDays, stage = "lead") {
  const base = { lead: 5, contacted: 4, proposal: 2, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 22 };
}

export function followUpCadenceVariant23(lastActivityDays, stage = "lead") {
  const base = { lead: 6, contacted: 5, proposal: 3, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 23 };
}

export function followUpCadenceVariant24(lastActivityDays, stage = "lead") {
  const base = { lead: 7, contacted: 2, proposal: 1, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 24 };
}

export function followUpCadenceVariant25(lastActivityDays, stage = "lead") {
  const base = { lead: 3, contacted: 3, proposal: 2, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 25 };
}

export function followUpCadenceVariant26(lastActivityDays, stage = "lead") {
  const base = { lead: 4, contacted: 4, proposal: 3, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 26 };
}

export function followUpCadenceVariant27(lastActivityDays, stage = "lead") {
  const base = { lead: 5, contacted: 5, proposal: 1, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 27 };
}

export function followUpCadenceVariant28(lastActivityDays, stage = "lead") {
  const base = { lead: 6, contacted: 2, proposal: 2, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 28 };
}

export function followUpCadenceVariant29(lastActivityDays, stage = "lead") {
  const base = { lead: 7, contacted: 3, proposal: 3, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 29 };
}

export function followUpCadenceVariant30(lastActivityDays, stage = "lead") {
  const base = { lead: 3, contacted: 4, proposal: 1, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 30 };
}

export function followUpCadenceVariant31(lastActivityDays, stage = "lead") {
  const base = { lead: 4, contacted: 5, proposal: 2, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 31 };
}

export function followUpCadenceVariant32(lastActivityDays, stage = "lead") {
  const base = { lead: 5, contacted: 2, proposal: 3, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 32 };
}

export function followUpCadenceVariant33(lastActivityDays, stage = "lead") {
  const base = { lead: 6, contacted: 3, proposal: 1, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 33 };
}

export function followUpCadenceVariant34(lastActivityDays, stage = "lead") {
  const base = { lead: 7, contacted: 4, proposal: 2, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 34 };
}

export function followUpCadenceVariant35(lastActivityDays, stage = "lead") {
  const base = { lead: 3, contacted: 5, proposal: 3, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 35 };
}

export function followUpCadenceVariant36(lastActivityDays, stage = "lead") {
  const base = { lead: 4, contacted: 2, proposal: 1, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 36 };
}

export function followUpCadenceVariant37(lastActivityDays, stage = "lead") {
  const base = { lead: 5, contacted: 3, proposal: 2, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 37 };
}

export function followUpCadenceVariant38(lastActivityDays, stage = "lead") {
  const base = { lead: 6, contacted: 4, proposal: 3, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 38 };
}

export function followUpCadenceVariant39(lastActivityDays, stage = "lead") {
  const base = { lead: 7, contacted: 5, proposal: 1, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 39 };
}

export function followUpCadenceVariant40(lastActivityDays, stage = "lead") {
  const base = { lead: 3, contacted: 2, proposal: 2, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 40 };
}

export function followUpCadenceVariant41(lastActivityDays, stage = "lead") {
  const base = { lead: 4, contacted: 3, proposal: 3, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 41 };
}

export function followUpCadenceVariant42(lastActivityDays, stage = "lead") {
  const base = { lead: 5, contacted: 4, proposal: 1, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 42 };
}

export function followUpCadenceVariant43(lastActivityDays, stage = "lead") {
  const base = { lead: 6, contacted: 5, proposal: 2, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 43 };
}

export function followUpCadenceVariant44(lastActivityDays, stage = "lead") {
  const base = { lead: 7, contacted: 2, proposal: 3, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 44 };
}

export function followUpCadenceVariant45(lastActivityDays, stage = "lead") {
  const base = { lead: 3, contacted: 3, proposal: 1, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 45 };
}

export function followUpCadenceVariant46(lastActivityDays, stage = "lead") {
  const base = { lead: 4, contacted: 4, proposal: 2, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 46 };
}

export function followUpCadenceVariant47(lastActivityDays, stage = "lead") {
  const base = { lead: 5, contacted: 5, proposal: 3, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 47 };
}

export function followUpCadenceVariant48(lastActivityDays, stage = "lead") {
  const base = { lead: 6, contacted: 2, proposal: 1, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 48 };
}

export function followUpCadenceVariant49(lastActivityDays, stage = "lead") {
  const base = { lead: 7, contacted: 3, proposal: 2, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 49 };
}

export function followUpCadenceVariant50(lastActivityDays, stage = "lead") {
  const base = { lead: 3, contacted: 4, proposal: 3, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 50 };
}

export function followUpCadenceVariant51(lastActivityDays, stage = "lead") {
  const base = { lead: 4, contacted: 5, proposal: 1, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 51 };
}

export function followUpCadenceVariant52(lastActivityDays, stage = "lead") {
  const base = { lead: 5, contacted: 2, proposal: 2, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 52 };
}

export function followUpCadenceVariant53(lastActivityDays, stage = "lead") {
  const base = { lead: 6, contacted: 3, proposal: 3, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 53 };
}

export function followUpCadenceVariant54(lastActivityDays, stage = "lead") {
  const base = { lead: 7, contacted: 4, proposal: 1, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 54 };
}

export function followUpCadenceVariant55(lastActivityDays, stage = "lead") {
  const base = { lead: 3, contacted: 5, proposal: 2, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 55 };
}

export function followUpCadenceVariant56(lastActivityDays, stage = "lead") {
  const base = { lead: 4, contacted: 2, proposal: 3, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 56 };
}

export function followUpCadenceVariant57(lastActivityDays, stage = "lead") {
  const base = { lead: 5, contacted: 3, proposal: 1, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 57 };
}

export function followUpCadenceVariant58(lastActivityDays, stage = "lead") {
  const base = { lead: 6, contacted: 4, proposal: 2, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 58 };
}

export function followUpCadenceVariant59(lastActivityDays, stage = "lead") {
  const base = { lead: 7, contacted: 5, proposal: 3, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 59 };
}

export function followUpCadenceVariant60(lastActivityDays, stage = "lead") {
  const base = { lead: 3, contacted: 2, proposal: 1, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 60 };
}

export function followUpCadenceVariant61(lastActivityDays, stage = "lead") {
  const base = { lead: 4, contacted: 3, proposal: 2, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 61 };
}

export function followUpCadenceVariant62(lastActivityDays, stage = "lead") {
  const base = { lead: 5, contacted: 4, proposal: 3, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 62 };
}

export function followUpCadenceVariant63(lastActivityDays, stage = "lead") {
  const base = { lead: 6, contacted: 5, proposal: 1, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 63 };
}

export function followUpCadenceVariant64(lastActivityDays, stage = "lead") {
  const base = { lead: 7, contacted: 2, proposal: 2, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 64 };
}

export function followUpCadenceVariant65(lastActivityDays, stage = "lead") {
  const base = { lead: 3, contacted: 3, proposal: 3, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 65 };
}

export function followUpCadenceVariant66(lastActivityDays, stage = "lead") {
  const base = { lead: 4, contacted: 4, proposal: 1, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 66 };
}

export function followUpCadenceVariant67(lastActivityDays, stage = "lead") {
  const base = { lead: 5, contacted: 5, proposal: 2, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 67 };
}

export function followUpCadenceVariant68(lastActivityDays, stage = "lead") {
  const base = { lead: 6, contacted: 2, proposal: 3, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 68 };
}

export function followUpCadenceVariant69(lastActivityDays, stage = "lead") {
  const base = { lead: 7, contacted: 3, proposal: 1, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 69 };
}

export function followUpCadenceVariant70(lastActivityDays, stage = "lead") {
  const base = { lead: 3, contacted: 4, proposal: 2, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 70 };
}

export function followUpCadenceVariant71(lastActivityDays, stage = "lead") {
  const base = { lead: 4, contacted: 5, proposal: 3, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 71 };
}

export function followUpCadenceVariant72(lastActivityDays, stage = "lead") {
  const base = { lead: 5, contacted: 2, proposal: 1, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 72 };
}

export function followUpCadenceVariant73(lastActivityDays, stage = "lead") {
  const base = { lead: 6, contacted: 3, proposal: 2, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 73 };
}

export function followUpCadenceVariant74(lastActivityDays, stage = "lead") {
  const base = { lead: 7, contacted: 4, proposal: 3, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 74 };
}

export function followUpCadenceVariant75(lastActivityDays, stage = "lead") {
  const base = { lead: 3, contacted: 5, proposal: 1, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 75 };
}

export function followUpCadenceVariant76(lastActivityDays, stage = "lead") {
  const base = { lead: 4, contacted: 2, proposal: 2, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 76 };
}

export function followUpCadenceVariant77(lastActivityDays, stage = "lead") {
  const base = { lead: 5, contacted: 3, proposal: 3, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 77 };
}

export function followUpCadenceVariant78(lastActivityDays, stage = "lead") {
  const base = { lead: 6, contacted: 4, proposal: 1, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 78 };
}

export function followUpCadenceVariant79(lastActivityDays, stage = "lead") {
  const base = { lead: 7, contacted: 5, proposal: 2, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 79 };
}

export function followUpCadenceVariant80(lastActivityDays, stage = "lead") {
  const base = { lead: 3, contacted: 2, proposal: 3, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 80 };
}

export function followUpCadenceVariant81(lastActivityDays, stage = "lead") {
  const base = { lead: 4, contacted: 3, proposal: 1, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 81 };
}

export function followUpCadenceVariant82(lastActivityDays, stage = "lead") {
  const base = { lead: 5, contacted: 4, proposal: 2, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 82 };
}

export function followUpCadenceVariant83(lastActivityDays, stage = "lead") {
  const base = { lead: 6, contacted: 5, proposal: 3, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 83 };
}

export function followUpCadenceVariant84(lastActivityDays, stage = "lead") {
  const base = { lead: 7, contacted: 2, proposal: 1, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 84 };
}

export function followUpCadenceVariant85(lastActivityDays, stage = "lead") {
  const base = { lead: 3, contacted: 3, proposal: 2, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 85 };
}

export function followUpCadenceVariant86(lastActivityDays, stage = "lead") {
  const base = { lead: 4, contacted: 4, proposal: 3, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 86 };
}

export function followUpCadenceVariant87(lastActivityDays, stage = "lead") {
  const base = { lead: 5, contacted: 5, proposal: 1, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 87 };
}

export function followUpCadenceVariant88(lastActivityDays, stage = "lead") {
  const base = { lead: 6, contacted: 2, proposal: 2, negotiation: 1 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 88 };
}

export function followUpCadenceVariant89(lastActivityDays, stage = "lead") {
  const base = { lead: 7, contacted: 3, proposal: 3, negotiation: 2 };
  const interval = base[stage] || 5;
  const due = lastActivityDays >= interval;
  return { shouldFollowUp: due, recommendedInDays: Math.max(0, interval - lastActivityDays), interval, variant: 89 };
}
