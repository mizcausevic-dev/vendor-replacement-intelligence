# Vendor Replacement Intelligence

Board-ready executive intelligence surface for vendor replacement candidates, switching-risk analysis, savings narratives, and board-memo packaging. Reads synthetic vendor-estate review records, scores replacement readiness, highlights blocked exits, and packages board-ready decision packets.

- Live: `https://replace.kineticgain.com/`
- Routes: `/`, `/replacement-lane/`, `/switching-risks/`, `/savings-narrative/`, `/board-memo/`, `/verification/`, `/docs/`
- APIs: `/api/dashboard/summary`, `/api/replacement-lane`, `/api/switching-risks`, `/api/savings-narrative`, `/api/board-memo`, `/api/verification`, `/api/sample`

## Why it exists

Leadership keeps hearing confident claims about vendor consolidation and cost savings:

- this stack can be replaced this year
- the savings are obvious
- migration risk is low
- dependencies are known
- renewal timing is manageable

This repo turns those claims into one executive surface that answers:

- which replacements are actually ready
- where switching risk is understated
- where overlap tax is real
- what story belongs in the board memo

## Local run

```powershell
cd vendor-replacement-intelligence
npm install
npm run verify
npm run prerender
npm run render:assets
node dist/app.js
```

Then open:

- `http://127.0.0.1:5570/`

## CLI

```powershell
npx vendor-replacement-intelligence fixtures/vendor-replacement.json --format summary
npx vendor-replacement-intelligence fixtures/vendor-replacement-clean.json --format json
```

## README proof assets

- `screenshots/01-overview-proof.png`
- `screenshots/02-replacement-lane-proof.png`
- `screenshots/03-switching-risks-proof.png`
- `screenshots/04-savings-narrative-proof.png`

## Safety

- synthetic sample data only
- read-only executive surface
- no production contracts or procurement data
- no live board packets or commercial terms
