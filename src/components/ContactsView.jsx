import React, { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Trash2,
  Pencil,
  Building2,
  Mail,
  Phone,
  Tag,
  LayoutGrid,
  List,
  Eye,
  Wallet,
  Download,
  Filter,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import StageBadge from "./StageBadge.jsx";
import Avatar from "./Avatar.jsx";
import EmptyStateIllustration from "./EmptyStateIllustration.jsx";
import { currency, formatDate } from "../utils.js";

export default function ContactsView({
  contacts,
  deals,
  currencyCode = "USD",
  onOpenAdd,
  onOpenEdit,
  onSelectContact,
  onOpenAddDealForContact,
  onDelete,
  onBatchDelete,
  onBatchExportCSV,
}) {
  const [query, setQuery] = useState("");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name_asc");
  const [viewMode, setViewMode] = useState("cards"); // 'cards' or 'table'
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  // Distinct companies and tags for dropdown filters
  const companies = useMemo(() => {
    const set = new Set();
    contacts.forEach((c) => c.company && set.add(c.company));
    return Array.from(set).sort();
  }, [contacts]);

  const tags = useMemo(() => {
    const set = new Set();
    contacts.forEach((c) => (c.tags || []).forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [contacts]);

  // Deal mapping by contact
  const dealSummaryByContact = useMemo(() => {
    const map = new Map();
    deals.forEach((d) => {
      if (!d.contactId) return;
      const current = map.get(d.contactId) || { count: 0, total: 0 };
      map.set(d.contactId, {
        count: current.count + 1,
        total: current.total + (Number(d.value) || 0),
      });
    });
    return map;
  }, [deals]);

  // Filtering & Sorting
  const filteredContacts = useMemo(() => {
    const q = query.toLowerCase().trim();
    let result = contacts.filter((c) => {
      const matchQuery =
        !q ||
        `${c.name} ${c.company || ""} ${c.email || ""} ${c.phone || ""} ${(c.tags || []).join(" ")} ${c.notes || ""}`
          .toLowerCase()
          .includes(q);

      const matchCompany = companyFilter === "all" || c.company === companyFilter;
      const matchTag = tagFilter === "all" || (c.tags || []).includes(tagFilter);

      return matchQuery && matchCompany && matchTag;
    });

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "name_asc") return a.name.localeCompare(b.name);
      if (sortBy === "name_desc") return b.name.localeCompare(a.name);
      if (sortBy === "company_asc") return (a.company || "").localeCompare(b.company || "");
      if (sortBy === "value_desc") {
        const valA = dealSummaryByContact.get(a.id)?.total || 0;
        const valB = dealSummaryByContact.get(b.id)?.total || 0;
        return valB - valA;
      }
      if (sortBy === "date_desc") {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateB - dateA;
      }
      return 0;
    });

    return result;
  }, [contacts, query, companyFilter, tagFilter, sortBy, dealSummaryByContact]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredContacts.length / pageSize));
  const paginatedContacts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredContacts.slice(start, start + pageSize);
  }, [filteredContacts, currentPage, pageSize]);

  // Selection handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(new Set(filteredContacts.map((c) => c.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const toggleSelectOne = (id) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const isAllSelected =
    filteredContacts.length > 0 && selectedIds.size === filteredContacts.length;

  return (
    <div className="space-y-4">
      {/* Top Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 flex-wrap">
        {/* Search and Filters */}
        <div className="flex items-center gap-2 flex-1 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--text-muted)" }}
            />
            <input
              className="ledger-input w-full rounded-lg pl-8 pr-7 py-2 text-xs"
              placeholder="Search by name, company, email, tag…"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded text-text-dim hover:text-text"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Company Filter Dropdown */}
          <select
            className="ledger-input rounded-lg px-2.5 py-2 text-xs"
            value={companyFilter}
            onChange={(e) => {
              setCompanyFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All Companies</option>
            {companies.map((co) => (
              <option key={co} value={co}>
                {co}
              </option>
            ))}
          </select>

          {/* Tag Filter Dropdown */}
          {tags.length > 0 && (
            <select
              className="ledger-input rounded-lg px-2.5 py-2 text-xs"
              value={tagFilter}
              onChange={(e) => {
                setTagFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">All Tags</option>
              {tags.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          )}

          {/* Sort Dropdown */}
          <select
            className="ledger-input rounded-lg px-2.5 py-2 text-xs"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name_asc">Sort: Name (A to Z)</option>
            <option value="name_desc">Sort: Name (Z to A)</option>
            <option value="company_asc">Sort: Company</option>
            <option value="value_desc">Sort: Highest Deal Value</option>
            <option value="date_desc">Sort: Most Recently Added</option>
          </select>
        </div>

        {/* View Toggle & Add Button */}
        <div className="flex items-center gap-2">
          {/* Card / Table Toggle */}
          <div
            className="flex items-center rounded-lg p-0.5"
            style={{
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
            }}
          >
            <button
              onClick={() => setViewMode("cards")}
              className="p-1.5 rounded text-xs transition"
              style={{
                background: viewMode === "cards" ? "var(--surface)" : "transparent",
                color: viewMode === "cards" ? "var(--accent)" : "var(--text-muted)",
              }}
              title="Card Grid View"
              aria-label="Grid view"
            >
              <LayoutGrid size={14} />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className="p-1.5 rounded text-xs transition"
              style={{
                background: viewMode === "table" ? "var(--surface)" : "transparent",
                color: viewMode === "table" ? "var(--accent)" : "var(--text-muted)",
              }}
              title="Table View"
              aria-label="Table view"
            >
              <List size={14} />
            </button>
          </div>

          <button
            onClick={onOpenAdd}
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold shadow-xs transition"
            style={{ background: "var(--accent)", color: "#1B1F1D" }}
          >
            <Plus size={14} /> Add Contact
          </button>
        </div>
      </div>

      {/* Batch Actions Bar */}
      {selectedIds.size > 0 && (
        <div
          className="p-3 rounded-lg flex items-center justify-between gap-4 text-xs modal-content"
          style={{
            background: "var(--surface-2)",
            border: "1px solid var(--accent-border)",
          }}
        >
          <div className="flex items-center gap-2 font-medium">
            <span
              className="px-2 py-0.5 rounded font-mono font-bold"
              style={{ background: "var(--accent)", color: "#1B1F1D" }}
            >
              {selectedIds.size}
            </span>
            <span>contact(s) selected</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onBatchExportCSV(Array.from(selectedIds))}
              className="flex items-center gap-1 px-3 py-1 rounded text-xs font-medium transition"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text)",
              }}
            >
              <Download size={13} /> Export Selected
            </button>
            <button
              onClick={() => onBatchDelete(Array.from(selectedIds))}
              className="flex items-center gap-1 px-3 py-1 rounded text-xs font-medium transition"
              style={{
                background: "var(--negative)",
                color: "#FFFFFF",
              }}
            >
              <Trash2 size={13} /> Delete Selected
            </button>
            <button
              onClick={() => setSelectedIds(new Set())}
              className="px-2 py-1 rounded text-xs hover:opacity-80"
              style={{ color: "var(--text-muted)" }}
            >
              Deselect All
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      {filteredContacts.length === 0 ? (
        <div
          className="p-10 text-center rounded-xl space-y-3"
          style={{ background: "var(--surface)", border: "1px dashed var(--border)" }}
        >
          <EmptyStateIllustration type="contacts" />
          <div className="text-sm font-semibold text-text">
            {contacts.length === 0 ? "No contacts recorded in ledger" : "No contacts match active filters"}
          </div>
          <p className="text-xs max-w-sm mx-auto" style={{ color: "var(--text-muted)" }}>
            {contacts.length === 0
              ? "Start building your customer directory by adding your first contact record."
              : "Try clearing your search query or changing company/tag filters."}
          </p>
          {contacts.length === 0 ? (
            <button
              onClick={onOpenAdd}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold"
              style={{ background: "var(--accent)", color: "#1B1F1D" }}
            >
              <Plus size={13} className="inline mr-1" /> Add Contact
            </button>
          ) : (
            <button
              onClick={() => {
                setQuery("");
                setCompanyFilter("all");
                setTagFilter("all");
              }}
              className="px-3 py-1.5 rounded-lg text-xs"
              style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : viewMode === "cards" ? (
        /* Card Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5">
          {paginatedContacts.map((c) => {
            const isSelected = selectedIds.has(c.id);
            const dealInfo = dealSummaryByContact.get(c.id);

            return (
              <div
                key={c.id}
                className="rounded-xl p-4 flex flex-col justify-between row-hover transition shadow-xs"
                style={{
                  background: "var(--surface)",
                  border: isSelected
                    ? "1px solid var(--accent)"
                    : "1px solid var(--border)",
                }}
              >
                <div>
                  {/* Card Header with Avatar & Selection Checkbox */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectOne(c.id)}
                        className="w-4 h-4 rounded accent-amber-500 cursor-pointer shrink-0"
                        aria-label={`Select ${c.name}`}
                      />
                      <Avatar name={c.name} size="md" />
                      <div className="truncate">
                        <h4
                          onClick={() => onSelectContact(c)}
                          className="font-semibold text-sm truncate cursor-pointer hover:underline text-text"
                        >
                          {c.name}
                        </h4>
                        <div className="text-xs truncate flex items-center gap-1" style={{ color: "var(--text-muted)" }}>
                          {c.title && <span>{c.title}</span>}
                          {c.title && c.company && <span>·</span>}
                          {c.company && (
                            <span className="flex items-center gap-0.5">
                              <Building2 size={11} /> {c.company}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectContact(c)}
                      className="p-1.5 rounded hover:bg-surface-2 transition text-xs flex items-center gap-1"
                      style={{ color: "var(--accent)" }}
                      title="View Dossier"
                    >
                      <Eye size={14} />
                    </button>
                  </div>

                  {/* Contact Info Items */}
                  <div className="space-y-1.5 text-xs mb-3">
                    {c.email && (
                      <div className="flex items-center gap-2 truncate" style={{ color: "var(--text-muted)" }}>
                        <Mail size={12} className="shrink-0" />
                        <a
                          href={`mailto:${c.email}`}
                          className="truncate hover:underline"
                          style={{ color: "var(--text)" }}
                        >
                          {c.email}
                        </a>
                      </div>
                    )}
                    {c.phone && (
                      <div className="flex items-center gap-2 truncate" style={{ color: "var(--text-muted)" }}>
                        <Phone size={12} className="shrink-0" />
                        <a
                          href={`tel:${c.phone}`}
                          className="hover:underline"
                          style={{ color: "var(--text)" }}
                        >
                          {c.phone}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {c.tags && c.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {c.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                          style={{
                            background: "var(--surface-2)",
                            color: "var(--accent)",
                            border: "1px solid var(--border)",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Deal Metrics Pill */}
                  {dealInfo && dealInfo.count > 0 && (
                    <div
                      className="px-2.5 py-1 rounded-lg text-xs flex items-center justify-between mb-3"
                      style={{ background: "var(--surface-2)" }}
                    >
                      <span style={{ color: "var(--text-muted)" }}>
                        {dealInfo.count} active deal(s)
                      </span>
                      <span className="ledger-mono font-bold" style={{ color: "var(--accent)" }}>
                        {currency(dealInfo.total, currencyCode)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div
                  className="pt-3 flex items-center justify-between gap-2 text-xs"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  <button
                    onClick={() => onOpenAddDealForContact(c.id)}
                    className="flex items-center gap-1 px-2 py-1 rounded hover:bg-surface-2 transition text-[11px]"
                    style={{ color: "var(--positive)" }}
                  >
                    <Wallet size={12} /> + Deal
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onOpenEdit(c)}
                      className="p-1.5 rounded hover:bg-surface-2 transition"
                      style={{ color: "var(--text-muted)" }}
                      title="Edit contact"
                      aria-label="Edit contact"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => onDelete(c.id)}
                      className="p-1.5 rounded hover:bg-surface-2 transition"
                      style={{ color: "var(--negative)" }}
                      title="Delete contact"
                      aria-label="Delete contact"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Ledger Table View */
        <div
          className="rounded-xl overflow-hidden shadow-xs"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead
                style={{
                  background: "var(--surface-2)",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <tr>
                  <th className="p-3 w-10">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded accent-amber-500 cursor-pointer"
                      aria-label="Select all"
                    />
                  </th>
                  <th className="p-3 font-semibold uppercase tracking-wider text-[11px]">Contact</th>
                  <th className="p-3 font-semibold uppercase tracking-wider text-[11px]">Company / Title</th>
                  <th className="p-3 font-semibold uppercase tracking-wider text-[11px]">Email</th>
                  <th className="p-3 font-semibold uppercase tracking-wider text-[11px]">Phone</th>
                  <th className="p-3 font-semibold uppercase tracking-wider text-[11px]">Pipeline Value</th>
                  <th className="p-3 font-semibold uppercase tracking-wider text-[11px] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {paginatedContacts.map((c) => {
                  const isSelected = selectedIds.has(c.id);
                  const dealInfo = dealSummaryByContact.get(c.id);

                  return (
                    <tr
                      key={c.id}
                      className="hover:bg-surface-2/60 transition"
                      style={{
                        background: isSelected ? "var(--surface-2)" : "transparent",
                      }}
                    >
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectOne(c.id)}
                          className="w-4 h-4 rounded accent-amber-500 cursor-pointer"
                          aria-label={`Select ${c.name}`}
                        />
                      </td>
                      <td className="p-3">
                        <div
                          onClick={() => onSelectContact(c)}
                          className="flex items-center gap-2.5 cursor-pointer hover:underline"
                        >
                          <Avatar name={c.name} size="sm" />
                          <div>
                            <div className="font-semibold text-text">{c.name}</div>
                            {c.tags && c.tags.length > 0 && (
                              <div className="text-[10px]" style={{ color: "var(--accent)" }}>
                                {c.tags.slice(0, 2).join(", ")}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-3" style={{ color: "var(--text-muted)" }}>
                        <div className="text-text font-medium">{c.company || "—"}</div>
                        <div className="text-[11px]">{c.title || ""}</div>
                      </td>
                      <td className="p-3">
                        {c.email ? (
                          <a
                            href={`mailto:${c.email}`}
                            className="hover:underline"
                            style={{ color: "var(--text)" }}
                          >
                            {c.email}
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="p-3" style={{ color: "var(--text-muted)" }}>
                        {c.phone || "—"}
                      </td>
                      <td className="p-3">
                        {dealInfo && dealInfo.count > 0 ? (
                          <div>
                            <div className="ledger-mono font-bold" style={{ color: "var(--accent)" }}>
                              {currency(dealInfo.total, currencyCode)}
                            </div>
                            <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                              {dealInfo.count} deal(s)
                            </div>
                          </div>
                        ) : (
                          <span style={{ color: "var(--text-dim)" }}>$0</span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => onSelectContact(c)}
                            className="p-1.5 rounded hover:bg-surface-3 transition"
                            style={{ color: "var(--accent)" }}
                            title="View Dossier"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            onClick={() => onOpenEdit(c)}
                            className="p-1.5 rounded hover:bg-surface-3 transition"
                            style={{ color: "var(--text-muted)" }}
                            title="Edit"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => onDelete(c.id)}
                            className="p-1.5 rounded hover:bg-surface-3 transition"
                            style={{ color: "var(--negative)" }}
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      {filteredContacts.length > 0 && (
        <div
          className="p-3 rounded-xl flex items-center justify-between flex-wrap gap-3 text-xs"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-2" style={{ color: "var(--text-muted)" }}>
            <span>
              Showing {Math.min(filteredContacts.length, (currentPage - 1) * pageSize + 1)}–
              {Math.min(filteredContacts.length, currentPage * pageSize)} of {filteredContacts.length} contacts
            </span>
            <span>·</span>
            <select
              className="ledger-input rounded px-2 py-1 text-xs"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={12}>12 per page</option>
              <option value={24}>24 per page</option>
              <option value={48}>48 per page</option>
            </select>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded border disabled:opacity-30 transition hover:bg-surface-2"
              style={{ borderColor: "var(--border)", color: "var(--text)" }}
              aria-label="Previous page"
            >
              <ChevronLeft size={14} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
              .map((p, idx, arr) => {
                const isCurrent = p === currentPage;
                const prev = arr[idx - 1];
                const showEllipsis = prev && p - prev > 1;

                return (
                  <React.Fragment key={p}>
                    {showEllipsis && <span className="px-1 text-text-dim">…</span>}
                    <button
                      onClick={() => setCurrentPage(p)}
                      className="w-7 h-7 rounded text-xs font-semibold transition"
                      style={{
                        background: isCurrent ? "var(--accent)" : "transparent",
                        color: isCurrent ? "#1B1F1D" : "var(--text-muted)",
                      }}
                    >
                      {p}
                    </button>
                  </React.Fragment>
                );
              })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded border disabled:opacity-30 transition hover:bg-surface-2"
              style={{ borderColor: "var(--border)", color: "var(--text)" }}
              aria-label="Next page"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
