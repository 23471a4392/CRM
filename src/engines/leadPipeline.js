/** Lead scoring & pipeline engine */
export const STAGES = ["lead","contacted","proposal","negotiation","won","lost"];
export function stageProbability(stage) {
  const m = { lead:0.1, contacted:0.25, proposal:0.55, negotiation:0.75, won:1, lost:0 };
  return m[stage] || 0;
}
export function scoreLead(c, activities=[], deals=[]) {
  let s = 15;
  if (c.email) s += 12;
  if (c.phone) s += 8;
  if (c.company) s += 10;
  if (c.source === "referral") s += 18;
  s += Math.min(20, activities.length * 3);
  return Math.max(0, Math.min(100, s));
}
export function weightedPipeline(deals) {
  return deals.filter(d => !["won","lost"].includes(d.stage))
    .reduce((s,d) => s + (Number(d.value)||0) * stageProbability(d.stage), 0);
}

export function leadBoost1(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 6;
  if (signals.timelineDays != null && signals.timelineDays <= 31) s += 4;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost2(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 7;
  if (signals.timelineDays != null && signals.timelineDays <= 32) s += 5;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost3(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 8;
  if (signals.timelineDays != null && signals.timelineDays <= 33) s += 6;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost4(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 9;
  if (signals.timelineDays != null && signals.timelineDays <= 34) s += 7;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost5(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 10;
  if (signals.timelineDays != null && signals.timelineDays <= 35) s += 8;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost6(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 11;
  if (signals.timelineDays != null && signals.timelineDays <= 36) s += 9;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost7(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 12;
  if (signals.timelineDays != null && signals.timelineDays <= 37) s += 10;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost8(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 13;
  if (signals.timelineDays != null && signals.timelineDays <= 38) s += 3;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost9(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 14;
  if (signals.timelineDays != null && signals.timelineDays <= 39) s += 4;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost10(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 5;
  if (signals.timelineDays != null && signals.timelineDays <= 40) s += 5;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost11(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 6;
  if (signals.timelineDays != null && signals.timelineDays <= 41) s += 6;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost12(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 7;
  if (signals.timelineDays != null && signals.timelineDays <= 42) s += 7;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost13(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 8;
  if (signals.timelineDays != null && signals.timelineDays <= 43) s += 8;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost14(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 9;
  if (signals.timelineDays != null && signals.timelineDays <= 44) s += 9;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost15(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 10;
  if (signals.timelineDays != null && signals.timelineDays <= 45) s += 10;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost16(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 11;
  if (signals.timelineDays != null && signals.timelineDays <= 46) s += 3;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost17(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 12;
  if (signals.timelineDays != null && signals.timelineDays <= 47) s += 4;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost18(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 13;
  if (signals.timelineDays != null && signals.timelineDays <= 48) s += 5;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost19(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 14;
  if (signals.timelineDays != null && signals.timelineDays <= 49) s += 6;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost20(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 5;
  if (signals.timelineDays != null && signals.timelineDays <= 50) s += 7;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost21(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 6;
  if (signals.timelineDays != null && signals.timelineDays <= 51) s += 8;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost22(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 7;
  if (signals.timelineDays != null && signals.timelineDays <= 52) s += 9;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost23(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 8;
  if (signals.timelineDays != null && signals.timelineDays <= 53) s += 10;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost24(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 9;
  if (signals.timelineDays != null && signals.timelineDays <= 54) s += 3;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost25(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 10;
  if (signals.timelineDays != null && signals.timelineDays <= 55) s += 4;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost26(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 11;
  if (signals.timelineDays != null && signals.timelineDays <= 56) s += 5;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost27(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 12;
  if (signals.timelineDays != null && signals.timelineDays <= 57) s += 6;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost28(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 13;
  if (signals.timelineDays != null && signals.timelineDays <= 58) s += 7;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost29(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 14;
  if (signals.timelineDays != null && signals.timelineDays <= 59) s += 8;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost30(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 5;
  if (signals.timelineDays != null && signals.timelineDays <= 60) s += 9;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost31(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 6;
  if (signals.timelineDays != null && signals.timelineDays <= 61) s += 10;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost32(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 7;
  if (signals.timelineDays != null && signals.timelineDays <= 62) s += 3;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost33(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 8;
  if (signals.timelineDays != null && signals.timelineDays <= 63) s += 4;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost34(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 9;
  if (signals.timelineDays != null && signals.timelineDays <= 64) s += 5;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost35(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 10;
  if (signals.timelineDays != null && signals.timelineDays <= 65) s += 6;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost36(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 11;
  if (signals.timelineDays != null && signals.timelineDays <= 66) s += 7;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost37(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 12;
  if (signals.timelineDays != null && signals.timelineDays <= 67) s += 8;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost38(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 13;
  if (signals.timelineDays != null && signals.timelineDays <= 68) s += 9;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost39(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 14;
  if (signals.timelineDays != null && signals.timelineDays <= 69) s += 10;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost40(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 5;
  if (signals.timelineDays != null && signals.timelineDays <= 70) s += 3;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost41(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 6;
  if (signals.timelineDays != null && signals.timelineDays <= 71) s += 4;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost42(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 7;
  if (signals.timelineDays != null && signals.timelineDays <= 72) s += 5;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost43(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 8;
  if (signals.timelineDays != null && signals.timelineDays <= 73) s += 6;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost44(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 9;
  if (signals.timelineDays != null && signals.timelineDays <= 74) s += 7;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost45(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 10;
  if (signals.timelineDays != null && signals.timelineDays <= 75) s += 8;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost46(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 11;
  if (signals.timelineDays != null && signals.timelineDays <= 76) s += 9;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost47(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 12;
  if (signals.timelineDays != null && signals.timelineDays <= 77) s += 10;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost48(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 13;
  if (signals.timelineDays != null && signals.timelineDays <= 78) s += 3;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost49(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 14;
  if (signals.timelineDays != null && signals.timelineDays <= 79) s += 4;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost50(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 5;
  if (signals.timelineDays != null && signals.timelineDays <= 80) s += 5;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost51(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 6;
  if (signals.timelineDays != null && signals.timelineDays <= 81) s += 6;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost52(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 7;
  if (signals.timelineDays != null && signals.timelineDays <= 82) s += 7;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost53(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 8;
  if (signals.timelineDays != null && signals.timelineDays <= 83) s += 8;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost54(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 9;
  if (signals.timelineDays != null && signals.timelineDays <= 84) s += 9;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost55(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 10;
  if (signals.timelineDays != null && signals.timelineDays <= 85) s += 10;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost56(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 11;
  if (signals.timelineDays != null && signals.timelineDays <= 86) s += 3;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost57(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 12;
  if (signals.timelineDays != null && signals.timelineDays <= 87) s += 4;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost58(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 13;
  if (signals.timelineDays != null && signals.timelineDays <= 88) s += 5;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost59(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 14;
  if (signals.timelineDays != null && signals.timelineDays <= 89) s += 6;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost60(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 5;
  if (signals.timelineDays != null && signals.timelineDays <= 30) s += 7;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost61(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 6;
  if (signals.timelineDays != null && signals.timelineDays <= 31) s += 8;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost62(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 7;
  if (signals.timelineDays != null && signals.timelineDays <= 32) s += 9;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost63(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 8;
  if (signals.timelineDays != null && signals.timelineDays <= 33) s += 10;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost64(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 9;
  if (signals.timelineDays != null && signals.timelineDays <= 34) s += 3;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost65(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 10;
  if (signals.timelineDays != null && signals.timelineDays <= 35) s += 4;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost66(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 11;
  if (signals.timelineDays != null && signals.timelineDays <= 36) s += 5;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost67(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 12;
  if (signals.timelineDays != null && signals.timelineDays <= 37) s += 6;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost68(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 13;
  if (signals.timelineDays != null && signals.timelineDays <= 38) s += 7;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost69(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 14;
  if (signals.timelineDays != null && signals.timelineDays <= 39) s += 8;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost70(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 5;
  if (signals.timelineDays != null && signals.timelineDays <= 40) s += 9;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost71(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 6;
  if (signals.timelineDays != null && signals.timelineDays <= 41) s += 10;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost72(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 7;
  if (signals.timelineDays != null && signals.timelineDays <= 42) s += 3;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost73(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 8;
  if (signals.timelineDays != null && signals.timelineDays <= 43) s += 4;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost74(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 9;
  if (signals.timelineDays != null && signals.timelineDays <= 44) s += 5;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost75(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 10;
  if (signals.timelineDays != null && signals.timelineDays <= 45) s += 6;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost76(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 11;
  if (signals.timelineDays != null && signals.timelineDays <= 46) s += 7;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost77(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 12;
  if (signals.timelineDays != null && signals.timelineDays <= 47) s += 8;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost78(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 13;
  if (signals.timelineDays != null && signals.timelineDays <= 48) s += 9;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost79(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 14;
  if (signals.timelineDays != null && signals.timelineDays <= 49) s += 10;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost80(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 5;
  if (signals.timelineDays != null && signals.timelineDays <= 50) s += 3;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost81(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 6;
  if (signals.timelineDays != null && signals.timelineDays <= 51) s += 4;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost82(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 7;
  if (signals.timelineDays != null && signals.timelineDays <= 52) s += 5;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost83(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 8;
  if (signals.timelineDays != null && signals.timelineDays <= 53) s += 6;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost84(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 9;
  if (signals.timelineDays != null && signals.timelineDays <= 54) s += 7;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost85(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 10;
  if (signals.timelineDays != null && signals.timelineDays <= 55) s += 8;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost86(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 11;
  if (signals.timelineDays != null && signals.timelineDays <= 56) s += 9;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost87(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 12;
  if (signals.timelineDays != null && signals.timelineDays <= 57) s += 10;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost88(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 13;
  if (signals.timelineDays != null && signals.timelineDays <= 58) s += 3;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost89(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 14;
  if (signals.timelineDays != null && signals.timelineDays <= 59) s += 4;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost90(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 5;
  if (signals.timelineDays != null && signals.timelineDays <= 60) s += 5;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost91(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 6;
  if (signals.timelineDays != null && signals.timelineDays <= 61) s += 6;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost92(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 7;
  if (signals.timelineDays != null && signals.timelineDays <= 62) s += 7;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost93(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 8;
  if (signals.timelineDays != null && signals.timelineDays <= 63) s += 8;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost94(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 9;
  if (signals.timelineDays != null && signals.timelineDays <= 64) s += 9;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost95(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 10;
  if (signals.timelineDays != null && signals.timelineDays <= 65) s += 10;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost96(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 11;
  if (signals.timelineDays != null && signals.timelineDays <= 66) s += 3;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost97(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 12;
  if (signals.timelineDays != null && signals.timelineDays <= 67) s += 4;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost98(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 13;
  if (signals.timelineDays != null && signals.timelineDays <= 68) s += 5;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost99(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 14;
  if (signals.timelineDays != null && signals.timelineDays <= 69) s += 6;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost100(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 5;
  if (signals.timelineDays != null && signals.timelineDays <= 70) s += 7;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost101(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 6;
  if (signals.timelineDays != null && signals.timelineDays <= 71) s += 8;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost102(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 7;
  if (signals.timelineDays != null && signals.timelineDays <= 72) s += 9;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost103(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 8;
  if (signals.timelineDays != null && signals.timelineDays <= 73) s += 10;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost104(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 9;
  if (signals.timelineDays != null && signals.timelineDays <= 74) s += 3;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost105(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 10;
  if (signals.timelineDays != null && signals.timelineDays <= 75) s += 4;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost106(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 11;
  if (signals.timelineDays != null && signals.timelineDays <= 76) s += 5;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost107(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 12;
  if (signals.timelineDays != null && signals.timelineDays <= 77) s += 6;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost108(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 13;
  if (signals.timelineDays != null && signals.timelineDays <= 78) s += 7;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost109(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 14;
  if (signals.timelineDays != null && signals.timelineDays <= 79) s += 8;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost110(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 5;
  if (signals.timelineDays != null && signals.timelineDays <= 80) s += 9;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost111(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 6;
  if (signals.timelineDays != null && signals.timelineDays <= 81) s += 10;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost112(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 7;
  if (signals.timelineDays != null && signals.timelineDays <= 82) s += 3;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost113(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 8;
  if (signals.timelineDays != null && signals.timelineDays <= 83) s += 4;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost114(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 9;
  if (signals.timelineDays != null && signals.timelineDays <= 84) s += 5;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost115(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 10;
  if (signals.timelineDays != null && signals.timelineDays <= 85) s += 6;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost116(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 11;
  if (signals.timelineDays != null && signals.timelineDays <= 86) s += 7;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost117(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 12;
  if (signals.timelineDays != null && signals.timelineDays <= 87) s += 8;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost118(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 13;
  if (signals.timelineDays != null && signals.timelineDays <= 88) s += 9;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost119(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 14;
  if (signals.timelineDays != null && signals.timelineDays <= 89) s += 10;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost120(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 5;
  if (signals.timelineDays != null && signals.timelineDays <= 30) s += 3;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost121(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 6;
  if (signals.timelineDays != null && signals.timelineDays <= 31) s += 4;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost122(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 7;
  if (signals.timelineDays != null && signals.timelineDays <= 32) s += 5;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost123(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 8;
  if (signals.timelineDays != null && signals.timelineDays <= 33) s += 6;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost124(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 9;
  if (signals.timelineDays != null && signals.timelineDays <= 34) s += 7;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost125(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 10;
  if (signals.timelineDays != null && signals.timelineDays <= 35) s += 8;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost126(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 11;
  if (signals.timelineDays != null && signals.timelineDays <= 36) s += 9;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost127(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 12;
  if (signals.timelineDays != null && signals.timelineDays <= 37) s += 10;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost128(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 13;
  if (signals.timelineDays != null && signals.timelineDays <= 38) s += 3;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost129(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 14;
  if (signals.timelineDays != null && signals.timelineDays <= 39) s += 4;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost130(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 5;
  if (signals.timelineDays != null && signals.timelineDays <= 40) s += 5;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost131(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 6;
  if (signals.timelineDays != null && signals.timelineDays <= 41) s += 6;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost132(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 7;
  if (signals.timelineDays != null && signals.timelineDays <= 42) s += 7;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost133(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 8;
  if (signals.timelineDays != null && signals.timelineDays <= 43) s += 8;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost134(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 9;
  if (signals.timelineDays != null && signals.timelineDays <= 44) s += 9;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost135(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 10;
  if (signals.timelineDays != null && signals.timelineDays <= 45) s += 10;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost136(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 11;
  if (signals.timelineDays != null && signals.timelineDays <= 46) s += 3;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost137(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 12;
  if (signals.timelineDays != null && signals.timelineDays <= 47) s += 4;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost138(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 13;
  if (signals.timelineDays != null && signals.timelineDays <= 48) s += 5;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost139(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 14;
  if (signals.timelineDays != null && signals.timelineDays <= 49) s += 6;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost140(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 5;
  if (signals.timelineDays != null && signals.timelineDays <= 50) s += 7;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost141(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 6;
  if (signals.timelineDays != null && signals.timelineDays <= 51) s += 8;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost142(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 7;
  if (signals.timelineDays != null && signals.timelineDays <= 52) s += 9;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost143(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 8;
  if (signals.timelineDays != null && signals.timelineDays <= 53) s += 10;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost144(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 9;
  if (signals.timelineDays != null && signals.timelineDays <= 54) s += 3;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost145(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 10;
  if (signals.timelineDays != null && signals.timelineDays <= 55) s += 4;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost146(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 11;
  if (signals.timelineDays != null && signals.timelineDays <= 56) s += 5;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost147(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 12;
  if (signals.timelineDays != null && signals.timelineDays <= 57) s += 6;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost148(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 13;
  if (signals.timelineDays != null && signals.timelineDays <= 58) s += 7;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost149(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 14;
  if (signals.timelineDays != null && signals.timelineDays <= 59) s += 8;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost150(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 5;
  if (signals.timelineDays != null && signals.timelineDays <= 60) s += 9;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost151(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 6;
  if (signals.timelineDays != null && signals.timelineDays <= 61) s += 10;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost152(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 7;
  if (signals.timelineDays != null && signals.timelineDays <= 62) s += 3;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost153(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 8;
  if (signals.timelineDays != null && signals.timelineDays <= 63) s += 4;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost154(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 9;
  if (signals.timelineDays != null && signals.timelineDays <= 64) s += 5;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost155(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 10;
  if (signals.timelineDays != null && signals.timelineDays <= 65) s += 6;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost156(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 11;
  if (signals.timelineDays != null && signals.timelineDays <= 66) s += 7;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost157(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 12;
  if (signals.timelineDays != null && signals.timelineDays <= 67) s += 8;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost158(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 13;
  if (signals.timelineDays != null && signals.timelineDays <= 68) s += 9;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost159(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 14;
  if (signals.timelineDays != null && signals.timelineDays <= 69) s += 10;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost160(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 5;
  if (signals.timelineDays != null && signals.timelineDays <= 70) s += 3;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost161(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 6;
  if (signals.timelineDays != null && signals.timelineDays <= 71) s += 4;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost162(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 7;
  if (signals.timelineDays != null && signals.timelineDays <= 72) s += 5;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost163(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 8;
  if (signals.timelineDays != null && signals.timelineDays <= 73) s += 6;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost164(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 9;
  if (signals.timelineDays != null && signals.timelineDays <= 74) s += 7;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost165(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 10;
  if (signals.timelineDays != null && signals.timelineDays <= 75) s += 8;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost166(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 11;
  if (signals.timelineDays != null && signals.timelineDays <= 76) s += 9;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost167(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 12;
  if (signals.timelineDays != null && signals.timelineDays <= 77) s += 10;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost168(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 13;
  if (signals.timelineDays != null && signals.timelineDays <= 78) s += 3;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost169(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 14;
  if (signals.timelineDays != null && signals.timelineDays <= 79) s += 4;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost170(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 5;
  if (signals.timelineDays != null && signals.timelineDays <= 80) s += 5;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost171(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 6;
  if (signals.timelineDays != null && signals.timelineDays <= 81) s += 6;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost172(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 7;
  if (signals.timelineDays != null && signals.timelineDays <= 82) s += 7;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost173(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 8;
  if (signals.timelineDays != null && signals.timelineDays <= 83) s += 8;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost174(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 9;
  if (signals.timelineDays != null && signals.timelineDays <= 84) s += 9;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost175(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 10;
  if (signals.timelineDays != null && signals.timelineDays <= 85) s += 10;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost176(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 11;
  if (signals.timelineDays != null && signals.timelineDays <= 86) s += 3;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost177(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 12;
  if (signals.timelineDays != null && signals.timelineDays <= 87) s += 4;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost178(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 13;
  if (signals.timelineDays != null && signals.timelineDays <= 88) s += 5;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost179(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 14;
  if (signals.timelineDays != null && signals.timelineDays <= 89) s += 6;
  return Math.max(0, Math.min(100, Math.round(s)));
}

export function leadBoost180(base, signals={}) {
  let s = base;
  if (signals.hasBudget) s += 5;
  if (signals.timelineDays != null && signals.timelineDays <= 30) s += 7;
  return Math.max(0, Math.min(100, Math.round(s)));
}
