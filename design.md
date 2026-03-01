# VyapaarPe — Design System & UI/UX Specification

> **Inspired by:** Dukaan (mydukaan.io) + Modern SaaS Best Practices  
> **Design System Name:** VyapaarDS  
> **Version:** 1.0  
> **Date:** 01 March 2026

---

## 1. Design Philosophy

VyapaarPe's design takes direct inspiration from **Dukaan's** seller-first approach — clean, minimal, mobile-first interfaces that Indian small business owners can use without any technical knowledge. We enhance this with a premium dark-mode-first aesthetic and AI-native interactions.

### Core Principles

| Principle | Description | Dukaan Inspiration |
|-----------|-------------|--------------------|
| **Simplicity First** | Every screen has one primary action. No cognitive overload. | Dukaan's 3-step store setup |
| **Mobile-First** | 80% of Indian sellers use mobile. Design for 360px first, scale up. | Dukaan's mobile-native dashboard |
| **Visual Hierarchy** | Bold numbers, muted labels. Most important info jumps out. | Dukaan's order count + revenue cards |
| **Guided Flows** | Step-by-step wizards for complex tasks (onboarding, product, checkout) | Dukaan's product creation wizard |
| **Multi-Language** | Hindi/English toggle on every screen. Regional fonts optimized. | Dukaan's multi-language support |
| **AI-Native** | AI assistant is always accessible. AI suggestions are contextual. | VyapaarPe unique differentiator |

---

## 2. Color System

### 2.1 Brand Colors

```css
:root {
  /* Primary — Deep Purple (Brand Identity) */
  --primary-50:  #f3f0ff;
  --primary-100: #e5deff;
  --primary-200: #cdbdff;
  --primary-300: #a78bfa;
  --primary-400: #8b5cf6;
  --primary-500: #6c5ce7;  /* Main brand color */
  --primary-600: #5b21b6;
  --primary-700: #4c1d95;
  --primary-800: #3b0f7a;
  --primary-900: #2e0a5e;

  /* Accent — Teal (CTAs & Success states) */
  --accent-50:  #e6fffe;
  --accent-100: #b2fff9;
  --accent-200: #7dffe7;
  --accent-300: #38e8d3;
  --accent-400: #00cec9;  /* Main accent */
  --accent-500: #00b894;
  --accent-600: #0a9e82;
  --accent-700: #078a70;

  /* Semantic Colors */
  --success:  #00b894;
  --warning:  #fdcb6e;
  --error:    #d63031;
  --info:     #0984e3;

  /* Revenue-specific */
  --revenue-green: #00b894;
  --courier-red:   #ff6b6b;
  --gold:          #fdcb6e;
}
```

### 2.2 Dark Theme (Default)

```css
:root[data-theme="dark"] {
  --bg-primary:    #07070a;
  --bg-secondary:  #101018;
  --bg-card:       rgba(20, 20, 32, 0.6);
  --bg-elevated:   #1a1a2e;
  --bg-hover:      #252540;

  --text-primary:  #e2e2e2;
  --text-secondary: #8b8ba3;
  --text-muted:    #5a5a72;

  --border-default: rgba(255, 255, 255, 0.08);
  --border-hover:   rgba(108, 92, 231, 0.5);

  --shadow-card:   0 4px 24px -2px rgba(0, 0, 0, 0.4);
  --shadow-hover:  0 12px 40px rgba(108, 92, 231, 0.15);
}
```

### 2.3 Light Theme

```css
:root[data-theme="light"] {
  --bg-primary:    #f8f9fa;
  --bg-secondary:  #ffffff;
  --bg-card:       #ffffff;
  --bg-elevated:   #f0f0f5;
  --bg-hover:      #e8e8f0;

  --text-primary:  #1a1a2e;
  --text-secondary: #6b6b80;
  --text-muted:    #9b9bb0;

  --border-default: #e0e0e8;
  --border-hover:   #6c5ce7;

  --shadow-card:   0 2px 12px rgba(0, 0, 0, 0.08);
  --shadow-hover:  0 8px 30px rgba(108, 92, 231, 0.12);
}
```

---

## 3. Typography

### Font Stack

```css
/* Primary: Inter — Same as Dukaan's modern approach */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

/* Hindi/Regional: Noto Sans Devanagari */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap');

body {
  font-family: 'Inter', 'Noto Sans Devanagari', system-ui, -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased;
}
```

### Type Scale

| Name | Size | Weight | Line Height | Usage |
|------|------|--------|-------------|-------|
| Display | 52px | 900 | 1.1 | Hero sections, landing page |
| H1 | 36px | 800 | 1.2 | Page titles |
| H2 | 28px | 700 | 1.3 | Section headers |
| H3 | 22px | 700 | 1.3 | Card titles |
| H4 | 18px | 600 | 1.4 | Subsection headers |
| Body Large | 16px | 400 | 1.6 | Primary content |
| Body | 14px | 400 | 1.5 | Default body text |
| Body Small | 13px | 400 | 1.4 | Secondary info, table cells |
| Caption | 12px | 500 | 1.3 | Labels, timestamps |
| Overline | 11px | 600 | 1.2 | Tag labels, badges |
| Stat Number | 32px | 900 | 1.0 | Dashboard KPIs (Dukaan-style) |

---

## 4. Component Library

### 4.1 Cards (Glassmorphism)

```css
/* Dukaan-style card with glassmorphism enhancement */
.card {
  background: var(--bg-card);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid var(--border-default);
  box-shadow: var(--shadow-card);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.card:hover {
  border-color: var(--border-hover);
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}

/* Stat Card — Like Dukaan's dashboard KPI cards */
.stat-card {
  text-align: center;
  padding: 20px;
}
.stat-card .stat-value {
  font-size: 32px;
  font-weight: 900;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.stat-card .stat-label {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 4px;
}
```

### 4.2 Buttons

| Variant | Style | Usage |
|---------|-------|-------|
| **Primary** | Filled purple (`--primary-500`) | Main CTAs: "Save", "Create", "Publish" |
| **Secondary** | Outlined purple border | Secondary actions: "Cancel", "Edit" |
| **Success** | Filled teal (`--accent-400`) | Positive actions: "Approve", "Confirm" |
| **Danger** | Filled red (`--error`) | Destructive: "Delete", "Suspend" |
| **Ghost** | Text only, no border | Tertiary: "Skip", "Learn more" |
| **Icon Button** | Circle with icon | Toolbar actions |

```css
.btn {
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 0.2px;
}
.btn-primary {
  background: var(--primary-500);
  color: white;
}
.btn-primary:hover {
  background: var(--primary-600);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(108, 92, 231, 0.4);
}
```

### 4.3 Navigation (Dukaan-Style Sidebar)

```
┌──────────────────────────────────────────────────┐
│  SELLER DASHBOARD LAYOUT                         │
│                                                  │
│  ┌────────┐  ┌───────────────────────────────┐   │
│  │ Sidebar│  │ Content Area                  │   │
│  │        │  │                               │   │
│  │ 🏠 Home│  │  ┌─────────────────────────┐  │   │
│  │ 📦 Prod│  │  │ Page Header + Actions   │  │   │
│  │ 🛒 Ords│  │  └─────────────────────────┘  │   │
│  │ 👥 Cust│  │                               │   │
│  │ 🎫 Coup│  │  ┌──────┐ ┌──────┐ ┌──────┐  │   │
│  │ 📊 Anal│  │  │ KPI 1│ │ KPI 2│ │ KPI 3│  │   │
│  │ ⚙️ Sett│  │  └──────┘ └──────┘ └──────┘  │   │
│  │ 🤖 AI  │  │                               │   │
│  │        │  │  ┌─────────────────────────┐  │   │
│  │ ──────│  │  │ Data Table / List       │  │   │
│  │ 🔌 Plug│  │  │                         │  │   │
│  │ 🌐 Site│  │  │                         │  │   │
│  │ 📱 App │  │  └─────────────────────────┘  │   │
│  └────────┘  └───────────────────────────────┘   │
└──────────────────────────────────────────────────┘
```

**Sidebar specs (matching Dukaan):**
- Width: 240px (expanded), 64px (collapsed on mobile)
- Background: `--bg-secondary` with left border accent
- Active item: purple left border + purple text + subtle purple bg
- Icons: 20px, emoji or Lucide icons
- Hover: `--bg-hover` background transition
- Collapsible on mobile with hamburger menu

---

## 5. Key Pages & Wireframes

### 5.1 Seller Dashboard (Home)

```
┌─────────────────────────────────────────────────┐
│  Good Morning, Faisal 👋        📍 NutriDry     │
│  Your store health: ████████░░ 82%               │
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│  │   ₹24.5K │ │    12    │ │   ₹1,850 │         │
│  │ Today Rev│ │ New Ords  │ │ Pending  │         │
│  │ ↑ 12%    │ │ ↑ 3      │ │ Payouts  │         │
│  └──────────┘ └──────────┘ └──────────┘         │
│                                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│  │    4.2★   │ │    3     │ │    87%   │         │
│  │ Avg Ratng│ │ Low Stck │ │ Fulfill  │         │
│  └──────────┘ └──────────┘ └──────────┘         │
│                                                  │
│  ⚡ Pending Actions                              │
│  ┌─────────────────────────────────────────┐     │
│  │ 🔴 5 orders waiting to ship             │     │
│  │ 🟡 2 returns to process                 │     │
│  │ 🟡 3 reviews need reply                 │     │
│  │ 🔴 KYC documents expiring in 7 days     │     │
│  └─────────────────────────────────────────┘     │
│                                                  │
│  📈 Revenue Chart (7d / 30d toggle)              │
│  ┌─────────────────────────────────────────┐     │
│  │  ▁▃▅▇▅▃▅▇█▅▃▁▃▅▇█▅▃▅▇▅▃▁▃▅▇█▅        │     │
│  └─────────────────────────────────────────┘     │
└─────────────────────────────────────────────────┘
```

### 5.2 Product List (Dukaan-Style)

```
┌─────────────────────────────────────────────────┐
│  Products (124)           [+ Add Product] [🔍]  │
│  ┌────┬────┬────┐                                │
│  │ All│Actv│Drft│  Filter ▼  Sort ▼  Export ▼   │
│  └────┴────┴────┘                                │
├─────────────────────────────────────────────────┤
│  ☐ │ 🖼️ │ Product Name      │ Price  │ Stock │ ★│
│  ──│────│───────────────────│────────│───────│──│
│  ☐ │ 📷 │ Almonds (250g)    │ ₹599   │ 42    │4.5│
│  ☐ │ 📷 │ Cashews (500g)    │ ₹899   │ 18 ⚠ │4.2│
│  ☐ │ 📷 │ Walnuts (1kg)     │ ₹1,299 │ 0  🔴│3.8│
│  ☐ │ 📷 │ Mixed Dry Fruits  │ ₹1,499 │ 55    │4.7│
│  ☐ │ 📷 │ Raisins (200g)    │ ₹199   │ 120   │4.0│
├─────────────────────────────────────────────────┤
│  ← 1 2 3 ... 13 →      Showing 1-10 of 124     │
└─────────────────────────────────────────────────┘
```

### 5.3 Customer Storefront

```
┌─────────────────────────────────────────────────┐
│  🟣 NutriDry   [🔍 Search...]   [❤️] [🛒 3]    │
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌─────────────────────────────────────────┐     │
│  │         🎄 WINTER SALE - 30% OFF       │     │
│  │         Use code: WINTER30              │     │
│  └─────────────────────────────────────────┘     │
│                                                  │
│  📂 Categories                                   │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐             │
│  │Nuts│ │Seed│ │Frt │ │Mix │ │New │             │
│  └────┘ └────┘ └────┘ └────┘ └────┘             │
│                                                  │
│  🔥 Trending Now                                 │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐            │
│  │ 📷   │ │ 📷   │ │ 📷   │ │ 📷   │            │
│  │Almond│ │Cashew│ │Walnut│ │Mix   │            │
│  │₹599  │ │₹899  │ │₹1299 │ │₹1499 │            │
│  │★ 4.5 │ │★ 4.2 │ │★ 3.8 │ │★ 4.7 │            │
│  │[Cart]│ │[Cart]│ │[Cart]│ │[Cart]│            │
│  └──────┘ └──────┘ └──────┘ └──────┘            │
│                                                  │
│  ⭐ Customer Reviews                             │
│  "Best quality almonds!" — Rahul, Mumbai ★★★★★   │
└─────────────────────────────────────────────────┘
```

### 5.4 AI Assistant (Floating Widget)

```
┌──────────────────────────────────┐
│  🤖 VyapaarPe AI                │
│  ─────────────────────           │
│  🤖: Hi Faisal! How can I help? │
│                                  │
│  You: Show today's orders        │
│                                  │
│  🤖: You have 12 new orders     │
│     today! Total value: ₹24,500  │
│     ┌──────────────────────┐     │
│     │ 5 pending shipment   │     │
│     │ 3 out for delivery   │     │
│     │ 4 delivered ✅        │     │
│     └──────────────────────┘     │
│     Would you like to process    │
│     pending shipments?           │
│                                  │
│  ┌──────────────────────┐        │
│  │ Type a message...    │ [Send] │
│  └──────────────────────┘        │
│                                  │
│  Quick: [Today's revenue]        │
│         [Low stock items]        │
│         [Create a coupon]        │
└──────────────────────────────────┘
```

---

## 6. Animations & Micro-Interactions

### 6.1 Page Transitions

```css
/* Cascading slide-up animation (used in pitch deck too) */
.page-enter > * {
  opacity: 0;
  animation: slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.page-enter > *:nth-child(1) { animation-delay: 0.1s; }
.page-enter > *:nth-child(2) { animation-delay: 0.2s; }
.page-enter > *:nth-child(3) { animation-delay: 0.3s; }

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); filter: blur(4px); }
  to   { opacity: 1; transform: translateY(0); filter: blur(0); }
}
```

### 6.2 Interactive Elements

| Element | Animation | Duration |
|---------|-----------|----------|
| Button hover | Scale(1.02) + shadow grow | 200ms |
| Card hover | TranslateY(-4px) + border glow | 400ms |
| Tab switch | Content fade + slide | 300ms |
| Modal open | Scale from 0.95 + fade | 300ms |
| Toast notification | Slide in from right + auto-dismiss | 300ms in, 5s hold |
| Skeleton loading | Shimmer gradient animation | Infinite loop |
| Star rating hover | Scale bounce per star | 150ms |
| Toggle switch | Smooth slide with color transition | 200ms |
| Progress bar | Width transition with ease-out | 800ms |
| Number count-up | Animated number increment | 1200ms |

---

## 7. Responsive Breakpoints

```css
/* Mobile First — Like Dukaan's approach */
/* Default: Mobile (< 640px)  */
/* sm:  ≥ 640px  — Large phone / small tablet */
/* md:  ≥ 768px  — Tablet */
/* lg:  ≥ 1024px — Desktop */
/* xl:  ≥ 1280px — Large desktop */
/* 2xl: ≥ 1536px — Ultra-wide */

/* Sidebar behavior */
/* Mobile: Hidden, toggle hamburger → full overlay */
/* Tablet: Collapsed (64px, icons only) */
/* Desktop: Expanded (240px, full labels) */

/* Product grid */
/* Mobile: 2 columns */
/* Tablet: 3 columns */
/* Desktop: 4 columns */
/* Large: 5 columns */
```

---

## 8. Storefront Themes (Like Dukaan's Theme Gallery)

### Available Themes

| Theme | Style | Best For | Modes |
|-------|-------|----------|-------|
| **Classic** | Clean, minimal white | General stores | Light |
| **Modern** | Bold typography, large images | Fashion, beauty | Light, Dark |
| **Ursa** | Dark premium, glassmorphism | Electronics, luxury | Dark |
| **Fresh** | Bright colors, playful | Food, organic | Light |
| **Minimal** | Ultra-clean, lots of whitespace | Single product brand | Light, Dark |
| **NutriDry** | Warm browns, natural feel | Dry fruits, health | Light |
| **Festive** | Auto-applied seasonal overlays | Any (auto-detect holiday) | Both |

### Theme Customization (Seller Can Edit)

- Primary color picker (brand color)
- Font selection (from curated list of 15 fonts)
- Logo upload (auto-resize to 200x60px)
- Banner/hero image
- Layout: boxed vs full-width
- Card style: flat vs elevated vs glassmorphism
- Button style: rounded, square, pill
- Header: sticky vs static
- Footer: columns config (links, social, newsletter)

---

## 9. Icon System

- **Dashboard/Seller:** Emoji icons (consistent with diagram data approach)
- **Storefront UI:** Lucide Icons (24x24, 1.5px stroke)
- **Status indicators:**
  - 🟢 Active / Success / Delivered
  - 🟡 Pending / Warning / Processing
  - 🔴 Error / Urgent / Out of Stock
  - ⚪ Inactive / Disabled

---

## 10. Accessibility (WCAG 2.1 AA)

| Check | Implementation |
|-------|---------------|
| Color contrast | Min 4.5:1 (text), 3:1 (large text) |
| Focus indicators | 2px purple outline on all interactive elements |
| Keyboard nav | Full keyboard support, skip-to-content link |
| Screen readers | Semantic HTML, ARIA labels, alt text on all images |
| Motion | `prefers-reduced-motion` respected, disable animations |
| Font scaling | Supports up to 200% zoom without break |
| Touch targets | Min 44×44px on mobile (all buttons/links) |

---

## 11. Admin Panel Design

```
┌─────────────────────────────────────────────────┐
│  👑 VyapaarPe Admin          [🔔] [Admin ▼]    │
├──────────┬──────────────────────────────────────┤
│ Sidebar  │                                      │
│          │  Platform Overview                   │
│ 📊 Dash  │  ┌────────┐ ┌────────┐ ┌────────┐   │
│ 🏪 Sellr │  │ 1,247  │ │ ₹45.2L │ │ 12,450 │   │
│ 💰 Finac │  │ Sellers│ │  GMV   │ │ Orders │   │
│ 🎫 Suprt │  └────────┘ └────────┘ └────────┘   │
│ ⚙️ Ops   │                                      │
│ 📢 Markt │  Recent Sellers Pending KYC          │
│ 📋 Plans │  ┌───────────────────────────────┐   │
│ 📊 Reprt │  │ NutriDry    │ KYC ⏳ │ [View] │   │
│ 🔐 Roles │  │ FashionHub  │ KYC ⏳ │ [View] │   │
│ 📝 Logs  │  │ TechStore   │ KYC ✅ │ [View] │   │
│          │  └───────────────────────────────┘   │
└──────────┴──────────────────────────────────────┘
```

---

## 12. Phase 12 — Additional Page Wireframes

### 12.1 Live Chat Widget (Customer Side)

```
┌──────────────────────────────────┐
│  💬 Chat with NutriDry     [✕]  │
│  ─────────────────────           │
│  🤖: Hi! How can I help you?    │
│                                  │
│  You: Where is my order #1234?   │
│                                  │
│  🤖: Your order #1234 is out    │
│     for delivery! Expected by    │
│     4:00 PM today.               │
│     ┌────────────────────┐       │
│     │ 🚚 Track Live      │       │
│     └────────────────────┘       │
│                                  │
│  ┌──────────────────────┐        │
│  │ Type a message... 📎│ [Send] │
│  └──────────────────────┘        │
│  ⏰ Business hours: 9AM - 9PM   │
└──────────────────────────────────┘
```

### 12.2 Flash Sale Banner + Countdown

```
┌─────────────────────────────────────────────────┐
│  ⚡ FLASH SALE ⚡                               │
│  ┌─────────────────────────────────────────┐     │
│  │  🔥 Almonds 500g — ₹599 → ₹399  (33% OFF)│  │
│  │                                          │    │
│  │  ⏰ Ends in: 02:45:30                   │    │
│  │  📊 Only 5 left! ████████░░ 83% sold    │    │
│  │                                          │    │
│  │  [🛒 Add to Cart]                       │    │
│  └──────────────────────────────────────────┘    │
│                                                   │
│  More Flash Deals:                                │
│  ┌──────┐ ┌──────┐ ┌──────┐                      │
│  │Cashew│ │Walnut│ │Raisin│                      │
│  │₹899→ │ │₹1299→│ │₹199→ │                      │
│  │₹699  │ │₹999  │ │₹149  │                      │
│  └──────┘ └──────┘ └──────┘                      │
└─────────────────────────────────────────────────┘
```

### 12.3 Gift Card Creation (Seller Dashboard)

```
┌─────────────────────────────────────────────────┐
│  🎁 Create Gift Card                            │
├─────────────────────────────────────────────────┤
│                                                  │
│  Denomination:  [₹500] [₹1000] [₹2000] [Custom] │
│  Custom Amount: [₹______]                        │
│                                                  │
│  Delivery Method:   ○ Email  ○ SMS  ○ WhatsApp   │
│  Recipient Email:   [________________]           │
│  Personal Message:  [________________]           │
│                                                  │
│  Design Template:                                │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐            │
│  │🎄Fest│ │🎂Bday│ │❤️Love│ │🎉Cong│            │
│  └──────┘ └──────┘ └──────┘ └──────┘            │
│                                                  │
│  Expiry: [6 months ▼]  □ Corporate/Bulk          │
│                                                  │
│  [Cancel]                    [Create Gift Card]  │
└─────────────────────────────────────────────────┘
```

### 12.4 Guest Checkout Flow

```
┌─────────────────────────────────────────────────┐
│  🛒 Checkout (Guest)                            │
├─────────────────────────────────────────────────┤
│  Step 1/3: Contact Info                          │
│                                                  │
│  Email:    [________________]                    │
│  Phone:    [+91 __________]                      │
│                                                  │
│  ▸ Already have an account? [Log in]             │
│                                                  │
│  Step 2/3: Delivery Address                      │
│  Full Name: [________________]                   │
│  Line 1:    [________________]                   │
│  City:      [______] State: [______]             │
│  Pincode:   [______] ✅ Deliverable              │
│                                                  │
│  Step 3/3: Payment                               │
│  ○ UPI  ○ Card  ○ Netbanking  ○ COD             │
│                                                  │
│  [← Back]                      [Place Order ₹1,499] │
│                                                  │
│  ℹ️ Create account after purchase to track       │
│     orders easily and earn loyalty points!       │
└─────────────────────────────────────────────────┘
```

### 12.5 Store Vacation Mode (Seller Settings)

```
┌─────────────────────────────────────────────────┐
│  🏖️ Vacation Mode                  [Toggle: ON] │
├─────────────────────────────────────────────────┤
│                                                  │
│  ⚠️ Your store is currently on vacation.         │
│  Customers see your vacation message instead of  │
│  the regular store.                              │
│                                                  │
│  Custom Message:                                 │
│  ┌─────────────────────────────────────────┐     │
│  │ We're on holiday! Back on Jan 5, 2026.  │     │
│  │ For urgent queries, email us at         │     │
│  │ support@nutridry.com                    │     │
│  └─────────────────────────────────────────┘     │
│                                                  │
│  Schedule:  [Start: Jan 1] to [End: Jan 5]       │
│                                                  │
│  Order Behavior:  ○ Block new orders             │
│                   ○ Accept but delay fulfillment │
│                                                  │
│  □ Auto-pause active subscriptions               │
│  □ Notify subscribed customers                   │
│                                                  │
│  ⚠️ 3 pending orders exist. Fulfill before       │
│     enabling vacation.                           │
│                                                  │
│  [Save Settings]                                 │
└─────────────────────────────────────────────────┘
```

### 12.6 Services & Booking (Customer View)

```
┌─────────────────────────────────────────────────┐
│  📅 Book a Service                               │
├─────────────────────────────────────────────────┤
│                                                  │
│  Available Services:                             │
│  ┌─────────────────────────────────────────┐     │
│  │ ✂️ Hair Styling       60 min    ₹500    │     │
│  │    Provider: Rahul                      │     │
│  │    [Book Now]                           │     │
│  ├─────────────────────────────────────────┤     │
│  │ 💅 Nail Art           45 min    ₹300    │     │
│  │    Provider: Priya                      │     │
│  │    [Book Now]                           │     │
│  ├─────────────────────────────────────────┤     │
│  │ 💆 Full Body Massage  90 min   ₹1,200   │    │
│  │    Provider: Amit                       │     │
│  │    [Book Now]                           │     │
│  └─────────────────────────────────────────┘     │
│                                                  │
│  📅 Select Date: [Jan 15, 2026 ▼]               │
│  ⏰ Select Time:                                 │
│  [10:00] [11:00] [12:00] [14:00] [15:00] [16:00]│
│                                                  │
│  ○ One-time  ○ Weekly recurring  ○ Monthly       │
│                                                  │
│  [Confirm Booking]                               │
└─────────────────────────────────────────────────┘
```

### 12.7 Affiliate Dashboard

```
┌─────────────────────────────────────────────────┐
│  🤝 Affiliate Dashboard         Tier: 🥈 Silver │
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐         │
│  │   1,245  │ │    47    │ │  ₹4,700  │         │
│  │  Clicks  │ │  Sales   │ │ Earned   │         │
│  │ This Mo  │ │ Convertn │ │ Pending  │         │
│  └──────────┘ └──────────┘ └──────────┘         │
│                                                  │
│  Your Referral Link:                             │
│  ┌─────────────────────────────────────────┐     │
│  │ nutridry.vyapaarpe.com?ref=RAHUL123    │ [📋]│
│  └─────────────────────────────────────────┘     │
│                                                  │
│  Commission: 8% per sale | Min Payout: ₹500     │
│  Next Payout: ₹4,700 on Feb 1, 2026             │
│                                                  │
│  📈 Performance Chart (30d)                      │
│  ┌─────────────────────────────────────────┐     │
│  │  ▁▃▅▇▅▃▅▇█▅▃▁▃▅▇█▅▃▅▇▅▃▁▃▅▇█▅        │     │
│  └─────────────────────────────────────────┘     │
└─────────────────────────────────────────────────┘
```

### 12.8 Store Policies Page (AI Generator)

```
┌─────────────────────────────────────────────────┐
│  📜 Store Policies                               │
├─────────────────────────────────────────────────┤
│                                                  │
│  [Return] [Refund] [Shipping] [Privacy] [Terms]  │
│  ────────────────────────────────────────────── │
│                                                  │
│  ↩️ Return Policy                                │
│  ┌─────────────────────────────────────────┐     │
│  │ Returns accepted within 7 days of       │     │
│  │ delivery. Products must be unopened     │     │
│  │ and in original packaging...            │     │
│  │                                         │     │
│  │ [🤖 AI Regenerate]  [✏️ Edit Manually]  │     │
│  └─────────────────────────────────────────┘     │
│                                                  │
│  ☑ Auto-generate from store settings             │
│  ☑ Auto-link in storefront footer                │
│                                                  │
│  ⚠️ Missing: Refund Policy not set.             │
│     Customers expect clear refund terms.         │
│     [Generate with AI →]                         │
│                                                  │
│  [Save & Publish All]                            │
└─────────────────────────────────────────────────┘
```

---

## 13. Updated Sidebar Navigation (Full Module List)

```
┌──────────────────────┐
│  🟣 VyapaarPe        │
│  ──────────────────── │
│  🏠 Home / Dashboard │
│  📦 Products         │
│  📂 Categories       │
│  🛒 Orders           │
│  👥 Customers        │
│  🔄 Subscriptions    │
│  ↩️ Returns          │
│  💰 Wallet           │
│  🎫 Coupons          │
│  ⚡ Flash Sales       │
│  🎁 Gift Cards       │
│  📦 Bundles          │
│  🚚 Shipping         │
│  📋 Services         │
│  ──────────────────── │
│  📊 Analytics        │
│  📈 Reports          │
│  👥 Segments         │
│  ──────────────────── │
│  💬 Live Chat        │
│  📧 Communication    │
│  🤝 Affiliates       │
│  📱 Social Commerce  │
│  ──────────────────── │
│  🌐 Website Builder  │
│  📝 Blog / CMS       │
│  📱 App Builder      │
│  🔌 Plugins          │
│  🔑 Webhooks & API   │
│  ──────────────────── │
│  🤖 AI Assistant     │
│  ⚙️ Settings         │
│  📜 Policies         │
│  🏖️ Vacation Mode    │
│  🏪 Multi-Store      │
│  📦 Store Migration  │
│  🖨️ Print & Labels   │
└──────────────────────┘
```

---

## 14. Design Tokens Summary

```css
/* Spacing Scale (4px base) */
--space-1: 4px;   --space-2: 8px;   --space-3: 12px;
--space-4: 16px;  --space-5: 20px;  --space-6: 24px;
--space-8: 32px;  --space-10: 40px; --space-12: 48px;
--space-16: 64px;

/* Border Radius */
--radius-sm: 6px;
--radius-md: 10px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-full: 9999px;

/* Z-Index Scale */
--z-dropdown: 10;
--z-sticky: 20;
--z-modal-backdrop: 40;
--z-modal: 50;
--z-toast: 60;
--z-chat-widget: 65;
--z-ai-widget: 70;
--z-tooltip: 80;

/* Transitions */
--transition-fast: 150ms ease;
--transition-normal: 300ms cubic-bezier(0.16, 1, 0.3, 1);
--transition-slow: 500ms cubic-bezier(0.16, 1, 0.3, 1);

/* Gradients */
--gradient-primary: linear-gradient(135deg, #8c7ae6, #00cec9);
--gradient-warm: linear-gradient(135deg, #fd79a8, #fdcb6e);
--gradient-dark: linear-gradient(135deg, #1e1b4b, #312e81);
--gradient-flash-sale: linear-gradient(135deg, #ff6b6b, #fdcb6e);
```

---

*Design System v1.1 — VyapaarPe (Inspired by Dukaan)*  
*Fonts: Inter + Noto Sans Devanagari | Icons: Emoji + Lucide*  
*Themes: 7 pre-built | Dark Mode First | WCAG 2.1 AA Compliant*  
*Wireframes: 12 total (Dashboard, Products, Storefront, AI, Admin + 8 Phase 12 modules)*

---

## 15. Core Module Wireframes

### 15.1 Seller Dashboard (Home)

```
┌─────────────────────────────────────────────────┐
│  🟣 NutriDry                    [🔔3] [Rahul ▼] │
├──────────┬──────────────────────────────────────┤
│ Sidebar  │  📊 Dashboard                        │
│          │  ┌────────┐ ┌────────┐ ┌────────┐   │
│ 🏠 Home  │  │ ₹24.5K │ │   37   │ │  4.6⭐ │   │
│ 📦 Prods │  │Revenue │ │Orders  │ │ Rating │   │
│ 📂 Cats  │  │ ↑12%   │ │ ↑5%   │ │ ↑0.2  │   │
│ 🛒 Ordrs │  └────────┘ └────────┘ └────────┘   │
│ 👥 Custs │                                      │
│ ...      │  ⚠️ Pending Actions (4)              │
│          │  ├─ 📦 3 orders to ship              │
│          │  ├─ ↩️ 1 return to process            │
│          │  └─ 💬 2 reviews to reply            │
│          │                                      │
│          │  📈 Revenue (Last 30 Days)            │
│          │  ┌─────────────────────────────┐     │
│          │  │ ▁▃▅▇▅▃▅▇█▅▃▁▃▅▇█▅▃▅▇▅    │     │
│          │  │ Jan 1       Jan 15      Jan 30│   │
│          │  └─────────────────────────────┘     │
│          │                                      │
│          │  🏥 Store Health: 92/100 🟢          │
│          │  ├─ Fulfillment Rate: 95%            │
│          │  ├─ Response Time: 2.1 hrs           │
│          │  └─ Complaint Rate: 0.3%             │
│          │                                      │
│          │  🚨 Alerts:                           │
│          │  ├─ ⚠️ Low stock: Almonds 500g (3)   │
│          │  └─ ⏰ Plan expires in 7 days        │
└──────────┴──────────────────────────────────────┘
```

### 15.2 Checkout Flow (Multi-Step)

```
┌─────────────────────────────────────────────────┐
│  🛒 Checkout — NutriDry                         │
│  ① Address ─── ② Shipping ─── ③ Payment ─── ④ │
│  ●━━━━━━━━━━━━●━━━━━━━━━━━━━○ ─ ─ ─ ─ ─ ─ ○   │
├─────────────────────────────────────────────────┤
│                                                  │
│  🏠 Delivery Address                            │
│  ┌─────────────────────────────────────────┐     │
│  │ ○ Home — Rahul Sharma                   │     │
│  │   123 MG Road, Mumbai 400001    [Edit]  │     │
│  │ ● Office — Rahul Sharma                 │     │
│  │   456 Bandra West, Mumbai 400050        │     │
│  └─────────────────────────────────────────┘     │
│  [+ Add New Address]                             │
│                                                  │
│  🚚 Shipping Method                              │
│  ○ Standard (3-5 days) — FREE                    │
│  ● Express (1-2 days) — ₹49                     │
│  ○ Same Day — ₹99 (order before 2PM)            │
│  Time Slot: [Morning 8-12 ▼]                    │
│                                                  │
│  🎫 Coupon: [FLAT100____] [Apply]  ✅ ₹100 off  │
│  💰 Use Wallet: [Toggle ●] Using ₹200           │
│                                                  │
│  ┌─────────────────────────────────────────┐     │
│  │ Subtotal:     ₹1,799                   │     │
│  │ Discount:     -₹100  (FLAT100)          │     │
│  │ Wallet:       -₹200                    │     │
│  │ Shipping:     +₹49   (Express)          │     │
│  │ GST (5%):     +₹77                     │     │
│  │ ─────────────────────                   │     │
│  │ Total:        ₹1,625                   │     │
│  └─────────────────────────────────────────┘     │
│                                                  │
│  [← Back]              [Pay ₹1,625 →]           │
└─────────────────────────────────────────────────┘
```

### 15.3 Return Request Flow

```
┌─────────────────────────────────────────────────┐
│  ↩️ Return Request — Order #VP12345             │
├─────────────────────────────────────────────────┤
│                                                  │
│  Item: Almonds 500g Premium                      │
│  Ordered: Jan 5, 2026  |  Delivered: Jan 8       │
│  Return window: 7 days (expires Jan 15)          │
│                                                  │
│  Reason:                                         │
│  ○ Defective / Damaged                           │
│  ● Wrong item received                           │
│  ○ Not as described                              │
│  ○ Don't need anymore                            │
│                                                  │
│  📸 Upload Photos (Evidence):                    │
│  ┌──────┐ ┌──────┐ ┌──────┐                     │
│  │ 📷   │ │ 📷   │ │  +   │                     │
│  │Photo1│ │Photo2│ │ Add  │                     │
│  └──────┘ └──────┘ └──────┘                     │
│                                                  │
│  Resolution Preference:                          │
│  ○ Full Refund (to original payment)             │
│  ● Replacement                                   │
│  ○ Store Credit (wallet)                         │
│                                                  │
│  Pickup Scheduling:                              │
│  Date: [Jan 12, 2026 ▼]                         │
│  Slot: [Morning 10-12 ▼]                        │
│                                                  │
│  [Cancel]                 [Submit Return]         │
└─────────────────────────────────────────────────┘
```

### 15.4 Wallet Dashboard

```
┌─────────────────────────────────────────────────┐
│  💰 Your Wallet                                  │
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌───────────────────────────────────────┐       │
│  │     Balance: ₹1,250                  │       │
│  │     Cashback: ₹350                   │       │
│  │     Total Available: ₹1,600          │       │
│  │                                       │       │
│  │     [+ Add Money]     [Use at Checkout]│      │
│  └───────────────────────────────────────┘       │
│                                                  │
│  📊 Transaction History                          │
│  ┌───────────────────────────────────────┐       │
│  │ Jan 10 │ ↗️ Cashback     │ +₹50  🟢 │       │
│  │ Jan 8  │ ↙️ Order #1234  │ -₹500 🔴 │       │
│  │ Jan 5  │ ↗️ Topup (UPI)  │ +₹1000 🟢│       │
│  │ Jan 3  │ ↗️ Refund #1220 │ +₹300 🟢 │       │
│  └───────────────────────────────────────┘       │
│                                                  │
│  ⚠️ ₹150 cashback expires in 5 days             │
└─────────────────────────────────────────────────┘
```

### 15.5 Subscription Management (Customer)

```
┌─────────────────────────────────────────────────┐
│  🔄 My Subscriptions                            │
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌─────────────────────────────────────────┐     │
│  │ Almonds 500g — Weekly              🟢  │     │
│  │ ₹449/week (10% off)  |  Next: Jan 15   │     │
│  │                                         │     │
│  │ 📅 Delivery Calendar:                  │     │
│  │ Jan 8 ✅  Jan 15 📦  Jan 22 ⏳         │     │
│  │                                         │     │
│  │ [Skip Next] [Pause] [Change Address]    │     │
│  └─────────────────────────────────────────┘     │
│                                                  │
│  ┌─────────────────────────────────────────┐     │
│  │ Cashews 250g — Monthly             ⏸️  │     │
│  │ ₹599/month  |  Paused until Feb 1      │     │
│  │ Reason: On vacation                     │     │
│  │                                         │     │
│  │ [Resume Now]  [Cancel]                  │     │
│  └─────────────────────────────────────────┘     │
│                                                  │
│  Available Plans:                                │
│  ┌──────┐ ┌──────┐ ┌──────┐                     │
│  │Daily │ │Weekly│ │Month │                     │
│  │5% off│ │10%off│ │15%off│                     │
│  └──────┘ └──────┘ └──────┘                     │
└─────────────────────────────────────────────────┘
```

### 15.6 Notification Center

```
┌─────────────────────────────────────────────────┐
│  🔔 Notifications    [Mark All Read] [⚙️ Prefs] │
├─────────────────────────────────────────────────┤
│                                                  │
│  Today                                           │
│  ┌─────────────────────────────────────────┐     │
│  │ 🟣 Order #VP12350 shipped!             │     │
│  │    Track: awb.shiprocket.in/123        │     │
│  │    2 hours ago                          │     │
│  ├─────────────────────────────────────────┤     │
│  │ ● 💰 Cashback ₹50 credited            │     │
│  │    For order #VP12348                  │     │
│  │    5 hours ago                          │     │
│  └─────────────────────────────────────────┘     │
│                                                  │
│  Yesterday                                       │
│  ┌─────────────────────────────────────────┐     │
│  │ ○ 🎫 Flash Sale starts tomorrow!       │     │
│  │    Up to 40% off on premium nuts       │     │
│  └─────────────────────────────────────────┘     │
│                                                  │
│  ⚙️ Notification Preferences:                    │
│  WhatsApp [●]  Email [●]  SMS [○]  Push [●]     │
│  DND: 10 PM – 8 AM [●]                          │
└─────────────────────────────────────────────────┘
```

### 15.7 Search & Discovery

```
┌─────────────────────────────────────────────────┐
│  🔍 [almonds________] [🔍]                      │
│  ─────────────────────────                       │
│  Suggestions:                                    │
│  ├─ 🔥 almonds 500g (most popular)              │
│  ├─ almonds california                           │
│  ├─ almonds roasted                              │
│  └─ almonds blanched                             │
├─────────────────────────────────────────────────┤
│                                                  │
│  📊 12 results for "almonds"                     │
│  Sort: [Relevance ▼]                             │
│                                                  │
│  Filters:                                        │
│  Price:  [₹0 ═══●═══ ₹2000]                     │
│  Rating: ⭐⭐⭐⭐+ [●]                             │
│  In Stock Only: [●]                              │
│  Category: □ Dry Fruits □ Seeds □ Trail Mix      │
│                                                  │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐            │
│  │ 🥜  │ │ 🥜  │ │ 🥜  │ │ 🥜  │            │
│  │Almon│ │Calfr│ │Roast│ │Slice│            │
│  │₹499 │ │₹699 │ │₹549 │ │₹399 │            │
│  │⭐4.5│ │⭐4.8│ │⭐4.3│ │⭐4.1│            │
│  │[Cart]│ │[Cart]│ │[Cart]│ │[Cart]│           │
│  └──────┘ └──────┘ └──────┘ └──────┘            │
└─────────────────────────────────────────────────┘
```

### 15.8 AI Catalogue Builder

```
┌─────────────────────────────────────────────────┐
│  🤖 AI Catalogue Builder           Step 2/4     │
│  ① Upload ─── ② Review ─── ③ Edit ─── ④ Pub   │
├─────────────────────────────────────────────────┤
│                                                  │
│  📦 AI Generated Products (batch 1 of 3)        │
│  Progress: ████████░░ 73%  (37/50 items)        │
│                                                  │
│  ┌─────────────────────────────────────────┐     │
│  │ ✅ Almonds Premium 500g                │     │
│  │    Category: Dry Fruits (AI: 95% conf) │     │
│  │    Price: ₹599  | HSN: 0802.11         │     │
│  │    Description: "Premium California..."│     │
│  │    [✏️ Edit] [❌ Reject] [✅ Approve]   │     │
│  ├─────────────────────────────────────────┤     │
│  │ ⚠️ Cashew Mix 250g                     │     │
│  │    Category: Snacks (AI: 72% conf)     │     │
│  │    ⚠️ Low confidence — review needed   │     │
│  │    [✏️ Edit] [❌ Reject] [✅ Approve]   │     │
│  └─────────────────────────────────────────┘     │
│                                                  │
│  Token Usage: 2,340 / 5,000 daily               │
│  [⏸️ Pause] [Select All ✅] [Approve Selected]  │
└─────────────────────────────────────────────────┘
```

### 15.9 Reports Builder

```
┌─────────────────────────────────────────────────┐
│  📊 Report Builder                               │
├─────────────────────────────────────────────────┤
│                                                  │
│  Report Type: [Sales Report ▼]                   │
│  Date Range:  [Jan 1, 2026] to [Jan 31, 2026]   │
│                                                  │
│  Group By: ○ Day  ● Week  ○ Month  ○ Product    │
│                                                  │
│  Columns: ☑ Revenue ☑ Orders ☑ AOV ☐ Customers  │
│                                                  │
│  ┌─────────────────────────────────────────┐     │
│  │ Week 1  │ ₹24,500 │  37 orders │ ₹662  │     │
│  │ Week 2  │ ₹31,200 │  45 orders │ ₹693  │     │
│  │ Week 3  │ ₹28,900 │  41 orders │ ₹705  │     │
│  │ Week 4  │ ₹35,100 │  52 orders │ ₹675  │     │
│  │ ─────── │ ─────── │ ────────── │ ───── │     │
│  │ Total   │ ₹1,19,700│ 175 orders│ ₹684  │     │
│  └─────────────────────────────────────────┘     │
│                                                  │
│  [📥 CSV] [📥 PDF] [📥 Excel]  [📧 Schedule]   │
│                                                  │
│  ⏰ Scheduled Reports:                           │
│  ├─ Daily Sales → rahul@nutridry.com (8 AM)     │
│  └─ Weekly Summary → team@nutridry.com (Mon)    │
└─────────────────────────────────────────────────┘
```

### 15.10 Product Bundles (Seller)

```
┌─────────────────────────────────────────────────┐
│  📦 Create Bundle                                │
├─────────────────────────────────────────────────┤
│                                                  │
│  Bundle Name: [Trail Mix Combo____________]      │
│  Description: [3 best-selling dry fruits..]      │
│                                                  │
│  Products in Bundle:                             │
│  ┌─────────────────────────────────────────┐     │
│  │ 1. Almonds 500g      ₹599    Qty: [1]  │     │
│  │ 2. Cashews 250g      ₹449    Qty: [1]  │     │
│  │ 3. Raisins 250g      ₹199    Qty: [1]  │     │
│  │ [+ Add Product]                        │     │
│  └─────────────────────────────────────────┘     │
│                                                  │
│  💰 Pricing:                                     │
│  Individual Total: ₹1,247                        │
│  Bundle Price:     [₹999_____]                   │
│  You Save: ₹248 (20% off) 🏷️                    │
│                                                  │
│  ☑ Show "Save ₹248" badge on storefront         │
│  ☐ Allow Mix & Match (customer picks 3)          │
│                                                  │
│  Stock: Min(Almonds:45, Cashews:23, Raisins:60)  │
│  = 23 bundles available                          │
│                                                  │
│  [Cancel]                [Create Bundle]         │
└─────────────────────────────────────────────────┘
```

### 15.11 Storefront — Product Detail Page

```
┌─────────────────────────────────────────────────┐
│  NutriDry 🟣           🔍 [Search]  🛒 Cart(2) │
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌──────────┐  Premium California Almonds       │
│  │          │  ⭐ 4.6 (127 reviews)             │
│  │  [Image] │                                   │
│  │          │  ₹599  ₹̶7̶9̶9̶  (25% off)           │
│  │          │  Inclusive of all taxes             │
│  └──────────┘                                    │
│  [●] [○] [○] [○]                                │
│                                                  │
│  Size:  [250g ₹349] [●500g ₹599] [1kg ₹1099]   │
│                                                  │
│  Qty: [- 1 +]            📦 In Stock (45 left)  │
│                                                  │
│  [🛒 Add to Cart]  [❤️ Wishlist]  [📤 Share]    │
│                                                  │
│  🚚 Delivery to [400001]: 2-3 days  FREE        │
│  🔄 7-day easy returns                           │
│  🎁 Subscribe & save 10%                        │
│                                                  │
│  ── Description ──                               │
│  100% natural, hand-picked California almonds... │
│                                                  │
│  ── Reviews (127) ──                             │
│  ⭐⭐⭐⭐⭐ Rahul S. — "Best quality almonds!"     │
│  ⭐⭐⭐⭐  Priya M. — "Good but slightly small"   │
│                                                  │
│  ── You May Also Like ──                        │
│  ┌──────┐ ┌──────┐ ┌──────┐                     │
│  │Cashew│ │Walnut│ │Trail │                     │
│  │₹449  │ │₹899  │ │₹249  │                     │
│  └──────┘ └──────┘ └──────┘                     │
└─────────────────────────────────────────────────┘
```

### 15.12 Website Builder (Drag & Drop)

```
┌─────────────────────────────────────────────────┐
│  🌐 Website Builder        [Preview] [Publish]  │
├──────────┬──────────────────────────────────────┤
│ Widgets  │                                      │
│          │  ┌─ Hero Banner ─────────────────┐   │
│ 🖼️ Banner│  │  🍂 Premium Dry Fruits       │   │
│ 📦 Prods │  │  Taste the difference         │   │
│ 📂 Cats  │  │       [Shop Now]              │   │
│ 💬 Review│  └──────────────────────────────┘   │
│ 🎥 Video │                                      │
│ 📝 Text  │  ┌─ Product Grid (Featured) ───┐   │
│ 📢 Announ│  │  ┌────┐ ┌────┐ ┌────┐ ┌────┐│   │
│          │  │  │Almd│ │Cash│ │Wlnt│ │Mixx││   │
│ Layout:  │  │  └────┘ └────┘ └────┘ └────┘│   │
│ [Full]   │  └──────────────────────────────┘   │
│ [Sidebar]│                                      │
│ [Grid]   │  ┌─ Category Cards ─────────────┐   │
│          │  │  [Nuts] [Seeds] [Trail Mix]   │   │
│ SEO:     │  └──────────────────────────────┘   │
│ Title:   │                                      │
│ [NutriDr]│  ┌─ Testimonials ───────────────┐   │
│ Desc:    │  │  "Best store!" — Rahul ⭐⭐⭐⭐⭐│   │
│ [Fresh..]│  └──────────────────────────────┘   │
│          │                                      │
│ 📢 Announcement Bar:                           │
│ [Free shipping above ₹500!]                    │
└──────────┴──────────────────────────────────────┘
```

---

## 16. Mobile App Design Patterns

### Customer App

| Screen | Key Elements |
|--------|-------------|
| Home Feed | Search bar, category chips, product grid (2 cols), flash sale banner |
| Product Detail | Swipeable gallery, sticky add-to-cart bar, reviews accordion |
| Cart | Swipe-to-delete, coupon input, wallet toggle |
| Checkout | Stepper with address → shipping → payment flow |
| Order Tracking | Live progress bar, map (if supported), courier contact |
| Subscriptions | Calendar view, pause/skip with one tap |

### Seller App

| Screen | Key Elements |
|--------|-------------|
| Dashboard | Revenue card, pending orders count, new messages |
| New Order Alert | Push notification → Accept/Reject quick actions |
| Order Detail | Status update dropdown, AWB entry, print label |
| Quick Product Add | Camera + text field → AI generates product |
| Daily Stats Widget | Home screen widget with revenue + orders |

---

*Design System v2.0 — VyapaarPe (Inspired by Dukaan)*  
*Fonts: Inter + Noto Sans Devanagari | Icons: Emoji + Lucide*  
*Themes: 7 pre-built | Dark Mode First | WCAG 2.1 AA Compliant*  
*Wireframes: 24 total — All core modules + Phase 12 + Mobile App Patterns*  
*Last Updated: 01 March 2026*
