import React, { useState, useMemo } from "react";
import {
  Calendar,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  FileText,
  CheckSquare,
  BookOpen,
  Copy,
  Check,
  User,
  Wallet,
  Trash2,
  Pencil,
} from "lucide-react";
import { formatDate } from "../utils.js";
import EmptyStateIllustration from "./EmptyStateIllustration.jsx";

const PLAYBOOK_TEMPLATES = [
  {
    id: "discovery",
    title: "Executive Discovery Call Framework",
    type: "call",
    category: "Qualification",
    description: "Structure high-impact 20-min initial discovery sessions.",
    script: `1. Rapport & Context: "Thanks for taking the time today. I noticed your team recently expanded operations..."
2. Primary Goal: "What is your #1 priority for streamlining accounting and client management this quarter?"
3. Current Workflow: "How is your team currently tracking open pipeline deals and client histories?"
4. Pain Point Impact: "What is the operational cost or delay when data lives in separate spreadsheets?"
5. Next Steps: "Based on what you've shared, I recommend a tailored 15-minute walkthrough of Ledger CRM next Tuesday."`,
  },
  {
    id: "post_demo",
    title: "Post-Demo Commercial Proposal Follow-up",
    type: "email",
    category: "Closing",
    description: "Follow up immediately after presenting proposal and ROI numbers.",
    script: `Subject: Recap & Next Steps: Ledger CRM Enterprise Proposal

Hi [Contact Name],

Thank you for your valuable feedback during our product demo today. As discussed, here is a concise recap:

• Core Requirements Met: Real-time ledger accounting, automatic CSV backups, and granular stage velocity metrics.
• Commercial Terms: Attached formal proposal covering your team's seats and onboarding package.
• Proposed Timeline: Target rollout by the 15th of next month to align with your Q3 targets.

Please let me know if you would like me to address any security or contract questions with your team.

Best regards,
[Your Name]`,
  },
  {
    id: "stalled_deal",
    title: "Stalled Opportunity Re-engagement Email",
    type: "email",
    category: "Re-activation",
    description: "Warmly re-engage prospects who went quiet during negotiation.",
    script: `Subject: Quick check-in regarding your CRM & workflow project

Hi [Contact Name],

I know how busy things get this time of year. I wanted to check in and see if your team is still prioritizing the CRM migration project.

We recently released updated CSV bulk workflows and enhanced revenue forecasting that several teams in your sector found valuable.

Are you available for a brief 5-minute catch-up this Thursday?

Best,
[Your Name]`,
  },
  {
    id: "contract_review",
    title: "Contract & Security Review Checkpoint",
    type: "meeting",
    category: "Legal / Ops",
    description: "Agenda for legal and procurement alignment.",
    script: `Agenda:
1. Review Master Services Agreement (MSA) & Terms
2. Confirm Data Privacy and Storage Protocols (Client-side localStorage & JSON exports)
3. Finalize billing cycle and payment schedule
4. Confirm primary admin and key stakeholder sign-offs`,
  },
];

export default function ActivitiesView({
  activities,
  contacts,
  deals,
  onOpenAddActivity,
  onOpenEditActivity,
  onToggleCompleted,
  onDeleteActivity,
  onSelectContact,
}) {
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all"); // 'all', 'pending', 'completed'
  const [query, setQuery] = useState("");
  const [copiedPlaybookId, setCopiedPlaybookId] = useState(null);

  const contactMap = useMemo(() => {
    const map = new Map();
    contacts.forEach((c) => map.set(c.id, c));
    return map;
  }, [contacts]);

  const dealMap = useMemo(() => {
    const map = new Map();
    deals.forEach((d) => map.set(d.id, d));
    return map;
  }, [deals]);

  const filteredActivities = useMemo(() => {
    const q = query.toLowerCase().trim();
    return (activities || []).filter((a) => {
      const matchType = filterType === "all" || a.type === filterType;
      const matchStatus =
        filterStatus === "all" ||
        (filterStatus === "completed" ? a.completed : !a.completed);

      const contact = contactMap.get(a.contactId);
      const deal = dealMap.get(a.dealId);

      const matchQuery =
        !q ||
        `${a.title} ${a.description || ""} ${a.type} ${contact?.name || ""} ${deal?.title || ""}`
          .toLowerCase()
          .includes(q);

      return matchType && matchStatus && matchQuery;
    });
  }, [activities, filterType, filterStatus, query, contactMap, dealMap]);

  const handleCopyScript = (playbook) => {
    navigator.clipboard.writeText(playbook.script);
    setCopiedPlaybookId(playbook.id);
    setTimeout(() => setCopiedPlaybookId(null), 2000);
  };

  const pendingCount = (activities || []).filter((a) => !a.completed).length;
  const completedCount = (activities || []).filter((a) => a.completed).length;

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 flex-wrap">
        <div>
          <h2 className="ledger-display text-lg font-bold">Activity & Task Ledger</h2>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Keep record of calls, meetings, follow-up emails, and client milestones.
          </p>
        </div>

        <button
          onClick={() => onOpenAddActivity()}
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold shadow-xs transition"
          style={{ background: "var(--accent)", color: "#1B1F1D" }}
        >
          <Plus size={14} /> Log Activity
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 flex-wrap">
        {/* Type & Status Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-ledger pb-1">
          {[
            { id: "all", label: "All Items" },
            { id: "call", label: "Calls", icon: Phone },
            { id: "meeting", label: "Meetings", icon: Calendar },
            { id: "email", label: "Emails", icon: Mail },
            { id: "task", label: "Tasks", icon: CheckSquare },
            { id: "note", label: "Notes", icon: FileText },
          ].map((t) => {
            const isSelected = filterType === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setFilterType(t.id)}
                className="text-xs px-3 py-1.5 rounded-full font-medium transition shrink-0 flex items-center gap-1.5"
                style={{
                  background: isSelected ? "var(--accent)" : "var(--surface-2)",
                  color: isSelected ? "#1B1F1D" : "var(--text-muted)",
                  border: "1px solid var(--border)",
                }}
              >
                {t.icon && <t.icon size={12} />}
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Status Dropdown & Search */}
        <div className="flex items-center gap-2">
          <select
            className="ledger-input rounded-lg px-2.5 py-1.5 text-xs"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Status: All ({activities.length})</option>
            <option value="pending">Pending ({pendingCount})</option>
            <option value="completed">Completed ({completedCount})</option>
          </select>

          <div className="relative min-w-[160px]">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--text-muted)" }}
            />
            <input
              className="ledger-input w-full rounded-lg pl-8 pr-3 py-1.5 text-xs"
              placeholder="Search activities…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Main Activities Stack */}
      {filteredActivities.length === 0 ? (
        <div
          className="p-10 text-center rounded-xl space-y-3"
          style={{ background: "var(--surface)", border: "1px dashed var(--border)" }}
        >
          <EmptyStateIllustration type="activities" />
          <div className="text-sm font-semibold text-text">No activity records found</div>
          <p className="text-xs max-w-sm mx-auto" style={{ color: "var(--text-muted)" }}>
            Schedule and log customer calls, meetings, or reminders to stay on top of opportunities.
          </p>
          <button
            onClick={() => onOpenAddActivity()}
            className="px-3.5 py-2 rounded-lg text-xs font-semibold"
            style={{ background: "var(--accent)", color: "#1B1F1D" }}
          >
            <Plus size={13} className="inline mr-1" /> Log First Activity
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredActivities.map((a) => {
            const contact = contactMap.get(a.contactId);
            const deal = dealMap.get(a.dealId);

            return (
              <div
                key={a.id}
                className="p-4 rounded-xl flex items-start justify-between gap-4 row-hover transition shadow-xs"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  opacity: a.completed ? 0.75 : 1,
                }}
              >
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <input
                    type="checkbox"
                    checked={a.completed}
                    onChange={() => onToggleCompleted(a.id)}
                    className="mt-1 w-4 h-4 rounded accent-amber-500 cursor-pointer shrink-0"
                    aria-label="Toggle task completed"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-sm font-semibold ${
                          a.completed ? "line-through opacity-60" : "text-text"
                        }`}
                      >
                        {a.title}
                      </span>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider"
                        style={{
                          background: "var(--surface-2)",
                          color: "var(--accent)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        {a.type}
                      </span>
                    </div>

                    {a.description && (
                      <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        {a.description}
                      </p>
                    )}

                    <div className="flex items-center gap-3 mt-2 text-xs flex-wrap" style={{ color: "var(--text-muted)" }}>
                      {contact && (
                        <span
                          onClick={() => onSelectContact && onSelectContact(contact)}
                          className="flex items-center gap-1 cursor-pointer hover:underline text-text"
                        >
                          <User size={12} /> {contact.name}
                        </span>
                      )}
                      {deal && (
                        <span className="flex items-center gap-1">
                          <Wallet size={12} /> {deal.title}
                        </span>
                      )}
                      {a.dueDate && (
                        <span className="flex items-center gap-1 text-[11px]" style={{ color: "var(--text-dim)" }}>
                          <Calendar size={11} /> {formatDate(a.dueDate)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => onOpenEditActivity(a)}
                    className="p-1.5 rounded hover:bg-surface-2 transition"
                    style={{ color: "var(--text-muted)" }}
                    title="Edit Activity"
                    aria-label="Edit activity"
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    onClick={() => onDeleteActivity(a.id)}
                    className="p-1.5 rounded hover:bg-surface-2 transition"
                    style={{ color: "var(--negative)" }}
                    title="Delete Activity"
                    aria-label="Delete activity"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Sales Playbooks & Execution Templates Library */}
      <div
        className="rounded-xl p-5 shadow-xs"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BookOpen size={16} style={{ color: "var(--accent)" }} />
            <h3 className="ledger-display text-sm font-semibold">
              Sales Playbooks & Message Templates
            </h3>
          </div>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            Click copy to use directly in email or call notes
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {PLAYBOOK_TEMPLATES.map((p) => {
            const isCopied = copiedPlaybookId === p.id;
            return (
              <div
                key={p.id}
                className="p-4 rounded-xl flex flex-col justify-between"
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                }}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className="font-semibold text-xs text-text">{p.title}</span>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-mono font-medium shrink-0"
                      style={{ background: "var(--surface-3)", color: "var(--accent)" }}
                    >
                      {p.category}
                    </span>
                  </div>
                  <p className="text-[11px] mb-3" style={{ color: "var(--text-muted)" }}>
                    {p.description}
                  </p>
                  <pre
                    className="p-2.5 rounded-lg text-[10px] font-mono whitespace-pre-wrap overflow-x-auto max-h-32 scrollbar-ledger"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border-subtle)",
                      color: "var(--text)",
                    }}
                  >
                    {p.script}
                  </pre>
                </div>

                <div className="pt-3 mt-3 flex items-center justify-end gap-2 border-t border-border/40">
                  <button
                    type="button"
                    onClick={() =>
                      onOpenAddActivity({
                        type: p.type,
                        title: p.title,
                        description: p.script,
                      })
                    }
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded text-xs transition hover:bg-surface-3"
                    style={{
                      background: "var(--surface)",
                      color: "var(--text)",
                      border: "1px solid var(--border)",
                    }}
                    title="Open log dialog with this script"
                  >
                    <Plus size={11} /> Use in Log
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopyScript(p)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition"
                    style={{
                      background: isCopied ? "var(--positive)" : "var(--accent)",
                      color: "#1B1F1D",
                    }}
                  >
                    {isCopied ? <Check size={12} /> : <Copy size={12} />}
                    <span>{isCopied ? "Copied Script!" : "Copy Template"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
