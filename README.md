# Ledger CRM

A simple contacts + deals CRM with a ledger-book visual theme. Track contacts,
move deals through stages (Lead → Contacted → Proposal → Won/Lost), see
pipeline totals on a dashboard, and export or import your data as CSV. Data is
saved to the browser's `localStorage`, so it persists across reloads on the
same device. An error boundary keeps a crash in one view from taking down the
whole app.

## Tech stack

- React 18 + Vite
- Tailwind CSS
- lucide-react icons
- Vitest + Testing Library for unit tests

## Prerequisites

- Node.js 18 or newer
- npm 9 or newer

## Installation

```bash
npm install
```

## Development

Start a local dev server with hot reload:

```bash
npm run dev
```

Then open the printed URL (defaults to `http://localhost:5173`).

## Build

Produce a production build in `dist/`:

```bash
npm run build
```

## Run the production build

Serve the built app locally:

```bash
npm run start
```

This serves `dist/` at `http://localhost:4173`.

## Tests

Run the unit test suite:

```bash
npm test
```

Run tests with a coverage report:

```bash
npm run test:coverage
```

## Docker

Build and run the app in a container:

```bash
docker build -t ledger-crm .
docker run -p 4173:4173 ledger-crm
```

## Project structure

```
src/
  main.jsx              # React entry point
  App.jsx                # Top-level layout, state, and routing between views
  storage.js              # localStorage persistence wrapper
  utils.js                # Pure helper functions (formatting, aggregation)
  csv.js                   # CSV encode/decode and file download helper
  components/
    DashboardView.jsx     # Pipeline stats and charts
    ContactsView.jsx       # Contact list, search, add/edit
    DealsView.jsx           # Deal list, stage filter, running total
    DataView.jsx              # CSV export/import and clear-all-data
    ContactForm.jsx             # Add/edit contact form
    DealForm.jsx                  # Add/edit deal form
    StageBadge.jsx                  # Small colored stage label
    Field.jsx                        # Shared labeled form field wrapper
    ErrorBoundary.jsx                 # Catches render errors, shows a retry UI
tests/
  utils.test.js            # Tests for pure helper functions
  storage.test.js           # Tests for the persistence wrapper
  csv.test.js                # Tests for CSV encode/decode round-trips
  setup.js                     # Vitest/jest-dom setup
```

## Data model

**Contact**: `id, name, company, email, phone, notes, createdAt`

**Deal**: `id, title, contactId, value, stage, closeDate, notes, createdAt`

Deals reference contacts by `contactId`. Deleting a contact clears that
reference on any of its deals rather than deleting the deals themselves.

## License

Proprietary — all rights reserved unless a LICENSE file says otherwise.

## Engines
Business logic lives under src/engines.
## Domain engines
Sat Aug 29 08:36:21 UTC 2026

