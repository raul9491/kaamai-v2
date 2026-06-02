# KaamAI — CLAUDE.md
# Give this file to Claude VS Code extension at the start of every session.

## What This Project Is
KaamAI is an India-focused AI tools web platform.
One website, 6 professional modules: CA, Advocate, Student, Kirana, Doctor, Freelancer.
Each module has structured forms (NOT a chatbox) that produce professional Indian documents.
Target: Indian professionals who need AI tools at ₹49–99/month — less than one cup of chai/day.

## Tech Stack
- Frontend: React + Vite (src/) — deployed on Vercel
- Backend: Express.js (server/) — deployed on Render.com
- AI: Anthropic Claude API — model: claude-haiku-4-5-20251001
- Payments: Razorpay (not yet integrated — Week 2 task)
- Auth: Not yet integrated — Week 2 task
- Routing: React Router v6

## Project Structure
```
kaamai/
  src/
    pages/
      Home.jsx              → Homepage with 6 module tiles
      Home.module.css
      ModulePage.jsx        → Dynamic module page (works for all 6)
      ModulePage.module.css
    components/
      Navbar.jsx            → Top navigation
      Navbar.module.css
      PaywallModal.jsx      → Shown after 3 free uses
      PaywallModal.module.css
    config/
      modules.js            → SINGLE SOURCE OF TRUTH for all module data
                              (tasks, fields, pricing, colors)
    utils/
      freeTier.js           → localStorage-based free tier tracking
    main.jsx
    App.jsx
    index.css               → Global CSS variables and resets
  server/
    prompts/
      index.js              → All prompt templates for all 6 modules
    index.js                → Express server, /api/generate endpoint
    .env                    → ANTHROPIC_API_KEY=your_key_here
    package.json
  index.html
  vite.config.js            → Proxies /api to localhost:3001
  package.json
```

## Design System (NEVER change these)
```css
--bg: #0B1120               /* Main background */
--bg-card: #0F1829          /* Card background */
--saffron: #F5A623          /* Primary — CTAs, CA module */
--teal: #4ECFA8             /* Secondary — success, student module */
--text-primary: #F0EDE6
--text-secondary: #8A9BB5
--text-muted: #4A5878
--font-display: 'Baloo 2', cursive   /* Headlines, module names */
--font-body: 'Noto Sans', sans-serif /* All body text */

Module accent colors:
--ca: #F5A623       --advocate: #7B8FFF    --student: #4ECFA8
--kirana: #FF7B6B   --doctor: #A78BFA      --freelancer: #34D399
```

## Pricing Model
- Free: 3 uses per module — tracked in localStorage, NO login required
- Single module: ₹99/month (CA, Advocate, Doctor) / ₹49/month (Student, Kirana, Freelancer)
- All modules: ₹199/month
- NO interaction limits for paid users — unlimited use
- Device restriction: one active session per account (implement with auth in Week 2)
- Referral: 1 free month per paying referral (implement in Week 3)

## API
- Frontend calls: POST /api/generate with { moduleId, taskId, formData }
- Server calls: Anthropic claude-haiku-4-5-20251001
- One universal endpoint handles all 6 modules
- Prompts are in server/prompts/index.js

## Module Build Status
- [x] CA Module — prompts done, UI done
- [x] Advocate Module — prompts done, UI done
- [x] Student Module — prompts done, UI done
- [x] Kirana Module — prompts done, UI done
- [x] Doctor Module — prompts done, UI done
- [x] Freelancer Module — prompts done, UI done
- [ ] Payment integration (Razorpay) — Week 2
- [ ] User auth (JWT) — Week 2
- [ ] Referral system — Week 3
- [ ] Email capture — Week 2

## Current Build Priority (What to Build Next)
1. Test all 6 modules end-to-end with real API key
2. Add Razorpay payment link in PaywallModal.jsx (replace placeholder button)
3. Add simple email capture before first generation (non-blocking)
4. User auth — email + password, JWT, persist paid status server-side
5. Deploy: frontend to Vercel, server to Render.com

## Rules — Never Break Without Asking
- Mobile responsive at 390px — every component must work on phone
- Use Indian examples always: Zomato, PhonePe, CRED, Jio — NOT Uber/Spotify/Amazon
- Hindi/language support on every module — never English-only
- Do NOT add new npm packages without asking first
- Do NOT change prompt templates without discussing — they are the product moat
- Do NOT change free tier limit (3) without asking
- Do NOT change pricing without asking
- Keep all module config in src/config/modules.js — single source of truth
- All new pages go in src/pages/, all new components in src/components/

## How to Run
```bash
# Terminal 1 — Frontend
npm install
npm run dev
# → http://localhost:5173

# Terminal 2 — Backend
cd server
npm install
node index.js
# → http://localhost:3001

# Get API key at: console.anthropic.com
# Add to server/.env: ANTHROPIC_API_KEY=sk-ant-...
```

## Deployment
- Frontend: Vercel — connect GitHub repo, root dir = kaamai/, build cmd = npm run build
- Backend: Render.com — connect GitHub repo, root dir = kaamai/server/, start cmd = node index.js
- Set ANTHROPIC_API_KEY as environment variable in Render dashboard
- Update vite.config.js proxy to point to Render URL in production

## Known Issues / Notes
- PaywallModal pay button is a placeholder — wire to Razorpay in Week 2
- isPaid() in freeTier.js checks localStorage — move to server-side with auth in Week 2
- Doctor module: always English output regardless of language field (medical standards)
- All prompts are India-specific — never use Western law, Western examples, or USD pricing
