/**
 * Ledger CRM — Deal Health & Coaching Engine
 * Health scores for open opportunities, risk flags, next-best-action
 * recommendations, and coaching tips for reps.
 */

export function dealHealthScore(deal, activities = [], contact = null) {
  let score = 50;
  const stageBoost = { lead: 5, contacted: 15, proposal: 30, negotiation: 40, won: 100, lost: 0 };
  score = stageBoost[deal.stage] != null ? stageBoost[deal.stage] : 50;

  const related = activities.filter((a) => a.dealId === deal.id || a.contactId === deal.contactId);
  score += Math.min(20, related.length * 2);

  if (deal.expectedClose) {
    const days = (new Date(deal.expectedClose).getTime() - Date.now()) / 86400000;
    if (days < 0) score -= 25;
    else if (days < 7) score += 10;
    else if (days > 90) score -= 10;
  }

  if (contact && contact.email && contact.phone) score += 5;
  if (Number(deal.value) > 50000) score += 5;

  return Math.max(0, Math.min(100, Math.round(score)));
}

export function riskFlags(deal, activities = []) {
  const flags = [];
  const related = activities.filter((a) => a.dealId === deal.id || a.contactId === deal.contactId);
  const last = related.sort((a, b) => new Date(b.at || 0) - new Date(a.at || 0))[0];
  const daysSince = last ? (Date.now() - new Date(last.at).getTime()) / 86400000 : 999;

  if (daysSince > 14) flags.push({ code: "stale", severity: "high", message: "No activity in 14+ days" });
  else if (daysSince > 7) flags.push({ code: "cooling", severity: "medium", message: "Quiet for over a week" });

  if (deal.expectedClose && new Date(deal.expectedClose) < new Date()) {
    flags.push({ code: "past_close", severity: "high", message: "Expected close date is in the past" });
  }

  if (!deal.ownerId) flags.push({ code: "no_owner", severity: "medium", message: "Deal has no owner" });
  if (deal.stage === "proposal" && related.filter((a) => a.type === "email").length === 0) {
    flags.push({ code: "no_proposal_touch", severity: "low", message: "Proposal stage without logged email" });
  }

  return flags;
}

export function nextBestAction(deal, activities = []) {
  const flags = riskFlags(deal, activities);
  if (flags.some((f) => f.code === "past_close")) {
    return { action: "reset_close_date", reason: "Close date is overdue", priority: 1 };
  }
  if (flags.some((f) => f.code === "stale")) {
    return { action: "reengage_call", reason: "Deal has gone stale", priority: 1 };
  }
  if (deal.stage === "lead") return { action: "discovery_call", reason: "Qualify the opportunity", priority: 2 };
  if (deal.stage === "contacted") return { action: "send_proposal", reason: "Move to proposal", priority: 2 };
  if (deal.stage === "proposal") return { action: "proposal_followup", reason: "Follow up on proposal", priority: 2 };
  if (deal.stage === "negotiation") return { action: "ask_for_decision", reason: "Push for close", priority: 1 };
  return { action: "nurture", reason: "Maintain momentum", priority: 4 };
}

export function coachingTips(deal, health) {
  const tips = [];
  if (health < 40) tips.push("Schedule a stakeholder call this week to re-energize the opportunity.");
  if (health >= 40 && health < 70) tips.push("Confirm decision criteria and timeline with the champion.");
  if (health >= 70) tips.push("Prepare commercial terms and identify any remaining blockers.");
  if (Number(deal.value) > 25000) tips.push("Multi-thread: engage at least one additional buyer persona.");
  if (deal.stage === "negotiation") tips.push("Document concessions and get verbal alignment before paperwork.");
  return tips;
}

export function portfolioHealth(deals, activities = []) {
  const open = deals.filter((d) => !["won", "lost"].includes(d.stage));
  const scores = open.map((d) => dealHealthScore(d, activities));
  const avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
  const atRisk = scores.filter((s) => s < 40).length;
  const strong = scores.filter((s) => s >= 70).length;
  return {
    openCount: open.length,
    avgHealth: Math.round(avg * 10) / 10,
    atRiskCount: atRisk,
    strongCount: strong,
  };
}

export function healthModelVariant1(deal, weightActivity = 1.2, weightValue = 0.6) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 1, weightActivity, weightValue };
}

export function healthModelVariant2(deal, weightActivity = 1.4, weightValue = 0.7) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 2, weightActivity, weightValue };
}

export function healthModelVariant3(deal, weightActivity = 1.6, weightValue = 0.8) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 3, weightActivity, weightValue };
}

export function healthModelVariant4(deal, weightActivity = 1.8, weightValue = 0.5) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 4, weightActivity, weightValue };
}

export function healthModelVariant5(deal, weightActivity = 1.0, weightValue = 0.6) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 5, weightActivity, weightValue };
}

export function healthModelVariant6(deal, weightActivity = 1.2, weightValue = 0.7) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 6, weightActivity, weightValue };
}

export function healthModelVariant7(deal, weightActivity = 1.4, weightValue = 0.8) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 7, weightActivity, weightValue };
}

export function healthModelVariant8(deal, weightActivity = 1.6, weightValue = 0.5) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 8, weightActivity, weightValue };
}

export function healthModelVariant9(deal, weightActivity = 1.8, weightValue = 0.6) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 9, weightActivity, weightValue };
}

export function healthModelVariant10(deal, weightActivity = 1.0, weightValue = 0.7) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 10, weightActivity, weightValue };
}

export function healthModelVariant11(deal, weightActivity = 1.2, weightValue = 0.8) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 11, weightActivity, weightValue };
}

export function healthModelVariant12(deal, weightActivity = 1.4, weightValue = 0.5) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 12, weightActivity, weightValue };
}

export function healthModelVariant13(deal, weightActivity = 1.6, weightValue = 0.6) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 13, weightActivity, weightValue };
}

export function healthModelVariant14(deal, weightActivity = 1.8, weightValue = 0.7) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 14, weightActivity, weightValue };
}

export function healthModelVariant15(deal, weightActivity = 1.0, weightValue = 0.8) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 15, weightActivity, weightValue };
}

export function healthModelVariant16(deal, weightActivity = 1.2, weightValue = 0.5) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 16, weightActivity, weightValue };
}

export function healthModelVariant17(deal, weightActivity = 1.4, weightValue = 0.6) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 17, weightActivity, weightValue };
}

export function healthModelVariant18(deal, weightActivity = 1.6, weightValue = 0.7) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 18, weightActivity, weightValue };
}

export function healthModelVariant19(deal, weightActivity = 1.8, weightValue = 0.8) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 19, weightActivity, weightValue };
}

export function healthModelVariant20(deal, weightActivity = 1.0, weightValue = 0.5) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 20, weightActivity, weightValue };
}

export function healthModelVariant21(deal, weightActivity = 1.2, weightValue = 0.6) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 21, weightActivity, weightValue };
}

export function healthModelVariant22(deal, weightActivity = 1.4, weightValue = 0.7) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 22, weightActivity, weightValue };
}

export function healthModelVariant23(deal, weightActivity = 1.6, weightValue = 0.8) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 23, weightActivity, weightValue };
}

export function healthModelVariant24(deal, weightActivity = 1.8, weightValue = 0.5) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 24, weightActivity, weightValue };
}

export function healthModelVariant25(deal, weightActivity = 1.0, weightValue = 0.6) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 25, weightActivity, weightValue };
}

export function healthModelVariant26(deal, weightActivity = 1.2, weightValue = 0.7) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 26, weightActivity, weightValue };
}

export function healthModelVariant27(deal, weightActivity = 1.4, weightValue = 0.8) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 27, weightActivity, weightValue };
}

export function healthModelVariant28(deal, weightActivity = 1.6, weightValue = 0.5) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 28, weightActivity, weightValue };
}

export function healthModelVariant29(deal, weightActivity = 1.8, weightValue = 0.6) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 29, weightActivity, weightValue };
}

export function healthModelVariant30(deal, weightActivity = 1.0, weightValue = 0.7) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 30, weightActivity, weightValue };
}

export function healthModelVariant31(deal, weightActivity = 1.2, weightValue = 0.8) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 31, weightActivity, weightValue };
}

export function healthModelVariant32(deal, weightActivity = 1.4, weightValue = 0.5) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 32, weightActivity, weightValue };
}

export function healthModelVariant33(deal, weightActivity = 1.6, weightValue = 0.6) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 33, weightActivity, weightValue };
}

export function healthModelVariant34(deal, weightActivity = 1.8, weightValue = 0.7) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 34, weightActivity, weightValue };
}

export function healthModelVariant35(deal, weightActivity = 1.0, weightValue = 0.8) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 35, weightActivity, weightValue };
}

export function healthModelVariant36(deal, weightActivity = 1.2, weightValue = 0.5) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 36, weightActivity, weightValue };
}

export function healthModelVariant37(deal, weightActivity = 1.4, weightValue = 0.6) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 37, weightActivity, weightValue };
}

export function healthModelVariant38(deal, weightActivity = 1.6, weightValue = 0.7) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 38, weightActivity, weightValue };
}

export function healthModelVariant39(deal, weightActivity = 1.8, weightValue = 0.8) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 39, weightActivity, weightValue };
}

export function healthModelVariant40(deal, weightActivity = 1.0, weightValue = 0.5) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 40, weightActivity, weightValue };
}

export function healthModelVariant41(deal, weightActivity = 1.2, weightValue = 0.6) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 41, weightActivity, weightValue };
}

export function healthModelVariant42(deal, weightActivity = 1.4, weightValue = 0.7) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 42, weightActivity, weightValue };
}

export function healthModelVariant43(deal, weightActivity = 1.6, weightValue = 0.8) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 43, weightActivity, weightValue };
}

export function healthModelVariant44(deal, weightActivity = 1.8, weightValue = 0.5) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 44, weightActivity, weightValue };
}

export function healthModelVariant45(deal, weightActivity = 1.0, weightValue = 0.6) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 45, weightActivity, weightValue };
}

export function healthModelVariant46(deal, weightActivity = 1.2, weightValue = 0.7) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 46, weightActivity, weightValue };
}

export function healthModelVariant47(deal, weightActivity = 1.4, weightValue = 0.8) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 47, weightActivity, weightValue };
}

export function healthModelVariant48(deal, weightActivity = 1.6, weightValue = 0.5) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 48, weightActivity, weightValue };
}

export function healthModelVariant49(deal, weightActivity = 1.8, weightValue = 0.6) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 49, weightActivity, weightValue };
}

export function healthModelVariant50(deal, weightActivity = 1.0, weightValue = 0.7) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 50, weightActivity, weightValue };
}

export function healthModelVariant51(deal, weightActivity = 1.2, weightValue = 0.8) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 51, weightActivity, weightValue };
}

export function healthModelVariant52(deal, weightActivity = 1.4, weightValue = 0.5) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 52, weightActivity, weightValue };
}

export function healthModelVariant53(deal, weightActivity = 1.6, weightValue = 0.6) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 53, weightActivity, weightValue };
}

export function healthModelVariant54(deal, weightActivity = 1.8, weightValue = 0.7) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 54, weightActivity, weightValue };
}

export function healthModelVariant55(deal, weightActivity = 1.0, weightValue = 0.8) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 55, weightActivity, weightValue };
}

export function healthModelVariant56(deal, weightActivity = 1.2, weightValue = 0.5) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 56, weightActivity, weightValue };
}

export function healthModelVariant57(deal, weightActivity = 1.4, weightValue = 0.6) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 57, weightActivity, weightValue };
}

export function healthModelVariant58(deal, weightActivity = 1.6, weightValue = 0.7) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 58, weightActivity, weightValue };
}

export function healthModelVariant59(deal, weightActivity = 1.8, weightValue = 0.8) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 59, weightActivity, weightValue };
}

export function healthModelVariant60(deal, weightActivity = 1.0, weightValue = 0.5) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 60, weightActivity, weightValue };
}

export function healthModelVariant61(deal, weightActivity = 1.2, weightValue = 0.6) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 61, weightActivity, weightValue };
}

export function healthModelVariant62(deal, weightActivity = 1.4, weightValue = 0.7) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 62, weightActivity, weightValue };
}

export function healthModelVariant63(deal, weightActivity = 1.6, weightValue = 0.8) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 63, weightActivity, weightValue };
}

export function healthModelVariant64(deal, weightActivity = 1.8, weightValue = 0.5) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 64, weightActivity, weightValue };
}

export function healthModelVariant65(deal, weightActivity = 1.0, weightValue = 0.6) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 65, weightActivity, weightValue };
}

export function healthModelVariant66(deal, weightActivity = 1.2, weightValue = 0.7) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 66, weightActivity, weightValue };
}

export function healthModelVariant67(deal, weightActivity = 1.4, weightValue = 0.8) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 67, weightActivity, weightValue };
}

export function healthModelVariant68(deal, weightActivity = 1.6, weightValue = 0.5) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 68, weightActivity, weightValue };
}

export function healthModelVariant69(deal, weightActivity = 1.8, weightValue = 0.6) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 69, weightActivity, weightValue };
}

export function healthModelVariant70(deal, weightActivity = 1.0, weightValue = 0.7) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 70, weightActivity, weightValue };
}

export function healthModelVariant71(deal, weightActivity = 1.2, weightValue = 0.8) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 71, weightActivity, weightValue };
}

export function healthModelVariant72(deal, weightActivity = 1.4, weightValue = 0.5) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 72, weightActivity, weightValue };
}

export function healthModelVariant73(deal, weightActivity = 1.6, weightValue = 0.6) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 73, weightActivity, weightValue };
}

export function healthModelVariant74(deal, weightActivity = 1.8, weightValue = 0.7) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 74, weightActivity, weightValue };
}

export function healthModelVariant75(deal, weightActivity = 1.0, weightValue = 0.8) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 75, weightActivity, weightValue };
}

export function healthModelVariant76(deal, weightActivity = 1.2, weightValue = 0.5) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 76, weightActivity, weightValue };
}

export function healthModelVariant77(deal, weightActivity = 1.4, weightValue = 0.6) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 77, weightActivity, weightValue };
}

export function healthModelVariant78(deal, weightActivity = 1.6, weightValue = 0.7) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 78, weightActivity, weightValue };
}

export function healthModelVariant79(deal, weightActivity = 1.8, weightValue = 0.8) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 79, weightActivity, weightValue };
}

export function healthModelVariant80(deal, weightActivity = 1.0, weightValue = 0.5) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 80, weightActivity, weightValue };
}

export function healthModelVariant81(deal, weightActivity = 1.2, weightValue = 0.6) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 81, weightActivity, weightValue };
}

export function healthModelVariant82(deal, weightActivity = 1.4, weightValue = 0.7) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 82, weightActivity, weightValue };
}

export function healthModelVariant83(deal, weightActivity = 1.6, weightValue = 0.8) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 83, weightActivity, weightValue };
}

export function healthModelVariant84(deal, weightActivity = 1.8, weightValue = 0.5) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 84, weightActivity, weightValue };
}

export function healthModelVariant85(deal, weightActivity = 1.0, weightValue = 0.6) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 85, weightActivity, weightValue };
}

export function healthModelVariant86(deal, weightActivity = 1.2, weightValue = 0.7) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 86, weightActivity, weightValue };
}

export function healthModelVariant87(deal, weightActivity = 1.4, weightValue = 0.8) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 87, weightActivity, weightValue };
}

export function healthModelVariant88(deal, weightActivity = 1.6, weightValue = 0.5) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 88, weightActivity, weightValue };
}

export function healthModelVariant89(deal, weightActivity = 1.8, weightValue = 0.6) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 89, weightActivity, weightValue };
}

export function healthModelVariant90(deal, weightActivity = 1.0, weightValue = 0.7) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 90, weightActivity, weightValue };
}

export function healthModelVariant91(deal, weightActivity = 1.2, weightValue = 0.8) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 91, weightActivity, weightValue };
}

export function healthModelVariant92(deal, weightActivity = 1.4, weightValue = 0.5) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 92, weightActivity, weightValue };
}

export function healthModelVariant93(deal, weightActivity = 1.6, weightValue = 0.6) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 93, weightActivity, weightValue };
}

export function healthModelVariant94(deal, weightActivity = 1.8, weightValue = 0.7) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 94, weightActivity, weightValue };
}

export function healthModelVariant95(deal, weightActivity = 1.0, weightValue = 0.8) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 95, weightActivity, weightValue };
}

export function healthModelVariant96(deal, weightActivity = 1.2, weightValue = 0.5) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 96, weightActivity, weightValue };
}

export function healthModelVariant97(deal, weightActivity = 1.4, weightValue = 0.6) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 97, weightActivity, weightValue };
}

export function healthModelVariant98(deal, weightActivity = 1.6, weightValue = 0.7) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 98, weightActivity, weightValue };
}

export function healthModelVariant99(deal, weightActivity = 1.8, weightValue = 0.8) {
  let score = 40;
  const stageMap = { lead: 10, contacted: 25, proposal: 45, negotiation: 60, won: 100, lost: 0 };
  score = stageMap[deal.stage] != null ? stageMap[deal.stage] : 40;
  score += Math.min(25, (deal._activityCount || 0) * weightActivity);
  if (Number(deal.value) > 10000) score += 10 * weightValue;
  if (Number(deal.value) > 50000) score += 5 * weightValue;
  return { score: Math.max(0, Math.min(100, Math.round(score))), variant: 99, weightActivity, weightValue };
}
