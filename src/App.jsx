import React, { useState, useEffect } from "react";
import { Users, Wallet, LayoutGrid, Database } from "lucide-react";
import DashboardView from "./components/DashboardView.jsx";
import ContactsView from "./components/ContactsView.jsx";
import DealsView from "./components/DealsView.jsx";
import DataView from "./components/DataView.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import { getJSON, setJSON } from "./storage.js";
import { uid } from "./utils.js";

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { id: "contacts", label: "Contacts", icon: Users },
  { id: "deals", label: "Deals", icon: Wallet },
  { id: "data", label: "Data", icon: Database },
];

function App() {
  const [contacts, setContacts] = useState([]);
  const [deals, setDeals] = useState([]);
  const [view, setView] = useState("dashboard");
  const [loaded, setLoaded] = useState(false);
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [c, d] = await Promise.all([getJSON("contacts", []), getJSON("deals", [])]);
        setContacts(c);
        setDeals(d);
      } catch {
        setStorageError(true);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const persistContacts = async (next) => {
    setContacts(next);
    try {
      await setJSON("contacts", next);
    } catch {
      setStorageError(true);
    }
  };

  const persistDeals = async (next) => {
    setDeals(next);
    try {
      await setJSON("deals", next);
    } catch {
      setStorageError(true);
    }
  };

  const addContact = (data) => persistContacts([{ ...data, id: uid(), createdAt: Date.now() }, ...contacts]);
  const updateContact = (id, data) => persistContacts(contacts.map((c) => (c.id === id ? { ...c, ...data } : c)));
  const deleteContact = (id) => {
    persistContacts(contacts.filter((c) => c.id !== id));
    persistDeals(deals.map((d) => (d.contactId === id ? { ...d, contactId: "" } : d)));
  };

  const addDeal = (data) => persistDeals([{ ...data, id: uid(), createdAt: Date.now() }, ...deals]);
  const updateDeal = (id, data) => persistDeals(deals.map((d) => (d.id === id ? { ...d, ...data } : d)));
  const deleteDeal = (id) => persistDeals(deals.filter((d) => d.id !== id));

  // Imported rows are merged in: existing records with a matching id are
  // replaced, new ids are appended. This lets a CSV round-trip (export,
  // edit, re-import) update existing data instead of duplicating it.
  const importContacts = (rows) => {
    const byId = new Map(contacts.map((c) => [c.id, c]));
    rows.forEach((row) => byId.set(row.id, { ...byId.get(row.id), ...row, id: row.id }));
    persistContacts(Array.from(byId.values()));
  };

  const importDeals = (rows) => {
    const byId = new Map(deals.map((d) => [d.id, d]));
    rows.forEach((row) => byId.set(row.id, { ...byId.get(row.id), ...row, id: row.id }));
    persistDeals(Array.from(byId.values()));
  };

  const clearAllData = () => {
    persistContacts([]);
    persistDeals([]);
  };

  if (!loaded) {
    return (
      <div className="ledger-root min-h-[500px] flex items-center justify-center">
        <span className="ledger-display text-sm" style={{ color: "var(--text-muted)" }}>
          Opening the ledger…
        </span>
      </div>
    );
  }

  return (
    <div className="ledger-root min-h-[600px] flex rounded-xl overflow-hidden" style={{ border: "1px solid #3A4239" }}>
      <div className="flex flex-col shrink-0" style={{ background: "var(--surface)", borderRight: "1px solid var(--border)" }}>
        <div className="px-2 py-4 flex flex-col items-center gap-1">
          <div className="ledger-display text-lg mb-3" style={{ color: "var(--accent)" }}>
            §
          </div>
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = view === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setView(t.id)}
                className="tab-btn flex flex-col items-center gap-2 px-2 py-4 rounded text-xs font-medium"
                style={{ background: active ? "var(--accent)" : "transparent", color: active ? "#1B1F1D" : "var(--text-muted)" }}
              >
                <Icon size={13} style={{ transform: "rotate(90deg)" }} />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="px-6 pt-6 pb-4" style={{ borderBottom: "1px solid var(--border)" }}>
          <h1 className="ledger-display text-2xl">Ledger CRM</h1>
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            Contacts and deals, kept in one book.
          </p>
          {storageError && (
            <p className="text-xs mt-2" style={{ color: "var(--negative)" }}>
              Changes couldn't be saved to storage — they'll last for this session only.
            </p>
          )}
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-ledger p-6">
          {view === "dashboard" && <DashboardView contacts={contacts} deals={deals} />}
          {view === "contacts" && (
            <ContactsView contacts={contacts} deals={deals} onAdd={addContact} onUpdate={updateContact} onDelete={deleteContact} />
          )}
          {view === "deals" && <DealsView contacts={contacts} deals={deals} onAdd={addDeal} onUpdate={updateDeal} onDelete={deleteDeal} />}
          {view === "data" && (
            <DataView
              contacts={contacts}
              deals={deals}
              onImportContacts={importContacts}
              onImportDeals={importDeals}
              onClearAll={clearAllData}
            />
          )}
        </div>
      </div>
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
