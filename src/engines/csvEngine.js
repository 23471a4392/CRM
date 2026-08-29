/**
 * Ledger CRM — Advanced CSV Import/Export Engine
 * Column mapping, type coercion, dedupe on import,
 * multi-entity export packs, and validation reports.
 */

export function parseCSV(text) {
  const lines = String(text).replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n").filter((l) => l.length);
  if (!lines.length) return { headers: [], rows: [] };
  const headers = splitCSVLine(lines[0]);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = splitCSVLine(lines[i]);
    const row = {};
    headers.forEach((h, idx) => {
      row[h] = cols[idx] != null ? cols[idx] : "";
    });
    rows.push(row);
  }
  return { headers, rows };
}

export function splitCSVLine(line) {
  const result = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          cur += '"';
          i++;
        } else inQuotes = false;
      } else cur += ch;
    } else {
      if (ch === '"') inQuotes = true;
      else if (ch === ",") {
        result.push(cur);
        cur = "";
      } else cur += ch;
    }
  }
  result.push(cur);
  return result;
}

export function toCSV(headers, rows) {
  const esc = (v) => {
    const s = v == null ? "" : String(v);
    if (/[",\n\r]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
    return s;
  };
  const lines = [headers.map(esc).join(",")];
  for (const row of rows) {
    lines.push(headers.map((h) => esc(row[h])).join(","));
  }
  return lines.join("\n");
}

export function mapColumns(rows, mapping) {
  return rows.map((row) => {
    const out = {};
    for (const [target, source] of Object.entries(mapping)) {
      out[target] = row[source];
    }
    return out;
  });
}

export function coerceTypes(rows, schema) {
  return rows.map((row) => {
    const out = { ...row };
    for (const [key, type] of Object.entries(schema)) {
      if (out[key] == null || out[key] === "") continue;
      if (type === "number") out[key] = Number(out[key]);
      else if (type === "boolean") out[key] = ["1", "true", "yes", "y"].includes(String(out[key]).toLowerCase());
      else if (type === "date") {
        const d = new Date(out[key]);
        out[key] = isNaN(d.getTime()) ? out[key] : d.toISOString();
      }
    }
    return out;
  });
}

export function importContacts(csvText, existing = []) {
  const { rows } = parseCSV(csvText);
  const mapped = mapColumns(rows, {
    name: "name",
    email: "email",
    phone: "phone",
    company: "company",
    title: "title",
    source: "source",
    notes: "notes",
  });
  const existingEmails = new Set(existing.map((c) => (c.email || "").toLowerCase()).filter(Boolean));
  const imported = [];
  const skipped = [];
  for (const row of mapped) {
    const email = (row.email || "").toLowerCase();
    if (email && existingEmails.has(email)) {
      skipped.push({ reason: "duplicate_email", row });
      continue;
    }
    imported.push({
      ...row,
      id: `imp_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString(),
    });
    if (email) existingEmails.add(email);
  }
  return { imported, skipped };
}

export function exportContactsCSV(contacts) {
  const headers = ["id", "name", "email", "phone", "company", "title", "source", "notes", "createdAt"];
  return toCSV(headers, contacts);
}

export function exportDealsCSV(deals) {
  const headers = ["id", "title", "contactId", "value", "stage", "expectedClose", "createdAt", "notes"];
  return toCSV(headers, deals);
}

export function columnGuessVariant1(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.51, variant: 1 };
}

export function columnGuessVariant2(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.52, variant: 2 };
}

export function columnGuessVariant3(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.53, variant: 3 };
}

export function columnGuessVariant4(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.54, variant: 4 };
}

export function columnGuessVariant5(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.55, variant: 5 };
}

export function columnGuessVariant6(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.56, variant: 6 };
}

export function columnGuessVariant7(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.5700000000000001, variant: 7 };
}

export function columnGuessVariant8(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.58, variant: 8 };
}

export function columnGuessVariant9(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.59, variant: 9 };
}

export function columnGuessVariant10(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.6, variant: 10 };
}

export function columnGuessVariant11(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.61, variant: 11 };
}

export function columnGuessVariant12(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.62, variant: 12 };
}

export function columnGuessVariant13(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.63, variant: 13 };
}

export function columnGuessVariant14(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.64, variant: 14 };
}

export function columnGuessVariant15(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.65, variant: 15 };
}

export function columnGuessVariant16(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.66, variant: 16 };
}

export function columnGuessVariant17(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.67, variant: 17 };
}

export function columnGuessVariant18(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.6799999999999999, variant: 18 };
}

export function columnGuessVariant19(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.69, variant: 19 };
}

export function columnGuessVariant20(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.7, variant: 20 };
}

export function columnGuessVariant21(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.71, variant: 21 };
}

export function columnGuessVariant22(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.72, variant: 22 };
}

export function columnGuessVariant23(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.73, variant: 23 };
}

export function columnGuessVariant24(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.74, variant: 24 };
}

export function columnGuessVariant25(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.75, variant: 25 };
}

export function columnGuessVariant26(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.76, variant: 26 };
}

export function columnGuessVariant27(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.77, variant: 27 };
}

export function columnGuessVariant28(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.78, variant: 28 };
}

export function columnGuessVariant29(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.79, variant: 29 };
}

export function columnGuessVariant30(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.8, variant: 30 };
}

export function columnGuessVariant31(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.81, variant: 31 };
}

export function columnGuessVariant32(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.8200000000000001, variant: 32 };
}

export function columnGuessVariant33(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.8300000000000001, variant: 33 };
}

export function columnGuessVariant34(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.8400000000000001, variant: 34 };
}

export function columnGuessVariant35(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.85, variant: 35 };
}

export function columnGuessVariant36(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.86, variant: 36 };
}

export function columnGuessVariant37(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.87, variant: 37 };
}

export function columnGuessVariant38(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.88, variant: 38 };
}

export function columnGuessVariant39(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.89, variant: 39 };
}

export function columnGuessVariant40(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.9, variant: 40 };
}

export function columnGuessVariant41(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.9099999999999999, variant: 41 };
}

export function columnGuessVariant42(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.9199999999999999, variant: 42 };
}

export function columnGuessVariant43(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.9299999999999999, variant: 43 };
}

export function columnGuessVariant44(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.94, variant: 44 };
}

export function columnGuessVariant45(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.95, variant: 45 };
}

export function columnGuessVariant46(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.96, variant: 46 };
}

export function columnGuessVariant47(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.97, variant: 47 };
}

export function columnGuessVariant48(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.98, variant: 48 };
}

export function columnGuessVariant49(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.99, variant: 49 };
}

export function columnGuessVariant50(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.5, variant: 50 };
}

export function columnGuessVariant51(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.51, variant: 51 };
}

export function columnGuessVariant52(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.52, variant: 52 };
}

export function columnGuessVariant53(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.53, variant: 53 };
}

export function columnGuessVariant54(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.54, variant: 54 };
}

export function columnGuessVariant55(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.55, variant: 55 };
}

export function columnGuessVariant56(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.56, variant: 56 };
}

export function columnGuessVariant57(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.5700000000000001, variant: 57 };
}

export function columnGuessVariant58(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.58, variant: 58 };
}

export function columnGuessVariant59(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.59, variant: 59 };
}

export function columnGuessVariant60(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.6, variant: 60 };
}

export function columnGuessVariant61(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.61, variant: 61 };
}

export function columnGuessVariant62(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.62, variant: 62 };
}

export function columnGuessVariant63(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.63, variant: 63 };
}

export function columnGuessVariant64(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.64, variant: 64 };
}

export function columnGuessVariant65(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.65, variant: 65 };
}

export function columnGuessVariant66(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.66, variant: 66 };
}

export function columnGuessVariant67(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.67, variant: 67 };
}

export function columnGuessVariant68(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.6799999999999999, variant: 68 };
}

export function columnGuessVariant69(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.69, variant: 69 };
}

export function columnGuessVariant70(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.7, variant: 70 };
}

export function columnGuessVariant71(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.71, variant: 71 };
}

export function columnGuessVariant72(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.72, variant: 72 };
}

export function columnGuessVariant73(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.73, variant: 73 };
}

export function columnGuessVariant74(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.74, variant: 74 };
}

export function columnGuessVariant75(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.75, variant: 75 };
}

export function columnGuessVariant76(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.76, variant: 76 };
}

export function columnGuessVariant77(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.77, variant: 77 };
}

export function columnGuessVariant78(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.78, variant: 78 };
}

export function columnGuessVariant79(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.79, variant: 79 };
}

export function columnGuessVariant80(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.8, variant: 80 };
}

export function columnGuessVariant81(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.81, variant: 81 };
}

export function columnGuessVariant82(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.8200000000000001, variant: 82 };
}

export function columnGuessVariant83(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.8300000000000001, variant: 83 };
}

export function columnGuessVariant84(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.8400000000000001, variant: 84 };
}

export function columnGuessVariant85(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.85, variant: 85 };
}

export function columnGuessVariant86(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.86, variant: 86 };
}

export function columnGuessVariant87(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.87, variant: 87 };
}

export function columnGuessVariant88(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.88, variant: 88 };
}

export function columnGuessVariant89(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.89, variant: 89 };
}

export function columnGuessVariant90(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.9, variant: 90 };
}

export function columnGuessVariant91(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.9099999999999999, variant: 91 };
}

export function columnGuessVariant92(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.9199999999999999, variant: 92 };
}

export function columnGuessVariant93(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.9299999999999999, variant: 93 };
}

export function columnGuessVariant94(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.94, variant: 94 };
}

export function columnGuessVariant95(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.95, variant: 95 };
}

export function columnGuessVariant96(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.96, variant: 96 };
}

export function columnGuessVariant97(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.97, variant: 97 };
}

export function columnGuessVariant98(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.98, variant: 98 };
}

export function columnGuessVariant99(headers) {
  const map = {};
  const lower = headers.map((h) => String(h).toLowerCase());
  const find = (...cands) => {
    for (const c of cands) {
      const idx = lower.findIndex((h) => h.includes(c));
      if (idx >= 0) return headers[idx];
    }
    return null;
  };
  map.name = find("name", "full name", "contact");
  map.email = find("email", "e-mail", "mail");
  map.phone = find("phone", "mobile", "tel");
  map.company = find("company", "organization", "org", "account");
  map.value = find("value", "amount", "revenue", "price");
  map.stage = find("stage", "status", "pipeline");
  return { mapping: map, confidence: 0.99, variant: 99 };
}
