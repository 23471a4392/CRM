import React, { useState } from "react";
import {
  Lock,
  ArrowRight,
  Shield,
  Briefcase,
  Users,
  Building2,
  UserCheck,
  Globe,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { USERS } from "../backend/crmBackend.js";
import { DOMAIN_CONFIG, authService } from "../backend/authService.js";
import Avatar from "../components/Avatar.jsx";

export default function LoginView({ onLoginSuccess }) {
  const [email, setEmail] = useState("jordan.rep@ledgercrm.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await authService.login(email, password);
      onLoginSuccess(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (user) => {
    setError("");
    setLoading(true);
    try {
      const result = await authService.login(user.email, user.password);
      onLoginSuccess(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const ROLE_CARDS = [
    {
      user: USERS[0], // Jordan Blake - Sales Rep
      roleTitle: "Sales Representative",
      domain: "sales.ledgercrm.com",
      accent: "#E2C08D",
      icon: Briefcase,
      description: "Manages assigned leads, personal deals, daily sales activities & customer quotes.",
    },
    {
      user: USERS[2], // Elena Vance - Sales Manager
      roleTitle: "Sales Manager",
      domain: "manager.ledgercrm.com",
      accent: "#60A5FA",
      icon: Users,
      description: "Team performance oversight, deal approvals ($50k+), lead reassignment & team quota forecasts.",
    },
    {
      user: USERS[3], // Marcus Sterling - Account Owner
      roleTitle: "Account Owner",
      domain: "accounts.ledgercrm.com",
      accent: "#34D399",
      icon: Building2,
      description: "Client portfolio retention, contract renewals, ARR revenue health & enterprise account history.",
    },
    {
      user: USERS[4], // Sarah Lin - Customer
      roleTitle: "Customer / Client",
      domain: "customer.ledgercrm.com",
      accent: "#F472B6",
      icon: UserCheck,
      description: "Self-service order tracking, commercial quotes, and direct messaging with assigned sales reps.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between p-4 sm:p-6 lg:p-12 relative">
      {/* Background Decor */}
      <div className="max-w-5xl w-full mx-auto space-y-8 flex-1 flex flex-col justify-center">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-2 border border-border text-xs font-mono">
            <Globe size={13} style={{ color: "var(--accent)" }} />
            <span>Central Multi-Domain Gateway</span>
          </div>
          <h1 className="ledger-display text-2xl sm:text-3xl font-bold tracking-tight">
            Ledger CRM Authentication
          </h1>
          <p className="text-xs sm:text-sm max-w-lg mx-auto" style={{ color: "var(--text-muted)" }}>
            Log in to your workspace. The system will authenticate your credentials, determine your assigned role, and redirect you to your dedicated domain.
          </p>
        </div>

        {/* Form and Quick-Login Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Traditional Login Form (5 cols) */}
          <div
            className="lg:col-span-5 p-6 rounded-2xl shadow-xl modal-content"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/40">
              <Lock size={16} style={{ color: "var(--accent)" }} />
              <h2 className="ledger-display text-sm font-semibold">User Credentials</h2>
            </div>

            {error && (
              <div
                className="p-3 rounded-lg text-xs flex items-center gap-2 mb-4"
                style={{ background: "var(--negative-soft)", color: "var(--negative)", border: "1px solid var(--negative)" }}
              >
                <AlertCircle size={14} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="ledger-input w-full rounded-lg px-3 py-2 text-xs"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@ledgercrm.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>
                  Password
                </label>
                <input
                  type="password"
                  required
                  className="ledger-input w-full rounded-lg px-3 py-2 text-xs"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <span className="text-[10px] mt-1 block" style={{ color: "var(--text-dim)" }}>
                  Demo password for all accounts is: <code>password123</code>
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-sm"
                style={{ background: "var(--accent)", color: "#1B1F1D" }}
              >
                <span>{loading ? "Authenticating…" : "Log In & Redirect"}</span>
                <ArrowRight size={14} />
              </button>
            </form>
          </div>

          {/* Right: 4-Role Quick Login Launcher (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border/40">
              <span className="text-xs font-bold uppercase tracking-wider text-text-muted">
                Or One-Click Launch by Role
              </span>
              <span className="text-[11px] font-mono text-text-dim">4 Isolated Domains</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ROLE_CARDS.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.roleTitle}
                    onClick={() => handleQuickLogin(card.user)}
                    className="p-4 rounded-xl cursor-pointer row-hover transition shadow-sm flex flex-col justify-between group"
                    style={{
                      background: "var(--surface)",
                      border: `1px solid var(--border)`,
                    }}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <Avatar name={card.user.name} photoUrl={card.user.photoUrl} size="md" />
                        <span
                          className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: `${card.accent}22`,
                            color: card.accent,
                            border: `1px solid ${card.accent}44`,
                          }}
                        >
                          {card.domain}
                        </span>
                      </div>

                      <h3 className="font-semibold text-xs text-text group-hover:underline">
                        {card.user.name}
                      </h3>
                      <div className="text-[11px] font-medium" style={{ color: card.accent }}>
                        {card.roleTitle}
                      </div>
                      <p className="text-[11px] mt-1.5 line-clamp-2 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        {card.description}
                      </p>
                    </div>

                    <div className="pt-3 mt-2 border-t border-border/40 flex items-center justify-between text-[11px] text-text-dim group-hover:text-text">
                      <span>Launch {card.domain.split(".")[0]}</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <footer className="text-center pt-8 text-xs select-none" style={{ color: "var(--text-dim)" }}>
        <span>Ledger CRM Multi-Domain Architecture · Single Shared Database & Event Bus</span>
      </footer>
    </div>
  );
}
