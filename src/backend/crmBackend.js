/**
 * Ledger CRM — Centralized Shared Backend & Database
 * Single source of truth for all 4 domains (Sales, Manager, Account Owner, Customer)
 * Provides centralized data storage, work assignment filtering, relational integrity,
 * and real-time notification event triggering.
 */

import { notificationBus } from "./notificationBus.js";
import { uid } from "../utils.js";
import { getJSON, setJSON } from "../storage.js";

// Canonical User Directory for all 4 roles
export const USERS = [
  {
    id: "rep-1",
    name: "Jordan Blake",
    email: "jordan.rep@ledgercrm.com",
    password: "password123",
    role: "sales_rep",
    domain: "sales",
    title: "Senior Enterprise Sales Rep",
    team: "Core Enterprise Sales",
    quota: 500000,
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 234-5678",
  },
  {
    id: "rep-2",
    name: "Sam Rivera",
    email: "sam.rep@ledgercrm.com",
    password: "password123",
    role: "sales_rep",
    domain: "sales",
    title: "Strategic Mid-Market Rep",
    team: "Core Enterprise Sales",
    quota: 400000,
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 345-6789",
  },
  {
    id: "manager-1",
    name: "Elena Vance",
    email: "elena.manager@ledgercrm.com",
    password: "password123",
    role: "sales_manager",
    domain: "manager",
    title: "VP of Sales & Pipeline Operations",
    team: "Executive Sales Leadership",
    quota: 1500000,
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 890-1234",
  },
  {
    id: "accounts-1",
    name: "Marcus Sterling",
    email: "marcus.accounts@ledgercrm.com",
    password: "password123",
    role: "account_owner",
    domain: "accounts",
    title: "Principal Account Owner & Client Success",
    team: "Portfolio & Growth Management",
    portfolioValue: 1200000,
    photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 456-7890",
  },
  {
    id: "customer-1",
    name: "Sarah Lin",
    email: "sarah.client@acmeglobal.com",
    password: "password123",
    role: "customer",
    domain: "customer",
    title: "VP Product & Operations",
    company: "Acme Global Corp",
    accountId: "acc_acme",
    assignedSalesRepId: "rep-1",
    accountOwnerId: "accounts-1",
    photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 789-0123",
  },
  {
    id: "customer-2",
    name: "David Chen",
    email: "david.client@vandelay.com",
    password: "password123",
    role: "customer",
    domain: "customer",
    title: "Chief Financial Officer",
    company: "Vandelay Industries",
    accountId: "acc_vandelay",
    assignedSalesRepId: "rep-2",
    accountOwnerId: "accounts-1",
    photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    phone: "+1 (555) 890-5678",
  },
];

// Initial Seed Accounts
const SEED_ACCOUNTS = [
  {
    id: "acc_acme",
    name: "Acme Global Corp",
    industry: "Enterprise Cloud Infrastructure",
    tier: "Tier 1 Strategic",
    annualRevenue: 280000,
    contractStatus: "Active",
    renewalDate: "2025-11-15",
    accountOwnerId: "accounts-1",
    customerId: "customer-1",
    assignedSalesRepId: "rep-1",
    healthScore: 94,
    billingContact: "Sarah Lin (sarah.client@acmeglobal.com)",
    sla: "24/7 Priority SLA",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 120,
  },
  {
    id: "acc_vandelay",
    name: "Vandelay Industries",
    industry: "Import / Export & Logistics",
    tier: "Enterprise Tier",
    annualRevenue: 165000,
    contractStatus: "Active",
    renewalDate: "2025-12-01",
    accountOwnerId: "accounts-1",
    customerId: "customer-2",
    assignedSalesRepId: "rep-2",
    healthScore: 88,
    billingContact: "David Chen (david.client@vandelay.com)",
    sla: "Standard Business SLA",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 90,
  },
  {
    id: "acc_stark",
    name: "Stark Enterprises",
    industry: "Clean Tech & Advanced Manufacturing",
    tier: "Tier 1 Strategic",
    annualRevenue: 450000,
    contractStatus: "Active",
    renewalDate: "2026-01-20",
    accountOwnerId: "accounts-1",
    customerId: "customer-1",
    assignedSalesRepId: "rep-1",
    healthScore: 98,
    billingContact: "Sarah Lin (sarah.client@acmeglobal.com)",
    sla: "Custom Mission Critical SLA",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 180,
  },
  {
    id: "acc_cyber",
    name: "Cyberdyne Systems",
    industry: "Applied AI & Automation Systems",
    tier: "Mid-Market Growth",
    annualRevenue: 95000,
    contractStatus: "Active",
    renewalDate: "2025-10-30",
    accountOwnerId: "accounts-1",
    customerId: "customer-2",
    assignedSalesRepId: "rep-2",
    healthScore: 82,
    billingContact: "David Chen (david.client@vandelay.com)",
    sla: "Standard Business SLA",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 60,
  },
];

// Initial Seed Contacts with Ownership
const SEED_CONTACTS_RELATIONAL = [
  {
    id: "c_0001",
    name: "Sarah Lin",
    company: "Acme Global Corp",
    title: "VP Product & Operations",
    email: "sarah.client@acmeglobal.com",
    phone: "+1 (555) 789-0123",
    source: "inbound",
    accountId: "acc_acme",
    assignedSalesRepId: "rep-1",
    accountOwnerId: "accounts-1",
    customerId: "customer-1",
    photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    tags: ["Decision Maker", "VIP", "Enterprise"],
    notes: "Primary executive sponsor for ERP & Ledger CRM rollout at Acme.",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 45,
  },
  {
    id: "c_0002",
    name: "David Chen",
    company: "Vandelay Industries",
    title: "Chief Financial Officer",
    email: "david.client@vandelay.com",
    phone: "+1 (555) 890-5678",
    source: "referral",
    accountId: "acc_vandelay",
    assignedSalesRepId: "rep-2",
    accountOwnerId: "accounts-1",
    customerId: "customer-2",
    photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80",
    tags: ["Financial Approver", "Strategic"],
    notes: "Direct budget authority for logistics ledger automation.",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 30,
  },
  {
    id: "c_0003",
    name: "Yara Davis",
    company: "Stark Enterprises",
    title: "Director of Supply Chain Technology",
    email: "yara.davis@starktech.io",
    phone: "+1 (555) 345-0987",
    source: "event",
    accountId: "acc_stark",
    assignedSalesRepId: "rep-1",
    accountOwnerId: "accounts-1",
    customerId: "customer-1",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    tags: ["Technical Lead", "Warm"],
    notes: "Evaluating integration between Ledger CRM and robotics ERP.",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 20,
  },
  {
    id: "c_0004",
    name: "Avery Harris",
    company: "Cyberdyne Systems",
    title: "Head of Procurement & Contracts",
    email: "avery.harris@cyberdyne.ai",
    phone: "+1 (555) 678-1234",
    source: "web",
    accountId: "acc_cyber",
    assignedSalesRepId: "rep-2",
    accountOwnerId: "accounts-1",
    customerId: "customer-2",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    tags: ["Procurement", "SMB"],
    notes: "Reviewing commercial terms and security checklist.",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 15,
  },
];

// Initial Seed Deals with Ownership & Approval Status
const SEED_DEALS_RELATIONAL = [
  {
    id: "d_0001",
    title: "Acme Global — Enterprise Ledger Suite Rollout",
    contactId: "c_0001",
    accountId: "acc_acme",
    ownerId: "rep-1",
    assignedSalesRepId: "rep-1",
    accountOwnerId: "accounts-1",
    customerId: "customer-1",
    value: 120000,
    stage: "negotiation",
    probability: 0.85,
    expectedClose: "2025-11-15",
    approvalStatus: "pending_manager_approval", // Needs Manager Approval ($50k+)
    notes: "High-value enterprise expansion deal. Pending manager sign-off on 10% discount.",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 18,
  },
  {
    id: "d_0002",
    title: "Acme Global — Q3 Custom Reporting API Connector",
    contactId: "c_0001",
    accountId: "acc_acme",
    ownerId: "rep-1",
    assignedSalesRepId: "rep-1",
    accountOwnerId: "accounts-1",
    customerId: "customer-1",
    value: 35000,
    stage: "won",
    probability: 1.0,
    expectedClose: "2025-08-30",
    approvalStatus: "approved",
    notes: "Closed won. Service delivery underway.",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 60,
  },
  {
    id: "d_0003",
    title: "Vandelay Industries — Multi-Currency Import Accounting",
    contactId: "c_0002",
    accountId: "acc_vandelay",
    ownerId: "rep-2",
    assignedSalesRepId: "rep-2",
    accountOwnerId: "accounts-1",
    customerId: "customer-2",
    value: 68000,
    stage: "proposal",
    probability: 0.65,
    expectedClose: "2025-12-05",
    approvalStatus: "approved",
    notes: "Formal commercial proposal delivered to CFO David Chen.",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 12,
  },
  {
    id: "d_0004",
    title: "Stark Enterprises — Cloud Automation Tier 1 License",
    contactId: "c_0003",
    accountId: "acc_stark",
    ownerId: "rep-1",
    assignedSalesRepId: "rep-1",
    accountOwnerId: "accounts-1",
    customerId: "customer-1",
    value: 95000,
    stage: "contacted",
    probability: 0.4,
    expectedClose: "2026-01-25",
    approvalStatus: "none",
    notes: "Initial discovery call complete. Preparing technical scoping document.",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 8,
  },
  {
    id: "d_0005",
    title: "Cyberdyne Systems — Starter Accounting Seat Pack",
    contactId: "c_0004",
    accountId: "acc_cyber",
    ownerId: "rep-2",
    assignedSalesRepId: "rep-2",
    accountOwnerId: "accounts-1",
    customerId: "customer-2",
    value: 22000,
    stage: "won",
    probability: 1.0,
    expectedClose: "2025-07-15",
    approvalStatus: "approved",
    notes: "Standard starter tier. Active billing.",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 40,
  },
];

// Initial Seed Quotes
const SEED_QUOTES = [
  {
    id: "q_0001",
    quoteNumber: "Q-2025-8841",
    dealId: "d_0001",
    customerId: "customer-1",
    accountId: "acc_acme",
    amount: 120000,
    status: "Sent for Review",
    validUntil: "2025-11-30",
    terms: "Net 30. Includes 50 seats, multi-currency ledger, and 24/7 priority support.",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 10,
  },
  {
    id: "q_0002",
    quoteNumber: "Q-2025-7729",
    dealId: "d_0002",
    customerId: "customer-1",
    accountId: "acc_acme",
    amount: 35000,
    status: "Accepted & Paid",
    validUntil: "2025-09-15",
    terms: "Net 15. Custom REST Webhook integration bundle.",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 55,
  },
  {
    id: "q_0003",
    quoteNumber: "Q-2025-9912",
    dealId: "d_0003",
    customerId: "customer-2",
    accountId: "acc_vandelay",
    amount: 68000,
    status: "Pending Signature",
    validUntil: "2025-12-15",
    terms: "Net 30. Annual license for 25 logistics operators.",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
  },
];

// Initial Seed Inquiries
const SEED_INQUIRIES = [
  {
    id: "inq_0001",
    customerId: "customer-1",
    accountId: "acc_acme",
    customerName: "Sarah Lin",
    customerCompany: "Acme Global Corp",
    assignedSalesRepId: "rep-1",
    accountOwnerId: "accounts-1",
    subject: "Question regarding multi-currency foreign exchange rates",
    message: "Hi Jordan, we want to confirm if the new ledger release automatically refreshes live EUR/USD rates daily for our European subsidiary transactions.",
    status: "Open",
    priority: "High",
    replyMessage: null,
    replyDate: null,
    createdAt: Date.now() - 1000 * 60 * 60 * 4,
  },
  {
    id: "inq_0002",
    customerId: "customer-2",
    accountId: "acc_vandelay",
    customerName: "David Chen",
    customerCompany: "Vandelay Industries",
    assignedSalesRepId: "rep-2",
    accountOwnerId: "accounts-1",
    subject: "Invoice copy request for Q2 license renewal",
    message: "Hi Sam, could you please send our finance team the formal PDF copy of invoice #INV-2025-04?",
    status: "Resolved",
    priority: "Normal",
    replyMessage: "Hi David, I have attached the formal PDF invoice to your portal. Please let me know if you need anything else!",
    replyDate: Date.now() - 1000 * 60 * 60 * 24 * 2,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
  },
];

// Initial Seed Activities
const SEED_ACTIVITIES_RELATIONAL = [
  {
    id: "act_0001",
    contactId: "c_0001",
    dealId: "d_0001",
    type: "call",
    title: "Executive alignment call with Sarah Lin",
    description: "Reviewed proposed commercial terms and Q4 deployment milestones.",
    assignedTo: "rep-1",
    createdBy: "rep-1",
    dueDate: "2025-10-15",
    completed: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
  },
  {
    id: "act_0002",
    contactId: "c_0002",
    dealId: "d_0003",
    type: "meeting",
    title: "Commercial proposal walkthrough with CFO",
    description: "Demonstrated automated CSV bank reconciliation workflows.",
    assignedTo: "rep-2",
    createdBy: "rep-2",
    dueDate: "2025-10-20",
    completed: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
  },
  {
    id: "act_0003",
    contactId: "c_0001",
    dealId: "d_0001",
    type: "task",
    title: "Submit high-value discount approval to Elena",
    description: "Need manager sign-off on 10% multi-year discount requested by Acme.",
    assignedTo: "rep-1",
    createdBy: "rep-1",
    dueDate: "2025-10-16",
    completed: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: "act_0004",
    contactId: "c_0003",
    dealId: "d_0004",
    type: "call",
    title: "Technical Discovery with Yara Davis @ Stark Tech",
    description: "Discussed cloud security protocols and single sign-on requirements.",
    assignedTo: "rep-1",
    createdBy: "rep-1",
    dueDate: "2025-10-25",
    completed: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
  },
];

// Initial Seed Notifications
const SEED_NOTIFICATIONS_RELATIONAL = [
  {
    id: "notif_0001",
    recipientId: "manager-1",
    recipientRole: "sales_manager",
    title: "Deal Approval Required ($120,000)",
    message: "Jordan Blake submitted 'Acme Global — Enterprise Ledger Suite Rollout' for high-value manager approval.",
    type: "urgent",
    time: "20 minutes ago",
    read: false,
    link: "/deals?dealId=d_0001",
    createdAt: Date.now() - 1000 * 60 * 20,
  },
  {
    id: "notif_0002",
    recipientId: "rep-1",
    recipientRole: "sales_rep",
    title: "New Customer Inquiry from Sarah Lin",
    message: "Sarah Lin @ Acme Global sent an inquiry regarding live foreign exchange rates.",
    type: "info",
    time: "4 hours ago",
    read: false,
    link: "/inquiries?inquiryId=inq_0001",
    createdAt: Date.now() - 1000 * 60 * 60 * 4,
  },
  {
    id: "notif_0003",
    recipientId: "accounts-1",
    recipientRole: "account_owner",
    title: "Contract Renewal Approaching: Acme Global",
    message: "Acme Global annual enterprise subscription renews in 45 days ($280,000 ARR).",
    type: "info",
    time: "1 day ago",
    read: false,
    link: "/accounts?accountId=acc_acme",
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
  },
  {
    id: "notif_0004",
    recipientId: "customer-1",
    recipientRole: "customer",
    title: "Quote Q-2025-8841 Ready for Review",
    message: "Your commercial quote for Ledger Enterprise Suite ($120,000) is ready in your portal.",
    type: "info",
    time: "2 days ago",
    read: true,
    link: "/quotes?quoteId=q_0001",
    createdAt: Date.now() - 1000 * 60 * 60 * 48,
  },
];

class CrmBackendStore {
  constructor() {
    this.initialized = false;
  }

  async init() {
    if (this.initialized) return;

    try {
      const [accounts, contacts, deals, quotes, inquiries, activities, notifications, auditLogs, dynamicUsers] =
        await Promise.all([
          getJSON("shared_accounts", null),
          getJSON("shared_contacts", null),
          getJSON("shared_deals", null),
          getJSON("shared_quotes", null),
          getJSON("shared_inquiries", null),
          getJSON("shared_activities", null),
          getJSON("shared_notifications", null),
          getJSON("shared_audit_logs", null),
          getJSON("shared_users", null),
        ]);

      if (!accounts || accounts.length === 0) {
        await Promise.all([
          setJSON("shared_accounts", SEED_ACCOUNTS),
          setJSON("shared_contacts", SEED_CONTACTS_RELATIONAL),
          setJSON("shared_deals", SEED_DEALS_RELATIONAL),
          setJSON("shared_quotes", SEED_QUOTES),
          setJSON("shared_inquiries", SEED_INQUIRIES),
          setJSON("shared_activities", SEED_ACTIVITIES_RELATIONAL),
          setJSON("shared_notifications", SEED_NOTIFICATIONS_RELATIONAL),
          setJSON("shared_audit_logs", []),
          setJSON("shared_users", USERS),
        ]);
      }
      this.initialized = true;
    } catch (err) {
      console.error("Failed to initialize central CRM database", err);
    }
  }

  // Raw Database Access
  async getUsers() {
    await this.init();
    const stored = (await getJSON("shared_users", [])) || [];
    // Merge stored with seed users if not already present
    const map = new Map();
    USERS.forEach((u) => map.set(u.id, u));
    stored.forEach((u) => map.set(u.id, u));
    return Array.from(map.values());
  }

  async saveRegisteredUser(user) {
    await this.init();
    const users = await this.getUsers();
    const updated = [user, ...users.filter((u) => u.id !== user.id)];
    await setJSON("shared_users", updated);
    return user;
  }
  async getAccounts() {
    await this.init();
    return (await getJSON("shared_accounts", SEED_ACCOUNTS)) || [];
  }

  async getContacts() {
    await this.init();
    return (await getJSON("shared_contacts", SEED_CONTACTS_RELATIONAL)) || [];
  }

  async getDeals() {
    await this.init();
    return (await getJSON("shared_deals", SEED_DEALS_RELATIONAL)) || [];
  }

  async getQuotes() {
    await this.init();
    return (await getJSON("shared_quotes", SEED_QUOTES)) || [];
  }

  async getInquiries() {
    await this.init();
    return (await getJSON("shared_inquiries", SEED_INQUIRIES)) || [];
  }

  async getActivities() {
    await this.init();
    return (await getJSON("shared_activities", SEED_ACTIVITIES_RELATIONAL)) || [];
  }

  async getNotifications() {
    await this.init();
    return (await getJSON("shared_notifications", SEED_NOTIFICATIONS_RELATIONAL)) || [];
  }

  async getAuditLogs() {
    await this.init();
    return (await getJSON("shared_audit_logs", [])) || [];
  }

  // -------------------------------------------------------------
  // Role-Based Authorized Queries (Data Isolation Enforcement)
  // -------------------------------------------------------------

  /**
   * Get authorized contacts for the current user
   */
  async getAuthorizedContacts(user) {
    if (!user) return [];
    const all = await this.getContacts();

    if (user.role === "sales_manager") {
      return all; // Manager sees all team contacts
    }
    if (user.role === "account_owner") {
      return all.filter((c) => c.accountOwnerId === user.id);
    }
    if (user.role === "sales_rep") {
      return all.filter((c) => c.assignedSalesRepId === user.id);
    }
    if (user.role === "customer") {
      return all.filter((c) => c.customerId === user.id || c.accountId === user.accountId);
    }
    return [];
  }

  /**
   * Get authorized deals for the current user
   */
  async getAuthorizedDeals(user) {
    if (!user) return [];
    const all = await this.getDeals();

    if (user.role === "sales_manager") {
      return all; // Manager sees all team deals
    }
    if (user.role === "account_owner") {
      return all.filter((d) => d.accountOwnerId === user.id);
    }
    if (user.role === "sales_rep") {
      return all.filter((d) => d.ownerId === user.id || d.assignedSalesRepId === user.id);
    }
    if (user.role === "customer") {
      return all.filter((d) => d.customerId === user.id || d.accountId === user.accountId);
    }
    return [];
  }

  /**
   * Get authorized activities for the current user
   */
  async getAuthorizedActivities(user) {
    if (!user) return [];
    const all = await this.getActivities();

    if (user.role === "sales_manager") {
      return all; // Manager sees all team activities
    }
    if (user.role === "account_owner") {
      const accounts = await this.getAuthorizedAccounts(user);
      const accIds = new Set(accounts.map((a) => a.id));
      const deals = await this.getAuthorizedDeals(user);
      const dealIds = new Set(deals.map((d) => d.id));
      return all.filter((a) => dealIds.has(a.dealId) || a.assignedTo === user.id);
    }
    if (user.role === "sales_rep") {
      return all.filter((a) => a.assignedTo === user.id || a.createdBy === user.id);
    }
    if (user.role === "customer") {
      const customerDeals = await this.getAuthorizedDeals(user);
      const dealIds = new Set(customerDeals.map((d) => d.id));
      return all.filter((a) => dealIds.has(a.dealId));
    }
    return [];
  }

  /**
   * Get authorized accounts for the current user
   */
  async getAuthorizedAccounts(user) {
    if (!user) return [];
    const all = await this.getAccounts();

    if (user.role === "sales_manager") {
      return all;
    }
    if (user.role === "account_owner") {
      return all.filter((a) => a.accountOwnerId === user.id);
    }
    if (user.role === "sales_rep") {
      return all.filter((a) => a.assignedSalesRepId === user.id);
    }
    if (user.role === "customer") {
      return all.filter((a) => a.id === user.accountId || a.customerId === user.id);
    }
    return [];
  }

  /**
   * Get authorized quotes for the current user
   */
  async getAuthorizedQuotes(user) {
    if (!user) return [];
    const all = await this.getQuotes();

    if (user.role === "sales_manager" || user.role === "account_owner") {
      return all;
    }
    if (user.role === "sales_rep") {
      const myDeals = await this.getAuthorizedDeals(user);
      const dealIds = new Set(myDeals.map((d) => d.id));
      return all.filter((q) => dealIds.has(q.dealId));
    }
    if (user.role === "customer") {
      return all.filter((q) => q.customerId === user.id || q.accountId === user.accountId);
    }
    return [];
  }

  /**
   * Get authorized customer inquiries
   */
  async getAuthorizedInquiries(user) {
    if (!user) return [];
    const all = await this.getInquiries();

    if (user.role === "sales_manager" || user.role === "account_owner") {
      return all;
    }
    if (user.role === "sales_rep") {
      return all.filter((i) => i.assignedSalesRepId === user.id);
    }
    if (user.role === "customer") {
      return all.filter((i) => i.customerId === user.id);
    }
    return [];
  }

  /**
   * Get user-targeted notifications
   */
  async getAuthorizedNotifications(user) {
    if (!user) return [];
    const all = await this.getNotifications();
    return all.filter(
      (n) =>
        n.recipientId === user.id ||
        n.recipientRole === user.role ||
        n.recipientId === "all"
    );
  }

  // -------------------------------------------------------------
  // Transactional Actions with Real-Time Event Dispatching
  // -------------------------------------------------------------

  /**
   * Create or Save a Contact
   */
  async saveContact(contactData, actorUser) {
    const all = await this.getContacts();
    let saved;
    if (contactData.id) {
      saved = { ...contactData, updatedAt: Date.now() };
      const updated = all.map((c) => (c.id === saved.id ? saved : c));
      await setJSON("shared_contacts", updated);
    } else {
      saved = {
        ...contactData,
        id: uid(),
        assignedSalesRepId: contactData.assignedSalesRepId || actorUser.id,
        accountOwnerId: contactData.accountOwnerId || "accounts-1",
        createdAt: Date.now(),
      };
      await setJSON("shared_contacts", [saved, ...all]);
    }

    await this._recordAudit({
      actorId: actorUser.id,
      action: contactData.id ? "UPDATE_CONTACT" : "CREATE_CONTACT",
      entityType: "contact",
      entityId: saved.id,
      details: `Contact "${saved.name}" saved by ${actorUser.name}.`,
    });

    notificationBus.publish({
      type: "contact_saved",
      entityId: saved.id,
      actorId: actorUser.id,
    });

    return saved;
  }

  /**
   * Reassign a Lead/Contact to another Sales Rep
   * Triggers targeted notification ONLY to the newly assigned Sales Rep
   */
  async reassignLead(contactId, newSalesRepId, actorUser) {
    const contacts = await this.getContacts();
    const contact = contacts.find((c) => c.id === contactId);
    if (!contact) throw new Error("Contact not found");

    const prevRepId = contact.assignedSalesRepId;
    const newRep = USERS.find((u) => u.id === newSalesRepId);

    const updated = contacts.map((c) =>
      c.id === contactId ? { ...c, assignedSalesRepId: newSalesRepId } : c
    );
    await setJSON("shared_contacts", updated);

    // Also update all attached open deals
    const deals = await this.getDeals();
    const updatedDeals = deals.map((d) =>
      d.contactId === contactId && d.stage !== "won" && d.stage !== "lost"
        ? { ...d, ownerId: newSalesRepId, assignedSalesRepId: newSalesRepId }
        : d
    );
    await setJSON("shared_deals", updatedDeals);

    // Create targeted notification for the new rep
    await this.createNotification({
      recipientId: newSalesRepId,
      recipientRole: "sales_rep",
      title: "New Lead Assigned to You",
      message: `${actorUser.name} reassigned lead "${contact.name}" (${contact.company || "Client"}) to your pipeline.`,
      type: "info",
      link: `/contacts?contactId=${contactId}`,
    });

    await this._recordAudit({
      actorId: actorUser.id,
      action: "REASSIGN_LEAD",
      entityType: "contact",
      entityId: contactId,
      details: `Reassigned "${contact.name}" from ${prevRepId} to ${newRep?.name || newSalesRepId}.`,
    });

    notificationBus.publish({
      type: "lead_reassigned",
      contactId,
      newSalesRepId,
      actorId: actorUser.id,
    });

    return contact;
  }

  /**
   * Create or Save a Deal
   */
  async saveDeal(dealData, actorUser) {
    const all = await this.getDeals();
    let saved;
    const isHighValue = (Number(dealData.value) || 0) >= 50000;

    if (dealData.id) {
      saved = {
        ...dealData,
        value: Number(dealData.value) || 0,
        updatedAt: Date.now(),
      };
      const updated = all.map((d) => (d.id === saved.id ? saved : d));
      await setJSON("shared_deals", updated);
    } else {
      saved = {
        ...dealData,
        id: uid(),
        ownerId: dealData.ownerId || actorUser.id,
        assignedSalesRepId: dealData.assignedSalesRepId || actorUser.id,
        accountOwnerId: dealData.accountOwnerId || "accounts-1",
        value: Number(dealData.value) || 0,
        approvalStatus: isHighValue ? "pending_manager_approval" : "approved",
        createdAt: Date.now(),
      };
      await setJSON("shared_deals", [saved, ...all]);

      // If high-value deal created by a rep, automatically notify the Sales Manager
      if (isHighValue && actorUser.role === "sales_rep") {
        await this.createNotification({
          recipientId: "manager-1",
          recipientRole: "sales_manager",
          title: `High-Value Deal Created ($${saved.value.toLocaleString()})`,
          message: `${actorUser.name} created high-value opportunity "${saved.title}". Requires review.`,
          type: "urgent",
          link: `/deals?dealId=${saved.id}`,
        });
      }
    }

    await this._recordAudit({
      actorId: actorUser.id,
      action: dealData.id ? "UPDATE_DEAL" : "CREATE_DEAL",
      entityType: "deal",
      entityId: saved.id,
      details: `Deal "${saved.title}" ($${saved.value.toLocaleString()}) saved by ${actorUser.name}.`,
    });

    notificationBus.publish({
      type: "deal_saved",
      entityId: saved.id,
      actorId: actorUser.id,
    });

    return saved;
  }

  /**
   * Update Deal Stage (e.g. advance to won, proposal, etc.)
   */
  async updateDealStage(dealId, newStage, actorUser) {
    const deals = await this.getDeals();
    const deal = deals.find((d) => d.id === dealId);
    if (!deal) throw new Error("Deal not found");

    const prevStage = deal.stage;
    const updated = deals.map((d) =>
      d.id === dealId ? { ...d, stage: newStage, updatedAt: Date.now() } : d
    );
    await setJSON("shared_deals", updated);

    // If deal becomes WON, notify the Sales Manager and Account Owner
    if (newStage === "won" && prevStage !== "won") {
      await this.createNotification({
        recipientId: "manager-1",
        recipientRole: "sales_manager",
        title: `Deal Won! ($${(deal.value || 0).toLocaleString()})`,
        message: `${actorUser.name} marked "${deal.title}" as Closed Won! Revenue recognized.`,
        type: "positive",
        link: `/deals?dealId=${dealId}`,
      });

      await this.createNotification({
        recipientId: "accounts-1",
        recipientRole: "account_owner",
        title: `New Account Revenue ($${(deal.value || 0).toLocaleString()})`,
        message: `Won deal "${deal.title}" is ready for onboarding & account management.`,
        type: "positive",
        link: `/accounts?dealId=${dealId}`,
      });
    }

    await this._recordAudit({
      actorId: actorUser.id,
      action: "UPDATE_DEAL_STAGE",
      entityType: "deal",
      entityId: dealId,
      details: `Stage changed from "${prevStage}" to "${newStage}" by ${actorUser.name}.`,
    });

    notificationBus.publish({
      type: "deal_stage_updated",
      dealId,
      prevStage,
      newStage,
      actorId: actorUser.id,
    });

    return deal;
  }

  /**
   * Manager Approves a Deal
   */
  async approveDeal(dealId, actorUser) {
    const deals = await this.getDeals();
    const deal = deals.find((d) => d.id === dealId);
    if (!deal) throw new Error("Deal not found");

    const updated = deals.map((d) =>
      d.id === dealId
        ? {
            ...d,
            approvalStatus: "approved",
            approvedBy: actorUser.id,
            approvedAt: Date.now(),
          }
        : d
    );
    await setJSON("shared_deals", updated);

    // Notify the deal owner (Sales Rep)
    await this.createNotification({
      recipientId: deal.ownerId || deal.assignedSalesRepId,
      recipientRole: "sales_rep",
      title: "Deal Approved by Sales Manager",
      message: `${actorUser.name} approved your deal "${deal.title}" ($${(deal.value || 0).toLocaleString()}). You can now proceed to closing.`,
      type: "positive",
      link: `/deals?dealId=${dealId}`,
    });

    await this._recordAudit({
      actorId: actorUser.id,
      action: "APPROVE_DEAL",
      entityType: "deal",
      entityId: dealId,
      details: `Deal "${deal.title}" approved by Manager ${actorUser.name}.`,
    });

    notificationBus.publish({
      type: "deal_approved",
      dealId,
      ownerId: deal.ownerId,
      actorId: actorUser.id,
    });
  }

  /**
   * Manager Requests Revisions on a Deal
   */
  async rejectDeal(dealId, feedback, actorUser) {
    const deals = await this.getDeals();
    const deal = deals.find((d) => d.id === dealId);
    if (!deal) throw new Error("Deal not found");

    const updated = deals.map((d) =>
      d.id === dealId
        ? {
            ...d,
            approvalStatus: "revision_requested",
            managerFeedback: feedback,
            rejectedAt: Date.now(),
          }
        : d
    );
    await setJSON("shared_deals", updated);

    // Notify the deal owner (Sales Rep)
    await this.createNotification({
      recipientId: deal.ownerId || deal.assignedSalesRepId,
      recipientRole: "sales_rep",
      title: "Revisions Requested on Deal",
      message: `${actorUser.name} requested revisions on "${deal.title}": "${feedback || "Please review pricing terms"}"`,
      type: "urgent",
      link: `/deals?dealId=${dealId}`,
    });

    await this._recordAudit({
      actorId: actorUser.id,
      action: "REJECT_DEAL",
      entityType: "deal",
      entityId: dealId,
      details: `Revisions requested on "${deal.title}" by ${actorUser.name}.`,
    });

    notificationBus.publish({
      type: "deal_revisions_requested",
      dealId,
      ownerId: deal.ownerId,
      actorId: actorUser.id,
    });
  }

  /**
   * Customer Submits Support / Sales Inquiry
   */
  async sendCustomerInquiry({ subject, message, customerUser }) {
    const all = await this.getInquiries();
    const assignedRepId = customerUser.assignedSalesRepId || "rep-1";

    const newInquiry = {
      id: "inq_" + uid(),
      customerId: customerUser.id,
      accountId: customerUser.accountId || "acc_acme",
      customerName: customerUser.name,
      customerCompany: customerUser.company || "Client Account",
      assignedSalesRepId: assignedRepId,
      accountOwnerId: customerUser.accountOwnerId || "accounts-1",
      subject,
      message,
      status: "Open",
      priority: "Normal",
      replyMessage: null,
      replyDate: null,
      createdAt: Date.now(),
    };

    await setJSON("shared_inquiries", [newInquiry, ...all]);

    // Notify the assigned Sales Rep in real time
    await this.createNotification({
      recipientId: assignedRepId,
      recipientRole: "sales_rep",
      title: `Inquiry from ${customerUser.name} (${customerUser.company || "Customer"})`,
      message: `"${subject}" — ${message.slice(0, 80)}...`,
      type: "info",
      link: `/inquiries?inquiryId=${newInquiry.id}`,
    });

    await this._recordAudit({
      actorId: customerUser.id,
      action: "CUSTOMER_INQUIRY",
      entityType: "inquiry",
      entityId: newInquiry.id,
      details: `Inquiry submitted by ${customerUser.name}.`,
    });

    notificationBus.publish({
      type: "inquiry_received",
      inquiryId: newInquiry.id,
      assignedSalesRepId: assignedRepId,
    });

    return newInquiry;
  }

  /**
   * Sales Rep or Manager Replies to Customer Inquiry
   */
  async replyToCustomerInquiry(inquiryId, replyMessage, actorUser) {
    const inquiries = await this.getInquiries();
    const inquiry = inquiries.find((i) => i.id === inquiryId);
    if (!inquiry) throw new Error("Inquiry not found");

    const updated = inquiries.map((i) =>
      i.id === inquiryId
        ? {
            ...i,
            status: "Resolved",
            replyMessage,
            replyDate: Date.now(),
            repliedBy: actorUser.name,
          }
        : i
    );
    await setJSON("shared_inquiries", updated);

    // Notify the Customer in real time
    await this.createNotification({
      recipientId: inquiry.customerId,
      recipientRole: "customer",
      title: `Reply to your inquiry from ${actorUser.name}`,
      message: `"${replyMessage.slice(0, 100)}..."`,
      type: "positive",
      link: `/support?inquiryId=${inquiryId}`,
    });

    await this._recordAudit({
      actorId: actorUser.id,
      action: "REPLY_INQUIRY",
      entityType: "inquiry",
      entityId: inquiryId,
      details: `Inquiry replied by ${actorUser.name}.`,
    });

    notificationBus.publish({
      type: "inquiry_replied",
      inquiryId,
      customerId: inquiry.customerId,
    });
  }

  /**
   * Save / Toggle Activity
   */
  async saveActivity(activityData, actorUser) {
    const all = await this.getActivities();
    let saved;
    if (activityData.id) {
      saved = { ...activityData, updatedAt: Date.now() };
      const updated = all.map((a) => (a.id === saved.id ? saved : a));
      await setJSON("shared_activities", updated);
    } else {
      saved = {
        ...activityData,
        id: uid(),
        assignedTo: activityData.assignedTo || actorUser.id,
        createdBy: actorUser.id,
        completed: Boolean(activityData.completed),
        createdAt: Date.now(),
      };
      await setJSON("shared_activities", [saved, ...all]);

      // If task assigned to another user, notify them
      if (saved.assignedTo && saved.assignedTo !== actorUser.id) {
        await this.createNotification({
          recipientId: saved.assignedTo,
          recipientRole: "sales_rep",
          title: "New Task Assigned to You",
          message: `${actorUser.name} assigned task: "${saved.title}".`,
          type: "info",
          link: `/activities?activityId=${saved.id}`,
        });
      }
    }

    notificationBus.publish({
      type: "activity_saved",
      entityId: saved.id,
    });

    return saved;
  }

  async toggleActivityCompleted(activityId, actorUser) {
    const all = await this.getActivities();
    const item = all.find((a) => a.id === activityId);
    if (!item) return;

    const updated = all.map((a) =>
      a.id === activityId ? { ...a, completed: !a.completed } : a
    );
    await setJSON("shared_activities", updated);

    notificationBus.publish({
      type: "activity_toggled",
      activityId,
      completed: !item.completed,
    });
  }

  /**
   * Create Real-Time Targeted Notification
   */
  async createNotification({ recipientId, recipientRole, title, message, type = "info", link = "" }) {
    const all = await this.getNotifications();
    const notif = {
      id: "notif_" + uid(),
      recipientId,
      recipientRole,
      title,
      message,
      type,
      time: "Just now",
      read: false,
      link,
      createdAt: Date.now(),
    };

    await setJSON("shared_notifications", [notif, ...all]);

    // Dispatch via real-time bus
    notificationBus.publish({
      type: "notification_created",
      recipientId,
      recipientRole,
      notification: notif,
    });

    return notif;
  }

  async markNotificationRead(notifId) {
    const all = await this.getNotifications();
    const updated = all.map((n) => (n.id === notifId ? { ...n, read: true } : n));
    await setJSON("shared_notifications", updated);
    notificationBus.publish({ type: "notification_read", notifId });
  }

  async markAllNotificationsRead(user) {
    const all = await this.getNotifications();
    const updated = all.map((n) =>
      n.recipientId === user.id || n.recipientRole === user.role
        ? { ...n, read: true }
        : n
    );
    await setJSON("shared_notifications", updated);
    notificationBus.publish({ type: "notifications_all_read", userId: user.id });
  }

  async clearNotifications(user) {
    const all = await this.getNotifications();
    const remaining = all.filter(
      (n) => n.recipientId !== user.id && n.recipientRole !== user.role
    );
    await setJSON("shared_notifications", remaining);
    notificationBus.publish({ type: "notifications_cleared", userId: user.id });
  }

  async _recordAudit({ actorId, action, entityType, entityId, details }) {
    const logs = await this.getAuditLogs();
    const entry = {
      id: "aud_" + uid(),
      actorId,
      action,
      entityType,
      entityId,
      details,
      timestamp: new Date().toISOString(),
    };
    await setJSON("shared_audit_logs", [entry, ...logs.slice(0, 100)]);
  }

  /**
   * Reset central database to canonical seed state
   */
  async resetDatabase() {
    await Promise.all([
      setJSON("shared_accounts", SEED_ACCOUNTS),
      setJSON("shared_contacts", SEED_CONTACTS_RELATIONAL),
      setJSON("shared_deals", SEED_DEALS_RELATIONAL),
      setJSON("shared_quotes", SEED_QUOTES),
      setJSON("shared_inquiries", SEED_INQUIRIES),
      setJSON("shared_activities", SEED_ACTIVITIES_RELATIONAL),
      setJSON("shared_notifications", SEED_NOTIFICATIONS_RELATIONAL),
      setJSON("shared_audit_logs", []),
    ]);
    notificationBus.publish({ type: "database_reset" });
  }
}

export const crmBackend = new CrmBackendStore();
