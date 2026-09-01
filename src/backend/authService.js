/**
 * Ledger CRM — Central Authentication Service
 * Manages user credentials, active session state, role detection,
 * and role-to-domain mapping.
 */

import { USERS } from "./crmBackend.js";

const SESSION_STORAGE_KEY = "ledger_crm_auth_session";

export const DOMAIN_CONFIG = {
  sales: {
    id: "sales",
    name: "Sales Representative Application",
    subdomain: "sales",
    fullDomain: "sales.ledgercrm.com",
    role: "sales_rep",
    label: "Sales Rep Portal",
    accentColor: "#E2C08D",
  },
  manager: {
    id: "manager",
    name: "Sales Manager Application",
    subdomain: "manager",
    fullDomain: "manager.ledgercrm.com",
    role: "sales_manager",
    label: "Manager Dashboard",
    accentColor: "#60A5FA",
  },
  accounts: {
    id: "accounts",
    name: "Account Owner Application",
    subdomain: "accounts",
    fullDomain: "accounts.ledgercrm.com",
    role: "account_owner",
    label: "Accounts Portfolio",
    accentColor: "#34D399",
  },
  customer: {
    id: "customer",
    name: "Customer Portal",
    subdomain: "customer",
    fullDomain: "customer.ledgercrm.com",
    role: "customer",
    label: "Client Hub",
    accentColor: "#F472B6",
  },
};

class AuthService {
  constructor() {
    this.currentUser = null;
    this._loadSession();
  }

  _loadSession() {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(SESSION_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const match = USERS.find((u) => u.id === parsed.id);
        this.currentUser = match || parsed;
      } else {
        // Default to Sales Rep for first demo view if no active session
        this.currentUser = USERS[0];
      }
    } catch (err) {
      console.warn("Failed to load session", err);
      this.currentUser = USERS[0];
    }
  }

  getCurrentUser() {
    if (!this.currentUser) {
      this._loadSession();
    }
    return this.currentUser;
  }

  /**
   * Authenticate user with email and password
   * @returns {Object} { user, targetDomain, domainUrl }
   */
  async login(email, password) {
    const cleanEmail = String(email || "").trim().toLowerCase();
    const user = USERS.find(
      (u) => u.email.toLowerCase() === cleanEmail && u.password === password
    );

    if (!user) {
      throw new Error("Invalid email or password. Please check your credentials.");
    }

    this.currentUser = user;
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
    } catch (err) {
      console.error(err);
    }

    const domain = this.getDomainForRole(user.role);
    return {
      user,
      targetDomain: domain,
      domainConfig: DOMAIN_CONFIG[domain],
    };
  }

  /**
   * Quick login as a specific role for testing
   */
  async quickLoginAsRole(roleId) {
    const user = USERS.find((u) => u.role === roleId) || USERS[0];
    this.currentUser = user;
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
    } catch (err) {
      console.error(err);
    }
    const domain = this.getDomainForRole(user.role);
    return {
      user,
      targetDomain: domain,
      domainConfig: DOMAIN_CONFIG[domain],
    };
  }

  logout() {
    this.currentUser = null;
    try {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (err) {
      console.error(err);
    }
  }

  getDomainForRole(role) {
    switch (role) {
      case "sales_rep":
      case "rep":
        return "sales";
      case "sales_manager":
      case "manager":
      case "admin":
        return "manager";
      case "account_owner":
      case "owner":
        return "accounts";
      case "customer":
      case "viewer":
        return "customer";
      default:
        return "sales";
    }
  }

  isAuthorizedForDomain(user, domain) {
    if (!user) return false;
    const requiredDomain = this.getDomainForRole(user.role);
    return requiredDomain === domain;
  }
}

export const authService = new AuthService();
