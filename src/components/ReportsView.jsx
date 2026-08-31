import React, { useMemo } from "react";
import {
  TrendingUp,
  Award,
  DollarSign,
  Printer,
  Download,
  Building2,
  PieChart,
  BarChart3,
  Calendar,
  CheckCircle2,
  Users,
  Wallet,
} from "lucide-react";
import {
  currency,
  pipelineValue,
  wonValue,
  weightedPipelineValue,
  dealsByStage,
  topContactsByValue,
  formatDate,
  STAGES,
} from "../utils.js";
import { downloadTextFile } from "../csv.js";

export default function ReportsView({ contacts, deals, currencyCode = "USD" }) {
  const stats = useMemo(() => {
    const pipe = pipelineValue(deals);
    const won = wonValue(deals);
    const weighted = weightedPipelineValue(deals);
    const byStage = dealsByStage(deals);

    // Funnel calculations
    const stageCounts = {};
    STAGES.forEach((s) => {
      stageCounts[s.id] = deals.filter((d) => d.stage === s.id).length;
    });

    const wonCount = stageCounts["won"] || 0;
    const totalClosed = wonCount + (stageCounts["lost"] || 0);
    const winRate = totalClosed > 0 ? Math.round((wonCount / totalClosed) * 100) : 0;

    // Company revenue breakdown
    const companyTotals = new Map();
    deals.forEach((d) => {
      const contact = contacts.find((c) => c.id === d.contactId);
      const company = contact?.company || "Other / Independent";
      const curr = companyTotals.get(company) || { total: 0, dealsCount: 0, wonTotal: 0 };
      companyTotals.set(company, {
        total: curr.total + (Number(d.value) || 0),
        dealsCount: curr.dealsCount + 1,
        wonTotal: curr.wonTotal + (d.stage === "won" ? Number(d.value) || 0 : 0),
      });
    });

    const topCompanies = Array.from(companyTotals.entries())
      .map(([company, data]) => ({ company, ...data }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 8);

    return {
      pipeline: pipe,
      won,
      weighted,
      winRate,
      byStage,
      stageCounts,
      topCompanies,
      topContacts: topContactsByValue(contacts, deals, 6),
    };
  }, [contacts, deals]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportReportCSV = () => {
    const rows = [
      ["Metric", "Value"],
      ["Total Contacts", contacts.length],
      ["Total Deals", deals.length],
      ["Open Pipeline Value", currency(stats.pipeline, currencyCode)],
      ["Weighted Forecast", currency(stats.weighted, currencyCode)],
      ["Won Revenue", currency(stats.won, currencyCode)],
      ["Win Rate", `${stats.winRate}%`],
      [],
      ["Stage", "Deal Count", "Stage Total Value"],
      ...stats.byStage.map((s) => [s.label, s.count, currency(s.value, currencyCode)]),
      [],
      ["Top Accounts", "Total Pipeline Value", "Won Revenue"],
      ...stats.topCompanies.map((c) => [c.company, currency(c.total, currencyCode), currency(c.wonTotal, currencyCode)]),
    ];

    const csvContent = rows.map((r) => r.join(",")).join("\n");
    downloadTextFile(`ledger-crm-report-${new Date().toISOString().split("T")[0]}.csv`, csvContent);
  };

  return (
    <div className="space-y-6">
      {/* Report Actions Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 rounded-xl bg-surface border border-border">
        <div>
          <h2 className="ledger-display text-lg font-bold">Financial & Pipeline Intelligence Report</h2>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Conversion velocity, probabilistic forecasts, and account concentration analytics.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleExportReportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition"
            style={{
              background: "var(--surface-2)",
              color: "var(--text)",
              border: "1px solid var(--border)",
            }}
          >
            <Download size={13} /> Export Report CSV
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition"
            style={{ background: "var(--accent)", color: "#1B1F1D" }}
          >
            <Printer size={13} /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* KPI Cards Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div className="text-xs uppercase tracking-wider font-semibold" style={{ color: "var(--text-muted)" }}>
            Open Pipeline
          </div>
          <div className="text-2xl mt-1 ledger-mono font-bold" style={{ color: "var(--accent)" }}>
            {currency(stats.pipeline, currencyCode)}
          </div>
          <div className="text-[11px] mt-1" style={{ color: "var(--text-muted)" }}>
            Gross unweighted opportunities
          </div>
        </div>

        <div className="p-4 rounded-xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div className="text-xs uppercase tracking-wider font-semibold" style={{ color: "var(--text-muted)" }}>
            Weighted Forecast
          </div>
          <div className="text-2xl mt-1 ledger-mono font-bold" style={{ color: "var(--info)" }}>
            {currency(stats.weighted, currencyCode)}
          </div>
          <div className="text-[11px] mt-1" style={{ color: "var(--text-muted)" }}>
            Expected realization by probability
          </div>
        </div>

        <div className="p-4 rounded-xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div className="text-xs uppercase tracking-wider font-semibold" style={{ color: "var(--text-muted)" }}>
            Closed Won Revenue
          </div>
          <div className="text-2xl mt-1 ledger-mono font-bold" style={{ color: "var(--positive)" }}>
            {currency(stats.won, currencyCode)}
          </div>
          <div className="text-[11px] mt-1" style={{ color: "var(--positive)" }}>
            Realized cash ledger balance
          </div>
        </div>

        <div className="p-4 rounded-xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div className="text-xs uppercase tracking-wider font-semibold" style={{ color: "var(--text-muted)" }}>
            Stage Win Rate
          </div>
          <div className="text-2xl mt-1 ledger-display font-bold text-text">
            {stats.winRate}%
          </div>
          <div className="text-[11px] mt-1" style={{ color: "var(--text-muted)" }}>
            Won deals vs total resolved
          </div>
        </div>
      </div>

      {/* Visual Funnel Conversion */}
      <div className="p-6 rounded-xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <h3 className="ledger-display text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>
          Stage Conversion Funnel
        </h3>
        <p className="text-xs mb-6" style={{ color: "var(--text-dim)" }}>
          Visual progression of deals moving from lead identification to won revenue.
        </p>

        <div className="space-y-3">
          {STAGES.filter((s) => s.id !== "lost").map((stage, idx) => {
            const count = stats.stageCounts[stage.id] || 0;
            const stageVal = stats.byStage.find((s) => s.id === stage.id)?.value || 0;
            const widthPercent = Math.max(15, 100 - idx * 18);

            return (
              <div key={stage.id} className="flex items-center gap-4">
                <div className="w-28 text-xs font-semibold truncate flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: stage.color }} />
                  <span>{stage.label}</span>
                </div>
                <div className="flex-1">
                  <div
                    className="h-8 rounded-lg flex items-center justify-between px-3 text-xs font-semibold transition-all duration-300"
                    style={{
                      width: `${widthPercent}%`,
                      background: `${stage.color}28`,
                      border: `1px solid ${stage.color}66`,
                      color: stage.color,
                    }}
                  >
                    <span>{count} deal(s)</span>
                    <span className="ledger-mono">{currency(stageVal, currencyCode)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Account Concentration & Leaderboards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Accounts Revenue Contribution */}
        <div className="p-5 rounded-xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <h3 className="ledger-display text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>
            Top Companies & Accounts Concentration
          </h3>
          <div className="space-y-2.5">
            {stats.topCompanies.map((co) => (
              <div
                key={co.company}
                className="p-3 rounded-lg flex items-center justify-between text-xs"
                style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Building2 size={14} style={{ color: "var(--accent)" }} />
                  <div className="truncate">
                    <span className="font-semibold text-text">{co.company}</span>
                    <span className="text-[11px] ml-2" style={{ color: "var(--text-muted)" }}>
                      ({co.dealsCount} deals)
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="ledger-mono font-bold" style={{ color: "var(--accent)" }}>
                    {currency(co.total, currencyCode)}
                  </div>
                  {co.wonTotal > 0 && (
                    <div className="text-[10px]" style={{ color: "var(--positive)" }}>
                      Won: {currency(co.wonTotal, currencyCode)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Individual Client Accounts */}
        <div className="p-5 rounded-xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <h3 className="ledger-display text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-muted)" }}>
            Top Value Decision Makers
          </h3>
          <div className="space-y-2.5">
            {stats.topContacts.map((c) => (
              <div
                key={c.id}
                className="p-3 rounded-lg flex items-center justify-between text-xs"
                style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
              >
                <div>
                  <div className="font-semibold text-text">{c.name}</div>
                  <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                    {c.company || "Independent"} · {c.email || c.phone || "No direct email"}
                  </div>
                </div>
                <span className="ledger-mono font-bold text-sm" style={{ color: "var(--accent)" }}>
                  {currency(c.total, currencyCode)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
