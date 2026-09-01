import React, { useState, useMemo } from "react";
import {
  Plus,
  Trash2,
  Pencil,
  Search,
  LayoutGrid,
  List,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Building2,
  User,
  Calendar,
  Filter,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import StageBadge from "./StageBadge.jsx";
import EmptyStateIllustration from "./EmptyStateIllustration.jsx";
import { STAGES, stageMeta, currency, formatDate } from "../utils.js";

export default function DealsView({
  deals,
  contacts,
  currencyCode = "USD",
  activeStageFilter = "all",
  onSelectStageFilter,
  onOpenAdd,
  onOpenEdit,
  onUpdateStage,
  onDelete,
  onSelectContact,
}) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("value_desc");
  const [viewMode, setViewMode] = useState("kanban"); // 'kanban' or 'list'

  const contactMap = useMemo(() => {
    const map = new Map();
    contacts.forEach((c) => map.set(c.id, c));
    return map;
  }, [contacts]);

  // Filtered & Sorted Deals
  const filteredDeals = useMemo(() => {
    const q = query.toLowerCase().trim();
    return deals
      .filter((d) => {
        const contact = contactMap.get(d.contactId);
        const matchStage =
          activeStageFilter === "all" || d.stage === activeStageFilter;

        const matchQuery =
          !q ||
          `${d.title} ${d.stage} ${d.notes || ""} ${contact?.name || ""} ${contact?.company || ""}`
            .toLowerCase()
            .includes(q);

        return matchStage && matchQuery;
      })
      .sort((a, b) => {
        if (sortBy === "value_desc") return (b.value || 0) - (a.value || 0);
        if (sortBy === "value_asc") return (a.value || 0) - (b.value || 0);
        if (sortBy === "title_asc") return a.title.localeCompare(b.title);
        if (sortBy === "date_asc") {
          const dA = new Date(a.expectedClose || a.closeDate || "9999-12-31").getTime();
          const dB = new Date(b.expectedClose || b.closeDate || "9999-12-31").getTime();
          return dA - dB;
        }
        return 0;
      });
  }, [deals, contactMap, activeStageFilter, query, sortBy]);

  const totalValue = filteredDeals.reduce((s, d) => s + (Number(d.value) || 0), 0);

  // Stage progression helper
  const moveNextStage = (deal) => {
    const stageIds = STAGES.map((s) => s.id);
    const currIdx = stageIds.indexOf(deal.stage);
    if (currIdx < stageIds.length - 2) {
      onUpdateStage(deal.id, stageIds[currIdx + 1]);
    } else if (deal.stage !== "won") {
      onUpdateStage(deal.id, "won");
    }
  };

  const movePrevStage = (deal) => {
    const stageIds = STAGES.map((s) => s.id);
    const currIdx = stageIds.indexOf(deal.stage);
    if (currIdx > 0 && currIdx < stageIds.length - 1) {
      onUpdateStage(deal.id, stageIds[currIdx - 1]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Filter and Controls Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 flex-wrap">
        {/* Stage Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-ledger pb-1 max-w-full">
          <button
            onClick={() => onSelectStageFilter("all")}
            type="button"
            className="text-xs px-3 py-1.5 rounded-full font-medium transition shrink-0"
            style={{
              background: activeStageFilter === "all" ? "var(--accent)" : "var(--surface-2)",
              color: activeStageFilter === "all" ? "#1B1F1D" : "var(--text-muted)",
              border: "1px solid var(--border)",
            }}
          >
            All Stages ({deals.length})
          </button>
          {STAGES.map((s) => {
            const count = deals.filter((d) => d.stage === s.id).length;
            const isSelected = activeStageFilter === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onSelectStageFilter(s.id)}
                className="text-xs px-3 py-1.5 rounded-full font-medium transition shrink-0 flex items-center gap-1.5"
                style={{
                  background: isSelected ? `${s.color}33` : "var(--surface-2)",
                  border: `1px solid ${isSelected ? s.color : "var(--border)"}`,
                  color: isSelected ? s.color : "var(--text-muted)",
                }}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                <span>{s.label}</span>
                <span className="opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        {/* View Switcher, Search & Add Deal */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative min-w-[180px]">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--text-muted)" }}
            />
            <input
              className="ledger-input w-full rounded-lg pl-8 pr-3 py-1.5 text-xs"
              placeholder="Search deals…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <select
            className="ledger-input rounded-lg px-2.5 py-1.5 text-xs"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="value_desc">Value: High → Low</option>
            <option value="value_asc">Value: Low → High</option>
            <option value="date_asc">Close Date: Soonest</option>
            <option value="title_asc">Title: A → Z</option>
          </select>

          {/* Kanban vs List Toggle */}
          <div
            className="flex items-center rounded-lg p-0.5"
            style={{
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
            }}
          >
            <button
              onClick={() => setViewMode("kanban")}
              className="p-1.5 rounded text-xs transition"
              style={{
                background: viewMode === "kanban" ? "var(--surface)" : "transparent",
                color: viewMode === "kanban" ? "var(--accent)" : "var(--text-muted)",
              }}
              title="Kanban Board View"
              aria-label="Kanban view"
            >
              <LayoutGrid size={14} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className="p-1.5 rounded text-xs transition"
              style={{
                background: viewMode === "list" ? "var(--surface)" : "transparent",
                color: viewMode === "list" ? "var(--accent)" : "var(--text-muted)",
              }}
              title="List View"
              aria-label="List view"
            >
              <List size={14} />
            </button>
          </div>

          <button
            onClick={() => onOpenAdd()}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition"
            style={{ background: "var(--accent)", color: "#1B1F1D" }}
          >
            <Plus size={14} /> Add Deal
          </button>
        </div>
      </div>

      {/* Main Deals Content */}
      {filteredDeals.length === 0 ? (
        <div
          className="p-10 text-center rounded-xl space-y-3"
          style={{ background: "var(--surface)", border: "1px dashed var(--border)" }}
        >
          <EmptyStateIllustration type="deals" />
          <div className="text-sm font-semibold text-text">
            {deals.length === 0 ? "No sales deals recorded in pipeline" : "No deals match active stage or query"}
          </div>
          <p className="text-xs max-w-sm mx-auto" style={{ color: "var(--text-muted)" }}>
            {deals.length === 0
              ? "Create your first sales deal to begin tracking pipeline stages and expected revenue."
              : "Try switching stage filter to 'All Stages' or clearing the search query."}
          </p>
          <button
            onClick={() => onOpenAdd()}
            className="px-3.5 py-2 rounded-lg text-xs font-semibold"
            style={{ background: "var(--accent)", color: "#1B1F1D" }}
          >
            <Plus size={13} className="inline mr-1" /> Add Deal
          </button>
        </div>
      ) : viewMode === "kanban" ? (
        /* Kanban Board View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 overflow-x-auto pb-4">
          {STAGES.filter(
            (s) => activeStageFilter === "all" || activeStageFilter === s.id
          ).map((stage) => {
            const stageDeals = filteredDeals.filter((d) => d.stage === stage.id);
            const colTotal = stageDeals.reduce((sum, d) => sum + (Number(d.value) || 0), 0);

            return (
              <div
                key={stage.id}
                className="rounded-xl p-3 flex flex-col justify-between min-h-[420px]"
                style={{
                  background: "var(--surface)",
                  border: `1px solid var(--border)`,
                }}
              >
                {/* Column Header */}
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-border/40">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ background: stage.color }}
                      />
                      <span className="font-semibold text-xs truncate uppercase tracking-wider">
                        {stage.label}
                      </span>
                      <span className="text-[11px] font-mono" style={{ color: "var(--text-muted)" }}>
                        ({stageDeals.length})
                      </span>
                    </div>

                    <button
                      onClick={() => onOpenAdd(stage.id)}
                      className="p-1 rounded hover:bg-surface-2 transition text-xs"
                      style={{ color: "var(--text-muted)" }}
                      title={`Add deal to ${stage.label}`}
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  {/* Stage Total Pill */}
                  <div
                    className="px-2 py-1 rounded text-[11px] font-mono font-semibold flex items-center justify-between mb-3"
                    style={{ background: "var(--surface-2)", color: stage.color }}
                  >
                    <span>Total:</span>
                    <span>{currency(colTotal, currencyCode)}</span>
                  </div>

                  {/* Cards Stack */}
                  <div className="space-y-2.5">
                    {stageDeals.map((deal) => {
                      const contact = contactMap.get(deal.contactId);
                      return (
                        <div
                          key={deal.id}
                          className="rounded-lg p-3 row-hover transition shadow-xs flex flex-col justify-between"
                          style={{
                            background: "var(--surface-2)",
                            border: "1px solid var(--border)",
                          }}
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <h5 className="font-semibold text-xs text-text leading-snug line-clamp-2">
                                {deal.title}
                              </h5>
                              <span
                                className="ledger-mono text-xs font-bold shrink-0"
                                style={{ color: "var(--accent)" }}
                              >
                                {currency(deal.value, currencyCode)}
                              </span>
                            </div>

                            {contact && (
                              <div
                                onClick={() => onSelectContact && onSelectContact(contact)}
                                className="text-[11px] truncate flex items-center gap-1 cursor-pointer hover:underline mb-1"
                                style={{ color: "var(--text-muted)" }}
                              >
                                <User size={11} />
                                <span>{contact.name}</span>
                                {contact.company && <span className="opacity-70">({contact.company})</span>}
                              </div>
                            )}

                            {(deal.expectedClose || deal.closeDate) && (
                              <div
                                className="text-[10px] flex items-center gap-1 mb-2"
                                style={{ color: "var(--text-dim)" }}
                              >
                                <Calendar size={10} />
                                <span>Exp: {formatDate(deal.expectedClose || deal.closeDate)}</span>
                              </div>
                            )}
                          </div>

                          {/* Action Toolbar on Card */}
                          <div
                            className="pt-2 mt-1 flex items-center justify-between gap-1 border-t border-border/40 text-[11px]"
                          >
                            <div className="flex items-center gap-1">
                              {stage.id !== "lead" && stage.id !== "won" && stage.id !== "lost" && (
                                <button
                                  onClick={() => movePrevStage(deal)}
                                  className="p-1 rounded hover:bg-surface-3 transition"
                                  style={{ color: "var(--text-muted)" }}
                                  title="Previous Stage"
                                >
                                  <ArrowLeft size={12} />
                                </button>
                              )}
                              {stage.id !== "won" && stage.id !== "lost" && (
                                <button
                                  onClick={() => moveNextStage(deal)}
                                  className="p-1 rounded hover:bg-surface-3 transition"
                                  style={{ color: "var(--accent)" }}
                                  title="Advance Stage"
                                >
                                  <ArrowRight size={12} />
                                </button>
                              )}
                              {stage.id !== "won" && (
                                <button
                                  onClick={() => onUpdateStage(deal.id, "won")}
                                  className="p-1 rounded hover:bg-surface-3 transition"
                                  style={{ color: "var(--positive)" }}
                                  title="Mark Won"
                                >
                                  <CheckCircle2 size={12} />
                                </button>
                              )}
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => onOpenEdit(deal)}
                                className="p-1 rounded hover:bg-surface-3 transition"
                                style={{ color: "var(--text-muted)" }}
                                title="Edit Deal"
                              >
                                <Pencil size={11} />
                              </button>
                              <button
                                onClick={() => onDelete(deal.id)}
                                className="p-1 rounded hover:bg-surface-3 transition"
                                style={{ color: "var(--negative)" }}
                                title="Delete Deal"
                              >
                                <Trash2 size={11} />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Column Quick Add at Bottom */}
                <button
                  type="button"
                  onClick={() => onOpenAdd(stage.id)}
                  className="mt-3 w-full py-1.5 rounded-lg text-[11px] font-medium transition hover:bg-surface-2 flex items-center justify-center gap-1"
                  style={{ color: "var(--text-muted)", border: "1px dashed var(--border)" }}
                >
                  <Plus size={12} /> Add to {stage.label}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        /* Ledger Table View */
        <div
          className="rounded-xl overflow-hidden shadow-xs"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead
                style={{
                  background: "var(--surface-2)",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <tr>
                  <th className="p-3 font-semibold uppercase tracking-wider text-[11px]">Deal Title</th>
                  <th className="p-3 font-semibold uppercase tracking-wider text-[11px]">Associated Contact</th>
                  <th className="p-3 font-semibold uppercase tracking-wider text-[11px]">Stage</th>
                  <th className="p-3 font-semibold uppercase tracking-wider text-[11px]">Value</th>
                  <th className="p-3 font-semibold uppercase tracking-wider text-[11px]">Expected Close</th>
                  <th className="p-3 font-semibold uppercase tracking-wider text-[11px] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {filteredDeals.map((d) => {
                  const contact = contactMap.get(d.contactId);
                  return (
                    <tr key={d.id} className="hover:bg-surface-2/60 transition">
                      <td className="p-3">
                        <div className="font-semibold text-text">{d.title}</div>
                        {d.notes && (
                          <div className="text-[11px] line-clamp-1" style={{ color: "var(--text-muted)" }}>
                            {d.notes}
                          </div>
                        )}
                      </td>
                      <td className="p-3">
                        {contact ? (
                          <div
                            onClick={() => onSelectContact && onSelectContact(contact)}
                            className="cursor-pointer hover:underline"
                          >
                            <span className="font-medium text-text">{contact.name}</span>
                            {contact.company && (
                              <span className="ml-1 text-[11px]" style={{ color: "var(--text-muted)" }}>
                                ({contact.company})
                              </span>
                            )}
                          </div>
                        ) : (
                          <span style={{ color: "var(--text-dim)" }}>Unassigned</span>
                        )}
                      </td>
                      <td className="p-3">
                        <select
                          className="ledger-input text-xs py-1 px-2 rounded"
                          value={d.stage}
                          onChange={(e) => onUpdateStage(d.id, e.target.value)}
                        >
                          {STAGES.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-3">
                        <span className="ledger-mono font-bold text-sm" style={{ color: "var(--accent)" }}>
                          {currency(d.value, currencyCode)}
                        </span>
                      </td>
                      <td className="p-3" style={{ color: "var(--text-muted)" }}>
                        {formatDate(d.expectedClose || d.closeDate) || "—"}
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => onOpenEdit(d)}
                            className="p-1.5 rounded hover:bg-surface-3 transition"
                            style={{ color: "var(--text-muted)" }}
                            title="Edit"
                          >
                            <Pencil size={13} />
                          </button>
                          <button
                            onClick={() => onDelete(d.id)}
                            className="p-1.5 rounded hover:bg-surface-3 transition"
                            style={{ color: "var(--negative)" }}
                            title="Delete"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sticky Bottom Ledger Balance Bar */}
      <div
        className="sticky bottom-0 rounded-xl px-5 py-3 flex items-center justify-between shadow-lg"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--accent)",
        }}
      >
        <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
          <span className="font-semibold uppercase tracking-wider">
            {activeStageFilter === "all" ? "Total Pipeline Balance" : `Total (${stageMeta(activeStageFilter).label})`}
          </span>
          <span>·</span>
          <span>{filteredDeals.length} opportunity record(s)</span>
        </div>
        <div className="ledger-mono text-lg font-bold" style={{ color: "var(--accent)" }}>
          {currency(totalValue, currencyCode)}
        </div>
      </div>
    </div>
  );
}
