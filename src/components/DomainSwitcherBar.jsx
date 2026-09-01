import React from "react";
import {
  Globe,
  Shield,
  UserCheck,
  LogOut,
  ChevronRight,
  ExternalLink,
  Lock,
  Sparkles,
} from "lucide-react";
import { DOMAIN_CONFIG } from "../backend/authService.js";
import { USERS } from "../backend/crmBackend.js";

export default function DomainSwitcherBar({
  currentDomain,
  currentUser,
  onSwitchDomain,
  onQuickSwitchUser,
  onLogout,
}) {
  const activeConfig = DOMAIN_CONFIG[currentDomain] || DOMAIN_CONFIG.sales;

  return (
    <header
      className="px-3 py-1.5 flex flex-wrap items-center justify-between gap-2 text-xs select-none border-b shadow-sm z-50 sticky top-0"
      style={{
        background: "#141716",
        borderColor: "rgba(255, 255, 255, 0.1)",
        color: "#E5E7EB",
      }}
      aria-label="Multi-Domain Navigation Bar"
    >
      {/* Left: Active Domain & Subdomain Simulator */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/40 border border-white/10 font-mono text-[11px]">
          <Globe size={12} style={{ color: activeConfig.accentColor }} />
          <span className="font-bold" style={{ color: activeConfig.accentColor }}>
            {activeConfig.subdomain}.ledgercrm.com
          </span>
        </div>

        <span className="hidden sm:inline text-white/30">|</span>

        {/* Quick Domain Switch Tabs */}
        <div className="flex items-center gap-1 bg-black/30 p-0.5 rounded-lg border border-white/5">
          <button
            type="button"
            onClick={() => onSwitchDomain("landing")}
            className="px-2 py-0.5 rounded text-[11px] font-medium transition"
            style={{
              background: currentDomain === "landing" ? "#262B28" : "transparent",
              color: currentDomain === "landing" ? "#F3F4F6" : "#9CA3AF",
            }}
          >
            Public Website
          </button>
          <button
            type="button"
            onClick={() => onSwitchDomain("login")}
            className="px-2 py-0.5 rounded text-[11px] font-medium transition"
            style={{
              background: currentDomain === "login" ? "#262B28" : "transparent",
              color: currentDomain === "login" ? "#F3F4F6" : "#9CA3AF",
            }}
          >
            Login Portal
          </button>
          {Object.values(DOMAIN_CONFIG).map((d) => {
            const isActive = currentDomain === d.id;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => onSwitchDomain(d.id)}
                className="px-2 py-0.5 rounded text-[11px] font-medium transition flex items-center gap-1"
                style={{
                  background: isActive ? `${d.accentColor}22` : "transparent",
                  color: isActive ? d.accentColor : "#9CA3AF",
                  border: isActive ? `1px solid ${d.accentColor}55` : "1px solid transparent",
                }}
              >
                <span>{d.subdomain}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: Active Role, User info & Security status */}
      <div className="flex items-center gap-2.5">
        {currentUser ? (
          <div className="flex items-center gap-2">
            {/* Quick user role selector dropdown */}
            <div className="flex items-center gap-1 text-[11px]">
              <span className="text-white/40 hidden md:inline">Logged in as:</span>
              <select
                className="bg-black/40 text-white border border-white/15 rounded px-2 py-0.5 text-[11px] font-medium focus:outline-none focus:border-amber-400"
                value={currentUser.id}
                onChange={(e) => {
                  const targetUser = USERS.find((u) => u.id === e.target.value);
                  if (targetUser) onQuickSwitchUser(targetUser);
                }}
              >
                {USERS.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.role.replace("_", " ")})
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="p-1 rounded hover:bg-white/10 text-white/60 hover:text-red-400 transition"
              title="Logout session"
              aria-label="Logout"
            >
              <LogOut size={13} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-white/60 text-[11px]">
            <Lock size={12} />
            <span>Unauthenticated</span>
          </div>
        )}
      </div>
    </header>
  );
}
