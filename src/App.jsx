import React, { useState, useEffect, useCallback } from "react";
import {
  LayoutGrid,
  Users,
  Wallet,
  Calendar,
  BarChart3,
  Database,
  Search,
  Plus,
  Settings as SettingsIcon,
  ChevronRight,
} from "lucide-react";

import Header from "./components/Header.jsx";
import DashboardView from "./components/DashboardView.jsx";
import ContactsView from "./components/ContactsView.jsx";
import DealsView from "./components/DealsView.jsx";
import ActivitiesView from "./components/ActivitiesView.jsx";
import ReportsView from "./components/ReportsView.jsx";
import DataView from "./components/DataView.jsx";
import ContactDetailModal from "./components/ContactDetailModal.jsx";
import ContactForm from "./components/ContactForm.jsx";
import DealForm from "./components/DealForm.jsx";
import ActivityForm from "./components/ActivityForm.jsx";
import DeleteConfirmModal from "./components/DeleteConfirmModal.jsx";
import SpotlightModal from "./components/SpotlightModal.jsx";
import SettingsModal from "./components/SettingsModal.jsx";
import NotificationDrawer from "./components/NotificationDrawer.jsx";
import Toast from "./components/Toast.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

import { getJSON, setJSON } from "./storage.js";
import { uid } from "./utils.js";
import { contactsToCSV, dealsToCSV, downloadTextFile } from "./csv.js";
import { SEED_CONTACTS } from "./data/seedContacts.js";
import { SEED_DEALS } from "./data/seedDeals.js";
import { SEED_ACTIVITIES } from "./data/seedActivities.js";

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { id: "contacts", label: "Contacts", icon: Users },
  { id: "deals", label: "Deals", icon: Wallet },
  { id: "activities", label: "Activities", icon: Calendar },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "data", label: "Data & Backup", icon: Database },
];

function normalizeSeedData() {
  const contacts = SEED_CONTACTS.slice(0, 24).map((c) => ({
    ...c,
    title: c.title || "Executive",
    tags: c.tags && c.tags.length > 0 ? c.tags : ["Warm", "Inbound"],
  }));

  const deals = SEED_DEALS.slice(0, 30).map((d) => ({
    ...d,
    stage: d.stage === "negotiation" ? "negotiation" : d.stage,
    value: Number(d.value) || 10000,
    expectedClose: d.expectedClose || d.closeDate || "2025-11-30",
  }));

  const activities = SEED_ACTIVITIES.slice(0, 16).map((a) => ({
    id: a.id || uid(),
    contactId: a.contactId || "c_0001",
    dealId: a.dealId || "d_0001",
    type: a.type || "call",
    title: a.subject || "Client catch-up call",
    description: a.notes || "Discussed project scope and timelines.",
    dueDate: (a.at || new Date().toISOString()).split("T")[0],
    completed: Boolean(a.completed),
    createdAt: Date.now(),
  }));

  return { contacts, deals, activities };
}

function generateInitialNotifications(deals, contacts) {
  const alerts = [];
  const highValueDeals = deals.filter((d) => (d.value || 0) >= 50000 && d.stage !== "won");
  if (highValueDeals.length > 0) {
    alerts.push({
      id: "n_high_val",
      title: "High-Value Opportunities Active",
      message: `${highValueDeals.length} deals valued at $50k+ are currently in proposal/negotiation.`,
      type: "urgent",
      time: "Just now",
      read: false,
    });
  }

  alerts.push({
    id: "n_followup",
    title: "Quarterly Revenue Review",
    message: "Pipeline forecast is updated and ready for export in the Reports tab.",
    type: "info",
    time: "2 hours ago",
    read: false,
  });

  alerts.push({
    id: "n_welcome",
    title: "Ledger CRM Initialized",
    message: `${contacts.length} contacts and ${deals.length} deals loaded in client-side storage.`,
    type: "info",
    time: "1 day ago",
    read: true,
  });

  return alerts;
}

function App() {
  const [contacts, setContacts] = useState([]);
  const [deals, setDeals] = useState([]);
  const [activities, setActivities] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [settings, setSettings] = useState({
    theme: "dark",
    currency: "USD",
    userName: "Naga Phanidhar",
    userEmail: "lead@ledger-crm.app",
    userRole: "Principal Account Executive",
    organization: "Ledger Enterprise Systems",
    tableDensity: "comfortable",
  });

  const [view, setView] = useState("dashboard");
  const [dealsStageFilter, setDealsStageFilter] = useState("all");
  const [loaded, setLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Modals & Panels
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [contactDetail, setContactDetail] = useState(null);
  const [contactFormModal, setContactFormModal] = useState({ isOpen: false, initial: null });
  const [dealFormModal, setDealFormModal] = useState({ isOpen: false, initial: null, defaultStage: "lead", preselectedContactId: "" });
  const [activityFormModal, setActivityFormModal] = useState({ isOpen: false, initial: null, preselectedContactId: "", preselectedDealId: "" });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, title: "", message: "", onConfirm: null });

  // Toasts
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success", title = "") => {
    const id = uid();
    setToasts((prev) => [...prev, { id, message, type, title }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Keyboard shortcut for Cmd/Ctrl + K (Spotlight)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSpotlightOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Theme synchronization with DOM
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", settings.theme || "dark");
  }, [settings.theme]);

  // Initial Data Loading & Seeding
  useEffect(() => {
    (async () => {
      try {
        const [savedContacts, savedDeals, savedActivities, savedSettings, savedNotifs] =
          await Promise.all([
            getJSON("contacts", null),
            getJSON("deals", null),
            getJSON("activities", null),
            getJSON("settings", null),
            getJSON("notifications", null),
          ]);

        let c = savedContacts;
        let d = savedDeals;
        let a = savedActivities;

        // If fresh storage, seed with rich realistic data
        if (!c || c.length === 0) {
          const seeded = normalizeSeedData();
          c = seeded.contacts;
          d = seeded.deals;
          a = seeded.activities;
          await Promise.all([
            setJSON("contacts", c),
            setJSON("deals", d),
            setJSON("activities", a),
          ]);
        }

        setContacts(c || []);
        setDeals(d || []);
        setActivities(a || []);
        if (savedSettings) setSettings(savedSettings);

        const initialNotifs = savedNotifs || generateInitialNotifications(d || [], c || []);
        setNotifications(initialNotifs);
      } catch (err) {
        console.error("Storage load error:", err);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  // Persistence helpers
  const persistContacts = async (next) => {
    setContacts(next);
    await setJSON("contacts", next);
  };

  const persistDeals = async (next) => {
    setDeals(next);
    await setJSON("deals", next);
  };

  const persistActivities = async (next) => {
    setActivities(next);
    await setJSON("activities", next);
  };

  const persistSettings = async (next) => {
    setSettings(next);
    await setJSON("settings", next);
  };

  const persistNotifications = async (next) => {
    setNotifications(next);
    await setJSON("notifications", next);
  };

  // Contacts CRUD
  const handleSaveContact = (data) => {
    if (data.id) {
      // Update
      const updated = contacts.map((c) => (c.id === data.id ? { ...c, ...data } : c));
      persistContacts(updated);
      if (contactDetail && contactDetail.id === data.id) {
        setContactDetail({ ...contactDetail, ...data });
      }
      addToast(`Updated contact ${data.name}`);
    } else {
      // Add
      const newContact = { ...data, id: uid(), createdAt: Date.now() };
      persistContacts([newContact, ...contacts]);
      addToast(`Added contact ${data.name}`);
    }
    setContactFormModal({ isOpen: false, initial: null });
  };

  const handleDeleteContact = (id) => {
    const contact = contacts.find((c) => c.id === id);
    setDeleteModal({
      isOpen: true,
      title: "Delete Contact",
      message: `Are you sure you want to delete "${contact?.name || "this contact"}"? This will also unassign their associated deals.`,
      confirmLabel: "Delete Contact",
      onConfirm: () => {
        persistContacts(contacts.filter((c) => c.id !== id));
        persistDeals(deals.map((d) => (d.contactId === id ? { ...d, contactId: "" } : d)));
        setDeleteModal({ isOpen: false });
        if (contactDetail && contactDetail.id === id) setContactDetail(null);
        addToast(`Deleted contact ${contact?.name || ""}`, "info");
      },
    });
  };

  const handleBatchDeleteContacts = (ids) => {
    setDeleteModal({
      isOpen: true,
      title: `Delete ${ids.length} Contacts`,
      message: `Are you sure you want to delete these ${ids.length} selected contacts?`,
      confirmLabel: `Delete ${ids.length} Contacts`,
      onConfirm: () => {
        const idSet = new Set(ids);
        persistContacts(contacts.filter((c) => !idSet.has(c.id)));
        persistDeals(deals.map((d) => (idSet.has(d.contactId) ? { ...d, contactId: "" } : d)));
        setDeleteModal({ isOpen: false });
        addToast(`Deleted ${ids.length} contacts`, "info");
      },
    });
  };

  const handleBatchExportContactsCSV = (ids) => {
    const idSet = new Set(ids);
    const subset = contacts.filter((c) => idSet.has(c.id));
    downloadTextFile(
      `contacts-selected-${new Date().toISOString().split("T")[0]}.csv`,
      contactsToCSV(subset)
    );
    addToast(`Exported ${subset.length} contacts as CSV.`);
  };

  // Deals CRUD
  const handleSaveDeal = (data) => {
    if (data.id) {
      // Update
      const updated = deals.map((d) => (d.id === data.id ? { ...d, ...data } : d));
      persistDeals(updated);
      addToast(`Updated deal "${data.title}"`);
    } else {
      // Add
      const newDeal = { ...data, id: uid(), createdAt: Date.now() };
      persistDeals([newDeal, ...deals]);
      addToast(`Created deal "${data.title}" in stage ${data.stage}`);
    }
    setDealFormModal({ isOpen: false, initial: null, defaultStage: "lead", preselectedContactId: "" });
  };

  const handleUpdateDealStage = (id, newStage) => {
    const deal = deals.find((d) => d.id === id);
    const updated = deals.map((d) => (d.id === id ? { ...d, stage: newStage } : d));
    persistDeals(updated);
    addToast(`Moved "${deal?.title || "Deal"}" to ${newStage}`, "info");
  };

  const handleDeleteDeal = (id) => {
    const deal = deals.find((d) => d.id === id);
    setDeleteModal({
      isOpen: true,
      title: "Delete Deal",
      message: `Are you sure you want to delete "${deal?.title || "this deal"}"?`,
      confirmLabel: "Delete Deal",
      onConfirm: () => {
        persistDeals(deals.filter((d) => d.id !== id));
        setDeleteModal({ isOpen: false });
        addToast(`Deleted deal "${deal?.title || ""}"`, "info");
      },
    });
  };

  // Activities CRUD
  const handleSaveActivity = (data) => {
    if (data.id) {
      const updated = activities.map((a) => (a.id === data.id ? { ...a, ...data } : a));
      persistActivities(updated);
      addToast(`Updated activity "${data.title}"`);
    } else {
      const newAct = { ...data, id: uid(), createdAt: Date.now() };
      persistActivities([newAct, ...activities]);
      addToast(`Logged new activity "${data.title}"`);
    }
    setActivityFormModal({ isOpen: false, initial: null, preselectedContactId: "", preselectedDealId: "" });
  };

  const handleToggleActivityCompleted = (id) => {
    const updated = activities.map((a) =>
      a.id === id ? { ...a, completed: !a.completed } : a
    );
    persistActivities(updated);
    const item = activities.find((a) => a.id === id);
    addToast(
      item?.completed ? `Marked "${item?.title}" as pending` : `Completed "${item?.title}"!`,
      "success"
    );
  };

  const handleDeleteActivity = (id) => {
    const item = activities.find((a) => a.id === id);
    persistActivities(activities.filter((a) => a.id !== id));
    addToast(`Removed activity "${item?.title || ""}"`, "info");
  };

  // Full Database JSON Backup & Restore
  const handleExportAllJSON = () => {
    const dataSnapshot = {
      version: "2.0",
      timestamp: new Date().toISOString(),
      contacts,
      deals,
      activities,
      settings,
    };
    downloadTextFile(
      `ledger-crm-full-backup-${new Date().toISOString().split("T")[0]}.json`,
      JSON.stringify(dataSnapshot, null, 2),
      "application/json"
    );
    addToast("Full CRM JSON backup archive downloaded!");
  };

  const handleImportAllJSON = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (Array.isArray(data.contacts)) persistContacts(data.contacts);
      if (Array.isArray(data.deals)) persistDeals(data.deals);
      if (Array.isArray(data.activities)) persistActivities(data.activities);
      if (data.settings) persistSettings(data.settings);
      addToast(`Restored ${data.contacts?.length || 0} contacts and ${data.deals?.length || 0} deals from backup!`);
    } catch (err) {
      addToast(`Failed to parse backup JSON: ${err.message}`, "error");
    }
    e.target.value = "";
  };

  // Demo Data Reset / Load
  const handleLoadStandardDemo = () => {
    const seeded = normalizeSeedData();
    persistContacts(seeded.contacts);
    persistDeals(seeded.deals);
    persistActivities(seeded.activities);
    addToast("Standard demo dataset loaded (24 contacts, 30 deals)!");
  };

  const handleLoadEnterpriseDemo = () => {
    const contactsExt = SEED_CONTACTS.slice(0, 48).map((c) => ({
      ...c,
      title: c.title || "Director",
      tags: c.tags && c.tags.length > 0 ? c.tags : ["Enterprise", "VIP"],
    }));
    const dealsExt = SEED_DEALS.slice(0, 60).map((d) => ({
      ...d,
      value: Math.max(25000, Number(d.value) * 3 || 75000),
      expectedClose: d.expectedClose || "2025-12-15",
    }));
    persistContacts(contactsExt);
    persistDeals(dealsExt);
    addToast("Enterprise scale dataset loaded (48 contacts, 60 high-value deals)!");
  };

  const handleClearAllData = () => {
    setDeleteModal({
      isOpen: true,
      title: "Clear All CRM Data",
      message: "Are you sure you want to completely erase all contacts, deals, activities, and notifications from storage?",
      confirmLabel: "Yes, Erase Everything",
      onConfirm: () => {
        persistContacts([]);
        persistDeals([]);
        persistActivities([]);
        persistNotifications([]);
        setDeleteModal({ isOpen: false });
        addToast("All CRM data erased.", "info");
      },
    });
  };

  // Theme Toggle
  const handleToggleTheme = () => {
    const themes = ["dark", "parchment", "light"];
    const nextIdx = (themes.indexOf(settings.theme || "dark") + 1) % themes.length;
    const nextTheme = themes[nextIdx];
    persistSettings({ ...settings, theme: nextTheme });
    addToast(`Switched theme to ${nextTheme === "dark" ? "Dark Slate" : nextTheme === "parchment" ? "Antique Ledger" : "Clean Modern"}`);
  };

  // Notification actions
  const handleMarkNotifRead = (id) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    persistNotifications(updated);
  };

  const handleMarkAllNotifsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    persistNotifications(updated);
    addToast("All notifications marked as read.");
  };

  const handleClearAllNotifs = () => {
    persistNotifications([]);
    addToast("Cleared notification drawer.");
  };

  if (!loaded) {
    return (
      <div className="ledger-root min-h-screen flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-serif text-xl font-bold bg-accent text-[#1B1F1D] animate-pulse">
            §
          </div>
          <span className="ledger-display text-sm font-medium" style={{ color: "var(--text-muted)" }}>
            Opening the financial ledger…
          </span>
        </div>
      </div>
    );
  }

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="ledger-root min-h-screen flex flex-col font-sans">
      {/* Top Main Navigation Header */}
      <Header
        settings={settings}
        onOpenSpotlight={() => setSpotlightOpen(true)}
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenNotifications={() => setNotificationsOpen(true)}
        unreadNotificationsCount={unreadNotifsCount}
        onAddContact={() => setContactFormModal({ isOpen: true, initial: null })}
        onAddDeal={() => setDealFormModal({ isOpen: true, initial: null, defaultStage: "lead" })}
        onAddActivity={() => setActivityFormModal({ isOpen: true, initial: null })}
        onToggleTheme={handleToggleTheme}
        onLoadSampleData={handleLoadStandardDemo}
        onExportAllJSON={handleExportAllJSON}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex min-w-0 relative">
        {/* Sidebar Navigation */}
        <aside
          className={`
            fixed lg:static top-[57px] bottom-0 left-0 z-40 w-52 flex flex-col justify-between p-3 transition-transform duration-200 ease-in-out
            ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
          style={{
            background: "var(--surface)",
            borderRight: "1px solid var(--border)",
          }}
        >
          {/* Navigation Links */}
          <div className="space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-text-dim">
              Workspace Navigation
            </div>
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = view === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setView(t.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition tab-btn"
                  style={{
                    background: active ? "var(--accent)" : "transparent",
                    color: active ? "#1B1F1D" : "var(--text-muted)",
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} />
                    <span>{t.label}</span>
                  </div>
                  {t.id === "contacts" && (
                    <span
                      className="text-[10px] px-1.5 py-0.2 rounded-full font-mono"
                      style={{
                        background: active ? "#1B1F1D22" : "var(--surface-2)",
                        color: active ? "#1B1F1D" : "var(--text-dim)",
                      }}
                    >
                      {contacts.length}
                    </span>
                  )}
                  {t.id === "deals" && (
                    <span
                      className="text-[10px] px-1.5 py-0.2 rounded-full font-mono"
                      style={{
                        background: active ? "#1B1F1D22" : "var(--surface-2)",
                        color: active ? "#1B1F1D" : "var(--text-dim)",
                      }}
                    >
                      {deals.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sidebar Footer Controls */}
          <div className="pt-3 border-t border-border/40 space-y-1">
            <button
              onClick={() => {
                setSettingsOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition hover:bg-surface-2"
              style={{ color: "var(--text-muted)" }}
            >
              <SettingsIcon size={15} />
              <span>Workspace Settings</span>
            </button>
          </div>
        </aside>

        {/* Backdrop for mobile drawer */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Content View Container */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto scrollbar-ledger max-h-[calc(100vh-57px)]">
          {view === "dashboard" && (
            <DashboardView
              contacts={contacts}
              deals={deals}
              activities={activities}
              currencyCode={settings.currency || "USD"}
              onNavigateTab={(tab) => setView(tab)}
              onFilterDealsByStage={(stage) => {
                setDealsStageFilter(stage);
                setView("deals");
              }}
              onOpenAddContact={() => setContactFormModal({ isOpen: true, initial: null })}
              onOpenAddDeal={(stage) => setDealFormModal({ isOpen: true, initial: null, defaultStage: stage || "lead" })}
              onSelectContact={(contact) => setContactDetail(contact)}
              onToggleActivityCompleted={handleToggleActivityCompleted}
              onLoadSampleData={handleLoadStandardDemo}
              onExportCSV={() => {
                downloadTextFile(`contacts-${Date.now()}.csv`, contactsToCSV(contacts));
                addToast("Exported Contacts CSV!");
              }}
            />
          )}

          {view === "contacts" && (
            <ContactsView
              contacts={contacts}
              deals={deals}
              currencyCode={settings.currency || "USD"}
              onOpenAdd={() => setContactFormModal({ isOpen: true, initial: null })}
              onOpenEdit={(contact) => setContactFormModal({ isOpen: true, initial: contact })}
              onSelectContact={(contact) => setContactDetail(contact)}
              onOpenAddDealForContact={(contactId) =>
                setDealFormModal({ isOpen: true, initial: null, defaultStage: "lead", preselectedContactId: contactId })
              }
              onDelete={handleDeleteContact}
              onBatchDelete={handleBatchDeleteContacts}
              onBatchExportCSV={handleBatchExportContactsCSV}
            />
          )}

          {view === "deals" && (
            <DealsView
              deals={deals}
              contacts={contacts}
              currencyCode={settings.currency || "USD"}
              activeStageFilter={dealsStageFilter}
              onSelectStageFilter={setDealsStageFilter}
              onOpenAdd={(stage) =>
                setDealFormModal({ isOpen: true, initial: null, defaultStage: stage || "lead" })
              }
              onOpenEdit={(deal) => setDealFormModal({ isOpen: true, initial: deal })}
              onUpdateStage={handleUpdateDealStage}
              onDelete={handleDeleteDeal}
              onSelectContact={(contact) => setContactDetail(contact)}
            />
          )}

          {view === "activities" && (
            <ActivitiesView
              activities={activities}
              contacts={contacts}
              deals={deals}
              onOpenAddActivity={() => setActivityFormModal({ isOpen: true, initial: null })}
              onOpenEditActivity={(act) => setActivityFormModal({ isOpen: true, initial: act })}
              onToggleCompleted={handleToggleActivityCompleted}
              onDeleteActivity={handleDeleteActivity}
              onSelectContact={(contact) => setContactDetail(contact)}
            />
          )}

          {view === "reports" && (
            <ReportsView
              contacts={contacts}
              deals={deals}
              currencyCode={settings.currency || "USD"}
            />
          )}

          {view === "data" && (
            <DataView
              contacts={contacts}
              deals={deals}
              onImportContacts={(imported) => {
                persistContacts(imported);
                addToast(`Imported ${imported.length} contacts.`);
              }}
              onImportDeals={(imported) => {
                persistDeals(imported);
                addToast(`Imported ${imported.length} deals.`);
              }}
              onExportAllJSON={handleExportAllJSON}
              onImportAllJSON={handleImportAllJSON}
              onLoadStandardDemo={handleLoadStandardDemo}
              onLoadEnterpriseDemo={handleLoadEnterpriseDemo}
              onClearAll={handleClearAllData}
            />
          )}
        </main>
      </div>

      {/* Global Interactive Modals */}

      {/* Contact Dossier Detail Modal */}
      {contactDetail && (
        <ContactDetailModal
          contact={contactDetail}
          deals={deals}
          activities={activities}
          currencyCode={settings.currency || "USD"}
          onClose={() => setContactDetail(null)}
          onEditContact={(c) => {
            setContactDetail(null);
            setContactFormModal({ isOpen: true, initial: c });
          }}
          onDeleteContact={(id) => {
            handleDeleteContact(id);
          }}
          onAddDealForContact={(cId) => {
            setDealFormModal({
              isOpen: true,
              initial: null,
              defaultStage: "lead",
              preselectedContactId: cId,
            });
          }}
          onAddActivityForContact={(cId) => {
            setActivityFormModal({
              isOpen: true,
              initial: null,
              preselectedContactId: cId,
            });
          }}
          onUpdateDealStage={handleUpdateDealStage}
          onToggleActivityCompleted={handleToggleActivityCompleted}
        />
      )}

      {/* Contact Form Modal (Add / Edit) */}
      {contactFormModal.isOpen && (
        <ContactForm
          initial={contactFormModal.initial}
          onCancel={() => setContactFormModal({ isOpen: false, initial: null })}
          onSave={handleSaveContact}
        />
      )}

      {/* Deal Form Modal (Add / Edit) */}
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
          onQuickAddContact={() => {
            setContactFormModal({ isOpen: true, initial: null });
          }}
        />
      )}

      {/* Activity Form Modal (Log / Edit) */}
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

      {/* Spotlight Global Search Palette Modal */}
      <SpotlightModal
        isOpen={spotlightOpen}
        onClose={() => setSpotlightOpen(false)}
        contacts={contacts}
        deals={deals}
        activities={activities}
        onSelectContact={(contact) => setContactDetail(contact)}
        onSelectDeal={(deal) => {
          setDealsStageFilter(deal.stage);
          setView("deals");
        }}
        onNavigateTab={(tab) => setView(tab)}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={persistSettings}
        onLoadSampleData={handleLoadStandardDemo}
        onExportAllJSON={handleExportAllJSON}
        onImportAllJSON={handleImportAllJSON}
        onClearAllData={handleClearAllData}
        contactsCount={contacts.length}
        dealsCount={deals.length}
      />

      {/* Notification Drawer */}
      <NotificationDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkNotifRead}
        onMarkAllRead={handleMarkAllNotifsRead}
        onClearAll={handleClearAllNotifs}
        onSelectNotification={(n) => {
          setNotificationsOpen(false);
          setView("deals");
        }}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        title={deleteModal.title}
        message={deleteModal.message}
        confirmLabel={deleteModal.confirmLabel}
        onConfirm={deleteModal.onConfirm}
        onCancel={() => setDeleteModal({ isOpen: false })}
      />

      {/* Floating Action Toasts */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default function AppWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
