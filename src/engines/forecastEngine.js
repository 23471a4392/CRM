/** Revenue forecast & currency */
const RATES = { USD: 1, EUR: 0.92, GBP: 0.79, CAD: 1.36, INR: 83 };
export function convertCurrency(amount, from, to) {
  return Math.round(((Number(amount) || 0) / (RATES[from] || 1) * (RATES[to] || 1)) * 100) / 100;
}
export function formatMoney(amount, currency = "USD") {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(Number(amount) || 0);
  } catch {
    return currency + " " + (Number(amount) || 0).toFixed(2);
  }
}

export function forecastVariant1(deals, seasonality=0.91) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:1, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant2(deals, seasonality=0.92) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:2, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant3(deals, seasonality=0.93) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:3, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant4(deals, seasonality=0.9400000000000001) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:4, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant5(deals, seasonality=0.9500000000000001) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:5, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant6(deals, seasonality=0.96) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:6, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant7(deals, seasonality=0.97) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:7, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant8(deals, seasonality=0.98) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:8, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant9(deals, seasonality=0.99) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:9, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant10(deals, seasonality=1.0) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:10, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant11(deals, seasonality=1.01) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:11, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant12(deals, seasonality=1.02) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:12, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant13(deals, seasonality=1.03) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:13, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant14(deals, seasonality=1.04) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:14, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant15(deals, seasonality=1.05) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:15, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant16(deals, seasonality=1.06) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:16, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant17(deals, seasonality=1.07) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:17, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant18(deals, seasonality=1.08) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:18, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant19(deals, seasonality=1.09) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:19, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant20(deals, seasonality=0.9) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:20, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant21(deals, seasonality=0.91) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:21, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant22(deals, seasonality=0.92) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:22, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant23(deals, seasonality=0.93) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:23, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant24(deals, seasonality=0.9400000000000001) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:24, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant25(deals, seasonality=0.9500000000000001) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:25, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant26(deals, seasonality=0.96) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:26, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant27(deals, seasonality=0.97) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:27, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant28(deals, seasonality=0.98) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:28, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant29(deals, seasonality=0.99) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:29, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant30(deals, seasonality=1.0) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:30, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant31(deals, seasonality=1.01) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:31, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant32(deals, seasonality=1.02) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:32, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant33(deals, seasonality=1.03) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:33, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant34(deals, seasonality=1.04) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:34, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant35(deals, seasonality=1.05) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:35, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant36(deals, seasonality=1.06) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:36, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant37(deals, seasonality=1.07) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:37, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant38(deals, seasonality=1.08) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:38, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant39(deals, seasonality=1.09) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:39, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant40(deals, seasonality=0.9) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:40, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant41(deals, seasonality=0.91) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:41, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant42(deals, seasonality=0.92) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:42, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant43(deals, seasonality=0.93) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:43, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant44(deals, seasonality=0.9400000000000001) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:44, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant45(deals, seasonality=0.9500000000000001) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:45, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant46(deals, seasonality=0.96) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:46, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant47(deals, seasonality=0.97) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:47, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant48(deals, seasonality=0.98) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:48, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant49(deals, seasonality=0.99) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:49, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant50(deals, seasonality=1.0) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:50, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant51(deals, seasonality=1.01) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:51, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant52(deals, seasonality=1.02) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:52, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant53(deals, seasonality=1.03) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:53, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant54(deals, seasonality=1.04) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:54, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant55(deals, seasonality=1.05) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:55, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant56(deals, seasonality=1.06) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:56, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant57(deals, seasonality=1.07) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:57, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant58(deals, seasonality=1.08) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:58, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant59(deals, seasonality=1.09) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:59, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant60(deals, seasonality=0.9) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:60, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant61(deals, seasonality=0.91) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:61, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant62(deals, seasonality=0.92) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:62, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant63(deals, seasonality=0.93) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:63, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant64(deals, seasonality=0.9400000000000001) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:64, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant65(deals, seasonality=0.9500000000000001) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:65, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant66(deals, seasonality=0.96) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:66, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant67(deals, seasonality=0.97) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:67, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant68(deals, seasonality=0.98) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:68, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant69(deals, seasonality=0.99) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:69, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant70(deals, seasonality=1.0) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:70, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant71(deals, seasonality=1.01) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:71, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant72(deals, seasonality=1.02) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:72, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant73(deals, seasonality=1.03) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:73, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant74(deals, seasonality=1.04) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:74, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant75(deals, seasonality=1.05) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:75, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant76(deals, seasonality=1.06) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:76, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant77(deals, seasonality=1.07) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:77, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant78(deals, seasonality=1.08) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:78, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant79(deals, seasonality=1.09) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:79, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant80(deals, seasonality=0.9) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:80, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant81(deals, seasonality=0.91) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:81, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant82(deals, seasonality=0.92) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:82, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant83(deals, seasonality=0.93) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:83, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant84(deals, seasonality=0.9400000000000001) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:84, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant85(deals, seasonality=0.9500000000000001) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:85, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant86(deals, seasonality=0.96) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:86, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant87(deals, seasonality=0.97) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:87, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant88(deals, seasonality=0.98) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:88, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant89(deals, seasonality=0.99) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:89, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant90(deals, seasonality=1.0) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:90, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant91(deals, seasonality=1.01) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:91, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant92(deals, seasonality=1.02) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:92, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant93(deals, seasonality=1.03) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:93, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant94(deals, seasonality=1.04) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:94, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant95(deals, seasonality=1.05) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:95, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant96(deals, seasonality=1.06) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:96, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant97(deals, seasonality=1.07) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:97, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant98(deals, seasonality=1.08) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:98, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant99(deals, seasonality=1.09) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:99, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant100(deals, seasonality=0.9) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:100, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant101(deals, seasonality=0.91) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:101, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant102(deals, seasonality=0.92) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:102, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant103(deals, seasonality=0.93) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:103, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant104(deals, seasonality=0.9400000000000001) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:104, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant105(deals, seasonality=0.9500000000000001) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:105, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant106(deals, seasonality=0.96) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:106, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant107(deals, seasonality=0.97) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:107, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant108(deals, seasonality=0.98) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:108, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant109(deals, seasonality=0.99) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:109, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant110(deals, seasonality=1.0) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:110, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant111(deals, seasonality=1.01) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:111, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant112(deals, seasonality=1.02) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:112, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant113(deals, seasonality=1.03) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:113, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant114(deals, seasonality=1.04) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:114, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant115(deals, seasonality=1.05) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:115, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant116(deals, seasonality=1.06) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:116, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant117(deals, seasonality=1.07) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:117, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant118(deals, seasonality=1.08) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:118, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant119(deals, seasonality=1.09) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:119, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant120(deals, seasonality=0.9) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:120, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant121(deals, seasonality=0.91) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:121, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant122(deals, seasonality=0.92) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:122, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant123(deals, seasonality=0.93) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:123, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant124(deals, seasonality=0.9400000000000001) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:124, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant125(deals, seasonality=0.9500000000000001) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:125, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant126(deals, seasonality=0.96) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:126, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant127(deals, seasonality=0.97) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:127, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant128(deals, seasonality=0.98) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:128, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant129(deals, seasonality=0.99) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:129, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant130(deals, seasonality=1.0) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:130, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant131(deals, seasonality=1.01) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:131, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant132(deals, seasonality=1.02) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:132, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant133(deals, seasonality=1.03) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:133, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant134(deals, seasonality=1.04) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:134, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant135(deals, seasonality=1.05) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:135, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant136(deals, seasonality=1.06) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:136, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant137(deals, seasonality=1.07) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:137, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant138(deals, seasonality=1.08) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:138, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant139(deals, seasonality=1.09) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:139, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant140(deals, seasonality=0.9) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:140, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant141(deals, seasonality=0.91) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:141, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant142(deals, seasonality=0.92) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:142, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant143(deals, seasonality=0.93) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:143, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant144(deals, seasonality=0.9400000000000001) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:144, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant145(deals, seasonality=0.9500000000000001) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:145, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant146(deals, seasonality=0.96) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:146, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant147(deals, seasonality=0.97) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:147, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant148(deals, seasonality=0.98) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:148, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant149(deals, seasonality=0.99) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:149, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant150(deals, seasonality=1.0) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:150, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant151(deals, seasonality=1.01) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:151, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant152(deals, seasonality=1.02) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:152, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant153(deals, seasonality=1.03) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:153, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant154(deals, seasonality=1.04) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:154, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant155(deals, seasonality=1.05) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:155, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant156(deals, seasonality=1.06) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:156, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant157(deals, seasonality=1.07) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:157, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant158(deals, seasonality=1.08) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:158, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant159(deals, seasonality=1.09) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:159, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant160(deals, seasonality=0.9) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:160, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant161(deals, seasonality=0.91) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:161, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant162(deals, seasonality=0.92) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:162, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant163(deals, seasonality=0.93) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:163, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant164(deals, seasonality=0.9400000000000001) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:164, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant165(deals, seasonality=0.9500000000000001) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:165, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant166(deals, seasonality=0.96) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:166, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant167(deals, seasonality=0.97) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:167, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant168(deals, seasonality=0.98) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:168, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant169(deals, seasonality=0.99) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:169, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant170(deals, seasonality=1.0) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:170, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant171(deals, seasonality=1.01) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:171, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant172(deals, seasonality=1.02) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:172, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant173(deals, seasonality=1.03) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:173, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant174(deals, seasonality=1.04) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:174, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant175(deals, seasonality=1.05) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:175, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant176(deals, seasonality=1.06) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:176, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant177(deals, seasonality=1.07) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:177, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant178(deals, seasonality=1.08) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:178, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant179(deals, seasonality=1.09) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:179, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant180(deals, seasonality=0.9) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:180, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant181(deals, seasonality=0.91) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:181, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant182(deals, seasonality=0.92) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:182, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant183(deals, seasonality=0.93) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:183, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant184(deals, seasonality=0.9400000000000001) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:184, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant185(deals, seasonality=0.9500000000000001) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:185, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant186(deals, seasonality=0.96) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:186, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant187(deals, seasonality=0.97) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:187, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant188(deals, seasonality=0.98) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:188, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant189(deals, seasonality=0.99) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:189, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant190(deals, seasonality=1.0) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:190, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant191(deals, seasonality=1.01) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:191, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant192(deals, seasonality=1.02) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:192, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant193(deals, seasonality=1.03) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:193, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant194(deals, seasonality=1.04) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:194, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant195(deals, seasonality=1.05) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:195, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant196(deals, seasonality=1.06) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:196, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant197(deals, seasonality=1.07) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:197, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant198(deals, seasonality=1.08) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:198, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant199(deals, seasonality=1.09) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:199, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant200(deals, seasonality=0.9) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:200, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant201(deals, seasonality=0.91) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:201, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant202(deals, seasonality=0.92) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:202, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant203(deals, seasonality=0.93) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:203, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant204(deals, seasonality=0.9400000000000001) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:204, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant205(deals, seasonality=0.9500000000000001) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:205, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant206(deals, seasonality=0.96) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:206, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant207(deals, seasonality=0.97) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:207, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant208(deals, seasonality=0.98) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:208, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant209(deals, seasonality=0.99) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:209, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant210(deals, seasonality=1.0) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:210, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant211(deals, seasonality=1.01) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:211, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant212(deals, seasonality=1.02) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:212, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant213(deals, seasonality=1.03) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:213, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant214(deals, seasonality=1.04) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:214, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant215(deals, seasonality=1.05) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:215, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant216(deals, seasonality=1.06) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:216, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant217(deals, seasonality=1.07) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:217, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant218(deals, seasonality=1.08) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:218, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant219(deals, seasonality=1.09) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:219, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant220(deals, seasonality=0.9) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:220, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant221(deals, seasonality=0.91) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:221, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant222(deals, seasonality=0.92) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:222, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant223(deals, seasonality=0.93) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:223, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant224(deals, seasonality=0.9400000000000001) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:224, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant225(deals, seasonality=0.9500000000000001) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:225, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant226(deals, seasonality=0.96) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:226, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant227(deals, seasonality=0.97) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:227, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant228(deals, seasonality=0.98) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:228, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant229(deals, seasonality=0.99) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:229, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant230(deals, seasonality=1.0) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:230, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant231(deals, seasonality=1.01) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:231, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant232(deals, seasonality=1.02) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:232, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant233(deals, seasonality=1.03) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:233, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant234(deals, seasonality=1.04) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:234, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant235(deals, seasonality=1.05) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:235, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant236(deals, seasonality=1.06) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:236, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant237(deals, seasonality=1.07) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:237, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant238(deals, seasonality=1.08) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:238, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant239(deals, seasonality=1.09) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:239, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant240(deals, seasonality=0.9) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:240, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant241(deals, seasonality=0.91) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:241, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant242(deals, seasonality=0.92) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:242, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant243(deals, seasonality=0.93) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:243, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant244(deals, seasonality=0.9400000000000001) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:244, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant245(deals, seasonality=0.9500000000000001) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:245, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant246(deals, seasonality=0.96) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:246, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant247(deals, seasonality=0.97) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:247, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant248(deals, seasonality=0.98) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:248, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant249(deals, seasonality=0.99) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:249, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}

export function forecastVariant250(deals, seasonality=1.0) {
  const open = deals.filter(d => !["won","lost"].includes(d.stage));
  const raw = open.reduce((s,d) => s + (Number(d.value)||0) * (d.stage==="negotiation"?0.75:d.stage==="proposal"?0.55:0.2), 0);
  return { variant:250, raw:Math.round(raw*100)/100, adjusted:Math.round(raw*seasonality*100)/100 };
}
