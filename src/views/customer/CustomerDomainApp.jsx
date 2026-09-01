import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  UserCheck,
  LayoutGrid,
  FileText,
  MessageSquare,
  Building2,
  Shield,
  Clock,
  Send,
  Download,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  Plus,
} from "lucide-react";
import { crmBackend, USERS } from "../../backend/crmBackend.js";
import { notificationBus } from "../../backend/notificationBus.js";
import Header from "../../components/Header.jsx";
import NotificationDrawer from "../../components/NotificationDrawer.jsx";
import SettingsModal from "../../components/SettingsModal.jsx";
import Toast from "../../components/Toast.jsx";
import Avatar from "../../components/Avatar.jsx";
import { currency, formatDate } from "../../utils.js";
import { downloadTextFile } from "../../csv.js";

export default function CustomerDomainApp({ currentUser, onLogout }) {
  const [view, setView] = useState("dashboard");
  const [deals, setDeals] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const [inquirySubject, setInquirySubject] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [isSubmittingInq, setIsSubmittingInq] = useState(false);

  const [toasts, setToasts] = useState([]);
  const [settings, setSettings] = useState({
    theme: "dark",
    currency: "USD",
    userName: currentUser?.name || "Sarah Lin",
    userEmail: currentUser?.email || "sarah.client@acmeglobal.com",
    userRole: "Customer",
    organization: currentUser?.company || "Acme Global Corp",
    userPhotoUrl: currentUser?.photoUrl || "",
  });

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const addToast = useCallback((message, type = "success") => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  const loadData = useCallback(async () => {
    if (!currentUser) return;
    const [d, q, inq, accs, n] = await Promise.all([
      crmBackend.getAuthorizedDeals(currentUser),
      crmBackend.getAuthorizedQuotes(currentUser),
      crmBackend.getAuthorizedInquiries(currentUser),
      crmBackend.getAuthorizedAccounts(currentUser),
      crmBackend.getAuthorizedNotifications(currentUser),
    ]);
    setDeals(d);
    setQuotes(q);
    setInquiries(inq);
    setAccounts(accs);
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

  const assignedRep = useMemo(() => {
    return USERS.find((u) => u.id === currentUser?.assignedSalesRepId) || USERS[0];
  }, [currentUser]);

  const accountInfo = useMemo(() => {
    return accounts[0] || {
      name: currentUser?.company || "Acme Global Corp",
      annualRevenue: 280000,
      contractStatus: "Active",
      renewalDate: "2025-11-15",
      sla: "24/7 Priority SLA",
    };
  }, [accounts, currentUser]);

  const handleSendInquiry = async (e) => {
    e.preventDefault();
    if (!inquirySubject.trim() || !inquiryMessage.trim()) return;
    setIsSubmittingInq(true);
    try {
      await crmBackend.sendCustomerInquiry({
        subject: inquirySubject.trim(),
        message: inquiryMessage.trim(),
        customerUser: currentUser,
      });
      addToast("Inquiry sent to your dedicated account team!");
      setInquirySubject("");
      setInquiryMessage("");
      loadData();
    } catch (err) {
      addToast(err.message, "error");
    } finally {
      setIsSubmittingInq(false);
    }
  };

  const handleDownloadInvoice = (quote) => {
    const content = `LEDGER CRM COMMERCIAL INVOICE\n============================\nInvoice #: ${quote.quoteNumber}\nAccount: ${currentUser?.company}\nAmount: ${currency(quote.amount, "USD")}\nStatus: ${quote.status}\nValid Until: ${quote.validUntil}\nTerms: ${quote.terms}\nDate: ${formatDate(quote.createdAt)}\n\nThank you for your business!`;
    downloadTextFile(`Invoice-${quote.quoteNumber}.txt`, content);
    addToast(`Downloaded Invoice ${quote.quoteNumber}`);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="ledger-root min-h-screen flex flex-col font-sans">
      <Header
        settings={settings}
        onOpenSpotlight={() => {}}
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
              Client Portal Hub
            </div>

            {[
              { id: "dashboard", label: "My Client Hub", icon: LayoutGrid },
              { id: "deals", label: "Commercial Orders", icon: CheckCircle2, count: deals.length },
              { id: "quotes", label: "Quotes & Invoices", icon: FileText, count: quotes.length },
              { id: "support", label: "Support & Inquiries", icon: MessageSquare, count: inquiries.length },
              { id: "profile", label: "Company & Billing", icon: Building2 },
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
                      className="text-[10px] px-1.5 py-0.2 rounded-full font-mono"
                      style={{
                        background: active ? "#1B1F1D22" : "var(--surface-2)",
                        color: active ? "#1B1F1D" : "var(--text-dim)",
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
            <div className="text-[10px] text-text-dim uppercase tracking-wider">Active Service SLA</div>
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <Shield size={14} />
              <span>{accountInfo.sla}</span>
            </div>
            <div className="text-[10px] text-text-dim">Renewal: {accountInfo.renewalDate}</div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto scrollbar-ledger max-h-[calc(100vh-80px)]">
          {view === "dashboard" && (
            <div className="space-y-6">
              {/* Welcome Header */}
              <div className="p-6 rounded-2xl bg-surface border border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
                    <Shield size={12} /> Enterprise Account Verified
                  </div>
                  <h1 className="ledger-display text-xl font-bold text-text">
                    Welcome, {currentUser?.name}
                  </h1>
                  <p className="text-xs text-text-muted mt-0.5">
                    {currentUser?.title} · <strong>{currentUser?.company}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setView("support")}
                    className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-accent text-black flex items-center gap-1.5 shadow-sm"
                  >
                    <MessageSquare size={13} /> Send Inquiry
                  </button>
                </div>
              </div>

              {/* Dedicated Rep & Service Card */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Account Executive Card */}
                <div className="p-5 rounded-xl bg-surface border border-border space-y-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-text-muted">
                    Your Dedicated Sales Representative
                  </div>

                  <div className="flex items-center gap-3.5">
                    <Avatar name={assignedRep.name} photoUrl={assignedRep.photoUrl} size="lg" />
                    <div>
                      <h4 className="font-bold text-sm text-text">{assignedRep.name}</h4>
                      <div className="text-xs text-amber-400 font-medium">{assignedRep.title}</div>
                      <div className="text-[11px] text-text-dim mt-0.5">{assignedRep.team}</div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-border/40 text-xs">
                    <a href={`mailto:${assignedRep.email}`} className="flex items-center gap-2 text-text-muted hover:text-text">
                      <Mail size={13} style={{ color: "var(--accent)" }} />
                      <span>{assignedRep.email}</span>
                    </a>
                    <a href={`tel:${assignedRep.phone}`} className="flex items-center gap-2 text-text-muted hover:text-text">
                      <Phone size={13} style={{ color: "var(--positive)" }} />
                      <span>{assignedRep.phone}</span>
                    </a>
                  </div>
                </div>

                {/* Account Status Card */}
                <div className="lg:col-span-2 p-5 rounded-xl bg-surface border border-border flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
                        Active Contracts & Orders ({deals.length})
                      </span>
                      <button onClick={() => setView("deals")} className="text-xs text-amber-400 hover:underline">
                        View All
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {deals.map((d) => (
                        <div key={d.id} className="p-3 rounded-lg bg-surface-2 border border-border flex items-center justify-between text-xs">
                          <div>
                            <div className="font-semibold text-text">{d.title}</div>
                            <div className="text-[11px] text-text-muted mt-0.5">
                              Status: <strong className="text-emerald-400">{d.stage === "won" ? "Active License" : "In Review"}</strong>
                            </div>
                          </div>
                          <span className="ledger-mono font-bold text-amber-400 text-sm">
                            {currency(d.value, "USD")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-border/40 flex justify-between text-xs text-text-dim">
                    <span>Renewal Date: <strong>{accountInfo.renewalDate}</strong></span>
                    <span>SLA: <strong>{accountInfo.sla}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {view === "deals" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <h2 className="ledger-display text-lg font-bold">Your Commercial Orders & Licenses</h2>
                  <p className="text-xs text-text-muted">Authorized software suites and enterprise contracts for {currentUser?.company}.</p>
                </div>
              </div>

              <div className="space-y-3">
                {deals.map((d) => (
                  <div key={d.id} className="p-5 rounded-xl bg-surface border border-border space-y-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-base text-text">{d.title}</h3>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-400/20 text-emerald-400 border border-emerald-400/40">
                            {d.stage === "won" ? "Active License" : "Commercial Stage: " + d.stage}
                          </span>
                        </div>
                        <p className="text-xs text-text-muted mt-1">{d.notes || "Standard enterprise agreement."}</p>
                      </div>

                      <div className="text-right">
                        <div className="text-[10px] text-text-dim uppercase">Contract Value</div>
                        <div className="ledger-mono text-xl font-bold text-amber-400">
                          {currency(d.value, "USD")}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === "quotes" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <h2 className="ledger-display text-lg font-bold">Commercial Quotes & Invoices</h2>
                  <p className="text-xs text-text-muted">Formal price estimates and downloadable invoice documentation.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quotes.map((q) => (
                  <div key={q.id} className="p-5 rounded-xl bg-surface border border-border space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="font-mono text-xs font-bold text-amber-400">{q.quoteNumber}</span>
                          <div className="ledger-mono text-xl font-bold text-text mt-1">
                            {currency(q.amount, "USD")}
                          </div>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-surface-2 border border-border text-text-muted">
                          {q.status}
                        </span>
                      </div>
                      <p className="text-xs text-text-muted mt-2 leading-relaxed">{q.terms}</p>
                    </div>

                    <div className="pt-3 border-t border-border/40 flex items-center justify-between text-xs">
                      <span className="text-text-dim text-[11px]">Valid Until: {q.validUntil}</span>
                      <button
                        onClick={() => handleDownloadInvoice(q)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-surface-2 border border-border text-text hover:bg-surface-3 transition flex items-center gap-1.5"
                      >
                        <Download size={12} /> Download Invoice
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === "support" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <h2 className="ledger-display text-lg font-bold">Direct Representative Messaging</h2>
                  <p className="text-xs text-text-muted">Send technical or commercial questions directly to {assignedRep.name}.</p>
                </div>
              </div>

              {/* Inquiry Form */}
              <form onSubmit={handleSendInquiry} className="p-5 rounded-xl bg-surface border border-border space-y-3">
                <h3 className="ledger-display text-sm font-semibold text-text flex items-center gap-1.5">
                  <Send size={14} style={{ color: "var(--accent)" }} /> New Message to Account Team
                </h3>

                <div>
                  <input
                    required
                    className="ledger-input w-full rounded-lg px-3 py-2 text-xs"
                    placeholder="Subject line (e.g. Question about API limits or renewal pricing)…"
                    value={inquirySubject}
                    onChange={(e) => setInquirySubject(e.target.value)}
                  />
                </div>

                <div>
                  <textarea
                    required
                    rows={3}
                    className="ledger-input w-full rounded-lg px-3 py-2 text-xs resize-none"
                    placeholder="Provide details for your request…"
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmittingInq}
                    className="px-4 py-2 rounded-lg text-xs font-semibold bg-accent text-black flex items-center gap-1.5"
                  >
                    <Send size={12} /> {isSubmittingInq ? "Sending…" : "Submit Inquiry"}
                  </button>
                </div>
              </form>

              {/* Inquiries Thread History */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted">Message History</h3>
                {inquiries.map((inq) => (
                  <div key={inq.id} className="p-4 rounded-xl bg-surface border border-border space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-text">{inq.subject}</span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                              inq.status === "Open" ? "bg-amber-400/20 text-amber-400 border border-amber-400/40" : "bg-emerald-400/20 text-emerald-400"
                            }`}
                          >
                            {inq.status}
                          </span>
                        </div>
                        <div className="text-[11px] text-text-dim mt-0.5">Submitted: {formatDate(inq.createdAt)}</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-surface-2 text-xs text-text-muted">
                      "{inq.message}"
                    </div>

                    {inq.replyMessage ? (
                      <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-1">
                        <div className="font-semibold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 size={13} /> Official Reply from {inq.repliedBy || assignedRep.name}:
                        </div>
                        <p className="text-text-muted">"{inq.replyMessage}"</p>
                      </div>
                    ) : (
                      <div className="text-[11px] text-amber-400 flex items-center gap-1 italic">
                        <Clock size={12} /> Awaiting response from {assignedRep.name}...
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === "profile" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <h2 className="ledger-display text-lg font-bold">Company Profile & Account Details</h2>
                  <p className="text-xs text-text-muted">Registered corporate entity information for {currentUser?.company}.</p>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-surface border border-border space-y-4 max-w-xl">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] text-text-dim block uppercase">Company Name</span>
                    <span className="font-bold text-text text-sm">{currentUser?.company}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-text-dim block uppercase">Corporate Account Tier</span>
                    <span className="font-semibold text-amber-400">{accountInfo.tier || "Enterprise Strategic Tier"}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-text-dim block uppercase">Primary Decision Maker</span>
                    <span className="font-semibold text-text">{currentUser?.name} ({currentUser?.title})</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-text-dim block uppercase">Billing Email</span>
                    <span className="font-semibold text-text">{currentUser?.email}</span>
                  </div>
                </div>
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
        onLoadSampleData={() => {}}
        onExportAllJSON={() => {}}
        onImportAllJSON={() => {}}
        onClearAllData={() => {}}
        contactsCount={1}
        dealsCount={deals.length}
      />

      <Toast toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </div>
  );
}
