import { describe, it, expect, beforeEach } from "vitest";
import { crmBackend, USERS } from "../src/backend/crmBackend.js";
import { authService, DOMAIN_CONFIG } from "../src/backend/authService.js";
import { notificationBus } from "../src/backend/notificationBus.js";

describe("Multi-Domain CRM Architecture, Registration & Security", () => {
  beforeEach(async () => {
    await crmBackend.resetDatabase();
  });

  it("authenticates credentials and maps correctly to role domains", async () => {
    // 1. Sales Rep
    const repRes = await authService.login("jordan.rep@ledgercrm.com", "password123");
    expect(repRes.user.role).toBe("sales_rep");
    expect(repRes.targetDomain).toBe("sales");
    expect(repRes.domainConfig.fullDomain).toBe("sales.ledgercrm.com");

    // 2. Sales Manager
    const mgrRes = await authService.login("elena.manager@ledgercrm.com", "password123");
    expect(mgrRes.user.role).toBe("sales_manager");
    expect(mgrRes.targetDomain).toBe("manager");
    expect(mgrRes.domainConfig.fullDomain).toBe("manager.ledgercrm.com");

    // 3. Account Owner
    const accRes = await authService.login("marcus.accounts@ledgercrm.com", "password123");
    expect(accRes.user.role).toBe("account_owner");
    expect(accRes.targetDomain).toBe("accounts");
    expect(accRes.domainConfig.fullDomain).toBe("accounts.ledgercrm.com");

    // 4. Customer
    const custRes = await authService.login("sarah.client@acmeglobal.com", "password123");
    expect(custRes.user.role).toBe("customer");
    expect(custRes.targetDomain).toBe("customer");
    expect(custRes.domainConfig.fullDomain).toBe("customer.ledgercrm.com");
  });

  it("registers a new user (Sign Up) and provisions their dedicated role domain", async () => {
    const regRes = await authService.register({
      name: "Alex Morgan",
      email: "alex.rep@enterprise.io",
      password: "securePassword123",
      role: "sales_rep",
      company: "Apex Tech Inc.",
      title: "Senior Enterprise AE",
    });

    expect(regRes.user.name).toBe("Alex Morgan");
    expect(regRes.user.role).toBe("sales_rep");
    expect(regRes.targetDomain).toBe("sales");

    // Verify user can now log in with their registered credentials
    const loginRes = await authService.login("alex.rep@enterprise.io", "securePassword123");
    expect(loginRes.user.id).toBe(regRes.user.id);
  });

  it("prevents duplicate registration with an existing email address", async () => {
    await expect(
      authService.register({
        name: "Duplicate User",
        email: "jordan.rep@ledgercrm.com", // existing email
        password: "password123",
        role: "sales_rep",
      })
    ).rejects.toThrow("already exists");
  });

  it("enforces domain security and prevents unauthorized cross-domain access", () => {
    const repUser = USERS.find((u) => u.role === "sales_rep");
    const customerUser = USERS.find((u) => u.role === "customer");

    // Rep can access sales, but NOT manager, accounts, or customer
    expect(authService.isAuthorizedForDomain(repUser, "sales")).toBe(true);
    expect(authService.isAuthorizedForDomain(repUser, "manager")).toBe(false);
    expect(authService.isAuthorizedForDomain(repUser, "accounts")).toBe(false);
    expect(authService.isAuthorizedForDomain(repUser, "customer")).toBe(false);

    // Customer can access customer portal, but NOT internal employee domains
    expect(authService.isAuthorizedForDomain(customerUser, "customer")).toBe(true);
    expect(authService.isAuthorizedForDomain(customerUser, "sales")).toBe(false);
    expect(authService.isAuthorizedForDomain(customerUser, "manager")).toBe(false);
    expect(authService.isAuthorizedForDomain(customerUser, "accounts")).toBe(false);
  });

  it("enforces work assignment data isolation across roles", async () => {
    const rep1 = USERS.find((u) => u.id === "rep-1");
    const rep2 = USERS.find((u) => u.id === "rep-2");
    const customer1 = USERS.find((u) => u.id === "customer-1");
    const customer2 = USERS.find((u) => u.id === "customer-2");

    // Rep 1 sees only deals assigned to Rep 1
    const rep1Deals = await crmBackend.getAuthorizedDeals(rep1);
    expect(rep1Deals.every((d) => d.ownerId === "rep-1" || d.assignedSalesRepId === "rep-1")).toBe(true);

    // Rep 2 sees only deals assigned to Rep 2
    const rep2Deals = await crmBackend.getAuthorizedDeals(rep2);
    expect(rep2Deals.every((d) => d.ownerId === "rep-2" || d.assignedSalesRepId === "rep-2")).toBe(true);

    // Customer 1 sees only their deals (Acme Global)
    const cust1Deals = await crmBackend.getAuthorizedDeals(customer1);
    expect(cust1Deals.every((d) => d.customerId === "customer-1" || d.accountId === "acc_acme")).toBe(true);

    // Customer 2 sees only their deals (Vandelay)
    const cust2Deals = await crmBackend.getAuthorizedDeals(customer2);
    expect(cust2Deals.every((d) => d.customerId === "customer-2" || d.accountId === "acc_vandelay")).toBe(true);
  });

  it("executes lead reassignment and notifies only the newly assigned Sales Rep", async () => {
    const manager = USERS.find((u) => u.role === "sales_manager");
    let receivedNotif = null;

    const unsubscribe = notificationBus.subscribe((event) => {
      if (event.type === "notification_created") {
        receivedNotif = event.notification;
      }
    });

    // Reassign contact c_0001 from rep-1 to rep-2
    await crmBackend.reassignLead("c_0001", "rep-2", manager);

    // Verify contact assignment updated
    const contacts = await crmBackend.getContacts();
    const contact = contacts.find((c) => c.id === "c_0001");
    expect(contact.assignedSalesRepId).toBe("rep-2");

    // Verify targeted notification was dispatched to rep-2 ONLY
    expect(receivedNotif).not.toBeNull();
    expect(receivedNotif.recipientId).toBe("rep-2");
    expect(receivedNotif.recipientRole).toBe("sales_rep");

    unsubscribe();
  });

  it("handles high-value deal approval workflow between Sales Rep and Manager", async () => {
    const manager = USERS.find((u) => u.role === "sales_manager");
    let notif = null;

    const unsubscribe = notificationBus.subscribe((event) => {
      if (event.type === "notification_created") {
        notif = event.notification;
      }
    });

    // Deal d_0001 is pending approval ($120k)
    await crmBackend.approveDeal("d_0001", manager);

    const deals = await crmBackend.getDeals();
    const deal = deals.find((d) => d.id === "d_0001");
    expect(deal.approvalStatus).toBe("approved");

    // Notification should be sent to the deal owner (rep-1)
    expect(notif).not.toBeNull();
    expect(notif.recipientId).toBe("rep-1");
    expect(notif.title).toContain("Approved");

    unsubscribe();
  });

  it("delivers customer inquiries to assigned Sales Rep in real time", async () => {
    const customer = USERS.find((u) => u.id === "customer-1");
    let receivedNotif = null;

    const unsubscribe = notificationBus.subscribe((event) => {
      if (event.type === "notification_created") {
        receivedNotif = event.notification;
      }
    });

    const inquiry = await crmBackend.sendCustomerInquiry({
      subject: "Test SLA Request",
      message: "Please provide uptime documentation for Q3.",
      customerUser: customer,
    });

    expect(inquiry.status).toBe("Open");
    expect(receivedNotif).not.toBeNull();
    expect(receivedNotif.recipientId).toBe("rep-1"); // Assigned rep for customer-1
    expect(receivedNotif.title).toContain("Sarah Lin");

    unsubscribe();
  });
});
