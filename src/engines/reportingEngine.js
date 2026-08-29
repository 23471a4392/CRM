/** Reporting & analytics */
export function dashboardKPIs(contacts, deals) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const won = deals.filter(d => d.stage === "won");
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  const wonValue = won.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { totalContacts: contacts.length, openDeals: open.length, pipelineValue: pipeline, wonDeals: won.length, wonValue,
    winRate: (won.length + deals.filter(d=>d.stage==="lost").length) ? Math.round(won.length/(won.length+deals.filter(d=>d.stage==="lost").length)*1000)/10 : 0 };
}

export function kpiVariant1(contacts, deals, factor=1.05) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:1, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant2(contacts, deals, factor=1.1) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:2, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant3(contacts, deals, factor=1.15) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:3, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant4(contacts, deals, factor=1.2) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:4, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant5(contacts, deals, factor=1.25) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:5, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant6(contacts, deals, factor=1.3) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:6, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant7(contacts, deals, factor=1.35) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:7, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant8(contacts, deals, factor=1.4) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:8, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant9(contacts, deals, factor=1.45) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:9, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant10(contacts, deals, factor=1.5) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:10, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant11(contacts, deals, factor=1.55) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:11, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant12(contacts, deals, factor=1.6) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:12, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant13(contacts, deals, factor=1.65) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:13, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant14(contacts, deals, factor=1.7000000000000002) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:14, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant15(contacts, deals, factor=1.75) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:15, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant16(contacts, deals, factor=1.8) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:16, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant17(contacts, deals, factor=1.85) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:17, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant18(contacts, deals, factor=1.9) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:18, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant19(contacts, deals, factor=1.9500000000000002) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:19, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant20(contacts, deals, factor=1.0) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:20, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant21(contacts, deals, factor=1.05) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:21, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant22(contacts, deals, factor=1.1) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:22, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant23(contacts, deals, factor=1.15) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:23, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant24(contacts, deals, factor=1.2) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:24, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant25(contacts, deals, factor=1.25) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:25, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant26(contacts, deals, factor=1.3) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:26, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant27(contacts, deals, factor=1.35) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:27, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant28(contacts, deals, factor=1.4) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:28, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant29(contacts, deals, factor=1.45) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:29, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant30(contacts, deals, factor=1.5) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:30, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant31(contacts, deals, factor=1.55) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:31, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant32(contacts, deals, factor=1.6) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:32, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant33(contacts, deals, factor=1.65) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:33, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant34(contacts, deals, factor=1.7000000000000002) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:34, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant35(contacts, deals, factor=1.75) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:35, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant36(contacts, deals, factor=1.8) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:36, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant37(contacts, deals, factor=1.85) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:37, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant38(contacts, deals, factor=1.9) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:38, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant39(contacts, deals, factor=1.9500000000000002) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:39, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant40(contacts, deals, factor=1.0) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:40, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant41(contacts, deals, factor=1.05) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:41, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant42(contacts, deals, factor=1.1) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:42, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant43(contacts, deals, factor=1.15) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:43, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant44(contacts, deals, factor=1.2) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:44, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant45(contacts, deals, factor=1.25) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:45, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant46(contacts, deals, factor=1.3) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:46, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant47(contacts, deals, factor=1.35) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:47, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant48(contacts, deals, factor=1.4) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:48, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant49(contacts, deals, factor=1.45) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:49, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant50(contacts, deals, factor=1.5) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:50, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant51(contacts, deals, factor=1.55) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:51, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant52(contacts, deals, factor=1.6) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:52, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant53(contacts, deals, factor=1.65) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:53, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant54(contacts, deals, factor=1.7000000000000002) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:54, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant55(contacts, deals, factor=1.75) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:55, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant56(contacts, deals, factor=1.8) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:56, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant57(contacts, deals, factor=1.85) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:57, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant58(contacts, deals, factor=1.9) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:58, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant59(contacts, deals, factor=1.9500000000000002) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:59, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant60(contacts, deals, factor=1.0) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:60, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant61(contacts, deals, factor=1.05) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:61, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant62(contacts, deals, factor=1.1) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:62, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant63(contacts, deals, factor=1.15) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:63, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant64(contacts, deals, factor=1.2) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:64, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant65(contacts, deals, factor=1.25) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:65, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant66(contacts, deals, factor=1.3) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:66, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant67(contacts, deals, factor=1.35) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:67, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant68(contacts, deals, factor=1.4) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:68, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant69(contacts, deals, factor=1.45) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:69, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant70(contacts, deals, factor=1.5) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:70, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant71(contacts, deals, factor=1.55) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:71, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant72(contacts, deals, factor=1.6) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:72, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant73(contacts, deals, factor=1.65) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:73, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant74(contacts, deals, factor=1.7000000000000002) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:74, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant75(contacts, deals, factor=1.75) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:75, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant76(contacts, deals, factor=1.8) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:76, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant77(contacts, deals, factor=1.85) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:77, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant78(contacts, deals, factor=1.9) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:78, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant79(contacts, deals, factor=1.9500000000000002) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:79, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant80(contacts, deals, factor=1.0) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:80, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant81(contacts, deals, factor=1.05) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:81, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant82(contacts, deals, factor=1.1) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:82, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant83(contacts, deals, factor=1.15) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:83, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant84(contacts, deals, factor=1.2) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:84, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant85(contacts, deals, factor=1.25) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:85, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant86(contacts, deals, factor=1.3) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:86, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant87(contacts, deals, factor=1.35) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:87, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant88(contacts, deals, factor=1.4) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:88, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant89(contacts, deals, factor=1.45) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:89, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant90(contacts, deals, factor=1.5) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:90, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant91(contacts, deals, factor=1.55) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:91, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant92(contacts, deals, factor=1.6) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:92, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant93(contacts, deals, factor=1.65) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:93, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant94(contacts, deals, factor=1.7000000000000002) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:94, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant95(contacts, deals, factor=1.75) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:95, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant96(contacts, deals, factor=1.8) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:96, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant97(contacts, deals, factor=1.85) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:97, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant98(contacts, deals, factor=1.9) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:98, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant99(contacts, deals, factor=1.9500000000000002) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:99, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant100(contacts, deals, factor=1.0) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:100, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant101(contacts, deals, factor=1.05) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:101, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant102(contacts, deals, factor=1.1) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:102, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant103(contacts, deals, factor=1.15) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:103, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant104(contacts, deals, factor=1.2) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:104, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant105(contacts, deals, factor=1.25) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:105, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant106(contacts, deals, factor=1.3) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:106, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant107(contacts, deals, factor=1.35) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:107, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant108(contacts, deals, factor=1.4) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:108, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant109(contacts, deals, factor=1.45) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:109, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant110(contacts, deals, factor=1.5) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:110, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant111(contacts, deals, factor=1.55) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:111, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant112(contacts, deals, factor=1.6) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:112, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant113(contacts, deals, factor=1.65) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:113, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant114(contacts, deals, factor=1.7000000000000002) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:114, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant115(contacts, deals, factor=1.75) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:115, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant116(contacts, deals, factor=1.8) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:116, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant117(contacts, deals, factor=1.85) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:117, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant118(contacts, deals, factor=1.9) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:118, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant119(contacts, deals, factor=1.9500000000000002) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:119, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant120(contacts, deals, factor=1.0) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:120, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant121(contacts, deals, factor=1.05) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:121, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant122(contacts, deals, factor=1.1) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:122, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant123(contacts, deals, factor=1.15) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:123, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant124(contacts, deals, factor=1.2) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:124, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant125(contacts, deals, factor=1.25) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:125, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant126(contacts, deals, factor=1.3) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:126, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant127(contacts, deals, factor=1.35) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:127, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant128(contacts, deals, factor=1.4) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:128, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant129(contacts, deals, factor=1.45) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:129, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant130(contacts, deals, factor=1.5) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:130, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant131(contacts, deals, factor=1.55) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:131, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant132(contacts, deals, factor=1.6) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:132, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant133(contacts, deals, factor=1.65) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:133, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant134(contacts, deals, factor=1.7000000000000002) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:134, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant135(contacts, deals, factor=1.75) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:135, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant136(contacts, deals, factor=1.8) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:136, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant137(contacts, deals, factor=1.85) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:137, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant138(contacts, deals, factor=1.9) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:138, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant139(contacts, deals, factor=1.9500000000000002) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:139, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant140(contacts, deals, factor=1.0) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:140, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant141(contacts, deals, factor=1.05) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:141, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant142(contacts, deals, factor=1.1) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:142, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant143(contacts, deals, factor=1.15) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:143, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant144(contacts, deals, factor=1.2) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:144, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant145(contacts, deals, factor=1.25) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:145, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant146(contacts, deals, factor=1.3) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:146, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant147(contacts, deals, factor=1.35) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:147, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant148(contacts, deals, factor=1.4) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:148, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant149(contacts, deals, factor=1.45) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:149, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant150(contacts, deals, factor=1.5) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:150, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant151(contacts, deals, factor=1.55) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:151, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant152(contacts, deals, factor=1.6) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:152, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant153(contacts, deals, factor=1.65) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:153, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant154(contacts, deals, factor=1.7000000000000002) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:154, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant155(contacts, deals, factor=1.75) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:155, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant156(contacts, deals, factor=1.8) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:156, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant157(contacts, deals, factor=1.85) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:157, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant158(contacts, deals, factor=1.9) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:158, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant159(contacts, deals, factor=1.9500000000000002) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:159, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant160(contacts, deals, factor=1.0) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:160, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant161(contacts, deals, factor=1.05) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:161, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant162(contacts, deals, factor=1.1) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:162, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant163(contacts, deals, factor=1.15) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:163, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant164(contacts, deals, factor=1.2) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:164, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant165(contacts, deals, factor=1.25) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:165, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant166(contacts, deals, factor=1.3) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:166, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant167(contacts, deals, factor=1.35) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:167, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant168(contacts, deals, factor=1.4) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:168, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant169(contacts, deals, factor=1.45) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:169, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant170(contacts, deals, factor=1.5) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:170, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant171(contacts, deals, factor=1.55) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:171, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant172(contacts, deals, factor=1.6) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:172, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant173(contacts, deals, factor=1.65) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:173, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant174(contacts, deals, factor=1.7000000000000002) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:174, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant175(contacts, deals, factor=1.75) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:175, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant176(contacts, deals, factor=1.8) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:176, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant177(contacts, deals, factor=1.85) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:177, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant178(contacts, deals, factor=1.9) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:178, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant179(contacts, deals, factor=1.9500000000000002) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:179, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant180(contacts, deals, factor=1.0) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:180, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant181(contacts, deals, factor=1.05) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:181, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant182(contacts, deals, factor=1.1) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:182, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant183(contacts, deals, factor=1.15) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:183, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant184(contacts, deals, factor=1.2) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:184, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant185(contacts, deals, factor=1.25) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:185, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant186(contacts, deals, factor=1.3) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:186, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant187(contacts, deals, factor=1.35) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:187, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant188(contacts, deals, factor=1.4) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:188, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant189(contacts, deals, factor=1.45) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:189, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant190(contacts, deals, factor=1.5) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:190, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant191(contacts, deals, factor=1.55) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:191, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant192(contacts, deals, factor=1.6) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:192, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant193(contacts, deals, factor=1.65) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:193, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant194(contacts, deals, factor=1.7000000000000002) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:194, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant195(contacts, deals, factor=1.75) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:195, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant196(contacts, deals, factor=1.8) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:196, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant197(contacts, deals, factor=1.85) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:197, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant198(contacts, deals, factor=1.9) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:198, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant199(contacts, deals, factor=1.9500000000000002) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:199, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant200(contacts, deals, factor=1.0) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:200, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant201(contacts, deals, factor=1.05) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:201, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant202(contacts, deals, factor=1.1) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:202, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant203(contacts, deals, factor=1.15) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:203, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant204(contacts, deals, factor=1.2) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:204, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant205(contacts, deals, factor=1.25) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:205, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant206(contacts, deals, factor=1.3) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:206, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant207(contacts, deals, factor=1.35) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:207, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant208(contacts, deals, factor=1.4) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:208, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant209(contacts, deals, factor=1.45) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:209, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant210(contacts, deals, factor=1.5) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:210, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant211(contacts, deals, factor=1.55) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:211, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant212(contacts, deals, factor=1.6) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:212, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant213(contacts, deals, factor=1.65) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:213, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant214(contacts, deals, factor=1.7000000000000002) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:214, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant215(contacts, deals, factor=1.75) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:215, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant216(contacts, deals, factor=1.8) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:216, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant217(contacts, deals, factor=1.85) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:217, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant218(contacts, deals, factor=1.9) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:218, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant219(contacts, deals, factor=1.9500000000000002) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:219, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}

export function kpiVariant220(contacts, deals, factor=1.0) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const pipeline = open.reduce((s,d)=>s+(Number(d.value)||0),0);
  return { variant:220, contacts:contacts.length, openDeals:open.length, pipeline:Math.round(pipeline*factor*100)/100 };
}
