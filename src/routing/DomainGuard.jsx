import React from "react";
import { ShieldAlert, ArrowRight, Lock, UserX, AlertTriangle } from "lucide-react";
import { DOMAIN_CONFIG, authService } from "../backend/authService.js";

export default function DomainGuard({
  domain,
  currentUser,
  onNavigateToUserDomain,
  onOpenLogin,
  children,
}) {
  if (!currentUser) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-6">
        <div
          className="max-w-md w-full p-8 rounded-2xl text-center space-y-4 shadow-2xl modal-content"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 mx-auto flex items-center justify-center">
            <Lock size={28} />
          </div>
          <div>
            <h3 className="ledger-display text-lg font-bold text-text">Authentication Required</h3>
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              You must log in to access the <strong>{DOMAIN_CONFIG[domain]?.name || domain}</strong>.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenLogin}
            className="w-full py-2.5 rounded-xl text-xs font-semibold shadow-sm transition"
            style={{ background: "var(--accent)", color: "#1B1F1D" }}
          >
            Go to Central Login
          </button>
        </div>
      </div>
    );
  }

  const isAuthorized = authService.isAuthorizedForDomain(currentUser, domain);

  if (!isAuthorized) {
    const userDomain = authService.getDomainForRole(currentUser.role);
    const requiredConfig = DOMAIN_CONFIG[domain];
    const userConfig = DOMAIN_CONFIG[userDomain];

    return (
      <div className="min-h-[75vh] flex items-center justify-center p-6">
        <div
          className="max-w-lg w-full p-8 rounded-2xl text-center space-y-5 shadow-2xl modal-content"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--negative)",
          }}
        >
          <div
            className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center"
            style={{ background: "var(--negative-soft)", color: "var(--negative)" }}
          >
            <ShieldAlert size={32} />
          </div>

          <div>
            <div className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2" style={{ background: "var(--negative-soft)", color: "var(--negative)" }}>
              403 · Access Denied (Domain Security)
            </div>
            <h3 className="ledger-display text-xl font-bold text-text">
              Unauthorized Domain Access
            </h3>
            <p className="text-xs mt-2 leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Your account <strong>{currentUser.name}</strong> has the role <strong>"{currentUser.role.replace("_", " ")}"</strong>, which is not authorized to access <strong>{requiredConfig?.fullDomain || domain}</strong>.
            </p>
          </div>

          <div
            className="p-3.5 rounded-xl text-left text-xs space-y-1"
            style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
          >
            <div className="font-semibold text-text flex items-center gap-1.5">
              <AlertTriangle size={13} style={{ color: "var(--warning)" }} /> Domain Routing Rule
            </div>
            <p style={{ color: "var(--text-muted)" }}>
              Your assigned workspace is: <strong className="text-text">{userConfig?.name}</strong> (<code>{userConfig?.fullDomain}</code>).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <button
              type="button"
              onClick={onNavigateToUserDomain}
              className="flex-1 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-sm"
              style={{ background: "var(--accent)", color: "#1B1F1D" }}
            >
              <span>Return to My Domain ({userConfig?.subdomain})</span>
              <ArrowRight size={13} />
            </button>
            <button
              type="button"
              onClick={onOpenLogin}
              className="px-4 py-2.5 rounded-xl text-xs font-medium hover:bg-surface-2 transition"
              style={{ border: "1px solid var(--border)", color: "var(--text)" }}
            >
              Switch Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
