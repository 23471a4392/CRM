// Minimal CSV encode/decode tailored to the contact and deal shapes used by
// this app. Handles quoting of fields containing commas, quotes, or newlines.

function escapeCell(value) {
  const str = value === null || value === undefined ? "" : String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function toCSV(rows, columns) {
  const header = columns.map(escapeCell).join(",");
  const body = rows
    .map((row) => columns.map((col) => escapeCell(row[col])).join(","))
    .join("\n");
  return body ? `${header}\n${body}` : header;
}

// Simple RFC-4180-ish parser: handles quoted fields, escaped quotes ("")
// inside quotes, commas and newlines inside quoted fields.
export function fromCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && next === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  if (rows.length === 0) return [];
  const [header, ...dataRows] = rows;
  return dataRows
    .filter((r) => r.some((cell) => cell !== ""))
    .map((r) => Object.fromEntries(header.map((col, idx) => [col, r[idx] ?? ""])));
}

export const CONTACT_COLUMNS = ["id", "name", "company", "email", "phone", "notes"];
export const DEAL_COLUMNS = ["id", "title", "contactId", "value", "stage", "closeDate", "notes"];

export function contactsToCSV(contacts) {
  return toCSV(contacts, CONTACT_COLUMNS);
}

export function dealsToCSV(deals) {
  return toCSV(deals, DEAL_COLUMNS);
}

export function csvToContacts(text) {
  return fromCSV(text).map((r) => ({
    id: r.id || undefined,
    name: r.name || "",
    company: r.company || "",
    email: r.email || "",
    phone: r.phone || "",
    notes: r.notes || "",
  }));
}

export function csvToDeals(text) {
  return fromCSV(text).map((r) => ({
    id: r.id || undefined,
    title: r.title || "",
    contactId: r.contactId || "",
    value: Number(r.value) || 0,
    stage: r.stage || "lead",
    closeDate: r.closeDate || "",
    notes: r.notes || "",
  }));
}

export function downloadTextFile(filename, text, mimeType = "text/csv") {
  const blob = new Blob([text], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
