import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  LayoutGrid,
  Users,
  Wallet,
  CheckCircle2,
  AlertCircle,
  XCircle,
  TrendingUp,
  UserCheck,
  ArrowRight,
  Shield,
  Clock,
  Send,
  BarChart3,
  Calendar,
  Building2,
  DollarSign,
  Award,
  RefreshCw,
} from "lucide-react";
import { crmBackend, USERS } from "../../backend/crmBackend.js";
import { notificationBus } from "../../backend/notificationBus.js";
import Header from "../../components/Header.jsx";
import DealsView from "../../components/DealsView.jsx";
import ReportsView from "../../components/ReportsView.jsx";
import NotificationDrawer from "../../components/NotificationDrawer.jsx";
import SettingsModal from "../../components/SettingsModal.jsx";
import SpotlightModal from "../../components/SpotlightModal.jsx";
import Toast from "../../components/Toast.jsx";
import Avatar from "../../components/Avatar.jsx";
import { currency, formatDate, STAGES } from "../../utils.js";

export default function ManagerDomainApp({ currentUser, onLogout }) {
  const [view, setView] = useState("dashboard");
  const [deals, setDeals] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [activities, setActivities] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [reassignModal, setReassignModal] = useState({ isOpen: false, contact: null, targetRepId: "rep-1" });
  const [revisionModal, setRevisionModal] = useState({ isOpen: false, deal: null, feedback: "" });

  const [toasts, setToasts] = useState([]);
  const [settings, setSettings] = useState({
    theme: "dark",
    currency: "USD",
    userName: currentUser?.name || "Elena Vance",
    userEmail: currentUser?.email || "elena.manager@ledgercrm.com",
    userRole: "Sales Manager",
    organization: "Executive Sales Leadership",
    userPhotoUrl: currentUser?.photoUrl || "",
  });

  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const addToast = useCallback((message, type = "success") => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  const loadData = useCallback(async () => {
    if (!currentUser) return;
    const [c, d, a, n] = await Promise.all([
      crmBackend.getAuthorizedContacts(currentUser),
      crmBackend.getAuthorizedDeals(currentUser),
      crmBackend.getAuthorizedActivities(currentUser),
      crmBackend.getAuthorizedNotifications(currentUser),
    ]);
    setContacts(c);
    setDeals(d);
    setActivities(a);
    setNotifications(n);
  }, [currentUser]);

  useEffect(() => {
    loadData();
    const unsubscribe = notificationBus.subscribe((event) => {
      loadData();
      if (
        event.type === "notification_created" &&
        (event.recipientId === currentUser?.id || event.recipientRole === currentUser?.role)
      ) {
        addToast(`🔔 ${event.notification.title}`, "info");
      }
    });
    return unsubscribe;
  }, [loadData, currentUser, addToast]);

  const reps = useMemo(() => {
    return USERS.filter((u) => u.role === "sales_rep");
  }, []);

  // Manager Team Metrics
  const stats = useMemo(() => {
    const teamPipe = deals.filter((d) => d.stage !== "won" && d.stage !== "lost").reduce((s, d) => s + (Number(d.value) || 0), 0);
    const teamWon = deals.filter((d) => d.stage === "won").reduce((s, d) => s + (Number(d.value) || 0), 0);
    const target = currentUser?.quota || 1500000;
    const targetPercent = Math.min(100, Math.round((teamWon / target) * 100));
    const pendingApprovals = deals.filter((d) => d.approvalStatus === "pending_manager_approval");

    // Rep performance leaderboard
    const repStats = reps.map((r) => {
      const repDeals = deals.filter((d) => d.ownerId === r.id || d.assignedSalesRepId === r.id);
      const wonVal = repDeals.filter((d) => d.stage === "won").reduce((s, d) => s + (Number(d.value) || 0), 0);
      const pipeVal = repDeals.filter((d) => d.stage !== "won" && d.stage !== "lost").reduce((s, d) => s + (Number(d.value) || 0), 0);
      const pct = Math.min(100, Math.round((wonVal / (r.quota || 500000)) * 100));
      return {
        ...r,
        dealsCount: repDeals.length,
        wonValue: wonVal,
        pipeValue: pipeVal,
        attainment: pct,
      };
    });

    return {
      teamPipe,
      teamWon,
      target,
      targetPercent,
      pendingApprovals,
      repStats,
    };
  }, [deals, reps, currentUser]);

  // Actions
  const handleApproveDeal = async (dealId) => {
    await crmBackend.approveDeal(dealId, currentUser);
    addToast("Deal approved! Notification dispatched to Sales Rep.");
    loadData();
  };

  const handleRequestRevision = async () => {
    if (!revisionModal.deal) return;
    await crmBackend.rejectDeal(revisionModal.deal.id, revisionModal.feedback, currentUser);
    addToast("Revisions requested. Sales Rep has been notified.");
    setRevisionModal({ isOpen: false, deal: null, feedback: "" });
    loadData();
  };

  const handleReassignLead = async () => {
    if (!reassignModal.contact) return;
    await crmBackend.reassignLead(reassignModal.contact.id, reassignModal.targetRepId, currentUser);
    const targetRep = USERS.find((u) => u.id === reassignModal.targetRepId);
    addToast(`Lead reassigned to ${targetRep?.name}! Real-time notification sent.`);
    setReassignModal({ isOpen: false, contact: null, targetRepId: "rep-1" });
    loadData();
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="ledger-root min-h-screen flex flex-col font-sans">
      <Header
        settings={settings}
        onOpenSpotlight={() => setSpotlightOpen(true)}
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenNotifications={() => setNotificationsOpen(true)}
        unreadNotificationsCount={unreadCount}
        onAddContact={() => {}}
        onAddDeal={() => {}}
        onAddActivity={() => {}}
        onToggleTheme={() => {
          const next = settings.theme === "dark" ? "light" : "dark";
          setSettings({ ...settings, theme: next });
          document.documentElement.setAttribute("data-theme", next);
        }}
        onLoadSampleData={() => crmBackend.resetDatabase()}
        onExportAllJSON={() => {}}
        onToggleMobileMenu={() => {}}
      />

      <div className="flex-1 flex min-w-0">
        {/* Sidebar */}
        <aside
          className="w-56 p-3 flex flex-col justify-between"
          style={{ background: "var(--surface)", borderRight: "1px solid var(--border)" }}
        >
          <div className="space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-text-dim">
              Sales Manager Command
            </div>

            {[
              { id: "dashboard", label: "Team Dashboard", icon: LayoutGrid },
              { id: "approvals", label: "Deal Approvals", icon: CheckCircle2, count: stats.pendingApprovals.length, alert: stats.pendingApprovals.length > 0 },
              { id: "reassign", label: "Lead Reassignment", icon: UserCheck, count: contacts.length },
              { id: "team_deals", label: "Team Pipeline", icon: Wallet, count: deals.length },
              { id: "reps", label: "Sales Rep Directory", icon: Users, count: reps.length },
              { id: "reports", label: "Forecast & Reports", icon: BarChart3 },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = view === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setView(tab.id)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition"
                  style={{
                    background: active ? "var(--accent)" : "transparent",
                    color: active ? "#1B1F1D" : "var(--text-muted)",
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={15} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span
                      className="text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold"
                      style={{
                        background: tab.alert ? "var(--negative)" : active ? "#1B1F1D22" : "var(--surface-2)",
                        color: tab.alert ? "#FFFFFF" : active ? "#1B1F1D" : "var(--text-dim)",
                      }}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-3 rounded-xl bg-surface-2 border border-border space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[11px]">Team Quota Progress</span>
              <span className="font-mono font-bold text-sky-400">{stats.targetPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-3 overflow-hidden">
              <div
                className="h-full rounded-full bg-sky-400 transition-all duration-500"
                style={{ width: `${stats.targetPercent}%` }}
              />
            </div>
            <div className="text-[10px] text-text-dim flex justify-between">
              <span>Won: {currency(stats.teamWon, "USD")}</span>
              <span>Goal: {currency(stats.target, "USD")}</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto scrollbar-ledger max-h-[calc(100vh-80px)]">
          {view === "dashboard" && (
            <div className="space-y-6">
              {/* Top KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-surface border border-border">
                  <div className="text-xs uppercase tracking-wider font-semibold text-text-muted">Team Open Pipeline</div>
                  <div className="text-2xl mt-1 ledger-mono font-bold text-sky-400">
                    {currency(stats.teamPipe, "USD")}
                  </div>
                  <div className="text-[11px] text-text-muted mt-1">{deals.length} total team deals</div>
                </div>

                <div className="p-4 rounded-xl bg-surface border border-border">
                  <div className="text-xs uppercase tracking-wider font-semibold text-text-muted">Total Closed Won</div>
                  <div className="text-2xl mt-1 ledger-mono font-bold text-emerald-400">
                    {currency(stats.teamWon, "USD")}
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1">Recognized team revenue</div>
                </div>

                <div className="p-4 rounded-xl bg-surface border border-border">
                  <div className="text-xs uppercase tracking-wider font-semibold text-text-muted">Pending Approvals</div>
                  <div className="text-2xl mt-1 ledger-display font-bold text-amber-400">
                    {stats.pendingApprovals.length}
                  </div>
                  <div className="text-[11px] text-amber-400 mt-1">High-value deals ($50k+)</div>
                </div>

                <div className="p-4 rounded-xl bg-surface border border-border">
                  <div className="text-xs uppercase tracking-wider font-semibold text-text-muted">Active Sales Team</div>
                  <div className="text-2xl mt-1 ledger-display font-bold text-text">
                    {reps.length} Reps
                  </div>
                  <div className="text-[11px] text-text-muted mt-1">Direct reports in enterprise pod</div>
                </div>
              </div>

              {/* Deal Approvals Alert Banner */}
              {stats.pendingApprovals.length > 0 && (
                <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-amber-400" />
                      <h3 className="ledger-display text-sm font-semibold text-text">
                        High-Value Deal Approvals Required ({stats.pendingApprovals.length})
                      </h3>
                    </div>
                    <button
                      onClick={() => setView("approvals")}
                      className="text-xs font-semibold text-amber-400 hover:underline"
                    >
                      View Approvals Queue
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {stats.pendingApprovals.map((deal) => {
                      const rep = USERS.find((u) => u.id === deal.ownerId);
                      return (
                        <div key={deal.id} className="p-3 rounded-lg bg-surface border border-border flex items-center justify-between gap-3 text-xs">
                          <div>
                            <div className="font-semibold text-text">{deal.title}</div>
                            <div className="text-[11px] text-text-muted mt-0.5">
                              Submitted by <strong>{rep?.name || "Rep"}</strong> · Stage: {deal.stage}
                            </div>
                            <div className="ledger-mono font-bold text-amber-400 mt-1">
                              {currency(deal.value, "USD")}
                            </div>
                          </div>

                          <div className="flex flex-col gap-1 shrink-0">
                            <button
                              onClick={() => handleApproveDeal(deal.id)}
                              className="px-2.5 py-1 rounded bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition"
                            >
                              Approve ✓
                            </button>
                            <button
                              onClick={() => setRevisionModal({ isOpen: true, deal, feedback: "" })}
                              className="px-2.5 py-1 rounded bg-surface-2 border border-border text-text-muted hover:text-text transition"
                            >
                              Revisions ✍
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Rep Performance Leaderboard */}
              <div className="p-5 rounded-xl bg-surface border border-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-amber-400" />
                    <h3 className="ledger-display text-sm font-semibold uppercase tracking-wider text-text-muted">
                      Sales Representative Quota Leaderboard
                    </h3>
                  </div>
                  <button onClick={() => setView("reassign")} className="text-xs text-sky-400 hover:underline">
                    Reassign Leads
                  </button>
                </div>

                <div className="space-y-3">
                  {stats.repStats.map((rep) => (
                    <div key={rep.id} className="p-4 rounded-xl bg-surface-2 border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={rep.name} photoUrl={rep.photoUrl} size="md" />
                        <div>
                          <div className="font-semibold text-sm text-text">{rep.name}</div>
                          <div className="text-xs text-text-muted">{rep.title} · {rep.dealsCount} active deal(s)</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-text-dim">Pipeline Load</div>
                          <div className="font-mono text-xs font-bold text-text">{currency(rep.pipeValue, "USD")}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-text-dim">Closed Won</div>
                          <div className="font-mono text-xs font-bold text-emerald-400">{currency(rep.wonValue, "USD")}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] uppercase tracking-wider text-text-dim">Quota %</div>
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-surface-3 text-amber-400">
                            {rep.attainment}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {view === "approvals" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <h2 className="ledger-display text-lg font-bold">Manager Deal Approvals Queue</h2>
                  <p className="text-xs text-text-muted">High-value contracts and custom pricing terms requiring VP / Manager sign-off.</p>
                </div>
              </div>

              {stats.pendingApprovals.length === 0 ? (
                <div className="p-12 text-center rounded-xl bg-surface border border-dashed border-border text-xs text-text-muted">
                  All high-value deals are approved! No pending approval requests.
                </div>
              ) : (
                <div className="space-y-3">
                  {stats.pendingApprovals.map((deal) => {
                    const rep = USERS.find((u) => u.id === deal.ownerId);
                    return (
                      <div key={deal.id} className="p-5 rounded-xl bg-surface border border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-text">{deal.title}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/40">
                              Requires Sign-Off ($50k+)
                            </span>
                          </div>
                          <div className="text-xs text-text-muted mt-1">
                            Owner: <strong>{rep?.name}</strong> · Close Date: {deal.expectedClose} · Stage: <strong>{deal.stage}</strong>
                          </div>
                          <p className="text-xs mt-2 text-text-dim italic">"{deal.notes}"</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="ledger-mono text-lg font-bold text-amber-400">
                            {currency(deal.value, "USD")}
                          </span>
                          <button
                            onClick={() => handleApproveDeal(deal.id)}
                            className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-emerald-500 text-black hover:bg-emerald-400 transition"
                          >
                            Approve Deal ✓
                          </button>
                          <button
                            onClick={() => setRevisionModal({ isOpen: true, deal, feedback: "" })}
                            className="px-3.5 py-2 rounded-lg text-xs font-medium bg-surface-2 border border-border text-text-muted hover:text-text transition"
                          >
                            Request Revisions
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {view === "reassign" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <h2 className="ledger-display text-lg font-bold">Lead & Account Reassignment Center</h2>
                  <p className="text-xs text-text-muted">Reallocate prospective leads and client accounts across your sales representatives.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {contacts.map((c) => {
                  const currentRep = USERS.find((u) => u.id === c.assignedSalesRepId);
                  return (
                    <div key={c.id} className="p-4 rounded-xl bg-surface border border-border flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3 min-w-0">
                        <Avatar name={c.name} photoUrl={c.photoUrl} size="md" />
                        <div className="truncate">
                          <div className="font-semibold text-text truncate">{c.name}</div>
                          <div className="text-[11px] text-text-muted truncate">{c.company} · {c.title}</div>
                          <div className="text-[10px] text-text-dim mt-1">
                            Assigned to: <strong className="text-amber-400">{currentRep?.name || "Unassigned"}</strong>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setReassignModal({ isOpen: true, contact: c, targetRepId: reps.find((r) => r.id !== c.assignedSalesRepId)?.id || "rep-1" })}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-surface-2 border border-border text-text hover:bg-surface-3 transition shrink-0"
                      >
                        Reassign Lead →
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {view === "team_deals" && (
            <DealsView
              deals={deals}
              contacts={contacts}
              currencyCode="USD"
              activeStageFilter="all"
              onSelectStageFilter={() => {}}
              onOpenAdd={() => {}}
              onOpenEdit={() => {}}
              onUpdateStage={() => {}}
              onDelete={() => {}}
              onSelectContact={() => {}}
            />
          )}

          {view === "reps" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <h2 className="ledger-display text-lg font-bold">Enterprise Sales Rep Directory</h2>
                  <p className="text-xs text-text-muted">Direct reports, quota targets, and individual pipeline coverage.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stats.repStats.map((rep) => (
                  <div key={rep.id} className="p-5 rounded-xl bg-surface border border-border space-y-4">
                    <div className="flex items-center gap-3.5">
                      <Avatar name={rep.name} photoUrl={rep.photoUrl} size="lg" />
                      <div>
                        <h3 className="font-bold text-sm text-text">{rep.name}</h3>
                        <div className="text-xs text-sky-400 font-medium">{rep.title}</div>
                        <div className="text-[11px] text-text-muted mt-0.5">{rep.email} · {rep.phone}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-surface-2 border border-border text-center">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-text-dim">Deals</div>
                        <div className="font-bold text-sm text-text mt-0.5">{rep.dealsCount}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-text-dim">Pipeline</div>
                        <div className="font-mono font-bold text-xs text-text mt-0.5">{currency(rep.pipeValue, "USD")}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-text-dim">Won Revenue</div>
                        <div className="font-mono font-bold text-xs text-emerald-400 mt-0.5">{currency(rep.wonValue, "USD")}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === "reports" && (
            <ReportsView contacts={contacts} deals={deals} currencyCode="USD" />
          )}
        </main>
      </div>

      {/* Reassign Modal */}
      {reassignModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-backdrop">
          <div className="w-full max-w-md rounded-xl p-6 bg-surface border border-border shadow-2xl modal-content space-y-4">
            <h3 className="ledger-display text-sm font-bold">Reassign Lead</h3>
            <p className="text-xs text-text-muted">
              Select the sales representative who will take ownership of <strong>{reassignModal.contact?.name}</strong> ({reassignModal.contact?.company}).
            </p>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-text-muted">
                Assign to Sales Representative:
              </label>
              <select
                className="ledger-input w-full rounded-lg p-2 text-xs"
                value={reassignModal.targetRepId}
                onChange={(e) => setReassignModal({ ...reassignModal, targetRepId: e.target.value })}
              >
                {reps.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} ({r.title})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setReassignModal({ isOpen: false, contact: null, targetRepId: "rep-1" })}
                className="px-3 py-1.5 rounded text-xs text-text-muted"
              >
                Cancel
              </button>
              <button
                onClick={handleReassignLead}
                className="px-4 py-1.5 rounded text-xs font-semibold bg-accent text-black"
              >
                Confirm Reassignment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Revision Modal */}
      {revisionModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-backdrop">
          <div className="w-full max-w-md rounded-xl p-6 bg-surface border border-border shadow-2xl modal-content space-y-4">
            <h3 className="ledger-display text-sm font-bold">Request Revisions on Deal</h3>
            <p className="text-xs text-text-muted">
              Provide feedback for <strong>{revisionModal.deal?.title}</strong> ($
              {currency(revisionModal.deal?.value, "USD")}).
            </p>

            <textarea
              className="ledger-input w-full rounded-lg p-3 text-xs resize-none"
              rows={4}
              placeholder="e.g. Please cap multi-year discount at 5% and verify procurement SLA..."
              value={revisionModal.feedback}
              onChange={(e) => setRevisionModal({ ...revisionModal, feedback: e.target.value })}
            />

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setRevisionModal({ isOpen: false, deal: null, feedback: "" })}
                className="px-3 py-1.5 rounded text-xs text-text-muted"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestRevision}
                className="px-4 py-1.5 rounded text-xs font-semibold bg-amber-400 text-black"
              >
                Send Revisions Request
              </button>
            </div>
          </div>
        </div>
      )}

      <NotificationDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onMarkAsRead={(id) => crmBackend.markNotificationRead(id)}
        onMarkAllRead={() => crmBackend.markAllNotificationsRead(currentUser)}
        onClearAll={() => crmBackend.clearNotifications(currentUser)}
        onSelectNotification={() => setNotificationsOpen(false)}
      />

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={setSettings}
        onLoadSampleData={() => crmBackend.resetDatabase()}
        onExportAllJSON={() => {}}
        onImportAllJSON={() => {}}
        onClearAllData={() => {}}
        contactsCount={contacts.length}
        dealsCount={deals.length}
      />

      <SpotlightModal
        isOpen={spotlightOpen}
        onClose={() => setSpotlightOpen(false)}
        contacts={contacts}
        deals={deals}
        activities={activities}
        onSelectContact={() => {}}
        onSelectDeal={() => setView("team_deals")}
        onNavigateTab={(tab) => setView(tab)}
      />

      <Toast toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </div>
  );
}
