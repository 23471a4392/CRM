import React from "react";
import {
  X,
  Building2,
  Mail,
  Phone,
  Tag,
  Wallet,
  Plus,
  Pencil,
  Trash2,
  Calendar,
  Clock,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import StageBadge from "./StageBadge.jsx";
import Avatar from "./Avatar.jsx";
import { currency, formatDate, stageMeta, STAGES } from "../utils.js";

export default function ContactDetailModal({
  contact,
  deals,
  activities,
  currencyCode = "USD",
  onClose,
  onEditContact,
  onDeleteContact,
  onAddDealForContact,
  onAddActivityForContact,
  onUpdateDealStage,
  onToggleActivityCompleted,
}) {
  if (!contact) return null;

  const contactDeals = deals.filter((d) => d.contactId === contact.id);
  const totalValue = contactDeals.reduce((sum, d) => sum + (Number(d.value) || 0), 0);
  const contactActivities = (activities || []).filter((a) => a.contactId === contact.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs modal-backdrop">
      <div
        className="w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] modal-content"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        {/* Header */}
        <div
          className="p-6 flex items-start justify-between gap-4"
          style={{
            background: "var(--surface-2)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="flex items-center gap-4">
            <Avatar name={contact.name} photoUrl={contact.photoUrl} size="xl" />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="ledger-display text-xl font-bold">{contact.name}</h2>
                {contact.source && (
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold"
                    style={{
                      background: "var(--surface-3)",
                      color: "var(--text-muted)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {contact.source}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                {contact.title && <span>{contact.title}</span>}
                {contact.title && contact.company && <span>·</span>}
                {contact.company && (
                  <span className="flex items-center gap-1 font-medium text-text">
                    <Building2 size={13} /> {contact.company}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onEditContact(contact)}
              className="p-2 rounded hover:bg-surface-3 transition"
              style={{ color: "var(--text-muted)" }}
              title="Edit contact"
              aria-label="Edit contact"
            >
              <Pencil size={15} />
            </button>
            <button
              onClick={() => onDeleteContact(contact.id)}
              className="p-2 rounded hover:bg-surface-3 transition"
              style={{ color: "var(--negative)" }}
              title="Delete contact"
              aria-label="Delete contact"
            >
              <Trash2 size={15} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded hover:bg-surface-3 transition ml-1"
              style={{ color: "var(--text-dim)" }}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto scrollbar-ledger flex-1 space-y-6">
          {/* Quick Contact Info & Action Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="p-3 rounded-lg flex items-center justify-between transition hover:bg-surface-2"
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="flex items-center gap-2.5 text-xs truncate">
                  <Mail size={14} style={{ color: "var(--accent)" }} />
                  <span className="truncate">{contact.email}</span>
                </div>
                <ExternalLink size={12} style={{ color: "var(--text-dim)" }} />
              </a>
            )}

            {contact.phone && (
              <a
                href={`tel:${contact.phone}`}
                className="p-3 rounded-lg flex items-center justify-between transition hover:bg-surface-2"
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="flex items-center gap-2.5 text-xs truncate">
                  <Phone size={14} style={{ color: "var(--positive)" }} />
                  <span>{contact.phone}</span>
                </div>
                <ExternalLink size={12} style={{ color: "var(--text-dim)" }} />
              </a>
            )}
          </div>

          {/* Tags */}
          {contact.tags && contact.tags.length > 0 && (
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider block mb-1.5" style={{ color: "var(--text-muted)" }}>
                Tags & Segments
              </span>
              <div className="flex flex-wrap gap-1.5">
                {contact.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1"
                    style={{
                      background: "var(--accent-soft)",
                      color: "var(--accent)",
                      border: "1px solid var(--accent-border)",
                    }}
                  >
                    <Tag size={10} /> {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {contact.notes && (
            <div
              className="p-4 rounded-lg text-xs"
              style={{
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="font-semibold text-text mb-1 flex items-center gap-1.5">
                <MessageSquare size={13} style={{ color: "var(--accent)" }} /> Contact Notes
              </div>
              <p style={{ color: "var(--text-muted)" }}>{contact.notes}</p>
            </div>
          )}

          {/* Deals Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Wallet size={15} style={{ color: "var(--accent)" }} />
                <h4 className="ledger-display text-sm font-semibold">
                  Deals ({contactDeals.length})
                </h4>
                <span className="ledger-mono text-xs font-semibold" style={{ color: "var(--accent)" }}>
                  · Total: {currency(totalValue, currencyCode)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => onAddDealForContact(contact.id)}
                className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition"
                style={{ background: "var(--accent)", color: "#1B1F1D" }}
              >
                <Plus size={12} /> Add Deal
              </button>
            </div>

            {contactDeals.length === 0 ? (
              <div
                className="p-4 rounded-lg text-center text-xs"
                style={{
                  background: "var(--surface-2)",
                  border: "1px dashed var(--border)",
                  color: "var(--text-muted)",
                }}
              >
                No active deals for this contact yet. Click "+ Add Deal" to attach one.
              </div>
            ) : (
              <div className="space-y-2">
                {contactDeals.map((d) => (
                  <div
                    key={d.id}
                    className="p-3 rounded-lg flex items-center justify-between gap-3 text-xs"
                    style={{
                      background: "var(--surface-2)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="font-medium truncate text-sm">{d.title}</div>
                      <div className="flex items-center gap-2 mt-1" style={{ color: "var(--text-muted)" }}>
                        <span>Expected: {formatDate(d.expectedClose || d.closeDate) || "TBD"}</span>
                        {d.probability && <span>· Prob: {Math.round(d.probability * 100)}%</span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="ledger-mono text-sm font-semibold" style={{ color: "var(--accent)" }}>
                        {currency(d.value, currencyCode)}
                      </span>

                      {/* Stage selector dropdown */}
                      <select
                        className="ledger-input text-xs py-1 px-2 rounded"
                        value={d.stage}
                        onChange={(e) => onUpdateDealStage(d.id, e.target.value)}
                      >
                        {STAGES.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Activities Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Calendar size={15} style={{ color: "var(--info)" }} />
                <h4 className="ledger-display text-sm font-semibold">
                  Activity Timeline ({contactActivities.length})
                </h4>
              </div>
              <button
                type="button"
                onClick={() => onAddActivityForContact(contact.id)}
                className="flex items-center gap-1 px-2.5 py-1 rounded text-xs transition"
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                }}
              >
                <Plus size={12} /> Log Activity
              </button>
            </div>

            {contactActivities.length === 0 ? (
              <div
                className="p-4 rounded-lg text-center text-xs"
                style={{
                  background: "var(--surface-2)",
                  border: "1px dashed var(--border)",
                  color: "var(--text-muted)",
                }}
              >
                No logged interactions or upcoming tasks. Click "+ Log Activity" to record notes, calls, or meetings.
              </div>
            ) : (
              <div className="space-y-2">
                {contactActivities.map((a) => (
                  <div
                    key={a.id}
                    className="p-3 rounded-lg flex items-start gap-3 text-xs"
                    style={{
                      background: "var(--surface-2)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={a.completed}
                      onChange={() => onToggleActivityCompleted(a.id)}
                      className="mt-0.5 w-4 h-4 rounded accent-amber-500 cursor-pointer shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium ${a.completed ? "line-through opacity-60" : ""}`}>
                        {a.title}
                      </div>
                      {a.description && (
                        <p className="mt-0.5 line-clamp-2" style={{ color: "var(--text-muted)" }}>
                          {a.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-1 text-[10px]" style={{ color: "var(--text-dim)" }}>
                        <span className="uppercase">{a.type}</span>
                        <span>·</span>
                        <span>{formatDate(a.dueDate || a.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          className="p-4 flex items-center justify-end"
          style={{
            background: "var(--surface-2)",
            borderTop: "1px solid var(--border)",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded text-xs font-medium"
            style={{
              background: "var(--surface-3)",
              color: "var(--text)",
              border: "1px solid var(--border)",
            }}
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
