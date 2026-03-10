# VyapaarPe — Product Requirements Document (PRD)

> **Version:** 3.0  
> **Date:** 10 March 2026  
> **Product:** VyapaarPe — Multi-Tenant E-Commerce Platform  
> **Backend Stack:** Java 21 + Spring Boot 3.x  
> **Total System Nodes:** 400+ (from `diagram_data.js`)  
> **Total Modules:** 53 top-level  
> **Total Edge Cases:** 140+  

---

## Table of Contents

1. [Product Vision & Goals](#2-product-vision--goals)
2. [System Architecture](#3-system-architecture)
3. [Technology Stack](#4-technology-stack)
4. [User Roles & RBAC](#5-user-roles--rbac)
5. [Phase 1 — Customer Storefront, Products & Categories](#phase-1--customer-storefront-products--categories)
6. [Phase 2 — Customer Experience: Cart, Wishlist & Loyalty](#phase-2--customer-experience-cart-wishlist--loyalty)
7. [Phase 3 — Auth, Security & Notification Engine](#phase-3--auth-security--notification-engine)
8. [Phase 4 — Orders, Payments, Returns, Wallet & Subscriptions](#phase-4--orders-payments-returns-wallet--subscriptions)
9. [Phase 5 — Seller Registration & Store Setup](#phase-5--seller-registration--store-setup)
10. [Phase 6 — Seller Dashboard, Shipping & Coupons](#phase-6--seller-dashboard-shipping--coupons)
11. [Phase 7 — Website Builder, Communication, App Builder & Plugins](#phase-7--website-builder-communication-app-builder--plugins)
12. [Phase 8 — Reports, Compliance, i18n & Infrastructure](#phase-8--reports-compliance-i18n--infrastructure)
13. [Phase 9 — Admin Roles & Management](#phase-9--admin-roles--management)
14. [Phase 10 — Platform Core & Super Admin](#phase-10--platform-core--super-admin)
15. [Phase 11 — AI Features](#phase-11--ai-features)
16. [Phase 12 — Advanced Features & Final Modules](#phase-12--advanced-features--final-modules)
17. [Database Schema Overview](#database-schema-overview)
18. [API Design Guidelines](#api-design-guidelines)
19. [Non-Functional Requirements](#non-functional-requirements)
20. [Complete Edge Cases Catalog](#complete-edge-cases-catalog)
21. [Development Timeline](#development-timeline-summary)


## 2. Product Vision & Goals

| Goal | Description |
|------|-------------|
| **Empower SMBs** | Enable any Indian small business to go online in under 10 minutes |
| **Dual Business Model** | Self-Managed (₹0-₹6K/mo) + Fully Managed (2% commission, platform does everything) |
| **AI-First** | AI powers catalogue creation, website building, customer support, and recommendations |
| **Multi-Tenant** | Single platform serves thousands of independent stores with data isolation |
| **India-First** | UPI, COD, GST, FSSAI, WhatsApp-first, Hindi support, Rupee-centric |

---

## 3. System Architecture

```
┌───────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │ Customer  │  │  Seller  │  │  Admin   │  │ Customer │     │
│  │ Storefront│  │Dashboard │  │  Panel   │  │   App    │     │
│  └─────┬─────┘  └─────┬────┘  └─────┬────┘  └────┬─────┘     │
└────────┼──────────────┼────────────┼──────────────┼───────────┘
         │              │            │              │
┌────────▼──────────────▼────────────▼──────────────▼───────────┐
│                 API GATEWAY (Spring Cloud Gateway)             │
│    Rate Limiting │ Auth │ Tenant Resolution │ CORS             │
├───────────────────────────────────────────────────────────────┤
│                 SPRING BOOT MODULAR MONOLITH                  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │   Auth   │ │  Seller  │ │  Store   │ │ Product  │        │
│  ├──────────┤ ├──────────┤ ├──────────┤ ├──────────┤        │
│  │ Customer │ │  Order   │ │  Wallet  │ │Subscript │        │
│  ├──────────┤ ├──────────┤ ├──────────┤ ├──────────┤        │
│  │   AI     │ │  Search  │ │  CMS     │ │ Notific  │        │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
├───────────────────────────────────────────────────────────────┤
│  PostgreSQL 16 │ Redis 7 │ RabbitMQ │ Elasticsearch 8        │
│  S3/Cloudinary │ CDN     │ Firebase │ OpenAI/Claude/Gemini   │
└───────────────────────────────────────────────────────────────┘
```

---

## 4. Technology Stack

### Backend (Core)

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Language** | Java 21 (LTS) | Primary backend language |
| **Framework** | Spring Boot 3.x | REST API, DI, auto-configuration |
| **API Layer** | Spring Web MVC | REST controllers, request handling |
| **Security** | Spring Security 6 | JWT auth, RBAC, 2FA, OAuth2 |
| **Data Access** | Spring Data JPA + Hibernate | ORM, repository pattern |
| **Database** | PostgreSQL 16 | Primary relational database |
| **Cache** | Redis 7 | Session, cache, rate limiting, queues |
| **Search** | Elasticsearch 8 | Full-text search, product discovery |
| **Message Queue** | RabbitMQ | Event-driven async processing |
| **File Storage** | S3 / Cloudinary | Image & document storage |
| **CDN** | CloudFront / Bunny CDN | Static asset delivery |
| **Background Jobs** | Spring @Scheduled + RabbitMQ | Cron jobs, async tasks |
| **Build Tool** | Gradle / Maven | Dependency management |

### External Integrations

| Service | Technology | Purpose |
|---------|-----------|---------|
| **Payments** | Razorpay (primary), PhonePe, Paytm, Stripe | Payment processing |
| **Email** | Resend / SendGrid | Transactional & marketing email |
| **SMS** | MSG91 / Twilio | OTP & order alerts |
| **WhatsApp** | WhatsApp Business API | Order updates, cart recovery |
| **Push** | Firebase Cloud Messaging (FCM) | Web & mobile push |
| **Courier** | Shiprocket, Delhivery, DTDC, BlueDart | Shipping & logistics |
| **KYC** | GST API, NSDL PAN API, Penny Drop | Seller verification |
| **AI** | OpenAI GPT-4o / Claude / Gemini | AI assistant, catalogue, website builder |
| **Analytics** | Google Analytics 4, Hotjar, Clarity | User tracking |

---

## 5. User Roles & RBAC

| Role | Access Level | Key Permissions |
|------|-------------|-----------------|
| `SUPER_ADMIN` | Full platform | All modules, seller management, plans, global settings |
| `SUPPORT_ADMIN` | Tickets, disputes, order view (read-only) | Ticket CRUD, PII-masked order view |
| `FINANCE_ADMIN` | Transactions, payouts, refunds, GST | Financial reports, payout approval |
| `OPERATIONS_ADMIN` | Onboarding, KYC, store health, suspension | KYC verification, store suspend/ban |
| `MARKETING_ADMIN` | Banners, campaigns, featured sellers | Banner CRUD, campaign management |
| `SELLER` | Own store(s) only | Store config, products, orders, analytics |
| `STAFF` | Seller-assigned subset | Per-permission override (JSON) |
| `CUSTOMER` | Own data per store | Profile, orders, wishlist, wallet, reviews |

```java
// RBAC Permission Enum
public enum Permission {
    SELLER_APPROVE, SELLER_SUSPEND, SELLER_VIEW,
    STORE_READ, STORE_WRITE, STORE_DELETE,
    ORDER_READ, ORDER_WRITE, ORDER_CANCEL,
    PRODUCT_READ, PRODUCT_WRITE, PRODUCT_DELETE,
    FINANCE_READ, FINANCE_APPROVE,
    ANALYTICS_READ, ANALYTICS_EXPORT,
    SETTINGS_READ, SETTINGS_WRITE,
    // ... 50+ granular permissions
}
```

---

## Phase 1 — Customer Storefront, Products & Categories

> **Duration:** 6-8 weeks | **Priority:** P0  
> **Spring Boot Module:** `product-module`  
> **Diagram Nodes:** `products`

### 1.1 Product Types (`pr-types`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `pr-ty-physical` | Physical Product | With inventory tracking |
| `pr-ty-digital` | Digital Product | Download link delivery |
| `pr-ty-service` | Service-linked | Linked to service model |
| `pr-ty-scheduled` | Scheduled Publish | Schedule product to go live at a future date/time |
| `pr-ty-labels` | Product Labels / Tags | New, Bestseller, Trending, Limited Edition, Organic — visual badges on cards |
| `pr-ty-e1` | ⚠️ Type Change | Switching type after orders exist |
| `pr-ty-e2` | ⚠️ Digital Piracy | Download link sharing, DRM protection |

### 1.2 Product Details (`pr-details`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `pr-d-name` | Name, Slug, Description | Rich text editor |
| `pr-d-price` | Pricing | Base price + strikethrough price |
| `pr-d-gst` | Custom GST Pricing | Per-product custom GST rate & pricing — flexible tax management |
| `pr-d-sku` | SKU Code | Unique stock keeping unit |
| `pr-d-seo` | SEO Meta | Title, description, tags |
| `pr-d-qty-limit` | Purchase Qty Limit | Max purchase quantity per customer per product (for offers/promotions) |
| `pr-d-keywords` | Custom Search Keywords | Seller-defined keywords per product for improved search accuracy |
| `pr-d-e1` | ⚠️ Duplicate SKU | Unique SKU enforcement |

### 1.3 Variants (`pr-variants`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `pr-v-size` | Size Variants | 50g, 100g, 250g, 500g, 1kg |
| `pr-v-color` | Color/Flavor | Multiple attributes |
| `pr-v-price` | Per-variant Price | Different price per variant |
| `pr-v-stock` | Per-variant Stock | Independent inventory |
| `pr-v-img` | Per-variant Image | Specific images |
| `pr-v-e1` | ⚠️ Combo Limits | Max variant combinations |

### 1.4 Inventory (`pr-inventory`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `pr-i-track` | Stock Tracking | Auto-decrement on order |
| `pr-i-alert` | Low Stock Alerts | Email/WhatsApp notification |
| `pr-i-oos` | Out-of-Stock Behavior | Hide or show as "coming soon" |
| `pr-i-warehouse` | Multi-warehouse | Stock split across locations, auto-route nearest |
| `pr-i-reorder` | Auto-reorder Point | Alert seller to restock when qty < threshold |
| `pr-i-forecast` | AI Inventory Forecast | AI-based demand prediction, seasonal patterns, smart restock suggestions |
| `pr-i-preorder` | Pre-order / Waitlist | Accept pre-orders for out-of-stock or upcoming products, "Notify Me" button |
| `pr-i-omni` | Omnichannel Stock Sync | Single inventory for online + offline — real-time sync across POS & website |
| `pr-i-e1` | ⚠️ Race Condition | Concurrent order stock sync (optimistic locking) |
| `pr-i-e2` | ⚠️ Overselling | Sold more than available, auto-cancel or backorder |
| `pr-i-e3` | ⚠️ Forecast Inaccuracy | AI prediction wrong due to market shift, manual override needed |
| `pr-i-e4` | ⚠️ Online-Offline Sync Delay | Offline sale not synced due to no internet — queue & retry when online |

### 1.5 Images & Media (`pr-images`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `pr-im-multi` | Multiple Images | Sortable gallery |
| `pr-im-alt` | Alt Text | SEO accessibility text |
| `pr-im-cdn` | CDN Delivery | Compressed, cached images |
| `pr-im-e1` | ⚠️ File Validation | Max size, format check (JPG/PNG/WebP) |

### 1.6 Bulk Operations (`pr-bulk`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `pr-b-import` | CSV Import | Bulk product upload |
| `pr-b-export` | CSV Export | Download catalog |
| `pr-b-price` | Bulk Price Update | Mass price changes |
| `pr-b-stock` | Bulk Stock Update | Update multiple products stock at once — time-saving inventory management |
| `pr-b-e1` | ⚠️ Import Errors | Validation errors, rollback |

### 1.7 Reviews & Ratings (`pr-reviews`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `pr-rv-submit` | Customer Reviews | Rating + text review |
| `pr-rv-photo` | Photo Reviews | Upload images with review |
| `pr-rv-video` | Video Reviews | Short video testimonials |
| `pr-rv-approve` | Admin Approval | Review moderation queue |
| `pr-rv-avg` | Rating Aggregation | Average star calculation |
| `pr-rv-verified` | Verified Purchase | Badge for actual buyers |
| `pr-rv-reply` | Seller Reply | Seller responds publicly |
| `pr-rv-helpful` | Helpful Vote | Other customers vote helpful |
| `pr-rv-incentive` | Review Incentive | Coupon/points for writing review |
| `pr-rv-e1` | ⚠️ Fake Reviews | Detection & auto-flag |
| `pr-rv-e2` | ⚠️ Offensive Content | Profanity filter, AI moderation |
| `pr-rv-e3` | ⚠️ Wrong Product Review | Customer reviews wrong item, reassign |

---

## Phase 2 — Customer Experience: Cart, Wishlist & Loyalty

> **Duration:** 6-8 weeks | **Priority:** P0  
> **Spring Boot Modules:** `customer-module`, `cart-module`, `checkout-module`  
> **Diagram Nodes:** `customer`, `cart`, `wishlist`

### 2.1 Customer Registration (`cu-reg`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `cu-r-otp` | Phone OTP Login | Primary for India |
| `cu-r-email` | Email Signup | Optional secondary |
| `cu-r-social` | Social Login | Google, Facebook |
| `cu-r-pincode` | Pincode Filter at Login | Pincode verification at customer entry — only serviceable area customers get access |
| `cu-r-e1` | ⚠️ Duplicate Phone | Same phone, different store handling |
| `cu-r-e2` | ⚠️ Invalid Pincode | Customer pincode not serviceable — show message & block or redirect |

### 2.2 Customer Profile (`cu-profile`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `cu-p-info` | Name, Avatar, Email | Basic profile info |
| `cu-p-addr` | Multiple Addresses | Home, Office, etc. |
| `cu-p-default` | Default Address | Pre-selected for checkout |
| `cu-p-e1` | ⚠️ Address Validation | Pincode serviceability check |

### 2.3 Loyalty Points (`cu-loyalty`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `cu-l-earn` | Earning Rules | Per order, referral, signup, review |
| `cu-l-redeem` | Redemption | Discount at checkout |
| `cu-l-expiry` | Points Expiry | Auto-expire after N days |
| `cu-l-tiers` | Loyalty Tiers | Bronze/Silver/Gold/Platinum based on spend |
| `cu-l-referral` | Referral Rewards | Invite friend, both earn points |
| `cu-l-history` | Points History | Full earn/redeem transaction log |
| `cu-l-e1` | ⚠️ Points Fraud | Abuse detection, redeem limits |
| `cu-l-e2` | ⚠️ Tier Downgrade | Customer drops tier, lose benefits notification |

### 2.4 Additional Customer Features

| Node ID | Feature | Description |
|---------|---------|-------------|
| `cu-recent` | Recently Viewed | Browsing history — recently viewed products widget |
| `cu-group-price` | Customer Group Pricing | Wholesale/B2B pricing, VIP customer special rates per group |

### 2.5 Shopping Cart (`cart`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `ca-items` | Cart Items | Product + variant + quantity |
| `ca-calc` | Price Calculation | Subtotal, discount, tax, shipping, wallet |
| `ca-coupon` | Coupon Application | Apply discount code at cart |
| `ca-recovery` | Abandoned Cart Recovery | Auto WhatsApp/Email reminder with discount — recover lost sales |
| `ca-e1` | ⚠️ Cart Expiry | Auto-clear after N days |
| `ca-e2` | ⚠️ Price Changed | Price change between add & checkout |
| `ca-e3` | ⚠️ Stock Reserved | Temporary stock lock on checkout start |
| `ca-e4` | ⚠️ Recovery Spam | Max 2 reminders, unsubscribe option, cooldown period |

### 2.5 Wishlist (`wishlist`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `wl-add` | Add to Wishlist | Heart icon on product card/page |
| `wl-page` | Wishlist Page | Grid view of saved products |
| `wl-tocart` | Move to Cart | One-click add to cart from wishlist |
| `wl-share` | Share Wishlist | Share via link/WhatsApp |
| `wl-al-back` | Back in Stock Alert | Notify when OOS item is restocked |
| `wl-al-price` | Price Drop Alert | Notify when price decreases |
| `wl-al-e1` | ⚠️ Product Deleted | Remove from wishlist, notify customer |
| `wl-e1` | ⚠️ Variant Discontinued | Wishlisted variant no longer available |
| `wl-e2` | ⚠️ Max Wishlist Size | Limit to prevent abuse (e.g. 200 items) |

---

## Phase 3 — Auth, Security & Notification Engine

> **Duration:** 5-6 weeks | **Priority:** P0  
> **Spring Boot Modules:** `auth-module`, `notification-module`  
> **Diagram Nodes:** `auth`, `notifications`

### 3.1 Customer Auth (`au-customer-auth`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `au-ca-otp` | Phone OTP Login | MSG91/Twilio OTP → verify → JWT |
| `au-ca-email` | Email + Password | bcrypt hash, email verify link |
| `au-ca-social` | Social OAuth | Google, Facebook OAuth2 flow |
| `au-ca-guest` | Guest Checkout | Order without account, later merge |
| `au-ca-e1` | ⚠️ Account Merge | Same email OTP + social → merge accounts |
| `au-ca-e2` | ⚠️ OTP Expiry | OTP expired, resend limits, cooldown |

### 3.2 Seller Auth (`au-seller-auth`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `au-sa-email` | Email + Password | Secure login with bcrypt |
| `au-sa-2fa` | 2FA (TOTP) | Google Authenticator / SMS 2FA |
| `au-sa-staff` | Staff Login | Staff invite link → set password |
| `au-sa-e1` | ⚠️ Staff Access Revoke | Instant session kill on deactivation |

### 3.3 Admin Auth (`au-admin-auth`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `au-aa-login` | Email + Password + 2FA | Mandatory 2FA for all admins |
| `au-aa-ip` | IP Whitelisting | Restrict admin panel to known IPs |
| `au-aa-e1` | ⚠️ Suspicious Login | New device/location alert, block |

### 3.4 Token Management (`au-tokens`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `au-tk-jwt` | JWT Access Token | Short-lived (15min), in memory |
| `au-tk-refresh` | Refresh Token | Long-lived (7d), httpOnly cookie |
| `au-tk-rotate` | Token Rotation | New refresh token per use |
| `au-tk-blacklist` | Token Blacklist | Redis-based revocation on logout |
| `au-tk-e1` | ⚠️ Token Hijacking | Fingerprint binding, reuse detection |

### 3.5 Password Security (`au-password`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `au-pw-policy` | Password Policy | Min 8 chars, uppercase, number, special |
| `au-pw-hash` | bcrypt Hashing | Salt rounds = 12, never store plain |
| `au-pw-reset` | Forgot Password | Email link with expiry token (1hr) |
| `au-pw-e1` | ⚠️ Brute Force | Account lockout after 5 failures, CAPTCHA |

### 3.6 RBAC System (`au-rbac`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `au-rb-roles` | Role Definitions | SuperAdmin, Admin roles, Seller, Staff, Customer |
| `au-rb-perms` | Permission Guards | Middleware checks on every API route |
| `au-rb-scope` | Data Scoping | Seller sees only their store data |
| `au-rb-e1` | ⚠️ Privilege Escalation | Prevent horizontal/vertical escalation |

### 3.7 API Security (`au-api-sec`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `au-api-rate` | Rate Limiting | 100 req/min per IP, 1000/min per user |
| `au-api-cors` | CORS Policy | Allowed origins per store domain |
| `au-api-csp` | CSP Headers | Content-Security-Policy, X-Frame-Options |
| `au-api-input` | Input Validation | Bean Validation + custom validators |
| `au-api-e1` | ⚠️ SQL Injection | JPA parameterized queries, no raw SQL |
| `au-api-e2` | ⚠️ XSS/CSRF | Sanitize HTML, CSRF tokens on forms |

### 3.8 Data Encryption (`au-encryption`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `au-enc-transit` | TLS/HTTPS | Enforce HTTPS everywhere, HSTS header |
| `au-enc-rest` | Encryption at Rest | DB encryption, PII field-level encryption |
| `au-enc-keys` | Key Management | AWS KMS / Vault for API keys, secrets |
| `au-enc-pii` | PII Masking | Mask phone/email in logs & support views |
| `au-enc-e1` | ⚠️ Key Rotation | Scheduled key rotation, re-encryption |

### 3.9 Notification Engine (`notifications`)

#### Templates (`nf-templates`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `nf-tp-editor` | Template Editor | WYSIWYG with variables {{name}}, {{order_id}} |
| `nf-tp-vars` | Dynamic Variables | Customer name, order total, tracking URL |
| `nf-tp-preview` | Preview & Test | Send test to self before activating |
| `nf-tp-lang` | Multi-language | Template per language (Hindi, English) |
| `nf-tp-e1` | ⚠️ Missing Variables | Fallback when variable is null/undefined |

#### Trigger Events (`nf-triggers`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `nf-tr-order` | Order Events | Placed, confirmed, shipped, delivered, cancelled |
| `nf-tr-payment` | Payment Events | Success, failed, refund processed |
| `nf-tr-sub` | Subscription Events | Activated, renewed, paused, cancelled, expiring |
| `nf-tr-wallet` | Wallet Events | Topup, cashback, low balance |
| `nf-tr-promo` | Marketing Events | New product, sale, coupon, flash deal |
| `nf-tr-system` | System Events | Signup welcome, KYC approved, plan expiry |
| `nf-tr-e1` | ⚠️ Event Storm | Dedup rapid-fire events, batch notifications |

#### Delivery Channels (`nf-channels`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `nf-ch-whatsapp` | WhatsApp | WhatsApp Business API (template msgs) |
| `nf-ch-email` | Email | Resend/SendGrid transactional + marketing |
| `nf-ch-sms` | SMS | MSG91/Twilio for OTP + alerts |
| `nf-ch-push` | Push (Web/App) | Firebase Cloud Messaging |
| `nf-ch-inapp` | In-App Center | Bell icon notification list (read/unread) |
| `nf-ch-e1` | ⚠️ Channel Fallback | If WhatsApp fails → try SMS → try email |

#### Queue & Delivery (`nf-queue`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `nf-q-queue` | Message Queue | RabbitMQ queue for async delivery |
| `nf-q-retry` | Retry Logic | Exponential backoff (3 retries) |
| `nf-q-schedule` | Scheduled Send | Schedule notification for future time |
| `nf-q-batch` | Batch Send | Bulk campaign sending with throttle |
| `nf-q-e1` | ⚠️ Queue Overflow | Dead letter queue, monitoring alerts |

#### User Preferences (`nf-prefs`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `nf-pf-optout` | Opt-out per Channel | Disable SMS but keep email |
| `nf-pf-dnd` | DND Hours | No notifications 10PM-8AM |
| `nf-pf-freq` | Frequency Cap | Max N notifications per day |
| `nf-pf-e1` | ⚠️ Regulatory Compliance | TRAI DND registry, GDPR consent |

#### Notification Analytics (`nf-analytics`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `nf-an-delivery` | Delivery Rate | Sent vs delivered vs bounced |
| `nf-an-open` | Open Rate | Email opens, push taps |
| `nf-an-click` | Click Rate | Link clicks in notifications |
| `nf-an-unsub` | Unsubscribe Rate | Opt-out tracking per campaign |
| `nf-an-e1` | ⚠️ Spam Reports | Spam flag rate, sender reputation |

---

## Phase 4 — Orders, Payments, Returns, Wallet & Subscriptions

> **Duration:** 8-10 weeks | **Priority:** P0  
> **Spring Boot Modules:** `order-module`, `payment-module`, `wallet-module`, `subscription-module`, `return-module`  
> **Diagram Nodes:** `orders`, `returns`, `wallet`, `subscriptions`, `checkout`

### 4.1 Order Lifecycle (`or-lifecycle`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `or-lc-flow` | Status Flow | PENDING→CONFIRMED→PROCESSING→SHIPPED→DELIVERED |
| `or-lc-cancel` | Cancellation | By customer or admin |
| `or-lc-refund` | Refund Flow | Full or partial refund |
| `or-lc-e1` | ⚠️ Status Rollback | Prevent backward status change |
| `or-lc-e2` | ⚠️ Stuck Orders | Auto-detect orders stuck >N days |

### 4.2 Payment (`or-payment`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `or-py-methods` | Payment Methods | UPI, Card, COD, Wallet, Netbanking |
| `or-py-mixed` | Mixed Payment | Wallet + UPI split payment |
| `or-py-razorpay` | Razorpay Flow | Order create → verify → capture |
| `or-py-retry` | Payment Retry | Failed payment retry link |
| `or-py-e1` | ⚠️ Double Payment | Webhook idempotency, dedup |
| `or-py-e2` | ⚠️ Gateway Timeout | Pending verification, manual check |

### 4.3 Order Items (`or-items`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `or-it-snap` | Product Snapshot | Name, price, image at order time |
| `or-it-variant` | Variant Details | Size, color selected |
| `or-it-qty` | Qty & Line Total | Quantity × unit price |
| `or-it-e1` | ⚠️ Deleted Product | Product removed after order placed |

### 4.4 Invoice (`or-invoice`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `or-inv-auto` | Auto-generate PDF | On order confirmation |
| `or-inv-gst` | GST Invoice Format | GSTIN, HSN, tax breakup |
| `or-inv-e1` | ⚠️ Credit Notes | Generated on refunds |

### 4.5 Tracking (`or-tracking`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `or-tr-number` | Tracking Number | AWB entry by seller |
| `or-tr-courier` | Courier Partner | Shiprocket, Delhivery, etc. |
| `or-tr-webhook` | Status Webhooks | Auto-update from courier API |
| `or-tr-e1` | ⚠️ Lost in Transit | RTO handling, insurance claim |
| `or-tr-e2` | ⚠️ Delivery Failed | Wrong address, customer absent |

### 4.6 Subscription Orders (`or-sub-order`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `or-so-auto` | Auto-generated | Created from active subscription |
| `or-so-link` | Linked subscriptionId | Reference to parent subscription |
| `or-so-e1` | ⚠️ Failed Sub Payment | Retry logic, pause subscription |

### 4.7 Checkout Flow (`checkout`)

#### Step 1: Address (`ck-address`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `ck-ad-saved` | Saved Addresses | Pick from existing addresses |
| `ck-ad-new` | Add New Address | Inline address form |
| `ck-ad-pincode` | Pincode Validation | Check serviceability before proceeding |
| `ck-ad-e1` | ⚠️ Unserviceable Pin | Block checkout, show message |

#### Step 2: Shipping (`ck-shipping`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `ck-sh-standard` | Standard Delivery | 3-7 business days |
| `ck-sh-express` | Express Delivery | 1-2 days (extra charge) |
| `ck-sh-slot` | Time Slot Selection | Morning/afternoon/evening |
| `ck-sh-cost` | Shipping Cost Display | Dynamic based on weight/distance |
| `ck-sh-e1` | ⚠️ No Delivery Option | All couriers unavailable for this pin |

#### Step 3: Discount (`ck-coupon`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `ck-cp-apply` | Enter Coupon Code | Manual code entry |
| `ck-cp-suggest` | Available Coupons | Auto-suggest applicable coupons |
| `ck-cp-wallet` | Wallet Points Toggle | Use wallet/loyalty balance |
| `ck-cp-e1` | ⚠️ Invalid Coupon | Expired, min order not met, already used |

#### Step 4: Order Summary (`ck-summary`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `ck-sm-items` | Item List | Products, variants, quantities |
| `ck-sm-breakdown` | Price Breakdown | Subtotal, discount, tax, shipping, wallet |
| `ck-sm-address` | Delivery Details | Address + estimated delivery date |
| `ck-sm-edit` | Edit Options | Change address/coupon/qty inline |

#### Step 5: Payment (`ck-payment`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `ck-py-methods` | Payment Options | UPI, Card, COD, Wallet, Netbanking, EMI |
| `ck-py-wallet-use` | Wallet Partial Pay | Deduct from wallet + pay rest via gateway |
| `ck-py-razorpay` | Razorpay Checkout | Inline modal / redirect to gateway |
| `ck-py-verify` | Payment Verification | Webhook callback + signature verify |
| `ck-py-e1` | ⚠️ Payment Failed | Show retry button, preserve cart state |
| `ck-py-e2` | ⚠️ Session Timeout | Checkout session expired, restart |

#### Step 6: Confirmation (`ck-confirm`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `ck-cf-page` | Success Page | Order number, thank you message |
| `ck-cf-notif` | Confirmation Notif | Email + SMS + WhatsApp + push |
| `ck-cf-clear` | Clear Cart | Empty cart after successful order |
| `ck-cf-stock` | Inventory Update | Decrement stock counts |
| `ck-cf-e1` | ⚠️ Confirmation Email Failed | Queue retry, show on dashboard |

### 4.8 Returns & Refunds (`returns`)

#### Return Request (`ret-initiate`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `ret-in-btn` | Request Button | On order detail page (within window) |
| `ret-in-reason` | Return Reasons | Defective, wrong item, not needed, size issue |
| `ret-in-photos` | Photo Upload | Evidence photos for defective claims |
| `ret-in-e1` | ⚠️ Window Expired | Return window closed (7/15/30 days config) |

#### Return Policy Config (`ret-config`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `ret-cf-window` | Return Window | 7/15/30 days configurable per product |
| `ret-cf-eligible` | Eligible Categories | Some categories non-returnable (food, hygiene) |
| `ret-cf-condition` | Condition Rules | Unused, sealed, with tags, with receipt |
| `ret-cf-e1` | ⚠️ Non-returnable Items | Customer tries to return excluded item |

#### Return Pickup (`ret-pickup`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `ret-pk-schedule` | Pickup Scheduling | Customer selects date & time slot |
| `ret-pk-courier` | Reverse Courier | Shiprocket/Delhivery reverse pickup |
| `ret-pk-label` | Shipping Label | Auto-generated return label |
| `ret-pk-cost` | Who Pays Shipping | Seller-paid vs customer-paid (config) |
| `ret-pk-e1` | ⚠️ Pickup Failed | Customer not home, reschedule flow |

#### Inspection & Approval (`ret-inspect`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `ret-ins-receive` | Item Received | Warehouse confirms receipt |
| `ret-ins-check` | Quality Check | Inspect for damage, completeness |
| `ret-ins-approve` | Approve / Reject | Accept return or reject with reason |
| `ret-ins-e1` | ⚠️ Item Damaged by Customer | Partial refund or rejection |
| `ret-ins-e2` | ⚠️ Missing Items | Incomplete return package |

#### Resolution (`ret-resolution`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `ret-res-refund` | Full Refund | To original payment or wallet |
| `ret-res-partial` | Partial Refund | Deduct for damage/usage |
| `ret-res-replace` | Replacement | Send new item instead of refund |
| `ret-res-credit` | Store Credit | Add to wallet as credit |
| `ret-res-e1` | ⚠️ Refund Method Dispute | Customer wants original method, policy says wallet |

### 4.9 Wallet System (`wallet`)

#### Balance Management (`wa-balance`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `wa-b-current` | Current Balance | Real-time display |
| `wa-b-cashback` | Cashback Balance | Separate cashback pool |
| `wa-b-e1` | ⚠️ Negative Prevention | Concurrent debit race condition |

#### Topup (`wa-topup`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `wa-tu-methods` | UPI / Card / Net | All payment methods for topup |
| `wa-tu-limits` | Min/Max Limits | Seller-configured limits |
| `wa-tu-e1` | ⚠️ Payment Failure | Failed topup refund to source |

#### Transactions (`wa-txns`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `wa-tx-credit` | CREDIT Types | Topup, refund, cashback, admin credit |
| `wa-tx-debit` | DEBIT Types | Order purchase, expiry debit |
| `wa-tx-trail` | Balance Trail | Before/after on each txn |
| `wa-tx-e1` | ⚠️ Reversal | Transaction reversal, audit log |

#### Cashback System (`wa-cashback`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `wa-cb-order` | Order Cashback | % cashback on purchase |
| `wa-cb-topup` | Topup Cashback | Bonus on wallet recharge |
| `wa-cb-expiry` | Cashback Expiry | Auto-expire unused cashback |
| `wa-cb-e1` | ⚠️ Cancel Clawback | Reverse cashback on cancelled order |

#### Admin Controls (`wa-admin`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `wa-ad-credit` | Manual Credit | Admin adds money to customer |
| `wa-ad-view` | View All Txns | Full transaction log |
| `wa-ad-config` | Config Settings | Min/max/cashback settings |
| `wa-ad-e1` | ⚠️ Bulk Credit | Bulk import errors, validation |

### 4.10 Subscriptions (`subscriptions`)

#### Subscription Plans (`sub-plans`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `sub-p-freq` | Frequency Options | Daily / Weekly / Biweekly / Monthly |
| `sub-p-price` | Price per Cycle | Recurring charge amount |
| `sub-p-discount` | Subscribe Discount | % off vs one-time price |
| `sub-p-trial` | Trial Days | Free trial before billing |
| `sub-p-cycles` | Cycle Count | Finite or infinite (null=∞) |
| `sub-p-e1` | ⚠️ Plan Discontinued | Active subs on deleted plan |

#### Active Subscriptions (`sub-active`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `sub-a-status` | Status States | Active / Paused / Cancelled / Expired |
| `sub-a-dates` | Billing Dates | Start, next billing, end date |
| `sub-a-addr` | Delivery Address | Per-subscription address |
| `sub-a-e1` | ⚠️ Address Change | Mid-subscription address update |

#### Deliveries (`sub-deliveries`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `sub-d-calendar` | Delivery Calendar | Visual schedule view |
| `sub-d-status` | Per-delivery Status | Scheduled / Delivered / Skipped / Failed |
| `sub-d-skip` | Skip Delivery | Skip with reason |
| `sub-d-e1` | ⚠️ Holidays/Blackout | Holiday scheduling, max skips |
| `sub-d-e2` | ⚠️ Delivery Failed | Address issue, not home |

#### Billing (`sub-billing`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `sub-b-auto` | Auto-charge | Charge on billing date |
| `sub-b-invoice` | Per-cycle Invoice | Invoice each billing cycle |
| `sub-b-e1` | ⚠️ Wallet First | Wallet deduction → gateway fallback |

#### Pause / Resume (`sub-pause`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `sub-pa-reason` | Pause with Reason | Customer selects reason |
| `sub-pa-auto` | Auto-resume Date | Optional resume date |
| `sub-pa-e1` | ⚠️ Pause Limits | Max pauses per cycle, billing during pause |

#### Cancellation (`sub-cancel`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `sub-ca-reason` | Cancel Reason | Reason capture for analytics |
| `sub-ca-refund` | Prorated Refund | Unused days refund calc |
| `sub-ca-e1` | ⚠️ Cancel Fee | Early cancellation penalty |
| `sub-ca-e2` | ⚠️ Win-back | Retention offers on cancel attempt |

---

## Phase 5 — Seller Registration & Store Setup

> **Duration:** 6-8 weeks | **Priority:** P0  
> **Spring Boot Modules:** `seller-module`, `store-module`  
> **Diagram Nodes:** `seller`, `store`

### 5.1 Seller Registration & KYC (`se-reg`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `se-r-signup` | Email/Phone Signup | Registration form |
| `se-r-biz` | Business Info | Business name, type, address |
| `se-r-docs` | Document Upload | GST cert, PAN, bank proof |
| `se-r-e1` | ⚠️ Duplicate Detection | Same email/GST/PAN check |

### 5.2 Staff Management (`se-staff`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `se-st-roles` | Staff Roles | Manager, Order Handler, Inventory, Support |
| `se-st-perms` | Permission Overrides | JSON fine-grained permissions |
| `se-st-limit` | Max Staff Limit | Per plan restriction |
| `se-st-e1` | ⚠️ Staff Deactivation | Activity logs per staff member |

### 5.3 Seller Payouts (`se-payout`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `se-pay-dash` | Payout Dashboard | Earnings overview |
| `se-pay-bank` | Bank Account Mgmt | Add/edit bank details |
| `se-pay-hist` | Payout History | UTR numbers, amounts, dates |
| `se-pay-e1` | ⚠️ Bank Change Verify | Re-verify on bank change |

### 5.4 Store Identity (`st-identity`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `st-id-name` | Name & Slug | Unique URL slug per store |
| `st-id-logo` | Logo & Banner | Upload branding images |
| `st-id-domain` | Custom Domain | DNS mapping & SSL |
| `st-id-e1` | ⚠️ Slug Collision | Duplicate slug prevention |
| `st-id-e2` | ⚠️ SSL Provisioning | Let's Encrypt auto-setup |

### 5.5 Theme & Design (`st-theme`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `st-th-gallery` | Theme Gallery | Pre-built themes |
| `st-th-color` | Color Picker | Primary brand color |
| `st-th-e1` | ⚠️ Custom CSS | Pro plan only, injection sandbox |

### 5.6 Store Settings (`st-settings`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `st-set-pay` | Payment Gateway | Razorpay API keys |
| `st-set-payment-mode` | Payment Mode Config | Only Online / Only COD / Online + COD — fully customizable payment filters |
| `st-set-gst` | GST Config | Tax rate, HSN codes |
| `st-set-notif` | Notification Channels | WhatsApp, Email, SMS config |
| `st-set-firebase` | Firebase Config | Push notification setup |
| `st-set-fb` | Facebook App ID | Social login & pixel |
| `st-set-contact` | Contact Details Update | Seller updates phone, email, address — no developer dependency |
| `st-set-shop-toggle` | Shop Open / Close | One-click store open/temporarily close — auto-control for non-working hours |
| `st-set-e1` | ⚠️ Gateway Failover | Test mode vs live mode switching |

### 5.7 Store Analytics (`st-analytics`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `sta-sales` | Sales Dashboard | Today / week / month revenue, order count |
| `sta-top` | Top Products | Best sellers by revenue & quantity |
| `sta-funnel` | Conversion Funnel | Visits → Cart → Checkout → Order |
| `sta-traffic` | Traffic Sources | Direct, social, search, referral |
| `sta-geo` | Geographic Heatmap | Orders by city / state / pincode |
| `sta-aov` | Avg Order Value | AOV trends over time |
| `sta-customers` | Customer Analytics | New vs returning, lifetime value |
| `sta-abandoned` | Abandoned Cart Rate | Cart abandonment % & reasons |
| `sta-e1` | ⚠️ Data Delay | Analytics lag on high traffic, caching issues |

### 5.8 Categories (`st-categories`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `cat-tree` | Category Tree | Parent → child nesting (max 3 levels) |
| `cat-image` | Category Image | Upload icon/image per category |
| `cat-sort` | Sort Order | Drag-drop reorder, priority number |
| `cat-count` | Product Count | Auto-count products per category |
| `cat-seo` | Category SEO | Meta title, description per category |
| `cat-e1` | ⚠️ Delete with Products | Re-assign products or block deletion |
| `cat-e2` | ⚠️ Circular Parent | Prevent A→B→A parent loop |

### 5.9 Services (`st-services`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `sv-details` | Service Details | Name, description, duration, price |
| `sv-booking` | Booking Flow | Date/time picker, provider assignment |
| `sv-provider` | Provider Assignment | Assign staff/provider for service |
| `sv-completion` | Completion Confirm | Mark service as completed |
| `sv-recurring` | Recurring Service | Weekly/monthly recurring booking |
| `sv-e1` | ⚠️ Cancellation Policy | No-show handling, refund rules |
| `sv-e2` | ⚠️ Reschedule | Max reschedule count, buffer time |

### 5.10 Onboarding Wizard (`se-onboard`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `se-ob-welcome` | Welcome Screen | Introduction, setup overview, estimated time |
| `se-ob-store` | Store Setup | Name, category, logo — wizard step 1 |
| `se-ob-product` | First Product | Add first product with AI assist — step 2 |
| `se-ob-payment` | Payment Setup | Connect Razorpay/bank account — step 3 |
| `se-ob-shipping` | Shipping Config | Set delivery zones & rates — step 4 |
| `se-ob-launch` | Go Live! | Final review & publish store |
| `se-ob-progress` | Progress Tracker | Checklist widget on dashboard until all steps done |
| `se-ob-e1` | ⚠️ Abandoned Onboarding | Seller drops off mid-setup — reminder email/WhatsApp after 24h |

---

## Phase 6 — Seller Dashboard, Shipping & Coupons

> **Duration:** 5-6 weeks | **Priority:** P1  
> **Spring Boot Modules:** `dashboard-module`, `delivery-module`, `coupon-module`  
> **Diagram Nodes:** `seller-dash`, `delivery-zones`, `coupons`

### 6.1 Seller Dashboard (`seller-dash`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `sd-today` | Today's Orders | New orders count, pending fulfillment |
| `sd-revenue` | Revenue Summary | This week / month earnings |
| `sd-pending` | Pending Actions | Orders to ship, returns to process, reviews to reply |
| `sd-health` | Store Health Score | Composite: fulfillment, complaints, response time |
| `sd-growth` | Growth Metrics | Month-over-month comparison |
| `sd-csat` | Customer Satisfaction | Avg rating, NPS score |
| `sd-alerts` | System Alerts | Low stock, plan expiry, KYC pending |
| `sd-fee` | Platform Fee Calculator | View platform commission, transaction fees, net earnings breakdown |
| `sd-e1` | ⚠️ Dashboard Data Stale | Cache invalidation, real-time vs batch |

### 6.2 Delivery Zones & Slots (`delivery-zones`)

#### Zone Management (`dz-zones`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `dz-z-create` | Create Zone | Name, list of pincodes, city/state |
| `dz-z-pricing` | Zone-based Pricing | Different shipping rate per zone |
| `dz-z-toggle` | Enable/Disable Zone | Temporarily stop delivery to a zone |
| `dz-z-e1` | ⚠️ Overlapping Zones | Same pincode in multiple zones |

#### Time Slot Management (`dz-slots`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `dz-sl-create` | Create Slots | Morning (8-12), Afternoon (12-4), Evening (4-8) |
| `dz-sl-capacity` | Slot Capacity | Max orders per slot to prevent overload |
| `dz-sl-cutoff` | Cutoff Time | Order before 2PM for same-day delivery |
| `dz-sl-e1` | ⚠️ Slot Full | All slots booked, show next available |

#### Delivery Types (`dz-types`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `dz-ty-standard` | Standard (3-7 days) | Regular shipping |
| `dz-ty-express` | Express (1-2 days) | Priority shipping, extra charge |
| `dz-ty-sameday` | Same-day Delivery | Order before cutoff, deliver today |
| `dz-ty-scheduled` | Scheduled Delivery | Customer picks date & slot |
| `dz-ty-e1` | ⚠️ Unavailable Type | Express unavailable for remote zones |

| Node ID | Feature | Description |
|---------|---------|-------------|
| `dz-holiday` | Holiday Config | No-delivery dates (national holidays, custom) |
| `dz-e1` | ⚠️ Zone Boundary Dispute | Customer at zone border, courier mismatch |

### 6.3 Coupons & Offers (`coupons`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `cp-types` | Coupon Types | Flat / Percentage / BOGO / Free Shipping |
| `cp-code-gen` | Code Generator | Auto-generate unique codes: SUMMER23, FLAT100 |
| `cp-rules` | Validation Rules | Min order, max discount cap, usage limit, per-customer limit |
| `cp-validity` | Validity Period | Start date / end date |
| `cp-target` | Target Audience | All / new customers only / specific segments |
| `cp-product` | Product Restriction | Apply to specific products/categories only |
| `cp-referral` | Referral Programs | Share & earn credits |
| `cp-auto` | Auto-apply Coupons | Best coupon auto-selected at checkout |
| `cp-analytics` | Coupon Analytics | Usage count, revenue impact, ROI per coupon |
| `cp-e1` | ⚠️ Stacking Rules | Can coupons stack? Single use? |
| `cp-e2` | ⚠️ Abuse Detection | Multiple accounts, bot redemption |
| `cp-e3` | ⚠️ Expired During Checkout | Coupon expires between cart add and payment |
| `cp-e4` | ⚠️ Max Discount Exceeded | Percentage coupon exceeds cap amount |
| `cp-e5` | ⚠️ Coupon Sharing Leak | Private coupon shared publicly, viral abuse |

---


### Shipping Module (`shipping`)

> **Diagram Nodes:** `shipping`

#### Rate Calculator (`sh-calc`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `sh-partners` | Courier Partners | Shiprocket, Delhivery, DTDC, BlueDart |
| `sh-rates` | Rate Comparison | Compare rates across couriers |
| `sh-label` | AWB & Label | Generate shipping label + AWB |
| `sh-track` | Live Tracking | Real-time shipment tracking |
| `sh-rto` | RTO Management | Return to origin handling |
| `sh-cod` | COD Management | COD remittance tracking |

#### NDR Management (`sh-ndr`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `sh-ndr` | NDR Management | Non-Delivery Report handling — re-attempt, RTO, customer contact |
| `sh-manifest` | Manifest & Pickup | Daily manifest generation, courier pickup scheduling |
| `sh-insurance` | Shipping Insurance | Optional insurance for high-value shipments — claim on loss/damage |
| `sh-rating` | Delivery Partner Rating | Rate courier performance — auto-prefer based on delivery success rate |

#### Edge Cases

| Node ID | Feature | Description |
|---------|---------|-------------|
| `sh-e1` | ⚠️ Remote Surcharge | Per-pincode surcharge rules |
| `sh-e2` | ⚠️ Weight Mismatch | Actual vs declared weight dispute |
| `sh-e3` | ⚠️ Courier API Down | Fallback courier, manual AWB |
| `sh-e4` | ⚠️ Split Shipment | Multi-item order across AWBs |
| `sh-e5` | ⚠️ NDR Escalation Loop | Customer unreachable, max re-attempts, auto-RTO after 3 fails |

---

## Phase 7 — Website Builder, Communication, App Builder & Plugins

> **Duration:** 6-8 weeks | **Priority:** P1  
> **Spring Boot Modules:** `cms-module`, `communication-module`, `app-module`, `plugin-module`  
> **Diagram Nodes:** `website`, `communication`, `appbuilder`, `pluginstore`

### 7.1 Website Builder (`website`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `wb-pages` | Page Editor | Home, Category, Product, Checkout, Order Status pages |
| `wb-p-home` | Home Page Builder | Drag-drop sections |
| `wb-p-category` | Category Page | Product grid with filters |
| `wb-p-product` | Product Detail Page | Gallery, description, reviews, add-to-cart |
| `wb-p-checkout` | Checkout Page | Multi-step checkout |
| `wb-p-order` | Order Status Page | Tracking view |
| `wb-p-e1` | ⚠️ Draft/Publish | Draft vs live version conflicts |
| `wb-widgets` | Widget System | Reusable content blocks |
| `wb-w-banner` | Banner / Carousel | Hero images with auto-rotate |
| `wb-w-products` | Product Group Grid | Featured / new / sale products |
| `wb-w-categories` | Category Group | Category cards with image |
| `wb-w-testimonials` | Testimonials | Customer reviews showcase |
| `wb-w-video` | Video Embed | YouTube / custom video |
| `wb-w-layout` | Layout Options | Full-width, sidebar, grid |
| `wb-w-e1` | ⚠️ Widget Performance | Lazy-load, broken widget recovery |
| `wb-seo` | SEO Settings | Meta title, description, OG tags per page |
| `wb-announce` | Announcement Bar | Top sticky banner message |
| `wb-e1` | ⚠️ Mobile Preview | Desktop vs mobile rendering mismatch |

### 7.2 Communication (`communication`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `cm-whatsapp` | WhatsApp Business | Order updates, cart recovery automation |
| `cm-email` | Email Campaigns | Resend/SendGrid: transactional + marketing |
| `cm-sms` | SMS Service | OTP, order confirmation, promotional |
| `cm-push` | Push Notifications | Firebase web/app push |
| `cm-abandoned` | Abandoned Cart Recovery | Auto-reminder: WhatsApp → Email → Push sequence |
| `cm-e1` | ⚠️ Opt-out | Per-channel unsubscribe, delivery rate tracking |
| `cm-e2` | ⚠️ WhatsApp 24hr | Template-only messages outside API window |
| `cm-e3` | ⚠️ Email Bounce | Hard/soft bounce handling, reputation |
| `cm-e4` | ⚠️ SMS DND | TRAI DND registry check before promotional |
| `cm-e5` | ⚠️ Push Token Invalid | FCM token refresh, device cleanup |

### 7.3 App Builder (`appbuilder`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `ab-customer` | Customer App | Mobile storefront app |
| `ab-c-name` | App Name & Icon | Configurable branding |
| `ab-c-firebase` | Firebase Config | Push notification setup |
| `ab-c-sha` | SHA-256 Key | App signing key |
| `ab-c-deep` | Deep Links | Universal links configuration |
| `ab-c-e1` | ⚠️ Forced Update | Min version enforcement |
| `ab-seller` | Seller App | Order management mobile app |
| `ab-s-orders` | Order Management | Accept, process, ship from mobile |
| `ab-s-products` | Product Edit | Quick product updates |
| `ab-s-alerts` | New Order Alerts | Push notification on new order |
| `ab-s-quick` | Quick Actions | Fast access to common tasks |
| `ab-s-stats` | Daily Stats | Revenue, orders widget |
| `ab-s-e1` | ⚠️ Offline Mode | Queue actions, sync when online |

### 7.4 Plugin Store (`pluginstore`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `ps-website` | Website Plugins | Navigation menu, popup builder, countdown timer |
| `ps-marketing` | Marketing Plugins | Google Merchant, Facebook Pixel, WhatsApp chat |
| `ps-shipping` | Shipping Plugins | Shiprocket, Delhivery, Dunzo/Porter |
| `ps-analytics` | Analytics Plugins | Google Analytics 4, Hotjar, Microsoft Clarity |
| `ps-payment` | Payment Plugins | PhonePe, Paytm, Stripe integrations |
| `ps-crm` | CRM Plugins | Zoho CRM, Freshdesk, Tally/Zoho Books |
| `ps-e1` | ⚠️ Plugin Conflicts | Version compatibility, sandboxing |
| `ps-e2` | ⚠️ Plugin Security | Code injection risk, permission model |
| `ps-e3` | ⚠️ Tracking Consent | GDPR cookie consent for analytics plugins |

---

## Phase 8 — Reports, Compliance, i18n & Infrastructure

> **Duration:** 6-8 weeks | **Priority:** P1  
> **Spring Boot Modules:** `report-module`, `compliance-module`, `i18n-module`  
> **Diagram Nodes:** `reports`, `compliance`, `i18n`, `infra`

### 8.1 Reports Engine (`reports`)

#### Report Builder (`rp-builder`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `rp-b-fields` | Field Selection | Drag-drop columns: orders, revenue, customers |
| `rp-b-filters` | Filters & Date Range | Date range, store, category, status |
| `rp-b-group` | Group By | By day/week/month, by product, by category |
| `rp-b-save` | Save Templates | Save as reusable report template |

#### Export Formats (`rp-export`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `rp-ex-csv` | CSV Export | Comma-separated values |
| `rp-ex-pdf` | PDF Report | Formatted PDF with charts |
| `rp-ex-excel` | Excel (.xlsx) | Multi-sheet workbook |
| `rp-ex-e1` | ⚠️ Large Dataset | Pagination, streaming, timeout on 100K+ rows |

#### Scheduled Reports (`rp-schedule`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `rp-sc-daily` | Daily Digest | Morning sales summary email |
| `rp-sc-weekly` | Weekly Report | Monday morning performance email |
| `rp-sc-monthly` | Monthly Report | End-of-month comprehensive report |
| `rp-sc-share` | Share via Link | Shareable report URL with expiry |
| `rp-sc-e1` | ⚠️ Delivery Failure | Email bounce, retry logic |

#### Pre-built Reports (`rp-prebuilt`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `rp-pre-sales` | Sales Report | Revenue, orders, AOV by period |
| `rp-pre-inventory` | Inventory Report | Stock levels, low stock, dead stock |
| `rp-pre-customer` | Customer Report | Acquisition, retention, LTV |
| `rp-pre-tax` | Tax Report | GST collected, HSN-wise breakup |
| `rp-pre-payout` | Payout Report | Seller earnings, commission, UTR history |

### 8.2 Compliance & Legal (`compliance`)

#### Store Policies (`cpl-policies`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `cpl-p-tos` | Terms of Service | Rich text editor, version history |
| `cpl-p-privacy` | Privacy Policy | GDPR/DPDPA compliant template |
| `cpl-p-refund` | Refund Policy | Auto-generated from return config |
| `cpl-p-shipping` | Shipping Policy | Delivery timelines, zones |
| `cpl-p-e1` | ⚠️ Policy not Updated | Auto-reminder to review every 6 months |

#### Data Protection (`cpl-data`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `cpl-d-consent` | Cookie Consent | Banner with accept/reject/customize |
| `cpl-d-delete` | Data Deletion Request | Right to forget — delete all PII |
| `cpl-d-export` | Data Export Request | Download all my data (DSAR) |
| `cpl-d-retention` | Data Retention Policy | Auto-delete old data per policy |
| `cpl-d-e1` | ⚠️ Cross-border Transfer | Data localization rules, India DPDPA |

#### Invoice Compliance (`cpl-invoice`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `cpl-inv-format` | GST Invoice Format | GSTIN, HSN, SAC, tax breakup |
| `cpl-inv-sign` | Digital Signature | Optional e-sign on invoice PDF |
| `cpl-inv-einvoice` | E-Invoice (IRN) | Government portal e-invoice generation |
| `cpl-inv-e1` | ⚠️ Invoice Number Gap | Sequential numbering, no gaps allowed |

| Node ID | Feature | Description |
|---------|---------|-------------|
| `cpl-age` | Age Verification | Required for alcohol, tobacco categories |
| `cpl-fssai` | FSSAI License | Food sellers must display license number |
| `cpl-e1` | ⚠️ Compliance Audit | Scheduled platform-wide compliance check |

#### TDS/TCS Compliance (`cpl-tds`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `cpl-tds-auto` | Auto TDS/TCS Calculation | Platform auto-calculates TDS/TCS on every seller payout |
| `cpl-tds-payout` | TDS on Payouts | Deduct TDS before settlement, show in payout breakdown |
| `cpl-tds-report` | TCS Filing Report | Monthly/quarterly TCS report for government filing |
| `cpl-tds-e1` | ⚠️ PAN Not Verified | Higher TDS rate (20%) for unverified PAN |

### 8.3 Multi-Language / i18n (`i18n`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `i18-storeLang` | Store Language | Primary language selection (Hindi, English, etc.) |
| `i18-p-name` | Product Title & Description | Translatable rich text fields |
| `i18-p-variant` | Variant Labels | Size/Color names in other languages |
| `i18-p-e1` | ⚠️ Missing Translation | Fallback to primary language |
| `i18-ui` | UI String Translations | Button labels, menus, form fields |
| `i18-email` | Email/SMS Templates | Per-language notification templates |
| `i18-rtl` | RTL Support | Arabic, Urdu right-to-left layout |
| `i18-auto` | Auto-translate (AI) | Google/DeepL API auto-translation |
| `i18-e1` | ⚠️ SEO per Language | hreflang tags, language-specific URLs |

### 8.4 Infrastructure (`infra`)

#### Database (`inf-db`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `inf-db-pg` | PostgreSQL | Primary relational database |
| `inf-db-prisma` | JPA + Hibernate | Type-safe queries, migrations |
| `inf-db-pool` | Connection Pool | HikariCP, connection limits |
| `inf-db-backup` | Backups | Daily automated, point-in-time recovery |
| `inf-db-e1` | ⚠️ DB Migration Failure | Flyway rollback, zero-downtime migrations |

#### File Storage (`inf-storage`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `inf-st-s3` | S3 / Cloudinary | Image & file upload storage |
| `inf-st-cdn` | CDN | CloudFront / Bunny CDN for fast delivery |
| `inf-st-resize` | Image Processing | Auto-resize, compress, WebP conversion |
| `inf-st-e1` | ⚠️ Storage Limits | Per-plan storage quota, cleanup policy |

#### Caching (`inf-cache`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `inf-ca-redis` | Redis | Session, cache, rate limiting, queues |
| `inf-ca-api` | API Response Cache | Product listings, category trees |
| `inf-ca-invalidate` | Cache Invalidation | Event-based, TTL, manual purge |
| `inf-ca-e1` | ⚠️ Stale Data | Cache-aside pattern, eventual consistency |

#### Background Jobs (`inf-jobs`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `inf-j-queue` | RabbitMQ Queue | Job queues with retry & priority |
| `inf-j-email` | Email Worker | Send emails asynchronously |
| `inf-j-report` | Report Generator | Generate heavy reports in background |
| `inf-j-cron` | Cron Jobs | Subscription billing, cleanup, reminders |
| `inf-j-e1` | ⚠️ Job Stuck | Dead letter queue, max retries, alerting |

#### Monitoring (`inf-monitor`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `inf-m-uptime` | Uptime Monitoring | BetterUptime / UptimeRobot |
| `inf-m-apm` | APM (Performance) | Sentry, Datadog, NewRelic |
| `inf-m-logs` | Centralized Logging | Structured JSON logs, log aggregation |
| `inf-m-alerts` | Alert Rules | PagerDuty/Slack on error spike, high latency |
| `inf-m-e1` | ⚠️ Alert Fatigue | Too many alerts, escalation policies |

#### CI/CD Pipeline (`inf-cicd`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `inf-ci-github` | GitHub Actions | Build, test, deploy automation |
| `inf-ci-staging` | Staging Environment | Test before production deploy |
| `inf-ci-deploy` | Zero-downtime Deploy | Rolling update, blue-green deployment |
| `inf-ci-rollback` | Rollback Strategy | One-click rollback to previous version |
| `inf-ci-e1` | ⚠️ Deploy Failure | Auto-rollback on health check failure |

| Node ID | Feature | Description |
|---------|---------|-------------|
| `inf-rateLimit` | Rate Limiting | Per-IP, per-user, per-API endpoint limits |
| `inf-rateStore` | Per-Store Rate Limit | Isolate noisy tenants, per-store API quota |
| `inf-ddos` | DDoS / WAF Protection | Cloudflare WAF, rate limiting, bot detection, IP blacklisting |
| `inf-k8s` | Container Orchestration | Docker containers, Kubernetes/ECS, pod auto-scaling, health checks |
| `inf-autoscale` | Auto-scaling Config | Horizontal pod autoscaler, CPU/memory thresholds, scale-to-zero |
| `inf-dbmigrate` | Database Migrations | Flyway migrate, schema versioning, zero-downtime migration strategy |
| `inf-maintenance` | Scheduled Maintenance | Planned downtime page, auto-enable/disable, advance notification |
| `inf-changelog` | Changelog / Release Notes | Platform updates feed, "What's New" in seller dashboard, versioned releases |
| `inf-e1` | ⚠️ Cold Start Latency | Serverless cold starts, keep-warm strategy |

---

## Phase 9 — Admin Roles & Management

> **Duration:** 4-5 weeks | **Priority:** P0  
> **Spring Boot Modules:** `support-module`, `finance-module`, `operations-module`, `marketing-module`  
> **Diagram Nodes:** `pa-sup`, `pa-fin`, `pa-ops`, `pa-mkt`

### 9.1 Support Admin (`pa-sup` / `role=SUPPORT_ADMIN`)

#### Customer Issues (`sup-tickets`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `sup-t-status` | Ticket States | Open → In-progress → Resolved → Escalated |
| `sup-t-chat` | Chat/Email Integration | Customer communication |
| `sup-t-e1` | ⚠️ SLA Tracking | Auto-escalation on SLA breach |

#### Dispute Resolution (`sup-disputes`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `sup-d-refund` | Refund Requests | Review & approve refunds |
| `sup-d-mediate` | Seller-Customer Mediation | Middleman resolution |
| `sup-d-e1` | ⚠️ Chargebacks | Chargeback handling, fraud flags |

#### Order View (`sup-orders`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `sup-o-search` | Search Orders | By order#, customer, store |
| `sup-o-e1` | ⚠️ Data Masking | PII masking for support staff |

### 9.2 Finance Admin (`pa-fin` / `role=FINANCE_ADMIN`)

#### Transactions (`fin-txns`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `fin-t-all` | All Transactions | UPI, Card, Wallet, COD, Netbanking |
| `fin-t-status` | Transaction Status | Success / Failed / Pending / Refunded |
| `fin-t-e1` | ⚠️ Partial Refunds | Partial refund, double-debit recovery |

#### Seller Payouts (`fin-payouts`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `fin-p-cycle` | Payout Cycle | Weekly / biweekly / monthly config |
| `fin-p-commission` | Commission Deduction | Auto-calculate platform cut |
| `fin-p-utr` | UTR Tracking | Bank transfer reference number |
| `fin-p-e1` | ⚠️ Failed Payouts | Bank validation, payout holds |

#### Refund Processing (`fin-refunds`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `fin-r-auto` | Auto Refunds | Gateway callback triggered |
| `fin-r-manual` | Manual Approval | Admin review required |
| `fin-r-method` | Refund Destination | To wallet or original payment |
| `fin-r-e1` | ⚠️ Window Expired | Refund window gone, partial return |

#### GST Reports (`fin-gst`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `fin-g-r1` | GSTR-1 / GSTR-3B | Auto-generated GST returns |
| `fin-g-store` | Store-wise Tax | Per-store tax summaries |
| `fin-g-e1` | ⚠️ IGST/CGST/SGST | Inter-state vs intra-state tax |

#### Financial Statements (`fin-statements`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `fin-s-dl` | Download CSV/PDF | Export reports |
| `fin-s-e1` | ⚠️ Reconciliation | Mismatch detection between gateway & DB |

### 9.3 Operations Admin (`pa-ops` / `role=OPERATIONS_ADMIN`)

#### Seller Onboarding (`ops-onboard`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `ops-ob-check` | Onboarding Checklist | Step-by-step progress tracking |
| `ops-ob-docs` | Document Queue | Pending verifications |
| `ops-ob-e1` | ⚠️ Timeout Rejection | Auto-reject after N days incomplete |

#### KYC Verification (`ops-kyc`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `ops-k-gst` | GST API Check | Live GST verification |
| `ops-k-pan` | PAN Verify | NSDL PAN check |
| `ops-k-bank` | Penny Drop Test | ₹1 test deposit for bank verify |
| `ops-k-e1` | ⚠️ Fake Documents | ML-based fake detection |

#### Store Health (`ops-health`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `ops-h-fulfil` | Fulfillment Rate | % of orders fulfilled on time |
| `ops-h-complaints` | Complaint Rate | Complaints per 100 orders |
| `ops-h-delivery` | Avg Delivery Time | Days from order to delivery |
| `ops-h-e1` | ⚠️ Auto-Suspend | Suspend on health threshold breach |

#### Suspension Management (`ops-suspend`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `ops-su-temp` | Temporary Suspend | With reason, duration |
| `ops-su-ban` | Permanent Ban | Delete/archive store |
| `ops-su-appeal` | Appeal Process | Seller appeal flow |
| `ops-su-e1` | ⚠️ Post-Ban Data | Data retention, customer order migration |

### 9.4 Marketing Admin (`pa-mkt` / `role=MARKETING_ADMIN`)

#### Platform Banners (`mkt-banners`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `mkt-b-home` | Homepage Banners | Priority sorting, scheduling |
| `mkt-b-cat` | Category Banners | Category-specific promotions |
| `mkt-b-schedule` | Scheduling | Start/end dates, auto-publish |
| `mkt-b-e1` | ⚠️ A/B Testing | Banner variant testing, analytics |

#### Featured Sellers (`mkt-featured`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `mkt-f-manual` | Manual Selection | Admin picks featured stores |
| `mkt-f-auto` | Auto by GMV | Top performers auto-featured |
| `mkt-f-e1` | ⚠️ Fair Rotation | Prevent monopoly, opt-out support |

#### Promo Campaigns (`mkt-campaigns`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `mkt-c-codes` | Platform Coupons | Platform-wide discount codes |
| `mkt-c-push` | Push Notifications | Mass push to all users |
| `mkt-c-email` | Email Campaigns | Bulk email marketing |
| `mkt-c-e1` | ⚠️ Budget Limits | Campaign spend capping, duplicate redemption |

---

## Phase 10 — Platform Core & Super Admin

> **Duration:** 6-8 weeks | **Priority:** P0  
> **Spring Boot Module:** `admin-module`, `plan-module`  
> **Diagram Nodes:** `sa`, `sa-sellers`, `sa-plans`, `sa-roles`, `sa-settings`, `sa-analytics`, `sa-logs`

### 10.1 Seller Management (`sa-sellers`)

| Node ID | Feature | Description | Edge Cases |
|---------|---------|-------------|------------|
| `sa-s-approve` | Approve / Reject | Review seller applications | — |
| `sa-s-suspend` | Suspend / Ban | Temp suspend or permanent ban | — |
| `sa-s-view` | View All Stores | Browse all seller stores | — |
| `sa-s-kyc` | KYC Verification | GST/PAN upload & approval flow | — |
| `sa-s-kyc-gst` | GST Verification | API-based GST validation | — |
| `sa-s-kyc-pan` | PAN Verification | PAN number check via NSDL | — |
| `sa-s-kyc-bank` | Bank Verification | Penny drop test (₹1 deposit) | — |
| `sa-s-kyc-e1` | ⚠️ Fake Documents | Fake doc detection & rejection | ML-based detection, manual review queue |
| `sa-s-kyc-e2` | ⚠️ Re-verification | Triggered on data change | Auto-flag, require re-upload |
| `sa-s-e1` | ⚠️ Disputes | Seller disputes & re-activation flow | Appeal flow with admin review |
| `sa-s-e2` | ⚠️ Duplicate Seller | Same GST/PAN detection | Unique constraint, block registration |

### 10.2 Platform Plans (`sa-plans`)

#### Self-Managed Plans (`sa-p-self`) — "Apni Dukan"

| Node ID | Plan | Price | Commission | Products | Staff | Key Features |
|---------|------|-------|------------|----------|-------|-------------|
| `sa-p-free` | Free | ₹0/mo | 5% | 50 | 0 | Subdomain only, no custom domain, no AI |
| `sa-p-basic` | Basic | ₹300/mo | 4% | 500 | 2 | Custom domain + SSL |
| `sa-p-pro` | Pro | ₹1,000/mo | 2% | Unlimited | 5 | App builder, advanced analytics |
| `sa-p-enterprise` | Enterprise | ₹6,000/mo | 1% | Unlimited | ∞ | White label, full API, multi-store |

**Feature Details per Plan:**

| Node ID | Feature | Plan |
|---------|---------|------|
| `sa-pf-domain` | Subdomain only (store.platform.com) | Free |
| `sa-pf-commission` | 5% per sale | Free |
| `sa-pf-products` | Max 50 products | Free |
| `sa-pf-staff` | No staff accounts | Free |
| `sa-pf-no-ai` | No AI features | Free |
| `sa-pf-e1` | ⚠️ Feature lock — show locked features with upgrade CTA | Free |
| `sa-pb-domain` | Custom domain with SSL | Basic |
| `sa-pb-commission` | 4% per sale | Basic |
| `sa-pb-products` | Up to 500 products | Basic |
| `sa-pb-staff` | 2 staff accounts | Basic |
| `sa-pb-no-ai` | No AI features | Basic |
| `sa-pp-domain` | Custom domain + priority SSL | Pro |
| `sa-pp-commission` | 2% per sale | Pro |
| `sa-pp-products` | Unlimited products | Pro |
| `sa-pp-staff` | 5 staff accounts | Pro |
| `sa-pp-app` | App builder access | Pro |
| `sa-pp-analytics` | Advanced analytics (funnel, geo) | Pro |
| `sa-pp-no-ai` | No AI features | Pro |
| `sa-pe-commission` | 1% per sale | Enterprise |
| `sa-pe-products` | Unlimited everything | Enterprise |
| `sa-pe-priority` | Priority support (dedicated manager) | Enterprise |
| `sa-pe-white` | White label (remove branding) | Enterprise |
| `sa-pe-api` | Full API access (webhooks, integrations) | Enterprise |
| `sa-pe-multi` | Multi-store management | Enterprise |
| `sa-pe-no-ai` | No AI features | Enterprise |

#### Fully Managed Plan (`sa-p-managed`)

| Sub-Module | Node ID | Feature | Details |
|------------|---------|---------|---------|
| Onboarding | `sa-pm-onboard` | Entry requirements | — |
| | `sa-pm-deposit` | Security Deposit | ₹5,000 refundable deposit |
| | `sa-pm-adspend` | Min Ad Spend (Month 1) | ₹15,000 + 18% GST by Meta (₹17,700 total) |
| | `sa-pm-info` | Seller Provides | Product details, images, company info only |
| | `sa-pm-e1` | ⚠️ Deposit Refund Formula | Refund = ₹5K − (₹15K − actual_ad_spend) |
| | `sa-pm-e2` | ⚠️ Ad Spend Not Met | Shortfall deducted from deposit |
| Commission | `sa-pm-commission` | Commission Model | No monthly fees |
| | `sa-pm-sale` | 2% on Sales | Platform takes 2% of every sale |
| | `sa-pm-ad` | 2% on Ad Spend | Platform takes 2% of ad spend managed |
| | `sa-pm-no-monthly` | Zero Monthly Fee | No fixed charges |
| | `sa-pm-e3` | ⚠️ Commission Tracking | Transparent dashboard showing breakup |
| | `sa-pm-e4` | ⚠️ Dispute on Commission | Resolution flow for % disputes |
| Services | `sa-pm-services` | Platform Provides | Everything managed by team |
| | `sa-pm-website` | AI Website Built | Full website via AI Website Builder |
| | `sa-pm-catalogue` | AI Catalogue Built | Full product catalogue via AI |
| | `sa-pm-ads` | Ad Management | Google/Meta/Instagram ads |
| | `sa-pm-courier` | Courier Aggregation | Delhivery, DTDC, BlueDart — 50-60% margin |
| | `sa-pm-account` | Seller Account Mgmt | Manage dashboard, orders, inventory |
| | `sa-pm-seo` | SEO Management | Full SEO optimization |
| | `sa-pm-social` | Social Media Mgmt | Social presence management |
| | `sa-pm-e5` | ⚠️ Quality Issues | AI-built catalogue/website revision flow |
| | `sa-pm-e6` | ⚠️ Ad ROI Low | Low returns, stop/refund policy |
| Lifecycle | `sa-pm-lifecycle` | After Month 1 Options | — |
| | `sa-pm-continue` | Continue Managed | Keep plan, continue ad spend |
| | `sa-pm-switch` | Switch to Self-Managed | Move to Free/₹300/₹1K/₹6K |
| | `sa-pm-pause` | Pause/Stop | Pause services, keep store |
| | `sa-pm-increase` | Increase Ad Spend | Scale ad budget |
| | `sa-pm-e7` | ⚠️ Switch Data Transfer | Transfer all access to seller |
| | `sa-pm-e8` | ⚠️ Mid-month Switch | Prorated commission for partial month |
| | `sa-pm-e9` | ⚠️ Inactive Seller | 30 days no response → pause ads, notify |

#### Common Plan Features (`sa-p-common`)

| Node ID | Feature | Details |
|---------|---------|---------|
| `sa-pc-flags` | Feature Flags | Per-plan: wallet, subscription, domain, app, AI, max_products, max_staff |
| `sa-pc-billing` | Billing & Invoicing | Auto-invoice, payment reminders, GST on fees |
| `sa-pc-upgrade` | Upgrade/Downgrade | Switch plans with prorating |
| `sa-pc-trial` | Trial Period | 14-day free trial of Basic plan |
| `sa-pc-compare` | Plan Comparison Page | Public pricing page with feature table |
| `sa-pc-e1` | ⚠️ Plan Expiry | 7-day grace period, auto-downgrade to free |
| `sa-pc-e2` | ⚠️ Mid-cycle Change | Prorated billing calculation |
| `sa-pc-e3` | ⚠️ Payment Failed | Retry 3×, then downgrade |
| `sa-pc-e4` | ⚠️ Commission on Cancelled COD | Refund commission or not? |

### 10.3 Role Management (`sa-roles`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `sa-r-create` | Create Roles | Support, Finance, Ops, Marketing, Custom |
| `sa-r-perms` | Permission Matrix | Read/Write/Delete per module |
| `sa-r-staff` | Staff Accounts | Create & deactivate admin staff |
| `sa-r-e1` | ⚠️ Role Conflicts | Permission inheritance & conflicts |

### 10.4 Global Settings (`sa-settings`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `sa-g-commission` | Commission % | Platform cut on each sale |
| `sa-g-gateway` | Payment Gateway | Razorpay/Stripe master keys |
| `sa-g-templates` | Email/SMS Templates | Notification template editor |
| `sa-g-tax` | Platform Tax Rules | Default GST/tax configuration |
| `sa-g-locale` | Currency & Locale | INR default, locale settings |
| `sa-g-e1` | ⚠️ Multi-currency | Currency conversion, country rules |

### 10.5 Analytics & Reports (`sa-analytics`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `sa-a-gmv` | Total GMV | Gross Merchandise Value |
| `sa-a-sellers` | Active Sellers | Seller count & growth |
| `sa-a-customers` | Active Customers | Customer count across stores |
| `sa-a-revenue` | Revenue Reports | Daily/weekly/monthly breakdown |
| `sa-a-churn` | Churn Analysis | Sellers/customers leaving |
| `sa-a-top` | Top Stores | By GMV, orders, growth |
| `sa-a-e1` | ⚠️ Data Export | CSV/PDF export, scheduled reports |

### 10.6 Activity Logs (`sa-logs`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `sa-l-trail` | Action Audit Trail | Who did what, when |
| `sa-l-filter` | Filters | By admin, date, action type |
| `sa-l-e1` | ⚠️ Log Retention | Retention policy, GDPR compliance |

---

## Phase 11 — AI Features

> **Duration:** 8-10 weeks | **Priority:** P1  
> **Spring Boot Module:** `ai-module`  
> **Diagram Nodes:** `ai-assistant`, `ai-catalogue`, `ai-website`

### 11.1 AI Assistant (`ai-assistant`)

#### Chat Interface (`ai-chat`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `ai-ch-widget` | Floating Chat Widget | Always visible in admin panel |
| `ai-ch-context` | Context-aware | Knows current page, recent data |
| `ai-ch-history` | Chat History | Persistent conversation log |
| `ai-ch-suggest` | Smart Suggestions | Proactive tips based on store data |
| `ai-ch-multi` | Multi-language | Hindi/English based on preference |
| `ai-ch-e1` | ⚠️ Hallucination | Fact-check against DB, human fallback |
| `ai-ch-e2` | ⚠️ Context Too Long | Summarize conversation history |
| `ai-ch-e3` | ⚠️ AI Downtime | Fallback chain: GPT→Claude→Gemini→FAQ |

#### AI Actions (`ai-actions`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `ai-ac-product` | Quick Product Create | "Add 500g almonds ₹599" → create product |
| `ai-ac-coupon` | Create Coupon | "20% off for new customers" → create coupon |
| `ai-ac-order` | Order Lookup | "Show today's pending orders" → query & display |
| `ai-ac-analytics` | Analytics Q&A | "What's my revenue this week?" → answer |
| `ai-ac-seo` | SEO Suggestions | "Improve SEO for product X" → recommend keywords |
| `ai-ac-bulk` | Bulk Actions | "Update all prices by 10%" → batch with confirm |
| `ai-ac-e1` | ⚠️ Wrong Action | Confirm before execution |
| `ai-ac-e2` | ⚠️ Destructive Action | Admin-only for delete/bulk operations |
| `ai-ac-e3` | ⚠️ Ambiguous Command | Clarification prompt before acting |

#### Customer Chatbot (`ai-customer`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `ai-cu-faq` | FAQ Auto-answer | Common questions answered instantly |
| `ai-cu-track` | Order Tracking | "Where is my order?" → tracking status |
| `ai-cu-recommend` | Product Recommendations | "I need healthy snacks" → suggestions |
| `ai-cu-escalate` | Human Escalation | Transfer to live agent when needed |
| `ai-cu-return` | Return Assistance | Guide through return process |
| `ai-cu-e1` | ⚠️ Wrong Answer | Auto-escalate on low confidence |
| `ai-cu-e2` | ⚠️ Angry Customer | Sentiment detection → human handoff |
| `ai-cu-e3` | ⚠️ Multi-language | Auto-detect input language |
| `ai-cu-e4` | ⚠️ PII in Chat | Auto-mask phone/email in logs |

#### AI Configuration (`ai-config`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `ai-cf-model` | Model Provider | OpenAI / Anthropic / Google selection |
| `ai-cf-token` | Token Quota | Daily token limit per plan tier |
| `ai-cf-cost` | Cost Tracking | Per-request cost monitoring |
| `ai-cf-plan` | Plan-based Limits | Free:100, Pro:5000, Enterprise:unlimited |
| `ai-cf-fallback` | Fallback Chain | Model failover: GPT→Claude→Gemini |
| `ai-cf-e1` | ⚠️ Token Exhausted | Show upgrade prompt |
| `ai-cf-e2` | ⚠️ API Rate Limit | Auto-backoff & queue |
| `ai-cf-e3` | ⚠️ Cost Spike | Admin alert on unusual usage |

### 11.2 AI Catalogue Builder (`ai-catalogue`)

#### Input Methods (`aic-input`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `aic-in-image` | Image Upload | Photo → extract product details |
| `aic-in-link` | URL Import | Competitor URL → scrape & create |
| `aic-in-csv` | CSV/Excel Upload | Bulk import with AI enrichment |
| `aic-in-json` | JSON Import | API-based bulk create |
| `aic-in-voice` | Voice/Text Input | "Add almonds 250g ₹599" |
| `aic-in-camera` | Camera Scan | Real-time product scan |
| `aic-in-copy` | Copy from Store | Duplicate another store's product |
| `aic-in-e1` | ⚠️ Unsupported Format | Graceful error, manual fallback |
| `aic-in-e2` | ⚠️ Corrupt File | Validation before processing |
| `aic-in-e3` | ⚠️ Low-res Image | Warn, offer AI upscale |
| `aic-in-e4` | ⚠️ Blocked URL | Robots.txt/403, manual entry |
| `aic-in-e5` | ⚠️ Massive File (10K+) | Chunk upload, progress tracking |

#### AI Processing Engine (`aic-ai-engine`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `aic-ai-extract` | Data Extraction | Extract name, price, specs from inputs |
| `aic-ai-desc` | Description Generation | Marketing-quality product descriptions |
| `aic-ai-category` | Auto-categorization | AI assigns correct category |
| `aic-ai-variant` | Variant Detection | Auto-detect size/color/flavor variants |
| `aic-ai-price` | Price Suggestion | Market-based pricing recommendation |
| `aic-ai-seo` | SEO Tag Generation | Keywords, meta description |
| `aic-ai-hsn` | HSN/GST Auto-assign | Assign tax code based on category |
| `aic-ai-img` | Image Enhancement | Auto-crop, background remove, compress |
| `aic-ai-e1` | ⚠️ Wrong Extraction | Manual correction UI |
| `aic-ai-e2` | ⚠️ Wrong Category | Category override option |
| `aic-ai-e3` | ⚠️ Hallucinated Features | Flag unreliable data |
| `aic-ai-e4` | ⚠️ Copyright Content | Detection & warning |
| `aic-ai-e5` | ⚠️ Currency Mismatch | Auto-convert to INR |

#### Phased Processing (`aic-phased`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `aic-ph-batch` | Batch Sizing | 50-item batches for stability |
| `aic-ph-token` | Token Budget | Per-batch token allocation |
| `aic-ph-queue` | Queue Processing | Async batch processing |
| `aic-ph-progress` | Progress Tracker | Real-time progress bar |
| `aic-ph-pause` | Pause/Resume | Pause processing, resume later |
| `aic-ph-priority` | Priority Queue | Premium plans processed first |
| `aic-ph-e1` | ⚠️ Batch Failure | Resume from checkpoint |
| `aic-ph-e2` | ⚠️ Session Expired | Save state, resume on re-login |
| `aic-ph-e3` | ⚠️ Token Rate Exceeded | Auto-backoff, queue next batch |
| `aic-ph-e4` | ⚠️ Inconsistent Batches | Style normalization across batches |

#### Preview & Review (`aic-preview`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `aic-pv-grid` | Preview Grid | All AI-generated products in grid |
| `aic-pv-edit` | Inline Edit | Click to edit any field |
| `aic-pv-prompt` | Prompt Refinement | Re-process with better instructions |
| `aic-pv-approve` | Approve/Reject Each | Per-product accept or reject |
| `aic-pv-bulk-approve` | Bulk Approve | Select all & approve |
| `aic-pv-compare` | Before/After Compare | Original vs AI-generated side-by-side |
| `aic-pv-flag` | AI Confidence Score | Color-coded confidence indicator |
| `aic-pv-e1` | ⚠️ All Rejected | AI learns from feedback |
| `aic-pv-e2` | ⚠️ Edit Conflicts | Version control, last-write-wins |
| `aic-pv-e3` | ⚠️ Prompt Injection | Sanitize prompt inputs |
| `aic-pv-e4` | ⚠️ Stale Preview | Auto-expire after 24hrs |

#### Publish (`aic-publish`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `aic-pub-draft` | Save as Draft | Don't publish yet |
| `aic-pub-live` | Publish Live | Immediately visible |
| `aic-pub-schedule` | Schedule Publish | Launch at specific date/time |
| `aic-pub-notify` | Auto-notify | Alert customers of new products |
| `aic-pub-e1` | ⚠️ Duplicate Product | Block publish on duplicate detection |
| `aic-pub-e2` | ⚠️ Missing Fields | Validation gate before publish |
| `aic-pub-e3` | ⚠️ Zero Inventory | Warn: publishing with 0 stock |
| `aic-pub-e4` | ⚠️ Prohibited Content | Auto-moderation, block harmful products |

### 11.3 AI Website Builder (`ai-website`)

#### Setup (`aiw-setup`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `aiw-st-biz` | Business Info Input | Name, category, description |
| `aiw-st-sample` | Sample Products | Upload 5-10 sample products |
| `aiw-st-brand` | Brand Kit Upload | Logo, colors, fonts |
| `aiw-st-ref` | Reference URL | "Make it look like xyz.com" |
| `aiw-st-industry` | Industry Templates | Pre-built starters per industry |
| `aiw-st-e1` | ⚠️ Vague Input | Follow-up clarification questions |
| `aiw-st-e2` | ⚠️ Low-quality Logo | AI upscale or template fallback |
| `aiw-st-e3` | ⚠️ Ref Site Unavailable | Cache snapshot, template alternative |

#### Generation Phases (`aiw-generation`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `aiw-gn-phase1` | Phase 1: Layout | Page structure, sections |
| `aiw-gn-phase2` | Phase 2: Content | Copy, descriptions, headings |
| `aiw-gn-phase3` | Phase 3: Styling | Colors, typography, spacing |
| `aiw-gn-phase4` | Phase 4: Widgets | Product grids, testimonials, CTAs |
| `aiw-gn-phase5` | Phase 5: SEO | Meta tags, structured data |
| `aiw-gn-phase6` | Phase 6: Mobile | Responsive adjustments |
| `aiw-gn-token` | Token-aware | Budget allocation per phase |
| `aiw-gn-e1` | ⚠️ Phase Failed | Retry with fallback approach |
| `aiw-gn-e2` | ⚠️ Style Inconsistency | Style normalization pass |
| `aiw-gn-e3` | ⚠️ Generic Content | Request more seller-specific input |
| `aiw-gn-e4` | ⚠️ Accessibility Failure | Auto-fix WCAG issues |

#### Preview (`aiw-preview`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `aiw-pv-live` | Live Preview | Desktop + mobile side by side |
| `aiw-pv-prompt` | Prompt Editing | "Make header bigger", "Add more products" |
| `aiw-pv-manual` | Manual Drag-drop | Override AI with manual edits |
| `aiw-pv-undo` | Undo/Redo | Full edit history |
| `aiw-pv-ab` | A/B Variants | Generate multiple design options |
| `aiw-pv-speed` | Lighthouse Score | Performance score display |
| `aiw-pv-e1` | ⚠️ Layout Broken | Auto-fix or revert to last good state |
| `aiw-pv-e2` | ⚠️ Prompt Injection | Sanitize all user prompts |
| `aiw-pv-e3` | ⚠️ Mobile Overflow | Auto-detect & fix overflow issues |
| `aiw-pv-e4` | ⚠️ AI + Manual Conflict | Version control, explicit save |
| `aiw-pv-e5` | ⚠️ Preview ≠ Production | Cache purge, staging verification |

#### Generated Pages (`aiw-pages`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `aiw-pg-home` | Home Page | Hero, featured products, testimonials |
| `aiw-pg-about` | About Us | Business story, team |
| `aiw-pg-contact` | Contact Page | Form, map, WhatsApp |
| `aiw-pg-faq` | FAQ Page | AI-generated common questions |
| `aiw-pg-landing` | Landing Pages | Campaign-specific pages |
| `aiw-pg-custom` | Custom Pages | Any custom page |
| `aiw-pg-e1` | ⚠️ Content Inaccuracy | Manual verification needed |
| `aiw-pg-e2` | ⚠️ SEO Duplicate | Canonical tags, unique content |
| `aiw-pg-e3` | ⚠️ Broken Links | Link checker on publish |
| `aiw-pg-e4` | ⚠️ Image Attribution | License validation for AI images |

#### Ongoing Optimization (`aiw-ongoing`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `aiw-on-seasonal` | Seasonal Themes | Auto-switch for Diwali, Christmas, etc. |
| `aiw-on-banner` | Auto-generate Banners | Sale banners, new product banners |
| `aiw-on-copy` | Copy Refresh | Freshen product descriptions periodically |
| `aiw-on-review` | Auto Social Proof | Display recent reviews, purchase count |
| `aiw-on-e1` | ⚠️ Over-optimization | Change frequency cap |
| `aiw-on-e2` | ⚠️ Seasonal Mismatch | Category filter for seasonal applicability |
| `aiw-on-e3` | ⚠️ Auto-update Breaks Live | Staging preview + rollback |

---

## Phase 12 — Advanced Features & Final Modules

> **Duration:** 8-10 weeks | **Priority:** P2  
> **Spring Boot Modules:** `search-module`, `recommendation-module`, `flash-sale-module`, `affiliate-module`, `blog-module`, `webhook-module`, `chat-module`, `segmentation-module`, `gift-card-module`, `bundle-module`, `migration-module`, `social-module`, `print-module`, `service-module`, `policy-module`, `vacation-module`, `guest-checkout-module`, `order-notes-module`, `multi-store-module`  
> **Diagram Nodes:** `search`, `recommendations`, `flash-sales`, `affiliate`, `blog`, `webhooks`, `live-chat`, `segmentation`, `gift-cards`, `bundles`, `migration`, `guest-checkout`, `policies`, `social`, `print`, `vacation`, `order-notes`, `multi-store`

### 12.1 Search & Discovery (`search`)

#### Search (`sr-search`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `sr-s-auto` | Autocomplete | Type-ahead suggestions (Elasticsearch) |
| `sr-s-fuzzy` | Fuzzy Matching | "almnds" → "almonds" |
| `sr-s-rank` | Relevance Ranking | Boost by sales, rating, recency |
| `sr-s-ai` | AI Semantic Search | "healthy snacks under 500" → smart results |
| `sr-s-e1` | ⚠️ Search Abuse | Bot scraping, rate limit search API |

#### Filters & Facets (`sr-filters`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `sr-f-price` | Price Range | Slider filter |
| `sr-f-category` | Category Filter | Multi-select categories |
| `sr-f-rating` | Rating Filter | Min star rating |
| `sr-f-attr` | Attribute Filters | Dynamic: size, color, brand |
| `sr-f-instock` | In-stock Only | Toggle to hide OOS products |

#### Sort (`sr-sort`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `sr-so-popular` | Popularity | By order count |
| `sr-so-price` | Price | Low to high / high to low |
| `sr-so-newest` | Newest First | By creation date |
| `sr-so-rating` | Avg Rating | By average review score |

#### Search Analytics (`sr-analytics`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `sr-an-top` | Top Search Terms | Most searched keywords |
| `sr-an-zero` | Zero-result Queries | Searches with no matches |
| `sr-an-convert` | Search-to-purchase | Conversion rate from search |
| `sr-an-e1` | ⚠️ Search Manipulation | Fake search volume detection |

### 12.2 Product Recommendations (`recommendations`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `rec-similar` | Similar Products | Content-based filtering |
| `rec-bought` | Frequently Bought Together | Association rules |
| `rec-personal` | Personalized Feed | Collaborative filtering |
| `rec-trending` | Trending Now | Time-decay popularity |
| `rec-new` | New Arrivals | Recent additions |
| `rec-ai` | AI Hybrid Engine | Combined recommendation model |
| `rec-e1` | ⚠️ Cold Start | New user/product → popular fallback |

### 12.3 Flash Sales (`flash-sales`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `fs-create` | Create Flash Sale | Title, products, discount, start/end |
| `fs-countdown` | Countdown Timer | Live timer on storefront |
| `fs-stock` | Limited Stock | Per-product sale quantity cap |
| `fs-notify` | Sale Notifications | Alert customers before/during sale |
| `fs-banner` | Auto Banner | Flash sale banner on homepage |
| `fs-e1` | ⚠️ Overselling | Concurrent stock lock during rush |
| `fs-e2` | ⚠️ Price Manipulation | Inflate price before sale detection |

### 12.4 Affiliate Program (`affiliate`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `aff-signup` | Affiliate Signup | Registration form |
| `aff-link` | Unique Tracking Links | Per-affiliate UTM links |
| `aff-commission` | Commission Rules | Per-product or flat rate |
| `aff-dashboard` | Affiliate Dashboard | Clicks, conversions, earnings |
| `aff-payout` | Payout Processing | Min threshold, bank transfer |
| `aff-tiers` | Tier System | Bronze/Silver/Gold with better rates |
| `aff-e1` | ⚠️ Self-referral Fraud | Same IP/device detection, cookie stuffing |

### 12.5 Blog / CMS (`blog`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `blog-editor` | Rich Text Editor | Markdown + WYSIWYG |
| `blog-ai` | AI Blog Writer | Auto-generate blog content |
| `blog-seo` | Blog SEO | Meta tags, schema markup |
| `blog-schedule` | Schedule Posts | Publish at future date |
| `blog-categories` | Blog Categories | Organize posts by category |
| `blog-product-link` | Product Embedding | Embed product cards in blog |
| `blog-e1` | ⚠️ AI Content Quality | Generic articles need human editing |

### 12.6 Webhooks & API (`webhooks`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `wh-manage` | Webhook CRUD | Create, edit, delete webhooks |
| `wh-events` | Event Types | order.created, payment.success, etc. |
| `wh-secret` | HMAC Signature | Verify webhook authenticity |
| `wh-logs` | Delivery Logs | Success/failure log per delivery |
| `wh-retry` | Auto-retry | Exponential backoff on failure |
| `wh-api-keys` | API Keys | Generate, rotate, revoke keys |
| `wh-docs` | OpenAPI Docs | Swagger/OpenAPI documentation |
| `wh-e1` | ⚠️ Webhook Flood | Outbound rate limiting, circuit breaker |

### 12.7 Live Chat (`live-chat`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `lc-widget` | Chat Widget | Floating chat on storefront |
| `lc-inbox` | Seller Inbox | All conversations in one place |
| `lc-ai-first` | AI First Responder | AI answers first, escalate if needed |
| `lc-attach` | File Attachments | Share images/documents |
| `lc-canned` | Canned Responses | Quick reply templates |
| `lc-hours` | Business Hours | Auto-reply outside hours |
| `lc-e1` | ⚠️ Spam/Abuse | Block user, rate limit messages |

### 12.8 Customer Segmentation (`segmentation`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `seg-rfm` | RFM Analysis | Recency, Frequency, Monetary scoring |
| `seg-groups` | Auto Groups | VIP, At-risk, New, Dormant, Champions |
| `seg-auto` | AI Segmentation | ML-based automatic segment discovery |
| `seg-target` | Targeted Campaigns | Send offers to specific segments |
| `seg-custom` | Custom Filters | Build segments with custom rules |
| `seg-e1` | ⚠️ Small Segments | Too few customers, merge suggestion |

### 12.9 Gift Cards (`gift-cards`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `gc-create` | Create Gift Card | ₹500, ₹1000, ₹2000, custom amount |
| `gc-design` | Design Templates | Festival, birthday, corporate themes |
| `gc-deliver` | Delivery Methods | Email, SMS, WhatsApp |
| `gc-redeem` | Redeem at Checkout | Enter code, apply balance |
| `gc-balance` | Balance Check | Check remaining balance |
| `gc-expire` | Expiry Management | Auto-expire after N months |
| `gc-corporate` | Corporate Bulk | Bulk purchase for companies |
| `gc-e1` | ⚠️ Code Brute Force | CAPTCHA after 3 fails |
| `gc-e2` | ⚠️ Expired Card Refund | No refund policy, extension option |
| `gc-e3` | ⚠️ Partial Use + Return | Balance handling on return |

### 12.10 Product Bundles (`bundles`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `bn-create` | Create Bundle | Select products, set bundle name |
| `bn-discount` | Bundle Discount | % off or fixed bundle price |
| `bn-display` | Display on Store | Bundle card with savings badge |
| `bn-inventory` | Linked Inventory | Min of component stock = bundle stock |
| `bn-mix` | Mix & Match | Customer picks from options |
| `bn-cross` | Cross-sell Suggestions | "Complete the bundle" prompt |
| `bn-e1` | ⚠️ Component OOS | Auto-disable bundle when any item OOS |
| `bn-e2` | ⚠️ Partial Return | Return one item from bundle pricing logic |
| `bn-e3` | ⚠️ Bundle + Coupon | Stacking rules for bundle discounts + coupons |

### 12.11 Store Migration (`migration`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `mg-shopify` | Shopify Import | Products, customers, orders from Shopify |
| `mg-woo` | WooCommerce Import | WooCommerce data migration |
| `mg-csv` | Generic CSV Import | Universal CSV/Excel import |
| `mg-images` | Image Migration | Download & re-host all product images |
| `mg-customers` | Customer Import | Customer data with consent |
| `mg-orders` | Order History | Historical order data transfer |
| `mg-seo` | URL Redirect Map | Old URLs → new URLs (301 redirects) |
| `mg-e1` | ⚠️ Data Mapping Mismatch | Fields don't align, manual mapping UI |
| `mg-e2` | ⚠️ Duplicate Detection | Prevent importing existing products |
| `mg-e3` | ⚠️ Image 404 | Missing images, placeholder handling |
| `mg-e4` | ⚠️ Customer GDPR Re-consent | Re-consent required under new platform |

### 12.12 Guest Checkout (`guest-checkout`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `gco-enable` | Enable/Disable Toggle | Seller controls guest checkout availability |
| `gco-flow` | Checkout Flow | Email + phone + address → pay → done |
| `gco-tracking` | Order Tracking | Email-based tracking link (no login) |
| `gco-convert` | Convert to Account | Post-purchase signup prompt |
| `gco-history` | Order Lookup | Email + order# to view without account |
| `gco-e1` | ⚠️ Repeat Guest | Same email multiple orders, merge on signup |
| `gco-e2` | ⚠️ Wallet/Loyalty Miss | Guest misses loyalty, signup incentive |
| `gco-e3` | ⚠️ Return Without Account | Refund to original payment only |

### 12.13 Store Policies with AI Generator (`policies`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `pol-return` | Return Policy | Return window, conditions, process |
| `pol-refund` | Refund Policy | Timeline, method, partial rules |
| `pol-shipping` | Shipping Policy | Delivery times, charges, COD rules |
| `pol-privacy` | Privacy Policy | GDPR/DPDPA template |
| `pol-terms` | Terms & Conditions | User agreement |
| `pol-ai-gen` | AI Policy Generator | Auto-generate all policies from store config |
| `pol-footer` | Footer Auto-linking | Policies linked in storefront footer |
| `pol-e1` | ⚠️ Missing Policy | Warn seller before going live |
| `pol-e2` | ⚠️ Policy vs Practice | Seller violates own policy, enforcement |

### 12.14 Social Commerce (`social`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `soc-share` | Share Buttons | Product share via social + WhatsApp |
| `soc-whatsapp` | WhatsApp Catalogue Sync | Auto-sync products to WhatsApp Business |
| `soc-insta` | Instagram Shopping | Product tagging on Instagram |
| `soc-fb-shop` | Facebook Shop | Sync catalogue to Facebook Shop |
| `soc-ugc` | User Generated Content | Customer photos on product pages |
| `soc-proof` | Social Proof Popup | "X people bought this in last 24hrs" |
| `soc-influencer` | Influencer Tracking | Attribution links for influencers |
| `soc-e1` | ⚠️ API Deprecation | Instagram/Facebook API changes |
| `soc-e2` | ⚠️ Fake Social Proof | Detection and prevention |

### 12.15 Print & Packaging (`print`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `pt-label` | Shipping Labels | Standard courier labels |
| `pt-invoice` | Invoice PDF | GST-compliant PDF generation |
| `pt-packing` | Packing Slip | Item checklist for packers |
| `pt-bulk` | Bulk Print | Print 50-100 labels/invoices at once |
| `pt-barcode` | Barcode / QR | Product & order barcode generation |
| `pt-thermal` | Thermal Printer (4x6) | Support for thermal label printers |
| `pt-custom` | Custom Branding | Logo, message on packaging slips |
| `pt-e1` | ⚠️ Printer Compatibility | Driver issues, format mismatch |
| `pt-e2` | ⚠️ Wrong Label | Label printed for wrong order |

### 12.16 Store Vacation Mode (`vacation`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `vac-enable` | Enable Vacation | One-toggle vacation mode |
| `vac-message` | Custom Message | "We're on vacation until Jan 10!" |
| `vac-dates` | Schedule Dates | Start/end date for auto-enable/disable |
| `vac-orders` | Order Behavior | Block new orders or delay processing |
| `vac-subs` | Auto-pause Subscriptions | Pause all active subscriptions |
| `vac-notify` | Customer Notification | Alert existing customers |
| `vac-e1` | ⚠️ Pending Orders | Existing orders must still be fulfilled |
| `vac-e2` | ⚠️ SEO Impact | Maintain store indexing during vacation |
| `vac-e3` | ⚠️ Forgot to Disable | Auto-resume reminder after end date |

### 12.17 Order Customization & Notes (`order-notes`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `on-delivery` | Delivery Instructions | "Leave at door", "Call before delivery" |
| `on-gift` | Gift Options | Gift wrap, gift message, hide price |
| `on-custom` | Product Customization | Engraving, printing, custom messages |
| `on-seller` | Seller Notes | Internal notes (never shown to customer) |
| `on-e1` | ⚠️ Message Too Long | Character limit, profanity filter |
| `on-e2` | ⚠️ Customization Not Feasible | Seller cannot fulfill, modify/refund flow |

### 12.18 Multi-Store Management (`multi-store`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `ms-switch` | Store Switcher | Dropdown to switch between stores |
| `ms-shared` | Shared Catalogue | Same products across multiple stores |
| `ms-unified` | Unified Dashboard | Cross-store analytics |
| `ms-staff` | Cross-store Staff | Staff members across stores |
| `ms-pricing` | Per-store Pricing | Different prices per store |
| `ms-e1` | ⚠️ Inventory Conflict | Same product on 2 stores, stock sync |
| `ms-e2` | ⚠️ Plan Limits | Max stores per plan tier |

### 12.19 QR Code Commerce (`qr-commerce`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `qr-product` | Product QR Code | Unique QR per product — scan to view/buy instantly |
| `qr-store` | Store QR Code | Scan to open store — print on visiting cards, packaging |
| `qr-upi` | UPI QR Payment | Direct UPI payment QR at checkout — India-first |
| `qr-table` | Table/Location QR | Restaurant/cafe table ordering via QR scan |
| `qr-bulk` | Bulk QR Generation | Generate QR codes for entire catalogue at once |
| `qr-analytics` | QR Scan Analytics | Track scans by location, time, conversion rate |
| `qr-e1` | ⚠️ QR Expired/Invalid | Product deleted or QR tampered, show graceful error |
| `qr-e2` | ⚠️ Duplicate QR Scan | Same QR scanned multiple times, dedup logic |

### 12.20 Marketplace Mode (`marketplace`)

> **Availability:** Custom Plan only (very selective)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `mp-vendor-reg` | Vendor Registration | Vendors apply to sell on marketplace — admin approval required |
| `mp-vendor-panel` | Vendor Dashboard | Per-vendor orders, products, earnings view |
| `mp-commission` | Commission Rules | Marketplace owner sets % commission per vendor/category |
| `mp-payout` | Vendor Payouts | Auto/manual payout to vendors — settlement cycle config |
| `mp-products` | Vendor Product Mgmt | Vendors manage own products, marketplace admin approves |
| `mp-shipping` | Per-vendor Shipping | Each vendor sets own shipping rules or uses marketplace logistics |
| `mp-reviews` | Vendor Ratings | Customers rate vendors separately from products |
| `mp-e1` | ⚠️ Multi-vendor Cart | Cart has items from 3 vendors — split checkout, combined shipping? |
| `mp-e2` | ⚠️ Vendor Disputes | Customer complaint — marketplace mediates between buyer & vendor |
| `mp-e3` | ⚠️ Vendor Goes Inactive | Vendor stops fulfilling, auto-disable products, refund pending orders |

### 12.21 POS & Offline Billing (`pos`)

> **Description:** Point of Sale for offline shop — unified inventory with online store

#### Offline Billing (`pos-billing`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `pos-b-quick` | Quick Bill | Scan barcode or search product → add to bill instantly |
| `pos-b-customer` | Walk-in Customer | Optional customer phone — link to existing or create new |
| `pos-b-payment` | Offline Payment | Cash, UPI scan, Card swipe, Mixed payment |
| `pos-b-receipt` | Print Receipt | Thermal receipt print + SMS/WhatsApp e-receipt |
| `pos-b-return` | Counter Return | In-store return/exchange processing |
| `pos-b-discount` | Manual Discount | Counter staff applies instant discount |
| `pos-b-e1` | ⚠️ Printer Offline | Thermal printer disconnected — queue print, send e-receipt |
| `pos-b-e2` | ⚠️ Cash Mismatch | End-of-day cash count vs system total mismatch |

#### Online-Offline Sync (`pos-sync`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `pos-s-inventory` | Unified Inventory | Single stock count for online website + offline counter |
| `pos-s-realtime` | Real-time Sync | Offline sale instantly reduces online stock & vice versa |
| `pos-s-offline-mode` | Offline Mode | Works without internet — queues transactions, syncs when back online |
| `pos-s-conflict` | Conflict Resolution | Same product sold online + offline simultaneously — auto-resolve |
| `pos-s-e1` | ⚠️ Sync Failure | Internet drops mid-sync — retry queue, manual override |
| `pos-s-e2` | ⚠️ Double Sold | Product sold offline + online before sync — one order auto-cancelled |

#### Unified Invoicing (`pos-invoice`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `pos-inv-online` | Online Invoice | Auto-generated PDF for website/app orders |
| `pos-inv-offline` | Offline Invoice | Counter bill with GST, thermal or A4 format |
| `pos-inv-unified` | Unified Invoice Series | Single invoice number sequence across online + offline |
| `pos-inv-gst` | GST Compliance | Combined GST filing for online + offline sales |

#### Omnichannel Reports (`pos-reports`)

| Node ID | Feature | Description |
|---------|---------|-------------|
| `pos-r-sales` | Combined Sales Report | Online + offline revenue in single dashboard |
| `pos-r-channel` | Channel Comparison | Online vs offline — which channel performs better |
| `pos-r-cashflow` | Cash Flow Report | Cash + digital payments daily summary |
| `pos-r-staff` | Staff Sales Report | Per-counter-staff sales tracking for offline |

| Node ID | Feature | Description |
|---------|---------|-------------|
| `pos-barcode` | Barcode Scanner | Camera/hardware barcode scan in POS — instant product lookup |
| `pos-staff-shift` | Staff Shift / Schedule | Counter staff shift timing, attendance, handover notes |

### 12.22 ONDC Integration (`ondc`)

> **Description:** Open Network for Digital Commerce — India govt-backed interoperable e-commerce network

| Node ID | Feature | Description |
|---------|---------|-------------|
| `ondc-register` | Seller Registration | Register seller on ONDC network via Beckn protocol |
| `ondc-catalog` | Catalog Sync | Push products to ONDC catalog — auto-sync inventory & pricing |
| `ondc-order` | Order Receive | Receive orders from any ONDC buyer app (Paytm, PhonePe, Google) |
| `ondc-fulfill` | Fulfillment | Ship ONDC orders via existing logistics or ONDC logistics network |
| `ondc-settle` | Settlement | ONDC payment settlement to seller — T+1/T+2 cycle |
| `ondc-return` | Return via ONDC | Handle returns initiated from buyer apps |
| `ondc-e1` | ⚠️ Protocol Version Mismatch | ONDC protocol upgrade — backward compatibility needed |
| `ondc-e2` | ⚠️ Multi-network Pricing | Different price on ONDC vs own store — sync conflict |

### 12.23 Seller Help Center (`help-center`)

> **Description:** Self-serve knowledge base & learning resources for sellers

| Node ID | Feature | Description |
|---------|---------|-------------|
| `hc-articles` | Knowledge Base | Searchable help articles organized by topic — getting started, payments, shipping |
| `hc-video` | Video Tutorials | Step-by-step video guides for common tasks — add product, set shipping |
| `hc-faq` | FAQ Section | Most asked questions with quick answers |
| `hc-ticket` | Support Ticket | Raise ticket if article doesn't solve, track status |
| `hc-chat` | Live Support Chat | Real-time chat with support team for urgent issues |
| `hc-changelog` | Platform Changelog | Latest updates, new features, bug fixes — "What's New" feed |
| `hc-e1` | ⚠️ Article Outdated | Feature changed but help article not updated — review cycle |

---

## Database Schema Overview

### Core Entity Relationships

```
PlatformPlan ──1:N── SellerSubscription ──N:1── Seller
Seller ──1:N── Store
Store ──1:N── Product ──1:N── ProductVariant
Store ──1:N── Category (self-referencing for nesting)
Store ──1:N── Customer ──1:N── Address
Store ──1:N── Order ──1:N── OrderItem
Customer ──1:1── Wallet ──1:N── WalletTransaction
Customer ──1:N── CartItem
Customer ──1:N── WishlistItem ──1:N── WishlistAlert
Customer ──1:N── Subscription ──1:N── SubscriptionDelivery
Customer ──1:1── LoyaltyAccount ──1:N── LoyaltyTransaction
Order ──1:1── Payment
Order ──1:1── Invoice
Order ──0:N── ReturnRequest ──1:1── ReturnPickup ──1:1── ReturnInspection
Order ──0:N── OrderNote (delivery instructions, gift options)
Store ──1:N── Coupon ──1:N── CouponUsage
Store ──1:N── DeliveryZone ──1:N── TimeSlot
Store ──1:N── StaffMember ──N:1── StaffRole
Store ──1:N── Service ──1:N── ServiceBooking
Store ──1:N── GiftCard ──1:N── GiftCardTransaction
Store ──1:N── ProductBundle ──N:N── Product (bundle_items)
Store ──1:N── AffiliatePartner ──1:N── AffiliateClick
Store ──1:N── BlogPost ──N:1── BlogCategory
Store ──1:N── LiveChatConversation ──1:N── ChatMessage
Store ──1:N── FlashSale ──1:N── FlashSaleItem
Store ──1:N── Webhook ──1:N── WebhookDelivery
Store ──1:N── StorePolicy (return, refund, shipping, privacy, terms)
Store ──0:1── StoreVacation
Store ──1:N── SocialCommerceConfig
Store ──1:N── QRCode (product, store, table QR codes)
Store ──0:1── MarketplaceConfig
Store ──1:N── MarketplaceVendor ──1:N── VendorPayout
Store ──1:N── POSTransaction ──1:1── POSReceipt
Store ──1:N── StaffShift
Store ──0:1── ONDCRegistration
Store ──1:N── ONDCOrder
Customer ──1:N── CustomerSegment (via segmentation engine)
PlatformAdmin ──N:1── AdminRole ──N:N── Permission
Seller ──1:N── Store (multi-store support)
Platform ──1:N── HelpArticle ──N:1── HelpCategory
Platform ──1:N── HelpTicket
```

### Estimated Table Count: 110+ tables

---

## API Design Guidelines

### REST API Conventions

```
Base URL: /api/v1

Authentication: Bearer JWT in Authorization header
Tenant Resolution: X-Store-Id header or subdomain

# Endpoints Pattern:
GET    /api/v1/{module}          → List (paginated)
GET    /api/v1/{module}/{id}     → Get by ID
POST   /api/v1/{module}          → Create
PUT    /api/v1/{module}/{id}     → Full update
PATCH  /api/v1/{module}/{id}     → Partial update
DELETE /api/v1/{module}/{id}     → Soft delete

# Response Format:
{
  "success": true,
  "data": { ... },
  "meta": { "page": 1, "limit": 20, "total": 150 },
  "error": null
}
```

### Estimated API Endpoints: 500+

---

## Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| **Availability** | 99.9% uptime SLA |
| **Response Time** | P95 API response < 200ms |
| **Concurrent Users** | 50,000+ simultaneous |
| **Data Retention** | 7 years for financial records |
| **Backup** | Daily automated, point-in-time recovery |
| **Security** | SOC 2 Type II, PCI DSS compliant |
| **Scalability** | Horizontal scaling via containerization (Docker + K8s) |
| **Lighthouse Score** | Storefront > 90 (Performance, Accessibility, SEO) |

---

## Development Timeline Summary

| Phase | Duration | Priority | Key Deliverables |
|-------|----------|----------|-----------------| 
| **Phase 1** | 6-8 weeks | P0 | Customer Storefront, Products, Categories, Variants, Reviews |
| **Phase 2** | 5-6 weeks | P0 | Cart, Checkout, Wishlist, Loyalty, Customer Registration |
| **Phase 3** | 5-6 weeks | P0 | Auth, JWT, OTP, 2FA, Notification Engine |
| **Phase 4** | 8-10 weeks | P0 | Orders, Payments, Returns, Wallet, Subscriptions |
| **Phase 5** | 6-8 weeks | P0 | Seller Registration, KYC, Store Identity, Theme, Settings |
| **Phase 6** | 5-6 weeks | P0 | Seller Dashboard, Shipping, Delivery Zones, Coupons |
| **Phase 7** | 6-8 weeks | P1 | Website Builder, Communication, App Builder, Plugins |
| **Phase 8** | 6-8 weeks | P1 | Reports, Compliance, i18n, Infrastructure |
| **Phase 9** | 4-5 weeks | P1 | Support Admin, Finance Admin, Ops Admin, Marketing Admin |
| **Phase 10** | 6-8 weeks | P1 | Platform Core, Super Admin, Plans, Billing, KYC |
| **Phase 11** | 8-10 weeks | P2 | AI Assistant, AI Catalogue, AI Website Builder |
| **Phase 12** | 10-12 weeks | P2 | Search, Flash Sales, Gift Cards, QR Commerce, Marketplace, POS, ONDC, Help Center |

> **Total Estimated Timeline:** 88-107 weeks (~20-25 months) with a team of 4-6 backend developers  

### 🤖 AI-Driven Sprints Strategy
Given the massive scope of the platform (110+ tables, 600+ APIs), the 12 Macro Phases above are too large for a single AI prompt (Gemini 3.1 Pro / Claude 3.7 Sonnet). To prevent hallucinations, each Phase is broken down into **Micro-Sprints** (e.g., Sprint 1.1, 1.2). 
*Rule of thumb:* One Sprint = 1-3 Database tables + 1 Repository + 1 Service + 1 Controller. *(See separate AI Sprint Plan document for the complete 50+ sprint breakdown).*
> **Total System Nodes Documented:** 400+  
> **Total Edge Cases Cataloged:** 140+ across all modules  
> **Total Database Tables:** 110+  
> **Total API Endpoints:** 600+

---

*Document generated from VyapaarPe System Architecture Diagram (400+ nodes)*  
*Backend: Java 21 + Spring Boot 3.x*  
*Last Updated: 10 March 2026 | Version: 3.0*

