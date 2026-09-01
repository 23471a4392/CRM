import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Plus,
  Bell,
  Settings,
  Sun,
  Moon,
  BookOpen,
  User,
  Users,
  Wallet,
  Calendar,
  CheckCircle,
  Menu,
  X,
  ChevronDown,
  Download,
  RefreshCw,
} from "lucide-react";
import Avatar from "./Avatar.jsx";

export default function Header({
  settings,
  onOpenSpotlight,
  onOpenSettings,
  onOpenNotifications,
  unreadNotificationsCount,
  onAddContact,
  onAddDeal,
  onAddActivity,
  onToggleTheme,
  onLoadSampleData,
  onExportAllJSON,
  onToggleMobileMenu,
  isMobileMenuOpen,
}) {
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const addMenuRef = useRef(null);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (addMenuRef.current && !addMenuRef.current.contains(e.target)) {
        setShowAddMenu(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentTheme = settings?.theme || "dark";

  return (
    <header
      className="px-4 sm:px-6 py-3 flex items-center justify-between gap-3 shrink-0"
      style={{
        background: "var(--surface)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Left: Mobile Toggle + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="p-1.5 rounded lg:hidden transition hover:bg-surface-2"
          style={{ color: "var(--text-muted)" }}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-serif text-lg font-bold shadow-sm"
            style={{
              background: "var(--accent)",
              color: "#1B1F1D",
            }}
          >
            §
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="ledger-display text-lg font-bold tracking-tight">
                Ledger CRM
              </h1>
              <span
                className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded font-mono font-medium"
                style={{
                  background: "var(--surface-2)",
                  color: "var(--accent)",
                  border: "1px solid var(--border)",
                }}
              >
                v2.0
              </span>
            </div>
            <p className="hidden md:block text-[11px]" style={{ color: "var(--text-muted)" }}>
              {settings?.organization || "Contacts & Deals Ledger"}
            </p>
          </div>
        </div>
      </div>

      {/* Center: Global Search Spotlight Trigger */}
      <div className="flex-1 max-w-md mx-2 hidden sm:block">
        <button
          onClick={onOpenSpotlight}
          type="button"
          className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition"
          style={{
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
          }}
        >
          <span className="flex items-center gap-2">
            <Search size={14} style={{ color: "var(--accent)" }} />
            <span>Search contacts, deals, notes…</span>
          </span>
          <kbd
            className="px-1.5 py-0.5 rounded text-[10px] ledger-mono"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--text-dim)",
            }}
          >
            Ctrl + K
          </kbd>
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Quick Search on Mobile */}
        <button
          onClick={onOpenSpotlight}
          className="p-2 rounded-lg sm:hidden transition hover:bg-surface-2"
          style={{ color: "var(--text-muted)" }}
          aria-label="Search"
        >
          <Search size={17} />
        </button>

        {/* Quick Add Dropdown */}
        <div className="relative" ref={addMenuRef}>
          <button
            onClick={() => setShowAddMenu(!showAddMenu)}
            type="button"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition"
            style={{
              background: "var(--accent)",
              color: "#1B1F1D",
            }}
          >
            <Plus size={14} />
            <span className="hidden sm:inline">New</span>
            <ChevronDown size={12} />
          </button>

          {showAddMenu && (
            <div
              className="absolute right-0 top-full mt-1.5 w-44 rounded-xl shadow-xl p-1.5 z-50 modal-content"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <button
                onClick={() => {
                  setShowAddMenu(false);
                  onAddContact();
                }}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs transition text-left hover:bg-surface-2"
                style={{ color: "var(--text)" }}
              >
                <Users size={14} style={{ color: "var(--positive)" }} />
                <span>New Contact</span>
              </button>
              <button
                onClick={() => {
                  setShowAddMenu(false);
                  onAddDeal();
                }}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs transition text-left hover:bg-surface-2"
                style={{ color: "var(--text)" }}
              >
                <Wallet size={14} style={{ color: "var(--accent)" }} />
                <span>New Deal</span>
              </button>
              <button
                onClick={() => {
                  setShowAddMenu(false);
                  onAddActivity();
                }}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs transition text-left hover:bg-surface-2"
                style={{ color: "var(--text)" }}
              >
                <Calendar size={14} style={{ color: "var(--info)" }} />
                <span>Log Activity</span>
              </button>
            </div>
          )}
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          type="button"
          className="p-2 rounded-lg transition hover:bg-surface-2"
          style={{
            color: "var(--text-muted)",
            border: "1px solid var(--border-subtle)",
          }}
          title={`Switch theme (Current: ${currentTheme})`}
          aria-label="Toggle theme"
        >
          {currentTheme === "dark" ? (
            <Moon size={16} style={{ color: "var(--accent)" }} />
          ) : currentTheme === "parchment" ? (
            <BookOpen size={16} style={{ color: "var(--accent)" }} />
          ) : (
            <Sun size={16} style={{ color: "var(--accent)" }} />
          )}
        </button>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          type="button"
          className="relative p-2 rounded-lg transition hover:bg-surface-2"
          style={{
            color: "var(--text-muted)",
            border: "1px solid var(--border-subtle)",
          }}
          aria-label="Open notifications"
        >
          <Bell size={16} />
          {unreadNotificationsCount > 0 && (
            <span
              className="absolute top-1 right-1 w-2 h-2 rounded-full animate-pulse"
              style={{ background: "var(--accent)" }}
            />
          )}
        </button>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          type="button"
          className="p-2 rounded-lg transition hover:bg-surface-2"
          style={{
            color: "var(--text-muted)",
            border: "1px solid var(--border-subtle)",
          }}
          aria-label="Open settings"
        >
          <Settings size={16} />
        </button>

        {/* User Profile Avatar Dropdown */}
        <div className="relative" ref={profileMenuRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            type="button"
            className="flex items-center gap-1.5 p-0.5 rounded-full transition hover:opacity-80"
            aria-label="User profile"
          >
            <Avatar name={settings?.userName || "Ledger Admin"} size="sm" />
          </button>

          {showProfileMenu && (
            <div
              className="absolute right-0 top-full mt-1.5 w-56 rounded-xl shadow-2xl p-2 z-50 modal-content"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="px-3 py-2 border-b border-border/40 mb-1">
                <div className="font-semibold text-xs truncate">
                  {settings?.userName || "Ledger Admin"}
                </div>
                <div className="text-[10px] truncate" style={{ color: "var(--text-muted)" }}>
                  {settings?.userEmail || "admin@ledger-crm.app"}
                </div>
                <div className="text-[10px] mt-0.5" style={{ color: "var(--accent)" }}>
                  {settings?.userRole || "Administrator"}
                </div>
              </div>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  onOpenSettings();
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition text-left hover:bg-surface-2"
                style={{ color: "var(--text)" }}
              >
                <Settings size={13} style={{ color: "var(--text-muted)" }} />
                <span>Workspace Settings</span>
              </button>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  onExportAllJSON();
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition text-left hover:bg-surface-2"
                style={{ color: "var(--text)" }}
              >
                <Download size={13} style={{ color: "var(--text-muted)" }} />
                <span>Export JSON Backup</span>
              </button>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  onLoadSampleData();
                }}
                className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition text-left hover:bg-surface-2"
                style={{ color: "var(--text)" }}
              >
                <RefreshCw size={13} style={{ color: "var(--text-muted)" }} />
                <span>Reload Demo Data</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
