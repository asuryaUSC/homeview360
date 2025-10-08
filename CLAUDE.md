# HomeView 360 – Project Context

## Overview
**HomeView 360** is a web-based and mobile-optimized Progressive Web App (PWA) that helps users visualize furniture from multiple brands directly inside their own rooms using augmented reality (AR).  
The app is designed to make online furniture shopping more engaging, accurate, and collaborative by combining AR placement, personalized style recommendations, lighting simulation, and social sharing.

The project is built in **Next.js 14 (App Router)** using **Tailwind CSS**, **Framer Motion**, **Lucide Icons**, and **shadcn/ui** for UI consistency.  
Authentication and freemium subscription management will be handled by **Clerk**, and the app will eventually integrate **WebXR** (Android) and **USDZ Quick Look** (iOS) for cross-platform AR experiences.

---

## Vision
HomeView 360 is not just another AR shopping app.  
It’s a **personal spatial stylist** — an intelligent companion that helps users explore, visualize, and share interior design ideas across multiple brands and styles.

The app aims to reduce buyer uncertainty, product returns, and decision fatigue while making the home-decor process fun and social.

---

## Core Experience Flow
1. **Browse** a cross-brand furniture catalog (clean, minimal, and fast).
2. **Search** naturally (e.g., “modern gray sofa under $800”) and filter by brand, style, size, or lighting preset.
3. **Preview** 3D models with realistic lighting in the product page.
4. **Place in AR** inside your own room to see scale, lighting, and fit.
5. **Save as Smart Room** – create virtual room layouts that can be reopened anywhere.
6. **Style Companion (AI)** – get personalized item suggestions based on your preferences and previous choices.
7. **Share** your Smart Room link for feedback and collaboration.

---

## Unique Selling Points
- **Brand-Agnostic Catalog** — compare products from multiple retailers in one place.
- **Smart Rooms** — save and revisit furniture layouts; layouts are portable (not bound to the physical space).
- **Lighting Simulation** — switch between day/night/warm/cool presets to see true-to-life lighting effects.
- **AI Style Companion** — lightweight, rule-based personalization that recommends furniture matching your design taste.
- **Social Sharing** — generate sharable room previews for peer or client feedback.
- **Freemium Model** — accessible to everyone, with advanced features gated for premium users.

---

## Planned Feature Breakdown

### 🎨 Frontend (User Side)
- Clean, Apple-like minimal UI design with subtle motion and gradients.
- Responsive layout optimized for both mobile and desktop.
- Animated splash loader that preloads fonts, images, and key 3D assets.
- Landing page with “Install App” (PWA) or “Use Web App” call-to-action.
- Catalog with intent-based search, filter chips, dimension sliders, and brand/style filters.
- Product page with rotating 3D viewer (later AR-enabled) and lighting presets.
- “Add to Room” button that adds items to Smart Rooms.
- Smart Rooms page with saved layouts and previews.
- Pricing page showcasing Free, Premium, and Pro plans.
- Account page with user profile, subscription tier, and saved rooms.

### 🔧 Backend / Data
- **Firestore / Supabase** to store:
  - Users, rooms, saved items, and preferences.
  - Catalog items (name, brand, price, dimensions, 3D asset URLs, tags).
- **Local JSON** for seeding initial catalog (100–200 items, tagged by style and size).
- **Clerk Auth** for user management and simulated billing integration.

### 🧠 AI / Logic
- Lightweight rule engine for “Style Companion”:
  - Users take a short quiz → style profile generated (e.g., “Scandinavian Minimalist”).
  - Catalog items tagged with `style`, `tone`, `material`, `priceBand`.
  - Items are ranked based on how well they match the user’s style profile.
- Example: “This item matches your style (light wood, neutral tone, modern lines).”

### 🌞 AR + 3D Features (later phase)
- **WebXR (Android/Chrome)** → live AR placement with hit-test and light estimation.
- **USDZ Quick Look (iOS)** → native AR viewer with true-to-scale visualization.
- **Lighting presets** via HDRI environment maps and optional WebXR light estimation.
- **Room data** stored as JSON (product IDs + position/rotation/scale) so rooms can be reopened anywhere.

### 💰 Monetization
- **Free Tier**
  - Limited catalog access
  - 3 AR placements/day
  - 3 Smart Rooms
  - Watermarked screenshots
- **Premium ($5.99/month)**
  - Unlimited AR & room saves
  - Full catalog + lighting presets
  - AI style suggestions
  - Shareable links (no watermark)
- **Pro ($14.99/month)**
  - Designer tools
  - Client viewing links
  - Advanced measurement features

### 📈 Long-Term Growth
- Add **Retailer Dashboard** for brands to upload 3D assets.
- Support **affiliate feeds** for transaction revenue.
- Develop **analytics tools** for retailers (AR views, conversions, CTR).
- Expand “Style Companion” to use embeddings or ML personalization.
- Explore **community features**: shared room boards, comment threads, and collab editing.

---

## Tech Stack Summary
| Layer | Technology |
|-------|-------------|
| Framework | Next.js 14 (App Router) |
| UI | Tailwind CSS + shadcn/ui + Framer Motion |
| Icons | Lucide React |
| Auth / Billing | Clerk |
| Database | Firestore or Supabase |
| AR | WebXR + USDZ Quick Look |
| Deployment | Vercel (PWA-enabled) |

---

## Current Phase (MVP – Fall Semester)
Goal: deliver a **fully functional frontend MVP** that demonstrates the user experience end-to-end:
- Functional pages: Splash → Landing → Catalog → Product → Pricing → Account.
- PWA installable on mobile devices.
- Clean, fast, and professional UI.
- Smart Rooms working with static data (save/load).
- Simulated premium gating with Clerk (no real payment).
- Placeholder AR and lighting simulation UI.
- Demo-ready presentation with clear roadmap.

---

## Roadmap Milestones
1. **Setup & Landing Pages (Week 1–2)**  
   - Splash loader, manifest, responsive layout, pricing, and CTA flow.

2. **Catalog & Product Flow (Week 3–5)**  
   - Search/filter UI, product viewer, and data integration.

3. **Smart Rooms + Style Companion (Week 6–9)**  
   - Save/load room data, implement quiz + tag filtering.

4. **AR + Lighting Simulation (Week 10–12)**  
   - WebXR + USDZ integration, HDRI lighting toggles.

5. **Polish + Final Demo (Week 13–15)**  
   - Animations, responsive cleanup, presentation video.

---

## Brand Identity
- **Tone:** Clean, modern, and human — like Apple meets IKEA.
- **Color Palette:** Deep charcoal background, soft off-white accents, muted gradients.
- **Typography:** Sans-serif with calm weight balance 
- **Motion:** Subtle fades and slides — never flashy.
- **Voice:** Helpful, calm, aspirational (“Bring your space to life.”)

---

## Elevator Pitch
> HomeView 360 lets you visualize and style your dream space in augmented reality — across brands, lighting, and moods.  
> Save, share, and personalize rooms instantly with your own virtual design assistant.

--

---

## Summary
HomeView 360 is a **visionary, realistic, and achievable** semester project that merges design, technology, and business insight.  
By delivering a professional PWA with working smart rooms, beautiful design, and clear monetization potential, the team will present a complete, investor-grade MVP worthy of an A.

SIDE NOTE DO NOT USE THE SPARKLES LUCIDE REACT ICON EVER