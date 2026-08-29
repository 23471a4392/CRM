import React, { useRef, useState } from "react";
import { Download, Upload, Trash2, AlertTriangle } from "lucide-react";
import { contactsToCSV, dealsToCSV, csvToContacts, csvToDeals, downloadTextFile } from "../csv.js";
import { uid } from "../utils.js";

export default function DataView({ contacts, deals, onImportContacts, onImportDeals, onClearAll }) {
  const contactFileRef = useRef(null);
  const dealFileRef = useRef(null);
  const [message, setMessage] = useState(null);
  const [confirmingClear, setConfirmingClear] = useState(false);

  const exportContacts = () => {
    downloadTextFile("contacts.csv", contactsToCSV(contacts));
    setMessage(`Exported ${contacts.length} contact(s).`);
  };

  const exportDeals = () => {
    downloadTextFile("deals.csv", dealsToCSV(deals));
    setMessage(`Exported ${deals.length} deal(s).`);
  };

  const handleContactFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const imported = csvToContacts(text).map((c) => ({ ...c, id: c.id || uid(), createdAt: Date.now() }));
    onImportContacts(imported);
    setMessage(`Imported ${imported.length} contact(s) from ${file.name}.`);
    e.target.value = "";
  };

  const handleDealFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const imported = csvToDeals(text).map((d) => ({ ...d, id: d.id || uid(), createdAt: Date.now() }));
    onImportDeals(imported);
    setMessage(`Imported ${imported.length} deal(s) from ${file.name}.`);
    e.target.value = "";
  };

  return (
    <div className="space-y-6">
      {message && (
        <div className="text-sm rounded-lg px-4 py-2" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>
          {message}
        </div>
      )}

      <div className="rounded-lg p-5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <h3 className="ledger-display text-sm uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
          Contacts
        </h3>
        <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
          {contacts.length} contact(s) currently stored.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={exportContacts}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium"
            style={{ background: "var(--accent)", color: "#1B1F1D" }}
          >
            <Download size={14} /> Export CSV
          </button>
          <button
            onClick={() => contactFileRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm"
            style={{ border: "1px solid var(--border)", color: "var(--text)" }}
          >
            <Upload size={14} /> Import CSV
          </button>
          <input ref={contactFileRef} type="file" accept=".csv,text/csv" onChange={handleContactFile} className="hidden" />
        </div>
      </div>

      <div className="rounded-lg p-5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <h3 className="ledger-display text-sm uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
          Deals
        </h3>
        <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
          {deals.length} deal(s) currently stored.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={exportDeals}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium"
            style={{ background: "var(--accent)", color: "#1B1F1D" }}
          >
            <Download size={14} /> Export CSV
          </button>
          <button
            onClick={() => dealFileRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm"
            style={{ border: "1px solid var(--border)", color: "var(--text)" }}
          >
            <Upload size={14} /> Import CSV
          </button>
          <input ref={dealFileRef} type="file" accept=".csv,text/csv" onChange={handleDealFile} className="hidden" />
        </div>
      </div>

      <div className="rounded-lg p-5" style={{ background: "var(--surface)", border: `1px solid var(--negative)` }}>
        <h3 className="ledger-display text-sm uppercase tracking-wider mb-1 flex items-center gap-2" style={{ color: "var(--negative)" }}>
          <AlertTriangle size={14} /> Danger zone
        </h3>
        <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
          Permanently erase all contacts and deals stored in this browser. Export a backup first if you might want this
          data later.
        </p>
        {!confirmingClear ? (
          <button
            onClick={() => setConfirmingClear(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm"
            style={{ border: "1px solid var(--negative)", color: "var(--negative)" }}
          >
            <Trash2 size={14} /> Clear all data
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: "var(--negative)" }}>
              Are you sure? This can't be undone.
            </span>
            <button
              onClick={() => {
                onClearAll();
                setConfirmingClear(false);
                setMessage("All data cleared.");
              }}
              className="px-3 py-1.5 rounded text-sm font-medium"
              style={{ background: "var(--negative)", color: "#1B1F1D" }}
            >
              Yes, clear everything
            </button>
            <button onClick={() => setConfirmingClear(false)} className="px-3 py-1.5 rounded text-sm" style={{ color: "var(--text-muted)" }}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
