import React, { useState, useEffect, useCallback } from "react";
import { authService, DOMAIN_CONFIG } from "../backend/authService.js";
import { crmBackend, USERS } from "../backend/crmBackend.js";
import DomainSwitcherBar from "../components/DomainSwitcherBar.jsx";
import DomainGuard from "./DomainGuard.jsx";
import LoginView from "../views/LoginView.jsx";
import SalesDomainApp from "../views/sales/SalesDomainApp.jsx";
import ManagerDomainApp from "../views/manager/ManagerDomainApp.jsx";
import AccountsDomainApp from "../views/accounts/AccountsDomainApp.jsx";
import CustomerDomainApp from "../views/customer/CustomerDomainApp.jsx";

/**
 * Detects domain from hostname or query parameters
 */
function detectDomainFromHost() {
  if (typeof window === "undefined") return "sales";
  const hostname = window.location.hostname.toLowerCase();
  const searchParams = new URLSearchParams(window.location.search);
  const paramDomain = searchParams.get("domain");

  if (paramDomain && ["sales", "manager", "accounts", "customer", "login"].includes(paramDomain)) {
    return paramDomain;
  }

  if (hostname.startsWith("sales.")) return "sales";
  if (hostname.startsWith("manager.")) return "manager";
  if (hostname.startsWith("accounts.")) return "accounts";
  if (hostname.startsWith("customer.")) return "customer";
  if (hostname.startsWith("auth.") || hostname.startsWith("login.")) return "login";

  // Default to user's assigned role domain if logged in
  const user = authService.getCurrentUser();
  if (user) return authService.getDomainForRole(user.role);

  return "login";
}

export default function DomainRouter() {
  const [currentDomain, setCurrentDomain] = useState(detectDomainFromHost);
  const [currentUser, setCurrentUser] = useState(() => authService.getCurrentUser());
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    (async () => {
      await crmBackend.init();
      setInitialized(true);
    })();
  }, []);

  const handleLoginSuccess = useCallback(({ user, targetDomain }) => {
    setCurrentUser(user);
    setCurrentDomain(targetDomain);
    const url = new URL(window.location);
    url.searchParams.set("domain", targetDomain);
    window.history.pushState({}, "", url);
  }, []);

  const handleSwitchDomain = useCallback((domain) => {
    setCurrentDomain(domain);
    const url = new URL(window.location);
    url.searchParams.set("domain", domain);
    window.history.pushState({}, "", url);
  }, []);

  const handleQuickSwitchUser = useCallback((user) => {
    setCurrentUser(user);
    try {
      localStorage.setItem("ledger_crm_auth_session", JSON.stringify(user));
    } catch (err) {
      console.error(err);
    }
    const targetDomain = authService.getDomainForRole(user.role);
    setCurrentDomain(targetDomain);
    const url = new URL(window.location);
    url.searchParams.set("domain", targetDomain);
    window.history.pushState({}, "", url);
  }, []);

  const handleLogout = useCallback(() => {
    authService.logout();
    setCurrentUser(null);
    setCurrentDomain("login");
    const url = new URL(window.location);
    url.searchParams.set("domain", "login");
    window.history.pushState({}, "", url);
  }, []);

  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#141716] text-[#E2C08D]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-serif text-xl font-bold bg-[#E2C08D] text-[#1B1F1D] animate-pulse">
            §
          </div>
          <span className="text-sm font-medium">Initializing Multi-Domain Ledger CRM…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      {/* Top Multi-Domain Simulator Bar */}
      <DomainSwitcherBar
        currentDomain={currentDomain}
        currentUser={currentUser}
        onSwitchDomain={handleSwitchDomain}
        onQuickSwitchUser={handleQuickSwitchUser}
        onLogout={handleLogout}
      />

      {/* Main Content Router */}
      <div className="flex-1 flex flex-col">
        {currentDomain === "login" || !currentUser ? (
          <LoginView onLoginSuccess={handleLoginSuccess} />
        ) : (
          <DomainGuard
            domain={currentDomain}
            currentUser={currentUser}
            onNavigateToUserDomain={() =>
              handleSwitchDomain(authService.getDomainForRole(currentUser.role))
            }
            onOpenLogin={() => handleSwitchDomain("login")}
          >
            {currentDomain === "sales" && (
              <SalesDomainApp currentUser={currentUser} onLogout={handleLogout} />
            )}
            {currentDomain === "manager" && (
              <ManagerDomainApp currentUser={currentUser} onLogout={handleLogout} />
            )}
            {currentDomain === "accounts" && (
              <AccountsDomainApp currentUser={currentUser} onLogout={handleLogout} />
            )}
            {currentDomain === "customer" && (
              <CustomerDomainApp currentUser={currentUser} onLogout={handleLogout} />
            )}
          </DomainGuard>
        )}
      </div>
    </div>
  );
}
