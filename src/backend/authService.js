/**
 * Ledger CRM — Central Authentication & User Registration Service
 * Manages user credentials, active session state, role detection,
 * registration (Sign Up), and role-to-domain mapping.
 */

import { USERS, crmBackend } from "./crmBackend.js";
import { uid } from "../utils.js";

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
        this.currentUser = JSON.parse(stored);
      } else {
        // Default demo session is Sales Rep Jordan Blake
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
   * @returns {Object} { user, targetDomain, domainConfig }
   */
  async login(email, password) {
    const cleanEmail = String(email || "").trim().toLowerCase();
    const allUsers = await crmBackend.getUsers();
    
    const user = allUsers.find(
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
   * Register a new user account (Sign Up)
   * @returns {Object} { user, targetDomain, domainConfig }
   */
  async register({ name, email, password, role = "sales_rep", company = "", title = "" }) {
    const cleanEmail = String(email || "").trim().toLowerCase();
    if (!cleanEmail || !name.trim()) {
      throw new Error("Please provide your full name and valid email address.");
    }
    if (!password || password.length < 6) {
      throw new Error("Password must be at least 6 characters long.");
    }

    const allUsers = await crmBackend.getUsers();
    const existing = allUsers.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      throw new Error("An account with this email address already exists. Please sign in.");
    }

    const domain = this.getDomainForRole(role);
    const userId = "usr_" + uid();

    const newUser = {
      id: userId,
      name: name.trim(),
      email: cleanEmail,
      password: password,
      role: role,
      domain: domain,
      title: title.trim() || (role === "sales_rep" ? "Account Executive" : role === "sales_manager" ? "Sales Director" : role === "account_owner" ? "Principal Account Lead" : "Client Executive"),
      company: company.trim() || (role === "customer" ? "Client Enterprise" : "Ledger CRM Inc."),
      team: role === "customer" ? "Client Stakeholders" : "Core Enterprise Operations",
      quota: role === "sales_rep" ? 500000 : role === "sales_manager" ? 1500000 : 0,
      photoUrl: "",
      phone: "+1 (555) 019-2831",
      createdAt: Date.now(),
    };

    // If customer, assign an account and sales rep
    if (role === "customer") {
      newUser.accountId = "acc_acme";
      newUser.assignedSalesRepId = "rep-1";
      newUser.accountOwnerId = "accounts-1";
    }

    await crmBackend.saveRegisteredUser(newUser);

    this.currentUser = newUser;
    try {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newUser));
    } catch (err) {
      console.error(err);
    }

    return {
      user: newUser,
      targetDomain: domain,
      domainConfig: DOMAIN_CONFIG[domain],
    };
  }

  /**
   * Quick login as a specific role for testing
   */
  async quickLoginAsRole(roleId) {
    const allUsers = await crmBackend.getUsers();
    const user = allUsers.find((u) => u.role === roleId) || USERS[0];
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
