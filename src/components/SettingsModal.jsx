import React, { useState } from "react";
import {
  Settings,
  X,
  Palette,
  DollarSign,
  User,
  Database,
  Download,
  Upload,
  RefreshCw,
  Trash2,
  Check,
} from "lucide-react";
import Field from "./Field.jsx";
import Avatar from "./Avatar.jsx";

export default function SettingsModal({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onLoadSampleData,
  onExportAllJSON,
  onImportAllJSON,
  onClearAllData,
  contactsCount,
  dealsCount,
}) {
  const [activeTab, setActiveTab] = useState("general");
  const [formSettings, setFormSettings] = useState(
    settings || {
      theme: "dark",
      currency: "USD",
      userName: "Naga Phanidhar",
      userEmail: "lead@ledger-crm.app",
      userRole: "Principal Account Executive",
      organization: "Ledger Enterprise Systems",
      tableDensity: "comfortable",
    }
  );
  const [savedMessage, setSavedMessage] = useState(false);

  if (!isOpen) return null;

  const handleChange = (k, v) => {
    setFormSettings((prev) => ({ ...prev, [k]: v }));
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    onUpdateSettings(formSettings);
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-backdrop">
      <div
        className="w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] modal-content"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        {/* Modal Header */}
        <div
          className="p-5 flex items-center justify-between"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="p-2 rounded-lg"
              style={{ background: "var(--accent-soft)", color: "var(--accent)" }}
            >
              <Settings size={18} />
            </div>
            <div>
              <h3 className="ledger-display text-lg font-semibold">Ledger CRM Settings</h3>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Personalize workspace appearance, localization, and data management
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:opacity-70 transition"
            style={{ color: "var(--text-dim)" }}
            aria-label="Close settings"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div
          className="flex items-center gap-1 px-5 pt-3"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          {[
            { id: "general", label: "General & Appearance", icon: Palette },
            { id: "profile", label: "User Profile", icon: User },
            { id: "data", label: "Data & Backups", icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium border-b-2 transition"
                style={{
                  borderColor: active ? "var(--accent)" : "transparent",
                  color: active ? "var(--accent)" : "var(--text-muted)",
                }}
              >
                <Icon size={14} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto scrollbar-ledger flex-1 space-y-6">
          {savedMessage && (
            <div
              className="px-4 py-2.5 rounded-lg text-xs flex items-center gap-2"
              style={{ background: "var(--positive-soft)", color: "var(--positive)" }}
            >
              <Check size={14} /> Settings updated successfully!
            </div>
          )}

          {activeTab === "general" && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>
                  Visual Theme
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "dark", label: "Dark Slate", desc: "Classic dark accounting tone", bg: "#1C201E", border: "#38423C", accent: "#E2C08D" },
                    { id: "parchment", label: "Antique Ledger", desc: "Warm archival parchment", bg: "#FCFAF6", border: "#C8BEAC", accent: "#8E5B23" },
                    { id: "light", label: "Clean Modern", desc: "Crisp white minimalism", bg: "#FFFFFF", border: "#CBD5E1", accent: "#0D9488" },
                  ].map((t) => {
                    const isSelected = formSettings.theme === t.id;
                    return (
                      <div
                        key={t.id}
                        onClick={() => handleChange("theme", t.id)}
                        className="p-3.5 rounded-lg cursor-pointer transition border-2 flex flex-col justify-between h-24"
                        style={{
                          background: t.bg,
                          borderColor: isSelected ? "var(--accent)" : "var(--border)",
                          boxShadow: isSelected ? "0 0 0 2px var(--ring)" : "none",
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs" style={{ color: t.id === "dark" ? "#E8ECE9" : "#2C261E" }}>
                            {t.label}
                          </span>
                          {isSelected && (
                            <div className="w-4 h-4 rounded-full flex items-center justify-center text-[10px]" style={{ background: "var(--accent)", color: "#1B1F1D" }}>
                              ✓
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-full" style={{ background: t.accent }} />
                          <span className="text-[10px]" style={{ color: t.id === "dark" ? "#8E9B91" : "#726859" }}>
                            {t.desc}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Default Currency Format">
                  <select
                    className="ledger-input w-full rounded px-3 py-2 text-sm"
                    value={formSettings.currency}
                    onChange={(e) => handleChange("currency", e.target.value)}
                  >
                    <option value="USD">USD ($) — United States Dollar</option>
                    <option value="EUR">EUR (€) — Euro</option>
                    <option value="GBP">GBP (£) — British Pound</option>
                    <option value="INR">INR (₹) — Indian Rupee</option>
                    <option value="JPY">JPY (¥) — Japanese Yen</option>
                    <option value="CAD">CAD ($) — Canadian Dollar</option>
                    <option value="AUD">AUD ($) — Australian Dollar</option>
                  </select>
                </Field>

                <Field label="Organization / Firm Name">
                  <input
                    className="ledger-input w-full rounded px-3 py-2 text-sm"
                    value={formSettings.organization}
                    onChange={(e) => handleChange("organization", e.target.value)}
                    placeholder="e.g. Acme Corporation"
                  />
                </Field>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-lg bg-surface-2 border border-border">
                <Avatar
                  name={formSettings.userName || "Admin"}
                  size="lg"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-xs text-text">{formSettings.userName || "Admin User"}</div>
                  <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                    {formSettings.userRole || "Administrator"} · {formSettings.userEmail || "admin@ledger.app"}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Full Name">
                  <input
                    className="ledger-input w-full rounded px-3 py-2 text-sm"
                    value={formSettings.userName}
                    onChange={(e) => handleChange("userName", e.target.value)}
                  />
                </Field>
                <Field label="Email Address">
                  <input
                    className="ledger-input w-full rounded px-3 py-2 text-sm"
                    value={formSettings.userEmail}
                    onChange={(e) => handleChange("userEmail", e.target.value)}
                  />
                </Field>
                <Field label="Job Title / Role">
                  <input
                    className="ledger-input w-full rounded px-3 py-2 text-sm"
                    value={formSettings.userRole}
                    onChange={(e) => handleChange("userRole", e.target.value)}
                  />
                </Field>
                <Field label="Department / Division">
                  <input
                    className="ledger-input w-full rounded px-3 py-2 text-sm"
                    value={formSettings.department || "Enterprise Sales"}
                    onChange={(e) => handleChange("department", e.target.value)}
                    placeholder="e.g. Enterprise Accounts"
                  />
                </Field>
              </div>
            </div>
          )}

          {activeTab === "data" && (
            <div className="space-y-4">
              <div
                className="p-4 rounded-lg flex items-center justify-between gap-4"
                style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
              >
                <div>
                  <div className="font-semibold text-xs">Full CRM JSON Snapshot</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                    Download or restore a complete JSON archive of {contactsCount} contacts and {dealsCount} deals.
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={onExportAllJSON}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium"
                    style={{ background: "var(--accent)", color: "#1B1F1D" }}
                  >
                    <Download size={13} /> Export JSON
                  </button>
                  <label
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs cursor-pointer"
                    style={{ border: "1px solid var(--border)", color: "var(--text)" }}
                  >
                    <Upload size={13} /> Restore JSON
                    <input
                      type="file"
                      accept=".json,application/json"
                      onChange={onImportAllJSON}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div
                className="p-4 rounded-lg flex items-center justify-between gap-4"
                style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
              >
                <div>
                  <div className="font-semibold text-xs">Demo Data Presets</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                    Populate your ledger with comprehensive sample contacts, deals across all stages, and activities.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onLoadSampleData}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium"
                  style={{ background: "var(--surface-3)", color: "var(--text)", border: "1px solid var(--border)" }}
                >
                  <RefreshCw size={13} /> Load Sample Data
                </button>
              </div>

              <div
                className="p-4 rounded-lg flex items-center justify-between gap-4"
                style={{ background: "var(--surface-2)", border: "1px solid var(--negative)" }}
              >
                <div>
                  <div className="font-semibold text-xs text-negative" style={{ color: "var(--negative)" }}>
                    Reset Ledger Database
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                    Erase all contacts, deals, and activity records from browser storage.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClearAllData}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium"
                  style={{ background: "var(--negative)", color: "#FFFFFF" }}
                >
                  <Trash2 size={13} /> Clear Everything
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          className="p-4 flex items-center justify-between"
          style={{
            background: "var(--surface-2)",
            borderTop: "1px solid var(--border)",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 rounded text-xs font-medium"
            style={{ background: "var(--accent)", color: "#1B1F1D" }}
          >
            <Check size={14} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
