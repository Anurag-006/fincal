# FinCal - Retire Smart
### FinCal Innovation Hackathon · HDFC · Investor Education Initiative

---

## VS Code Setup (Do This First)

### Install these VS Code Extensions:
1. **ESLint** — code quality
2. **Prettier** — auto formatting
3. **Tailwind CSS IntelliSense** — autocomplete for Tailwind classes
4. **ES7+ React/Redux/React-Native snippets** — React shortcuts
5. **GitLens** — Git history

---

## 📦 Installation

### Step 1 — Install Node.js
Download and install from: https://nodejs.org (choose LTS version)
Verify: `node --version` and `npm --version`

### Step 2 — Install Frontend
\`\`\`bash
cd frontend
npm install
\`\`\`

### Step 3 — Install Backend
\`\`\`bash
cd backend
npm install
\`\`\`

---

## ▶️ Running the Project

### Terminal 1 — Start Backend
\`\`\`bash
cd backend
npm run dev
# Runs at http://localhost:5000
\`\`\`

### Terminal 2 — Start Frontend
\`\`\`bash
cd frontend
npm run dev
# Runs at http://localhost:3000
\`\`\`

Open browser → http://localhost:3000

---

## 📁 Project Structure

\`\`\`
fincal-retirement/
├── frontend/              # Next.js 15 App
│   ├── app/               # Pages (folder = route)
│   │   ├── page.js        # → localhost:3000/
│   │   ├── calculator/    # → localhost:3000/calculator
│   │   └── result/        # → localhost:3000/result
│   ├── components/        # All UI components
│   │   ├── story/         # Landing page scroll sections
│   │   ├── quiz/          # 5-step user input flow
│   │   ├── calculator/    # Sliders, charts, comparisons
│   │   ├── result/        # Summary, share, export
│   │   ├── education/     # Tooltips, concept explainers
│   │   └── ui/            # Reusable: Button, Card, Slider...
│   ├── lib/
│   │   ├── formulas.js    # ⭐ All financial formulas (PDF-based)
│   │   ├── constants.js   # Default rates and assumptions
│   │   └── exportExcel.js # Excel generation (SheetJS)
│   ├── hooks/             # Custom React hooks
│   └── store/             # Zustand global state
│
└── backend/               # Node.js + Express API
    └── src/
        ├── server.js      # Entry point
        ├── routes/        # API endpoints
        ├── controllers/   # Business logic
        └── utils/         # Formulas + validators
\`\`\`

---

## 🔗 API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET  | /api/health | Health check |
| POST | /api/calculate/retirement | Full retirement plan |
| POST | /api/calculate/sip | SIP future value |
| POST | /api/calculate/lumpsum | Lumpsum future value |

### Example Request — Retirement Calculation:
\`\`\`json
POST http://localhost:5000/api/calculate/retirement
{
  "currentAge": 25,
  "retirementAge": 60,
  "lifeExpectancy": 80,
  "monthlyExpense": 40000,
  "lifestyle": "normal",
  "existingSavings": 0,
  "monthlySip": 5000,
  "annualReturn": 12,
  "inflationRate": 6,
  "postRetirementReturn": 6
}
\`\`\`

---

## 📐 Formulas Used (from PDF)

| Formula | Usage |
|---------|-------|
| FV = PV × (1+i)^n | Inflation-adjusted future expense |
| PV of Annuity = PMT × [(1-(1+r)^-n)/r] | Corpus needed at retirement |
| FV of SIP = P × [((1+r)^n-1)/r] × (1+r) | SIP growth over time |
| PMT = FV × r / ((1+r)^n - 1) | Monthly SIP required |
| FV = PV × (1+r)^n | Lumpsum future value |
| SWP duration = -log(1-(PV×r)/PMT)/log(1+r)/12 | How long corpus lasts |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React 18, Tailwind CSS |
| Animations | Framer Motion |
| Charts | Recharts |
| State | Zustand |
| Excel Export | SheetJS (xlsx) |
| Image Export | html2canvas |
| Backend | Node.js, Express |
| Validation | Custom validators |

---

## 📌 Key Features

- Scroll Storytelling — "Meet Rahul & Vikram" compounding visual
- Conversational Quiz — 5 steps, no finance knowledge needed
- Live Sliders — drag and watch corpus chart update instantly
- What-If Panel — "Start now vs 5 years later" comparison
- Goal Meter — visual progress toward retirement target
- Jargon Tooltips — tap any term for a plain-English explanation
- Shareable Card — download your plan as a PNG image
- Excel Export — 4-sheet workbook with complete projections
- **Disclaimer:** "This tool has been designed for information purposes only. Actual results may vary depending on various factors involved in capital market. Investor should not consider above as a recommendation for any schemes of HDFC Mutual Fund. Past performance may or may not be sustained in future and is not a guarantee of any future returns."

---

*Built for FinCal Innovation Hackathon · HDFC Mutual Fund · Investor Education Initiative*
