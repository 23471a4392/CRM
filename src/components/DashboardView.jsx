import React, { useMemo } from "react";
import {
  Users,
  Wallet,
  LayoutGrid,
  TrendingUp,
  Award,
  AlertCircle,
  Plus,
  ArrowRight,
  Mail,
  Calendar,
  CheckCircle2,
  Download,
  RefreshCw,
  Sparkles,
  BarChart3,
} from "lucide-react";
import {
  currency,
  pipelineValue,
  wonValue,
  weightedPipelineValue,
  dealsByStage,
  topContactsByValue,
  getInitials,
  getAvatarColor,
  formatDate,
} from "../utils.js";

export default function DashboardView({
  contacts,
  deals,
  activities,
  currencyCode = "USD",
  onNavigateTab,
  onFilterDealsByStage,
  onOpenAddContact,
  onOpenAddDeal,
  onSelectContact,
  onToggleActivityCompleted,
  onLoadSampleData,
  onExportCSV,
}) {
  const stats = useMemo(() => {
    const byStage = dealsByStage(deals);
    const maxStageValue = Math.max(1, ...byStage.map((s) => s.value));
    const pipe = pipelineValue(deals);
    const won = wonValue(deals);
    const weighted = weightedPipelineValue(deals);
    const wonDealsCount = deals.filter((d) => d.stage === "won").length;
    const lostDealsCount = deals.filter((d) => d.stage === "lost").length;
    const totalClosed = wonDealsCount + lostDealsCount;
    const winRate = totalClosed > 0 ? Math.round((wonDealsCount / totalClosed) * 100) : 0;
    const openDeals = deals.filter((d) => d.stage !== "won" && d.stage !== "lost");
    const avgDeal = openDeals.length > 0 ? Math.round(pipe / openDeals.length) : 0;

    // Deal Health Breakdown
    const healthyDeals = openDeals.filter((d) => (Number(d.value) || 0) > 0 && d.stage !== "lead");
    const atRiskDeals = openDeals.filter((d) => !d.contactId || d.stage === "lead");

    return {
      pipeline: pipe,
      won,
      weighted,
      winRate,
      avgDeal,
      byStage,
      maxStageValue,
      openDealsCount: openDeals.length,
      topContacts: topContactsByValue(contacts, deals, 5),
      healthyCount: healthyDeals.length,
      atRiskCount: atRiskDeals.length,
    };
  }, [contacts, deals]);

  const recentActivities = (activities || []).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Top Banner Quick Actions */}
      <div
        className="rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        <div>
          <h2 className="ledger-display text-lg font-bold">Executive Pipeline Overview</h2>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            Real-time accounting ledger and stage conversions for {contacts.length} client accounts.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={onOpenAddContact}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition"
            style={{
              background: "var(--surface-2)",
              color: "var(--text)",
              border: "1px solid var(--border)",
            }}
          >
            <Plus size={13} style={{ color: "var(--positive)" }} /> Add Contact
          </button>
          <button
            type="button"
            onClick={onOpenAddDeal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition shadow-xs"
            style={{
              background: "var(--accent)",
              color: "#1B1F1D",
            }}
          >
            <Plus size={14} /> New Deal
          </button>
        </div>
      </div>

      {/* KPI Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Total Contacts */}
        <div
          onClick={() => onNavigateTab("contacts")}
          className="rounded-xl p-4 cursor-pointer row-hover transition"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          title="Click to view all Contacts"
        >
          <div className="flex items-center justify-between text-xs" style={{ color: "var(--text-muted)" }}>
            <span className="uppercase tracking-wider font-semibold text-[10px]">Contacts</span>
            <Users size={15} />
          </div>
          <div className="text-2xl mt-2 ledger-display font-bold">{contacts.length}</div>
          <div className="text-[10px] mt-1 flex items-center gap-1" style={{ color: "var(--accent)" }}>
            <span>View directory</span> <ArrowRight size={10} />
          </div>
        </div>

        {/* Open Pipeline */}
        <div
          onClick={() => {
            onFilterDealsByStage("all");
            onNavigateTab("deals");
          }}
          className="rounded-xl p-4 cursor-pointer row-hover transition"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          title="Click to view Open Deals"
        >
          <div className="flex items-center justify-between text-xs" style={{ color: "var(--text-muted)" }}>
            <span className="uppercase tracking-wider font-semibold text-[10px]">Open Pipeline</span>
            <Wallet size={15} style={{ color: "var(--accent)" }} />
          </div>
          <div className="text-xl sm:text-2xl mt-2 ledger-mono font-bold" style={{ color: "var(--accent)" }}>
            {currency(stats.pipeline, currencyCode)}
          </div>
          <div className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>
            {stats.openDealsCount} active deal(s)
          </div>
        </div>

        {/* Won to Date */}
        <div
          onClick={() => {
            onFilterDealsByStage("won");
            onNavigateTab("deals");
          }}
          className="rounded-xl p-4 cursor-pointer row-hover transition"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          title="Click to view Won Deals"
        >
          <div className="flex items-center justify-between text-xs" style={{ color: "var(--text-muted)" }}>
            <span className="uppercase tracking-wider font-semibold text-[10px]">Won Revenue</span>
            <Award size={15} style={{ color: "var(--positive)" }} />
          </div>
          <div className="text-xl sm:text-2xl mt-2 ledger-mono font-bold" style={{ color: "var(--positive)" }}>
            {currency(stats.won, currencyCode)}
          </div>
          <div className="text-[10px] mt-1" style={{ color: "var(--positive)" }}>
            Closed revenue
          </div>
        </div>

        {/* Weighted Forecast */}
        <div
          onClick={() => onNavigateTab("reports")}
          className="rounded-xl p-4 cursor-pointer row-hover transition"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          title="Click to view Forecast & Reports"
        >
          <div className="flex items-center justify-between text-xs" style={{ color: "var(--text-muted)" }}>
            <span className="uppercase tracking-wider font-semibold text-[10px]">Forecast</span>
            <TrendingUp size={15} style={{ color: "var(--info)" }} />
          </div>
          <div className="text-xl sm:text-2xl mt-2 ledger-mono font-bold" style={{ color: "var(--info)" }}>
            {currency(stats.weighted, currencyCode)}
          </div>
          <div className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>
            Weighted probability
          </div>
        </div>

        {/* Win Rate */}
        <div
          onClick={() => onNavigateTab("reports")}
          className="rounded-xl p-4 cursor-pointer row-hover transition"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center justify-between text-xs" style={{ color: "var(--text-muted)" }}>
            <span className="uppercase tracking-wider font-semibold text-[10px]">Win Rate</span>
            <BarChart3 size={15} />
          </div>
          <div className="text-2xl mt-2 ledger-display font-bold">{stats.winRate}%</div>
          <div className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>
            Closed deals conversion
          </div>
        </div>

        {/* Average Deal Size */}
        <div
          onClick={() => {
            onFilterDealsByStage("all");
            onNavigateTab("deals");
          }}
          className="rounded-xl p-4 cursor-pointer row-hover transition"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center justify-between text-xs" style={{ color: "var(--text-muted)" }}>
            <span className="uppercase tracking-wider font-semibold text-[10px]">Avg Deal</span>
            <Sparkles size={15} style={{ color: "var(--warning)" }} />
          </div>
          <div className="text-xl sm:text-2xl mt-2 ledger-mono font-bold" style={{ color: "var(--text)" }}>
            {currency(stats.avgDeal, currencyCode)}
          </div>
          <div className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>
            Per open opportunity
          </div>
        </div>
      </div>

      {/* Main Grid: Pipeline by Stage & Health Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline by Stage Interactive Bars (2 Cols) */}
        <div
          className="lg:col-span-2 rounded-xl p-5 shadow-xs"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="ledger-display text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                Pipeline Distribution by Stage
              </h3>
              <p className="text-[11px]" style={{ color: "var(--text-dim)" }}>
                Click any stage to filter and manage corresponding deals
              </p>
            </div>
            <button
              onClick={() => {
                onFilterDealsByStage("all");
                onNavigateTab("deals");
              }}
              className="text-xs flex items-center gap-1 hover:opacity-80"
              style={{ color: "var(--accent)" }}
            >
              Open Deals Board <ArrowRight size={12} />
            </button>
          </div>

          <div className="space-y-3.5">
            {stats.byStage.map((s) => (
              <div
                key={s.id}
                onClick={() => {
                  onFilterDealsByStage(s.id);
                  onNavigateTab("deals");
                }}
                className="p-2 rounded-lg flex items-center gap-3 cursor-pointer hover:bg-surface-2 transition"
                title={`Click to filter deals by ${s.label}`}
              >
                <div className="w-24 text-xs font-semibold truncate flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
                  <span>{s.label}</span>
                </div>
                <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "var(--surface-2)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${Math.max(2, (s.value / stats.maxStageValue) * 100)}%`,
                      background: s.color,
                    }}
                  />
                </div>
                <div className="w-24 text-right text-xs ledger-mono font-medium" style={{ color: "var(--text)" }}>
                  {currency(s.value, currencyCode)}
                </div>
                <div className="w-10 text-right text-xs" style={{ color: "var(--text-muted)" }}>
                  ×{s.count}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deal Health & Action Shortcuts (1 Col) */}
        <div
          className="rounded-xl p-5 shadow-xs flex flex-col justify-between"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <div>
            <h3 className="ledger-display text-sm font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
              Pipeline Health Radar
            </h3>
            <p className="text-[11px] mb-4" style={{ color: "var(--text-dim)" }}>
              Automated velocity analysis across active deals
            </p>

            <div className="space-y-2.5 mb-4">
              <div
                onClick={() => {
                  onFilterDealsByStage("proposal");
                  onNavigateTab("deals");
                }}
                className="p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-surface-2 transition"
                style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
              >
                <div className="flex items-center gap-2 text-xs">
                  <CheckCircle2 size={15} style={{ color: "var(--positive)" }} />
                  <span>High Health (Active proposal)</span>
                </div>
                <span className="ledger-mono text-xs font-bold" style={{ color: "var(--positive)" }}>
                  {stats.healthyCount} deals
                </span>
              </div>

              <div
                onClick={() => {
                  onFilterDealsByStage("lead");
                  onNavigateTab("deals");
                }}
                className="p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-surface-2 transition"
                style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
              >
                <div className="flex items-center gap-2 text-xs">
                  <AlertCircle size={15} style={{ color: "var(--warning)" }} />
                  <span>Needs Follow-up (Lead stage)</span>
                </div>
                <span className="ledger-mono text-xs font-bold" style={{ color: "var(--warning)" }}>
                  {stats.atRiskCount} deals
                </span>
              </div>
            </div>
          </div>

          <div
            className="p-3 rounded-lg text-xs"
            style={{
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="font-semibold mb-1 text-text">Data Controls</div>
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={onExportCSV}
                className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded text-[11px] font-medium transition"
                style={{ background: "var(--surface-3)", color: "var(--text)", border: "1px solid var(--border)" }}
              >
                <Download size={11} /> Export CSV
              </button>
              <button
                type="button"
                onClick={onLoadSampleData}
                className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded text-[11px] font-medium transition"
                style={{ background: "var(--surface-3)", color: "var(--text)", border: "1px solid var(--border)" }}
              >
                <RefreshCw size={11} /> Load Data
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Top Contacts & Recent Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Contacts Leaderboard */}
        <div
          className="rounded-xl p-5 shadow-xs"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="ledger-display text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
              Top Client Accounts by Value
            </h3>
            <button
              onClick={() => onNavigateTab("contacts")}
              className="text-xs flex items-center gap-1 hover:opacity-80"
              style={{ color: "var(--accent)" }}
            >
              All Contacts ({contacts.length}) <ArrowRight size={12} />
            </button>
          </div>

          {stats.topContacts.length === 0 ? (
            <div className="py-8 text-center text-xs" style={{ color: "var(--text-muted)" }}>
              No deals attached to contacts yet. Create deals to see top revenue accounts.
            </div>
          ) : (
            <div className="space-y-2">
              {stats.topContacts.map((c) => {
                const avatar = getAvatarColor(c.name);
                return (
                  <div
                    key={c.id}
                    className="p-3 rounded-lg flex items-center justify-between gap-3 text-xs row-hover transition"
                    style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
                  >
                    <div
                      onClick={() => onSelectContact(c)}
                      className="flex items-center gap-2.5 min-w-0 cursor-pointer flex-1"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 shadow-xs"
                        style={{ background: avatar.bg, color: avatar.text }}
                      >
                        {getInitials(c.name)}
                      </div>
                      <div className="truncate">
                        <div className="font-semibold text-text truncate hover:underline">{c.name}</div>
                        <div className="text-[11px] truncate" style={{ color: "var(--text-muted)" }}>
                          {c.company || "Independent"} · {c.dealCount} deal(s)
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="ledger-mono font-bold text-sm" style={{ color: "var(--accent)" }}>
                        {currency(c.total, currencyCode)}
                      </span>
                      {c.email && (
                        <a
                          href={`mailto:${c.email}`}
                          className="p-1.5 rounded hover:bg-surface-3 transition"
                          style={{ color: "var(--text-muted)" }}
                          title={`Email ${c.name}`}
                          aria-label={`Email ${c.name}`}
                        >
                          <Mail size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Activities & Action Checklist */}
        <div
          className="rounded-xl p-5 shadow-xs"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="ledger-display text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
              Upcoming Tasks & Actions
            </h3>
            <button
              onClick={() => onNavigateTab("activities")}
              className="text-xs flex items-center gap-1 hover:opacity-80"
              style={{ color: "var(--accent)" }}
            >
              Activity Manager <ArrowRight size={12} />
            </button>
          </div>

          {recentActivities.length === 0 ? (
            <div className="py-8 text-center text-xs" style={{ color: "var(--text-muted)" }}>
              No upcoming tasks logged. Click Activity Manager to schedule calls, emails, and meetings.
            </div>
          ) : (
            <div className="space-y-2">
              {recentActivities.map((a) => (
                <div
                  key={a.id}
                  className="p-3 rounded-lg flex items-start gap-3 text-xs transition"
                  style={{
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={a.completed}
                    onChange={() => onToggleActivityCompleted(a.id)}
                    className="mt-0.5 w-4 h-4 rounded accent-amber-500 cursor-pointer shrink-0"
                    aria-label="Toggle completed"
                  />
                  <div className="flex-1 min-w-0">
                    <div className={`font-semibold ${a.completed ? "line-through opacity-60" : "text-text"}`}>
                      {a.title}
                    </div>
                    {a.description && (
                      <p className="mt-0.5 line-clamp-1" style={{ color: "var(--text-muted)" }}>
                        {a.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-1 text-[10px]" style={{ color: "var(--text-dim)" }}>
                      <span className="uppercase font-semibold">{a.type}</span>
                      <span>·</span>
                      <span>{formatDate(a.dueDate || a.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
