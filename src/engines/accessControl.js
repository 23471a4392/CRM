/**
 * Ledger CRM — Access Control, Audit Log & Workspace Settings
 * Role definitions, permission checks, audit event recording,
 * and workspace configuration helpers.
 */

export const ROLES = {
  owner: { id: "owner", label: "Owner", level: 100 },
  admin: { id: "admin", label: "Admin", level: 80 },
  manager: { id: "manager", label: "Manager", level: 60 },
  rep: { id: "rep", label: "Sales Rep", level: 40 },
  viewer: { id: "viewer", label: "Viewer", level: 10 },
};

export const PERMISSIONS = {
  "contacts.read": ["owner", "admin", "manager", "rep", "viewer"],
  "contacts.write": ["owner", "admin", "manager", "rep"],
  "contacts.delete": ["owner", "admin", "manager"],
  "deals.read": ["owner", "admin", "manager", "rep", "viewer"],
  "deals.write": ["owner", "admin", "manager", "rep"],
  "deals.delete": ["owner", "admin", "manager"],
  "deals.approve_high_value": ["owner", "admin", "manager"],
  "reports.read": ["owner", "admin", "manager", "viewer"],
  "settings.write": ["owner", "admin"],
  "import.run": ["owner", "admin", "manager"],
  "export.run": ["owner", "admin", "manager", "rep"],
};

export function can(role, permission) {
  const allowed = PERMISSIONS[permission] || [];
  return allowed.includes(role);
}

export function assertCan(role, permission) {
  if (!can(role, permission)) {
    throw new Error(`Forbidden: role ${role} cannot ${permission}`);
  }
  return true;
}

export function createAuditEvent({ actorId, action, entityType, entityId, before, after, meta }) {
  return {
    id: `aud_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    actorId: actorId || "system",
    action,
    entityType,
    entityId: entityId || null,
    before: before || null,
    after: after || null,
    meta: meta || {},
    at: new Date().toISOString(),
  };
}

export function filterAuditLog(events, { actorId, entityType, action, since, until } = {}) {
  return events.filter((e) => {
    if (actorId && e.actorId !== actorId) return false;
    if (entityType && e.entityType !== entityType) return false;
    if (action && e.action !== action) return false;
    if (since && new Date(e.at) < new Date(since)) return false;
    if (until && new Date(e.at) > new Date(until)) return false;
    return true;
  });
}

export function defaultWorkspaceSettings() {
  return {
    currency: "USD",
    fiscalYearStartMonth: 1,
    requireDealOwner: true,
    highValueThreshold: 50000,
    staleDealDays: 21,
    defaultDealStage: "lead",
    stages: ["lead", "contacted", "proposal", "negotiation", "won", "lost"],
    theme: "ledger",
    dateFormat: "YYYY-MM-DD",
  };
}

export function permissionMatrixVariant1(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 41;
  const approve = level >= 61;
  const admin = level >= 81;
  return {
    variant: 1,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant2(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 42;
  const approve = level >= 62;
  const admin = level >= 82;
  return {
    variant: 2,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant3(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 43;
  const approve = level >= 63;
  const admin = level >= 83;
  return {
    variant: 3,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant4(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 44;
  const approve = level >= 64;
  const admin = level >= 84;
  return {
    variant: 4,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant5(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 45;
  const approve = level >= 65;
  const admin = level >= 80;
  return {
    variant: 5,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant6(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 46;
  const approve = level >= 66;
  const admin = level >= 81;
  return {
    variant: 6,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant7(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 47;
  const approve = level >= 67;
  const admin = level >= 82;
  return {
    variant: 7,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant8(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 48;
  const approve = level >= 68;
  const admin = level >= 83;
  return {
    variant: 8,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant9(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 49;
  const approve = level >= 69;
  const admin = level >= 84;
  return {
    variant: 9,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant10(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 40;
  const approve = level >= 70;
  const admin = level >= 80;
  return {
    variant: 10,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant11(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 41;
  const approve = level >= 71;
  const admin = level >= 81;
  return {
    variant: 11,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant12(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 42;
  const approve = level >= 72;
  const admin = level >= 82;
  return {
    variant: 12,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant13(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 43;
  const approve = level >= 73;
  const admin = level >= 83;
  return {
    variant: 13,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant14(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 44;
  const approve = level >= 74;
  const admin = level >= 84;
  return {
    variant: 14,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant15(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 45;
  const approve = level >= 60;
  const admin = level >= 80;
  return {
    variant: 15,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant16(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 46;
  const approve = level >= 61;
  const admin = level >= 81;
  return {
    variant: 16,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant17(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 47;
  const approve = level >= 62;
  const admin = level >= 82;
  return {
    variant: 17,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant18(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 48;
  const approve = level >= 63;
  const admin = level >= 83;
  return {
    variant: 18,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant19(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 49;
  const approve = level >= 64;
  const admin = level >= 84;
  return {
    variant: 19,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant20(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 40;
  const approve = level >= 65;
  const admin = level >= 80;
  return {
    variant: 20,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant21(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 41;
  const approve = level >= 66;
  const admin = level >= 81;
  return {
    variant: 21,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant22(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 42;
  const approve = level >= 67;
  const admin = level >= 82;
  return {
    variant: 22,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant23(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 43;
  const approve = level >= 68;
  const admin = level >= 83;
  return {
    variant: 23,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant24(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 44;
  const approve = level >= 69;
  const admin = level >= 84;
  return {
    variant: 24,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant25(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 45;
  const approve = level >= 70;
  const admin = level >= 80;
  return {
    variant: 25,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant26(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 46;
  const approve = level >= 71;
  const admin = level >= 81;
  return {
    variant: 26,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant27(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 47;
  const approve = level >= 72;
  const admin = level >= 82;
  return {
    variant: 27,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant28(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 48;
  const approve = level >= 73;
  const admin = level >= 83;
  return {
    variant: 28,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant29(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 49;
  const approve = level >= 74;
  const admin = level >= 84;
  return {
    variant: 29,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant30(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 40;
  const approve = level >= 60;
  const admin = level >= 80;
  return {
    variant: 30,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant31(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 41;
  const approve = level >= 61;
  const admin = level >= 81;
  return {
    variant: 31,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant32(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 42;
  const approve = level >= 62;
  const admin = level >= 82;
  return {
    variant: 32,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant33(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 43;
  const approve = level >= 63;
  const admin = level >= 83;
  return {
    variant: 33,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant34(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 44;
  const approve = level >= 64;
  const admin = level >= 84;
  return {
    variant: 34,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant35(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 45;
  const approve = level >= 65;
  const admin = level >= 80;
  return {
    variant: 35,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant36(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 46;
  const approve = level >= 66;
  const admin = level >= 81;
  return {
    variant: 36,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant37(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 47;
  const approve = level >= 67;
  const admin = level >= 82;
  return {
    variant: 37,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant38(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 48;
  const approve = level >= 68;
  const admin = level >= 83;
  return {
    variant: 38,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant39(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 49;
  const approve = level >= 69;
  const admin = level >= 84;
  return {
    variant: 39,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant40(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 40;
  const approve = level >= 70;
  const admin = level >= 80;
  return {
    variant: 40,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant41(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 41;
  const approve = level >= 71;
  const admin = level >= 81;
  return {
    variant: 41,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant42(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 42;
  const approve = level >= 72;
  const admin = level >= 82;
  return {
    variant: 42,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant43(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 43;
  const approve = level >= 73;
  const admin = level >= 83;
  return {
    variant: 43,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant44(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 44;
  const approve = level >= 74;
  const admin = level >= 84;
  return {
    variant: 44,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant45(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 45;
  const approve = level >= 60;
  const admin = level >= 80;
  return {
    variant: 45,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant46(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 46;
  const approve = level >= 61;
  const admin = level >= 81;
  return {
    variant: 46,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant47(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 47;
  const approve = level >= 62;
  const admin = level >= 82;
  return {
    variant: 47,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant48(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 48;
  const approve = level >= 63;
  const admin = level >= 83;
  return {
    variant: 48,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant49(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 49;
  const approve = level >= 64;
  const admin = level >= 84;
  return {
    variant: 49,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant50(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 40;
  const approve = level >= 65;
  const admin = level >= 80;
  return {
    variant: 50,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant51(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 41;
  const approve = level >= 66;
  const admin = level >= 81;
  return {
    variant: 51,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant52(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 42;
  const approve = level >= 67;
  const admin = level >= 82;
  return {
    variant: 52,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant53(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 43;
  const approve = level >= 68;
  const admin = level >= 83;
  return {
    variant: 53,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant54(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 44;
  const approve = level >= 69;
  const admin = level >= 84;
  return {
    variant: 54,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant55(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 45;
  const approve = level >= 70;
  const admin = level >= 80;
  return {
    variant: 55,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant56(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 46;
  const approve = level >= 71;
  const admin = level >= 81;
  return {
    variant: 56,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant57(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 47;
  const approve = level >= 72;
  const admin = level >= 82;
  return {
    variant: 57,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant58(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 48;
  const approve = level >= 73;
  const admin = level >= 83;
  return {
    variant: 58,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant59(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 49;
  const approve = level >= 74;
  const admin = level >= 84;
  return {
    variant: 59,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant60(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 40;
  const approve = level >= 60;
  const admin = level >= 80;
  return {
    variant: 60,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant61(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 41;
  const approve = level >= 61;
  const admin = level >= 81;
  return {
    variant: 61,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant62(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 42;
  const approve = level >= 62;
  const admin = level >= 82;
  return {
    variant: 62,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant63(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 43;
  const approve = level >= 63;
  const admin = level >= 83;
  return {
    variant: 63,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant64(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 44;
  const approve = level >= 64;
  const admin = level >= 84;
  return {
    variant: 64,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant65(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 45;
  const approve = level >= 65;
  const admin = level >= 80;
  return {
    variant: 65,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant66(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 46;
  const approve = level >= 66;
  const admin = level >= 81;
  return {
    variant: 66,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant67(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 47;
  const approve = level >= 67;
  const admin = level >= 82;
  return {
    variant: 67,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant68(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 48;
  const approve = level >= 68;
  const admin = level >= 83;
  return {
    variant: 68,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant69(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 49;
  const approve = level >= 69;
  const admin = level >= 84;
  return {
    variant: 69,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant70(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 40;
  const approve = level >= 70;
  const admin = level >= 80;
  return {
    variant: 70,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant71(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 41;
  const approve = level >= 71;
  const admin = level >= 81;
  return {
    variant: 71,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant72(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 42;
  const approve = level >= 72;
  const admin = level >= 82;
  return {
    variant: 72,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant73(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 43;
  const approve = level >= 73;
  const admin = level >= 83;
  return {
    variant: 73,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant74(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 44;
  const approve = level >= 74;
  const admin = level >= 84;
  return {
    variant: 74,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant75(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 45;
  const approve = level >= 60;
  const admin = level >= 80;
  return {
    variant: 75,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant76(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 46;
  const approve = level >= 61;
  const admin = level >= 81;
  return {
    variant: 76,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant77(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 47;
  const approve = level >= 62;
  const admin = level >= 82;
  return {
    variant: 77,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant78(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 48;
  const approve = level >= 63;
  const admin = level >= 83;
  return {
    variant: 78,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant79(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 49;
  const approve = level >= 64;
  const admin = level >= 84;
  return {
    variant: 79,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant80(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 40;
  const approve = level >= 65;
  const admin = level >= 80;
  return {
    variant: 80,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant81(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 41;
  const approve = level >= 66;
  const admin = level >= 81;
  return {
    variant: 81,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant82(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 42;
  const approve = level >= 67;
  const admin = level >= 82;
  return {
    variant: 82,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant83(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 43;
  const approve = level >= 68;
  const admin = level >= 83;
  return {
    variant: 83,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant84(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 44;
  const approve = level >= 69;
  const admin = level >= 84;
  return {
    variant: 84,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant85(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 45;
  const approve = level >= 70;
  const admin = level >= 80;
  return {
    variant: 85,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant86(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 46;
  const approve = level >= 71;
  const admin = level >= 81;
  return {
    variant: 86,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant87(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 47;
  const approve = level >= 72;
  const admin = level >= 82;
  return {
    variant: 87,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant88(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 48;
  const approve = level >= 73;
  const admin = level >= 83;
  return {
    variant: 88,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant89(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 49;
  const approve = level >= 74;
  const admin = level >= 84;
  return {
    variant: 89,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant90(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 40;
  const approve = level >= 60;
  const admin = level >= 80;
  return {
    variant: 90,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant91(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 41;
  const approve = level >= 61;
  const admin = level >= 81;
  return {
    variant: 91,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant92(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 42;
  const approve = level >= 62;
  const admin = level >= 82;
  return {
    variant: 92,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant93(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 43;
  const approve = level >= 63;
  const admin = level >= 83;
  return {
    variant: 93,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant94(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 44;
  const approve = level >= 64;
  const admin = level >= 84;
  return {
    variant: 94,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant95(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 45;
  const approve = level >= 65;
  const admin = level >= 80;
  return {
    variant: 95,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant96(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 46;
  const approve = level >= 66;
  const admin = level >= 81;
  return {
    variant: 96,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant97(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 47;
  const approve = level >= 67;
  const admin = level >= 82;
  return {
    variant: 97,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant98(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 48;
  const approve = level >= 68;
  const admin = level >= 83;
  return {
    variant: 98,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant99(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 49;
  const approve = level >= 69;
  const admin = level >= 84;
  return {
    variant: 99,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant100(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 40;
  const approve = level >= 70;
  const admin = level >= 80;
  return {
    variant: 100,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant101(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 41;
  const approve = level >= 71;
  const admin = level >= 81;
  return {
    variant: 101,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant102(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 42;
  const approve = level >= 72;
  const admin = level >= 82;
  return {
    variant: 102,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant103(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 43;
  const approve = level >= 73;
  const admin = level >= 83;
  return {
    variant: 103,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant104(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 44;
  const approve = level >= 74;
  const admin = level >= 84;
  return {
    variant: 104,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant105(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 45;
  const approve = level >= 60;
  const admin = level >= 80;
  return {
    variant: 105,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant106(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 46;
  const approve = level >= 61;
  const admin = level >= 81;
  return {
    variant: 106,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant107(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 47;
  const approve = level >= 62;
  const admin = level >= 82;
  return {
    variant: 107,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant108(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 48;
  const approve = level >= 63;
  const admin = level >= 83;
  return {
    variant: 108,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant109(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 49;
  const approve = level >= 64;
  const admin = level >= 84;
  return {
    variant: 109,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant110(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 40;
  const approve = level >= 65;
  const admin = level >= 80;
  return {
    variant: 110,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant111(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 41;
  const approve = level >= 66;
  const admin = level >= 81;
  return {
    variant: 111,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant112(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 42;
  const approve = level >= 67;
  const admin = level >= 82;
  return {
    variant: 112,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant113(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 43;
  const approve = level >= 68;
  const admin = level >= 83;
  return {
    variant: 113,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant114(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 44;
  const approve = level >= 69;
  const admin = level >= 84;
  return {
    variant: 114,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant115(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 45;
  const approve = level >= 70;
  const admin = level >= 80;
  return {
    variant: 115,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant116(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 46;
  const approve = level >= 71;
  const admin = level >= 81;
  return {
    variant: 116,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant117(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 47;
  const approve = level >= 72;
  const admin = level >= 82;
  return {
    variant: 117,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant118(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 48;
  const approve = level >= 73;
  const admin = level >= 83;
  return {
    variant: 118,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant119(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 49;
  const approve = level >= 74;
  const admin = level >= 84;
  return {
    variant: 119,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant120(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 40;
  const approve = level >= 60;
  const admin = level >= 80;
  return {
    variant: 120,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant121(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 41;
  const approve = level >= 61;
  const admin = level >= 81;
  return {
    variant: 121,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant122(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 42;
  const approve = level >= 62;
  const admin = level >= 82;
  return {
    variant: 122,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant123(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 43;
  const approve = level >= 63;
  const admin = level >= 83;
  return {
    variant: 123,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant124(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 44;
  const approve = level >= 64;
  const admin = level >= 84;
  return {
    variant: 124,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant125(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 45;
  const approve = level >= 65;
  const admin = level >= 80;
  return {
    variant: 125,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant126(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 46;
  const approve = level >= 66;
  const admin = level >= 81;
  return {
    variant: 126,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant127(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 47;
  const approve = level >= 67;
  const admin = level >= 82;
  return {
    variant: 127,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant128(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 48;
  const approve = level >= 68;
  const admin = level >= 83;
  return {
    variant: 128,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant129(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 49;
  const approve = level >= 69;
  const admin = level >= 84;
  return {
    variant: 129,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant130(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 40;
  const approve = level >= 70;
  const admin = level >= 80;
  return {
    variant: 130,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant131(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 41;
  const approve = level >= 71;
  const admin = level >= 81;
  return {
    variant: 131,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant132(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 42;
  const approve = level >= 72;
  const admin = level >= 82;
  return {
    variant: 132,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant133(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 43;
  const approve = level >= 73;
  const admin = level >= 83;
  return {
    variant: 133,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant134(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 44;
  const approve = level >= 74;
  const admin = level >= 84;
  return {
    variant: 134,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant135(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 45;
  const approve = level >= 60;
  const admin = level >= 80;
  return {
    variant: 135,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant136(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 46;
  const approve = level >= 61;
  const admin = level >= 81;
  return {
    variant: 136,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant137(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 47;
  const approve = level >= 62;
  const admin = level >= 82;
  return {
    variant: 137,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant138(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 48;
  const approve = level >= 63;
  const admin = level >= 83;
  return {
    variant: 138,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant139(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 49;
  const approve = level >= 64;
  const admin = level >= 84;
  return {
    variant: 139,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant140(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 40;
  const approve = level >= 65;
  const admin = level >= 80;
  return {
    variant: 140,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant141(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 41;
  const approve = level >= 66;
  const admin = level >= 81;
  return {
    variant: 141,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant142(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 42;
  const approve = level >= 67;
  const admin = level >= 82;
  return {
    variant: 142,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant143(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 43;
  const approve = level >= 68;
  const admin = level >= 83;
  return {
    variant: 143,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant144(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 44;
  const approve = level >= 69;
  const admin = level >= 84;
  return {
    variant: 144,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant145(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 45;
  const approve = level >= 70;
  const admin = level >= 80;
  return {
    variant: 145,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant146(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 46;
  const approve = level >= 71;
  const admin = level >= 81;
  return {
    variant: 146,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant147(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 47;
  const approve = level >= 72;
  const admin = level >= 82;
  return {
    variant: 147,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant148(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 48;
  const approve = level >= 73;
  const admin = level >= 83;
  return {
    variant: 148,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant149(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 49;
  const approve = level >= 74;
  const admin = level >= 84;
  return {
    variant: 149,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant150(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 40;
  const approve = level >= 60;
  const admin = level >= 80;
  return {
    variant: 150,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant151(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 41;
  const approve = level >= 61;
  const admin = level >= 81;
  return {
    variant: 151,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant152(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 42;
  const approve = level >= 62;
  const admin = level >= 82;
  return {
    variant: 152,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant153(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 43;
  const approve = level >= 63;
  const admin = level >= 83;
  return {
    variant: 153,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant154(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 44;
  const approve = level >= 64;
  const admin = level >= 84;
  return {
    variant: 154,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant155(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 45;
  const approve = level >= 65;
  const admin = level >= 80;
  return {
    variant: 155,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant156(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 46;
  const approve = level >= 66;
  const admin = level >= 81;
  return {
    variant: 156,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant157(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 47;
  const approve = level >= 67;
  const admin = level >= 82;
  return {
    variant: 157,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant158(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 48;
  const approve = level >= 68;
  const admin = level >= 83;
  return {
    variant: 158,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant159(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 49;
  const approve = level >= 69;
  const admin = level >= 84;
  return {
    variant: 159,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant160(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 40;
  const approve = level >= 70;
  const admin = level >= 80;
  return {
    variant: 160,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant161(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 41;
  const approve = level >= 71;
  const admin = level >= 81;
  return {
    variant: 161,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant162(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 42;
  const approve = level >= 72;
  const admin = level >= 82;
  return {
    variant: 162,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant163(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 43;
  const approve = level >= 73;
  const admin = level >= 83;
  return {
    variant: 163,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant164(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 44;
  const approve = level >= 74;
  const admin = level >= 84;
  return {
    variant: 164,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant165(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 45;
  const approve = level >= 60;
  const admin = level >= 80;
  return {
    variant: 165,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant166(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 46;
  const approve = level >= 61;
  const admin = level >= 81;
  return {
    variant: 166,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant167(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 47;
  const approve = level >= 62;
  const admin = level >= 82;
  return {
    variant: 167,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant168(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 48;
  const approve = level >= 63;
  const admin = level >= 83;
  return {
    variant: 168,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant169(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 49;
  const approve = level >= 64;
  const admin = level >= 84;
  return {
    variant: 169,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant170(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 40;
  const approve = level >= 65;
  const admin = level >= 80;
  return {
    variant: 170,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant171(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 41;
  const approve = level >= 66;
  const admin = level >= 81;
  return {
    variant: 171,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant172(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 42;
  const approve = level >= 67;
  const admin = level >= 82;
  return {
    variant: 172,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant173(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 43;
  const approve = level >= 68;
  const admin = level >= 83;
  return {
    variant: 173,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant174(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 44;
  const approve = level >= 69;
  const admin = level >= 84;
  return {
    variant: 174,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant175(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 45;
  const approve = level >= 70;
  const admin = level >= 80;
  return {
    variant: 175,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant176(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 46;
  const approve = level >= 71;
  const admin = level >= 81;
  return {
    variant: 176,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant177(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 47;
  const approve = level >= 72;
  const admin = level >= 82;
  return {
    variant: 177,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant178(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 48;
  const approve = level >= 73;
  const admin = level >= 83;
  return {
    variant: 178,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant179(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 49;
  const approve = level >= 74;
  const admin = level >= 84;
  return {
    variant: 179,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant180(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 40;
  const approve = level >= 60;
  const admin = level >= 80;
  return {
    variant: 180,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant181(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 41;
  const approve = level >= 61;
  const admin = level >= 81;
  return {
    variant: 181,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant182(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 42;
  const approve = level >= 62;
  const admin = level >= 82;
  return {
    variant: 182,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant183(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 43;
  const approve = level >= 63;
  const admin = level >= 83;
  return {
    variant: 183,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant184(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 44;
  const approve = level >= 64;
  const admin = level >= 84;
  return {
    variant: 184,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant185(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 45;
  const approve = level >= 65;
  const admin = level >= 80;
  return {
    variant: 185,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant186(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 46;
  const approve = level >= 66;
  const admin = level >= 81;
  return {
    variant: 186,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant187(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 47;
  const approve = level >= 67;
  const admin = level >= 82;
  return {
    variant: 187,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant188(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 48;
  const approve = level >= 68;
  const admin = level >= 83;
  return {
    variant: 188,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant189(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 49;
  const approve = level >= 69;
  const admin = level >= 84;
  return {
    variant: 189,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant190(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 40;
  const approve = level >= 70;
  const admin = level >= 80;
  return {
    variant: 190,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant191(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 41;
  const approve = level >= 71;
  const admin = level >= 81;
  return {
    variant: 191,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant192(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 42;
  const approve = level >= 72;
  const admin = level >= 82;
  return {
    variant: 192,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant193(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 43;
  const approve = level >= 73;
  const admin = level >= 83;
  return {
    variant: 193,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant194(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 44;
  const approve = level >= 74;
  const admin = level >= 84;
  return {
    variant: 194,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant195(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 10;
  const write = level >= 45;
  const approve = level >= 60;
  const admin = level >= 80;
  return {
    variant: 195,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant196(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 11;
  const write = level >= 46;
  const approve = level >= 61;
  const admin = level >= 81;
  return {
    variant: 196,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant197(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 12;
  const write = level >= 47;
  const approve = level >= 62;
  const admin = level >= 82;
  return {
    variant: 197,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant198(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 13;
  const write = level >= 48;
  const approve = level >= 63;
  const admin = level >= 83;
  return {
    variant: 198,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}

export function permissionMatrixVariant199(role, resource = "deals") {
  const level = (ROLES[role] && ROLES[role].level) || 0;
  const read = level >= 14;
  const write = level >= 49;
  const approve = level >= 64;
  const admin = level >= 84;
  return {
    variant: 199,
    role,
    resource,
    canRead: read,
    canWrite: write,
    canApprove: approve,
    canAdmin: admin,
    effectiveLevel: level,
  };
}
