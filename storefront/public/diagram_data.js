// ============================================================
// COMPLETE NODE DATA TREE — 350+ Nodes
// All roles, features, sub-features, and edge cases
// ============================================================

const TREE_DATA = {
    id: 'root', name: 'PLATFORM CORE', icon: '🌐', color: 'platform',
    desc: 'Multi-Tenant E-Commerce Platform',
    children: [
        // ── SUPER ADMIN ──────────────────────────────────────────
        {
            id: 'sa', name: 'SUPER ADMIN', icon: '👑', color: 'superadmin',
            desc: 'PlatformAdmin • role=SUPER_ADMIN',
            children: [
                {
                    id: 'sa-sellers', name: 'Seller Management', icon: '🏪', color: 'superadmin',
                    desc: 'Approve, reject, suspend sellers',
                    children: [
                        { id: 'sa-s-approve', name: 'Approve / Reject', icon: '✅', color: 'superadmin', desc: 'Review seller applications' },
                        { id: 'sa-s-suspend', name: 'Suspend / Ban', icon: '🚫', color: 'superadmin', desc: 'Temp suspend or permanent ban' },
                        { id: 'sa-s-view', name: 'View All Stores', icon: '👁️', color: 'superadmin', desc: 'Browse all seller stores' },
                        {
                            id: 'sa-s-kyc', name: 'KYC Verification', icon: '📋', color: 'superadmin', desc: 'GST/PAN upload & approval flow',
                            children: [
                                { id: 'sa-s-kyc-gst', name: 'GST Verification', icon: '📄', color: 'superadmin', desc: 'API-based GST validation' },
                                { id: 'sa-s-kyc-pan', name: 'PAN Verification', icon: '📄', color: 'superadmin', desc: 'PAN number check' },
                                { id: 'sa-s-kyc-bank', name: 'Bank Verification', icon: '🏦', color: 'superadmin', desc: 'Penny drop test' },
                                { id: 'sa-s-kyc-e1', name: 'Fake Documents', icon: '⚠️', color: 'edge', edge: 'Fake doc detection & rejection' },
                                { id: 'sa-s-kyc-e2', name: 'Re-verification', icon: '⚠️', color: 'edge', edge: 'Triggered on data change' }
                            ]
                        },
                        { id: 'sa-s-e1', name: 'Disputes', icon: '⚠️', color: 'edge', edge: 'Seller disputes & re-activation flow' },
                        { id: 'sa-s-e2', name: 'Duplicate Seller', icon: '⚠️', color: 'edge', edge: 'Same GST/PAN detection' }
                    ]
                },
                {
                    id: 'sa-plans', name: 'Platform Plans', icon: '📋', color: 'plan',
                    desc: 'Two plan categories: Self-Managed & Fully Managed',
                    children: [
                        // ── CATEGORY 1: SELF-MANAGED (Apni Dukan) ──
                        {
                            id: 'sa-p-self', name: '📦 Self-Managed Plans', icon: '🏪', color: 'plan',
                            desc: 'Seller manages own store, website, catalogue — NO AI builders',
                            children: [
                                {
                                    id: 'sa-p-free', name: 'Free Plan', icon: '🆓', color: 'plan',
                                    desc: '₹0/month • 5% commission • No custom domain',
                                    children: [
                                        { id: 'sa-pf-domain', name: 'Subdomain Only', icon: '🌐', color: 'plan', desc: 'store.platform.com (no custom domain)' },
                                        { id: 'sa-pf-commission', name: '5% per Sale', icon: '💰', color: 'plan', desc: 'Platform takes 5% of every sale' },
                                        { id: 'sa-pf-products', name: 'Limited Products', icon: '📦', color: 'plan', desc: 'Max 50 products' },
                                        { id: 'sa-pf-staff', name: 'No Staff Accounts', icon: '👤', color: 'plan', desc: 'Single owner login only' },
                                        { id: 'sa-pf-no-ai', name: 'No AI Features', icon: '🚫', color: 'plan', desc: 'AI Website Builder & AI Catalogue not included' },
                                        { id: 'sa-pf-e1', name: 'Feature Lock', icon: '⚠️', color: 'edge', edge: 'Show locked features with upgrade CTA' }
                                    ]
                                },
                                {
                                    id: 'sa-p-basic', name: 'Basic Plan', icon: '📋', color: 'plan',
                                    desc: '₹300/month • 4% commission',
                                    children: [
                                        { id: 'sa-pb-domain', name: 'Custom Domain', icon: '🌐', color: 'plan', desc: 'Connect own domain with SSL' },
                                        { id: 'sa-pb-commission', name: '4% per Sale', icon: '💰', color: 'plan', desc: 'Platform takes 4% of every sale' },
                                        { id: 'sa-pb-products', name: 'Up to 500 Products', icon: '📦', color: 'plan', desc: 'Increased product limit' },
                                        { id: 'sa-pb-staff', name: '2 Staff Accounts', icon: '👥', color: 'plan', desc: 'Owner + 2 staff' },
                                        { id: 'sa-pb-no-ai', name: 'No AI Features', icon: '🚫', color: 'plan', desc: 'AI Website Builder & AI Catalogue not included' }
                                    ]
                                },
                                {
                                    id: 'sa-p-pro', name: 'Pro Plan', icon: '⭐', color: 'plan',
                                    desc: '₹1,000/month • 2% commission',
                                    children: [
                                        { id: 'sa-pp-domain', name: 'Custom Domain + SSL', icon: '🌐', color: 'plan', desc: 'Priority SSL setup' },
                                        { id: 'sa-pp-commission', name: '2% per Sale', icon: '💰', color: 'plan', desc: 'Platform takes 2% of every sale' },
                                        { id: 'sa-pp-products', name: 'Unlimited Products', icon: '📦', color: 'plan', desc: 'No product limit' },
                                        { id: 'sa-pp-staff', name: '5 Staff Accounts', icon: '👥', color: 'plan', desc: 'Full team management' },
                                        { id: 'sa-pp-app', name: 'App Builder Access', icon: '📱', color: 'plan', desc: 'Mobile app generation enabled' },
                                        { id: 'sa-pp-analytics', name: 'Advanced Analytics', icon: '📊', color: 'plan', desc: 'Full funnel, conversion, geo reports' },
                                        { id: 'sa-pp-no-ai', name: 'No AI Features', icon: '🚫', color: 'plan', desc: 'AI Website Builder & AI Catalogue not included' }
                                    ]
                                },
                                {
                                    id: 'sa-p-enterprise', name: 'Enterprise Plan', icon: '💎', color: 'plan',
                                    desc: '₹6,000/month • 1% commission',
                                    children: [
                                        { id: 'sa-pe-commission', name: '1% per Sale', icon: '💰', color: 'plan', desc: 'Lowest commission rate' },
                                        { id: 'sa-pe-products', name: 'Unlimited Everything', icon: '♾️', color: 'plan', desc: 'Products, staff, storage, all features' },
                                        { id: 'sa-pe-priority', name: 'Priority Support', icon: '🎯', color: 'plan', desc: 'Dedicated support manager' },
                                        { id: 'sa-pe-white', name: 'White Label', icon: '🏷️', color: 'plan', desc: 'Remove platform branding' },
                                        { id: 'sa-pe-api', name: 'Full API Access', icon: '🔌', color: 'plan', desc: 'Webhooks, custom integrations' },
                                        { id: 'sa-pe-multi', name: 'Multi-store', icon: '🏪', color: 'plan', desc: 'Manage multiple stores from one account' },
                                        { id: 'sa-pe-no-ai', name: 'No AI Features', icon: '🚫', color: 'plan', desc: 'AI Website Builder & AI Catalogue not included' }
                                    ]
                                }
                            ]
                        },
                        // ── CATEGORY 2: FULLY MANAGED SERVICE ──
                        {
                            id: 'sa-p-managed', name: '🤖 Fully Managed Plan', icon: '👑', color: 'plan',
                            desc: 'We build & manage everything — seller just provides product info',
                            children: [
                                {
                                    id: 'sa-pm-onboard', name: 'Onboarding', icon: '📋', color: 'plan',
                                    desc: 'Entry requirements & setup',
                                    children: [
                                        { id: 'sa-pm-deposit', name: 'Security Deposit', icon: '🔒', color: 'plan', desc: '₹5,000 refundable deposit to activate' },
                                        { id: 'sa-pm-adspend', name: 'Min Ad Spend (Month 1)', icon: '📢', color: 'plan', desc: '₹15,000 min ad spend + 18% GST by Meta (₹17,700 total). Can go higher.' },
                                        { id: 'sa-pm-info', name: 'Seller Provides', icon: '📦', color: 'plan', desc: 'Product details, images, company info — nothing else' },
                                        { id: 'sa-pm-e1', name: 'Deposit Refund Formula', icon: '⚠️', color: 'edge', edge: 'Refund = ₹5K - (₹15K - actual_ad_spend). E.g. ₹11K spent → ₹4K shortfall → only ₹1K refund' },
                                        { id: 'sa-pm-e2', name: 'Ad Spend Not Met', icon: '⚠️', color: 'edge', edge: 'If seller spends < ₹15K, shortfall deducted from ₹5K deposit. If ₹0 spent → ₹0 refund' }
                                    ]
                                },
                                {
                                    id: 'sa-pm-commission', name: 'Commission Model', icon: '💰', color: 'plan',
                                    desc: 'No monthly fees, commission-based',
                                    children: [
                                        { id: 'sa-pm-sale', name: '2% on Sales', icon: '🛒', color: 'plan', desc: 'Platform takes 2% of every sale' },
                                        { id: 'sa-pm-ad', name: '2% on Ad Spend', icon: '📢', color: 'plan', desc: 'Platform takes 2% of total ad spend managed' },
                                        { id: 'sa-pm-no-monthly', name: 'Zero Monthly Fee', icon: '🆓', color: 'plan', desc: 'No fixed monthly charges at all' },
                                        { id: 'sa-pm-e3', name: 'Commission Tracking', icon: '⚠️', color: 'edge', edge: 'Transparent dashboard showing commission breakup' },
                                        { id: 'sa-pm-e4', name: 'Dispute on Commission', icon: '⚠️', color: 'edge', edge: 'Seller disputes commission %, resolution flow' }
                                    ]
                                },
                                {
                                    id: 'sa-pm-services', name: 'Platform Provides', icon: '🛠️', color: 'plan',
                                    desc: 'Everything managed by platform team',
                                    children: [
                                        { id: 'sa-pm-website', name: 'AI Website Built', icon: '🌐', color: 'plan', desc: 'Platform builds full website using AI Website Builder' },
                                        { id: 'sa-pm-catalogue', name: 'AI Catalogue Built', icon: '📦', color: 'plan', desc: 'Platform creates full product catalogue via AI' },
                                        { id: 'sa-pm-ads', name: 'Ad Management', icon: '📢', color: 'plan', desc: 'Platform runs Google/Meta/Instagram ads for seller' },
                                        { id: 'sa-pm-courier', name: 'Courier Aggregation', icon: '🚚', color: 'shipping', desc: 'Multiple courier partners (Delhivery, DTDC, BlueDart) — 50-60% margin on shipping charges' },
                                        { id: 'sa-pm-account', name: 'Seller Account Mgmt', icon: '👤', color: 'plan', desc: 'Platform manages seller dashboard, orders, inventory' },
                                        { id: 'sa-pm-seo', name: 'SEO Management', icon: '🔍', color: 'plan', desc: 'Platform handles all SEO optimization' },
                                        { id: 'sa-pm-social', name: 'Social Media Mgmt', icon: '📱', color: 'plan', desc: 'Platform manages social media presence' },
                                        { id: 'sa-pm-e5', name: 'Quality Issues', icon: '⚠️', color: 'edge', edge: 'Seller unhappy with AI-built catalogue/website, revision flow' },
                                        { id: 'sa-pm-e6', name: 'Ad ROI Low', icon: '⚠️', color: 'edge', edge: 'Low ad returns, seller wants to stop, refund policy' }
                                    ]
                                },
                                {
                                    id: 'sa-pm-lifecycle', name: 'Plan Lifecycle', icon: '🔄', color: 'plan',
                                    desc: 'After month 1, seller has options',
                                    children: [
                                        { id: 'sa-pm-continue', name: 'Continue Managed', icon: '✅', color: 'plan', desc: 'Keep managed plan, continue ad spend, 2% commission' },
                                        { id: 'sa-pm-switch', name: 'Switch to Self-Managed', icon: '🔄', color: 'plan', desc: 'Move to any monthly plan (Free/₹300/₹1K/₹6K)' },
                                        { id: 'sa-pm-pause', name: 'Pause/Stop', icon: '⏸️', color: 'plan', desc: 'Pause managed services, keep store active' },
                                        { id: 'sa-pm-increase', name: 'Increase Ad Spend', icon: '📈', color: 'plan', desc: 'Seller wants to scale, increase ad budget' },
                                        { id: 'sa-pm-e7', name: 'Switch Data Transfer', icon: '⚠️', color: 'edge', edge: 'When switching to self-managed, transfer all access to seller' },
                                        { id: 'sa-pm-e8', name: 'Mid-month Switch', icon: '⚠️', color: 'edge', edge: 'Prorated commission for partial month on managed plan' },
                                        { id: 'sa-pm-e9', name: 'Inactive Seller', icon: '⚠️', color: 'edge', edge: 'Seller doesnt respond for 30 days, pause ads, notify' }
                                    ]
                                }
                            ]
                        },
                        // ── COMMON PLAN FEATURES ──
                        {
                            id: 'sa-p-common', name: 'Common Features', icon: '⚙️', color: 'plan',
                            desc: 'Shared plan management features',
                            children: [
                                { id: 'sa-pc-flags', name: 'Feature Flags', icon: '🚩', color: 'plan', desc: 'Per-plan: wallet, subscription, domain, app, AI, max_products, max_staff' },
                                { id: 'sa-pc-billing', name: 'Billing & Invoicing', icon: '🧾', color: 'plan', desc: 'Auto-invoice, payment reminders, GST on plan fees' },
                                { id: 'sa-pc-upgrade', name: 'Upgrade/Downgrade', icon: '🔄', color: 'plan', desc: 'Switch between plans with prorating' },
                                { id: 'sa-pc-trial', name: 'Trial Period', icon: '⏰', color: 'plan', desc: '14-day free trial of Basic plan' },
                                { id: 'sa-pc-compare', name: 'Plan Comparison Page', icon: '📊', color: 'plan', desc: 'Public pricing page with feature comparison table' },
                                { id: 'sa-pc-e1', name: 'Plan Expiry', icon: '⚠️', color: 'edge', edge: 'Grace period 7 days, auto-downgrade to free' },
                                { id: 'sa-pc-e2', name: 'Mid-cycle Change', icon: '⚠️', color: 'edge', edge: 'Prorated billing calculation for plan switches' },
                                { id: 'sa-pc-e3', name: 'Payment Failed', icon: '⚠️', color: 'edge', edge: 'Monthly payment fails, retry 3x, then downgrade' },
                                { id: 'sa-pc-e4', name: 'Commission Calculation', icon: '⚠️', color: 'edge', edge: 'Edge: COD order cancelled, refund commission or not?' }
                            ]
                        }
                    ]
                },
                {
                    id: 'sa-roles', name: 'Role Management', icon: '🛡️', color: 'superadmin',
                    desc: 'Create admin roles & permissions',
                    children: [
                        { id: 'sa-r-create', name: 'Create Roles', icon: '➕', color: 'superadmin', desc: 'Support, Finance, Ops, Marketing, Custom' },
                        { id: 'sa-r-perms', name: 'Permission Matrix', icon: '🔐', color: 'superadmin', desc: 'Read/Write/Delete per module' },
                        { id: 'sa-r-staff', name: 'Staff Accounts', icon: '👥', color: 'superadmin', desc: 'Create & deactivate admin staff' },
                        { id: 'sa-r-e1', name: 'Role Conflicts', icon: '⚠️', color: 'edge', edge: 'Permission inheritance & conflicts' }
                    ]
                },
                {
                    id: 'sa-settings', name: 'Global Settings', icon: '⚙️', color: 'superadmin',
                    desc: 'Platform-wide configurations',
                    children: [
                        { id: 'sa-g-commission', name: 'Commission %', icon: '💹', color: 'superadmin', desc: 'Platform cut on each sale' },
                        { id: 'sa-g-gateway', name: 'Payment Gateway', icon: '💳', color: 'superadmin', desc: 'Razorpay/Stripe master keys' },
                        { id: 'sa-g-templates', name: 'Email/SMS Templates', icon: '📧', color: 'superadmin', desc: 'Notification template editor' },
                        { id: 'sa-g-tax', name: 'Platform Tax Rules', icon: '📊', color: 'superadmin', desc: 'Default GST/tax configuration' },
                        { id: 'sa-g-locale', name: 'Currency & Locale', icon: '🌍', color: 'superadmin', desc: 'INR default, locale settings' },
                        { id: 'sa-g-e1', name: 'Multi-currency', icon: '⚠️', color: 'edge', edge: 'Currency conversion, country rules' }
                    ]
                },
                {
                    id: 'sa-analytics', name: 'Analytics & Reports', icon: '📊', color: 'analytics',
                    desc: 'Platform-wide metrics',
                    children: [
                        { id: 'sa-a-gmv', name: 'Total GMV', icon: '💰', color: 'analytics', desc: 'Gross Merchandise Value' },
                        { id: 'sa-a-sellers', name: 'Active Sellers', icon: '📈', color: 'analytics', desc: 'Seller count & growth' },
                        { id: 'sa-a-customers', name: 'Active Customers', icon: '📈', color: 'analytics', desc: 'Customer count across stores' },
                        { id: 'sa-a-revenue', name: 'Revenue Reports', icon: '📊', color: 'analytics', desc: 'Daily/weekly/monthly breakdown' },
                        { id: 'sa-a-churn', name: 'Churn Analysis', icon: '📉', color: 'analytics', desc: 'Sellers/customers leaving' },
                        { id: 'sa-a-top', name: 'Top Stores', icon: '🏆', color: 'analytics', desc: 'By GMV, orders, growth' },
                        { id: 'sa-a-e1', name: 'Data Export', icon: '⚠️', color: 'edge', edge: 'CSV/PDF export, scheduled reports' }
                    ]
                },
                {
                    id: 'sa-logs', name: 'Activity Logs', icon: '📝', color: 'analytics',
                    desc: 'Admin audit trail',
                    children: [
                        { id: 'sa-l-trail', name: 'Action Audit Trail', icon: '📋', color: 'analytics', desc: 'Who did what, when' },
                        { id: 'sa-l-filter', name: 'Filters', icon: '🔍', color: 'analytics', desc: 'By admin, date, action type' },
                        { id: 'sa-l-e1', name: 'Log Retention', icon: '⚠️', color: 'edge', edge: 'Retention policy, GDPR compliance' }
                    ]
                }
            ]
        },
        // ── SUPPORT ADMIN ──────────────────────────────────────
        {
            id: 'pa-sup', name: 'SUPPORT ADMIN', icon: '🛡️', color: 'admin',
            desc: 'role=SUPPORT_ADMIN',
            children: [
                {
                    id: 'sup-tickets', name: 'Customer Issues', icon: '🎫', color: 'admin',
                    desc: 'Ticket management system',
                    children: [
                        { id: 'sup-t-status', name: 'Ticket States', icon: '📋', color: 'admin', desc: 'Open → In-progress → Resolved → Escalated' },
                        { id: 'sup-t-chat', name: 'Chat/Email Integration', icon: '💬', color: 'admin', desc: 'Customer communication' },
                        { id: 'sup-t-e1', name: 'SLA Tracking', icon: '⚠️', color: 'edge', edge: 'Auto-escalation on SLA breach' }
                    ]
                },
                {
                    id: 'sup-disputes', name: 'Dispute Resolution', icon: '⚖️', color: 'admin',
                    children: [
                        { id: 'sup-d-refund', name: 'Refund Requests', icon: '💸', color: 'admin', desc: 'Review & approve refunds' },
                        { id: 'sup-d-mediate', name: 'Seller-Customer Mediation', icon: '🤝', color: 'admin', desc: 'Middleman resolution' },
                        { id: 'sup-d-e1', name: 'Chargebacks', icon: '⚠️', color: 'edge', edge: 'Chargeback handling, fraud flags' }
                    ]
                },
                {
                    id: 'sup-orders', name: 'Order View (Read-only)', icon: '👁️', color: 'admin',
                    children: [
                        { id: 'sup-o-search', name: 'Search Orders', icon: '🔍', color: 'admin', desc: 'By order#, customer, store' },
                        { id: 'sup-o-e1', name: 'Data Masking', icon: '⚠️', color: 'edge', edge: 'PII masking for support staff' }
                    ]
                }
            ]
        },
        // ── FINANCE ADMIN ──────────────────────────────────────
        {
            id: 'pa-fin', name: 'FINANCE ADMIN', icon: '💹', color: 'admin',
            desc: 'role=FINANCE_ADMIN',
            children: [
                {
                    id: 'fin-txns', name: 'Transactions', icon: '💳', color: 'admin',
                    children: [
                        { id: 'fin-t-all', name: 'All Transactions', icon: '📋', color: 'admin', desc: 'UPI, Card, Wallet, COD, Netbanking' },
                        { id: 'fin-t-status', name: 'Transaction Status', icon: '🔄', color: 'admin', desc: 'Success / Failed / Pending / Refunded' },
                        { id: 'fin-t-e1', name: 'Partial Refunds', icon: '⚠️', color: 'edge', edge: 'Partial refund, double-debit recovery' }
                    ]
                },
                {
                    id: 'fin-payouts', name: 'Seller Payouts', icon: '💸', color: 'admin',
                    children: [
                        { id: 'fin-p-cycle', name: 'Payout Cycle', icon: '📅', color: 'admin', desc: 'Weekly / biweekly / monthly config' },
                        { id: 'fin-p-commission', name: 'Commission Deduction', icon: '📊', color: 'admin', desc: 'Auto-calculate platform cut' },
                        { id: 'fin-p-utr', name: 'UTR Tracking', icon: '🏦', color: 'admin', desc: 'Bank transfer reference number' },
                        { id: 'fin-p-e1', name: 'Failed Payouts', icon: '⚠️', color: 'edge', edge: 'Bank validation, payout holds' }
                    ]
                },
                {
                    id: 'fin-refunds', name: 'Refund Processing', icon: '↩️', color: 'admin',
                    children: [
                        { id: 'fin-r-auto', name: 'Auto Refunds', icon: '🤖', color: 'admin', desc: 'Gateway callback triggered' },
                        { id: 'fin-r-manual', name: 'Manual Approval', icon: '✋', color: 'admin', desc: 'Admin review required' },
                        { id: 'fin-r-method', name: 'Refund Destination', icon: '🎯', color: 'admin', desc: 'To wallet or original payment' },
                        { id: 'fin-r-e1', name: 'Window Expired', icon: '⚠️', color: 'edge', edge: 'Refund window gone, partial return' }
                    ]
                },
                {
                    id: 'fin-gst', name: 'GST Reports', icon: '📊', color: 'admin',
                    children: [
                        { id: 'fin-g-r1', name: 'GSTR-1 / GSTR-3B', icon: '📄', color: 'admin', desc: 'Auto-generated GST returns' },
                        { id: 'fin-g-store', name: 'Store-wise Tax', icon: '🏪', color: 'admin', desc: 'Per-store tax summaries' },
                        { id: 'fin-g-e1', name: 'IGST/CGST/SGST', icon: '⚠️', color: 'edge', edge: 'Inter-state vs intra-state tax' }
                    ]
                },
                {
                    id: 'fin-statements', name: 'Financial Statements', icon: '📊', color: 'admin',
                    children: [
                        { id: 'fin-s-dl', name: 'Download CSV/PDF', icon: '📥', color: 'admin', desc: 'Export reports' },
                        { id: 'fin-s-e1', name: 'Reconciliation', icon: '⚠️', color: 'edge', edge: 'Mismatch detection between gateway & DB' }
                    ]
                }
            ]
        },
        // ── OPERATIONS ADMIN ──────────────────────────────────
        {
            id: 'pa-ops', name: 'OPERATIONS ADMIN', icon: '⚙️', color: 'admin',
            desc: 'role=OPERATIONS_ADMIN',
            children: [
                {
                    id: 'ops-onboard', name: 'Seller Onboarding', icon: '📋', color: 'admin',
                    children: [
                        { id: 'ops-ob-check', name: 'Onboarding Checklist', icon: '✅', color: 'admin', desc: 'Step-by-step progress tracking' },
                        { id: 'ops-ob-docs', name: 'Document Queue', icon: '📄', color: 'admin', desc: 'Pending verifications' },
                        { id: 'ops-ob-e1', name: 'Timeout Rejection', icon: '⚠️', color: 'edge', edge: 'Auto-reject after N days incomplete' }
                    ]
                },
                {
                    id: 'ops-kyc', name: 'KYC Verification', icon: '🔐', color: 'admin',
                    children: [
                        { id: 'ops-k-gst', name: 'GST API Check', icon: '📡', color: 'admin', desc: 'Live GST verification' },
                        { id: 'ops-k-pan', name: 'PAN Verify', icon: '📄', color: 'admin', desc: 'NSDL PAN check' },
                        { id: 'ops-k-bank', name: 'Penny Drop Test', icon: '🏦', color: 'admin', desc: '₹1 test deposit for bank verify' },
                        { id: 'ops-k-e1', name: 'Fake Documents', icon: '⚠️', color: 'edge', edge: 'ML-based fake detection' }
                    ]
                },
                {
                    id: 'ops-health', name: 'Store Health', icon: '💚', color: 'admin',
                    children: [
                        { id: 'ops-h-fulfil', name: 'Fulfillment Rate', icon: '📊', color: 'admin', desc: '% of orders fulfilled on time' },
                        { id: 'ops-h-complaints', name: 'Complaint Rate', icon: '📉', color: 'admin', desc: 'Customer complaints per 100 orders' },
                        { id: 'ops-h-delivery', name: 'Avg Delivery Time', icon: '⏱️', color: 'admin', desc: 'Days from order to delivery' },
                        { id: 'ops-h-e1', name: 'Auto-Suspend', icon: '⚠️', color: 'edge', edge: 'Suspend on health threshold breach' }
                    ]
                },
                {
                    id: 'ops-suspend', name: 'Suspension Management', icon: '🚫', color: 'admin',
                    children: [
                        { id: 'ops-su-temp', name: 'Temporary Suspend', icon: '⏸️', color: 'admin', desc: 'With reason, duration' },
                        { id: 'ops-su-ban', name: 'Permanent Ban', icon: '❌', color: 'admin', desc: 'Delete/archive store' },
                        { id: 'ops-su-appeal', name: 'Appeal Process', icon: '📝', color: 'admin', desc: 'Seller appeal flow' },
                        { id: 'ops-su-e1', name: 'Post-Ban Data', icon: '⚠️', color: 'edge', edge: 'Data retention, customer order migration' }
                    ]
                }
            ]
        },
        // ── MARKETING ADMIN ──────────────────────────────────
        {
            id: 'pa-mkt', name: 'MARKETING ADMIN', icon: '📣', color: 'admin',
            desc: 'role=MARKETING_ADMIN',
            children: [
                {
                    id: 'mkt-banners', name: 'Platform Banners', icon: '🖼️', color: 'admin',
                    children: [
                        { id: 'mkt-b-home', name: 'Homepage Banners', icon: '🏠', color: 'admin', desc: 'Priority sorting, scheduling' },
                        { id: 'mkt-b-cat', name: 'Category Banners', icon: '📂', color: 'admin', desc: 'Category-specific promotions' },
                        { id: 'mkt-b-schedule', name: 'Scheduling', icon: '📅', color: 'admin', desc: 'Start/end dates, auto-publish' },
                        { id: 'mkt-b-e1', name: 'A/B Testing', icon: '⚠️', color: 'edge', edge: 'Banner variant testing, analytics' }
                    ]
                },
                {
                    id: 'mkt-featured', name: 'Featured Sellers', icon: '⭐', color: 'admin',
                    children: [
                        { id: 'mkt-f-manual', name: 'Manual Selection', icon: '✋', color: 'admin', desc: 'Admin picks featured stores' },
                        { id: 'mkt-f-auto', name: 'Auto by GMV', icon: '🤖', color: 'admin', desc: 'Top performers auto-featured' },
                        { id: 'mkt-f-e1', name: 'Fair Rotation', icon: '⚠️', color: 'edge', edge: 'Prevent monopoly, opt-out support' }
                    ]
                },
                {
                    id: 'mkt-campaigns', name: 'Promo Campaigns', icon: '📢', color: 'admin',
                    children: [
                        { id: 'mkt-c-codes', name: 'Platform Coupons', icon: '🎁', color: 'admin', desc: 'Platform-wide discount codes' },
                        { id: 'mkt-c-push', name: 'Push Notifications', icon: '🔔', color: 'admin', desc: 'Mass push to all users' },
                        { id: 'mkt-c-email', name: 'Email Campaigns', icon: '📧', color: 'admin', desc: 'Bulk email marketing' },
                        { id: 'mkt-c-e1', name: 'Budget Limits', icon: '⚠️', color: 'edge', edge: 'Campaign spend capping, duplicate redemption' }
                    ]
                }
            ]
        },
        // ── SELLER ──────────────────────────────────────────────
        {
            id: 'seller', name: 'SELLER', icon: '🏪', color: 'seller',
            desc: 'Store owner • status: PENDING→ACTIVE',
            children: [
                {
                    id: 'se-reg', name: 'Registration & KYC', icon: '📝', color: 'seller',
                    children: [
                        { id: 'se-r-signup', name: 'Email/Phone Signup', icon: '📧', color: 'seller', desc: 'Registration form' },
                        { id: 'se-r-biz', name: 'Business Info', icon: '🏢', color: 'seller', desc: 'Business name, type, address' },
                        { id: 'se-r-docs', name: 'Document Upload', icon: '📄', color: 'seller', desc: 'GST cert, PAN, bank proof' },
                        { id: 'se-r-e1', name: 'Duplicate Detection', icon: '⚠️', color: 'edge', edge: 'Same email/GST/PAN check' }
                    ]
                },
                {
                    id: 'se-staff', name: 'Staff Management', icon: '👥', color: 'sellerSub',
                    children: [
                        { id: 'se-st-roles', name: 'Staff Roles', icon: '🛡️', color: 'sellerSub', desc: 'Manager, Order Handler, Inventory, Support' },
                        { id: 'se-st-perms', name: 'Permission Overrides', icon: '🔐', color: 'sellerSub', desc: 'JSON fine-grained permissions' },
                        { id: 'se-st-limit', name: 'Max Staff Limit', icon: '📊', color: 'sellerSub', desc: 'Per plan restriction' },
                        { id: 'se-st-e1', name: 'Staff Deactivation', icon: '⚠️', color: 'edge', edge: 'Activity logs per staff member' }
                    ]
                },
                {
                    id: 'se-payout', name: 'Payouts', icon: '💸', color: 'sellerSub',
                    children: [
                        { id: 'se-pay-dash', name: 'Payout Dashboard', icon: '📊', color: 'sellerSub', desc: 'Earnings overview' },
                        { id: 'se-pay-bank', name: 'Bank Account Mgmt', icon: '🏦', color: 'sellerSub', desc: 'Add/edit bank details' },
                        { id: 'se-pay-hist', name: 'Payout History', icon: '📋', color: 'sellerSub', desc: 'UTR numbers, amounts, dates' },
                        { id: 'se-pay-e1', name: 'Bank Change Verify', icon: '⚠️', color: 'edge', edge: 'Re-verify on bank change' }
                    ]
                },
                { id: 'se-store', name: 'Store →', icon: '🏬', color: 'store', desc: 'Expands to Store module' },
                {
                    id: 'se-onboard', name: 'Onboarding Wizard', icon: '🧙', color: 'seller',
                    desc: 'Guided first-time setup experience',
                    children: [
                        { id: 'se-ob-welcome', name: 'Welcome Screen', icon: '👋', color: 'seller', desc: 'Introduction, setup overview, estimated time' },
                        { id: 'se-ob-store', name: 'Store Setup', icon: '🏪', color: 'store', desc: 'Name, category, logo — wizard step 1' },
                        { id: 'se-ob-product', name: 'First Product', icon: '📦', color: 'product', desc: 'Add first product with AI assist — step 2' },
                        { id: 'se-ob-payment', name: 'Payment Setup', icon: '💳', color: 'order', desc: 'Connect Razorpay/bank account — step 3' },
                        { id: 'se-ob-shipping', name: 'Shipping Config', icon: '🚚', color: 'shipping', desc: 'Set delivery zones & rates — step 4' },
                        { id: 'se-ob-launch', name: 'Go Live!', icon: '🚀', color: 'seller', desc: 'Final review & publish store' },
                        { id: 'se-ob-progress', name: 'Progress Tracker', icon: '📊', color: 'seller', desc: 'Checklist widget on dashboard until all steps done' },
                        { id: 'se-ob-e1', name: 'Abandoned Onboarding', icon: '⚠️', color: 'edge', edge: 'Seller drops off mid-setup — reminder email/WhatsApp after 24h' }
                    ]
                }
            ]
        },
        // ── STORE ──────────────────────────────────────────────
        {
            id: 'store', name: 'STORE', icon: '🏬', color: 'store',
            desc: 'Seller\'s online shop',
            children: [
                {
                    id: 'st-identity', name: 'Store Identity', icon: '🪪', color: 'store',
                    children: [
                        { id: 'st-id-name', name: 'Name & Slug', icon: '📝', color: 'store', desc: 'Unique URL slug per store' },
                        { id: 'st-id-logo', name: 'Logo & Banner', icon: '🖼️', color: 'store', desc: 'Upload branding images' },
                        { id: 'st-id-domain', name: 'Custom Domain', icon: '🌐', color: 'store', desc: 'DNS mapping & SSL' },
                        { id: 'st-id-e1', name: 'Slug Collision', icon: '⚠️', color: 'edge', edge: 'Duplicate slug prevention' },
                        { id: 'st-id-e2', name: 'SSL Provisioning', icon: '⚠️', color: 'edge', edge: 'Let\'s Encrypt auto-setup' }
                    ]
                },
                {
                    id: 'st-theme', name: 'Theme & Design', icon: '🎨', color: 'store',
                    children: [
                        { id: 'st-th-gallery', name: 'Theme Gallery', icon: '🖼️', color: 'store', desc: 'Pre-built themes' },
                        { id: 'st-th-color', name: 'Color Picker', icon: '🎨', color: 'store', desc: 'Primary brand color' },
                        { id: 'st-th-e1', name: 'Custom CSS', icon: '⚠️', color: 'edge', edge: 'Pro plan only, injection sandbox' }
                    ]
                },
                {
                    id: 'st-settings', name: 'Store Settings', icon: '⚙️', color: 'storeCfg',
                    children: [
                        { id: 'st-set-pay', name: 'Payment Gateway', icon: '💳', color: 'storeCfg', desc: 'Razorpay API keys' },
                        { id: 'st-set-payment-mode', name: 'Payment Mode Config', icon: '💵', color: 'storeCfg', desc: 'Only Online / Only COD / Online + COD — fully customizable payment filters' },
                        { id: 'st-set-gst', name: 'GST Config', icon: '📊', color: 'storeCfg', desc: 'Tax rate, HSN codes' },
                        { id: 'st-set-notif', name: 'Notification Channels', icon: '🔔', color: 'storeCfg', desc: 'WhatsApp, Email, SMS config' },
                        { id: 'st-set-firebase', name: 'Firebase Config', icon: '🔥', color: 'storeCfg', desc: 'Push notification setup' },
                        { id: 'st-set-fb', name: 'Facebook App ID', icon: '📘', color: 'storeCfg', desc: 'Social login & pixel' },
                        { id: 'st-set-contact', name: 'Contact Details Update', icon: '📞', color: 'storeCfg', desc: 'Seller updates phone, email, address — no developer dependency' },
                        { id: 'st-set-shop-toggle', name: 'Shop Open / Close', icon: '🏪', color: 'storeCfg', desc: 'One-click store open/temporarily close — auto-control for non-working hours' },
                        { id: 'st-set-e1', name: 'Gateway Failover', icon: '⚠️', color: 'edge', edge: 'Test mode vs live mode switching' }
                    ]
                },
                { id: 'st-products', name: 'Products →', icon: '📦', color: 'product', desc: 'Product catalog management' },
                {
                    id: 'st-services', name: 'Services →', icon: '🛠️', color: 'service',
                    desc: 'Service listings & bookings',
                    children: [
                        { id: 'sv-details', name: 'Service Details', icon: '📝', color: 'service', desc: 'Name, description, duration, price' },
                        { id: 'sv-booking', name: 'Booking Flow', icon: '📅', color: 'service', desc: 'Date/time picker, provider assignment' },
                        { id: 'sv-provider', name: 'Provider Assignment', icon: '👤', color: 'service', desc: 'Assign staff/provider for service' },
                        { id: 'sv-completion', name: 'Completion Confirm', icon: '✅', color: 'service', desc: 'Mark service as completed' },
                        { id: 'sv-recurring', name: 'Recurring Service', icon: '🔄', color: 'subscription', desc: 'Weekly/monthly recurring booking' },
                        { id: 'sv-e1', name: 'Cancellation Policy', icon: '⚠️', color: 'edge', edge: 'No-show handling, refund rules' },
                        { id: 'sv-e2', name: 'Reschedule', icon: '⚠️', color: 'edge', edge: 'Max reschedule count, buffer time' }
                    ]
                },
                {
                    id: 'st-categories', name: 'Categories →', icon: '📂', color: 'category',
                    desc: 'Nested category tree',
                    children: [
                        { id: 'cat-tree', name: 'Category Tree', icon: '🌳', color: 'category', desc: 'Parent → child nesting (max 3 levels)' },
                        { id: 'cat-image', name: 'Category Image', icon: '🖼️', color: 'category', desc: 'Upload icon/image per category' },
                        { id: 'cat-sort', name: 'Sort Order', icon: '🔢', color: 'category', desc: 'Drag-drop reorder, priority number' },
                        { id: 'cat-count', name: 'Product Count', icon: '📊', color: 'category', desc: 'Auto-count products per category' },
                        { id: 'cat-seo', name: 'Category SEO', icon: '🔍', color: 'category', desc: 'Meta title, description per category' },
                        { id: 'cat-e1', name: 'Delete with Products', icon: '⚠️', color: 'edge', edge: 'Re-assign products or block deletion' },
                        { id: 'cat-e2', name: 'Circular Parent', icon: '⚠️', color: 'edge', edge: 'Prevent A→B→A parent loop' }
                    ]
                },
                { id: 'st-orders', name: 'Orders →', icon: '📦', color: 'order', desc: 'Order management' },
                { id: 'st-wallet', name: 'Wallet (if enabled)', icon: '💰', color: 'wallet', desc: 'Customer wallet feature' },
                { id: 'st-subs', name: 'Subscriptions (if enabled)', icon: '🔄', color: 'subscription', desc: 'Recurring delivery plans' },
                { id: 'st-coupons', name: 'Coupons & Offers →', icon: '🎁', color: 'coupon', desc: 'Discount management' },
                { id: 'st-shipping', name: 'Shipping →', icon: '🚚', color: 'shipping', desc: 'Shipping rules & rates' },
                { id: 'st-website', name: 'Website Builder →', icon: '🌐', color: 'widget', desc: 'Page & widget editor' },
                { id: 'st-comm', name: 'Communication →', icon: '📣', color: 'comm', desc: 'Customer messaging' },
                { id: 'st-app', name: 'App Builder →', icon: '📱', color: 'app', desc: 'Mobile app generation' },
                { id: 'st-plugins', name: 'Plugin Store →', icon: '🔌', color: 'plugin', desc: 'Extensions & integrations' },
                {
                    id: 'st-analytics', name: 'Store Analytics', icon: '📊', color: 'analytics',
                    desc: 'Sales & traffic reports',
                    children: [
                        { id: 'sta-sales', name: 'Sales Dashboard', icon: '💰', color: 'analytics', desc: 'Today / week / month revenue, order count' },
                        { id: 'sta-top', name: 'Top Products', icon: '🏆', color: 'analytics', desc: 'Best sellers by revenue & quantity' },
                        { id: 'sta-funnel', name: 'Conversion Funnel', icon: '📉', color: 'analytics', desc: 'Visits → Cart → Checkout → Order' },
                        { id: 'sta-traffic', name: 'Traffic Sources', icon: '🌐', color: 'analytics', desc: 'Direct, social, search, referral' },
                        { id: 'sta-geo', name: 'Geographic Heatmap', icon: '🗺️', color: 'analytics', desc: 'Orders by city / state / pincode' },
                        { id: 'sta-aov', name: 'Avg Order Value', icon: '📊', color: 'analytics', desc: 'AOV trends over time' },
                        { id: 'sta-customers', name: 'Customer Analytics', icon: '👥', color: 'analytics', desc: 'New vs returning, lifetime value' },
                        { id: 'sta-abandoned', name: 'Abandoned Cart Rate', icon: '🛒', color: 'analytics', desc: 'Cart abandonment % & reasons' },
                        { id: 'sta-e1', name: 'Data Delay', icon: '⚠️', color: 'edge', edge: 'Analytics lag on high traffic, caching issues' }
                    ]
                }
            ]
        },
        // ── PRODUCTS ──────────────────────────────────────────
        {
            id: 'products', name: 'PRODUCTS', icon: '📦', color: 'product',
            desc: 'Product catalog system',
            children: [
                {
                    id: 'pr-types', name: 'Product Types', icon: '📋', color: 'product',
                    children: [
                        { id: 'pr-ty-physical', name: 'Physical Product', icon: '📦', color: 'product', desc: 'With inventory tracking' },
                        { id: 'pr-ty-digital', name: 'Digital Product', icon: '💾', color: 'product', desc: 'Download link delivery' },
                        { id: 'pr-ty-service', name: 'Service-linked', icon: '🛠️', color: 'product', desc: 'Linked to service model' },
                        { id: 'pr-ty-scheduled', name: 'Scheduled Publish', icon: '📅', color: 'product', desc: 'Schedule product to go live at a future date/time' },
                        { id: 'pr-ty-labels', name: 'Product Labels / Tags', icon: '🏷️', color: 'product', desc: 'New, Bestseller, Trending, Limited Edition, Organic — visual badges on cards' },
                        { id: 'pr-ty-e1', name: 'Type Change', icon: '⚠️', color: 'edge', edge: 'Switching type after orders exist' },
                        { id: 'pr-ty-e2', name: 'Digital Piracy', icon: '⚠️', color: 'edge', edge: 'Download link sharing, DRM protection' }
                    ]
                },
                {
                    id: 'pr-details', name: 'Product Details', icon: '📝', color: 'product',
                    children: [
                        { id: 'pr-d-name', name: 'Name, Slug, Description', icon: '📝', color: 'product', desc: 'Rich text editor' },
                        { id: 'pr-d-price', name: 'Pricing', icon: '💰', color: 'product', desc: 'Base price + strikethrough price' },
                        { id: 'pr-d-gst', name: 'Custom GST Pricing', icon: '📊', color: 'product', desc: 'Per-product custom GST rate & pricing — flexible tax management' },
                        { id: 'pr-d-sku', name: 'SKU Code', icon: '🏷️', color: 'product', desc: 'Unique stock keeping unit' },
                        { id: 'pr-d-seo', name: 'SEO Meta', icon: '🔍', color: 'product', desc: 'Title, description, tags' },
                        { id: 'pr-d-qty-limit', name: 'Purchase Qty Limit', icon: '🔒', color: 'product', desc: 'Max purchase quantity per customer per product (for offers/promotions)' },
                        { id: 'pr-d-keywords', name: 'Custom Search Keywords', icon: '🔤', color: 'product', desc: 'Seller-defined keywords per product for improved search accuracy' },
                        { id: 'pr-d-e1', name: 'Duplicate SKU', icon: '⚠️', color: 'edge', edge: 'Unique SKU enforcement' }
                    ]
                },
                {
                    id: 'pr-variants', name: 'Variants', icon: '🔀', color: 'productSub',
                    children: [
                        { id: 'pr-v-size', name: 'Size Variants', icon: '📏', color: 'productSub', desc: '50g, 100g, 250g, 500g, 1kg' },
                        { id: 'pr-v-color', name: 'Color/Flavor', icon: '🎨', color: 'productSub', desc: 'Multiple attributes' },
                        { id: 'pr-v-price', name: 'Per-variant Price', icon: '💰', color: 'productSub', desc: 'Different price per variant' },
                        { id: 'pr-v-stock', name: 'Per-variant Stock', icon: '📊', color: 'productSub', desc: 'Independent inventory' },
                        { id: 'pr-v-img', name: 'Per-variant Image', icon: '🖼️', color: 'productSub', desc: 'Specific images' },
                        { id: 'pr-v-e1', name: 'Combo Limits', icon: '⚠️', color: 'edge', edge: 'Max variant combinations' }
                    ]
                },
                {
                    id: 'pr-inventory', name: 'Inventory', icon: '📊', color: 'product',
                    children: [
                        { id: 'pr-i-track', name: 'Stock Tracking', icon: '📈', color: 'product', desc: 'Auto-decrement on order' },
                        { id: 'pr-i-alert', name: 'Low Stock Alerts', icon: '🔔', color: 'product', desc: 'Email/WhatsApp notification' },
                        { id: 'pr-i-oos', name: 'Out-of-Stock Behavior', icon: '🚫', color: 'product', desc: 'Hide or show as "coming soon"' },
                        { id: 'pr-i-warehouse', name: 'Multi-warehouse', icon: '🏢', color: 'product', desc: 'Stock split across locations, auto-route nearest' },
                        { id: 'pr-i-reorder', name: 'Auto-reorder Point', icon: '🔄', color: 'product', desc: 'Alert seller to restock when qty < threshold' },
                        { id: 'pr-i-forecast', name: 'AI Inventory Forecast', icon: '🔮', color: 'product', desc: 'AI-based demand prediction, seasonal patterns, smart restock suggestions' },
                        { id: 'pr-i-preorder', name: 'Pre-order / Waitlist', icon: '📋', color: 'product', desc: 'Accept pre-orders for out-of-stock or upcoming products, "Notify Me" button' },
                        { id: 'pr-i-omni', name: 'Omnichannel Stock Sync', icon: '🔄', color: 'product', desc: 'Single inventory for online + offline — real-time sync across POS & website' },
                        { id: 'pr-i-e1', name: 'Race Condition', icon: '⚠️', color: 'edge', edge: 'Concurrent order stock sync' },
                        { id: 'pr-i-e2', name: 'Overselling', icon: '⚠️', color: 'edge', edge: 'Sold more than available, auto-cancel or backorder' },
                        { id: 'pr-i-e3', name: 'Forecast Inaccuracy', icon: '⚠️', color: 'edge', edge: 'AI prediction wrong due to market shift, manual override needed' },
                        { id: 'pr-i-e4', name: 'Online-Offline Sync Delay', icon: '⚠️', color: 'edge', edge: 'Offline sale not synced due to no internet — queue & retry when online' }
                    ]
                },
                {
                    id: 'pr-images', name: 'Images & Media', icon: '🖼️', color: 'productSub',
                    children: [
                        { id: 'pr-im-multi', name: 'Multiple Images', icon: '🖼️', color: 'productSub', desc: 'Sortable gallery' },
                        { id: 'pr-im-alt', name: 'Alt Text', icon: '📝', color: 'productSub', desc: 'SEO accessibility text' },
                        { id: 'pr-im-cdn', name: 'CDN Delivery', icon: '🌐', color: 'productSub', desc: 'Compressed, cached images' },
                        { id: 'pr-im-e1', name: 'File Validation', icon: '⚠️', color: 'edge', edge: 'Max size, format check (JPG/PNG/WebP)' }
                    ]
                },
                {
                    id: 'pr-bulk', name: 'Bulk Operations', icon: '📦', color: 'product',
                    children: [
                        { id: 'pr-b-import', name: 'CSV Import', icon: '📥', color: 'product', desc: 'Bulk product upload' },
                        { id: 'pr-b-export', name: 'CSV Export', icon: '📤', color: 'product', desc: 'Download catalog' },
                        { id: 'pr-b-price', name: 'Bulk Price Update', icon: '💰', color: 'product', desc: 'Mass price changes' },
                        { id: 'pr-b-stock', name: 'Bulk Stock Update', icon: '📊', color: 'product', desc: 'Update multiple products stock at once — time-saving inventory management' },
                        { id: 'pr-b-e1', name: 'Import Errors', icon: '⚠️', color: 'edge', edge: 'Validation errors, rollback' }
                    ]
                },
                {
                    id: 'pr-reviews', name: 'Reviews & Ratings', icon: '⭐', color: 'productSub',
                    children: [
                        { id: 'pr-rv-submit', name: 'Customer Reviews', icon: '📝', color: 'productSub', desc: 'Rating + text review' },
                        { id: 'pr-rv-photo', name: 'Photo Reviews', icon: '📷', color: 'productSub', desc: 'Upload images with review' },
                        { id: 'pr-rv-video', name: 'Video Reviews', icon: '🎥', color: 'productSub', desc: 'Short video testimonials' },
                        { id: 'pr-rv-approve', name: 'Admin Approval', icon: '✅', color: 'productSub', desc: 'Review moderation queue' },
                        { id: 'pr-rv-avg', name: 'Rating Aggregation', icon: '📊', color: 'productSub', desc: 'Average star calculation' },
                        { id: 'pr-rv-verified', name: 'Verified Purchase', icon: '✅', color: 'productSub', desc: 'Badge for buyers who actually purchased' },
                        { id: 'pr-rv-reply', name: 'Seller Reply', icon: '💬', color: 'productSub', desc: 'Seller responds to reviews publicly' },
                        { id: 'pr-rv-helpful', name: 'Helpful Vote', icon: '👍', color: 'productSub', desc: 'Other customers vote review helpful' },
                        { id: 'pr-rv-incentive', name: 'Review Incentive', icon: '🎁', color: 'coupon', desc: 'Coupon/points for writing review' },
                        { id: 'pr-rv-e1', name: 'Fake Reviews', icon: '⚠️', color: 'edge', edge: 'Detection & auto-flag' },
                        { id: 'pr-rv-e2', name: 'Offensive Content', icon: '⚠️', color: 'edge', edge: 'Profanity filter, AI moderation' },
                        { id: 'pr-rv-e3', name: 'Review for Wrong Product', icon: '⚠️', color: 'edge', edge: 'Customer reviews wrong item, reassign' }
                    ]
                }
            ]
        },
        // ── CUSTOMER ──────────────────────────────────────────
        {
            id: 'customer', name: 'CUSTOMER', icon: '👤', color: 'customer',
            desc: 'Store-specific end user',
            children: [
                {
                    id: 'cu-reg', name: 'Registration', icon: '📝', color: 'customer',
                    children: [
                        { id: 'cu-r-otp', name: 'Phone OTP Login', icon: '📱', color: 'customer', desc: 'Primary for India' },
                        { id: 'cu-r-email', name: 'Email Signup', icon: '📧', color: 'customer', desc: 'Optional secondary' },
                        { id: 'cu-r-social', name: 'Social Login', icon: '🔗', color: 'customer', desc: 'Google, Facebook' },
                        { id: 'cu-r-pincode', name: 'Pincode Filter at Login', icon: '📍', color: 'customer', desc: 'Pincode verification at customer entry — only serviceable area customers get access' },
                        { id: 'cu-r-e1', name: 'Duplicate Phone', icon: '⚠️', color: 'edge', edge: 'Same phone, different store handling' },
                        { id: 'cu-r-e2', name: 'Invalid Pincode', icon: '⚠️', color: 'edge', edge: 'Customer pincode not serviceable — show message & block or redirect' }
                    ]
                },
                {
                    id: 'cu-profile', name: 'Profile', icon: '👤', color: 'customer',
                    children: [
                        { id: 'cu-p-info', name: 'Name, Avatar, Email', icon: '📝', color: 'customer', desc: 'Basic profile info' },
                        { id: 'cu-p-addr', name: 'Multiple Addresses', icon: '📍', color: 'customer', desc: 'Home, Office, etc.' },
                        { id: 'cu-p-default', name: 'Default Address', icon: '⭐', color: 'customer', desc: 'Pre-selected for checkout' },
                        { id: 'cu-p-e1', name: 'Address Validation', icon: '⚠️', color: 'edge', edge: 'Pincode serviceability check' }
                    ]
                },
                { id: 'cu-wallet', name: 'My Wallet →', icon: '💰', color: 'wallet', desc: 'Balance, topup, transactions' },
                { id: 'cu-cart', name: 'My Cart →', icon: '🛒', color: 'cart', desc: 'Cart items & checkout' },
                { id: 'cu-orders', name: 'My Orders →', icon: '📦', color: 'order', desc: 'Order history & tracking' },
                { id: 'cu-subs', name: 'My Subscriptions →', icon: '🔄', color: 'subscription', desc: 'Active plans' },
                { id: 'cu-recent', name: 'Recently Viewed', icon: '👁️', color: 'customer', desc: 'Browsing history — recently viewed products widget' },
                { id: 'cu-group-price', name: 'Customer Group Pricing', icon: '💰', color: 'customer', desc: 'Wholesale/B2B pricing, VIP customer special rates per group' },
                {
                    id: 'cu-loyalty', name: 'Loyalty Points', icon: '🏆', color: 'loyalty',
                    children: [
                        { id: 'cu-l-earn', name: 'Earning Rules', icon: '📈', color: 'loyalty', desc: 'Per order, referral, signup, review' },
                        { id: 'cu-l-redeem', name: 'Redemption', icon: '🎁', color: 'loyalty', desc: 'Discount at checkout' },
                        { id: 'cu-l-expiry', name: 'Points Expiry', icon: '⏰', color: 'loyalty', desc: 'Auto-expire after N days' },
                        { id: 'cu-l-tiers', name: 'Loyalty Tiers', icon: '💎', color: 'loyalty', desc: 'Bronze/Silver/Gold/Platinum based on spend' },
                        { id: 'cu-l-referral', name: 'Referral Rewards', icon: '🤝', color: 'loyalty', desc: 'Invite friend, both earn points' },
                        { id: 'cu-l-history', name: 'Points History', icon: '📋', color: 'loyalty', desc: 'Full earn/redeem transaction log' },
                        { id: 'cu-l-e1', name: 'Points Fraud', icon: '⚠️', color: 'edge', edge: 'Abuse detection, redeem limits' },
                        { id: 'cu-l-e2', name: 'Tier Downgrade', icon: '⚠️', color: 'edge', edge: 'Customer drops tier, lose benefits notification' }
                    ]
                }
            ]
        },
        // ── WALLET ──────────────────────────────────────────────
        {
            id: 'wallet', name: 'WALLET', icon: '💰', color: 'wallet',
            desc: 'Prepaid customer wallet',
            children: [
                {
                    id: 'wa-balance', name: 'Balance Management', icon: '💵', color: 'wallet',
                    children: [
                        { id: 'wa-b-current', name: 'Current Balance', icon: '💰', color: 'wallet', desc: 'Real-time display' },
                        { id: 'wa-b-cashback', name: 'Cashback Balance', icon: '🎁', color: 'wallet', desc: 'Separate cashback pool' },
                        { id: 'wa-b-e1', name: 'Negative Prevention', icon: '⚠️', color: 'edge', edge: 'Concurrent debit race condition' }
                    ]
                },
                {
                    id: 'wa-topup', name: 'Topup', icon: '➕', color: 'wallet',
                    children: [
                        { id: 'wa-tu-methods', name: 'UPI / Card / Net', icon: '💳', color: 'wallet', desc: 'All payment methods for topup' },
                        { id: 'wa-tu-limits', name: 'Min/Max Limits', icon: '📊', color: 'wallet', desc: 'Seller-configured limits' },
                        { id: 'wa-tu-e1', name: 'Payment Failure', icon: '⚠️', color: 'edge', edge: 'Failed topup refund to source' }
                    ]
                },
                {
                    id: 'wa-txns', name: 'Transactions', icon: '💳', color: 'walletSub',
                    children: [
                        { id: 'wa-tx-credit', name: 'CREDIT Types', icon: '📥', color: 'walletSub', desc: 'Topup, refund, cashback, admin credit' },
                        { id: 'wa-tx-debit', name: 'DEBIT Types', icon: '📤', color: 'walletSub', desc: 'Order purchase, expiry debit' },
                        { id: 'wa-tx-trail', name: 'Balance Trail', icon: '📊', color: 'walletSub', desc: 'Before/after on each txn' },
                        { id: 'wa-tx-e1', name: 'Reversal', icon: '⚠️', color: 'edge', edge: 'Transaction reversal, audit log' }
                    ]
                },
                {
                    id: 'wa-cashback', name: 'Cashback System', icon: '🎁', color: 'wallet',
                    children: [
                        { id: 'wa-cb-order', name: 'Order Cashback', icon: '📦', color: 'wallet', desc: '% cashback on purchase' },
                        { id: 'wa-cb-topup', name: 'Topup Cashback', icon: '➕', color: 'wallet', desc: 'Bonus on wallet recharge' },
                        { id: 'wa-cb-expiry', name: 'Cashback Expiry', icon: '⏰', color: 'wallet', desc: 'Auto-expire unused cashback' },
                        { id: 'wa-cb-e1', name: 'Cancel Clawback', icon: '⚠️', color: 'edge', edge: 'Reverse cashback on cancelled order' }
                    ]
                },
                {
                    id: 'wa-admin', name: 'Admin Controls', icon: '⚙️', color: 'walletSub',
                    children: [
                        { id: 'wa-ad-credit', name: 'Manual Credit', icon: '➕', color: 'walletSub', desc: 'Admin adds money to customer' },
                        { id: 'wa-ad-view', name: 'View All Txns', icon: '👁️', color: 'walletSub', desc: 'Full transaction log' },
                        { id: 'wa-ad-config', name: 'Config Settings', icon: '⚙️', color: 'walletSub', desc: 'Min/max/cashback settings' },
                        { id: 'wa-ad-e1', name: 'Bulk Credit', icon: '⚠️', color: 'edge', edge: 'Bulk import errors, validation' }
                    ]
                }
            ]
        },
        // ── ORDERS ──────────────────────────────────────────────
        {
            id: 'orders', name: 'ORDERS', icon: '📦', color: 'order',
            desc: 'Complete order lifecycle',
            children: [
                {
                    id: 'or-lifecycle', name: 'Order Lifecycle', icon: '🔄', color: 'order',
                    children: [
                        { id: 'or-lc-flow', name: 'Status Flow', icon: '📋', color: 'order', desc: 'PENDING→CONFIRMED→PROCESSING→SHIPPED→DELIVERED' },
                        { id: 'or-lc-cancel', name: 'Cancellation', icon: '❌', color: 'order', desc: 'By customer or admin' },
                        { id: 'or-lc-refund', name: 'Refund Flow', icon: '↩️', color: 'order', desc: 'Full or partial refund' },
                        { id: 'or-lc-e1', name: 'Status Rollback', icon: '⚠️', color: 'edge', edge: 'Prevent backward status change' },
                        { id: 'or-lc-e2', name: 'Stuck Orders', icon: '⚠️', color: 'edge', edge: 'Auto-detect orders stuck >N days' }
                    ]
                },
                {
                    id: 'or-payment', name: 'Payment', icon: '💳', color: 'order',
                    children: [
                        { id: 'or-py-methods', name: 'Payment Methods', icon: '📋', color: 'order', desc: 'UPI, Card, COD, Wallet, Netbanking' },
                        { id: 'or-py-mixed', name: 'Mixed Payment', icon: '🔀', color: 'order', desc: 'Wallet + UPI split payment' },
                        { id: 'or-py-razorpay', name: 'Razorpay Flow', icon: '💳', color: 'order', desc: 'Order create → verify → capture' },
                        { id: 'or-py-retry', name: 'Payment Retry', icon: '🔄', color: 'order', desc: 'Failed payment retry link' },
                        { id: 'or-py-e1', name: 'Double Payment', icon: '⚠️', color: 'edge', edge: 'Webhook idempotency, dedup' },
                        { id: 'or-py-e2', name: 'Gateway Timeout', icon: '⚠️', color: 'edge', edge: 'Pending verification, manual check' }
                    ]
                },
                {
                    id: 'or-items', name: 'Order Items', icon: '📝', color: 'orderSub',
                    children: [
                        { id: 'or-it-snap', name: 'Product Snapshot', icon: '📸', color: 'orderSub', desc: 'Name, price, image at order time' },
                        { id: 'or-it-variant', name: 'Variant Details', icon: '🔀', color: 'orderSub', desc: 'Size, color selected' },
                        { id: 'or-it-qty', name: 'Qty & Line Total', icon: '🔢', color: 'orderSub', desc: 'Quantity × unit price' },
                        { id: 'or-it-split', name: 'Order Splitting', icon: '✂️', color: 'orderSub', desc: 'Split into multiple shipments — multi-warehouse or mixed delivery modes' },
                        { id: 'or-it-e1', name: 'Deleted Product', icon: '⚠️', color: 'edge', edge: 'Product removed after order placed' },
                        { id: 'or-it-e2', name: 'Split Refund Complexity', icon: '⚠️', color: 'edge', edge: 'Partial return on split order, per-shipment refund calculation' }
                    ]
                },
                {
                    id: 'or-invoice', name: 'Invoice', icon: '🧾', color: 'order',
                    children: [
                        { id: 'or-inv-auto', name: 'Auto-generate PDF', icon: '📄', color: 'order', desc: 'On order confirmation' },
                        { id: 'or-inv-gst', name: 'GST Invoice Format', icon: '📊', color: 'order', desc: 'GSTIN, HSN, tax breakup' },
                        { id: 'or-inv-template', name: 'Custom Invoice Template', icon: '🎨', color: 'order', desc: 'Seller custom invoice design — logo, layout, terms, branding' },
                        { id: 'or-inv-e1', name: 'Credit Notes', icon: '⚠️', color: 'edge', edge: 'Generated on refunds' }
                    ]
                },
                {
                    id: 'or-tracking', name: 'Tracking', icon: '🚚', color: 'order',
                    children: [
                        { id: 'or-tr-number', name: 'Tracking Number', icon: '🔢', color: 'order', desc: 'AWB entry by seller' },
                        { id: 'or-tr-courier', name: 'Courier Partner', icon: '🚛', color: 'order', desc: 'Shiprocket, Delhivery, etc.' },
                        { id: 'or-tr-webhook', name: 'Status Webhooks', icon: '📡', color: 'order', desc: 'Auto-update from courier API' },
                        { id: 'or-tr-e1', name: 'Lost in Transit', icon: '⚠️', color: 'edge', edge: 'RTO handling, insurance claim' },
                        { id: 'or-tr-e2', name: 'Delivery Failed', icon: '⚠️', color: 'edge', edge: 'Wrong address, customer absent' }
                    ]
                },
                {
                    id: 'or-sub-order', name: 'Subscription Orders', icon: '🔄', color: 'subscription',
                    children: [
                        { id: 'or-so-auto', name: 'Auto-generated', icon: '🤖', color: 'subscription', desc: 'Created from active subscription' },
                        { id: 'or-so-link', name: 'Linked subscriptionId', icon: '🔗', color: 'subscription', desc: 'Reference to parent subscription' },
                        { id: 'or-so-e1', name: 'Failed Sub Payment', icon: '⚠️', color: 'edge', edge: 'Retry logic, pause subscription' }
                    ]
                },
                {
                    id: 'or-reconcile', name: 'Payment Reconciliation', icon: '🔍', color: 'order',
                    desc: 'Match gateway settlements with platform records',
                    children: [
                        { id: 'or-rc-daily', name: 'Daily Settlement Match', icon: '📊', color: 'order', desc: 'Razorpay/PhonePe settlement vs platform orders' },
                        { id: 'or-rc-mismatch', name: 'Mismatch Report', icon: '❌', color: 'order', desc: 'Unmatched payments, missing settlements' },
                        { id: 'or-rc-refund', name: 'Refund Reconciliation', icon: '💰', color: 'order', desc: 'Refund issued vs refund received by customer' },
                        { id: 'or-rc-e1', name: 'Settlement Delay', icon: '⚠️', color: 'edge', edge: 'Gateway holds funds, T+2 vs T+7 settlement cycles' }
                    ]
                },
                { id: 'or-paylink', name: 'Payment Links', icon: '🔗', color: 'order', desc: 'Generate shareable pay link — send via WhatsApp/SMS, track clicks & conversions' },
                { id: 'or-edit', name: 'Order Editing', icon: '✏️', color: 'order', desc: 'Modify order post-placement (before shipping) — change qty, add item, update address' },
                { id: 'or-priority', name: 'Order Priority / Flagging', icon: '🚩', color: 'order', desc: 'Flag VIP orders, urgent delivery, fraud review — priority queue for fulfillment' },
                { id: 'or-edit-e1', name: 'Edit After Payment', icon: '⚠️', color: 'edge', edge: 'Price changes after payment — partial refund or additional charge needed' }
            ]
        },
        // ── SUBSCRIPTIONS ──────────────────────────────────────
        {
            id: 'subscriptions', name: 'SUBSCRIPTIONS', icon: '🔄', color: 'subscription',
            desc: 'Recurring delivery system',
            children: [
                {
                    id: 'sub-plans', name: 'Subscription Plans', icon: '📋', color: 'subscription',
                    children: [
                        { id: 'sub-p-freq', name: 'Frequency Options', icon: '📅', color: 'subscription', desc: 'Daily / Weekly / Biweekly / Monthly' },
                        { id: 'sub-p-price', name: 'Price per Cycle', icon: '💰', color: 'subscription', desc: 'Recurring charge amount' },
                        { id: 'sub-p-discount', name: 'Subscribe Discount', icon: '🏷️', color: 'subscription', desc: '% off vs one-time price' },
                        { id: 'sub-p-trial', name: 'Trial Days', icon: '⏰', color: 'subscription', desc: 'Free trial before billing' },
                        { id: 'sub-p-cycles', name: 'Cycle Count', icon: '🔢', color: 'subscription', desc: 'Finite or infinite (null=∞)' },
                        { id: 'sub-p-e1', name: 'Plan Discontinued', icon: '⚠️', color: 'edge', edge: 'Active subs on deleted plan' }
                    ]
                },
                {
                    id: 'sub-active', name: 'Active Subscriptions', icon: '✅', color: 'subscription',
                    children: [
                        { id: 'sub-a-status', name: 'Status States', icon: '🔄', color: 'subscription', desc: 'Active / Paused / Cancelled / Expired' },
                        { id: 'sub-a-dates', name: 'Billing Dates', icon: '📅', color: 'subscription', desc: 'Start, next billing, end date' },
                        { id: 'sub-a-addr', name: 'Delivery Address', icon: '📍', color: 'subscription', desc: 'Per-subscription address' },
                        { id: 'sub-a-e1', name: 'Address Change', icon: '⚠️', color: 'edge', edge: 'Mid-subscription address update' }
                    ]
                },
                {
                    id: 'sub-deliveries', name: 'Deliveries', icon: '📅', color: 'subscriptionSub',
                    children: [
                        { id: 'sub-d-calendar', name: 'Delivery Calendar', icon: '📅', color: 'subscriptionSub', desc: 'Visual schedule view' },
                        { id: 'sub-d-status', name: 'Per-delivery Status', icon: '📋', color: 'subscriptionSub', desc: 'Scheduled / Delivered / Skipped / Failed' },
                        { id: 'sub-d-skip', name: 'Skip Delivery', icon: '⏭️', color: 'subscriptionSub', desc: 'Skip with reason' },
                        { id: 'sub-d-e1', name: 'Holidays/Blackout', icon: '⚠️', color: 'edge', edge: 'Holiday scheduling, max skips' },
                        { id: 'sub-d-e2', name: 'Delivery Failed', icon: '⚠️', color: 'edge', edge: 'Address issue, not home' }
                    ]
                },
                {
                    id: 'sub-billing', name: 'Billing', icon: '💳', color: 'subscription',
                    children: [
                        { id: 'sub-b-auto', name: 'Auto-charge', icon: '🤖', color: 'subscription', desc: 'Charge on billing date' },
                        { id: 'sub-b-invoice', name: 'Per-cycle Invoice', icon: '🧾', color: 'subscription', desc: 'Invoice each billing cycle' },
                        { id: 'sub-b-e1', name: 'Wallet First', icon: '⚠️', color: 'edge', edge: 'Wallet deduction → gateway fallback' }
                    ]
                },
                {
                    id: 'sub-pause', name: 'Pause / Resume', icon: '⏸️', color: 'subscription',
                    children: [
                        { id: 'sub-pa-reason', name: 'Pause with Reason', icon: '📝', color: 'subscription', desc: 'Customer selects reason' },
                        { id: 'sub-pa-auto', name: 'Auto-resume Date', icon: '📅', color: 'subscription', desc: 'Optional resume date' },
                        { id: 'sub-pa-e1', name: 'Pause Limits', icon: '⚠️', color: 'edge', edge: 'Max pauses per cycle, billing during pause' }
                    ]
                },
                {
                    id: 'sub-cancel', name: 'Cancellation', icon: '❌', color: 'subscription',
                    children: [
                        { id: 'sub-ca-reason', name: 'Cancel Reason', icon: '📝', color: 'subscription', desc: 'Reason capture for analytics' },
                        { id: 'sub-ca-refund', name: 'Prorated Refund', icon: '💰', color: 'subscription', desc: 'Unused days refund calc' },
                        { id: 'sub-ca-e1', name: 'Cancel Fee', icon: '⚠️', color: 'edge', edge: 'Early cancellation penalty' },
                        { id: 'sub-ca-e2', name: 'Win-back', icon: '⚠️', color: 'edge', edge: 'Retention offers on cancel attempt' }
                    ]
                }
            ]
        },
        // ── COUPONS ──────────────────────────────────────────
        {
            id: 'coupons', name: 'COUPONS & OFFERS', icon: '🎁', color: 'coupon',
            desc: 'Discount system',
            children: [
                { id: 'cp-types', name: 'Coupon Types', icon: '📋', color: 'coupon', desc: 'Flat / Percentage / BOGO / Free Shipping' },
                { id: 'cp-code-gen', name: 'Code Generator', icon: '🔤', color: 'coupon', desc: 'Auto-generate unique codes: SUMMER23, FLAT100' },
                { id: 'cp-rules', name: 'Validation Rules', icon: '📊', color: 'coupon', desc: 'Min order, max discount cap, usage limit, per-customer limit' },
                { id: 'cp-validity', name: 'Validity Period', icon: '📅', color: 'coupon', desc: 'Start date / end date' },
                { id: 'cp-target', name: 'Target Audience', icon: '🎯', color: 'coupon', desc: 'All / new customers only / specific segments' },
                { id: 'cp-product', name: 'Product Restriction', icon: '📦', color: 'coupon', desc: 'Apply to specific products/categories only' },
                { id: 'cp-referral', name: 'Referral Programs', icon: '🤝', color: 'coupon', desc: 'Share & earn credits' },
                { id: 'cp-auto', name: 'Auto-apply Coupons', icon: '🤖', color: 'coupon', desc: 'Best coupon auto-selected at checkout' },
                { id: 'cp-analytics', name: 'Coupon Analytics', icon: '📊', color: 'analytics', desc: 'Usage count, revenue impact, ROI per coupon' },
                { id: 'cp-scheduled', name: 'Scheduled Discounts', icon: '⏰', color: 'coupon', desc: 'Time-based offers that auto-start & auto-expire — festival/flash scheduling' },
                { id: 'cp-e1', name: 'Stacking Rules', icon: '⚠️', color: 'edge', edge: 'Can coupons stack? Single use?' },
                { id: 'cp-e2', name: 'Abuse Detection', icon: '⚠️', color: 'edge', edge: 'Multiple accounts, Bot redemption' },
                { id: 'cp-e3', name: 'Expired During Checkout', icon: '⚠️', color: 'edge', edge: 'Coupon expires between cart add and payment' },
                { id: 'cp-e4', name: 'Max Discount Exceeded', icon: '⚠️', color: 'edge', edge: 'Percentage coupon exceeds cap amount' },
                { id: 'cp-e5', name: 'Coupon Sharing Leak', icon: '⚠️', color: 'edge', edge: 'Private coupon shared publicly, viral abuse' }
            ]
        },
        // ── SHIPPING ──────────────────────────────────────────
        {
            id: 'shipping', name: 'SHIPPING', icon: '🚚', color: 'shipping',
            desc: 'Delivery & logistics',
            children: [
                { id: 'sh-calc', name: 'Rate Calculator', icon: '🧮', color: 'shipping', desc: 'Weight × distance calculation' },
                { id: 'sh-rules', name: 'Shipping Rules', icon: '📋', color: 'shipping', desc: 'Flat rate, free above threshold' },
                { id: 'sh-pincode', name: 'Pincode Check', icon: '📍', color: 'shipping', desc: 'Serviceability by pincode' },
                { id: 'sh-courier', name: 'Courier Integration', icon: '🚛', color: 'shipping', desc: 'Shiprocket, Delhivery APIs' },
                { id: 'sh-returns', name: 'Return Shipping', icon: '↩️', color: 'shipping', desc: 'RTO & customer returns' },
                { id: 'sh-ndr', name: 'NDR Management', icon: '📋', color: 'shipping', desc: 'Non-Delivery Report handling — reattempt, RTO, customer contact, resolution workflow' },
                { id: 'sh-manifest', name: 'Manifest & Pickup', icon: '📦', color: 'shipping', desc: 'Generate manifest, schedule courier pickup, bulk pickup request' },
                { id: 'sh-insurance', name: 'Shipping Insurance', icon: '🛡️', color: 'shipping', desc: 'Insure high-value shipments, auto-claim on damage/loss' },
                { id: 'sh-rating', name: 'Delivery Partner Rating', icon: '⭐', color: 'shipping', desc: 'Rate courier performance, auto-select best partner per zone' },
                { id: 'sh-e1', name: 'Remote Surcharge', icon: '⚠️', color: 'edge', edge: 'Remote area extra charge, COD limits per pincode' },
                { id: 'sh-e2', name: 'Weight Mismatch', icon: '⚠️', color: 'edge', edge: 'Actual weight differs from declared, courier dispute' },
                { id: 'sh-e3', name: 'Courier API Down', icon: '⚠️', color: 'edge', edge: 'Fallback courier, manual AWB entry' },
                { id: 'sh-e4', name: 'Multi-item Split Ship', icon: '⚠️', color: 'edge', edge: 'Order split into multiple shipments' },
                { id: 'sh-e5', name: 'NDR Escalation Loop', icon: '⚠️', color: 'edge', edge: 'Customer unreachable after 3 attempts — auto-RTO vs hold' }
            ]
        },
        // ── WEBSITE BUILDER ──────────────────────────────────
        {
            id: 'website', name: 'WEBSITE BUILDER', icon: '🌐', color: 'widget',
            desc: 'Store frontend editor',
            children: [
                { id: 'wb-pages', name: 'Page Editor', icon: '📄', color: 'widget', desc: 'Home, Category, Product, Checkout, Order Status pages' },
                {
                    id: 'wb-widgets', name: 'Widget System', icon: '🧩', color: 'widget',
                    children: [
                        { id: 'wb-w-banner', name: 'Banner/Carousel (GIF)', icon: '🖼️', color: 'widget', desc: 'Image sliders, animated GIF banners & links — attractive offer/promotion display' },
                        { id: 'wb-w-prodgrp', name: 'Product Group', icon: '📦', color: 'widget', desc: 'Featured / new arrivals / popular' },
                        { id: 'wb-w-catgrp', name: 'Category Group', icon: '📂', color: 'widget', desc: 'Browse by category' },
                        { id: 'wb-w-testi', name: 'Testimonials', icon: '💬', color: 'widget', desc: 'Customer feedback display' },
                        { id: 'wb-w-video', name: 'Video Widget', icon: '🎥', color: 'widget', desc: 'Embed product videos' },
                        { id: 'wb-w-layout', name: 'Layout Options', icon: '📐', color: 'widget', desc: 'Grid / Carousel / Single' },
                        { id: 'wb-w-e1', name: 'Widget Load Perf', icon: '⚠️', color: 'edge', edge: 'Too many widgets slow page, lazy-load needed' },
                        { id: 'wb-w-e2', name: 'Broken Widget', icon: '⚠️', color: 'edge', edge: 'Widget references deleted product/category' }
                    ]
                },
                {
                    id: 'wb-seo', name: 'SEO Tools', icon: '🔍', color: 'widget',
                    desc: 'Complete SEO management',
                    children: [
                        { id: 'wb-seo-meta', name: 'Meta Tags', icon: '📝', color: 'widget', desc: 'Title, description, OG tags per page' },
                        { id: 'wb-seo-sitemap', name: 'Auto Sitemap.xml', icon: '🗺️', color: 'widget', desc: 'Auto-generated sitemap for Google indexing' },
                        { id: 'wb-seo-robots', name: 'Robots.txt Config', icon: '🤖', color: 'widget', desc: 'Control crawler access, noindex/nofollow rules' },
                        { id: 'wb-seo-schema', name: 'Schema Markup', icon: '📊', color: 'widget', desc: 'Product, Breadcrumb, FAQ structured data for rich snippets' },
                        { id: 'wb-seo-score', name: 'SEO Audit Score', icon: '📈', color: 'widget', desc: 'Page-level SEO score with improvement suggestions' },
                        { id: 'wb-seo-e1', name: 'Duplicate Content', icon: '⚠️', color: 'edge', edge: 'Canonical URLs, pagination SEO, variant page dedup' }
                    ]
                },
                { id: 'wb-announce', name: 'Announcement Bar', icon: '📢', color: 'widget', desc: 'Top banner message' },
                { id: 'wb-theme', name: 'Global Theme', icon: '🎨', color: 'widget', desc: 'Colors, fonts, layout' },
                { id: 'wb-darkmode', name: 'Dark Mode Toggle', icon: '🌙', color: 'widget', desc: 'Customer dark/light mode switch — auto-detect system preference' },
                { id: 'wb-e1', name: 'Draft/Publish', icon: '⚠️', color: 'edge', edge: 'Page versioning, preview before publish' }
            ]
        },
        // ── COMMUNICATION ──────────────────────────────────────
        {
            id: 'communication', name: 'COMMUNICATION', icon: '📣', color: 'comm',
            desc: 'Customer messaging channels',
            children: [
                { id: 'cm-whatsapp', name: 'WhatsApp Automation', icon: '💬', color: 'comm', desc: 'Order updates, cart recovery' },
                { id: 'cm-email', name: 'Email Campaigns', icon: '📧', color: 'comm', desc: 'Resend / SendGrid integration' },
                { id: 'cm-sms', name: 'SMS Alerts', icon: '📱', color: 'comm', desc: 'OTP, order confirmation' },
                { id: 'cm-push', name: 'Push Notifications', icon: '🔔', color: 'comm', desc: 'Firebase web/app push' },
                { id: 'cm-cart', name: 'Abandoned Cart Recovery', icon: '🛒', color: 'comm', desc: 'Auto-reminder sequence' },
                { id: 'cm-email-tpl', name: 'Email Template Editor', icon: '🎨', color: 'comm', desc: 'Drag-drop email builder — branded templates for orders, promotions, welcome' },
                { id: 'cm-wa-broadcast', name: 'WhatsApp Broadcast', icon: '📢', color: 'comm', desc: 'Bulk promo messages to customer segments — template approval, scheduling' },
                { id: 'cm-wa-commerce', name: 'WhatsApp Commerce', icon: '🛒', color: 'comm', desc: 'Browse catalog & place orders via WhatsApp — conversational commerce' },
                { id: 'cm-push-campaign', name: 'Push Notification Campaigns', icon: '📣', color: 'comm', desc: 'Targeted push campaigns — segment-based, scheduled, A/B test titles' },
                { id: 'cm-e1', name: 'Opt-out Management', icon: '⚠️', color: 'edge', edge: 'Unsubscribe, delivery rate tracking' },
                { id: 'cm-e2', name: 'WhatsApp API Limit', icon: '⚠️', color: 'edge', edge: '24hr window, template-only outside window' },
                { id: 'cm-e3', name: 'Email Bounce', icon: '⚠️', color: 'edge', edge: 'Hard/soft bounce handling, sender reputation' },
                { id: 'cm-e4', name: 'SMS DND', icon: '⚠️', color: 'edge', edge: 'TRAI DND list, promotional vs transactional' },
                { id: 'cm-e5', name: 'Push Token Expired', icon: '⚠️', color: 'edge', edge: 'FCM token refresh, unregistered device cleanup' },
                { id: 'cm-e6', name: 'WhatsApp Template Rejected', icon: '⚠️', color: 'edge', edge: 'Meta rejects message template — rewrite & resubmit' }
            ]
        },
        // ── APP BUILDER ──────────────────────────────────────
        {
            id: 'appbuilder', name: 'APP BUILDER', icon: '📱', color: 'app',
            desc: 'Mobile app generation',
            children: [
                {
                    id: 'ab-customer', name: 'Customer App', icon: '📱', color: 'app',
                    children: [
                        { id: 'ab-c-name', name: 'App Name & Icon', icon: '📝', color: 'app', desc: 'Branding configuration' },
                        { id: 'ab-c-firebase', name: 'Firebase Config', icon: '🔥', color: 'app', desc: 'Web API key, project ID' },
                        { id: 'ab-c-sha', name: 'SHA-256 Certificate', icon: '🔐', color: 'app', desc: 'Play Store signing' },
                        { id: 'ab-c-domain', name: 'Deep Links', icon: '🔗', color: 'app', desc: 'Custom domain dynamic links' },
                        { id: 'ab-c-e1', name: 'Forced Update', icon: '⚠️', color: 'edge', edge: 'Minimum app version enforcement' }
                    ]
                },
                {
                    id: 'ab-seller', name: 'Seller App', icon: '🏪', color: 'app',
                    desc: 'Store management mobile app',
                    children: [
                        { id: 'ab-s-orders', name: 'Order Management', icon: '📦', color: 'app', desc: 'Accept, reject, process orders on mobile' },
                        { id: 'ab-s-product', name: 'Product Edit', icon: '📝', color: 'app', desc: 'Quick price/stock update from phone' },
                        { id: 'ab-s-push', name: 'New Order Alerts', icon: '🔔', color: 'app', desc: 'Push notification for every new order' },
                        { id: 'ab-s-quick', name: 'Quick Actions', icon: '⚡', color: 'app', desc: 'Accept/reject/ship with one tap' },
                        { id: 'ab-s-stats', name: 'Daily Stats', icon: '📊', color: 'app', desc: 'Today orders, revenue, pending actions' },
                        { id: 'ab-s-e1', name: 'Offline Mode', icon: '⚠️', color: 'edge', edge: 'Queue actions when offline, sync later' }
                    ]
                }
            ]
        },
        // ── PLUGIN STORE ──────────────────────────────────────
        {
            id: 'pluginstore', name: 'PLUGIN STORE', icon: '🔌', color: 'plugin',
            desc: 'Extensions & integrations',
            children: [
                {
                    id: 'pl-website', name: 'Website Plugins', icon: '🌐', color: 'plugin',
                    desc: 'Theme widgets & navigation',
                    children: [
                        { id: 'pl-w-nav', name: 'Navigation Menu', icon: '📋', color: 'plugin', desc: 'Custom mega-menu builder' },
                        { id: 'pl-w-popup', name: 'Popup Builder', icon: '🪟', color: 'plugin', desc: 'Exit-intent, scroll-trigger popups' },
                        { id: 'pl-w-countdown', name: 'Countdown Timer', icon: '⏰', color: 'plugin', desc: 'Sale countdown on product page' },
                        { id: 'pl-w-e1', name: 'Popup Blocker', icon: '⚠️', color: 'edge', edge: 'Browser blocks popup, mobile compatibility' }
                    ]
                },
                {
                    id: 'pl-marketing', name: 'Marketing Plugins', icon: '📣', color: 'plugin',
                    desc: 'Ads & tracking integrations',
                    children: [
                        { id: 'pl-m-google', name: 'Google Merchant', icon: '🛒', color: 'plugin', desc: 'Product feed for Google Shopping' },
                        { id: 'pl-m-fbpixel', name: 'Facebook Pixel', icon: '📘', color: 'plugin', desc: 'Conversion tracking & audiences' },
                        { id: 'pl-m-whatsapp', name: 'WhatsApp Chat', icon: '💬', color: 'plugin', desc: 'Floating WhatsApp button' },
                        { id: 'pl-m-e1', name: 'Feed Sync Failure', icon: '⚠️', color: 'edge', edge: 'Google Merchant feed rejected, data mismatch' }
                    ]
                },
                {
                    id: 'pl-shipping', name: 'Shipping Plugins', icon: '🚚', color: 'plugin',
                    desc: 'Courier partner add-ons',
                    children: [
                        { id: 'pl-sh-shiprocket', name: 'Shiprocket', icon: '🚀', color: 'plugin', desc: 'Multi-courier aggregation' },
                        { id: 'pl-sh-delhivery', name: 'Delhivery', icon: '📦', color: 'plugin', desc: 'Direct Delhivery integration' },
                        { id: 'pl-sh-dunzo', name: 'Dunzo/Porter', icon: '🏃', color: 'plugin', desc: 'Hyperlocal delivery' }
                    ]
                },
                {
                    id: 'pl-analytics', name: 'Analytics Plugins', icon: '📊', color: 'plugin',
                    desc: 'Tracking & insights tools',
                    children: [
                        { id: 'pl-a-ga', name: 'Google Analytics', icon: '📈', color: 'plugin', desc: 'GA4 integration, e-commerce events' },
                        { id: 'pl-a-hotjar', name: 'Hotjar', icon: '🔥', color: 'plugin', desc: 'Heatmaps, session recordings' },
                        { id: 'pl-a-clarity', name: 'Microsoft Clarity', icon: '🔍', color: 'plugin', desc: 'Free heatmap & session replay' },
                        { id: 'pl-a-e1', name: 'Tracking Consent', icon: '⚠️', color: 'edge', edge: 'GDPR consent required before analytics scripts load' }
                    ]
                },
                {
                    id: 'pl-payment', name: 'Payment Plugins', icon: '💳', color: 'plugin',
                    desc: 'Additional payment gateways',
                    children: [
                        { id: 'pl-py-phonepe', name: 'PhonePe', icon: '📱', color: 'plugin', desc: 'PhonePe payment gateway' },
                        { id: 'pl-py-paytm', name: 'Paytm', icon: '💰', color: 'plugin', desc: 'Paytm payment gateway' },
                        { id: 'pl-py-stripe', name: 'Stripe', icon: '💳', color: 'plugin', desc: 'International payments' },
                        { id: 'pl-py-e1', name: 'Gateway Mismatch', icon: '⚠️', color: 'edge', edge: 'Multiple gateways active, routing conflict' }
                    ]
                },
                {
                    id: 'pl-crm', name: 'CRM Plugins', icon: '👥', color: 'plugin',
                    desc: 'Customer relationship management',
                    children: [
                        { id: 'pl-cr-zoho', name: 'Zoho CRM', icon: '📊', color: 'plugin', desc: 'Lead & customer sync' },
                        { id: 'pl-cr-freshdesk', name: 'Freshdesk', icon: '🎫', color: 'plugin', desc: 'Support ticket integration' },
                        { id: 'pl-cr-tally', name: 'Tally/Zoho Books', icon: '📒', color: 'plugin', desc: 'Accounting sync' },
                        { id: 'pl-cr-e1', name: 'Sync Conflict', icon: '⚠️', color: 'edge', edge: 'CRM data conflicts with platform data, merge rules' }
                    ]
                },
                { id: 'pl-e1', name: 'Plugin Conflicts', icon: '⚠️', color: 'edge', edge: 'Version compatibility, feature overlap' },
                { id: 'pl-e2', name: 'Plugin Security', icon: '⚠️', color: 'edge', edge: 'Third-party code injection risk, sandboxing' }
            ]
        },
        // ── CART ──────────────────────────────────────────────
        {
            id: 'cart', name: 'CART', icon: '🛒', color: 'cart',
            desc: 'Shopping cart system',
            children: [
                { id: 'ca-items', name: 'Cart Items', icon: '🛍️', color: 'cart', desc: 'Product + variant + quantity' },
                { id: 'ca-calc', name: 'Price Calculation', icon: '🧮', color: 'cart', desc: 'Subtotal, discount, tax, shipping, wallet' },
                { id: 'ca-coupon', name: 'Coupon Application', icon: '🎁', color: 'cart', desc: 'Apply discount code at cart' },
                { id: 'ca-recovery', name: 'Abandoned Cart Recovery', icon: '📧', color: 'comm', desc: 'Auto WhatsApp/Email reminder with discount — recover lost sales' },
                { id: 'ca-e1', name: 'Cart Expiry', icon: '⚠️', color: 'edge', edge: 'Auto-clear after N days' },
                { id: 'ca-e2', name: 'Price Changed', icon: '⚠️', color: 'edge', edge: 'Price change between add & checkout' },
                { id: 'ca-e3', name: 'Stock Reserved', icon: '⚠️', color: 'edge', edge: 'Temporary stock lock on checkout start' },
                { id: 'ca-e4', name: 'Recovery Spam', icon: '⚠️', color: 'edge', edge: 'Max 2 reminders, unsubscribe option, cooldown period' }
            ]
        },
        // ── AUTH & SECURITY (Phase 6) ──────────────────────────
        {
            id: 'auth', name: 'AUTH & SECURITY', icon: '🔐', color: 'superadmin',
            desc: 'Authentication, authorization & platform security',
            children: [
                {
                    id: 'au-customer-auth', name: 'Customer Auth', icon: '👤', color: 'customer',
                    desc: 'End-user login/signup flows',
                    children: [
                        { id: 'au-ca-otp', name: 'Phone OTP Login', icon: '📱', color: 'customer', desc: 'MSG91/Twilio OTP → verify → JWT' },
                        { id: 'au-ca-email', name: 'Email + Password', icon: '📧', color: 'customer', desc: 'bcrypt hash, email verify link' },
                        { id: 'au-ca-social', name: 'Social OAuth', icon: '🔗', color: 'customer', desc: 'Google, Facebook OAuth2 flow' },
                        { id: 'au-ca-guest', name: 'Guest Checkout', icon: '👻', color: 'customer', desc: 'Order without account, later merge' },
                        { id: 'au-ca-e1', name: 'Account Merge', icon: '⚠️', color: 'edge', edge: 'Same email OTP + social → merge accounts' },
                        { id: 'au-ca-e2', name: 'OTP Expiry', icon: '⚠️', color: 'edge', edge: 'OTP expired, resend limits, cooldown' }
                    ]
                },
                {
                    id: 'au-seller-auth', name: 'Seller Auth', icon: '🏪', color: 'seller',
                    desc: 'Seller & staff login',
                    children: [
                        { id: 'au-sa-email', name: 'Email + Password', icon: '📧', color: 'seller', desc: 'Secure login with bcrypt' },
                        { id: 'au-sa-2fa', name: '2FA (TOTP)', icon: '🔑', color: 'seller', desc: 'Google Authenticator / SMS 2FA' },
                        { id: 'au-sa-staff', name: 'Staff Login', icon: '👥', color: 'sellerSub', desc: 'Staff invite link → set password' },
                        { id: 'au-sa-e1', name: 'Staff Access Revoke', icon: '⚠️', color: 'edge', edge: 'Instant session kill on deactivation' }
                    ]
                },
                {
                    id: 'au-admin-auth', name: 'Admin Auth', icon: '👑', color: 'superadmin',
                    desc: 'Platform admin login',
                    children: [
                        { id: 'au-aa-login', name: 'Email + Password + 2FA', icon: '🔐', color: 'superadmin', desc: 'Mandatory 2FA for all admins' },
                        { id: 'au-aa-ip', name: 'IP Whitelisting', icon: '🌐', color: 'superadmin', desc: 'Restrict admin panel to known IPs' },
                        { id: 'au-aa-e1', name: 'Suspicious Login', icon: '⚠️', color: 'edge', edge: 'New device/location alert, block' }
                    ]
                },
                {
                    id: 'au-tokens', name: 'Token Management', icon: '🎫', color: 'superadmin',
                    desc: 'JWT & session handling',
                    children: [
                        { id: 'au-tk-jwt', name: 'JWT Access Token', icon: '🎫', color: 'superadmin', desc: 'Short-lived (15min), in memory' },
                        { id: 'au-tk-refresh', name: 'Refresh Token', icon: '🔄', color: 'superadmin', desc: 'Long-lived (7d), httpOnly cookie' },
                        { id: 'au-tk-rotate', name: 'Token Rotation', icon: '🔁', color: 'superadmin', desc: 'New refresh token per use' },
                        { id: 'au-tk-blacklist', name: 'Token Blacklist', icon: '🚫', color: 'superadmin', desc: 'Redis-based revocation on logout' },
                        { id: 'au-tk-e1', name: 'Token Hijacking', icon: '⚠️', color: 'edge', edge: 'Fingerprint binding, reuse detection' }
                    ]
                },
                {
                    id: 'au-password', name: 'Password Security', icon: '🔑', color: 'superadmin',
                    desc: 'Password policies & recovery',
                    children: [
                        { id: 'au-pw-policy', name: 'Password Policy', icon: '📋', color: 'superadmin', desc: 'Min 8 chars, uppercase, number, special' },
                        { id: 'au-pw-hash', name: 'bcrypt Hashing', icon: '🔒', color: 'superadmin', desc: 'Salt rounds = 12, never store plain' },
                        { id: 'au-pw-reset', name: 'Forgot Password', icon: '📧', color: 'superadmin', desc: 'Email link with expiry token (1hr)' },
                        { id: 'au-pw-e1', name: 'Brute Force', icon: '⚠️', color: 'edge', edge: 'Account lockout after 5 failures, CAPTCHA' }
                    ]
                },
                {
                    id: 'au-rbac', name: 'RBAC System', icon: '🛡️', color: 'superadmin',
                    desc: 'Role-Based Access Control',
                    children: [
                        { id: 'au-rb-roles', name: 'Role Definitions', icon: '📋', color: 'superadmin', desc: 'SuperAdmin, Admin roles, Seller, Staff, Customer' },
                        { id: 'au-rb-perms', name: 'Permission Guards', icon: '🔐', color: 'superadmin', desc: 'Middleware checks on every API route' },
                        { id: 'au-rb-scope', name: 'Data Scoping', icon: '🔭', color: 'superadmin', desc: 'Seller sees only their store data' },
                        { id: 'au-rb-e1', name: 'Privilege Escalation', icon: '⚠️', color: 'edge', edge: 'Prevent horizontal/vertical escalation' }
                    ]
                },
                {
                    id: 'au-api-sec', name: 'API Security', icon: '🌐', color: 'superadmin',
                    desc: 'API-level protections',
                    children: [
                        { id: 'au-api-rate', name: 'Rate Limiting', icon: '⏱️', color: 'superadmin', desc: '100 req/min per IP, 1000/min per user' },
                        { id: 'au-api-cors', name: 'CORS Policy', icon: '🌐', color: 'superadmin', desc: 'Allowed origins per store domain' },
                        { id: 'au-api-csp', name: 'CSP Headers', icon: '🛡️', color: 'superadmin', desc: 'Content-Security-Policy, X-Frame-Options' },
                        { id: 'au-api-input', name: 'Input Validation', icon: '✅', color: 'superadmin', desc: 'Zod/Joi schema validation on all inputs' },
                        { id: 'au-api-e1', name: 'SQL Injection', icon: '⚠️', color: 'edge', edge: 'Prisma parameterized queries, no raw SQL' },
                        { id: 'au-api-e2', name: 'XSS/CSRF', icon: '⚠️', color: 'edge', edge: 'Sanitize HTML, CSRF tokens on forms' }
                    ]
                },
                {
                    id: 'au-encryption', name: 'Data Encryption', icon: '🔒', color: 'superadmin',
                    desc: 'Encryption at rest & in transit',
                    children: [
                        { id: 'au-enc-transit', name: 'TLS/HTTPS', icon: '🔐', color: 'superadmin', desc: 'Enforce HTTPS everywhere, HSTS header' },
                        { id: 'au-enc-rest', name: 'Encryption at Rest', icon: '💾', color: 'superadmin', desc: 'DB encryption, PII field-level encryption' },
                        { id: 'au-enc-keys', name: 'Key Management', icon: '🗝️', color: 'superadmin', desc: 'AWS KMS / Vault for API keys, secrets' },
                        { id: 'au-enc-pii', name: 'PII Masking', icon: '👁️', color: 'superadmin', desc: 'Mask phone/email in logs & support views' },
                        { id: 'au-enc-e1', name: 'Key Rotation', icon: '⚠️', color: 'edge', edge: 'Scheduled key rotation, re-encryption' }
                    ]
                }
            ]
        },
        // ── NOTIFICATION ENGINE (Phase 6) ──────────────────────
        {
            id: 'notifications', name: 'NOTIFICATION ENGINE', icon: '🔔', color: 'comm',
            desc: 'Centralized notification system',
            children: [
                {
                    id: 'nf-templates', name: 'Templates', icon: '📝', color: 'comm',
                    desc: 'Notification template management',
                    children: [
                        { id: 'nf-tp-editor', name: 'Template Editor', icon: '✏️', color: 'comm', desc: 'WYSIWYG with variables {{name}}, {{order_id}}' },
                        { id: 'nf-tp-vars', name: 'Dynamic Variables', icon: '🔤', color: 'comm', desc: 'Customer name, order total, tracking URL' },
                        { id: 'nf-tp-preview', name: 'Preview & Test', icon: '👁️', color: 'comm', desc: 'Send test to self before activating' },
                        { id: 'nf-tp-lang', name: 'Multi-language', icon: '🌐', color: 'comm', desc: 'Template per language (Hindi, English)' },
                        { id: 'nf-tp-e1', name: 'Missing Variables', icon: '⚠️', color: 'edge', edge: 'Fallback when variable is null/undefined' }
                    ]
                },
                {
                    id: 'nf-triggers', name: 'Trigger Events', icon: '⚡', color: 'comm',
                    desc: 'Event → notification mapping',
                    children: [
                        { id: 'nf-tr-order', name: 'Order Events', icon: '📦', color: 'comm', desc: 'Placed, confirmed, shipped, delivered, cancelled' },
                        { id: 'nf-tr-payment', name: 'Payment Events', icon: '💳', color: 'comm', desc: 'Success, failed, refund processed' },
                        { id: 'nf-tr-sub', name: 'Subscription Events', icon: '🔄', color: 'comm', desc: 'Activated, renewed, paused, cancelled, expiring' },
                        { id: 'nf-tr-wallet', name: 'Wallet Events', icon: '💰', color: 'comm', desc: 'Topup, cashback, low balance' },
                        { id: 'nf-tr-promo', name: 'Marketing Events', icon: '📣', color: 'comm', desc: 'New product, sale, coupon, flash deal' },
                        { id: 'nf-tr-system', name: 'System Events', icon: '⚙️', color: 'comm', desc: 'Signup welcome, KYC approved, plan expiry' },
                        { id: 'nf-tr-e1', name: 'Event Storm', icon: '⚠️', color: 'edge', edge: 'Dedup rapid-fire events, batch notifications' }
                    ]
                },
                {
                    id: 'nf-channels', name: 'Delivery Channels', icon: '📡', color: 'comm',
                    desc: 'Multi-channel delivery per event',
                    children: [
                        { id: 'nf-ch-whatsapp', name: 'WhatsApp', icon: '💬', color: 'comm', desc: 'WhatsApp Business API (template msgs)' },
                        { id: 'nf-ch-email', name: 'Email', icon: '📧', color: 'comm', desc: 'Resend/SendGrid transactional + marketing' },
                        { id: 'nf-ch-sms', name: 'SMS', icon: '📱', color: 'comm', desc: 'MSG91/Twilio for OTP + alerts' },
                        { id: 'nf-ch-push', name: 'Push (Web/App)', icon: '🔔', color: 'comm', desc: 'Firebase Cloud Messaging' },
                        { id: 'nf-ch-inapp', name: 'In-App Center', icon: '🔔', color: 'comm', desc: 'Bell icon notification list (read/unread)' },
                        { id: 'nf-ch-e1', name: 'Channel Fallback', icon: '⚠️', color: 'edge', edge: 'If WhatsApp fails → try SMS → try email' }
                    ]
                },
                {
                    id: 'nf-queue', name: 'Queue & Delivery', icon: '📬', color: 'comm',
                    desc: 'Reliable delivery system',
                    children: [
                        { id: 'nf-q-queue', name: 'Message Queue', icon: '📋', color: 'comm', desc: 'BullMQ / Redis queue for async delivery' },
                        { id: 'nf-q-retry', name: 'Retry Logic', icon: '🔄', color: 'comm', desc: 'Exponential backoff (3 retries)' },
                        { id: 'nf-q-schedule', name: 'Scheduled Send', icon: '⏰', color: 'comm', desc: 'Schedule notification for future time' },
                        { id: 'nf-q-batch', name: 'Batch Send', icon: '📦', color: 'comm', desc: 'Bulk campaign sending with throttle' },
                        { id: 'nf-q-e1', name: 'Queue Overflow', icon: '⚠️', color: 'edge', edge: 'Dead letter queue, monitoring alerts' }
                    ]
                },
                {
                    id: 'nf-prefs', name: 'User Preferences', icon: '⚙️', color: 'comm',
                    desc: 'Per-user notification settings',
                    children: [
                        { id: 'nf-pf-optout', name: 'Opt-out per Channel', icon: '🚫', color: 'comm', desc: 'Disable SMS but keep email' },
                        { id: 'nf-pf-dnd', name: 'DND Hours', icon: '🌙', color: 'comm', desc: 'No notifications 10PM-8AM' },
                        { id: 'nf-pf-freq', name: 'Frequency Cap', icon: '📊', color: 'comm', desc: 'Max N notifications per day' },
                        { id: 'nf-pf-e1', name: 'Regulatory Compliance', icon: '⚠️', color: 'edge', edge: 'TRAI DND registry, GDPR consent' }
                    ]
                },
                {
                    id: 'nf-analytics', name: 'Notification Analytics', icon: '📊', color: 'analytics',
                    desc: 'Delivery & engagement metrics',
                    children: [
                        { id: 'nf-an-delivery', name: 'Delivery Rate', icon: '📈', color: 'analytics', desc: 'Sent vs delivered vs bounced' },
                        { id: 'nf-an-open', name: 'Open Rate', icon: '👁️', color: 'analytics', desc: 'Email opens, push taps' },
                        { id: 'nf-an-click', name: 'Click Rate', icon: '🖱️', color: 'analytics', desc: 'Link clicks in notifications' },
                        { id: 'nf-an-unsub', name: 'Unsubscribe Rate', icon: '📉', color: 'analytics', desc: 'Opt-out tracking per campaign' },
                        { id: 'nf-an-e1', name: 'Spam Reports', icon: '⚠️', color: 'edge', edge: 'Spam flag rate, sender reputation' }
                    ]
                }
            ]
        },
        // ── RETURNS & REFUNDS (Phase 7) ──────────────────────
        {
            id: 'returns', name: 'RETURNS & REFUNDS', icon: '↩️', color: 'order',
            desc: 'Complete return & refund lifecycle',
            children: [
                {
                    id: 'ret-initiate', name: 'Return Request', icon: '📝', color: 'order',
                    desc: 'Customer-initiated return',
                    children: [
                        { id: 'ret-in-btn', name: 'Request Button', icon: '🔘', color: 'order', desc: 'On order detail page (within window)' },
                        { id: 'ret-in-reason', name: 'Return Reasons', icon: '📋', color: 'order', desc: 'Defective, wrong item, not needed, size issue' },
                        { id: 'ret-in-photos', name: 'Photo Upload', icon: '📷', color: 'order', desc: 'Evidence photos for defective claims' },
                        { id: 'ret-in-e1', name: 'Window Expired', icon: '⚠️', color: 'edge', edge: 'Return window closed (7/15/30 days config)' }
                    ]
                },
                {
                    id: 'ret-config', name: 'Return Policy Config', icon: '⚙️', color: 'order',
                    desc: 'Seller-configurable return rules',
                    children: [
                        { id: 'ret-cf-window', name: 'Return Window', icon: '📅', color: 'order', desc: '7/15/30 days configurable per product' },
                        { id: 'ret-cf-eligible', name: 'Eligible Categories', icon: '📂', color: 'order', desc: 'Some categories non-returnable (food, hygiene)' },
                        { id: 'ret-cf-condition', name: 'Condition Rules', icon: '📋', color: 'order', desc: 'Unused, sealed, with tags, with receipt' },
                        { id: 'ret-cf-e1', name: 'Non-returnable Items', icon: '⚠️', color: 'edge', edge: 'Customer tries to return excluded item' }
                    ]
                },
                {
                    id: 'ret-pickup', name: 'Return Pickup', icon: '🚚', color: 'shipping',
                    desc: 'Reverse logistics',
                    children: [
                        { id: 'ret-pk-schedule', name: 'Pickup Scheduling', icon: '📅', color: 'shipping', desc: 'Customer selects date & time slot' },
                        { id: 'ret-pk-courier', name: 'Reverse Courier', icon: '🚛', color: 'shipping', desc: 'Shiprocket/Delhivery reverse pickup' },
                        { id: 'ret-pk-label', name: 'Shipping Label', icon: '🏷️', color: 'shipping', desc: 'Auto-generated return label' },
                        { id: 'ret-pk-cost', name: 'Who Pays Shipping', icon: '💰', color: 'shipping', desc: 'Seller-paid vs customer-paid (config)' },
                        { id: 'ret-pk-e1', name: 'Pickup Failed', icon: '⚠️', color: 'edge', edge: 'Customer not home, reschedule flow' }
                    ]
                },
                {
                    id: 'ret-inspect', name: 'Inspection & Approval', icon: '🔍', color: 'order',
                    desc: 'Quality check on returned item',
                    children: [
                        { id: 'ret-ins-receive', name: 'Item Received', icon: '📦', color: 'order', desc: 'Warehouse confirms receipt' },
                        { id: 'ret-ins-check', name: 'Quality Check', icon: '✅', color: 'order', desc: 'Inspect for damage, completeness' },
                        { id: 'ret-ins-approve', name: 'Approve / Reject', icon: '⚖️', color: 'order', desc: 'Accept return or reject with reason' },
                        { id: 'ret-ins-e1', name: 'Item Damaged by Customer', icon: '⚠️', color: 'edge', edge: 'Partial refund or rejection' },
                        { id: 'ret-ins-e2', name: 'Missing Items', icon: '⚠️', color: 'edge', edge: 'Incomplete return package' }
                    ]
                },
                {
                    id: 'ret-resolution', name: 'Resolution', icon: '🎯', color: 'order',
                    desc: 'Refund or replacement decision',
                    children: [
                        { id: 'ret-res-refund', name: 'Full Refund', icon: '💰', color: 'order', desc: 'To original payment or wallet' },
                        { id: 'ret-res-partial', name: 'Partial Refund', icon: '💵', color: 'order', desc: 'Deduct for damage/usage' },
                        { id: 'ret-res-replace', name: 'Replacement', icon: '🔄', color: 'order', desc: 'Send new item instead of refund' },
                        { id: 'ret-res-credit', name: 'Store Credit', icon: '🎁', color: 'wallet', desc: 'Add to wallet as credit' },
                        { id: 'ret-res-e1', name: 'Refund Method Dispute', icon: '⚠️', color: 'edge', edge: 'Customer wants original method, policy says wallet' }
                    ]
                }
            ]
        },
        // ── CHECKOUT FLOW (Phase 7) ──────────────────────────
        {
            id: 'checkout', name: 'CHECKOUT FLOW', icon: '🛒', color: 'order',
            desc: 'Step-by-step purchase process',
            children: [
                {
                    id: 'ck-address', name: 'Step 1: Address', icon: '📍', color: 'customer',
                    desc: 'Delivery address selection',
                    children: [
                        { id: 'ck-ad-saved', name: 'Saved Addresses', icon: '📋', color: 'customer', desc: 'Pick from existing addresses' },
                        { id: 'ck-ad-new', name: 'Add New Address', icon: '➕', color: 'customer', desc: 'Inline address form' },
                        { id: 'ck-ad-pincode', name: 'Pincode Validation', icon: '✅', color: 'customer', desc: 'Check serviceability before proceeding' },
                        { id: 'ck-ad-e1', name: 'Unserviceable Pin', icon: '⚠️', color: 'edge', edge: 'Block checkout, show message' }
                    ]
                },
                {
                    id: 'ck-shipping', name: 'Step 2: Shipping', icon: '🚚', color: 'shipping',
                    desc: 'Delivery method selection',
                    children: [
                        { id: 'ck-sh-standard', name: 'Standard Delivery', icon: '📦', color: 'shipping', desc: '3-7 business days' },
                        { id: 'ck-sh-express', name: 'Express Delivery', icon: '⚡', color: 'shipping', desc: '1-2 days (extra charge)' },
                        { id: 'ck-sh-slot', name: 'Time Slot Selection', icon: '⏰', color: 'shipping', desc: 'Morning/afternoon/evening' },
                        { id: 'ck-sh-cost', name: 'Shipping Cost Display', icon: '💰', color: 'shipping', desc: 'Dynamic based on weight/distance' },
                        { id: 'ck-sh-e1', name: 'No Delivery Option', icon: '⚠️', color: 'edge', edge: 'All couriers unavailable for this pin' }
                    ]
                },
                {
                    id: 'ck-coupon', name: 'Step 3: Discount', icon: '🎁', color: 'coupon',
                    desc: 'Apply coupons & offers',
                    children: [
                        { id: 'ck-cp-apply', name: 'Enter Coupon Code', icon: '✏️', color: 'coupon', desc: 'Manual code entry' },
                        { id: 'ck-cp-suggest', name: 'Available Coupons', icon: '📋', color: 'coupon', desc: 'Auto-suggest applicable coupons' },
                        { id: 'ck-cp-wallet', name: 'Wallet Points Toggle', icon: '💰', color: 'wallet', desc: 'Use wallet/loyalty balance' },
                        { id: 'ck-cp-e1', name: 'Invalid Coupon', icon: '⚠️', color: 'edge', edge: 'Expired, min order not met, already used' }
                    ]
                },
                {
                    id: 'ck-summary', name: 'Step 4: Order Summary', icon: '📊', color: 'order',
                    desc: 'Review before payment',
                    children: [
                        { id: 'ck-sm-items', name: 'Item List', icon: '📋', color: 'order', desc: 'Products, variants, quantities' },
                        { id: 'ck-sm-breakdown', name: 'Price Breakdown', icon: '💰', color: 'order', desc: 'Subtotal, discount, tax, shipping, wallet' },
                        { id: 'ck-sm-address', name: 'Delivery Details', icon: '📍', color: 'order', desc: 'Address + estimated delivery date' },
                        { id: 'ck-sm-edit', name: 'Edit Options', icon: '✏️', color: 'order', desc: 'Change address/coupon/qty inline' },
                        { id: 'ck-sm-custom', name: 'Custom Checkout Fields', icon: '📝', color: 'order', desc: 'Seller-defined extra fields — company name, GSTIN, special instructions' }
                    ]
                },
                {
                    id: 'ck-payment', name: 'Step 5: Payment', icon: '💳', color: 'order',
                    desc: 'Payment processing',
                    children: [
                        { id: 'ck-py-methods', name: 'Payment Options', icon: '📋', color: 'order', desc: 'UPI, Card, COD, Wallet, Netbanking, EMI' },
                        { id: 'ck-py-wallet-use', name: 'Wallet Partial Pay', icon: '💰', color: 'wallet', desc: 'Deduct from wallet + pay rest via gateway' },
                        { id: 'ck-py-razorpay', name: 'Razorpay Checkout', icon: '💳', color: 'order', desc: 'Inline modal / redirect to gateway' },
                        { id: 'ck-py-verify', name: 'Payment Verification', icon: '✅', color: 'order', desc: 'Webhook callback + signature verify' },
                        { id: 'ck-py-e1', name: 'Payment Failed', icon: '⚠️', color: 'edge', edge: 'Show retry button, preserve cart state' },
                        { id: 'ck-py-e2', name: 'Session Timeout', icon: '⚠️', color: 'edge', edge: 'Checkout session expired, restart' }
                    ]
                },
                {
                    id: 'ck-confirm', name: 'Step 6: Confirmation', icon: '✅', color: 'order',
                    desc: 'Post-payment success',
                    children: [
                        { id: 'ck-cf-page', name: 'Success Page', icon: '🎉', color: 'order', desc: 'Order number, thank you message' },
                        { id: 'ck-cf-notif', name: 'Confirmation Notif', icon: '🔔', color: 'comm', desc: 'Email + SMS + WhatsApp + push' },
                        { id: 'ck-cf-clear', name: 'Clear Cart', icon: '🛒', color: 'cart', desc: 'Empty cart after successful order' },
                        { id: 'ck-cf-stock', name: 'Inventory Update', icon: '📊', color: 'product', desc: 'Decrement stock counts' },
                        { id: 'ck-cf-e1', name: 'Confirmation Email Failed', icon: '⚠️', color: 'edge', edge: 'Queue retry, show on dashboard' }
                    ]
                }
            ]
        },
        // ── WISHLIST (Phase 7) ──────────────────────────────
        {
            id: 'wishlist', name: 'WISHLIST', icon: '❤️', color: 'customer',
            desc: 'Customer saved items',
            children: [
                { id: 'wl-add', name: 'Add to Wishlist', icon: '➕', color: 'customer', desc: 'Heart icon on product card/page' },
                { id: 'wl-page', name: 'Wishlist Page', icon: '📋', color: 'customer', desc: 'Grid view of saved products' },
                { id: 'wl-tocart', name: 'Move to Cart', icon: '🛒', color: 'cart', desc: 'One-click add to cart from wishlist' },
                { id: 'wl-share', name: 'Share Wishlist', icon: '🔗', color: 'customer', desc: 'Share via link/WhatsApp' },
                {
                    id: 'wl-alerts', name: 'Stock Alerts', icon: '🔔', color: 'comm',
                    desc: 'Notifications for wishlisted items',
                    children: [
                        { id: 'wl-al-back', name: 'Back in Stock', icon: '📦', color: 'comm', desc: 'Notify when OOS item is restocked' },
                        { id: 'wl-al-price', name: 'Price Drop', icon: '📉', color: 'comm', desc: 'Notify when price decreases' },
                        { id: 'wl-al-e1', name: 'Product Deleted', icon: '⚠️', color: 'edge', edge: 'Remove from wishlist, notify customer' }
                    ]
                },
                { id: 'wl-e1', name: 'Variant Discontinued', icon: '⚠️', color: 'edge', edge: 'Wishlisted variant no longer available' },
                { id: 'wl-e2', name: 'Max Wishlist Size', icon: '⚠️', color: 'edge', edge: 'Limit to prevent abuse (e.g. 200 items)' }
            ]
        },
        // ── SELLER DASHBOARD (Phase 8) ──────────────────────
        {
            id: 'seller-dash', name: 'SELLER DASHBOARD', icon: '📊', color: 'seller',
            desc: 'Seller home screen & KPIs',
            children: [
                { id: 'sd-today', name: 'Today\'s Orders', icon: '📦', color: 'seller', desc: 'New orders count, pending fulfillment' },
                { id: 'sd-revenue', name: 'Revenue Summary', icon: '💰', color: 'seller', desc: 'This week / month earnings' },
                { id: 'sd-pending', name: 'Pending Actions', icon: '⏳', color: 'seller', desc: 'Orders to ship, returns to process, reviews to reply' },
                { id: 'sd-health', name: 'Store Health Score', icon: '💚', color: 'seller', desc: 'Composite score: fulfillment, complaints, response time' },
                { id: 'sd-growth', name: 'Growth Metrics', icon: '📈', color: 'seller', desc: 'Month-over-month comparison' },
                { id: 'sd-csat', name: 'Customer Satisfaction', icon: '⭐', color: 'seller', desc: 'Avg rating, NPS score' },
                { id: 'sd-alerts', name: 'System Alerts', icon: '🔔', color: 'seller', desc: 'Low stock, plan expiry, KYC pending' },
                { id: 'sd-fee', name: 'Platform Fee Calculator', icon: '🧮', color: 'seller', desc: 'Transparent breakdown — commission, shipping margin, plan fee, GST before seller commits' },
                { id: 'sd-e1', name: 'Dashboard Data Stale', icon: '⚠️', color: 'edge', edge: 'Cache invalidation, real-time vs batch' }
            ]
        },
        // ── DELIVERY ZONES & SLOTS (Phase 8) ──────────────────
        {
            id: 'delivery-zones', name: 'DELIVERY ZONES & SLOTS', icon: '📍', color: 'shipping',
            desc: 'Zone-based delivery management',
            children: [
                {
                    id: 'dz-zones', name: 'Zone Management', icon: '🗺️', color: 'shipping',
                    desc: 'Create and manage delivery zones',
                    children: [
                        { id: 'dz-z-create', name: 'Create Zone', icon: '➕', color: 'shipping', desc: 'Name, list of pincodes, city/state' },
                        { id: 'dz-z-pricing', name: 'Zone-based Pricing', icon: '💰', color: 'shipping', desc: 'Different shipping rate per zone' },
                        { id: 'dz-z-toggle', name: 'Enable/Disable Zone', icon: '🔄', color: 'shipping', desc: 'Temporarily stop delivery to a zone' },
                        { id: 'dz-z-e1', name: 'Overlapping Zones', icon: '⚠️', color: 'edge', edge: 'Same pincode in multiple zones' }
                    ]
                },
                {
                    id: 'dz-slots', name: 'Time Slot Management', icon: '⏰', color: 'shipping',
                    desc: 'Delivery time windows',
                    children: [
                        { id: 'dz-sl-create', name: 'Create Slots', icon: '➕', color: 'shipping', desc: 'Morning (8-12), Afternoon (12-4), Evening (4-8)' },
                        { id: 'dz-sl-capacity', name: 'Slot Capacity', icon: '📊', color: 'shipping', desc: 'Max orders per slot to prevent overload' },
                        { id: 'dz-sl-cutoff', name: 'Cutoff Time', icon: '⏱️', color: 'shipping', desc: 'Order before 2PM for same-day delivery' },
                        { id: 'dz-sl-e1', name: 'Slot Full', icon: '⚠️', color: 'edge', edge: 'All slots booked, show next available' }
                    ]
                },
                {
                    id: 'dz-types', name: 'Delivery Types', icon: '🚚', color: 'shipping',
                    desc: 'Delivery speed options',
                    children: [
                        { id: 'dz-ty-standard', name: 'Standard (3-7 days)', icon: '📦', color: 'shipping', desc: 'Regular shipping' },
                        { id: 'dz-ty-express', name: 'Express (1-2 days)', icon: '⚡', color: 'shipping', desc: 'Priority shipping, extra charge' },
                        { id: 'dz-ty-sameday', name: 'Same-day Delivery', icon: '🏃', color: 'shipping', desc: 'Order before cutoff, deliver today' },
                        { id: 'dz-ty-scheduled', name: 'Scheduled Delivery', icon: '📅', color: 'shipping', desc: 'Customer picks date & slot' },
                        { id: 'dz-ty-e1', name: 'Unavailable Type', icon: '⚠️', color: 'edge', edge: 'Express unavailable for remote zones' }
                    ]
                },
                { id: 'dz-holiday', name: 'Holiday Config', icon: '🎄', color: 'shipping', desc: 'No-delivery dates (national holidays, custom)' },
                { id: 'dz-e1', name: 'Zone Boundary Dispute', icon: '⚠️', color: 'edge', edge: 'Customer at zone border, courier mismatch' }
            ]
        },
        // ── MULTI-LANGUAGE / i18n (Phase 9) ──────────────────
        {
            id: 'i18n', name: 'MULTI-LANGUAGE (i18n)', icon: '🌐', color: 'widget',
            desc: 'Internationalization & localization',
            children: [
                { id: 'i18-storeLang', name: 'Store Language', icon: '🏪', color: 'widget', desc: 'Primary language selection (Hindi, English, etc.)' },
                {
                    id: 'i18-product', name: 'Product Translations', icon: '📦', color: 'product',
                    desc: 'Multi-language product content',
                    children: [
                        { id: 'i18-p-name', name: 'Title & Description', icon: '📝', color: 'product', desc: 'Translatable rich text fields' },
                        { id: 'i18-p-variant', name: 'Variant Labels', icon: '🔀', color: 'product', desc: 'Size/Color names in other languages' },
                        { id: 'i18-p-e1', name: 'Missing Translation', icon: '⚠️', color: 'edge', edge: 'Fallback to primary language' }
                    ]
                },
                { id: 'i18-ui', name: 'UI String Translations', icon: '🔤', color: 'widget', desc: 'Button labels, menus, form fields' },
                { id: 'i18-email', name: 'Email/SMS Templates', icon: '📧', color: 'comm', desc: 'Per-language notification templates' },
                { id: 'i18-rtl', name: 'RTL Support', icon: '↔️', color: 'widget', desc: 'Arabic, Urdu right-to-left layout' },
                { id: 'i18-auto', name: 'Auto-translate (AI)', icon: '🤖', color: 'widget', desc: 'Google/DeepL API auto-translation' },
                { id: 'i18-e1', name: 'SEO per Language', icon: '⚠️', color: 'edge', edge: 'hreflang tags, language-specific URLs' }
            ]
        },
        // ── REPORTS ENGINE (Phase 9) ──────────────────────────
        {
            id: 'reports', name: 'REPORTS ENGINE', icon: '📋', color: 'analytics',
            desc: 'Custom report generation & scheduling',
            children: [
                {
                    id: 'rp-builder', name: 'Report Builder', icon: '🛠️', color: 'analytics',
                    desc: 'Custom report creation',
                    children: [
                        { id: 'rp-b-fields', name: 'Field Selection', icon: '📋', color: 'analytics', desc: 'Drag-drop columns: orders, revenue, customers' },
                        { id: 'rp-b-filters', name: 'Filters & Date Range', icon: '🔍', color: 'analytics', desc: 'Date range, store, category, status' },
                        { id: 'rp-b-group', name: 'Group By', icon: '📊', color: 'analytics', desc: 'By day/week/month, by product, by category' },
                        { id: 'rp-b-save', name: 'Save Templates', icon: '💾', color: 'analytics', desc: 'Save as reusable report template' }
                    ]
                },
                {
                    id: 'rp-export', name: 'Export Formats', icon: '📤', color: 'analytics',
                    desc: 'Download in multiple formats',
                    children: [
                        { id: 'rp-ex-csv', name: 'CSV Export', icon: '📄', color: 'analytics', desc: 'Comma-separated values' },
                        { id: 'rp-ex-pdf', name: 'PDF Report', icon: '📑', color: 'analytics', desc: 'Formatted PDF with charts' },
                        { id: 'rp-ex-excel', name: 'Excel (.xlsx)', icon: '📊', color: 'analytics', desc: 'Multi-sheet workbook' },
                        { id: 'rp-ex-e1', name: 'Large Dataset', icon: '⚠️', color: 'edge', edge: 'Pagination, streaming, timeout on 100K+ rows' }
                    ]
                },
                {
                    id: 'rp-schedule', name: 'Scheduled Reports', icon: '⏰', color: 'analytics',
                    desc: 'Auto-send reports on schedule',
                    children: [
                        { id: 'rp-sc-daily', name: 'Daily Digest', icon: '📅', color: 'analytics', desc: 'Morning sales summary email' },
                        { id: 'rp-sc-weekly', name: 'Weekly Report', icon: '📊', color: 'analytics', desc: 'Monday morning performance email' },
                        { id: 'rp-sc-monthly', name: 'Monthly Report', icon: '📈', color: 'analytics', desc: 'End-of-month comprehensive report' },
                        { id: 'rp-sc-share', name: 'Share via Link', icon: '🔗', color: 'analytics', desc: 'Shareable report URL with expiry' },
                        { id: 'rp-sc-e1', name: 'Delivery Failure', icon: '⚠️', color: 'edge', edge: 'Email bounce, retry logic' }
                    ]
                },
                {
                    id: 'rp-prebuilt', name: 'Pre-built Reports', icon: '📊', color: 'analytics',
                    desc: 'Ready-made report templates',
                    children: [
                        { id: 'rp-pre-sales', name: 'Sales Report', icon: '💰', color: 'analytics', desc: 'Revenue, orders, AOV by period' },
                        { id: 'rp-pre-inventory', name: 'Inventory Report', icon: '📦', color: 'analytics', desc: 'Stock levels, low stock, dead stock' },
                        { id: 'rp-pre-customer', name: 'Customer Report', icon: '👥', color: 'analytics', desc: 'Acquisition, retention, LTV' },
                        { id: 'rp-pre-tax', name: 'Tax Report', icon: '📊', color: 'analytics', desc: 'GST collected, HSN-wise breakup' },
                        { id: 'rp-pre-payout', name: 'Payout Report', icon: '💸', color: 'analytics', desc: 'Seller earnings, commission, UTR history' },
                        { id: 'rp-pre-utm', name: 'UTM / Campaign Report', icon: '🎯', color: 'analytics', desc: 'Traffic & sales by UTM source, medium, campaign — attribution tracking' }
                    ]
                }
            ]
        },
        // ── COMPLIANCE & LEGAL (Phase 9) ──────────────────────
        {
            id: 'compliance', name: 'COMPLIANCE & LEGAL', icon: '⚖️', color: 'superadmin',
            desc: 'Legal requirements & regulatory compliance',
            children: [
                {
                    id: 'cpl-policies', name: 'Store Policies', icon: '📝', color: 'storeCfg',
                    desc: 'Legal pages management',
                    children: [
                        { id: 'cpl-p-tos', name: 'Terms of Service', icon: '📋', color: 'storeCfg', desc: 'Rich text editor, version history' },
                        { id: 'cpl-p-privacy', name: 'Privacy Policy', icon: '🔒', color: 'storeCfg', desc: 'GDPR/DPDPA compliant template' },
                        { id: 'cpl-p-refund', name: 'Refund Policy', icon: '↩️', color: 'storeCfg', desc: 'Auto-generated from return config' },
                        { id: 'cpl-p-shipping', name: 'Shipping Policy', icon: '🚚', color: 'storeCfg', desc: 'Delivery timelines, zones' },
                        { id: 'cpl-p-e1', name: 'Policy not Updated', icon: '⚠️', color: 'edge', edge: 'Auto-reminder to review every 6 months' }
                    ]
                },
                {
                    id: 'cpl-data', name: 'Data Protection', icon: '🔐', color: 'superadmin',
                    desc: 'GDPR / DPDPA compliance',
                    children: [
                        { id: 'cpl-d-consent', name: 'Cookie Consent', icon: '🍪', color: 'superadmin', desc: 'Banner with accept/reject/customize' },
                        { id: 'cpl-d-delete', name: 'Data Deletion Request', icon: '🗑️', color: 'superadmin', desc: 'Right to forget — delete all PII' },
                        { id: 'cpl-d-export', name: 'Data Export Request', icon: '📤', color: 'superadmin', desc: 'Download all my data (DSAR)' },
                        { id: 'cpl-d-retention', name: 'Data Retention Policy', icon: '📅', color: 'superadmin', desc: 'Auto-delete old data per policy' },
                        { id: 'cpl-d-e1', name: 'Cross-border Transfer', icon: '⚠️', color: 'edge', edge: 'Data localization rules, India DPDPA' }
                    ]
                },
                {
                    id: 'cpl-invoice', name: 'Invoice Compliance', icon: '🧾', color: 'admin',
                    desc: 'GST-compliant invoicing',
                    children: [
                        { id: 'cpl-inv-format', name: 'GST Invoice Format', icon: '📄', color: 'admin', desc: 'GSTIN, HSN, SAC, tax breakup' },
                        { id: 'cpl-inv-sign', name: 'Digital Signature', icon: '✍️', color: 'admin', desc: 'Optional e-sign on invoice PDF' },
                        { id: 'cpl-inv-einvoice', name: 'E-Invoice (IRN)', icon: '📡', color: 'admin', desc: 'Government portal e-invoice generation' },
                        { id: 'cpl-inv-e1', name: 'Invoice Number Gap', icon: '⚠️', color: 'edge', edge: 'Sequential numbering, no gaps allowed' }
                    ]
                },
                { id: 'cpl-age', name: 'Age Verification', icon: '🔞', color: 'superadmin', desc: 'Required for alcohol, tobacco categories' },
                { id: 'cpl-fssai', name: 'FSSAI License', icon: '🏷️', color: 'superadmin', desc: 'Food sellers must display license number' },
                {
                    id: 'cpl-tds', name: 'TDS/TCS Compliance', icon: '💰', color: 'admin',
                    desc: 'Tax deducted/collected at source — legal requirement',
                    children: [
                        { id: 'cpl-tds-calc', name: 'Auto TCS Calculation', icon: '🧮', color: 'admin', desc: '1% TCS on e-commerce sales above threshold per Finance Act' },
                        { id: 'cpl-tds-deduct', name: 'TDS on Payouts', icon: '💸', color: 'admin', desc: 'Deduct TDS before seller payout, issue Form 16A' },
                        { id: 'cpl-tds-report', name: 'TDS/TCS Filing Report', icon: '📊', color: 'admin', desc: 'Quarterly TCS returns, Form 27EQ generation' },
                        { id: 'cpl-tds-e1', name: 'PAN Not Verified', icon: '⚠️', color: 'edge', edge: 'Higher TDS rate (20%) if seller PAN not verified' }
                    ]
                },
                { id: 'cpl-e1', name: 'Compliance Audit', icon: '⚠️', color: 'edge', edge: 'Scheduled platform-wide compliance check' }
            ]
        },
        // ── INFRASTRUCTURE (Phase 9) ──────────────────────────
        {
            id: 'infra', name: 'INFRASTRUCTURE', icon: '🏗️', color: 'analytics',
            desc: 'Platform technical architecture',
            children: [
                {
                    id: 'inf-db', name: 'Database', icon: '🗄️', color: 'analytics',
                    desc: 'Data layer',
                    children: [
                        { id: 'inf-db-pg', name: 'PostgreSQL', icon: '🐘', color: 'analytics', desc: 'Primary relational database' },
                        { id: 'inf-db-prisma', name: 'Prisma ORM', icon: '💎', color: 'analytics', desc: 'Type-safe queries, migrations' },
                        { id: 'inf-db-pool', name: 'Connection Pool', icon: '🔗', color: 'analytics', desc: 'PgBouncer, connection limits' },
                        { id: 'inf-db-backup', name: 'Backups', icon: '💾', color: 'analytics', desc: 'Daily automated backups, point-in-time recovery' },
                        { id: 'inf-db-e1', name: 'DB Migration Failure', icon: '⚠️', color: 'edge', edge: 'Rollback strategy, zero-downtime migrations' }
                    ]
                },
                {
                    id: 'inf-storage', name: 'File Storage', icon: '📁', color: 'analytics',
                    desc: 'Media & document storage',
                    children: [
                        { id: 'inf-st-s3', name: 'S3 / Cloudinary', icon: '☁️', color: 'analytics', desc: 'Image & file upload storage' },
                        { id: 'inf-st-cdn', name: 'CDN', icon: '🌐', color: 'analytics', desc: 'CloudFront / Bunny CDN for fast delivery' },
                        { id: 'inf-st-resize', name: 'Image Processing', icon: '🖼️', color: 'analytics', desc: 'Auto-resize, compress, WebP conversion' },
                        { id: 'inf-st-e1', name: 'Storage Limits', icon: '⚠️', color: 'edge', edge: 'Per-plan storage quota, cleanup policy' }
                    ]
                },
                {
                    id: 'inf-cache', name: 'Caching', icon: '⚡', color: 'analytics',
                    desc: 'Performance acceleration',
                    children: [
                        { id: 'inf-ca-redis', name: 'Redis', icon: '🔴', color: 'analytics', desc: 'Session, cache, rate limiting, queues' },
                        { id: 'inf-ca-api', name: 'API Response Cache', icon: '📦', color: 'analytics', desc: 'Product listings, category trees' },
                        { id: 'inf-ca-invalidate', name: 'Cache Invalidation', icon: '🔄', color: 'analytics', desc: 'Event-based, TTL, manual purge' },
                        { id: 'inf-ca-e1', name: 'Stale Data', icon: '⚠️', color: 'edge', edge: 'Cache-aside pattern, eventual consistency' }
                    ]
                },
                {
                    id: 'inf-jobs', name: 'Background Jobs', icon: '⏰', color: 'analytics',
                    desc: 'Async task processing',
                    children: [
                        { id: 'inf-j-queue', name: 'BullMQ / Redis Queue', icon: '📋', color: 'analytics', desc: 'Job queues with retry & priority' },
                        { id: 'inf-j-email', name: 'Email Worker', icon: '📧', color: 'analytics', desc: 'Send emails asynchronously' },
                        { id: 'inf-j-report', name: 'Report Generator', icon: '📊', color: 'analytics', desc: 'Generate heavy reports in background' },
                        { id: 'inf-j-cron', name: 'Cron Jobs', icon: '🕐', color: 'analytics', desc: 'Subscription billing, cleanup, reminders' },
                        { id: 'inf-j-e1', name: 'Job Stuck', icon: '⚠️', color: 'edge', edge: 'Dead letter queue, max retries, alerting' }
                    ]
                },
                {
                    id: 'inf-monitor', name: 'Monitoring', icon: '📡', color: 'analytics',
                    desc: 'Observability stack',
                    children: [
                        { id: 'inf-m-uptime', name: 'Uptime Monitoring', icon: '💚', color: 'analytics', desc: 'BetterUptime / UptimeRobot' },
                        { id: 'inf-m-apm', name: 'APM (Performance)', icon: '📊', color: 'analytics', desc: 'Sentry, Datadog, NewRelic' },
                        { id: 'inf-m-logs', name: 'Centralized Logging', icon: '📝', color: 'analytics', desc: 'Structured JSON logs, log aggregation' },
                        { id: 'inf-m-alerts', name: 'Alert Rules', icon: '🚨', color: 'analytics', desc: 'PagerDuty/Slack on error spike, high latency' },
                        { id: 'inf-m-e1', name: 'Alert Fatigue', icon: '⚠️', color: 'edge', edge: 'Too many alerts, escalation policies' }
                    ]
                },
                {
                    id: 'inf-cicd', name: 'CI/CD Pipeline', icon: '🔄', color: 'analytics',
                    desc: 'Continuous deployment',
                    children: [
                        { id: 'inf-ci-github', name: 'GitHub Actions', icon: '🐙', color: 'analytics', desc: 'Build, test, deploy automation' },
                        { id: 'inf-ci-staging', name: 'Staging Environment', icon: '🧪', color: 'analytics', desc: 'Test before production deploy' },
                        { id: 'inf-ci-deploy', name: 'Zero-downtime Deploy', icon: '🚀', color: 'analytics', desc: 'Rolling update, blue-green deployment' },
                        { id: 'inf-ci-rollback', name: 'Rollback Strategy', icon: '↩️', color: 'analytics', desc: 'One-click rollback to previous version' },
                        { id: 'inf-ci-e1', name: 'Deploy Failure', icon: '⚠️', color: 'edge', edge: 'Auto-rollback on health check failure' }
                    ]
                },
                { id: 'inf-rateLimit', name: 'Rate Limiting', icon: '⏱️', color: 'analytics', desc: 'Per-IP, per-user, per-API endpoint limits' },
                { id: 'inf-rateStore', name: 'Per-Store Rate Limit', icon: '🏪', color: 'analytics', desc: 'Isolate noisy tenants, per-store API quota' },
                { id: 'inf-ddos', name: 'DDoS / WAF Protection', icon: '🛡️', color: 'analytics', desc: 'Cloudflare WAF, rate limiting, bot detection, IP blacklisting' },
                { id: 'inf-k8s', name: 'Container Orchestration', icon: '🐳', color: 'analytics', desc: 'Docker containers, Kubernetes/ECS, pod auto-scaling, health checks' },
                { id: 'inf-autoscale', name: 'Auto-scaling Config', icon: '📈', color: 'analytics', desc: 'Horizontal pod autoscaler, CPU/memory thresholds, scale-to-zero' },
                { id: 'inf-dbmigrate', name: 'Database Migrations', icon: '🗄️', color: 'analytics', desc: 'Prisma migrate, schema versioning, zero-downtime migration strategy' },
                { id: 'inf-maintenance', name: 'Scheduled Maintenance', icon: '🔧', color: 'analytics', desc: 'Planned downtime page, auto-enable/disable, advance notification' },
                { id: 'inf-changelog', name: 'Changelog / Release Notes', icon: '📝', color: 'analytics', desc: 'Platform updates feed, "What\'s New" in seller dashboard, versioned releases' },
                { id: 'inf-e1', name: 'Cold Start Latency', icon: '⚠️', color: 'edge', edge: 'Serverless cold starts, keep-warm strategy' }
            ]
        },
        // ═══════════════════════════════════════════════════════
        // ══ PHASE 11: AI FEATURES + REMAINING GAPS ═══════════
        // ═══════════════════════════════════════════════════════

        // ── AI ASSISTANT ──────────────────────────────────────
        {
            id: 'ai-assistant', name: 'AI ASSISTANT', icon: '🤖', color: 'superadmin',
            desc: 'Platform-wide AI copilot for sellers & admins',
            children: [
                {
                    id: 'ai-chat', name: 'AI Chat Interface', icon: '💬', color: 'superadmin',
                    desc: 'Chat-based AI help',
                    children: [
                        { id: 'ai-ch-widget', name: 'Chat Widget', icon: '🗨️', color: 'superadmin', desc: 'Floating chat bubble in admin panel' },
                        { id: 'ai-ch-context', name: 'Context Awareness', icon: '🧠', color: 'superadmin', desc: 'AI knows which page seller is on' },
                        { id: 'ai-ch-history', name: 'Chat History', icon: '📋', color: 'superadmin', desc: 'Persistent conversation memory' },
                        { id: 'ai-ch-suggest', name: 'Smart Suggestions', icon: '💡', color: 'superadmin', desc: 'Proactive tips based on store data' },
                        { id: 'ai-ch-multi', name: 'Multi-language Chat', icon: '🌐', color: 'superadmin', desc: 'AI responds in Hindi/English based on seller' },
                        { id: 'ai-ch-e1', name: 'Hallucination Guard', icon: '⚠️', color: 'edge', edge: 'AI gives wrong info, human fallback' },
                        { id: 'ai-ch-e2', name: 'Context Too Long', icon: '⚠️', color: 'edge', edge: 'Conversation exceeds token limit, summarize history' },
                        { id: 'ai-ch-e3', name: 'AI Downtime', icon: '⚠️', color: 'edge', edge: 'OpenAI/Anthropic API down, fallback to FAQ' }
                    ]
                },
                {
                    id: 'ai-actions', name: 'AI Actions', icon: '⚡', color: 'superadmin',
                    desc: 'AI-triggered platform actions',
                    children: [
                        { id: 'ai-ac-product', name: 'Quick Product Create', icon: '📦', color: 'product', desc: '"Add a ₹299 dry fruit box" → auto-creates product' },
                        { id: 'ai-ac-coupon', name: 'Create Coupon', icon: '🎁', color: 'coupon', desc: '"Make a 10% off coupon" → auto-creates FLAT10' },
                        { id: 'ai-ac-order', name: 'Order Lookup', icon: '📦', color: 'order', desc: '"Show orders from last week" → instant report' },
                        { id: 'ai-ac-analytics', name: 'Analytics Q&A', icon: '📊', color: 'analytics', desc: '"What\'s my best seller today?" → instant answer' },
                        { id: 'ai-ac-seo', name: 'SEO Suggestions', icon: '🔍', color: 'widget', desc: '"Improve my product SEO" → rewrites meta tags' },
                        { id: 'ai-ac-bulk', name: 'Bulk Actions', icon: '📦', color: 'product', desc: '"Mark all pending orders as shipped" → batch update' },
                        { id: 'ai-ac-e1', name: 'Wrong Action', icon: '⚠️', color: 'edge', edge: 'AI creates wrong product, undo/confirm flow' },
                        { id: 'ai-ac-e2', name: 'Destructive Action', icon: '⚠️', color: 'edge', edge: '"Delete all products" → double confirm, admin-only' },
                        { id: 'ai-ac-e3', name: 'Ambiguous Command', icon: '⚠️', color: 'edge', edge: 'AI unsure what seller means, clarification prompt' }
                    ]
                },
                {
                    id: 'ai-customer', name: 'Customer AI Chatbot', icon: '🤖', color: 'customer',
                    desc: 'AI support for customers',
                    children: [
                        { id: 'ai-cu-faq', name: 'FAQ Auto-answer', icon: '❓', color: 'customer', desc: 'Trained on store policies & products' },
                        { id: 'ai-cu-track', name: 'Order Tracking', icon: '🚚', color: 'customer', desc: '"Where is my order?" → instant status' },
                        { id: 'ai-cu-recommend', name: 'Product Recommend', icon: '💡', color: 'customer', desc: '"What should I buy for gifting?" → suggestions' },
                        { id: 'ai-cu-escalate', name: 'Human Escalation', icon: '👤', color: 'customer', desc: 'Seamless handoff to human support' },
                        { id: 'ai-cu-return', name: 'Return Assistance', icon: '↩️', color: 'customer', desc: 'AI guides through return process step-by-step' },
                        { id: 'ai-cu-e1', name: 'Wrong Answer', icon: '⚠️', color: 'edge', edge: 'AI misguides, refund/complaint escalation' },
                        { id: 'ai-cu-e2', name: 'Angry Customer', icon: '⚠️', color: 'edge', edge: 'Sentiment detection → immediate human handoff' },
                        { id: 'ai-cu-e3', name: 'Multiple Languages', icon: '⚠️', color: 'edge', edge: 'Customer writes in Hindi/Hinglish, language detection' },
                        { id: 'ai-cu-e4', name: 'PII in Chat', icon: '⚠️', color: 'edge', edge: 'Customer shares card/aadhar number, auto-mask' }
                    ]
                },
                {
                    id: 'ai-config', name: 'AI Configuration', icon: '⚙️', color: 'superadmin',
                    desc: 'AI model & token settings',
                    children: [
                        { id: 'ai-cf-model', name: 'Model Selection', icon: '🧠', color: 'superadmin', desc: 'GPT-4o, Claude, Gemini — configurable' },
                        { id: 'ai-cf-token', name: 'Token Limits', icon: '📊', color: 'superadmin', desc: 'Max tokens per request, daily quota' },
                        { id: 'ai-cf-cost', name: 'Cost Tracking', icon: '💰', color: 'superadmin', desc: 'Per-store AI usage cost monitoring' },
                        { id: 'ai-cf-plan', name: 'AI Credits per Plan', icon: '💎', color: 'plan', desc: 'Free=100/mo, Pro=5000/mo, Enterprise=unlimited' },
                        { id: 'ai-cf-fallback', name: 'Model Fallback Chain', icon: '🔄', color: 'superadmin', desc: 'GPT-4o fails → try Claude → try Gemini' },
                        { id: 'ai-cf-e1', name: 'Token Exhausted', icon: '⚠️', color: 'edge', edge: 'Graceful fallback, upgrade prompt' },
                        { id: 'ai-cf-e2', name: 'API Rate Limiting', icon: '⚠️', color: 'edge', edge: 'OpenAI 429 errors, queue + retry' },
                        { id: 'ai-cf-e3', name: 'Cost Spike Alert', icon: '⚠️', color: 'edge', edge: 'Sudden usage spike, auto-throttle, admin alert' }
                    ]
                }
            ]
        },
        // ── AI BULK CATALOGUE BUILDER ────────────────────────
        {
            id: 'ai-catalogue', name: 'AI CATALOGUE BUILDER', icon: '📦', color: 'product',
            desc: 'AI-powered bulk product creation',
            children: [
                {
                    id: 'aic-input', name: 'Input Methods', icon: '📥', color: 'product',
                    desc: 'Multiple ways to feed products to AI',
                    children: [
                        { id: 'aic-in-image', name: 'Image Upload', icon: '🖼️', color: 'product', desc: 'Upload product photos → AI extracts name, desc, category' },
                        { id: 'aic-in-link', name: 'URL/Link Import', icon: '🔗', color: 'product', desc: 'Paste product URL → AI scrapes & fills details' },
                        { id: 'aic-in-csv', name: 'CSV/Excel Upload', icon: '📊', color: 'product', desc: 'Upload spreadsheet → AI validates & enriches' },
                        { id: 'aic-in-json', name: 'JSON Upload', icon: '📋', color: 'product', desc: 'Bulk JSON → parse & map to product schema' },
                        { id: 'aic-in-voice', name: 'Voice/Text Input', icon: '🎤', color: 'product', desc: '"Add 5 types of almonds from ₹199-₹999"' },
                        { id: 'aic-in-camera', name: 'Camera Scan', icon: '📷', color: 'product', desc: 'Mobile camera → AI reads packaging labels' },
                        { id: 'aic-in-copy', name: 'Copy from Other Store', icon: '📋', color: 'product', desc: 'Import product list from competitor URL' },
                        { id: 'aic-in-e1', name: 'Unsupported Format', icon: '⚠️', color: 'edge', edge: 'File type not recognized, manual fallback' },
                        { id: 'aic-in-e2', name: 'Corrupt File', icon: '⚠️', color: 'edge', edge: 'CSV encoding issue, broken JSON, truncated Excel' },
                        { id: 'aic-in-e3', name: 'Image Too Low-res', icon: '⚠️', color: 'edge', edge: 'AI cannot extract details from blurry/small image' },
                        { id: 'aic-in-e4', name: 'Blocked URL', icon: '⚠️', color: 'edge', edge: 'Target website blocks scraping, CAPTCHA, anti-bot' },
                        { id: 'aic-in-e5', name: 'Massive File (10K+)', icon: '⚠️', color: 'edge', edge: 'File too large, chunked upload, memory limits' }
                    ]
                },
                {
                    id: 'aic-ai-engine', name: 'AI Processing Engine', icon: '🧠', color: 'product',
                    desc: 'How AI creates the catalogue',
                    children: [
                        { id: 'aic-ai-extract', name: 'Data Extraction', icon: '🔍', color: 'product', desc: 'AI reads image/link → extracts title, price, weight, features' },
                        { id: 'aic-ai-desc', name: 'Description Generation', icon: '✍️', color: 'product', desc: 'AI writes SEO-optimized product description' },
                        { id: 'aic-ai-category', name: 'Auto-categorize', icon: '📂', color: 'category', desc: 'AI assigns category & subcategory' },
                        { id: 'aic-ai-variant', name: 'Variant Detection', icon: '🔀', color: 'productSub', desc: 'AI detects sizes/colors from images' },
                        { id: 'aic-ai-price', name: 'Price Suggestion', icon: '💰', color: 'product', desc: 'AI suggests competitive price based on market' },
                        { id: 'aic-ai-seo', name: 'SEO Tags Generation', icon: '🔍', color: 'widget', desc: 'Auto-generate meta title, description, keywords' },
                        { id: 'aic-ai-hsn', name: 'HSN/GST Auto-assign', icon: '📊', color: 'admin', desc: 'AI assigns HSN code & GST rate' },
                        { id: 'aic-ai-img', name: 'Image Enhancement', icon: '🖼️', color: 'product', desc: 'AI removes background, enhances lighting' },
                        { id: 'aic-ai-e1', name: 'Wrong Extraction', icon: '⚠️', color: 'edge', edge: 'AI misreads price/weight, manual correction needed' },
                        { id: 'aic-ai-e2', name: 'Wrong Category', icon: '⚠️', color: 'edge', edge: 'AI categorizes cashew under clothing' },
                        { id: 'aic-ai-e3', name: 'Hallucinated Features', icon: '⚠️', color: 'edge', edge: 'AI invents product features not in source data' },
                        { id: 'aic-ai-e4', name: 'Copyright Content', icon: '⚠️', color: 'edge', edge: 'AI copies competitor description verbatim' },
                        { id: 'aic-ai-e5', name: 'Currency Mismatch', icon: '⚠️', color: 'edge', edge: 'Source shows USD, AI should convert to INR' }
                    ]
                },
                {
                    id: 'aic-phased', name: 'Phase-wise Processing', icon: '📋', color: 'product',
                    desc: 'Process large catalogues in phases (token-aware)',
                    children: [
                        { id: 'aic-ph-batch', name: 'Batch Sizing', icon: '📦', color: 'product', desc: 'Split 500 products into 50-item batches' },
                        { id: 'aic-ph-token', name: 'Token Budget', icon: '🧮', color: 'product', desc: 'Calculate tokens needed per batch, stay within limits' },
                        { id: 'aic-ph-queue', name: 'Queue Processing', icon: '📋', color: 'product', desc: 'Process batch 1 → preview → batch 2 → preview...' },
                        { id: 'aic-ph-progress', name: 'Progress Tracker', icon: '📊', color: 'product', desc: 'Progress bar: 3/10 batches done' },
                        { id: 'aic-ph-pause', name: 'Pause/Resume', icon: '⏸️', color: 'product', desc: 'Seller can pause and resume later' },
                        { id: 'aic-ph-priority', name: 'Priority Queue', icon: '⚡', color: 'product', desc: 'Pro plan gets faster processing queue' },
                        { id: 'aic-ph-e1', name: 'Batch Failure', icon: '⚠️', color: 'edge', edge: 'One batch fails, retry without losing progress' },
                        { id: 'aic-ph-e2', name: 'Session Expired', icon: '⚠️', color: 'edge', edge: 'Browser closed mid-batch, resume from saved state' },
                        { id: 'aic-ph-e3', name: 'Token Rate Exceeded', icon: '⚠️', color: 'edge', edge: 'Hit AI provider rate limit, auto-backoff and retry' },
                        { id: 'aic-ph-e4', name: 'Inconsistent Batches', icon: '⚠️', color: 'edge', edge: 'AI tone/style differs between batches, normalize' }
                    ]
                },
                {
                    id: 'aic-preview', name: 'Preview & Verify', icon: '👁️', color: 'product',
                    desc: 'Seller reviews AI-generated products',
                    children: [
                        { id: 'aic-pv-grid', name: 'Preview Grid', icon: '📊', color: 'product', desc: 'Card view of all generated products' },
                        { id: 'aic-pv-edit', name: 'Inline Edit', icon: '✏️', color: 'product', desc: 'Click any field to manually correct' },
                        { id: 'aic-pv-prompt', name: 'Prompt Refinement', icon: '💬', color: 'product', desc: '"Make all descriptions shorter" → AI re-generates' },
                        { id: 'aic-pv-approve', name: 'Approve / Reject Each', icon: '✅', color: 'product', desc: 'Checkbox per product: approve or reject' },
                        { id: 'aic-pv-bulk-approve', name: 'Bulk Approve', icon: '☑️', color: 'product', desc: 'Select all and publish at once' },
                        { id: 'aic-pv-compare', name: 'Before / After', icon: '🔀', color: 'product', desc: 'Compare original input vs AI output' },
                        { id: 'aic-pv-flag', name: 'AI Confidence Score', icon: '📊', color: 'product', desc: 'Low confidence items flagged yellow for manual review' },
                        { id: 'aic-pv-e1', name: 'All Rejected', icon: '⚠️', color: 'edge', edge: 'Seller rejects all, AI learns from feedback' },
                        { id: 'aic-pv-e2', name: 'Edit Conflicts', icon: '⚠️', color: 'edge', edge: 'Seller edits and AI re-gen overwrite each other' },
                        { id: 'aic-pv-e3', name: 'Prompt Injection', icon: '⚠️', color: 'edge', edge: 'Seller prompt tries to jailbreak AI' },
                        { id: 'aic-pv-e4', name: 'Stale Preview', icon: '⚠️', color: 'edge', edge: 'Preview data outdated if left too long, auto-expire' }
                    ]
                },
                {
                    id: 'aic-publish', name: 'Publish to Store', icon: '🚀', color: 'product',
                    desc: 'Final publish flow',
                    children: [
                        { id: 'aic-pub-draft', name: 'Save as Draft', icon: '📝', color: 'product', desc: 'Save without publishing (review later)' },
                        { id: 'aic-pub-live', name: 'Publish Live', icon: '🟢', color: 'product', desc: 'Approved products go live on store' },
                        { id: 'aic-pub-schedule', name: 'Schedule Publish', icon: '📅', color: 'product', desc: 'Set date/time for go-live' },
                        { id: 'aic-pub-notify', name: 'Auto-notify Customers', icon: '🔔', color: 'comm', desc: 'Send new arrival notification on publish' },
                        { id: 'aic-pub-e1', name: 'Duplicate Product', icon: '⚠️', color: 'edge', edge: 'AI creates duplicate of existing product' },
                        { id: 'aic-pub-e2', name: 'Missing Required Fields', icon: '⚠️', color: 'edge', edge: 'Price/image missing, block publish until fixed' },
                        { id: 'aic-pub-e3', name: 'Inventory Not Set', icon: '⚠️', color: 'edge', edge: 'Stock count zero, warn before publishing' },
                        { id: 'aic-pub-e4', name: 'Prohibited Content', icon: '⚠️', color: 'edge', edge: 'AI-generated content contains banned words/images' }
                    ]
                }
            ]
        },
        // ── AI WEBSITE BUILDER ──────────────────────────────
        {
            id: 'ai-website', name: 'AI WEBSITE BUILDER', icon: '🌐', color: 'widget',
            desc: 'AI-powered store website creation & editing',
            children: [
                {
                    id: 'aiw-setup', name: 'Initial Setup', icon: '🚀', color: 'widget',
                    desc: 'AI creates entire website from scratch',
                    children: [
                        { id: 'aiw-st-biz', name: 'Business Info Input', icon: '🏢', color: 'widget', desc: 'Name, category, target audience, style preference' },
                        { id: 'aiw-st-sample', name: 'Sample Products', icon: '📦', color: 'widget', desc: 'AI uses existing products or sample data' },
                        { id: 'aiw-st-brand', name: 'Brand Kit Upload', icon: '🎨', color: 'widget', desc: 'Logo, colors, fonts → AI applies everywhere' },
                        { id: 'aiw-st-ref', name: 'Reference URL', icon: '🔗', color: 'widget', desc: '"Make it look like X" → AI copies style' },
                        { id: 'aiw-st-industry', name: 'Industry Templates', icon: '🏪', color: 'widget', desc: 'Pre-trained for food, fashion, electronics, beauty' },
                        { id: 'aiw-st-e1', name: 'Vague Input', icon: '⚠️', color: 'edge', edge: 'AI asks follow-up questions for clarity' },
                        { id: 'aiw-st-e2', name: 'Low-Quality Logo', icon: '⚠️', color: 'edge', edge: 'Logo too small/blurry, AI upscales or asks re-upload' },
                        { id: 'aiw-st-e3', name: 'Ref Site Unavailable', icon: '⚠️', color: 'edge', edge: 'Reference URL blocked/down, fallback to templates' }
                    ]
                },
                {
                    id: 'aiw-generation', name: 'Phase-wise Generation', icon: '🧠', color: 'widget',
                    desc: 'AI builds website step by step',
                    children: [
                        { id: 'aiw-gn-phase1', name: 'Phase 1: Layout', icon: '📐', color: 'widget', desc: 'AI generates page structure & navigation' },
                        { id: 'aiw-gn-phase2', name: 'Phase 2: Content', icon: '📝', color: 'widget', desc: 'AI writes headlines, about us, CTAs' },
                        { id: 'aiw-gn-phase3', name: 'Phase 3: Styling', icon: '🎨', color: 'widget', desc: 'AI applies colors, fonts, spacing' },
                        { id: 'aiw-gn-phase4', name: 'Phase 4: Widgets', icon: '🧩', color: 'widget', desc: 'AI places banners, product grids, testimonials' },
                        { id: 'aiw-gn-phase5', name: 'Phase 5: SEO', icon: '🔍', color: 'widget', desc: 'AI adds meta tags, OG images, schema.org' },
                        { id: 'aiw-gn-phase6', name: 'Phase 6: Mobile', icon: '📱', color: 'widget', desc: 'AI optimizes responsive mobile layout' },
                        { id: 'aiw-gn-token', name: 'Token-aware Batching', icon: '🧮', color: 'widget', desc: 'Each phase within token budget' },
                        { id: 'aiw-gn-e1', name: 'Phase Failed', icon: '⚠️', color: 'edge', edge: 'Retry phase, manual override option' },
                        { id: 'aiw-gn-e2', name: 'Style Inconsistency', icon: '⚠️', color: 'edge', edge: 'Different phases produce clashing styles' },
                        { id: 'aiw-gn-e3', name: 'Content Too Generic', icon: '⚠️', color: 'edge', edge: 'AI produces template-like content, needs seller input' },
                        { id: 'aiw-gn-e4', name: 'Accessibility Fail', icon: '⚠️', color: 'edge', edge: 'AI-generated site fails WCAG, auto-fix contrast/alt-text' }
                    ]
                },
                {
                    id: 'aiw-preview', name: 'Preview & Edit', icon: '👁️', color: 'widget',
                    desc: 'Seller reviews AI-generated website',
                    children: [
                        { id: 'aiw-pv-live', name: 'Live Preview', icon: '🖥️', color: 'widget', desc: 'Full website preview (desktop + mobile)' },
                        { id: 'aiw-pv-prompt', name: 'Prompt Editing', icon: '💬', color: 'widget', desc: '"Make header bigger" → AI re-generates section' },
                        { id: 'aiw-pv-manual', name: 'Manual Drag-Drop', icon: '✋', color: 'widget', desc: 'Seller drags widgets, changes text inline' },
                        { id: 'aiw-pv-undo', name: 'Undo / Redo', icon: '↩️', color: 'widget', desc: 'Full version history, revert any change' },
                        { id: 'aiw-pv-ab', name: 'A/B Variants', icon: '🔀', color: 'widget', desc: 'AI generates 2-3 design options to choose from' },
                        { id: 'aiw-pv-speed', name: 'Performance Score', icon: '⚡', color: 'widget', desc: 'Lighthouse score shown in preview (target >90)' },
                        { id: 'aiw-pv-e1', name: 'Layout Broken', icon: '⚠️', color: 'edge', edge: 'AI edit breaks layout, auto-fix or revert' },
                        { id: 'aiw-pv-e2', name: 'Prompt Injection', icon: '⚠️', color: 'edge', edge: 'Seller prompt tries to inject malicious code/script' },
                        { id: 'aiw-pv-e3', name: 'Mobile Overflow', icon: '⚠️', color: 'edge', edge: 'Desktop design breaks on mobile, horizontal scroll' },
                        { id: 'aiw-pv-e4', name: 'Mixed AI + Manual', icon: '⚠️', color: 'edge', edge: 'AI re-gen overwrites manual edits, version conflict' },
                        { id: 'aiw-pv-e5', name: 'Preview != Production', icon: '⚠️', color: 'edge', edge: 'Preview looks different from live due to caching/CDN' }
                    ]
                },
                {
                    id: 'aiw-pages', name: 'AI Page Generation', icon: '📄', color: 'widget',
                    desc: 'Generate individual pages',
                    children: [
                        { id: 'aiw-pg-home', name: 'Home Page', icon: '🏠', color: 'widget', desc: 'Hero banner, featured products, categories, testimonials' },
                        { id: 'aiw-pg-about', name: 'About Us', icon: '📝', color: 'widget', desc: 'AI writes brand story from business info' },
                        { id: 'aiw-pg-contact', name: 'Contact Page', icon: '📧', color: 'widget', desc: 'Form, map, WhatsApp button, hours' },
                        { id: 'aiw-pg-faq', name: 'FAQ Page', icon: '❓', color: 'widget', desc: 'AI generates FAQs from products & policies' },
                        { id: 'aiw-pg-landing', name: 'Landing Pages', icon: '📄', color: 'widget', desc: 'Sale/campaign specific landing pages' },
                        { id: 'aiw-pg-custom', name: 'Custom Pages', icon: '➕', color: 'widget', desc: '"Create a page about our farm" → AI builds it' },
                        { id: 'aiw-pg-e1', name: 'Content Inaccuracy', icon: '⚠️', color: 'edge', edge: 'AI invents facts, manual verification needed' },
                        { id: 'aiw-pg-e2', name: 'SEO Duplicate', icon: '⚠️', color: 'edge', edge: 'AI creates pages with same meta tags, cannibalization' },
                        { id: 'aiw-pg-e3', name: 'Broken Links', icon: '⚠️', color: 'edge', edge: 'AI links to deleted products/categories' },
                        { id: 'aiw-pg-e4', name: 'Image Attribution', icon: '⚠️', color: 'edge', edge: 'AI uses stock images without license' }
                    ]
                },
                {
                    id: 'aiw-ongoing', name: 'Ongoing AI Updates', icon: '🔄', color: 'widget',
                    desc: 'AI keeps website fresh',
                    children: [
                        { id: 'aiw-on-seasonal', name: 'Seasonal Themes', icon: '🎄', color: 'widget', desc: 'AI auto-suggests Diwali/Christmas themes' },
                        { id: 'aiw-on-banner', name: 'Auto-generate Banners', icon: '🖼️', color: 'widget', desc: 'AI creates sale banners from coupon data' },
                        { id: 'aiw-on-copy', name: 'Copy Refresh', icon: '✍️', color: 'widget', desc: 'AI A/B tests different headlines weekly' },
                        { id: 'aiw-on-review', name: 'Auto Social Proof', icon: '⭐', color: 'widget', desc: 'AI highlights top reviews on product pages automatically' },
                        { id: 'aiw-on-e1', name: 'Over-optimization', icon: '⚠️', color: 'edge', edge: 'Too many auto-changes confuse customers' },
                        { id: 'aiw-on-e2', name: 'Seasonal Mismatch', icon: '⚠️', color: 'edge', edge: 'AI applies Christmas theme to non-Christmas store' },
                        { id: 'aiw-on-e3', name: 'Auto-update Breaks Live', icon: '⚠️', color: 'edge', edge: 'Scheduled auto-update breaks live site, rollback needed' }
                    ]
                }
            ]
        },
        // ── SEARCH & DISCOVERY ──────────────────────────────
        {
            id: 'search', name: 'SEARCH & DISCOVERY', icon: '🔍', color: 'widget',
            desc: 'Product search & browsing experience',
            children: [
                {
                    id: 'sr-search', name: 'Search Engine', icon: '🔍', color: 'widget',
                    desc: 'Product search functionality',
                    children: [
                        { id: 'sr-s-auto', name: 'Autocomplete', icon: '💡', color: 'widget', desc: 'Type-ahead suggestions as user types' },
                        { id: 'sr-s-fuzzy', name: 'Fuzzy Matching', icon: '🔤', color: 'widget', desc: 'Handle typos: "almnds" → "almonds"' },
                        { id: 'sr-s-rank', name: 'Relevance Ranking', icon: '📊', color: 'widget', desc: 'Sort by relevance, popularity, rating' },
                        { id: 'sr-s-ai', name: 'AI Semantic Search', icon: '🧠', color: 'widget', desc: '"healthy snacks under 500" → smart results' },
                        { id: 'sr-s-e1', name: 'Zero Results', icon: '⚠️', color: 'edge', edge: 'Show "did you mean?" or related products' }
                    ]
                },
                {
                    id: 'sr-filters', name: 'Filters & Facets', icon: '🎛️', color: 'widget',
                    desc: 'Narrow down results',
                    children: [
                        { id: 'sr-f-price', name: 'Price Range Slider', icon: '💰', color: 'widget', desc: 'Min-max price filter' },
                        { id: 'sr-f-category', name: 'Category Filter', icon: '📂', color: 'widget', desc: 'Filter by category tree' },
                        { id: 'sr-f-rating', name: 'Rating Filter', icon: '⭐', color: 'widget', desc: '4★ and above' },
                        { id: 'sr-f-attr', name: 'Attribute Filters', icon: '🏷️', color: 'widget', desc: 'Size, color, brand, weight' },
                        { id: 'sr-f-instock', name: 'In-stock Only', icon: '✅', color: 'widget', desc: 'Hide out-of-stock products' }
                    ]
                },
                {
                    id: 'sr-sort', name: 'Sort Options', icon: '🔢', color: 'widget',
                    desc: 'Result ordering',
                    children: [
                        { id: 'sr-so-popular', name: 'Popularity', icon: '🔥', color: 'widget', desc: 'Most ordered first' },
                        { id: 'sr-so-price', name: 'Price (Low/High)', icon: '💰', color: 'widget', desc: 'Ascending or descending price' },
                        { id: 'sr-so-newest', name: 'Newest First', icon: '🆕', color: 'widget', desc: 'Recently added products' },
                        { id: 'sr-so-rating', name: 'Avg Rating', icon: '⭐', color: 'widget', desc: 'Highest rated first' }
                    ]
                },
                {
                    id: 'sr-analytics', name: 'Search Analytics', icon: '📊', color: 'analytics',
                    desc: 'What customers search for',
                    children: [
                        { id: 'sr-an-top', name: 'Top Search Terms', icon: '🏆', color: 'analytics', desc: 'Most searched keywords' },
                        { id: 'sr-an-zero', name: 'Zero-result Queries', icon: '❌', color: 'analytics', desc: 'Search terms with no results → product gap' },
                        { id: 'sr-an-convert', name: 'Search-to-Purchase', icon: '📈', color: 'analytics', desc: 'Conversion rate from search' },
                        { id: 'sr-an-e1', name: 'Search Abuse', icon: '⚠️', color: 'edge', edge: 'Bot scraping, rate limit search API' }
                    ]
                }
            ]
        },
        // ── PRODUCT RECOMMENDATIONS ────────────────────────
        {
            id: 'recommendations', name: 'PRODUCT RECOMMENDATIONS', icon: '💡', color: 'product',
            desc: 'AI-powered product suggestions',
            children: [
                { id: 'rec-similar', name: 'Similar Products', icon: '🔀', color: 'product', desc: '"You may also like" on product page' },
                { id: 'rec-bought', name: 'Frequently Bought Together', icon: '🛒', color: 'product', desc: 'Bundle suggestions at cart/checkout' },
                { id: 'rec-personal', name: 'Personalized Feed', icon: '👤', color: 'customer', desc: 'Based on browse/purchase history' },
                { id: 'rec-trending', name: 'Trending Now', icon: '🔥', color: 'product', desc: 'Most popular products today' },
                { id: 'rec-new', name: 'New Arrivals', icon: '🆕', color: 'product', desc: 'Recently added products widget' },
                { id: 'rec-ai', name: 'AI Recommendation Engine', icon: '🧠', color: 'product', desc: 'Collaborative filtering, content-based filtering' },
                { id: 'rec-e1', name: 'Cold Start', icon: '⚠️', color: 'edge', edge: 'New user/product with no data → popular fallback' }
            ]
        },
        // ── FLASH SALES ──────────────────────────────────────
        {
            id: 'flash-sales', name: 'FLASH SALES', icon: '⚡', color: 'coupon',
            desc: 'Time-limited deals',
            children: [
                { id: 'fs-create', name: 'Create Flash Sale', icon: '➕', color: 'coupon', desc: 'Select products, set discount, start/end time' },
                { id: 'fs-countdown', name: 'Countdown Timer', icon: '⏰', color: 'coupon', desc: 'Real-time countdown on product page' },
                { id: 'fs-stock', name: 'Limited Stock', icon: '📊', color: 'coupon', desc: '"Only 5 left!" urgency indicator' },
                { id: 'fs-notify', name: 'Sale Notification', icon: '🔔', color: 'comm', desc: 'Push/email/WhatsApp when sale starts' },
                { id: 'fs-banner', name: 'Auto-banner', icon: '🖼️', color: 'widget', desc: 'Flash sale banner on homepage' },
                { id: 'fs-e1', name: 'Overselling', icon: '⚠️', color: 'edge', edge: 'Stock runs out mid-sale, concurrent limit' },
                { id: 'fs-e2', name: 'Price Manipulation', icon: '⚠️', color: 'edge', edge: 'Increase price before sale to fake discount' }
            ]
        },
        // ── AFFILIATE / REFERRAL PROGRAM ──────────────────
        {
            id: 'affiliate', name: 'AFFILIATE PROGRAM', icon: '🤝', color: 'coupon',
            desc: 'Referral & affiliate marketing system',
            children: [
                { id: 'aff-signup', name: 'Affiliate Signup', icon: '📝', color: 'coupon', desc: 'Apply to become affiliate' },
                { id: 'aff-link', name: 'Unique Referral Links', icon: '🔗', color: 'coupon', desc: 'Per-affiliate tracking URL' },
                { id: 'aff-commission', name: 'Commission Rules', icon: '💰', color: 'coupon', desc: '% or flat per sale, per category' },
                { id: 'aff-dashboard', name: 'Affiliate Dashboard', icon: '📊', color: 'analytics', desc: 'Clicks, conversions, earnings' },
                { id: 'aff-payout', name: 'Affiliate Payouts', icon: '💸', color: 'admin', desc: 'Min threshold, payout schedule' },
                { id: 'aff-tiers', name: 'Tier System', icon: '🏆', color: 'coupon', desc: 'Bronze/Silver/Gold affiliate levels' },
                { id: 'aff-e1', name: 'Self-referral Fraud', icon: '⚠️', color: 'edge', edge: 'Same IP/device detection, cookie stuffing' }
            ]
        },
        // ── BLOG / CMS ──────────────────────────────────────
        {
            id: 'blog', name: 'BLOG / CMS', icon: '📝', color: 'widget',
            desc: 'Content marketing & SEO pages',
            children: [
                { id: 'blog-editor', name: 'Rich Text Editor', icon: '✍️', color: 'widget', desc: 'WYSIWYG blog post editor' },
                { id: 'blog-ai', name: 'AI Blog Writer', icon: '🤖', color: 'widget', desc: '"Write about benefits of dry fruits" → full article' },
                { id: 'blog-seo', name: 'Blog SEO', icon: '🔍', color: 'widget', desc: 'Meta tags, slug, canonical URL' },
                { id: 'blog-schedule', name: 'Schedule Posts', icon: '📅', color: 'widget', desc: 'Publish at future date/time' },
                { id: 'blog-categories', name: 'Blog Categories', icon: '📂', color: 'widget', desc: 'Organize posts by topic' },
                { id: 'blog-product-link', name: 'Product Embedding', icon: '📦', color: 'product', desc: 'Embed product cards inside blog posts' },
                { id: 'blog-e1', name: 'AI Content Quality', icon: '⚠️', color: 'edge', edge: 'AI writes generic content, needs editing' }
            ]
        },
        // ── WEBHOOKS / PUBLIC API ──────────────────────────
        {
            id: 'webhooks', name: 'WEBHOOKS & API', icon: '🔌', color: 'analytics',
            desc: 'Developer integrations',
            children: [
                { id: 'wh-manage', name: 'Webhook Management', icon: '📋', color: 'analytics', desc: 'Create, edit, delete webhook endpoints' },
                { id: 'wh-events', name: 'Event Types', icon: '⚡', color: 'analytics', desc: 'order.created, payment.success, product.updated...' },
                { id: 'wh-secret', name: 'Webhook Secret', icon: '🔐', color: 'analytics', desc: 'HMAC signature verification' },
                { id: 'wh-logs', name: 'Delivery Logs', icon: '📝', color: 'analytics', desc: 'Request/response, status, retry history' },
                { id: 'wh-retry', name: 'Auto-retry', icon: '🔄', color: 'analytics', desc: 'Exponential backoff on failure' },
                { id: 'wh-api-keys', name: 'API Key Management', icon: '🔑', color: 'analytics', desc: 'Generate/revoke API keys per integration' },
                { id: 'wh-docs', name: 'API Documentation', icon: '📖', color: 'analytics', desc: 'Auto-generated Swagger/OpenAPI docs' },
                { id: 'wh-version', name: 'API Versioning', icon: '🔢', color: 'analytics', desc: 'v1/v2 versioned endpoints, backward compatibility, deprecation notices' },
                { id: 'wh-graphql', name: 'GraphQL API', icon: '⚡', color: 'analytics', desc: 'Flexible GraphQL layer for custom integrations, storefront API, mobile apps' },
                { id: 'wh-e1', name: 'Webhook Flood', icon: '⚠️', color: 'edge', edge: 'Rate limiting outbound webhooks, circuit breaker' },
                { id: 'wh-e2', name: 'API Version Sunset', icon: '⚠️', color: 'edge', edge: 'v1 deprecated — migration deadline, fallback, breaking change notification' }
            ]
        },
        // ── LIVE CHAT / SUPPORT ──────────────────────────────
        {
            id: 'live-chat', name: 'LIVE CHAT', icon: '💬', color: 'comm',
            desc: 'Real-time customer ↔ seller chat',
            children: [
                { id: 'lc-widget', name: 'Chat Widget', icon: '🗨️', color: 'comm', desc: 'Floating chat bubble on store' },
                { id: 'lc-inbox', name: 'Seller Inbox', icon: '📥', color: 'comm', desc: 'All customer conversations in one place' },
                { id: 'lc-ai-first', name: 'AI First Responder', icon: '🤖', color: 'comm', desc: 'AI answers first, escalates to human if needed' },
                { id: 'lc-attach', name: 'File Attachments', icon: '📎', color: 'comm', desc: 'Send images, docs in chat' },
                { id: 'lc-canned', name: 'Canned Responses', icon: '📋', color: 'comm', desc: 'Quick reply templates' },
                { id: 'lc-hours', name: 'Business Hours', icon: '🕐', color: 'comm', desc: 'Auto-reply outside business hours' },
                { id: 'lc-e1', name: 'Spam/Abuse', icon: '⚠️', color: 'edge', edge: 'Block user, rate limit messages' }
            ]
        },
        // ── CUSTOMER SEGMENTATION ──────────────────────────
        {
            id: 'segmentation', name: 'CUSTOMER SEGMENTATION', icon: '👥', color: 'analytics',
            desc: 'Group customers for targeted marketing',
            children: [
                { id: 'seg-rfm', name: 'RFM Analysis', icon: '📊', color: 'analytics', desc: 'Recency, Frequency, Monetary value scoring' },
                { id: 'seg-groups', name: 'Customer Groups', icon: '👥', color: 'analytics', desc: 'VIP, At-risk, New, Dormant, Champions' },
                { id: 'seg-auto', name: 'Auto-segment', icon: '🤖', color: 'analytics', desc: 'AI auto-assigns customers to groups' },
                { id: 'seg-target', name: 'Targeted Campaigns', icon: '🎯', color: 'comm', desc: 'Send specific coupons/offers to segments' },
                { id: 'seg-custom', name: 'Custom Segments', icon: '📋', color: 'analytics', desc: 'Filter by: total spend > ₹5000, orders > 3' },
                { id: 'seg-e1', name: 'Small Segments', icon: '⚠️', color: 'edge', edge: 'Too few customers in segment, merge suggestion' }
            ]
        },
        // ═══════════════════════════════════════════════════════
        // ══ PHASE 12: FINAL MISSING FEATURES ═════════════════
        // ═══════════════════════════════════════════════════════

        // ── GIFT CARDS ──────────────────────────────────────
        {
            id: 'gift-cards', name: 'GIFT CARDS', icon: '🎁', color: 'coupon',
            desc: 'Digital gift card system',
            children: [
                { id: 'gc-create', name: 'Create Gift Card', icon: '➕', color: 'coupon', desc: 'Set denomination: ₹500, ₹1000, ₹2000, custom' },
                { id: 'gc-design', name: 'Card Design', icon: '🎨', color: 'coupon', desc: 'Choose template, add personal message' },
                { id: 'gc-deliver', name: 'Delivery Method', icon: '📧', color: 'comm', desc: 'Email, SMS, WhatsApp delivery to recipient' },
                { id: 'gc-redeem', name: 'Redeem at Checkout', icon: '💰', color: 'coupon', desc: 'Enter gift card code, partial/full redemption' },
                { id: 'gc-balance', name: 'Balance Check', icon: '📊', color: 'coupon', desc: 'Check remaining balance on gift card' },
                { id: 'gc-expire', name: 'Expiry Configuration', icon: '📅', color: 'coupon', desc: 'Set validity: 6mo, 1yr, never' },
                { id: 'gc-corporate', name: 'Bulk Corporate', icon: '🏢', color: 'coupon', desc: 'Bulk gift cards for corporate gifting' },
                { id: 'gc-e1', name: 'Code Brute Force', icon: '⚠️', color: 'edge', edge: 'Rate limit code entry, CAPTCHA after 3 fails' },
                { id: 'gc-e2', name: 'Expired Card Refund', icon: '⚠️', color: 'edge', edge: 'Customer wants refund for expired unused card' },
                { id: 'gc-e3', name: 'Partial Use + Return', icon: '⚠️', color: 'edge', edge: 'Order paid with gift card gets returned, refund to card or wallet?' }
            ]
        },
        // ── PRODUCT BUNDLES / COMBOS ────────────────────────
        {
            id: 'bundles', name: 'PRODUCT BUNDLES', icon: '📦', color: 'product',
            desc: 'Combo packs & bundled pricing',
            children: [
                { id: 'bn-create', name: 'Create Bundle', icon: '➕', color: 'product', desc: 'Select 2+ products, set bundle price' },
                { id: 'bn-discount', name: 'Bundle Discount', icon: '💰', color: 'product', desc: 'Flat amount off or % off vs individual prices' },
                { id: 'bn-display', name: 'Bundle Page', icon: '🖥️', color: 'product', desc: 'Show savings: "Save ₹200 with this combo"' },
                { id: 'bn-inventory', name: 'Linked Inventory', icon: '📊', color: 'product', desc: 'Bundle stock = min(item stocks)' },
                { id: 'bn-mix', name: 'Mix & Match', icon: '🔀', color: 'product', desc: '"Pick any 3 dry fruits for ₹999"' },
                { id: 'bn-cross', name: 'Cross-sell Bundles', icon: '🛒', color: 'product', desc: 'Auto-suggest bundles at cart' },
                { id: 'bn-e1', name: 'Component Out of Stock', icon: '⚠️', color: 'edge', edge: 'One item in bundle goes OOS' },
                { id: 'bn-e2', name: 'Partial Return', icon: '⚠️', color: 'edge', edge: 'Customer returns 1 item from bundle, recalculate price' },
                { id: 'bn-e3', name: 'Bundle + Coupon Stack', icon: '⚠️', color: 'edge', edge: 'Can coupon apply on already-discounted bundle?' }
            ]
        },
        // ── STORE MIGRATION / IMPORT ────────────────────────
        {
            id: 'migration', name: 'STORE MIGRATION', icon: '📦', color: 'store',
            desc: 'Import from other platforms',
            children: [
                { id: 'mg-shopify', name: 'Shopify Import', icon: '🛒', color: 'store', desc: 'Import products, customers, orders from Shopify' },
                { id: 'mg-woo', name: 'WooCommerce Import', icon: '🛒', color: 'store', desc: 'WooCommerce CSV/API migration' },
                { id: 'mg-csv', name: 'Generic CSV Import', icon: '📊', color: 'store', desc: 'Map CSV columns to platform fields' },
                { id: 'mg-images', name: 'Image Migration', icon: '🖼️', color: 'store', desc: 'Bulk download & re-host product images' },
                { id: 'mg-customers', name: 'Customer Import', icon: '👥', color: 'customer', desc: 'Import customer list with consent' },
                { id: 'mg-orders', name: 'Order History', icon: '📦', color: 'order', desc: 'Import past orders for continuity' },
                { id: 'mg-seo', name: 'URL Redirect Map', icon: '🔗', color: 'widget', desc: 'Old URLs → new URLs, preserve SEO juice' },
                { id: 'mg-e1', name: 'Data Mapping Mismatch', icon: '⚠️', color: 'edge', edge: 'Source fields dont match destination schema' },
                { id: 'mg-e2', name: 'Duplicate Detection', icon: '⚠️', color: 'edge', edge: 'Product already exists, merge or skip?' },
                { id: 'mg-e3', name: 'Image Download Fail', icon: '⚠️', color: 'edge', edge: 'Source images 404, broken links' },
                { id: 'mg-e4', name: 'Customer Consent', icon: '⚠️', color: 'edge', edge: 'GDPR: re-consent required for imported customers' },
                { id: 'mg-clone', name: 'Store Cloning / Template', icon: '📋', color: 'store', desc: 'Clone a successful store setup to create new stores instantly — copy products, settings, theme' }
            ]
        },
        // ── GUEST CHECKOUT ──────────────────────────────────
        {
            id: 'guest-checkout', name: 'GUEST CHECKOUT', icon: '🛒', color: 'order',
            desc: 'Buy without creating account',
            children: [
                { id: 'gco-enable', name: 'Enable/Disable Toggle', icon: '⚙️', color: 'order', desc: 'Seller controls guest checkout option' },
                { id: 'gco-flow', name: 'Checkout Flow', icon: '📋', color: 'order', desc: 'Email + phone + address → pay → done' },
                { id: 'gco-tracking', name: 'Order Tracking', icon: '🚚', color: 'order', desc: 'Track via email link, no login needed' },
                { id: 'gco-convert', name: 'Convert to Account', icon: '👤', color: 'customer', desc: 'Post-purchase: "Create account to track easily"' },
                { id: 'gco-history', name: 'Order Lookup', icon: '🔍', color: 'order', desc: 'Enter email + order# to view order' },
                { id: 'gco-e1', name: 'Repeat Guest', icon: '⚠️', color: 'edge', edge: 'Same email multiple guest orders, merge on signup' },
                { id: 'gco-e2', name: 'Wallet/Loyalty Miss', icon: '⚠️', color: 'edge', edge: 'Guest misses loyalty points, prompt to signup' },
                { id: 'gco-e3', name: 'Return Without Account', icon: '⚠️', color: 'edge', edge: 'Guest wants return, refund to original payment only' }
            ]
        },
        // ── STORE POLICIES ──────────────────────────────────
        {
            id: 'policies', name: 'STORE POLICIES', icon: '📜', color: 'widget',
            desc: 'Legal & policy pages',
            children: [
                { id: 'pol-return', name: 'Return Policy', icon: '↩️', color: 'widget', desc: 'Return window, conditions, process' },
                { id: 'pol-refund', name: 'Refund Policy', icon: '💰', color: 'widget', desc: 'Refund timeline, method, partial refund rules' },
                { id: 'pol-shipping', name: 'Shipping Policy', icon: '🚚', color: 'widget', desc: 'Delivery times, charges, COD rules' },
                { id: 'pol-privacy', name: 'Privacy Policy', icon: '🔐', color: 'widget', desc: 'Data collection, usage, sharing' },
                { id: 'pol-terms', name: 'Terms & Conditions', icon: '📋', color: 'widget', desc: 'User agreement, platform rules' },
                { id: 'pol-ai-gen', name: 'AI Policy Generator', icon: '🤖', color: 'widget', desc: 'AI auto-generates policies from store config' },
                { id: 'pol-footer', name: 'Footer Links', icon: '🔗', color: 'widget', desc: 'Auto-link policies in footer' },
                { id: 'pol-e1', name: 'Missing Policy', icon: '⚠️', color: 'edge', edge: 'Warn seller if no return/refund policy set' },
                { id: 'pol-e2', name: 'Policy vs Practice', icon: '⚠️', color: 'edge', edge: 'Policy says 7-day return but seller rejects at day 5' }
            ]
        },
        // ── SOCIAL COMMERCE ──────────────────────────────────
        {
            id: 'social', name: 'SOCIAL COMMERCE', icon: '📱', color: 'comm',
            desc: 'Social media selling & sharing',
            children: [
                { id: 'soc-share', name: 'Product Share Buttons', icon: '🔗', color: 'comm', desc: 'WhatsApp, Instagram, Facebook, Twitter share' },
                { id: 'soc-whatsapp', name: 'WhatsApp Catalogue', icon: '💬', color: 'comm', desc: 'Auto-sync products to WhatsApp Business catalogue' },
                { id: 'soc-insta', name: 'Instagram Shopping', icon: '📸', color: 'comm', desc: 'Tag products in Instagram posts' },
                { id: 'soc-fb-shop', name: 'Facebook Shop', icon: '📘', color: 'comm', desc: 'Sync products to Facebook Shop' },
                { id: 'soc-ugc', name: 'User-generated Content', icon: '📷', color: 'comm', desc: 'Customer photos/videos with product' },
                { id: 'soc-proof', name: 'Social Proof Popup', icon: '🔔', color: 'comm', desc: '"Rahul from Mumbai just bought X" live popup' },
                { id: 'soc-influencer', name: 'Influencer Tracking', icon: '⭐', color: 'comm', desc: 'Track sales from influencer campaigns' },
                { id: 'soc-e1', name: 'API Changes', icon: '⚠️', color: 'edge', edge: 'Instagram/Facebook API deprecation, breaking changes' },
                { id: 'soc-e2', name: 'Fake Social Proof', icon: '⚠️', color: 'edge', edge: 'Fake popup abuse, customer trust issue' }
            ]
        },
        // ── PRINT & PACKAGING ──────────────────────────────
        {
            id: 'print', name: 'PRINT & PACKAGING', icon: '🖨️', color: 'shipping',
            desc: 'Shipping labels, invoices, slips',
            children: [
                { id: 'pt-label', name: 'Shipping Label', icon: '🏷️', color: 'shipping', desc: 'Auto-generate shipping label with address, AWB' },
                { id: 'pt-invoice', name: 'Invoice PDF', icon: '🧾', color: 'shipping', desc: 'GST-compliant invoice auto-print' },
                { id: 'pt-packing', name: 'Packing Slip', icon: '📋', color: 'shipping', desc: 'Item list for warehouse picker' },
                { id: 'pt-bulk', name: 'Bulk Print', icon: '📦', color: 'shipping', desc: 'Print 50 labels at once for bulk shipment' },
                { id: 'pt-barcode', name: 'Product Barcode', icon: '📊', color: 'product', desc: 'Generate barcode/QR per SKU' },
                { id: 'pt-thermal', name: 'Thermal Printer', icon: '🖨️', color: 'shipping', desc: '4x6 thermal label format support' },
                { id: 'pt-custom', name: 'Custom Branding', icon: '🎨', color: 'shipping', desc: 'Logo, thank-you note on packing slip' },
                { id: 'pt-invoice-tpl', name: 'Custom Invoice Template', icon: '🧾', color: 'shipping', desc: 'Seller-designed invoice layout — logo, colors, payment terms, custom footer' },
                { id: 'pt-e1', name: 'Printer Compatibility', icon: '⚠️', color: 'edge', edge: 'Browser print dialog, thermal vs A4 format' },
                { id: 'pt-e2', name: 'Wrong Label', icon: '⚠️', color: 'edge', edge: 'Label printed for wrong order, re-print flow' }
            ]
        },
        // ── STORE VACATION MODE ──────────────────────────────
        {
            id: 'vacation', name: 'STORE VACATION', icon: '🏖️', color: 'store',
            desc: 'Temporarily pause operations',
            children: [
                { id: 'vac-enable', name: 'Enable Vacation', icon: '⏸️', color: 'store', desc: 'Toggle vacation mode on/off' },
                { id: 'vac-message', name: 'Custom Message', icon: '📝', color: 'store', desc: '"We are on holiday, back on Jan 5"' },
                { id: 'vac-dates', name: 'Schedule Dates', icon: '📅', color: 'store', desc: 'Auto-enable from date A to date B' },
                { id: 'vac-orders', name: 'Order Behavior', icon: '📦', color: 'store', desc: 'Block new orders vs accept but delay' },
                { id: 'vac-subs', name: 'Subscriptions', icon: '🔄', color: 'subscription', desc: 'Auto-pause active subscriptions' },
                { id: 'vac-notify', name: 'Customer Notify', icon: '🔔', color: 'comm', desc: 'Notify subscribed customers about break' },
                { id: 'vac-e1', name: 'Pending Orders', icon: '⚠️', color: 'edge', edge: 'Unfulfilled orders exist when going on vacation' },
                { id: 'vac-e2', name: 'SEO Impact', icon: '⚠️', color: 'edge', edge: 'Store offline hurts search rankings, show "coming back" page' },
                { id: 'vac-e3', name: 'Forgot to Disable', icon: '⚠️', color: 'edge', edge: 'Auto-resume reminder, max vacation duration' }
            ]
        },
        // ── ORDER NOTES & CUSTOMIZATION ──────────────────────
        {
            id: 'order-notes', name: 'ORDER CUSTOMIZATION', icon: '📝', color: 'order',
            desc: 'Special instructions & personalization',
            children: [
                { id: 'on-delivery', name: 'Delivery Instructions', icon: '📋', color: 'order', desc: '"Leave at door", "Call before delivery"' },
                { id: 'on-gift', name: 'Gift Options', icon: '🎁', color: 'order', desc: 'Gift wrap, gift message, hide price' },
                { id: 'on-custom', name: 'Product Customization', icon: '✏️', color: 'order', desc: 'Engraving, name printing, custom message' },
                { id: 'on-seller', name: 'Seller Notes', icon: '📝', color: 'order', desc: 'Internal notes visible only to seller' },
                { id: 'on-e1', name: 'Custom Too Long', icon: '⚠️', color: 'edge', edge: 'Max character limit for notes, profanity filter' },
                { id: 'on-e2', name: 'Custom Not Feasible', icon: '⚠️', color: 'edge', edge: 'Seller cannot fulfill customization, refund/modify' }
            ]
        },
        // ── MULTI-STORE MANAGEMENT ──────────────────────────
        {
            id: 'multi-store', name: 'MULTI-STORE', icon: '🏪', color: 'seller',
            desc: 'Seller manages multiple stores',
            children: [
                { id: 'ms-switch', name: 'Store Switcher', icon: '🔀', color: 'seller', desc: 'Quick switch between stores in dashboard' },
                { id: 'ms-shared', name: 'Shared Catalogue', icon: '📦', color: 'product', desc: 'Copy products between stores' },
                { id: 'ms-unified', name: 'Unified Dashboard', icon: '📊', color: 'analytics', desc: 'See all stores analytics in one view' },
                { id: 'ms-staff', name: 'Cross-store Staff', icon: '👥', color: 'seller', desc: 'Staff member with access to multiple stores' },
                { id: 'ms-pricing', name: 'Per-store Pricing', icon: '💰', color: 'product', desc: 'Same product, different price per store' },
                { id: 'ms-e1', name: 'Inventory Conflict', icon: '⚠️', color: 'edge', edge: 'Same product sold on 2 stores, stock sync' },
                { id: 'ms-e2', name: 'Plan Limits', icon: '⚠️', color: 'edge', edge: 'Max stores per plan, upgrade required' }
            ]
        },
        // ── QR CODE COMMERCE ──────────────────────────────────
        {
            id: 'qr-commerce', name: 'QR CODE COMMERCE', icon: '📱', color: 'order',
            desc: 'QR-based product discovery & payments',
            children: [
                { id: 'qr-product', name: 'Product QR Code', icon: '📦', color: 'product', desc: 'Unique QR per product — scan to view/buy instantly' },
                { id: 'qr-store', name: 'Store QR Code', icon: '🏪', color: 'store', desc: 'Scan to open store — print on visiting cards, packaging' },
                { id: 'qr-upi', name: 'UPI QR Payment', icon: '💳', color: 'order', desc: 'Direct UPI payment QR at checkout — India-first' },
                { id: 'qr-table', name: 'Table/Location QR', icon: '🍽️', color: 'order', desc: 'Restaurant/cafe table ordering via QR scan' },
                { id: 'qr-bulk', name: 'Bulk QR Generation', icon: '📊', color: 'product', desc: 'Generate QR codes for entire catalogue at once' },
                { id: 'qr-analytics', name: 'QR Scan Analytics', icon: '📈', color: 'analytics', desc: 'Track scans by location, time, conversion rate' },
                { id: 'qr-e1', name: 'QR Expired/Invalid', icon: '⚠️', color: 'edge', edge: 'Product deleted or QR tampered, show graceful error' },
                { id: 'qr-e2', name: 'Duplicate QR Scan', icon: '⚠️', color: 'edge', edge: 'Same QR scanned multiple times, dedup logic' }
            ]
        },
        // ── MULTI-VENDOR MARKETPLACE ─────────────────────────
        {
            id: 'marketplace', name: 'MARKETPLACE MODE', icon: '🏬', color: 'plan',
            desc: 'Multi-vendor marketplace — Custom Plan only (very selective)',
            children: [
                { id: 'mp-vendor-reg', name: 'Vendor Registration', icon: '📝', color: 'seller', desc: 'Vendors apply to sell on marketplace — admin approval required' },
                { id: 'mp-vendor-panel', name: 'Vendor Dashboard', icon: '📊', color: 'seller', desc: 'Per-vendor orders, products, earnings view' },
                { id: 'mp-commission', name: 'Commission Rules', icon: '💰', color: 'admin', desc: 'Marketplace owner sets % commission per vendor/category' },
                { id: 'mp-payout', name: 'Vendor Payouts', icon: '💸', color: 'admin', desc: 'Auto/manual payout to vendors — settlement cycle config' },
                { id: 'mp-products', name: 'Vendor Product Mgmt', icon: '📦', color: 'product', desc: 'Vendors manage own products, marketplace admin approves' },
                { id: 'mp-shipping', name: 'Per-vendor Shipping', icon: '🚚', color: 'shipping', desc: 'Each vendor sets own shipping rules or uses marketplace logistics' },
                { id: 'mp-reviews', name: 'Vendor Ratings', icon: '⭐', color: 'customer', desc: 'Customers rate vendors separately from products' },
                { id: 'mp-e1', name: 'Multi-vendor Cart', icon: '⚠️', color: 'edge', edge: 'Cart has items from 3 vendors — split checkout, combined shipping?' },
                { id: 'mp-e2', name: 'Vendor Disputes', icon: '⚠️', color: 'edge', edge: 'Customer complaint — marketplace mediates between buyer & vendor' },
                { id: 'mp-e3', name: 'Vendor Goes Inactive', icon: '⚠️', color: 'edge', edge: 'Vendor stops fulfilling, auto-disable products, refund pending orders' }
            ]
        },
        // ── POS & OFFLINE BILLING ────────────────────────────
        {
            id: 'pos', name: 'POS & OFFLINE BILLING', icon: '🛍️', color: 'order',
            desc: 'Point of Sale for offline shop — unified inventory with online store',
            children: [
                {
                    id: 'pos-billing', name: 'Offline Billing', icon: '🧾', color: 'order',
                    desc: 'Counter billing for walk-in customers',
                    children: [
                        { id: 'pos-b-quick', name: 'Quick Bill', icon: '⚡', color: 'order', desc: 'Scan barcode or search product → add to bill instantly' },
                        { id: 'pos-b-customer', name: 'Walk-in Customer', icon: '🚶', color: 'customer', desc: 'Optional customer phone — link to existing or create new' },
                        { id: 'pos-b-payment', name: 'Offline Payment', icon: '💵', color: 'order', desc: 'Cash, UPI scan, Card swipe, Mixed payment' },
                        { id: 'pos-b-receipt', name: 'Print Receipt', icon: '🖨️', color: 'order', desc: 'Thermal receipt print + SMS/WhatsApp e-receipt' },
                        { id: 'pos-b-return', name: 'Counter Return', icon: '↩️', color: 'order', desc: 'In-store return/exchange processing' },
                        { id: 'pos-b-discount', name: 'Manual Discount', icon: '🏷️', color: 'coupon', desc: 'Counter staff applies instant discount' },
                        { id: 'pos-b-e1', name: 'Printer Offline', icon: '⚠️', color: 'edge', edge: 'Thermal printer disconnected — queue print, send e-receipt' },
                        { id: 'pos-b-e2', name: 'Cash Mismatch', icon: '⚠️', color: 'edge', edge: 'End-of-day cash count vs system total mismatch' }
                    ]
                },
                {
                    id: 'pos-sync', name: 'Online-Offline Sync', icon: '🔄', color: 'product',
                    desc: 'Real-time inventory & order sync',
                    children: [
                        { id: 'pos-s-inventory', name: 'Unified Inventory', icon: '📦', color: 'product', desc: 'Single stock count for online website + offline counter' },
                        { id: 'pos-s-realtime', name: 'Real-time Sync', icon: '⚡', color: 'product', desc: 'Offline sale instantly reduces online stock & vice versa' },
                        { id: 'pos-s-offline-mode', name: 'Offline Mode', icon: '📴', color: 'product', desc: 'Works without internet — queues transactions, syncs when back online' },
                        { id: 'pos-s-conflict', name: 'Conflict Resolution', icon: '⚖️', color: 'product', desc: 'Same product sold online + offline simultaneously — auto-resolve' },
                        { id: 'pos-s-e1', name: 'Sync Failure', icon: '⚠️', color: 'edge', edge: 'Internet drops mid-sync — retry queue, manual override' },
                        { id: 'pos-s-e2', name: 'Double Sold', icon: '⚠️', color: 'edge', edge: 'Product sold offline + online before sync — one order auto-cancelled' }
                    ]
                },
                {
                    id: 'pos-invoice', name: 'Unified Invoicing', icon: '🧾', color: 'order',
                    desc: 'Bills from both channels',
                    children: [
                        { id: 'pos-inv-online', name: 'Online Invoice', icon: '🌐', color: 'order', desc: 'Auto-generated PDF for website/app orders' },
                        { id: 'pos-inv-offline', name: 'Offline Invoice', icon: '🏪', color: 'order', desc: 'Counter bill with GST, thermal or A4 format' },
                        { id: 'pos-inv-unified', name: 'Unified Invoice Series', icon: '🔢', color: 'order', desc: 'Single invoice number sequence across online + offline' },
                        { id: 'pos-inv-gst', name: 'GST Compliance', icon: '📊', color: 'order', desc: 'Combined GST filing for online + offline sales' }
                    ]
                },
                {
                    id: 'pos-reports', name: 'Omnichannel Reports', icon: '📊', color: 'analytics',
                    desc: 'Combined analytics for both channels',
                    children: [
                        { id: 'pos-r-sales', name: 'Combined Sales Report', icon: '📈', color: 'analytics', desc: 'Online + offline revenue in single dashboard' },
                        { id: 'pos-r-channel', name: 'Channel Comparison', icon: '🔀', color: 'analytics', desc: 'Online vs offline — which channel performs better' },
                        { id: 'pos-r-cashflow', name: 'Cash Flow Report', icon: '💰', color: 'analytics', desc: 'Cash + digital payments daily summary' },
                        { id: 'pos-r-staff', name: 'Staff Sales Report', icon: '👥', color: 'analytics', desc: 'Per-counter-staff sales tracking for offline' }
                    ]
                },
                { id: 'pos-barcode', name: 'Barcode Scanner', icon: '📷', color: 'product', desc: 'Camera/hardware barcode scan in POS — instant product lookup by barcode' },
                { id: 'pos-staff-shift', name: 'Staff Shift / Schedule', icon: '🕒', color: 'seller', desc: 'Counter staff shift timing, attendance, handover notes' }
            ]
        },
        // ── ONDC INTEGRATION ───────────────────────────────
        {
            id: 'ondc', name: 'ONDC INTEGRATION', icon: '🇮🇳', color: 'order',
            desc: 'Open Network for Digital Commerce — India govt-backed interoperable e-commerce network',
            children: [
                { id: 'ondc-register', name: 'Seller Registration', icon: '📝', color: 'seller', desc: 'Register seller on ONDC network via Beckn protocol' },
                { id: 'ondc-catalog', name: 'Catalog Sync', icon: '🔄', color: 'product', desc: 'Push products to ONDC catalog — auto-sync inventory & pricing' },
                { id: 'ondc-order', name: 'Order Receive', icon: '📥', color: 'order', desc: 'Receive orders from any ONDC buyer app (Paytm, PhonePe, Google)' },
                { id: 'ondc-fulfill', name: 'Fulfillment', icon: '🚚', color: 'shipping', desc: 'Ship ONDC orders via existing logistics or ONDC logistics network' },
                { id: 'ondc-settle', name: 'Settlement', icon: '💰', color: 'order', desc: 'ONDC payment settlement to seller — T+1/T+2 cycle' },
                { id: 'ondc-return', name: 'Return via ONDC', icon: '↩️', color: 'order', desc: 'Handle returns initiated from buyer apps' },
                { id: 'ondc-e1', name: 'Protocol Version Mismatch', icon: '⚠️', color: 'edge', edge: 'ONDC protocol upgrade — backward compatibility needed' },
                { id: 'ondc-e2', name: 'Multi-network Pricing', icon: '⚠️', color: 'edge', edge: 'Different price on ONDC vs own store — sync conflict' }
            ]
        },
        // ── SELLER HELP CENTER ─────────────────────────────
        {
            id: 'help-center', name: 'SELLER HELP CENTER', icon: '📚', color: 'seller',
            desc: 'Self-serve knowledge base & learning resources for sellers',
            children: [
                { id: 'hc-articles', name: 'Knowledge Base', icon: '📝', color: 'seller', desc: 'Searchable help articles organized by topic — getting started, payments, shipping' },
                { id: 'hc-video', name: 'Video Tutorials', icon: '🎬', color: 'seller', desc: 'Step-by-step video guides for common tasks — add product, set shipping' },
                { id: 'hc-faq', name: 'FAQ Section', icon: '❓', color: 'seller', desc: 'Most asked questions with quick answers' },
                { id: 'hc-ticket', name: 'Support Ticket', icon: '🎫', color: 'seller', desc: 'Raise ticket if article doesn\'t solve, track status' },
                { id: 'hc-chat', name: 'Live Support Chat', icon: '💬', color: 'comm', desc: 'Real-time chat with support team for urgent issues' },
                { id: 'hc-changelog', name: 'Platform Changelog', icon: '📄', color: 'seller', desc: 'Latest updates, new features, bug fixes — "What\'s New" feed' },
                { id: 'hc-e1', name: 'Article Outdated', icon: '⚠️', color: 'edge', edge: 'Feature changed but help article not updated — review cycle' }
            ]
        }
    ]
};
