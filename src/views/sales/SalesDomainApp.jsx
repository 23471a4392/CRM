import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  LayoutGrid,
  Users,
  Wallet,
  Calendar,
  FileText,
  MessageSquare,
  Plus,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  Send,
  ArrowRight,
  TrendingUp,
  Tag,
  Mail,
  Phone,
  Building2,
  Award,
} from "lucide-react";
import { crmBackend } from "../../backend/crmBackend.js";
import { notificationBus } from "../../backend/notificationBus.js";
import Header from "../../components/Header.jsx";
import ContactsView from "../../components/ContactsView.jsx";
import DealsView from "../../components/DealsView.jsx";
import ActivitiesView from "../../components/ActivitiesView.jsx";
import ContactDetailModal from "../../components/ContactDetailModal.jsx";
import ContactForm from "../../components/ContactForm.jsx";
import DealForm from "../../components/DealForm.jsx";
import ActivityForm from "../../components/ActivityForm.jsx";
import NotificationDrawer from "../../components/NotificationDrawer.jsx";
import SettingsModal from "../../components/SettingsModal.jsx";
import SpotlightModal from "../../components/SpotlightModal.jsx";
import DeleteConfirmModal from "../../components/DeleteConfirmModal.jsx";
import Toast from "../../components/Toast.jsx";
import Avatar from "../../components/Avatar.jsx";
import { currency, formatDate, STAGES } from "../../utils.js";

export default function SalesDomainApp({ currentUser, onLogout }) {
  const [view, setView] = useState("dashboard");
  const [contacts, setContacts] = useState([]);
  const [deals, setDeals] = useState([]);
  const [activities, setActivities] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Modals & Panels
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [contactDetail, setContactDetail] = useState(null);
  const [contactFormModal, setContactFormModal] = useState({ isOpen: false, initial: null });
  const [dealFormModal, setDealFormModal] = useState({ isOpen: false, initial: null, defaultStage: "lead", preselectedContactId: "" });
  const [activityFormModal, setActivityFormModal] = useState({ isOpen: false, initial: null, preselectedContactId: "", preselectedDealId: "" });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, title: "", message: "", onConfirm: null });
  const [replyModal, setReplyModal] = useState({ isOpen: false, inquiry: null, text: "" });

  const [toasts, setToasts] = useState([]);
  const [settings, setSettings] = useState({
    theme: "dark",
    currency: "USD",
    userName: currentUser?.name || "Jordan Blake",
    userEmail: currentUser?.email || "jordan.rep@ledgercrm.com",
    userRole: "Sales Representative",
    organization: "Core Enterprise Sales",
    userPhotoUrl: currentUser?.photoUrl || "",
  });

  const addToast = useCallback((message, type = "success") => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  const loadData = useCallback(async () => {
    if (!currentUser) return;
    const [c, d, a, inq, q, n] = await Promise.all([
      crmBackend.getAuthorizedContacts(currentUser),
      crmBackend.getAuthorizedDeals(currentUser),
      crmBackend.getAuthorizedActivities(currentUser),
      crmBackend.getAuthorizedInquiries(currentUser),
      crmBackend.getAuthorizedQuotes(currentUser),
      crmBackend.getAuthorizedNotifications(currentUser),
    ]);
    setContacts(c);
    setDeals(d);
    setActivities(a);
    setInquiries(inq);
    setQuotes(q);
    setNotifications(n);
  }, [currentUser]);

  useEffect(() => {
    loadData();
    // Subscribe to real-time events
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

  // Dashboard Stats for this Sales Rep
  const stats = useMemo(() => {
    const pipe = deals.filter((d) => d.stage !== "won" && d.stage !== "lost").reduce((s, d) => s + (Number(d.value) || 0), 0);
    const won = deals.filter((d) => d.stage === "won").reduce((s, d) => s + (Number(d.value) || 0), 0);
    const quota = currentUser?.quota || 500000;
    const quotaPercent = Math.min(100, Math.round((won / quota) * 100));
    const pendingInquiries = inquiries.filter((i) => i.status === "Open").length;
    const pendingApprovals = deals.filter((d) => d.approvalStatus === "pending_manager_approval").length;

    return {
      pipeline: pipe,
      won,
      quota,
      quotaPercent,
      pendingInquiries,
      pendingApprovals,
      dealsCount: deals.length,
      contactsCount: contacts.length,
    };
  }, [deals, contacts, inquiries, currentUser]);

  // Handlers
  const handleSaveContact = async (data) => {
    await crmBackend.saveContact(data, currentUser);
    setContactFormModal({ isOpen: false, initial: null });
    addToast(`Saved contact "${data.name}"`);
    loadData();
  };

  const handleSaveDeal = async (data) => {
    await crmBackend.saveDeal(data, currentUser);
    setDealFormModal({ isOpen: false, initial: null });
    addToast(`Saved deal "${data.title}"`);
    loadData();
  };

  const handleUpdateDealStage = async (id, stage) => {
    await crmBackend.updateDealStage(id, stage, currentUser);
    addToast(`Updated deal stage to ${stage}`);
    loadData();
  };

  const handleSaveActivity = async (data) => {
    await crmBackend.saveActivity(data, currentUser);
    setActivityFormModal({ isOpen: false, initial: null });
    addToast(`Logged activity "${data.title}"`);
    loadData();
  };

  const handleToggleActivity = async (id) => {
    await crmBackend.toggleActivityCompleted(id, currentUser);
    loadData();
  };

  const handleReplyInquiry = async () => {
    if (!replyModal.inquiry || !replyModal.text.trim()) return;
    await crmBackend.replyToCustomerInquiry(replyModal.inquiry.id, replyModal.text.trim(), currentUser);
    addToast("Reply sent to customer portal!");
    setReplyModal({ isOpen: false, inquiry: null, text: "" });
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
        onAddContact={() => setContactFormModal({ isOpen: true, initial: null })}
        onAddDeal={() => setDealFormModal({ isOpen: true, initial: null, defaultStage: "lead" })}
        onAddActivity={() => setActivityFormModal({ isOpen: true, initial: null })}
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
              Sales Rep Workspace
            </div>

            {[
              { id: "dashboard", label: "My Dashboard", icon: LayoutGrid },
              { id: "contacts", label: "My Leads & Contacts", icon: Users, count: contacts.length },
              { id: "deals", label: "My Deals Pipeline", icon: Wallet, count: deals.length },
              { id: "activities", label: "My Tasks & Calls", icon: Calendar, count: activities.filter((a) => !a.completed).length },
              { id: "inquiries", label: "Customer Inquiries", icon: MessageSquare, count: stats.pendingInquiries, alert: stats.pendingInquiries > 0 },
              { id: "quotes", label: "Quotes & Proposals", icon: FileText, count: quotes.length },
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
              <span className="font-semibold text-[11px]">Quota Attainment</span>
              <span className="font-mono font-bold" style={{ color: "var(--accent)" }}>{stats.quotaPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-3 overflow-hidden">
              <div
                className="h-full rounded-full bg-amber-400 transition-all duration-500"
                style={{ width: `${stats.quotaPercent}%` }}
              />
            </div>
            <div className="text-[10px] text-text-dim flex justify-between">
              <span>Won: {currency(stats.won, "USD")}</span>
              <span>Target: {currency(stats.quota, "USD")}</span>
            </div>
          </div>
        </aside>

        {/* Content View */}
        <main className="flex-1 p-6 overflow-y-auto scrollbar-ledger max-h-[calc(100vh-80px)]">
          {view === "dashboard" && (
            <div className="space-y-6">
              {/* Sales Rep KPI Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-surface border border-border">
                  <div className="text-xs uppercase tracking-wider font-semibold text-text-muted">My Active Pipeline</div>
                  <div className="text-2xl mt-1 ledger-mono font-bold" style={{ color: "var(--accent)" }}>
                    {currency(stats.pipeline, "USD")}
                  </div>
                  <div className="text-[11px] text-text-muted mt-1">{deals.length} active opportunities</div>
                </div>

                <div className="p-4 rounded-xl bg-surface border border-border">
                  <div className="text-xs uppercase tracking-wider font-semibold text-text-muted">Closed Won Commissions</div>
                  <div className="text-2xl mt-1 ledger-mono font-bold text-emerald-400">
                    {currency(stats.won, "USD")}
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1">Recognized revenue</div>
                </div>

                <div className="p-4 rounded-xl bg-surface border border-border">
                  <div className="text-xs uppercase tracking-wider font-semibold text-text-muted">Assigned Accounts</div>
                  <div className="text-2xl mt-1 ledger-display font-bold text-text">
                    {contacts.length}
                  </div>
                  <div className="text-[11px] text-text-muted mt-1">Direct prospect accounts</div>
                </div>

                <div className="p-4 rounded-xl bg-surface border border-border">
                  <div className="text-xs uppercase tracking-wider font-semibold text-text-muted">Customer Inquiries</div>
                  <div className="text-2xl mt-1 ledger-display font-bold text-sky-400">
                    {stats.pendingInquiries}
                  </div>
                  <div className="text-[11px] text-sky-400 mt-1">Awaiting your response</div>
                </div>
              </div>

              {/* Action Banner for Manager Approvals */}
              {stats.pendingApprovals > 0 && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock size={20} className="text-amber-400 shrink-0" />
                    <div>
                      <div className="font-semibold text-xs text-text">
                        {stats.pendingApprovals} High-Value Deal(s) Pending Manager Approval
                      </div>
                      <div className="text-[11px] text-text-muted">
                        Elena Vance (Sales Manager) has been notified and is reviewing discount terms.
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setView("deals")}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-400 text-black"
                  >
                    View Deals
                  </button>
                </div>
              )}

              {/* Today's Tasks & Inquiries split */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Inquiries */}
                <div className="p-5 rounded-xl bg-surface border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="ledger-display text-sm font-semibold uppercase tracking-wider text-text-muted">
                      Direct Customer Messages
                    </h3>
                    <button onClick={() => setView("inquiries")} className="text-xs text-amber-400 hover:underline">
                      View All
                    </button>
                  </div>

                  {inquiries.length === 0 ? (
                    <div className="py-6 text-center text-xs text-text-muted">No open customer inquiries.</div>
                  ) : (
                    <div className="space-y-2">
                      {inquiries.slice(0, 3).map((inq) => (
                        <div key={inq.id} className="p-3 rounded-lg bg-surface-2 border border-border text-xs">
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-semibold text-text">{inq.subject}</span>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                                inq.status === "Open" ? "bg-amber-400/20 text-amber-400 border border-amber-400/40" : "bg-emerald-400/20 text-emerald-400"
                              }`}
                            >
                              {inq.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-text-muted mt-1 line-clamp-2">{inq.message}</p>
                          <div className="mt-2 pt-2 border-t border-border/40 flex items-center justify-between">
                            <span className="text-[10px] text-text-dim">From {inq.customerName} ({inq.customerCompany})</span>
                            <button
                              onClick={() => setReplyModal({ isOpen: true, inquiry: inq, text: "" })}
                              className="px-2 py-1 rounded text-[11px] bg-accent text-black font-semibold flex items-center gap-1"
                            >
                              <Send size={10} /> Reply
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* My Assigned Activities */}
                <div className="p-5 rounded-xl bg-surface border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="ledger-display text-sm font-semibold uppercase tracking-wider text-text-muted">
                      My Scheduled Tasks & Calls
                    </h3>
                    <button onClick={() => setView("activities")} className="text-xs text-amber-400 hover:underline">
                      Activity Manager
                    </button>
                  </div>

                  <div className="space-y-2">
                    {activities.slice(0, 4).map((a) => (
                      <div key={a.id} className="p-3 rounded-lg bg-surface-2 border border-border flex items-start gap-3 text-xs">
                        <input
                          type="checkbox"
                          checked={a.completed}
                          onChange={() => handleToggleActivity(a.id)}
                          className="mt-0.5 w-4 h-4 rounded accent-amber-500 cursor-pointer"
                        />
                        <div className="flex-1 min-w-0">
                          <div className={`font-semibold ${a.completed ? "line-through opacity-60" : "text-text"}`}>
                            {a.title}
                          </div>
                          <div className="text-[10px] text-text-dim mt-0.5">
                            Due: {formatDate(a.dueDate)} · Type: {a.type}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {view === "contacts" && (
            <ContactsView
              contacts={contacts}
              deals={deals}
              currencyCode="USD"
              onOpenAdd={() => setContactFormModal({ isOpen: true, initial: null })}
              onOpenEdit={(contact) => setContactFormModal({ isOpen: true, initial: contact })}
              onSelectContact={(c) => setContactDetail(c)}
              onOpenAddDealForContact={(cid) =>
                setDealFormModal({ isOpen: true, initial: null, defaultStage: "lead", preselectedContactId: cid })
              }
              onDelete={async (id) => {
                const updated = contacts.filter((c) => c.id !== id);
                setContacts(updated);
                addToast("Contact deleted");
              }}
              onBatchDelete={() => {}}
              onBatchExportCSV={() => {}}
            />
          )}

          {view === "deals" && (
            <DealsView
              deals={deals}
              contacts={contacts}
              currencyCode="USD"
              activeStageFilter="all"
              onSelectStageFilter={() => {}}
              onOpenAdd={(stage) => setDealFormModal({ isOpen: true, initial: null, defaultStage: stage || "lead" })}
              onOpenEdit={(deal) => setDealFormModal({ isOpen: true, initial: deal })}
              onUpdateStage={handleUpdateDealStage}
              onDelete={async (id) => {
                const updated = deals.filter((d) => d.id !== id);
                setDeals(updated);
                addToast("Deal deleted");
              }}
              onSelectContact={(c) => setContactDetail(c)}
            />
          )}

          {view === "activities" && (
            <ActivitiesView
              activities={activities}
              contacts={contacts}
              deals={deals}
              onOpenAddActivity={(prefill) => setActivityFormModal({ isOpen: true, initial: prefill || null })}
              onOpenEditActivity={(act) => setActivityFormModal({ isOpen: true, initial: act })}
              onToggleCompleted={handleToggleActivity}
              onDeleteActivity={async (id) => {
                setActivities(activities.filter((a) => a.id !== id));
                addToast("Activity removed");
              }}
              onSelectContact={(c) => setContactDetail(c)}
            />
          )}

          {view === "inquiries" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <h2 className="ledger-display text-lg font-bold">Assigned Customer Inquiries</h2>
                  <p className="text-xs text-text-muted">Questions and requests sent directly by your assigned client accounts.</p>
                </div>
              </div>

              <div className="space-y-3">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="p-4 rounded-xl bg-surface border border-border space-y-3">
                    <div className="flex items-start justify-between gap-4">
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
                        <div className="text-xs text-text-muted mt-0.5">
                          From: <strong>{inq.customerName}</strong> ({inq.customerCompany}) · {formatDate(inq.createdAt)}
                        </div>
                      </div>

                      <button
                        onClick={() => setReplyModal({ isOpen: true, inquiry: inq, text: inq.replyMessage || "" })}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-accent text-black flex items-center gap-1.5"
                      >
                        <Send size={12} /> {inq.replyMessage ? "Edit Reply" : "Reply to Customer"}
                      </button>
                    </div>

                    <p className="text-xs p-3 rounded-lg bg-surface-2 border border-border text-text leading-relaxed">
                      "{inq.message}"
                    </p>

                    {inq.replyMessage && (
                      <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs">
                        <div className="font-semibold text-emerald-400 mb-1">Your Sent Reply:</div>
                        <p className="text-text-muted">"{inq.replyMessage}"</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {view === "quotes" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <h2 className="ledger-display text-lg font-bold">Commercial Quotes & Proposals</h2>
                  <p className="text-xs text-text-muted">Formal commercial pricing proposals generated for your deals.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quotes.map((q) => (
                  <div key={q.id} className="p-4 rounded-xl bg-surface border border-border space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-mono text-xs text-amber-400 font-bold">{q.quoteNumber}</span>
                        <div className="text-lg font-bold ledger-mono text-text mt-0.5">
                          {currency(q.amount, "USD")}
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-surface-2 border border-border text-text-muted">
                        {q.status}
                      </span>
                    </div>
                    <div className="text-xs text-text-muted">{q.terms}</div>
                    <div className="text-[10px] text-text-dim flex justify-between pt-2 border-t border-border/40">
                      <span>Valid until: {q.validUntil}</span>
                      <span>Created: {formatDate(q.createdAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Reply Modal */}
      {replyModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-backdrop">
          <div className="w-full max-w-lg rounded-xl p-6 bg-surface border border-border shadow-2xl modal-content space-y-4">
            <h3 className="ledger-display text-sm font-bold">
              Reply to {replyModal.inquiry?.customerName} ({replyModal.inquiry?.customerCompany})
            </h3>
            <div className="p-3 rounded-lg bg-surface-2 text-xs text-text-muted">
              <strong>Inquiry:</strong> "{replyModal.inquiry?.message}"
            </div>
            <textarea
              className="ledger-input w-full rounded-lg p-3 text-xs resize-none"
              rows={4}
              placeholder="Type your official response to the customer…"
              value={replyModal.text}
              onChange={(e) => setReplyModal({ ...replyModal, text: e.target.value })}
              autoFocus
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setReplyModal({ isOpen: false, inquiry: null, text: "" })}
                className="px-3 py-1.5 rounded text-xs text-text-muted"
              >
                Cancel
              </button>
              <button
                onClick={handleReplyInquiry}
                className="px-4 py-1.5 rounded text-xs font-semibold bg-accent text-black flex items-center gap-1"
              >
                <Send size={12} /> Send Response
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail, Form & Notification Modals */}
      {contactDetail && (
        <ContactDetailModal
          contact={contactDetail}
          deals={deals}
          activities={activities}
          currencyCode="USD"
          onClose={() => setContactDetail(null)}
          onEditContact={(c) => {
            setContactDetail(null);
            setContactFormModal({ isOpen: true, initial: c });
          }}
          onDeleteContact={() => {}}
          onAddDealForContact={(cid) =>
            setDealFormModal({ isOpen: true, initial: null, defaultStage: "lead", preselectedContactId: cid })
          }
          onAddActivityForContact={(cid) =>
            setActivityFormModal({ isOpen: true, initial: null, preselectedContactId: cid })
          }
          onUpdateDealStage={handleUpdateDealStage}
          onToggleActivityCompleted={handleToggleActivity}
        />
      )}

      {contactFormModal.isOpen && (
        <ContactForm
          initial={contactFormModal.initial}
          onCancel={() => setContactFormModal({ isOpen: false, initial: null })}
          onSave={handleSaveContact}
        />
      )}

      {dealFormModal.isOpen && (
        <DealForm
          initial={
            dealFormModal.initial || {
              stage: dealFormModal.defaultStage || "lead",
              contactId: dealFormModal.preselectedContactId || (contacts[0]?.id || ""),
            }
          }
          contacts={contacts}
          onCancel={() => setDealFormModal({ isOpen: false, initial: null })}
          onSave={handleSaveDeal}
          onQuickAddContact={() => setContactFormModal({ isOpen: true, initial: null })}
        />
      )}

      {activityFormModal.isOpen && (
        <ActivityForm
          initial={activityFormModal.initial}
          contacts={contacts}
          deals={deals}
          preselectedContactId={activityFormModal.preselectedContactId}
          preselectedDealId={activityFormModal.preselectedDealId}
          onCancel={() => setActivityFormModal({ isOpen: false, initial: null })}
          onSave={handleSaveActivity}
        />
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
        onSelectContact={(c) => setContactDetail(c)}
        onSelectDeal={() => setView("deals")}
        onNavigateTab={(tab) => setView(tab)}
      />

      <Toast toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </div>
  );
}
