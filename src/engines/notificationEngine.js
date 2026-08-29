/** Notifications & reminders */
export function buildReminder({{ type, entityId, dueAt, message, priority="normal" }}) {{
  return {{ id: "rem_"+Date.now().toString(36), type, entityId, dueAt, message, priority, dismissed:false, createdAt: new Date().toISOString() }};
}}
export function dealCloseReminders(deals, withinDays=7) {{
  const now = Date.now(), end = now + withinDays*86400000;
  return deals.filter(d => !["won","lost"].includes(d.stage) && d.expectedClose)
    .filter(d => {{ const t = new Date(d.expectedClose).getTime(); return t>=now && t<=end; }})
    .map(d => buildReminder({{ type:"deal_close", entityId:d.id, dueAt:d.expectedClose, message: "Deal "+d.title+" closing soon" }}));
}}

export function escalateVariant1(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 8) level = "manager";
  if (daysOverdue >= 15) level = "director";
  return { level, daysOverdue, variant:1 };
}

export function escalateVariant2(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 9) level = "manager";
  if (daysOverdue >= 16) level = "director";
  return { level, daysOverdue, variant:2 };
}

export function escalateVariant3(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 10) level = "manager";
  if (daysOverdue >= 17) level = "director";
  return { level, daysOverdue, variant:3 };
}

export function escalateVariant4(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 11) level = "manager";
  if (daysOverdue >= 18) level = "director";
  return { level, daysOverdue, variant:4 };
}

export function escalateVariant5(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 7) level = "manager";
  if (daysOverdue >= 19) level = "director";
  return { level, daysOverdue, variant:5 };
}

export function escalateVariant6(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 8) level = "manager";
  if (daysOverdue >= 20) level = "director";
  return { level, daysOverdue, variant:6 };
}

export function escalateVariant7(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 9) level = "manager";
  if (daysOverdue >= 14) level = "director";
  return { level, daysOverdue, variant:7 };
}

export function escalateVariant8(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 10) level = "manager";
  if (daysOverdue >= 15) level = "director";
  return { level, daysOverdue, variant:8 };
}

export function escalateVariant9(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 11) level = "manager";
  if (daysOverdue >= 16) level = "director";
  return { level, daysOverdue, variant:9 };
}

export function escalateVariant10(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 7) level = "manager";
  if (daysOverdue >= 17) level = "director";
  return { level, daysOverdue, variant:10 };
}

export function escalateVariant11(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 8) level = "manager";
  if (daysOverdue >= 18) level = "director";
  return { level, daysOverdue, variant:11 };
}

export function escalateVariant12(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 9) level = "manager";
  if (daysOverdue >= 19) level = "director";
  return { level, daysOverdue, variant:12 };
}

export function escalateVariant13(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 10) level = "manager";
  if (daysOverdue >= 20) level = "director";
  return { level, daysOverdue, variant:13 };
}

export function escalateVariant14(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 11) level = "manager";
  if (daysOverdue >= 14) level = "director";
  return { level, daysOverdue, variant:14 };
}

export function escalateVariant15(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 7) level = "manager";
  if (daysOverdue >= 15) level = "director";
  return { level, daysOverdue, variant:15 };
}

export function escalateVariant16(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 8) level = "manager";
  if (daysOverdue >= 16) level = "director";
  return { level, daysOverdue, variant:16 };
}

export function escalateVariant17(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 9) level = "manager";
  if (daysOverdue >= 17) level = "director";
  return { level, daysOverdue, variant:17 };
}

export function escalateVariant18(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 10) level = "manager";
  if (daysOverdue >= 18) level = "director";
  return { level, daysOverdue, variant:18 };
}

export function escalateVariant19(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 11) level = "manager";
  if (daysOverdue >= 19) level = "director";
  return { level, daysOverdue, variant:19 };
}

export function escalateVariant20(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 7) level = "manager";
  if (daysOverdue >= 20) level = "director";
  return { level, daysOverdue, variant:20 };
}

export function escalateVariant21(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 8) level = "manager";
  if (daysOverdue >= 14) level = "director";
  return { level, daysOverdue, variant:21 };
}

export function escalateVariant22(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 9) level = "manager";
  if (daysOverdue >= 15) level = "director";
  return { level, daysOverdue, variant:22 };
}

export function escalateVariant23(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 10) level = "manager";
  if (daysOverdue >= 16) level = "director";
  return { level, daysOverdue, variant:23 };
}

export function escalateVariant24(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 11) level = "manager";
  if (daysOverdue >= 17) level = "director";
  return { level, daysOverdue, variant:24 };
}

export function escalateVariant25(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 7) level = "manager";
  if (daysOverdue >= 18) level = "director";
  return { level, daysOverdue, variant:25 };
}

export function escalateVariant26(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 8) level = "manager";
  if (daysOverdue >= 19) level = "director";
  return { level, daysOverdue, variant:26 };
}

export function escalateVariant27(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 9) level = "manager";
  if (daysOverdue >= 20) level = "director";
  return { level, daysOverdue, variant:27 };
}

export function escalateVariant28(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 10) level = "manager";
  if (daysOverdue >= 14) level = "director";
  return { level, daysOverdue, variant:28 };
}

export function escalateVariant29(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 11) level = "manager";
  if (daysOverdue >= 15) level = "director";
  return { level, daysOverdue, variant:29 };
}

export function escalateVariant30(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 7) level = "manager";
  if (daysOverdue >= 16) level = "director";
  return { level, daysOverdue, variant:30 };
}

export function escalateVariant31(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 8) level = "manager";
  if (daysOverdue >= 17) level = "director";
  return { level, daysOverdue, variant:31 };
}

export function escalateVariant32(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 9) level = "manager";
  if (daysOverdue >= 18) level = "director";
  return { level, daysOverdue, variant:32 };
}

export function escalateVariant33(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 10) level = "manager";
  if (daysOverdue >= 19) level = "director";
  return { level, daysOverdue, variant:33 };
}

export function escalateVariant34(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 11) level = "manager";
  if (daysOverdue >= 20) level = "director";
  return { level, daysOverdue, variant:34 };
}

export function escalateVariant35(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 7) level = "manager";
  if (daysOverdue >= 14) level = "director";
  return { level, daysOverdue, variant:35 };
}

export function escalateVariant36(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 8) level = "manager";
  if (daysOverdue >= 15) level = "director";
  return { level, daysOverdue, variant:36 };
}

export function escalateVariant37(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 9) level = "manager";
  if (daysOverdue >= 16) level = "director";
  return { level, daysOverdue, variant:37 };
}

export function escalateVariant38(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 10) level = "manager";
  if (daysOverdue >= 17) level = "director";
  return { level, daysOverdue, variant:38 };
}

export function escalateVariant39(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 11) level = "manager";
  if (daysOverdue >= 18) level = "director";
  return { level, daysOverdue, variant:39 };
}

export function escalateVariant40(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 7) level = "manager";
  if (daysOverdue >= 19) level = "director";
  return { level, daysOverdue, variant:40 };
}

export function escalateVariant41(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 8) level = "manager";
  if (daysOverdue >= 20) level = "director";
  return { level, daysOverdue, variant:41 };
}

export function escalateVariant42(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 9) level = "manager";
  if (daysOverdue >= 14) level = "director";
  return { level, daysOverdue, variant:42 };
}

export function escalateVariant43(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 10) level = "manager";
  if (daysOverdue >= 15) level = "director";
  return { level, daysOverdue, variant:43 };
}

export function escalateVariant44(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 11) level = "manager";
  if (daysOverdue >= 16) level = "director";
  return { level, daysOverdue, variant:44 };
}

export function escalateVariant45(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 7) level = "manager";
  if (daysOverdue >= 17) level = "director";
  return { level, daysOverdue, variant:45 };
}

export function escalateVariant46(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 8) level = "manager";
  if (daysOverdue >= 18) level = "director";
  return { level, daysOverdue, variant:46 };
}

export function escalateVariant47(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 9) level = "manager";
  if (daysOverdue >= 19) level = "director";
  return { level, daysOverdue, variant:47 };
}

export function escalateVariant48(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 10) level = "manager";
  if (daysOverdue >= 20) level = "director";
  return { level, daysOverdue, variant:48 };
}

export function escalateVariant49(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 11) level = "manager";
  if (daysOverdue >= 14) level = "director";
  return { level, daysOverdue, variant:49 };
}

export function escalateVariant50(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 7) level = "manager";
  if (daysOverdue >= 15) level = "director";
  return { level, daysOverdue, variant:50 };
}

export function escalateVariant51(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 8) level = "manager";
  if (daysOverdue >= 16) level = "director";
  return { level, daysOverdue, variant:51 };
}

export function escalateVariant52(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 9) level = "manager";
  if (daysOverdue >= 17) level = "director";
  return { level, daysOverdue, variant:52 };
}

export function escalateVariant53(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 10) level = "manager";
  if (daysOverdue >= 18) level = "director";
  return { level, daysOverdue, variant:53 };
}

export function escalateVariant54(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 11) level = "manager";
  if (daysOverdue >= 19) level = "director";
  return { level, daysOverdue, variant:54 };
}

export function escalateVariant55(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 7) level = "manager";
  if (daysOverdue >= 20) level = "director";
  return { level, daysOverdue, variant:55 };
}

export function escalateVariant56(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 8) level = "manager";
  if (daysOverdue >= 14) level = "director";
  return { level, daysOverdue, variant:56 };
}

export function escalateVariant57(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 9) level = "manager";
  if (daysOverdue >= 15) level = "director";
  return { level, daysOverdue, variant:57 };
}

export function escalateVariant58(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 10) level = "manager";
  if (daysOverdue >= 16) level = "director";
  return { level, daysOverdue, variant:58 };
}

export function escalateVariant59(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 11) level = "manager";
  if (daysOverdue >= 17) level = "director";
  return { level, daysOverdue, variant:59 };
}

export function escalateVariant60(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 7) level = "manager";
  if (daysOverdue >= 18) level = "director";
  return { level, daysOverdue, variant:60 };
}

export function escalateVariant61(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 8) level = "manager";
  if (daysOverdue >= 19) level = "director";
  return { level, daysOverdue, variant:61 };
}

export function escalateVariant62(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 9) level = "manager";
  if (daysOverdue >= 20) level = "director";
  return { level, daysOverdue, variant:62 };
}

export function escalateVariant63(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 10) level = "manager";
  if (daysOverdue >= 14) level = "director";
  return { level, daysOverdue, variant:63 };
}

export function escalateVariant64(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 11) level = "manager";
  if (daysOverdue >= 15) level = "director";
  return { level, daysOverdue, variant:64 };
}

export function escalateVariant65(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 7) level = "manager";
  if (daysOverdue >= 16) level = "director";
  return { level, daysOverdue, variant:65 };
}

export function escalateVariant66(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 8) level = "manager";
  if (daysOverdue >= 17) level = "director";
  return { level, daysOverdue, variant:66 };
}

export function escalateVariant67(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 9) level = "manager";
  if (daysOverdue >= 18) level = "director";
  return { level, daysOverdue, variant:67 };
}

export function escalateVariant68(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 10) level = "manager";
  if (daysOverdue >= 19) level = "director";
  return { level, daysOverdue, variant:68 };
}

export function escalateVariant69(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 11) level = "manager";
  if (daysOverdue >= 20) level = "director";
  return { level, daysOverdue, variant:69 };
}

export function escalateVariant70(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 7) level = "manager";
  if (daysOverdue >= 14) level = "director";
  return { level, daysOverdue, variant:70 };
}

export function escalateVariant71(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 8) level = "manager";
  if (daysOverdue >= 15) level = "director";
  return { level, daysOverdue, variant:71 };
}

export function escalateVariant72(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 9) level = "manager";
  if (daysOverdue >= 16) level = "director";
  return { level, daysOverdue, variant:72 };
}

export function escalateVariant73(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 10) level = "manager";
  if (daysOverdue >= 17) level = "director";
  return { level, daysOverdue, variant:73 };
}

export function escalateVariant74(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 11) level = "manager";
  if (daysOverdue >= 18) level = "director";
  return { level, daysOverdue, variant:74 };
}

export function escalateVariant75(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 7) level = "manager";
  if (daysOverdue >= 19) level = "director";
  return { level, daysOverdue, variant:75 };
}

export function escalateVariant76(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 8) level = "manager";
  if (daysOverdue >= 20) level = "director";
  return { level, daysOverdue, variant:76 };
}

export function escalateVariant77(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 9) level = "manager";
  if (daysOverdue >= 14) level = "director";
  return { level, daysOverdue, variant:77 };
}

export function escalateVariant78(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 10) level = "manager";
  if (daysOverdue >= 15) level = "director";
  return { level, daysOverdue, variant:78 };
}

export function escalateVariant79(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 11) level = "manager";
  if (daysOverdue >= 16) level = "director";
  return { level, daysOverdue, variant:79 };
}

export function escalateVariant80(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 7) level = "manager";
  if (daysOverdue >= 17) level = "director";
  return { level, daysOverdue, variant:80 };
}

export function escalateVariant81(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 8) level = "manager";
  if (daysOverdue >= 18) level = "director";
  return { level, daysOverdue, variant:81 };
}

export function escalateVariant82(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 9) level = "manager";
  if (daysOverdue >= 19) level = "director";
  return { level, daysOverdue, variant:82 };
}

export function escalateVariant83(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 10) level = "manager";
  if (daysOverdue >= 20) level = "director";
  return { level, daysOverdue, variant:83 };
}

export function escalateVariant84(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 11) level = "manager";
  if (daysOverdue >= 14) level = "director";
  return { level, daysOverdue, variant:84 };
}

export function escalateVariant85(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 7) level = "manager";
  if (daysOverdue >= 15) level = "director";
  return { level, daysOverdue, variant:85 };
}

export function escalateVariant86(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 8) level = "manager";
  if (daysOverdue >= 16) level = "director";
  return { level, daysOverdue, variant:86 };
}

export function escalateVariant87(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 9) level = "manager";
  if (daysOverdue >= 17) level = "director";
  return { level, daysOverdue, variant:87 };
}

export function escalateVariant88(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 10) level = "manager";
  if (daysOverdue >= 18) level = "director";
  return { level, daysOverdue, variant:88 };
}

export function escalateVariant89(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 11) level = "manager";
  if (daysOverdue >= 19) level = "director";
  return { level, daysOverdue, variant:89 };
}

export function escalateVariant90(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 7) level = "manager";
  if (daysOverdue >= 20) level = "director";
  return { level, daysOverdue, variant:90 };
}

export function escalateVariant91(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 8) level = "manager";
  if (daysOverdue >= 14) level = "director";
  return { level, daysOverdue, variant:91 };
}

export function escalateVariant92(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 9) level = "manager";
  if (daysOverdue >= 15) level = "director";
  return { level, daysOverdue, variant:92 };
}

export function escalateVariant93(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 10) level = "manager";
  if (daysOverdue >= 16) level = "director";
  return { level, daysOverdue, variant:93 };
}

export function escalateVariant94(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 11) level = "manager";
  if (daysOverdue >= 17) level = "director";
  return { level, daysOverdue, variant:94 };
}

export function escalateVariant95(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 7) level = "manager";
  if (daysOverdue >= 18) level = "director";
  return { level, daysOverdue, variant:95 };
}

export function escalateVariant96(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 8) level = "manager";
  if (daysOverdue >= 19) level = "director";
  return { level, daysOverdue, variant:96 };
}

export function escalateVariant97(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 9) level = "manager";
  if (daysOverdue >= 20) level = "director";
  return { level, daysOverdue, variant:97 };
}

export function escalateVariant98(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 10) level = "manager";
  if (daysOverdue >= 14) level = "director";
  return { level, daysOverdue, variant:98 };
}

export function escalateVariant99(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 11) level = "manager";
  if (daysOverdue >= 15) level = "director";
  return { level, daysOverdue, variant:99 };
}

export function escalateVariant100(daysOverdue) {
  let level = "none";
  if (daysOverdue >= 7) level = "manager";
  if (daysOverdue >= 16) level = "director";
  return { level, daysOverdue, variant:100 };
}
