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
  UserPlus,
  ArrowLeft,
} from "lucide-react";
import { USERS } from "../backend/crmBackend.js";
import { DOMAIN_CONFIG, authService } from "../backend/authService.js";
import Avatar from "../components/Avatar.jsx";

export default function LoginView({ onLoginSuccess, initialMode = "signin", onReturnToLanding }) {
  const [mode, setMode] = useState(initialMode); // 'signin' or 'signup'
  
  // Sign In State
  const [email, setEmail] = useState("jordan.rep@ledgercrm.com");
  const [password, setPassword] = useState("password123");

  // Sign Up State
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupRole, setSignupRole] = useState("sales_rep");
  const [signupCompany, setSignupCompany] = useState("");
  const [signupTitle, setSignupTitle] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
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

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await authService.register({
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        role: signupRole,
        company: signupCompany,
        title: signupTitle,
      });
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
    <div className="min-h-screen flex flex-col justify-between p-4 sm:p-6 lg:p-12 relative bg-[#141716] text-[#E5E7EB]">
      {/* Top Bar with Return to Landing Page */}
      <div className="max-w-5xl w-full mx-auto flex items-center justify-between pb-4">
        {onReturnToLanding && (
          <button
            type="button"
            onClick={onReturnToLanding}
            className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition"
          >
            <ArrowLeft size={13} />
            <span>← Back to Public Website</span>
          </button>
        )}
        <div className="text-[11px] font-mono text-[#E2C08D] bg-white/5 px-2.5 py-0.5 rounded border border-white/10 ml-auto">
          Central Auth Gateway
        </div>
      </div>

      <div className="max-w-5xl w-full mx-auto space-y-8 flex-1 flex flex-col justify-center">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#E2C08D]">
            <Globe size={13} />
            <span>Multi-Domain Authentication</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            {mode === "signup" ? "Create Your Ledger CRM Account" : "Sign In to Your Workspace"}
          </h1>
          <p className="text-xs sm:text-sm text-white/60 max-w-lg mx-auto">
            {mode === "signup"
              ? "Register a new user account, select your role, and automatically provision your dedicated domain workspace."
              : "Enter your credentials. The system will detect your role and redirect you to your dedicated domain."}
          </p>
        </div>

        {/* Form and Quick-Login Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Auth Form (5 cols) */}
          <div
            className="lg:col-span-5 p-6 rounded-2xl shadow-xl modal-content"
            style={{
              background: "#1A1E1C",
              border: "1px solid rgba(255, 255, 255, 0.12)",
            }}
          >
            {/* Tab Toggle: Sign In vs Sign Up */}
            <div className="flex rounded-lg p-1 bg-black/40 border border-white/10 mb-5">
              <button
                type="button"
                onClick={() => {
                  setMode("signin");
                  setError("");
                }}
                className="flex-1 py-1.5 rounded-md text-xs font-semibold transition"
                style={{
                  background: mode === "signin" ? "rgba(255, 255, 255, 0.15)" : "transparent",
                  color: mode === "signin" ? "#FFFFFF" : "#9CA3AF",
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setError("");
                }}
                className="flex-1 py-1.5 rounded-md text-xs font-semibold transition flex items-center justify-center gap-1"
                style={{
                  background: mode === "signup" ? "#E2C08D" : "transparent",
                  color: mode === "signup" ? "#1B1F1D" : "#9CA3AF",
                }}
              >
                <UserPlus size={12} />
                <span>Sign Up</span>
              </button>
            </div>

            {error && (
              <div
                className="p-3 rounded-lg text-xs flex items-center gap-2 mb-4"
                style={{
                  background: "rgba(239, 68, 68, 0.15)",
                  color: "#F87171",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                }}
              >
                <AlertCircle size={14} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {mode === "signin" ? (
              /* SIGN IN FORM */
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-white/70">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full rounded-lg px-3 py-2 text-xs bg-black/40 border border-white/15 text-white focus:outline-none focus:border-[#E2C08D]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@ledgercrm.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-white/70">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full rounded-lg px-3 py-2 text-xs bg-black/40 border border-white/15 text-white focus:outline-none focus:border-[#E2C08D]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                  <span className="text-[10px] mt-1 block text-white/40">
                    Demo password for existing accounts: <code>password123</code>
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm bg-[#E2C08D] text-[#1B1F1D] hover:bg-[#ebd3aa]"
                >
                  <span>{loading ? "Authenticating…" : "Sign In & Redirect"}</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            ) : (
              /* SIGN UP FORM */
              <form onSubmit={handleSignUp} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-white/70">
                    Full Name *
                  </label>
                  <input
                    required
                    className="w-full rounded-lg px-3 py-2 text-xs bg-black/40 border border-white/15 text-white focus:outline-none focus:border-[#E2C08D]"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-white/70">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full rounded-lg px-3 py-2 text-xs bg-black/40 border border-white/15 text-white focus:outline-none focus:border-[#E2C08D]"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="alex@enterprise.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-white/70">
                    Password (min 6 chars) *
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    className="w-full rounded-lg px-3 py-2 text-xs bg-black/40 border border-white/15 text-white focus:outline-none focus:border-[#E2C08D]"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-white/70">
                    Assign Role & Domain *
                  </label>
                  <select
                    className="w-full rounded-lg px-3 py-2 text-xs bg-black/40 border border-white/15 text-white focus:outline-none focus:border-[#E2C08D]"
                    value={signupRole}
                    onChange={(e) => setSignupRole(e.target.value)}
                  >
                    <option value="sales_rep">Sales Representative → sales.ledgercrm.com</option>
                    <option value="sales_manager">Sales Manager → manager.ledgercrm.com</option>
                    <option value="account_owner">Account Owner → accounts.ledgercrm.com</option>
                    <option value="customer">Customer / Client → customer.ledgercrm.com</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-white/70">
                    Company / Organization
                  </label>
                  <input
                    className="w-full rounded-lg px-3 py-2 text-xs bg-black/40 border border-white/15 text-white focus:outline-none focus:border-[#E2C08D]"
                    value={signupCompany}
                    onChange={(e) => setSignupCompany(e.target.value)}
                    placeholder="e.g. Apex Global Systems"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm bg-[#E2C08D] text-[#1B1F1D] hover:bg-[#ebd3aa] mt-2"
                >
                  <span>{loading ? "Creating Account…" : "Register & Launch Workspace"}</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>

          {/* Right: 4-Role Quick Login Launcher (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-white/70">
                Or One-Click Launch by Role
              </span>
              <span className="text-[11px] font-mono text-white/40">4 Pre-Configured Personas</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ROLE_CARDS.map((card) => {
                return (
                  <div
                    key={card.roleTitle}
                    onClick={() => handleQuickLogin(card.user)}
                    className="p-4 rounded-xl cursor-pointer transition shadow-sm flex flex-col justify-between group bg-[#181C1A] border border-white/10 hover:border-white/20"
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

                      <h3 className="font-semibold text-xs text-white group-hover:underline">
                        {card.user.name}
                      </h3>
                      <div className="text-[11px] font-medium" style={{ color: card.accent }}>
                        {card.roleTitle}
                      </div>
                      <p className="text-[11px] mt-1.5 line-clamp-2 leading-relaxed text-white/60">
                        {card.description}
                      </p>
                    </div>

                    <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/40 group-hover:text-white">
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
      <footer className="text-center pt-8 text-xs text-white/40 select-none">
        <span>Ledger CRM Multi-Domain Architecture · Single Shared Database & Event Bus</span>
      </footer>
    </div>
  );
}
