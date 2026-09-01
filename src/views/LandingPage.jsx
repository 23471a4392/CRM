import React, { useState } from "react";
import {
  Globe,
  Shield,
  Briefcase,
  Users,
  Building2,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  Send,
  Lock,
  Zap,
  TrendingUp,
  FileText,
  DollarSign,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  MessageSquare,
  HelpCircle,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { DOMAIN_CONFIG, authService } from "../backend/authService.js";
import { crmBackend, USERS } from "../backend/crmBackend.js";

export default function LandingPage({ onOpenLogin, onOpenSignUp, onQuickLaunchRole }) {
  const [activeDomainTab, setActiveDomainTab] = useState("sales");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactOrg, setContactOrg] = useState("");
  const [contactCategory, setContactCategory] = useState("Enterprise Scoping");
  const [contactMsg, setContactMsg] = useState("");
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) return;
    try {
      await crmBackend.saveContact({
        name: contactName,
        email: contactEmail,
        company: contactOrg || "Prospective Client",
        title: "Enterprise Lead (Landing Page)",
        source: "web",
        notes: `Inquiry (${contactCategory}): ${contactMsg}`,
      }, USERS[0]);
      setContactSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  const DOMAINS_LIST = [
    {
      id: "sales",
      name: "Sales Representative Domain",
      subdomain: "sales.ledgercrm.com",
      accent: "#E2C08D",
      icon: Briefcase,
      roleName: "Sales Representative",
      tagline: "Dedicated Selling & Pipeline Execution",
      description:
        "Sales reps only access their assigned leads, personal opportunities, scheduled tasks, and customer inquiries with zero distraction.",
      features: [
        "Strict work assignment data isolation",
        "Visual Kanban and ledger table pipelines",
        "High-value deal manager approval submissions ($50k+)",
        "Direct customer inquiry inbox & response tools",
      ],
      sampleUser: USERS[0],
    },
    {
      id: "manager",
      name: "Sales Manager Domain",
      subdomain: "manager.ledgercrm.com",
      accent: "#60A5FA",
      icon: Users,
      roleName: "Sales Manager",
      tagline: "Team Governance, Forecasts & Deal Approvals",
      description:
        "Sales leadership maintains team pipeline oversight, reviews and approves high-value deal terms, and reallocates leads across reps.",
      features: [
        "High-Value Deal Approvals Queue with 1-click approvals",
        "Lead Reassignment Center with targeted rep notifications",
        "Real-time sales rep quota leaderboard",
        "Probabilistic revenue forecast modeling",
      ],
      sampleUser: USERS[2],
    },
    {
      id: "accounts",
      name: "Account Owner Domain",
      subdomain: "accounts.ledgercrm.com",
      accent: "#34D399",
      icon: Building2,
      roleName: "Account Owner",
      tagline: "Portfolio ARR Health & Contract Renewals",
      description:
        "Account owners manage long-term client retention, contract renewals (30/60/90 days), ARR concentration, and executive stakeholders.",
      features: [
        "Total Portfolio ARR and retention tracking",
        "Upcoming contract renewal calendars and review triggers",
        "Account health scoring and SLA monitoring",
        "Client executive stakeholder directories",
      ],
      sampleUser: USERS[3],
    },
    {
      id: "customer",
      name: "Customer Portal Domain",
      subdomain: "customer.ledgercrm.com",
      accent: "#F472B6",
      icon: UserCheck,
      roleName: "Customer / Client",
      tagline: "Client Self-Service & Order Transparency",
      description:
        "Clients log in to view active commercial licenses, quotes, downloadable invoices, and message their assigned sales representative directly.",
      features: [
        "100% data privacy: Zero internal CRM data visible",
        "Active software license & commercial order milestones",
        "Downloadable invoice & formal quote documents",
        "Direct inquiry messenger to assigned account executive",
      ],
      sampleUser: USERS[4],
    },
  ];

  const currentTab = DOMAINS_LIST.find((d) => d.id === activeDomainTab) || DOMAINS_LIST[0];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#141716] text-[#E5E7EB]">
      {/* 1. Top Navigation Bar */}
      <header className="sticky top-0 z-40 px-4 sm:px-8 py-3.5 backdrop-blur-md bg-[#141716]/90 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-serif text-lg font-bold bg-[#E2C08D] text-[#1B1F1D] shadow-sm">
            §
          </div>
          <div>
            <span className="font-bold tracking-tight text-sm text-white">LEDGER CRM</span>
            <span className="hidden sm:inline text-[10px] ml-2 px-2 py-0.5 rounded-full bg-white/10 text-white/70 font-mono">
              Enterprise Multi-Domain
            </span>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs text-white/70 font-medium">
          <a href="#domains" className="hover:text-white transition">4 Role Domains</a>
          <a href="#modules" className="hover:text-white transition">Product Modules</a>
          <a href="#architecture" className="hover:text-white transition">Architecture</a>
          <a href="#contact" className="hover:text-white transition">Contact & Support</a>
        </nav>

        {/* Top-Right Action Buttons: Sign In & Sign Up */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenLogin}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white/80 hover:text-white hover:bg-white/10 border border-white/15 transition flex items-center gap-1.5"
          >
            <Lock size={12} />
            <span>Sign In</span>
          </button>
          <button
            type="button"
            onClick={onOpenSignUp}
            className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#E2C08D] text-[#1B1F1D] hover:bg-[#ebd3aa] shadow-sm transition flex items-center gap-1"
          >
            <span>Sign Up</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="px-4 sm:px-8 py-16 sm:py-24 max-w-6xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/15 text-xs text-[#E2C08D] font-mono">
          <Globe size={13} />
          <span>Role-Based Multi-Domain Enterprise Architecture</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight max-w-4xl mx-auto">
          One Shared Database. <br className="hidden sm:inline" />
          <span className="text-[#E2C08D]">Four Dedicated Stakeholder Domains.</span>
        </h1>

        <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
          Ledger CRM eliminates disconnected portals. Field sales reps, sales leadership, account owners, and enterprise customers each operate in their own purpose-built domain—with automated role routing and real-time event notifications.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={onOpenLogin}
            className="px-6 py-3 rounded-xl text-xs font-bold bg-[#E2C08D] text-[#1B1F1D] hover:bg-[#ebd3aa] transition shadow-lg flex items-center gap-2"
          >
            <span>Launch Central Login Portal</span>
            <ArrowRight size={14} />
          </button>
          <button
            type="button"
            onClick={onOpenSignUp}
            className="px-6 py-3 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 border border-white/20 text-white transition"
          >
            Create New Account
          </button>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-[11px] text-white/50 uppercase font-mono">Active Pipeline</div>
            <div className="text-xl font-bold font-mono text-[#E2C08D] mt-1">$1,980,000</div>
            <div className="text-[10px] text-white/40 mt-0.5">Across active deal stages</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-[11px] text-white/50 uppercase font-mono">Role Domains</div>
            <div className="text-xl font-bold text-sky-400 mt-1">4 Isolated</div>
            <div className="text-[10px] text-white/40 mt-0.5">Strict access boundaries</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-[11px] text-white/50 uppercase font-mono">Event Bus</div>
            <div className="text-xl font-bold text-emerald-400 mt-1">Real-Time</div>
            <div className="text-[10px] text-white/40 mt-0.5">Zero page reload updates</div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-[11px] text-white/50 uppercase font-mono">Compliance</div>
            <div className="text-xl font-bold text-purple-400 mt-1">SOC2 Type II</div>
            <div className="text-[10px] text-white/40 mt-0.5">Data isolation guarantees</div>
          </div>
        </div>
      </section>

      {/* 3. Interactive 4-Domain Showcase */}
      <section id="domains" className="px-4 sm:px-8 py-16 bg-[#181C1A] border-y border-white/10">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4 Dedicated Role Domains
            </h2>
            <p className="text-xs sm:text-sm text-white/60 max-w-xl mx-auto">
              After logging in, users are automatically routed to the domain mapped to their role with strict data isolation.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {DOMAINS_LIST.map((d) => {
              const active = activeDomainTab === d.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setActiveDomainTab(d.id)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2"
                  style={{
                    background: active ? `${d.accent}22` : "rgba(255, 255, 255, 0.05)",
                    color: active ? d.accent : "#9CA3AF",
                    border: active ? `1px solid ${d.accent}66` : "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <d.icon size={14} />
                  <span>{d.name}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Preview Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#141716] border border-white/10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold" style={{ background: `${currentTab.accent}22`, color: currentTab.accent }}>
                <span>{currentTab.subdomain}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">{currentTab.name}</h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">{currentTab.description}</p>

              <div className="space-y-2 pt-2">
                {currentTab.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-xs text-white/80">
                    <CheckCircle2 size={14} style={{ color: currentTab.accent }} className="shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => onQuickLaunchRole(currentTab.sampleUser)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2"
                  style={{ background: currentTab.accent, color: "#1B1F1D" }}
                >
                  <span>Launch {currentTab.roleName} Demo ({currentTab.sampleUser.name})</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* Right: Mock Terminal View */}
            <div className="lg:col-span-6 p-5 rounded-xl bg-black/60 border border-white/10 font-mono text-xs space-y-3">
              <div className="flex items-center justify-between text-white/40 pb-2 border-b border-white/10 text-[11px]">
                <span>https://{currentTab.subdomain}</span>
                <span className="text-emerald-400">● 200 OK</span>
              </div>
              <div className="text-white/60">
                <span className="text-amber-400">AUTH_IDENTITY:</span> {currentTab.sampleUser.name} &lt;{currentTab.sampleUser.email}&gt;
              </div>
              <div className="text-white/60">
                <span className="text-sky-400">ASSIGNED_ROLE:</span> {currentTab.sampleUser.role}
              </div>
              <div className="text-white/60">
                <span className="text-emerald-400">DOMAIN_GUARD:</span> Access Authorized
              </div>
              <div className="p-3 rounded bg-white/5 border border-white/5 text-[11px] text-white/70">
                {`// Data filter query output`} <br />
                {`getAuthorizedDeals(user) -> Filtered to: ${currentTab.id === "sales" ? "assignedSalesRepId === 'rep-1'" : currentTab.id === "manager" ? "all team deals" : currentTab.id === "accounts" ? "portfolio accounts" : "customerId === 'customer-1'"}`}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Enterprise Modules */}
      <section id="modules" className="px-4 sm:px-8 py-16 max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Integrated Enterprise Modules
          </h2>
          <p className="text-xs sm:text-sm text-white/60 max-w-xl mx-auto">
            Real functionality with end-to-end data flows, CRUD, validation, and real-time triggers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "Pipeline Kanban & Ledger",
              icon: TrendingUp,
              desc: "Move deals across stages (lead, contacted, proposal, negotiation, won, lost) with automated revenue forecasting.",
            },
            {
              title: "High-Value Approvals ($50k+)",
              icon: CheckCircle2,
              desc: "Rep deal creation automatically notifies Sales Managers for review, discount validation, and 1-click approvals.",
            },
            {
              title: "Lead Reassignment Center",
              icon: Users,
              desc: "Managers reallocate prospects between reps with instant targeted notification dispatched exclusively to the new assignee.",
            },
            {
              title: "Contract Renewals (30/60/90 Days)",
              icon: Clock,
              desc: "Account owners track annual recurring revenue, churn indicators, and initiate renewal review workflows.",
            },
            {
              title: "Customer Inquiries & Messenger",
              icon: MessageSquare,
              desc: "Customers message their assigned sales rep directly. Reps reply from their dashboard with live receipt updates.",
            },
            {
              title: "Real-Time Event Bus",
              icon: Zap,
              desc: "Cross-tab broadcast channel ensures multiple users and tabs receive real-time notifications with zero refresh.",
            },
          ].map((mod) => (
            <div
              key={mod.title}
              className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition space-y-2"
            >
              <div className="w-9 h-9 rounded-lg bg-[#E2C08D]/10 text-[#E2C08D] flex items-center justify-center mb-3">
                <mod.icon size={18} />
              </div>
              <h4 className="font-bold text-sm text-white">{mod.title}</h4>
              <p className="text-xs text-white/60 leading-relaxed">{mod.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Contact & Support Section */}
      <section id="contact" className="px-4 sm:px-8 py-16 bg-[#181C1A] border-t border-white/10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Enterprise Inquiries & Support
            </h2>
            <p className="text-xs sm:text-sm text-white/60 max-w-lg mx-auto">
              Have questions about multi-domain deployment or SLA integration? Reach our solutions architecture team.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[#141716] border border-white/10 shadow-xl">
            {contactSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-base font-bold text-white">Inquiry Received</h3>
                <p className="text-xs text-white/60 max-w-sm mx-auto">
                  Thank you, <strong>{contactName}</strong>. Your message has been saved to our centralized database and assigned to an Enterprise Solutions Architect.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setContactSubmitted(false);
                    setContactMsg("");
                  }}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/15 text-white"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-white/60">
                      Full Name *
                    </label>
                    <input
                      required
                      className="w-full rounded-lg px-3 py-2 text-xs bg-black/40 border border-white/15 text-white focus:outline-none focus:border-[#E2C08D]"
                      placeholder="Jane Doe"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-white/60">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full rounded-lg px-3 py-2 text-xs bg-black/40 border border-white/15 text-white focus:outline-none focus:border-[#E2C08D]"
                      placeholder="jane@enterprise.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-white/60">
                      Company / Organization
                    </label>
                    <input
                      className="w-full rounded-lg px-3 py-2 text-xs bg-black/40 border border-white/15 text-white focus:outline-none focus:border-[#E2C08D]"
                      placeholder="Acme Global Corp"
                      value={contactOrg}
                      onChange={(e) => setContactOrg(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-white/60">
                      Inquiry Category
                    </label>
                    <select
                      className="w-full rounded-lg px-3 py-2 text-xs bg-black/40 border border-white/15 text-white focus:outline-none focus:border-[#E2C08D]"
                      value={contactCategory}
                      onChange={(e) => setContactCategory(e.target.value)}
                    >
                      <option value="Enterprise Scoping">Enterprise Scoping & Rollout</option>
                      <option value="Custom Subdomain Setup">Custom Subdomain & DNS Setup</option>
                      <option value="Security Audit">Security & SOC2 Compliance</option>
                      <option value="Technical Support">Technical Support & API</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-white/60">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={3}
                    className="w-full rounded-lg px-3 py-2 text-xs bg-black/40 border border-white/15 text-white focus:outline-none focus:border-[#E2C08D] resize-none"
                    placeholder="Describe your requirements or questions…"
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-white/40">
                    * Submissions are recorded directly in the shared CRM database.
                  </span>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg text-xs font-bold bg-[#E2C08D] text-[#1B1F1D] hover:bg-[#ebd3aa] transition flex items-center gap-1.5 shadow-sm"
                  >
                    <Send size={13} />
                    <span>Submit Inquiry</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="px-4 sm:px-8 py-10 border-t border-white/10 bg-[#111312] text-xs text-white/50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <div className="w-6 h-6 rounded bg-[#E2C08D] text-[#1B1F1D] flex items-center justify-center font-serif text-xs font-bold">
                §
              </div>
              <span>LEDGER CRM</span>
            </div>
            <p className="text-[11px] leading-relaxed text-white/40">
              Role-based multi-domain enterprise CRM & commercial ledger platform.
            </p>
          </div>

          <div>
            <div className="text-white font-semibold mb-2">Domains</div>
            <ul className="space-y-1 text-[11px]">
              <li>sales.ledgercrm.com (Sales Rep)</li>
              <li>manager.ledgercrm.com (Sales Manager)</li>
              <li>accounts.ledgercrm.com (Account Owner)</li>
              <li>customer.ledgercrm.com (Customer Hub)</li>
            </ul>
          </div>

          <div>
            <div className="text-white font-semibold mb-2">Offices & Locations</div>
            <ul className="space-y-1 text-[11px]">
              <li>San Francisco, CA — Headquarters</li>
              <li>London, UK — EMEA Hub</li>
              <li>Singapore — APAC Operations</li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="text-white font-semibold">System Status</div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All 4 Domains Operational</span>
            </div>
            <div className="text-[10px] text-white/30">
              SOC2 Type II Certified · 256-Bit SSL
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-8 mt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-white/40">
          <span>© 2025 Ledger CRM Inc. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <button type="button" onClick={onOpenLogin} className="hover:text-white">Sign In</button>
            <button type="button" onClick={onOpenSignUp} className="hover:text-white">Sign Up</button>
            <a href="#contact" className="hover:text-white">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
