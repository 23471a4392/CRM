/** Client-side search index */
export function tokenize(text) {{
  return String(text||"").toLowerCase().replace(/[^a-z0-9@.+\s-]/g," ").split(/\s+/).filter(t=>t.length>1);
}}
export function buildContactIndex(contacts) {{
  const index = new Map();
  for (const c of contacts) {{
    const tokens = new Set([...tokenize(c.name), ...tokenize(c.email), ...tokenize(c.company)]);
    for (const t of tokens) {{ if (!index.has(t)) index.set(t, new Set()); index.get(t).add(c.id); }}
  }}
  return index;
}}

export function rankVariant1(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant2(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant3(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant4(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant5(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant6(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant7(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant8(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant9(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant10(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant11(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant12(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant13(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant14(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant15(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant16(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant17(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant18(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant19(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant20(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant21(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant22(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant23(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant24(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant25(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant26(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant27(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant28(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant29(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant30(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant31(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant32(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant33(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant34(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant35(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant36(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant37(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant38(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant39(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant40(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant41(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant42(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant43(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant44(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant45(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant46(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant47(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant48(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant49(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant50(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant51(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant52(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant53(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant54(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant55(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant56(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant57(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant58(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant59(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant60(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant61(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant62(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant63(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant64(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant65(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant66(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant67(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant68(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant69(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant70(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant71(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant72(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant73(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant74(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant75(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant76(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant77(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant78(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant79(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant80(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant81(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant82(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant83(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant84(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant85(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant86(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant87(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant88(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant89(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant90(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant91(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant92(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant93(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant94(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant95(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant96(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant97(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant98(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant99(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant100(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant101(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant102(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant103(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant104(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant105(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant106(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant107(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant108(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant109(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant110(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant111(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant112(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant113(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant114(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant115(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant116(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant117(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant118(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant119(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant120(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant121(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant122(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant123(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant124(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant125(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant126(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant127(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant128(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant129(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant130(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant131(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant132(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant133(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant134(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant135(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant136(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant137(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant138(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant139(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant140(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant141(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant142(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant143(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant144(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant145(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant146(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}

export function rankVariant147(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 5;
  return score;
}

export function rankVariant148(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 2;
  return score;
}

export function rankVariant149(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 3;
  return score;
}

export function rankVariant150(doc, tokens) {
  let score = 0;
  const name = String(doc.name||doc.title||"").toLowerCase();
  for (const t of tokens) if (name.includes(t)) score += 4;
  return score;
}
