import React, { useRef, useState } from "react";
import {
  Download,
  Upload,
  Trash2,
  AlertTriangle,
  FileSpreadsheet,
  Database,
  RefreshCw,
  FileCode,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import {
  contactsToCSV,
  dealsToCSV,
  csvToContacts,
  csvToDeals,
  downloadTextFile,
} from "../csv.js";
import { uid } from "../utils.js";

export default function DataView({
  contacts,
  deals,
  onImportContacts,
  onImportDeals,
  onExportAllJSON,
  onImportAllJSON,
  onLoadStandardDemo,
  onLoadEnterpriseDemo,
  onClearAll,
}) {
  const contactFileRef = useRef(null);
  const dealFileRef = useRef(null);
  const jsonFileRef = useRef(null);
  const [feedback, setFeedback] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const showToast = (msg, isSuccess = true) => {
    setFeedback({ msg, isSuccess });
    setTimeout(() => setFeedback(null), 4000);
  };

  const exportContacts = () => {
    downloadTextFile(
      `contacts-${new Date().toISOString().split("T")[0]}.csv`,
      contactsToCSV(contacts)
    );
    showToast(`Exported ${contacts.length} contact records as CSV.`);
  };

  const exportDeals = () => {
    downloadTextFile(
      `deals-${new Date().toISOString().split("T")[0]}.csv`,
      dealsToCSV(deals)
    );
    showToast(`Exported ${deals.length} deal records as CSV.`);
  };

  const downloadContactTemplate = () => {
    const sample = `name,company,title,email,phone,tags,notes\nJane Doe,Acme Global,VP Product,jane@acmeweb.com,+15550198,"Enterprise,VIP",Met at annual summit\nJohn Smith,Vandelay Inc,CFO,john@vandelay.com,+15550244,Warm,Follow-up needed`;
    downloadTextFile("contacts-sample-template.csv", sample);
    showToast("Downloaded sample Contacts CSV template.");
  };

  const downloadDealTemplate = () => {
    const sample = `title,contactId,value,stage,expectedClose,notes\nAnnual Software License,c_0001,25000,proposal,2025-10-15,Includes SLA onboarding\nQ4 Expansion Pilot,,12000,contacted,2025-11-20,Needs legal review`;
    downloadTextFile("deals-sample-template.csv", sample);
    showToast("Downloaded sample Deals CSV template.");
  };

  const handleContactFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const imported = csvToContacts(text).map((c) => ({
        ...c,
        id: c.id || uid(),
        createdAt: Date.now(),
      }));
      onImportContacts(imported);
      showToast(`Successfully imported ${imported.length} contacts from ${file.name}.`);
    } catch (err) {
      showToast(`Error importing contacts: ${err.message}`, false);
    }
    e.target.value = "";
  };

  const handleDealFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const imported = csvToDeals(text).map((d) => ({
        ...d,
        id: d.id || uid(),
        createdAt: Date.now(),
      }));
      onImportDeals(imported);
      showToast(`Successfully imported ${imported.length} deals from ${file.name}.`);
    } catch (err) {
      showToast(`Error importing deals: ${err.message}`, false);
    }
    e.target.value = "";
  };

  return (
    <div className="space-y-6">
      {feedback && (
        <div
          className="text-xs rounded-xl px-4 py-3 flex items-center gap-2 modal-content shadow-md"
          style={{
            background: feedback.isSuccess ? "var(--positive-soft)" : "var(--negative-soft)",
            border: `1px solid ${feedback.isSuccess ? "var(--positive)" : "var(--negative)"}`,
            color: feedback.isSuccess ? "var(--positive)" : "var(--negative)",
          }}
        >
          <CheckCircle2 size={15} />
          <span>{feedback.msg}</span>
        </div>
      )}

      {/* Header Info */}
      <div
        className="p-5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <div>
          <h2 className="ledger-display text-lg font-bold">Data Management & Ledger Archive</h2>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            Import/export standard RFC-4180 CSV tables or full JSON database backups.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onExportAllJSON}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{ background: "var(--accent)", color: "#1B1F1D" }}
          >
            <Download size={13} /> Full JSON Backup
          </button>
        </div>
      </div>

      {/* Grid: Contacts & Deals CSV Management */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contacts CSV Card */}
        <div
          className="rounded-xl p-5 shadow-xs flex flex-col justify-between"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FileSpreadsheet size={16} style={{ color: "var(--accent)" }} />
                <h3 className="ledger-display text-sm font-semibold uppercase tracking-wider">
                  Contacts Ledger
                </h3>
              </div>
              <span className="text-xs font-mono font-semibold" style={{ color: "var(--accent)" }}>
                {contacts.length} record(s)
              </span>
            </div>
            <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
              Export your full contact rolodex or import existing spreadsheets with column mapping.
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-border/40">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={exportContacts}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold shadow-xs transition"
                style={{ background: "var(--accent)", color: "#1B1F1D" }}
              >
                <Download size={13} /> Export Contacts CSV
              </button>
              <button
                type="button"
                onClick={() => contactFileRef.current?.click()}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition"
                style={{
                  background: "var(--surface-2)",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                }}
              >
                <Upload size={13} /> Import CSV
              </button>
              <input
                ref={contactFileRef}
                type="file"
                accept=".csv,text/csv"
                onChange={handleContactFile}
                className="hidden"
              />
            </div>
            <button
              type="button"
              onClick={downloadContactTemplate}
              className="w-full text-center py-1 text-[11px] hover:underline"
              style={{ color: "var(--text-muted)" }}
            >
              Download Sample Contacts Template (.csv)
            </button>
          </div>
        </div>

        {/* Deals CSV Card */}
        <div
          className="rounded-xl p-5 shadow-xs flex flex-col justify-between"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FileSpreadsheet size={16} style={{ color: "var(--positive)" }} />
                <h3 className="ledger-display text-sm font-semibold uppercase tracking-wider">
                  Deals & Pipeline Ledger
                </h3>
              </div>
              <span className="text-xs font-mono font-semibold" style={{ color: "var(--positive)" }}>
                {deals.length} record(s)
              </span>
            </div>
            <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
              Export commercial deals, valuations, and close dates or import batch pipelines.
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-border/40">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={exportDeals}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold shadow-xs transition"
                style={{ background: "var(--positive)", color: "#1B1F1D" }}
              >
                <Download size={13} /> Export Deals CSV
              </button>
              <button
                type="button"
                onClick={() => dealFileRef.current?.click()}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition"
                style={{
                  background: "var(--surface-2)",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                }}
              >
                <Upload size={13} /> Import CSV
              </button>
              <input
                ref={dealFileRef}
                type="file"
                accept=".csv,text/csv"
                onChange={handleDealFile}
                className="hidden"
              />
            </div>
            <button
              type="button"
              onClick={downloadDealTemplate}
              className="w-full text-center py-1 text-[11px] hover:underline"
              style={{ color: "var(--text-muted)" }}
            >
              Download Sample Deals Template (.csv)
            </button>
          </div>
        </div>
      </div>

      {/* Demo Data & Presets */}
      <div
        className="rounded-xl p-5 shadow-xs"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <RefreshCw size={16} style={{ color: "var(--info)" }} />
            <h3 className="ledger-display text-sm font-semibold">Demo & Testing Presets</h3>
          </div>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            Instant realistic datasets
          </span>
        </div>
        <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
          Load structured CRM datasets with realistic customer names, corporate accounts, varied deal stages, and timeline activities.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            className="p-3.5 rounded-lg flex items-center justify-between gap-3"
            style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
          >
            <div>
              <div className="font-semibold text-xs text-text">Standard Demo Set</div>
              <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                25 contacts, 30 active deals across all stages
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onLoadStandardDemo();
                showToast("Standard demo dataset loaded!");
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition"
              style={{ background: "var(--accent)", color: "#1B1F1D" }}
            >
              Load
            </button>
          </div>

          <div
            className="p-3.5 rounded-lg flex items-center justify-between gap-3"
            style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
          >
            <div>
              <div className="font-semibold text-xs text-text">Enterprise Scale Dataset</div>
              <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                50+ enterprise contacts, high-value pipelines
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onLoadEnterpriseDemo();
                showToast("Enterprise dataset loaded!");
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition"
              style={{ background: "var(--info)", color: "#FFFFFF" }}
            >
              Load
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone: Clear All */}
      <div
        className="rounded-xl p-5 shadow-xs"
        style={{ background: "var(--surface)", border: "1px solid var(--negative)" }}
      >
        <h3 className="ledger-display text-sm font-semibold mb-1 flex items-center gap-2" style={{ color: "var(--negative)" }}>
          <AlertTriangle size={16} /> Danger Zone: Erase Storage
        </h3>
        <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
          Permanently delete all contacts, deals, activities, and custom preferences stored in this browser session. Export a backup above first if you need this data.
        </p>

        {!showClearConfirm ? (
          <button
            type="button"
            onClick={() => setShowClearConfirm(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition hover:opacity-90"
            style={{
              background: "var(--negative-soft)",
              color: "var(--negative)",
              border: "1px solid var(--negative)",
            }}
          >
            <Trash2 size={13} /> Clear All CRM Data
          </button>
        ) : (
          <div
            className="p-3 rounded-lg flex items-center justify-between gap-4 flex-wrap"
            style={{ background: "var(--surface-2)", border: "1px solid var(--negative)" }}
          >
            <span className="text-xs font-semibold" style={{ color: "var(--negative)" }}>
              Are you sure? All {contacts.length} contacts and {deals.length} deals will be erased.
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onClearAll();
                  setShowClearConfirm(false);
                  showToast("All data cleared successfully.");
                }}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white transition"
                style={{ background: "var(--negative)" }}
              >
                Yes, Erase Everything
              </button>
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="px-3 py-1.5 rounded-lg text-xs transition"
                style={{ color: "var(--text-muted)" }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
