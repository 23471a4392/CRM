import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Building2,
  LayoutGrid,
  Shield,
  Clock,
  Calendar,
  DollarSign,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { crmBackend, USERS } from "../../backend/crmBackend.js";
import { notificationBus } from "../../backend/notificationBus.js";
import Header from "../../components/Header.jsx";
import NotificationDrawer from "../../components/NotificationDrawer.jsx";
import SettingsModal from "../../components/SettingsModal.jsx";
import SpotlightModal from "../../components/SpotlightModal.jsx";
import Toast from "../../components/Toast.jsx";
import Avatar from "../../components/Avatar.jsx";
import { currency, formatDate } from "../../utils.js";

export default function AccountsDomainApp({ currentUser, onLogout }) {
  const [view, setView] = useState("dashboard");
  const [accounts, setAccounts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [deals, setDeals] = useState([]);
  const [activities, setActivities] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [toasts, setToasts] = useState([]);
  const [settings, setSettings] = useState({
    theme: "dark",
    currency: "USD",
    userName: currentUser?.name || "Marcus Sterling",
    userEmail: currentUser?.email || "marcus.accounts@ledgercrm.com",
    userRole: "Account Owner",
    organization: "Client Portfolio Management",
    userPhotoUrl: currentUser?.photoUrl || "",
  });

  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const addToast = useCallback((message, type = "success") => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  const loadData = useCallback(async () => {
    if (!currentUser) return;
    const [accs, c, d, a, n] = await Promise.all([
      crmBackend.getAuthorizedAccounts(currentUser),
      crmBackend.getAuthorizedContacts(currentUser),
      crmBackend.getAuthorizedDeals(currentUser),
      crmBackend.getAuthorizedActivities(currentUser),
      crmBackend.getAuthorizedNotifications(currentUser),
    ]);
    setAccounts(accs);
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

  // Account Owner Portfolio Stats
  const stats = useMemo(() => {
    const totalARR = accounts.reduce((s, a) => s + (Number(a.annualRevenue) || 0), 0);
    const avgHealth = accounts.length > 0 ? Math.round(accounts.reduce((s, a) => s + (a.healthScore || 90), 0) / accounts.length) : 100;
    const renewalsUpcoming = accounts.filter((a) => {
      if (!a.renewalDate) return false;
      const days = (new Date(a.renewalDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
      return days <= 90 && days >= 0;
    });
    const wonDealsVal = deals.filter((d) => d.stage === "won").reduce((s, d) => s + (Number(d.value) || 0), 0);

    return {
      totalARR,
      avgHealth,
      renewalsUpcoming,
      accountsCount: accounts.length,
      wonDealsVal,
    };
  }, [accounts, deals]);

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
              Account Owner Portfolio
            </div>

            {[
              { id: "dashboard", label: "Portfolio Hub", icon: LayoutGrid },
              { id: "accounts", label: "Enterprise Accounts", icon: Building2, count: accounts.length },
              { id: "renewals", label: "Contract Renewals", icon: Clock, count: stats.renewalsUpcoming.length, alert: stats.renewalsUpcoming.length > 0 },
              { id: "revenue", label: "ARR & Revenue Ledger", icon: DollarSign },
              { id: "stakeholders", label: "Client Stakeholders", icon: Users, count: contacts.length },
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
                        background: tab.alert ? "var(--accent)" : active ? "#1B1F1D22" : "var(--surface-2)",
                        color: tab.alert ? "#1B1F1D" : active ? "#1B1F1D" : "var(--text-dim)",
                      }}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-3 rounded-xl bg-surface-2 border border-border space-y-1">
            <div className="text-[10px] text-text-dim uppercase tracking-wider">Portfolio Health Index</div>
            <div className="text-xl font-bold text-emerald-400 flex items-center gap-1.5">
              <Shield size={16} />
              <span>{stats.avgHealth} / 100</span>
            </div>
            <div className="text-[10px] text-text-muted">High retention & low churn risk</div>
          </div>
        </aside>

        {/* Content View */}
        <main className="flex-1 p-6 overflow-y-auto scrollbar-ledger max-h-[calc(100vh-80px)]">
          {view === "dashboard" && (
            <div className="space-y-6">
              {/* Top Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-surface border border-border">
                  <div className="text-xs uppercase tracking-wider font-semibold text-text-muted">Portfolio ARR</div>
                  <div className="text-2xl mt-1 ledger-mono font-bold text-emerald-400">
                    {currency(stats.totalARR, "USD")}
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1">Annual Recurring Revenue</div>
                </div>

                <div className="p-4 rounded-xl bg-surface border border-border">
                  <div className="text-xs uppercase tracking-wider font-semibold text-text-muted">Active Key Accounts</div>
                  <div className="text-2xl mt-1 ledger-display font-bold text-text">
                    {accounts.length}
                  </div>
                  <div className="text-[11px] text-text-muted mt-1">Managed strategic accounts</div>
                </div>

                <div className="p-4 rounded-xl bg-surface border border-border">
                  <div className="text-xs uppercase tracking-wider font-semibold text-text-muted">Renewals (90 Days)</div>
                  <div className="text-2xl mt-1 ledger-display font-bold text-amber-400">
                    {stats.renewalsUpcoming.length}
                  </div>
                  <div className="text-[11px] text-amber-400 mt-1">Contracts due for renewal</div>
                </div>

                <div className="p-4 rounded-xl bg-surface border border-border">
                  <div className="text-xs uppercase tracking-wider font-semibold text-text-muted">Recognized Won Deals</div>
                  <div className="text-2xl mt-1 ledger-mono font-bold text-sky-400">
                    {currency(stats.wonDealsVal, "USD")}
                  </div>
                  <div className="text-[11px] text-sky-400 mt-1">Expansion deals won</div>
                </div>
              </div>

              {/* Renewals Notice */}
              {stats.renewalsUpcoming.length > 0 && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock size={20} className="text-amber-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-xs text-text">
                        {stats.renewalsUpcoming.length} Client Contract(s) Approaching Expiration
                      </div>
                      <div className="text-[11px] text-text-muted">
                        Review contract terms and schedule renewal checkpoint calls with executive stakeholders.
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setView("renewals")}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-400 text-black"
                  >
                    View Renewals
                  </button>
                </div>
              )}

              {/* Portfolio Accounts Grid */}
              <div className="p-5 rounded-xl bg-surface border border-border space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="ledger-display text-sm font-semibold uppercase tracking-wider text-text-muted">
                    Enterprise Client Accounts
                  </h3>
                  <button onClick={() => setView("accounts")} className="text-xs text-amber-400 hover:underline">
                    View Portfolio Matrix
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {accounts.map((acc) => {
                    const rep = USERS.find((u) => u.id === acc.assignedSalesRepId);
                    return (
                      <div key={acc.id} className="p-4 rounded-xl bg-surface-2 border border-border space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-bold text-sm text-text">{acc.name}</div>
                            <div className="text-xs text-text-muted">{acc.industry}</div>
                          </div>
                          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-emerald-400/20 text-emerald-400 border border-emerald-400/40">
                            Health: {acc.healthScore}%
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-border/40">
                          <div>
                            <div className="text-[10px] text-text-dim">Annual Contract (ARR)</div>
                            <div className="font-mono font-bold text-emerald-400 mt-0.5">
                              {currency(acc.annualRevenue, "USD")}
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] text-text-dim">Renewal Date</div>
                            <div className="font-semibold text-text mt-0.5">{acc.renewalDate}</div>
                          </div>
                        </div>

                        <div className="text-[11px] text-text-dim pt-2 border-t border-border/40 flex justify-between items-center">
                          <span>Assigned Rep: <strong className="text-text">{rep?.name || "Rep"}</strong></span>
                          <span className="font-mono">{acc.sla}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {view === "accounts" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <h2 className="ledger-display text-lg font-bold">Enterprise Client Accounts Portfolio</h2>
                  <p className="text-xs text-text-muted">Master ledger of managed client accounts, tiers, and service agreements.</p>
                </div>
              </div>

              <div className="space-y-3">
                {accounts.map((acc) => {
                  const rep = USERS.find((u) => u.id === acc.assignedSalesRepId);
                  const accDeals = deals.filter((d) => d.accountId === acc.id);
                  const accContacts = contacts.filter((c) => c.accountId === acc.id);

                  return (
                    <div key={acc.id} className="p-5 rounded-xl bg-surface border border-border space-y-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-base text-text">{acc.name}</h3>
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-surface-2 border border-border text-amber-400">
                              {acc.tier}
                            </span>
                          </div>
                          <div className="text-xs text-text-muted mt-0.5">
                            {acc.industry} · Primary Contact: <strong>{acc.billingContact}</strong>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-[10px] text-text-dim uppercase">Annual Contract Value</div>
                          <div className="font-mono text-xl font-bold text-emerald-400">
                            {currency(acc.annualRevenue, "USD")}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-lg bg-surface-2 border border-border text-xs">
                        <div>
                          <span className="text-[10px] text-text-dim block">Status</span>
                          <span className="font-semibold text-emerald-400">{acc.contractStatus}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-text-dim block">Next Renewal</span>
                          <span className="font-semibold text-text">{acc.renewalDate}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-text-dim block">SLA Commitment</span>
                          <span className="font-semibold text-text">{acc.sla}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-text-dim block">Assigned Sales Rep</span>
                          <span className="font-semibold text-sky-400">{rep?.name || "Rep"}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-text-muted pt-2 border-t border-border/40">
                        <span>{accDeals.length} attached deal(s) · {accContacts.length} stakeholder(s)</span>
                        <button
                          onClick={() => {
                            setSelectedAccount(acc);
                            addToast(`Opened account dossier for ${acc.name}`);
                          }}
                          className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                        >
                          <span>Manage Account History</span> <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {view === "renewals" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <h2 className="ledger-display text-lg font-bold">Contract Renewals Calendar</h2>
                  <p className="text-xs text-text-muted">Upcoming renewal milestones requiring commercial reviews.</p>
                </div>
              </div>

              <div className="space-y-3">
                {accounts.map((acc) => (
                  <div key={acc.id} className="p-4 rounded-xl bg-surface border border-border flex items-center justify-between gap-4 text-xs">
                    <div>
                      <div className="font-semibold text-sm text-text">{acc.name}</div>
                      <div className="text-xs text-text-muted mt-0.5">
                        Current ARR: <strong className="text-emerald-400">{currency(acc.annualRevenue, "USD")}</strong> · {acc.sla}
                      </div>
                      <div className="text-[11px] text-amber-400 mt-1">
                        Renewal Date: <strong>{acc.renewalDate}</strong>
                      </div>
                    </div>

                    <button
                      onClick={() => addToast(`Initiated renewal review workflow for ${acc.name}`)}
                      className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-accent text-black flex items-center gap-1"
                    >
                      <span>Initiate Renewal</span> <ArrowRight size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === "revenue" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <h2 className="ledger-display text-lg font-bold">Annual Recurring Revenue Ledger</h2>
                  <p className="text-xs text-text-muted">Portfolio breakdown and client contract financial summary.</p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-surface border border-border space-y-4">
                <div className="text-xs text-text-muted">Account Revenue Concentration:</div>
                <div className="space-y-3">
                  {accounts.map((acc) => {
                    const pct = Math.round((acc.annualRevenue / stats.totalARR) * 100);
                    return (
                      <div key={acc.id} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium">
                          <span>{acc.name}</span>
                          <span className="font-mono text-emerald-400">{currency(acc.annualRevenue, "USD")} ({pct}%)</span>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-surface-2 overflow-hidden">
                          <div className="h-full rounded-full bg-emerald-400" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {view === "stakeholders" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <h2 className="ledger-display text-lg font-bold">Key Client Decision Makers</h2>
                  <p className="text-xs text-text-muted">Executive contacts and sponsors across your managed accounts.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {contacts.map((c) => (
                  <div key={c.id} className="p-4 rounded-xl bg-surface border border-border flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <Avatar name={c.name} photoUrl={c.photoUrl} size="md" />
                      <div>
                        <div className="font-semibold text-text">{c.name}</div>
                        <div className="text-[11px] text-text-muted">{c.title} · {c.company}</div>
                        <div className="text-[10px] text-text-dim mt-0.5">{c.email}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <a href={`mailto:${c.email}`} className="p-1.5 rounded bg-surface-2 text-text-muted hover:text-text">
                        <Mail size={13} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

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
        onSelectDeal={() => {}}
        onNavigateTab={(tab) => setView(tab)}
      />

      <Toast toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </div>
  );
}
