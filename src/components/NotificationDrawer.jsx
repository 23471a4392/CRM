import React from "react";
import { Bell, Check, Trash2, X, AlertCircle, Clock, ExternalLink } from "lucide-react";

export default function NotificationDrawer({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllRead,
  onClearAll,
  onSelectNotification,
}) {
  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs modal-backdrop" onClick={onClose}>
      <div
        className="absolute top-16 right-4 sm:right-8 w-full max-w-sm rounded-xl shadow-2xl overflow-hidden modal-content"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="p-4 flex items-center justify-between"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-2">
            <Bell size={16} style={{ color: "var(--accent)" }} />
            <h3 className="ledger-display text-sm font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <span
                className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                style={{ background: "var(--accent)", color: "#1B1F1D" }}
              >
                {unreadCount} new
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllRead}
                className="text-xs px-2 py-1 rounded hover:opacity-80 transition"
                style={{ color: "var(--text-muted)" }}
                title="Mark all as read"
              >
                Mark all read
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded hover:opacity-70"
              style={{ color: "var(--text-dim)" }}
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Notification List */}
        <div className="max-h-[380px] overflow-y-auto scrollbar-ledger p-2 divide-y divide-border/20">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-xs" style={{ color: "var(--text-muted)" }}>
              No notifications at this time. All deals and tasks are on track!
            </div>
          ) : (
            notifications.map((n) => {
              const isUrgent = n.type === "urgent" || n.type === "warning";
              return (
                <div
                  key={n.id}
                  className="p-3 rounded-lg flex items-start gap-3 transition cursor-pointer hover:bg-surface-2"
                  style={{
                    background: n.read ? "transparent" : "var(--accent-soft)",
                    opacity: n.read ? 0.75 : 1,
                  }}
                  onClick={() => {
                    onMarkAsRead(n.id);
                    if (onSelectNotification) onSelectNotification(n);
                  }}
                >
                  <div
                    className="p-1.5 rounded-full mt-0.5 shrink-0"
                    style={{
                      background: isUrgent ? "var(--negative-soft)" : "var(--surface-2)",
                      color: isUrgent ? "var(--negative)" : "var(--accent)",
                    }}
                  >
                    {isUrgent ? <AlertCircle size={14} /> : <Clock size={14} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-semibold text-xs truncate">{n.title}</span>
                      <span className="text-[10px] shrink-0" style={{ color: "var(--text-dim)" }}>
                        {n.time}
                      </span>
                    </div>
                    <p className="text-xs mt-0.5 line-clamp-2" style={{ color: "var(--text-muted)" }}>
                      {n.message}
                    </p>
                  </div>
                  {!n.read && (
                    <div
                      className="w-2 h-2 rounded-full shrink-0 mt-1.5"
                      style={{ background: "var(--accent)" }}
                    />
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div
            className="p-2.5 flex items-center justify-between text-xs"
            style={{
              background: "var(--surface-2)",
              borderTop: "1px solid var(--border)",
            }}
          >
            <span style={{ color: "var(--text-dim)" }}>
              {notifications.length} notification{notifications.length > 1 ? "s" : ""}
            </span>
            <button
              onClick={onClearAll}
              className="flex items-center gap-1 text-xs hover:opacity-80 text-negative transition px-2 py-0.5 rounded"
              style={{ color: "var(--negative)" }}
            >
              <Trash2 size={12} /> Clear all
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
