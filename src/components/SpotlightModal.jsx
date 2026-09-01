import React, { useState, useEffect, useRef } from "react";
import { Search, Users, Wallet, CheckSquare, X, ArrowRight, CornerDownLeft } from "lucide-react";
import Avatar from "./Avatar.jsx";
import { currency, stageMeta } from "../utils.js";

export default function SpotlightModal({
  isOpen,
  onClose,
  contacts,
  deals,
  activities,
  onSelectContact,
  onSelectDeal,
  onNavigateTab,
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search contacts
  const matchedContacts = contacts
    .filter((c) =>
      `${c.name} ${c.company} ${c.email} ${c.phone} ${c.title || ""}`
        .toLowerCase()
        .includes(q)
    )
    .slice(0, 5);

  // Search deals
  const matchedDeals = deals
    .filter((d) =>
      `${d.title} ${d.stage} ${d.notes || ""}`.toLowerCase().includes(q) ||
      (d.contactId &&
        contacts
          .find((c) => c.id === d.contactId)
          ?.name.toLowerCase()
          .includes(q))
    )
    .slice(0, 5);

  // Search activities
  const matchedActivities = (activities || [])
    .filter((a) =>
      `${a.title} ${a.type} ${a.description || ""}`.toLowerCase().includes(q)
    )
    .slice(0, 4);

  const allItems = [
    ...matchedContacts.map((c) => ({ type: "contact", item: c })),
    ...matchedDeals.map((d) => ({ type: "deal", item: d })),
    ...matchedActivities.map((a) => ({ type: "activity", item: a })),
  ];

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, allItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev <= 0 ? Math.max(0, allItems.length - 1) : prev - 1
      );
    } else if (e.key === "Enter" && allItems[selectedIndex]) {
      e.preventDefault();
      const current = allItems[selectedIndex];
      if (current.type === "contact") {
        onSelectContact(current.item);
      } else if (current.type === "deal") {
        onSelectDeal(current.item);
      } else {
        onNavigateTab("activities");
      }
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/60 backdrop-blur-xs modal-backdrop"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-xl shadow-2xl overflow-hidden modal-content"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div
          className="flex items-center gap-3 px-4 py-3.5"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <Search size={18} style={{ color: "var(--text-muted)" }} />
          <input
            ref={inputRef}
            className="flex-1 bg-transparent border-0 text-sm focus:outline-none"
            style={{ color: "var(--text)" }}
            placeholder="Search contacts, deals, notes, activities… (Type to filter)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded hover:opacity-70 text-xs"
              style={{ color: "var(--text-dim)" }}
            >
              Clear
            </button>
          )}
          <kbd
            className="px-2 py-0.5 rounded text-[11px] ledger-mono"
            style={{
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              color: "var(--text-muted)",
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto scrollbar-ledger p-2">
          {allItems.length === 0 ? (
            <div
              className="py-12 text-center text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              {query
                ? `No records found matching "${query}"`
                : "Type keywords to search across your CRM records"}
            </div>
          ) : (
            <div className="space-y-1">
              {matchedContacts.length > 0 && (
                <div>
                  <div
                    className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <Users size={12} /> Contacts
                  </div>
                  {matchedContacts.map((c, idx) => {
                    const active = selectedIndex === idx;
                    return (
                      <div
                        key={c.id}
                        onClick={() => {
                          onSelectContact(c);
                          onClose();
                        }}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className="px-3 py-2 rounded-lg flex items-center justify-between cursor-pointer transition text-sm"
                        style={{
                          background: active ? "var(--surface-2)" : "transparent",
                          border: active
                            ? "1px solid var(--accent-border)"
                            : "1px solid transparent",
                        }}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Avatar name={c.name} size="sm" />
                          <div className="truncate">
                            <span className="font-medium">{c.name}</span>
                            {c.company && (
                              <span
                                className="ml-2 text-xs"
                                style={{ color: "var(--text-muted)" }}
                              >
                                · {c.company}
                              </span>
                            )}
                          </div>
                        </div>
                        <div
                          className="flex items-center gap-2 text-xs"
                          style={{ color: "var(--text-muted)" }}
                        >
                          <span>{c.email || c.phone}</span>
                          <ArrowRight size={13} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {matchedDeals.length > 0 && (
                <div className="pt-2">
                  <div
                    className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <Wallet size={12} /> Deals
                  </div>
                  {matchedDeals.map((d, dIdx) => {
                    const globalIdx = matchedContacts.length + dIdx;
                    const active = selectedIndex === globalIdx;
                    const stage = stageMeta(d.stage);
                    const contact = contacts.find((c) => c.id === d.contactId);
                    return (
                      <div
                        key={d.id}
                        onClick={() => {
                          onSelectDeal(d);
                          onClose();
                        }}
                        onMouseEnter={() => setSelectedIndex(globalIdx)}
                        className="px-3 py-2 rounded-lg flex items-center justify-between cursor-pointer transition text-sm"
                        style={{
                          background: active ? "var(--surface-2)" : "transparent",
                          border: active
                            ? "1px solid var(--accent-border)"
                            : "1px solid transparent",
                        }}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-2.5 h-2.5 rounded-full shrink-0"
                            style={{ background: stage.color }}
                          />
                          <div className="truncate">
                            <span className="font-medium">{d.title}</span>
                            {contact && (
                              <span
                                className="ml-2 text-xs"
                                style={{ color: "var(--text-muted)" }}
                              >
                                · {contact.name}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{
                              background: `${stage.color}22`,
                              color: stage.color,
                            }}
                          >
                            {stage.label}
                          </span>
                          <span
                            className="ledger-mono text-xs font-semibold"
                            style={{ color: "var(--accent)" }}
                          >
                            {currency(d.value)}
                          </span>
                          <ArrowRight size={13} style={{ color: "var(--text-muted)" }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {matchedActivities.length > 0 && (
                <div className="pt-2">
                  <div
                    className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <CheckSquare size={12} /> Activities
                  </div>
                  {matchedActivities.map((a, aIdx) => {
                    const globalIdx =
                      matchedContacts.length + matchedDeals.length + aIdx;
                    const active = selectedIndex === globalIdx;
                    return (
                      <div
                        key={a.id}
                        onClick={() => {
                          onNavigateTab("activities");
                          onClose();
                        }}
                        onMouseEnter={() => setSelectedIndex(globalIdx)}
                        className="px-3 py-2 rounded-lg flex items-center justify-between cursor-pointer transition text-sm"
                        style={{
                          background: active ? "var(--surface-2)" : "transparent",
                          border: active
                            ? "1px solid var(--accent-border)"
                            : "1px solid transparent",
                        }}
                      >
                        <div className="truncate">
                          <span className="font-medium">{a.title}</span>
                          <span
                            className="ml-2 text-xs uppercase"
                            style={{ color: "var(--text-muted)" }}
                          >
                            ({a.type})
                          </span>
                        </div>
                        <ArrowRight size={13} style={{ color: "var(--text-muted)" }} />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div
          className="px-4 py-2 text-[11px] flex items-center justify-between"
          style={{
            background: "var(--surface-2)",
            borderTop: "1px solid var(--border)",
            color: "var(--text-muted)",
          }}
        >
          <div className="flex items-center gap-3">
            <span>
              <kbd className="ledger-mono">↑</kbd> <kbd className="ledger-mono">↓</kbd> Navigate
            </span>
            <span>
              <kbd className="ledger-mono">↵</kbd> Select
            </span>
            <span>
              <kbd className="ledger-mono">ESC</kbd> Close
            </span>
          </div>
          <div>Quick Jump</div>
        </div>
      </div>
    </div>
  );
}
