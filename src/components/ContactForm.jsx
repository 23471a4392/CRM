import React, { useState } from "react";
import { Check, X, Tag, Plus, Camera, Image, Trash2 } from "lucide-react";
import Field from "./Field.jsx";
import Avatar from "./Avatar.jsx";

const SUGGESTED_TAGS = ["VIP", "Enterprise", "Warm", "Follow-up", "SMB", "Partner", "Decision Maker"];

const SAMPLE_REAL_PHOTOS = [
  { label: "Executive (F)", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" },
  { label: "Director (M)", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
  { label: "Partner (F)", url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80" },
  { label: "Executive (M)", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80" },
  { label: "Founder (M)", url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80" },
  { label: "VP Sales (F)", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" },
];

export default function ContactForm({ initial, onCancel, onSave }) {
  const [form, setForm] = useState(
    initial || {
      name: "",
      company: "",
      title: "",
      email: "",
      phone: "",
      source: "inbound",
      photoUrl: "",
      tags: [],
      notes: "",
    }
  );

  const [newTagInput, setNewTagInput] = useState("");
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
    if (errors[k]) setErrors({ ...errors, [k]: null });
  };

  const toggleTag = (tag) => {
    const current = form.tags || [];
    if (current.includes(tag)) {
      setForm({ ...form, tags: current.filter((t) => t !== tag) });
    } else {
      setForm({ ...form, tags: [...current, tag] });
    }
  };

  const handleAddCustomTag = (e) => {
    e.preventDefault();
    const tag = newTagInput.trim();
    if (tag && !(form.tags || []).includes(tag)) {
      setForm({ ...form, tags: [...(form.tags || []), tag] });
      setNewTagInput("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name || form.name.trim().length < 2) {
      errs.name = "Name is required (at least 2 characters)";
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = "Please enter a valid email address";
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    onSave({
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      company: form.company.trim(),
      phone: form.phone.trim(),
      title: form.title.trim(),
      photoUrl: (form.photoUrl || "").trim(),
      tags: form.tags || [],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-backdrop">
      <div
        className="w-full max-w-lg rounded-xl shadow-2xl overflow-hidden modal-content"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        <div
          className="p-5 flex items-center justify-between"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-3">
            <Avatar name={form.name || "New Contact"} photoUrl={form.photoUrl} size="md" />
            <div>
              <h3 className="ledger-display text-lg font-semibold">
                {initial ? "Edit Contact" : "Create New Contact"}
              </h3>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Fill in contact details or attach real professional headshot
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-1 rounded hover:opacity-70 transition"
            style={{ color: "var(--text-dim)" }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto scrollbar-ledger">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Field label="Full Name *" error={errors.name}>
                <input
                  className="ledger-input w-full rounded px-3 py-2 text-sm"
                  value={form.name}
                  onChange={set("name")}
                  placeholder="e.g. Jordan Blake"
                  autoFocus
                />
              </Field>
            </div>

            <Field label="Company">
              <input
                className="ledger-input w-full rounded px-3 py-2 text-sm"
                value={form.company}
                onChange={set("company")}
                placeholder="e.g. Acme Corp"
              />
            </Field>

            <Field label="Job Title / Role">
              <input
                className="ledger-input w-full rounded px-3 py-2 text-sm"
                value={form.title || ""}
                onChange={set("title")}
                placeholder="e.g. VP of Operations"
              />
            </Field>

            <Field label="Email Address" error={errors.email}>
              <input
                type="email"
                className="ledger-input w-full rounded px-3 py-2 text-sm"
                value={form.email}
                onChange={set("email")}
                placeholder="jordan@example.com"
              />
            </Field>

            <Field label="Phone Number">
              <input
                className="ledger-input w-full rounded px-3 py-2 text-sm"
                value={form.phone}
                onChange={set("phone")}
                placeholder="+1 (555) 012-3456"
              />
            </Field>

            <div className="sm:col-span-2">
              <Field label="Profile Photo (Real Stock Portrait / Photo URL)">
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      className="ledger-input flex-1 rounded px-3 py-1.5 text-xs"
                      value={form.photoUrl || ""}
                      onChange={set("photoUrl")}
                      placeholder="https://images.unsplash.com/... or choose below"
                    />
                    {form.photoUrl && (
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, photoUrl: "" })}
                        className="px-2 py-1.5 rounded text-xs hover:bg-surface-2 transition flex items-center gap-1"
                        style={{ color: "var(--negative)", border: "1px solid var(--border)" }}
                        title="Remove photo (use initials)"
                      >
                        <Trash2 size={12} /> Clear
                      </button>
                    )}
                  </div>

                  {/* Sample real stock portraits */}
                  <div className="flex items-center gap-2 pt-1 overflow-x-auto pb-1">
                    <span className="text-[11px] shrink-0" style={{ color: "var(--text-dim)" }}>
                      Real portraits:
                    </span>
                    {SAMPLE_REAL_PHOTOS.map((p, i) => (
                      <img
                        key={i}
                        src={p.url}
                        alt={p.label}
                        onClick={() => setForm({ ...form, photoUrl: p.url })}
                        className={`w-7 h-7 rounded-lg object-cover cursor-pointer border transition hover:scale-110 ${
                          form.photoUrl === p.url ? "border-amber-400 ring-2 ring-amber-400/40" : "border-border/60 opacity-80 hover:opacity-100"
                        }`}
                        title={`Select ${p.label}`}
                      />
                    ))}
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, photoUrl: "" })}
                      className="text-[10px] px-2 py-1 rounded bg-surface-2 border border-border shrink-0 hover:bg-surface-3"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Initials Only
                    </button>
                  </div>
                </div>
              </Field>
            </div>

            <Field label="Lead Source">
              <select
                className="ledger-input w-full rounded px-3 py-2 text-sm"
                value={form.source || "inbound"}
                onChange={set("source")}
              >
                <option value="inbound">Inbound</option>
                <option value="referral">Referral</option>
                <option value="web">Website</option>
                <option value="event">Conference / Event</option>
                <option value="partner">Partner</option>
                <option value="outbound">Outbound</option>
                <option value="ads">Marketing Ads</option>
              </select>
            </Field>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-muted)" }}>
                Tags & Segments
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {SUGGESTED_TAGS.map((tag) => {
                  const isSelected = (form.tags || []).includes(tag);
                  return (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className="text-xs px-2.5 py-1 rounded-full transition flex items-center gap-1"
                      style={{
                        background: isSelected ? "var(--accent)" : "var(--surface-2)",
                        color: isSelected ? "#1B1F1D" : "var(--text-muted)",
                        border: `1px solid ${isSelected ? "var(--accent)" : "var(--border)"}`,
                      }}
                    >
                      <Tag size={10} />
                      {tag}
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="ledger-input flex-1 rounded px-3 py-1.5 text-xs"
                  placeholder="Add custom tag…"
                  value={newTagInput}
                  onChange={(e) => setNewTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddCustomTag(e)}
                />
                <button
                  type="button"
                  onClick={handleAddCustomTag}
                  className="px-2.5 py-1.5 rounded text-xs"
                  style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
                >
                  <Plus size={12} /> Add
                </button>
              </div>
            </div>

            <div className="sm:col-span-2">
              <Field label="Notes & Context">
                <textarea
                  className="ledger-input w-full rounded px-3 py-2 text-sm resize-none"
                  rows={3}
                  value={form.notes || ""}
                  onChange={set("notes")}
                  placeholder="Key background, discussion notes, decision maker info…"
                />
              </Field>
            </div>
          </div>

          <div
            className="pt-4 flex items-center justify-end gap-2"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded text-sm transition hover:bg-surface-2"
              style={{ color: "var(--text-muted)" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 rounded text-sm font-medium transition shadow-sm"
              style={{ background: "var(--accent)", color: "#1B1F1D" }}
            >
              <Check size={15} /> Save Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
