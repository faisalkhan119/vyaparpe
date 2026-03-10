# VyapaarPe — Technical Requirements Document (TRD)

> **Version:** 2.0 | **Date:** 10 March 2026  
> **Stack:** Java 21 + Spring Boot 3.x | **DB:** PostgreSQL 16 | **Cache:** Redis 7  
> **Build:** Gradle (Kotlin DSL) | **Queue:** RabbitMQ | **Search:** Elasticsearch 8

---

## 1. Project Structure (Modular Monolith)

```
vyapaarpe-backend/
├── build.gradle.kts
├── settings.gradle.kts
├── docker-compose.yml
├── src/main/java/com/vyapaarpe/
│   ├── VyapaarPeApplication.java
│   ├── config/                          # Global configs
│   │   ├── SecurityConfig.java
│   │   ├── JwtConfig.java
│   │   ├── RedisConfig.java
│   │   ├── RabbitMQConfig.java
│   │   ├── ElasticsearchConfig.java
│   │   ├── S3Config.java
│   │   ├── CorsConfig.java
│   │   ├── SwaggerConfig.java
│   │   └── WebConfig.java
│   ├── common/                          # Shared utilities
│   │   ├── dto/ApiResponse.java
│   │   ├── dto/PagedResponse.java
│   │   ├── exception/GlobalExceptionHandler.java
│   │   ├── exception/ResourceNotFoundException.java
│   │   ├── exception/BusinessRuleException.java
│   │   ├── util/SlugGenerator.java
│   │   ├── util/OtpGenerator.java
│   │   ├── util/PincodeValidator.java
│   │   ├── audit/AuditLog.java
│   │   └── tenant/TenantContext.java
│   │
│   ├── auth/                            # Authentication & Security
│   │   ├── controller/AuthController.java
│   │   ├── controller/OAuthController.java
│   │   ├── service/AuthService.java
│   │   ├── service/JwtService.java
│   │   ├── service/OtpService.java
│   │   ├── service/TwoFactorService.java
│   │   ├── model/RefreshToken.java
│   │   ├── dto/LoginRequest.java
│   │   ├── dto/TokenResponse.java
│   │   ├── filter/JwtAuthFilter.java
│   │   ├── filter/RateLimitFilter.java
│   │   └── filter/TenantFilter.java
│   │
│   ├── admin/                           # Super Admin + Sub-admins
│   │   ├── controller/AdminController.java
│   │   ├── controller/RoleController.java
│   │   ├── controller/KycController.java
│   │   ├── service/AdminService.java
│   │   ├── service/RoleService.java
│   │   ├── service/KycVerificationService.java
│   │   ├── model/PlatformAdmin.java
│   │   ├── model/AdminRole.java
│   │   ├── model/Permission.java
│   │   └── repository/AdminRepository.java
│   │
│   ├── plan/                            # Platform Plans & Billing
│   │   ├── controller/PlanController.java
│   │   ├── service/PlanService.java
│   │   ├── service/BillingService.java
│   │   ├── model/PlatformPlan.java
│   │   ├── model/SellerSubscription.java
│   │   ├── model/PlanFeatureFlags.java
│   │   └── repository/PlanRepository.java
│   │
│   ├── seller/                          # Seller Management
│   │   ├── controller/SellerController.java
│   │   ├── controller/StaffController.java
│   │   ├── service/SellerService.java
│   │   ├── service/StaffService.java
│   │   ├── service/PayoutService.java
│   │   ├── model/Seller.java
│   │   ├── model/StaffMember.java
│   │   ├── model/StaffRole.java
│   │   ├── model/BankAccount.java
│   │   └── repository/SellerRepository.java
│   │
│   ├── store/                           # Store Configuration
│   │   ├── controller/StoreController.java
│   │   ├── controller/ThemeController.java
│   │   ├── service/StoreService.java
│   │   ├── service/DomainService.java
│   │   ├── model/Store.java
│   │   ├── model/StoreSettings.java
│   │   ├── model/Theme.java
│   │   └── repository/StoreRepository.java
│   │
│   ├── product/                         # Product Catalog
│   │   ├── controller/ProductController.java
│   │   ├── controller/CategoryController.java
│   │   ├── controller/ReviewController.java
│   │   ├── service/ProductService.java
│   │   ├── service/InventoryService.java
│   │   ├── service/CategoryService.java
│   │   ├── service/ReviewService.java
│   │   ├── service/BulkImportService.java
│   │   ├── model/Product.java
│   │   ├── model/ProductVariant.java
│   │   ├── model/ProductImage.java
│   │   ├── model/Category.java
│   │   ├── model/Review.java
│   │   ├── model/Inventory.java
│   │   └── repository/ProductRepository.java
│   │
│   ├── customer/                        # Customer Management
│   │   ├── controller/CustomerController.java
│   │   ├── controller/AddressController.java
│   │   ├── controller/WishlistController.java
│   │   ├── service/CustomerService.java
│   │   ├── service/LoyaltyService.java
│   │   ├── model/Customer.java
│   │   ├── model/Address.java
│   │   ├── model/WishlistItem.java
│   │   ├── model/LoyaltyTransaction.java
│   │   └── repository/CustomerRepository.java
│   │
│   ├── cart/                            # Shopping Cart
│   │   ├── controller/CartController.java
│   │   ├── service/CartService.java
│   │   ├── service/PriceCalculationService.java
│   │   ├── model/CartItem.java
│   │   └── repository/CartRepository.java
│   │
│   ├── checkout/                        # Checkout Flow
│   │   ├── controller/CheckoutController.java
│   │   ├── service/CheckoutService.java
│   │   ├── service/CouponValidationService.java
│   │   ├── dto/CheckoutRequest.java
│   │   └── dto/CheckoutSummary.java
│   │
│   ├── order/                           # Order Management
│   │   ├── controller/OrderController.java
│   │   ├── service/OrderService.java
│   │   ├── service/InvoiceService.java
│   │   ├── service/TrackingService.java
│   │   ├── model/Order.java
│   │   ├── model/OrderItem.java
│   │   ├── model/Invoice.java
│   │   ├── model/OrderStatusHistory.java
│   │   ├── listener/OrderEventListener.java
│   │   └── repository/OrderRepository.java
│   │
│   ├── payment/                         # Payment Processing
│   │   ├── controller/PaymentController.java
│   │   ├── controller/WebhookController.java
│   │   ├── service/PaymentService.java
│   │   ├── service/RazorpayService.java
│   │   ├── service/RefundService.java
│   │   ├── model/Payment.java
│   │   ├── model/Refund.java
│   │   └── repository/PaymentRepository.java
│   │
│   ├── wallet/                          # Wallet System
│   │   ├── controller/WalletController.java
│   │   ├── service/WalletService.java
│   │   ├── service/CashbackService.java
│   │   ├── model/Wallet.java
│   │   ├── model/WalletTransaction.java
│   │   └── repository/WalletRepository.java
│   │
│   ├── subscription/                    # Recurring Subscriptions
│   │   ├── controller/SubscriptionController.java
│   │   ├── service/SubscriptionService.java
│   │   ├── service/SubscriptionBillingService.java
│   │   ├── model/SubscriptionPlan.java
│   │   ├── model/ActiveSubscription.java
│   │   ├── model/SubscriptionDelivery.java
│   │   └── scheduler/SubscriptionBillingScheduler.java
│   │
│   ├── returns/                         # Returns & Refunds
│   │   ├── controller/ReturnController.java
│   │   ├── service/ReturnService.java
│   │   ├── model/ReturnRequest.java
│   │   ├── model/ReturnPolicy.java
│   │   └── repository/ReturnRepository.java
│   │
│   ├── coupon/                          # Coupons & Offers
│   │   ├── controller/CouponController.java
│   │   ├── service/CouponService.java
│   │   ├── model/Coupon.java
│   │   ├── model/CouponUsage.java
│   │   └── repository/CouponRepository.java
│   │
│   ├── shipping/                        # Shipping & Delivery
│   │   ├── controller/ShippingController.java
│   │   ├── controller/DeliveryZoneController.java
│   │   ├── service/ShippingService.java
│   │   ├── service/CourierAggregatorService.java
│   │   ├── service/ShiprocketService.java
│   │   ├── model/DeliveryZone.java
│   │   ├── model/TimeSlot.java
│   │   ├── model/ShippingRate.java
│   │   └── repository/ShippingRepository.java
│   │
│   ├── notification/                    # Notification Engine
│   │   ├── controller/NotificationController.java
│   │   ├── service/NotificationService.java
│   │   ├── service/WhatsAppService.java
│   │   ├── service/EmailService.java
│   │   ├── service/SmsService.java
│   │   ├── service/PushNotificationService.java
│   │   ├── model/NotificationTemplate.java
│   │   ├── model/NotificationLog.java
│   │   ├── model/UserNotificationPreference.java
│   │   └── listener/NotificationEventListener.java
│   │
│   ├── cms/                             # Website Builder & Blog
│   │   ├── controller/PageController.java
│   │   ├── controller/WidgetController.java
│   │   ├── controller/BlogController.java
│   │   ├── service/PageService.java
│   │   ├── service/WidgetService.java
│   │   ├── service/BlogService.java
│   │   ├── model/Page.java
│   │   ├── model/Widget.java
│   │   ├── model/BlogPost.java
│   │   └── repository/PageRepository.java
│   │
│   ├── communication/                   # Communication (WhatsApp, SMS, Email)
│   │   ├── controller/CommunicationController.java
│   │   ├── service/EmailProviderService.java
│   │   ├── service/WhatsappProviderService.java
│   │   └── model/CommunicationLog.java
│   │
│   ├── appbuilder/                      # Mobile App Builder
│   │   ├── controller/AppBuilderController.java
│   │   ├── service/AppGenerationService.java
│   │   └── model/AppConfiguration.java
│   │
│   ├── pluginstore/                     # Plugin Store Integration
│   │   ├── controller/PluginController.java
│   │   ├── service/PluginService.java
│   │   └── model/StorePlugin.java
│   │
│   ├── i18n/                            # Multi-Language Support
│   │   ├── controller/TranslationController.java
│   │   ├── service/TranslationService.java
│   │   └── model/TranslationStore.java
│   │
│   ├── compliance/                      # Compliance & Legal
│   │   ├── controller/PolicyController.java
│   │   ├── service/ComplianceService.java
│   │   └── model/StorePolicy.java
│   │
│   ├── ai/                              # AI Module
│   │   ├── controller/AiAssistantController.java
│   │   ├── controller/AiCatalogueController.java
│   │   ├── controller/AiWebsiteController.java
│   │   ├── service/AiAssistantService.java
│   │   ├── service/AiCatalogueService.java
│   │   ├── service/AiWebsiteService.java
│   │   ├── service/LlmProviderService.java
│   │   ├── model/AiConfiguration.java
│   │   ├── model/AiUsageLog.java
│   │   └── config/AiModelConfig.java
│   │
│   ├── analytics/                       # Analytics & Reports
│   │   ├── controller/AnalyticsController.java
│   │   ├── controller/ReportController.java
│   │   ├── service/AnalyticsService.java
│   │   ├── service/ReportGeneratorService.java
│   │   ├── model/AnalyticsEvent.java
│   │   └── scheduler/ReportScheduler.java
│   │
│   ├── search/                          # Search & Discovery
│   │   ├── controller/SearchController.java
│   │   ├── service/SearchService.java
│   │   ├── service/ElasticsearchIndexService.java
│   │   ├── model/ProductSearchDocument.java
│   │   └── config/ElasticsearchConfig.java
│   │
│   ├── service/                          # Services & Bookings
│   │   ├── controller/ServiceController.java
│   │   ├── controller/BookingController.java
│   │   ├── service/ServiceListingService.java
│   │   ├── service/BookingService.java
│   │   ├── model/ServiceListing.java
│   │   ├── model/ServiceBooking.java
│   │   └── repository/ServiceRepository.java
│   │
│   ├── giftcard/                         # Gift Cards
│   │   ├── controller/GiftCardController.java
│   │   ├── service/GiftCardService.java
│   │   ├── model/GiftCard.java
│   │   ├── model/GiftCardTransaction.java
│   │   └── repository/GiftCardRepository.java
│   │
│   ├── bundle/                           # Product Bundles
│   │   ├── controller/BundleController.java
│   │   ├── service/BundleService.java
│   │   ├── model/ProductBundle.java
│   │   ├── model/BundleItem.java
│   │   └── repository/BundleRepository.java
│   │
│   ├── affiliate/                        # Affiliate Program
│   │   ├── controller/AffiliateController.java
│   │   ├── service/AffiliateService.java
│   │   ├── model/AffiliatePartner.java
│   │   ├── model/AffiliateClick.java
│   │   └── repository/AffiliateRepository.java
│   │
│   ├── chat/                             # Live Chat
│   │   ├── controller/ChatController.java
│   │   ├── service/ChatService.java
│   │   ├── service/AiChatbotService.java
│   │   ├── model/ChatConversation.java
│   │   ├── model/ChatMessage.java
│   │   └── repository/ChatRepository.java
│   │
│   ├── segmentation/                     # Customer Segmentation
│   │   ├── controller/SegmentController.java
│   │   ├── service/SegmentationService.java
│   │   ├── service/RfmAnalysisService.java
│   │   ├── model/CustomerSegment.java
│   │   └── repository/SegmentRepository.java
│   │
│   ├── migration/                        # Store Migration
│   │   ├── controller/MigrationController.java
│   │   ├── service/MigrationService.java
│   │   ├── service/ShopifyImportService.java
│   │   ├── service/WooCommerceImportService.java
│   │   └── model/MigrationJob.java
│   │
│   ├── policy/                           # Store Policies
│   │   ├── controller/PolicyController.java
│   │   ├── service/PolicyService.java
│   │   ├── service/AiPolicyGeneratorService.java
│   │   ├── model/StorePolicy.java
│   │   └── repository/PolicyRepository.java
│   │
│   ├── flashsale/                        # Flash Sales
│   │   ├── controller/FlashSaleController.java
│   │   ├── service/FlashSaleService.java
│   │   ├── model/FlashSale.java
│   │   └── repository/FlashSaleRepository.java
│   │
│   ├── webhook/                          # Webhooks & Public API
│   │   ├── controller/WebhookConfigController.java
│   │   ├── service/WebhookDeliveryService.java
│   │   ├── service/ApiKeyService.java
│   │   ├── model/WebhookEndpoint.java
│   │   ├── model/WebhookDeliveryLog.java
│   │   ├── model/ApiKey.java
│   │   └── repository/WebhookRepository.java
│   │
│   ├── qr/                               # QR Code Commerce
│   │   ├── controller/QRCodeController.java
│   │   ├── service/QRCodeService.java
│   │   ├── service/QRAnalyticsService.java
│   │   ├── model/QRCode.java
│   │   ├── model/QRScanLog.java
│   │   └── repository/QRCodeRepository.java
│   │
│   ├── marketplace/                      # Multi-Vendor Marketplace
│   │   ├── controller/MarketplaceController.java
│   │   ├── controller/VendorController.java
│   │   ├── service/MarketplaceService.java
│   │   ├── service/VendorPayoutService.java
│   │   ├── model/MarketplaceVendor.java
│   │   ├── model/VendorPayout.java
│   │   ├── model/MarketplaceConfig.java
│   │   └── repository/MarketplaceRepository.java
│   │
│   ├── pos/                              # POS & Offline Billing
│   │   ├── controller/POSController.java
│   │   ├── controller/StaffShiftController.java
│   │   ├── service/POSService.java
│   │   ├── service/OfflineSyncService.java
│   │   ├── service/POSInvoiceService.java
│   │   ├── model/POSTransaction.java
│   │   ├── model/POSReceipt.java
│   │   ├── model/StaffShift.java
│   │   └── repository/POSRepository.java
│   │
│   ├── ondc/                             # ONDC Integration
│   │   ├── controller/ONDCController.java
│   │   ├── service/ONDCService.java
│   │   ├── service/BecknProtocolService.java
│   │   ├── service/ONDCCatalogSyncService.java
│   │   ├── model/ONDCRegistration.java
│   │   ├── model/ONDCOrder.java
│   │   └── repository/ONDCRepository.java
│   │
│   ├── helpcenter/                       # Seller Help Center
│   │   ├── controller/HelpCenterController.java
│   │   ├── controller/TicketController.java
│   │   ├── service/HelpCenterService.java
│   │   ├── service/TicketService.java
│   │   ├── model/HelpArticle.java
│   │   ├── model/HelpCategory.java
│   │   ├── model/HelpTicket.java
│   │   └── repository/HelpCenterRepository.java
│   │
│   └── integration/                     # Third-party Integrations
│       ├── razorpay/RazorpayClient.java
│       ├── shiprocket/ShiprocketClient.java
│       ├── msg91/Msg91Client.java
│       ├── cloudinary/CloudinaryClient.java
│       ├── firebase/FirebaseClient.java
│       ├── whatsapp/WhatsAppClient.java
│       ├── ondc/ONDCBecknClient.java
│       └── social/SocialCommerceClient.java
│
├── src/main/resources/
│   ├── application.yml
│   ├── application-dev.yml
│   ├── application-prod.yml
│   └── db/migration/                    # Flyway migrations
│       ├── V1__init_schema.sql
│       ├── V2__seed_plans.sql
│       ├── V3__add_indexes.sql
│       └── ...
│
└── src/test/java/com/vyapaarpe/
    ├── auth/AuthServiceTest.java
    ├── order/OrderServiceTest.java
    └── ...
```

---

## 2. Database Schema (PostgreSQL 16)

### 2.1 Core Tables (110+ tables total)

#### Auth & Admin

```sql
-- Platform Admins
CREATE TABLE platform_admins (
    id              BIGSERIAL PRIMARY KEY,
    email           VARCHAR(255) NOT NULL UNIQUE,
    password_hash   VARCHAR(255) NOT NULL,
    name            VARCHAR(100) NOT NULL,
    role_id         BIGINT REFERENCES admin_roles(id),
    two_factor_secret VARCHAR(100),
    is_active       BOOLEAN DEFAULT true,
    last_login_at   TIMESTAMP,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE admin_roles (
    id              BIGSERIAL PRIMARY KEY,
    name            VARCHAR(50) NOT NULL UNIQUE, -- SUPER_ADMIN, SUPPORT_ADMIN, etc.
    description     TEXT,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE admin_role_permissions (
    role_id         BIGINT REFERENCES admin_roles(id),
    permission      VARCHAR(50) NOT NULL, -- SELLER_READ, ORDER_WRITE, etc.
    PRIMARY KEY (role_id, permission)
);

CREATE TABLE audit_logs (
    id              BIGSERIAL PRIMARY KEY,
    admin_id        BIGINT REFERENCES platform_admins(id),
    action          VARCHAR(50) NOT NULL,
    entity_type     VARCHAR(50),
    entity_id       BIGINT,
    old_value       JSONB,
    new_value       JSONB,
    ip_address      INET,
    created_at      TIMESTAMP DEFAULT NOW()
);
```

#### Plans & Billing

```sql
CREATE TABLE platform_plans (
    id              BIGSERIAL PRIMARY KEY,
    name            VARCHAR(50) NOT NULL,
    category        VARCHAR(20) NOT NULL, -- SELF_MANAGED, FULLY_MANAGED
    monthly_price   DECIMAL(10,2) DEFAULT 0,
    commission_pct  DECIMAL(5,2) NOT NULL,
    max_products    INTEGER DEFAULT -1, -- -1 = unlimited
    max_staff       INTEGER DEFAULT 0,
    custom_domain   BOOLEAN DEFAULT false,
    app_builder     BOOLEAN DEFAULT false,
    ai_features     BOOLEAN DEFAULT false,
    white_label     BOOLEAN DEFAULT false,
    full_api        BOOLEAN DEFAULT false,
    multi_store     BOOLEAN DEFAULT false,
    feature_flags   JSONB DEFAULT '{}',
    is_active       BOOLEAN DEFAULT true,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE seller_subscriptions (
    id              BIGSERIAL PRIMARY KEY,
    seller_id       BIGINT NOT NULL REFERENCES sellers(id),
    plan_id         BIGINT NOT NULL REFERENCES platform_plans(id),
    status          VARCHAR(20) NOT NULL, -- ACTIVE, TRIAL, EXPIRED, CANCELLED
    start_date      DATE NOT NULL,
    end_date        DATE,
    trial_end_date  DATE,
    next_billing    DATE,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);
```

#### Seller & Store

```sql
CREATE TABLE sellers (
    id              BIGSERIAL PRIMARY KEY,
    email           VARCHAR(255) NOT NULL UNIQUE,
    phone           VARCHAR(15) NOT NULL UNIQUE,
    password_hash   VARCHAR(255) NOT NULL,
    business_name   VARCHAR(200) NOT NULL,
    business_type   VARCHAR(20), -- INDIVIDUAL, PARTNERSHIP, COMPANY
    status          VARCHAR(20) DEFAULT 'PENDING',
    gst_number      VARCHAR(15) UNIQUE,
    pan_number      VARCHAR(10),
    kyc_verified    BOOLEAN DEFAULT false,
    two_factor      BOOLEAN DEFAULT false,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE stores (
    id              BIGSERIAL PRIMARY KEY,
    seller_id       BIGINT NOT NULL REFERENCES sellers(id),
    name            VARCHAR(200) NOT NULL,
    slug            VARCHAR(100) NOT NULL UNIQUE,
    custom_domain   VARCHAR(255) UNIQUE,
    ssl_provisioned BOOLEAN DEFAULT false,
    logo_url        VARCHAR(500),
    banner_url      VARCHAR(500),
    primary_color   VARCHAR(7) DEFAULT '#6c5ce7',
    theme_id        VARCHAR(50) DEFAULT 'default',
    -- Payment
    razorpay_key_id     VARCHAR(100),
    razorpay_key_secret VARCHAR(100), -- encrypted
    cod_enabled     BOOLEAN DEFAULT true,
    payment_mode    VARCHAR(20) DEFAULT 'BOTH', -- ONLINE_ONLY, COD_ONLY, BOTH
    shop_open       BOOLEAN DEFAULT true,
    -- Notifications
    whatsapp_enabled BOOLEAN DEFAULT false,
    email_enabled   BOOLEAN DEFAULT true,
    sms_enabled     BOOLEAN DEFAULT false,
    -- GST
    gst_number      VARCHAR(15),
    default_gst_rate DECIMAL(5,2) DEFAULT 0,
    -- Status
    status          VARCHAR(20) DEFAULT 'ACTIVE',
    vacation_msg    TEXT,
    vacation_until  DATE,
    settings        JSONB DEFAULT '{}',
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_stores_seller ON stores(seller_id);
CREATE INDEX idx_stores_slug ON stores(slug);

CREATE TABLE staff_members (
    id              BIGSERIAL PRIMARY KEY,
    seller_id       BIGINT NOT NULL REFERENCES sellers(id),
    store_id        BIGINT REFERENCES stores(id),
    name            VARCHAR(100) NOT NULL,
    email           VARCHAR(255) NOT NULL,
    password_hash   VARCHAR(255),
    role            VARCHAR(30) NOT NULL, -- MANAGER, ORDER_HANDLER, INVENTORY, SUPPORT
    is_active       BOOLEAN DEFAULT true,
    invite_token    VARCHAR(100),
    created_at      TIMESTAMP DEFAULT NOW()
);
```

#### Products & Inventory

```sql
CREATE TABLE categories (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    parent_id       BIGINT REFERENCES categories(id),
    name            VARCHAR(100) NOT NULL,
    slug            VARCHAR(100) NOT NULL,
    image_url       VARCHAR(500),
    sort_order      INTEGER DEFAULT 0,
    meta_title      VARCHAR(200),
    meta_desc       TEXT,
    created_at      TIMESTAMP DEFAULT NOW(),
    UNIQUE(store_id, slug)
);

CREATE TABLE products (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    category_id     BIGINT REFERENCES categories(id),
    name            VARCHAR(300) NOT NULL,
    slug            VARCHAR(300) NOT NULL,
    description     TEXT,
    type            VARCHAR(20) DEFAULT 'PHYSICAL', -- PHYSICAL, DIGITAL, SERVICE
    base_price      DECIMAL(10,2) NOT NULL,
    compare_price   DECIMAL(10,2),
    gst_rate        DECIMAL(5,2) DEFAULT 0,
    sku_code        VARCHAR(50),
    hsn_code        VARCHAR(10),
    meta_title      VARCHAR(200),
    meta_desc       TEXT,
    status          VARCHAR(20) DEFAULT 'DRAFT', -- ACTIVE, DRAFT, ARCHIVED
    is_featured     BOOLEAN DEFAULT false,
    sort_order      INTEGER DEFAULT 0,
    labels          JSONB DEFAULT '[]', -- ["NEW", "BESTSELLER", "TRENDING", "ORGANIC"]
    scheduled_publish_at TIMESTAMP, -- future publish date/time
    purchase_qty_limit INTEGER, -- max qty per customer per order
    search_keywords TEXT, -- custom seller-defined search keywords
    avg_rating      DECIMAL(3,2) DEFAULT 0,
    review_count    INTEGER DEFAULT 0,
    version         INTEGER DEFAULT 0, -- optimistic locking
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW(),
    UNIQUE(store_id, slug)
);
CREATE INDEX idx_products_store ON products(store_id, status);
CREATE INDEX idx_products_category ON products(category_id);

CREATE TABLE product_variants (
    id              BIGSERIAL PRIMARY KEY,
    product_id      BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    name            VARCHAR(100) NOT NULL, -- "500g", "Red - Large"
    sku_code        VARCHAR(50),
    price           DECIMAL(10,2) NOT NULL,
    compare_price   DECIMAL(10,2),
    stock           INTEGER DEFAULT 0,
    low_stock_alert INTEGER DEFAULT 5,
    weight_grams    INTEGER,
    image_url       VARCHAR(500),
    sort_order      INTEGER DEFAULT 0,
    is_active       BOOLEAN DEFAULT true,
    version         INTEGER DEFAULT 0
);

CREATE TABLE product_images (
    id              BIGSERIAL PRIMARY KEY,
    product_id      BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    url             VARCHAR(500) NOT NULL,
    alt_text        VARCHAR(200),
    sort_order      INTEGER DEFAULT 0
);
-- Reviews & Ratings
CREATE TABLE reviews (
    id              BIGSERIAL PRIMARY KEY,
    product_id      BIGINT NOT NULL REFERENCES products(id),
    customer_id     BIGINT NOT NULL REFERENCES customers(id),
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    rating          INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    title           VARCHAR(200),
    content         TEXT,
    photo_urls      JSONB,
    video_url       VARCHAR(500),
    is_verified     BOOLEAN DEFAULT false,
    is_approved     BOOLEAN DEFAULT false,
    seller_reply    TEXT,
    seller_reply_at TIMESTAMP,
    helpful_count   INTEGER DEFAULT 0,
    status          VARCHAR(20) DEFAULT 'PENDING', -- PENDING, APPROVED, REJECTED
    created_at      TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_reviews_product ON reviews(product_id, is_approved);
```

#### Customer

```sql
CREATE TABLE customers (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    name            VARCHAR(100),
    phone           VARCHAR(15),
    email           VARCHAR(255),
    avatar_url      VARCHAR(500),
    auth_provider   VARCHAR(20) DEFAULT 'PHONE_OTP',
    loyalty_points  INTEGER DEFAULT 0,
    loyalty_tier    VARCHAR(20) DEFAULT 'BRONZE',
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW(),
    UNIQUE(store_id, phone)
);

CREATE TABLE addresses (
    id              BIGSERIAL PRIMARY KEY,
    customer_id     BIGINT NOT NULL REFERENCES customers(id),
    label           VARCHAR(20) DEFAULT 'HOME',
    name            VARCHAR(100) NOT NULL,
    phone           VARCHAR(15) NOT NULL,
    line1           VARCHAR(255) NOT NULL,
    line2           VARCHAR(255),
    city            VARCHAR(100) NOT NULL,
    state           VARCHAR(100) NOT NULL,
    pincode         VARCHAR(6) NOT NULL,
    is_default      BOOLEAN DEFAULT false,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Loyalty System
CREATE TABLE loyalty_accounts (
    id              BIGSERIAL PRIMARY KEY,
    customer_id     BIGINT NOT NULL REFERENCES customers(id),
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    points_balance  INTEGER DEFAULT 0,
    lifetime_earned INTEGER DEFAULT 0,
    tier            VARCHAR(20) DEFAULT 'BRONZE', -- BRONZE, SILVER, GOLD, PLATINUM
    referral_code   VARCHAR(20) UNIQUE,
    created_at      TIMESTAMP DEFAULT NOW(),
    UNIQUE(customer_id, store_id)
);

CREATE TABLE loyalty_transactions (
    id              BIGSERIAL PRIMARY KEY,
    loyalty_id      BIGINT NOT NULL REFERENCES loyalty_accounts(id),
    type            VARCHAR(10) NOT NULL, -- EARN, REDEEM, EXPIRE, ADJUST
    points          INTEGER NOT NULL,
    source          VARCHAR(30), -- ORDER, REFERRAL, SIGNUP, REVIEW, ADMIN
    reference_id    VARCHAR(50),
    expires_at      TIMESTAMP,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE loyalty_tiers (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    name            VARCHAR(30) NOT NULL,
    min_spend       DECIMAL(10,2) NOT NULL,
    multiplier      DECIMAL(3,2) DEFAULT 1.0,
    benefits        JSONB
);

-- Wishlist
CREATE TABLE wishlist_items (
    id              BIGSERIAL PRIMARY KEY,
    customer_id     BIGINT NOT NULL REFERENCES customers(id),
    product_id      BIGINT NOT NULL REFERENCES products(id),
    variant_id      BIGINT REFERENCES product_variants(id),
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    created_at      TIMESTAMP DEFAULT NOW(),
    UNIQUE(customer_id, product_id, variant_id)
);

CREATE TABLE wishlist_alerts (
    id              BIGSERIAL PRIMARY KEY,
    wishlist_item_id BIGINT NOT NULL REFERENCES wishlist_items(id) ON DELETE CASCADE,
    alert_type      VARCHAR(20) NOT NULL, -- BACK_IN_STOCK, PRICE_DROP
    is_active       BOOLEAN DEFAULT true,
    triggered_at    TIMESTAMP
);
```

#### Orders & Payments

```sql
CREATE TABLE orders (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    customer_id     BIGINT REFERENCES customers(id),
    order_number    VARCHAR(20) NOT NULL UNIQUE,
    status          VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    subtotal        DECIMAL(10,2) NOT NULL,
    discount        DECIMAL(10,2) DEFAULT 0,
    shipping_charge DECIMAL(10,2) DEFAULT 0,
    tax_amount      DECIMAL(10,2) DEFAULT 0,
    total           DECIMAL(10,2) NOT NULL,
    payment_method  VARCHAR(20), -- UPI, CARD, COD, WALLET, NETBANKING
    payment_status  VARCHAR(20) DEFAULT 'PENDING',
    coupon_code     VARCHAR(50),
    address_snapshot JSONB NOT NULL,
    notes           TEXT,
    gift_wrap       BOOLEAN DEFAULT false,
    gift_message    TEXT,
    is_guest        BOOLEAN DEFAULT false,
    guest_email     VARCHAR(255),
    guest_phone     VARCHAR(15),
    awb_number      VARCHAR(50),
    courier_partner VARCHAR(50),
    shipped_at      TIMESTAMP,
    delivered_at    TIMESTAMP,
    cancelled_at    TIMESTAMP,
    cancel_reason   TEXT,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_orders_store ON orders(store_id, status);
CREATE INDEX idx_orders_customer ON orders(customer_id);

CREATE TABLE order_items (
    id              BIGSERIAL PRIMARY KEY,
    order_id        BIGINT NOT NULL REFERENCES orders(id),
    product_id      BIGINT,
    variant_id      BIGINT,
    product_snapshot JSONB NOT NULL, -- name, price, image at time of order
    quantity        INTEGER NOT NULL,
    unit_price      DECIMAL(10,2) NOT NULL,
    total_price     DECIMAL(10,2) NOT NULL,
    gst_rate        DECIMAL(5,2) DEFAULT 0
);

CREATE TABLE payments (
    id              BIGSERIAL PRIMARY KEY,
    order_id        BIGINT NOT NULL REFERENCES orders(id),
    gateway         VARCHAR(20) NOT NULL, -- RAZORPAY, WALLET
    gateway_order_id VARCHAR(100),
    gateway_payment_id VARCHAR(100),
    amount          DECIMAL(10,2) NOT NULL,
    currency        VARCHAR(3) DEFAULT 'INR',
    status          VARCHAR(20) NOT NULL, -- CREATED, PAID, FAILED, REFUNDED
    method          VARCHAR(20), -- upi, card, netbanking, wallet
    idempotency_key VARCHAR(100) UNIQUE,
    webhook_payload JSONB,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE wallets (
    id              BIGSERIAL PRIMARY KEY,
    customer_id     BIGINT NOT NULL,
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    balance         DECIMAL(10,2) DEFAULT 0 CHECK (balance >= 0),
    cashback_balance DECIMAL(10,2) DEFAULT 0 CHECK (cashback_balance >= 0),
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW(),
    UNIQUE(customer_id, store_id)
);

CREATE TABLE wallet_transactions (
    id              BIGSERIAL PRIMARY KEY,
    wallet_id       BIGINT NOT NULL REFERENCES wallets(id),
    type            VARCHAR(10) NOT NULL, -- CREDIT, DEBIT
    source          VARCHAR(20) NOT NULL, -- TOPUP, REFUND, CASHBACK, ORDER, ADMIN, EXPIRY
    amount          DECIMAL(10,2) NOT NULL,
    balance_before  DECIMAL(10,2) NOT NULL,
    balance_after   DECIMAL(10,2) NOT NULL,
    reference_id    VARCHAR(50),
    description     TEXT,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Invoices
CREATE TABLE invoices (
    id              BIGSERIAL PRIMARY KEY,
    order_id        BIGINT NOT NULL REFERENCES orders(id),
    invoice_number  VARCHAR(30) NOT NULL UNIQUE,
    gstin           VARCHAR(15),
    pdf_url         VARCHAR(500),
    total_amount    DECIMAL(10,2) NOT NULL,
    tax_breakup     JSONB,
    is_credit_note  BOOLEAN DEFAULT false,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Order Status History
CREATE TABLE order_status_history (
    id              BIGSERIAL PRIMARY KEY,
    order_id        BIGINT NOT NULL REFERENCES orders(id),
    status          VARCHAR(20) NOT NULL,
    changed_by      VARCHAR(50),
    note            TEXT,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Order Notes & Customization
CREATE TABLE order_notes (
    id              BIGSERIAL PRIMARY KEY,
    order_id        BIGINT NOT NULL REFERENCES orders(id),
    type            VARCHAR(20) NOT NULL, -- DELIVERY, GIFT, CUSTOM, SELLER
    content         TEXT NOT NULL,
    is_internal     BOOLEAN DEFAULT false,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Coupon Usage Tracking
CREATE TABLE coupon_usage (
    id              BIGSERIAL PRIMARY KEY,
    coupon_id       BIGINT NOT NULL REFERENCES coupons(id),
    customer_id     BIGINT NOT NULL REFERENCES customers(id),
    order_id        BIGINT REFERENCES orders(id),
    discount_amount DECIMAL(10,2) NOT NULL,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Subscription Deliveries
CREATE TABLE subscription_deliveries (
    id              BIGSERIAL PRIMARY KEY,
    subscription_id BIGINT NOT NULL REFERENCES active_subscriptions(id),
    order_id        BIGINT REFERENCES orders(id),
    scheduled_date  DATE NOT NULL,
    status          VARCHAR(20) DEFAULT 'SCHEDULED',
    skip_reason     TEXT,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Delivery Zones & Time Slots
CREATE TABLE delivery_zones (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    name            VARCHAR(100) NOT NULL,
    pincodes        JSONB NOT NULL,
    shipping_rate   DECIMAL(10,2) DEFAULT 0,
    is_cod_available BOOLEAN DEFAULT true,
    is_active       BOOLEAN DEFAULT true,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE time_slots (
    id              BIGSERIAL PRIMARY KEY,
    zone_id         BIGINT NOT NULL REFERENCES delivery_zones(id),
    label           VARCHAR(50) NOT NULL,
    start_time      TIME NOT NULL,
    end_time        TIME NOT NULL,
    max_orders      INTEGER DEFAULT 50,
    is_active       BOOLEAN DEFAULT true
);

-- Notification Engine
CREATE TABLE notification_templates (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT REFERENCES stores(id),
    event_type      VARCHAR(50) NOT NULL,
    channel         VARCHAR(20) NOT NULL,
    subject         VARCHAR(200),
    body            TEXT NOT NULL,
    variables       JSONB,
    language        VARCHAR(5) DEFAULT 'en',
    is_active       BOOLEAN DEFAULT true
);

CREATE TABLE notification_logs (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT REFERENCES stores(id),
    customer_id     BIGINT REFERENCES customers(id),
    channel         VARCHAR(20) NOT NULL,
    event_type      VARCHAR(50),
    recipient       VARCHAR(255),
    status          VARCHAR(20),
    error_message   TEXT,
    sent_at         TIMESTAMP DEFAULT NOW()
);

CREATE TABLE notification_preferences (
    id              BIGSERIAL PRIMARY KEY,
    customer_id     BIGINT NOT NULL REFERENCES customers(id),
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    email_enabled   BOOLEAN DEFAULT true,
    sms_enabled     BOOLEAN DEFAULT true,
    whatsapp_enabled BOOLEAN DEFAULT true,
    push_enabled    BOOLEAN DEFAULT true,
    dnd_start       TIME,
    dnd_end         TIME,
    UNIQUE(customer_id, store_id)
);

-- CMS / Website Builder
CREATE TABLE pages (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    type            VARCHAR(20) NOT NULL,
    title           VARCHAR(200) NOT NULL,
    slug            VARCHAR(200),
    meta_title      VARCHAR(200),
    meta_desc       TEXT,
    status          VARCHAR(20) DEFAULT 'DRAFT',
    content_json    JSONB,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE widgets (
    id              BIGSERIAL PRIMARY KEY,
    page_id         BIGINT NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
    type            VARCHAR(30) NOT NULL,
    config          JSONB NOT NULL,
    sort_order      INTEGER DEFAULT 0,
    is_active       BOOLEAN DEFAULT true
);

-- AI Usage & Configuration
CREATE TABLE ai_configurations (
    id              BIGSERIAL PRIMARY KEY,
    model_provider  VARCHAR(20),
    model_name      VARCHAR(50),
    max_tokens      INTEGER,
    daily_quota     INTEGER,
    cost_per_token  DECIMAL(10,8),
    credits_per_plan JSONB,
    fallback_chain  VARCHAR(200)
);

CREATE TABLE ai_usage_logs (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT REFERENCES stores(id),
    feature         VARCHAR(30),
    model_used      VARCHAR(50),
    tokens_used     INTEGER,
    cost            DECIMAL(10,6),
    request_type    VARCHAR(50),
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Migration Jobs
CREATE TABLE migration_jobs (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    source          VARCHAR(20) NOT NULL,
    status          VARCHAR(20) DEFAULT 'PENDING',
    total_items     INTEGER DEFAULT 0,
    processed_items INTEGER DEFAULT 0,
    error_log       JSONB,
    started_at      TIMESTAMP,
    completed_at    TIMESTAMP,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Print Templates
CREATE TABLE print_templates (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    type            VARCHAR(20) NOT NULL,
    template_html   TEXT,
    custom_logo     BOOLEAN DEFAULT false,
    thermal_support BOOLEAN DEFAULT false,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- QR Code Commerce
CREATE TABLE qr_codes (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    type            VARCHAR(20) NOT NULL, -- PRODUCT, STORE, UPI, TABLE
    reference_id    BIGINT, -- product_id or null
    qr_data         TEXT NOT NULL,
    qr_image_url    VARCHAR(500),
    scan_count      INTEGER DEFAULT 0,
    is_active       BOOLEAN DEFAULT true,
    created_at      TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_qr_store ON qr_codes(store_id, type);

CREATE TABLE qr_scan_logs (
    id              BIGSERIAL PRIMARY KEY,
    qr_code_id      BIGINT NOT NULL REFERENCES qr_codes(id),
    ip_address      INET,
    user_agent      TEXT,
    location        VARCHAR(100),
    converted       BOOLEAN DEFAULT false, -- scan led to purchase?
    scanned_at      TIMESTAMP DEFAULT NOW()
);

-- Multi-Vendor Marketplace
CREATE TABLE marketplace_vendors (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id), -- marketplace store
    vendor_name     VARCHAR(200) NOT NULL,
    vendor_email    VARCHAR(255) NOT NULL,
    vendor_phone    VARCHAR(15),
    commission_pct  DECIMAL(5,2) NOT NULL DEFAULT 10,
    status          VARCHAR(20) DEFAULT 'PENDING', -- PENDING, APPROVED, SUSPENDED
    bank_details    JSONB,
    approved_at     TIMESTAMP,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE vendor_payouts (
    id              BIGSERIAL PRIMARY KEY,
    vendor_id       BIGINT NOT NULL REFERENCES marketplace_vendors(id),
    amount          DECIMAL(10,2) NOT NULL,
    commission      DECIMAL(10,2) NOT NULL,
    net_amount      DECIMAL(10,2) NOT NULL,
    status          VARCHAR(20) DEFAULT 'PENDING', -- PENDING, PROCESSING, PAID, FAILED
    utr_number      VARCHAR(50),
    payout_date     DATE,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- POS & Offline Billing
CREATE TABLE pos_transactions (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    order_id        BIGINT REFERENCES orders(id),
    customer_id     BIGINT REFERENCES customers(id),
    staff_id        BIGINT REFERENCES staff_members(id),
    channel         VARCHAR(10) NOT NULL DEFAULT 'OFFLINE', -- OFFLINE, ONLINE
    payment_method  VARCHAR(20), -- CASH, UPI, CARD, MIXED
    subtotal        DECIMAL(10,2) NOT NULL,
    discount        DECIMAL(10,2) DEFAULT 0,
    tax_amount      DECIMAL(10,2) DEFAULT 0,
    total           DECIMAL(10,2) NOT NULL,
    cash_received   DECIMAL(10,2),
    change_returned DECIMAL(10,2),
    synced          BOOLEAN DEFAULT true,
    created_at      TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_pos_store_date ON pos_transactions(store_id, created_at);

CREATE TABLE pos_receipts (
    id              BIGSERIAL PRIMARY KEY,
    transaction_id  BIGINT NOT NULL REFERENCES pos_transactions(id),
    receipt_number  VARCHAR(30) NOT NULL,
    format          VARCHAR(10) DEFAULT 'THERMAL', -- THERMAL, A4
    pdf_url         VARCHAR(500),
    gst_breakup     JSONB,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE staff_shifts (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    staff_id        BIGINT NOT NULL REFERENCES staff_members(id),
    shift_date      DATE NOT NULL,
    start_time      TIME NOT NULL,
    end_time        TIME,
    cash_opening    DECIMAL(10,2) DEFAULT 0,
    cash_closing    DECIMAL(10,2),
    notes           TEXT,
    status          VARCHAR(20) DEFAULT 'ACTIVE' -- ACTIVE, COMPLETED, HANDOVER
);

-- ONDC Integration
CREATE TABLE ondc_registrations (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    subscriber_id   VARCHAR(255) UNIQUE,
    network_type    VARCHAR(20) DEFAULT 'BPP', -- Beckn Provider Platform
    domain          VARCHAR(50),
    status          VARCHAR(20) DEFAULT 'PENDING', -- PENDING, ACTIVE, SUSPENDED
    certificate     TEXT,
    registered_at   TIMESTAMP,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE ondc_orders (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    ondc_transaction_id VARCHAR(100) NOT NULL,
    buyer_app       VARCHAR(100), -- Paytm, PhonePe, Google
    order_id        BIGINT REFERENCES orders(id),
    status          VARCHAR(20) NOT NULL,
    settlement_amt  DECIMAL(10,2),
    settlement_status VARCHAR(20),
    ondc_payload    JSONB,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_ondc_store ON ondc_orders(store_id);

-- Seller Help Center
CREATE TABLE help_categories (
    id              BIGSERIAL PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    slug            VARCHAR(100) NOT NULL UNIQUE,
    icon            VARCHAR(10),
    sort_order      INTEGER DEFAULT 0
);

CREATE TABLE help_articles (
    id              BIGSERIAL PRIMARY KEY,
    category_id     BIGINT REFERENCES help_categories(id),
    title           VARCHAR(200) NOT NULL,
    slug            VARCHAR(200) NOT NULL UNIQUE,
    content         TEXT NOT NULL,
    video_url       VARCHAR(500),
    is_faq          BOOLEAN DEFAULT false,
    is_published    BOOLEAN DEFAULT true,
    view_count      INTEGER DEFAULT 0,
    helpful_count   INTEGER DEFAULT 0,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE help_tickets (
    id              BIGSERIAL PRIMARY KEY,
    seller_id       BIGINT NOT NULL REFERENCES sellers(id),
    subject         VARCHAR(200) NOT NULL,
    description     TEXT NOT NULL,
    category        VARCHAR(50),
    priority        VARCHAR(10) DEFAULT 'NORMAL', -- LOW, NORMAL, HIGH, URGENT
    status          VARCHAR(20) DEFAULT 'OPEN', -- OPEN, IN_PROGRESS, RESOLVED, CLOSED
    assigned_to     BIGINT REFERENCES platform_admins(id),
    resolved_at     TIMESTAMP,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);
```


#### Coupons, Subscriptions, Returns

```sql
CREATE TABLE coupons (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    code            VARCHAR(30) NOT NULL,
    type            VARCHAR(20) NOT NULL, -- FLAT, PERCENTAGE, BOGO, FREE_SHIPPING
    value           DECIMAL(10,2) NOT NULL,
    min_order       DECIMAL(10,2) DEFAULT 0,
    max_discount    DECIMAL(10,2),
    usage_limit     INTEGER,
    per_customer    INTEGER DEFAULT 1,
    valid_from      TIMESTAMP NOT NULL,
    valid_until     TIMESTAMP NOT NULL,
    is_active       BOOLEAN DEFAULT true,
    target_audience VARCHAR(20) DEFAULT 'ALL',
    applicable_products JSONB,
    applicable_categories JSONB,
    created_at      TIMESTAMP DEFAULT NOW(),
    UNIQUE(store_id, code)
);

CREATE TABLE subscription_plans (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    product_id      BIGINT REFERENCES products(id),
    name            VARCHAR(100) NOT NULL,
    frequency       VARCHAR(20) NOT NULL, -- DAILY, WEEKLY, BIWEEKLY, MONTHLY
    price_per_cycle DECIMAL(10,2) NOT NULL,
    discount_pct    DECIMAL(5,2) DEFAULT 0,
    trial_days      INTEGER DEFAULT 0,
    max_cycles      INTEGER DEFAULT -1,
    is_active       BOOLEAN DEFAULT true,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE active_subscriptions (
    id              BIGSERIAL PRIMARY KEY,
    plan_id         BIGINT NOT NULL REFERENCES subscription_plans(id),
    customer_id     BIGINT NOT NULL REFERENCES customers(id),
    status          VARCHAR(20) NOT NULL, -- ACTIVE, PAUSED, CANCELLED, EXPIRED
    next_billing    DATE,
    next_delivery   DATE,
    delivery_address_id BIGINT REFERENCES addresses(id),
    pause_reason    TEXT,
    auto_resume_at  DATE,
    total_cycles    INTEGER DEFAULT 0,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE return_requests (
    id              BIGSERIAL PRIMARY KEY,
    order_id        BIGINT NOT NULL REFERENCES orders(id),
    customer_id     BIGINT NOT NULL REFERENCES customers(id),
    status          VARCHAR(20) NOT NULL, -- REQUESTED, APPROVED, PICKUP_SCHEDULED, RECEIVED, RESOLVED, REJECTED
    reason          VARCHAR(50) NOT NULL,
    description     TEXT,
    photo_urls      JSONB,
    resolution      VARCHAR(20), -- FULL_REFUND, PARTIAL_REFUND, REPLACEMENT, STORE_CREDIT
    refund_amount   DECIMAL(10,2),
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);
```

#### Phase 12: Services, Gift Cards, Bundles, Flash Sales, Chat, Affiliates, Webhooks, Policies

```sql
-- Communication Logs (Email, SMS, WhatsApp)
CREATE TABLE communications_log (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    customer_id     BIGINT REFERENCES customers(id),
    channel         VARCHAR(20) NOT NULL, -- WHATSAPP, EMAIL, SMS
    type            VARCHAR(50), -- ORDER_CONFIRM, ABANDONED_CART
    status          VARCHAR(20), -- SENT, DELIVERED, FAILED
    message_content TEXT,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- App Builder Config
CREATE TABLE app_configurations (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id) UNIQUE,
    app_name        VARCHAR(100),
    firebase_key    TEXT,
    sha_hash        VARCHAR(255),
    custom_domain   VARCHAR(200),
    theme_json      JSONB,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

-- Plugin Store Integrations
CREATE TABLE store_plugins (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    plugin_name     VARCHAR(100) NOT NULL,
    config_json     JSONB,
    is_active       BOOLEAN DEFAULT true,
    installed_at    TIMESTAMP DEFAULT NOW()
);

-- Multi-Language (i18n)
CREATE TABLE translations_store (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    locale          VARCHAR(10) NOT NULL, -- en, hi, ta
    translation_key VARCHAR(255) NOT NULL,
    translation_val TEXT NOT NULL,
    UNIQUE(store_id, locale, translation_key)
);

-- Compliance & Legal Policies
CREATE TABLE store_policies (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id) UNIQUE,
    terms_of_service TEXT,
    privacy_policy  TEXT,
    refund_policy   TEXT,
    shipping_policy TEXT,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW()
);

-- Services & Bookings
CREATE TABLE services (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    name            VARCHAR(200) NOT NULL,
    description     TEXT,
    duration_mins   INTEGER NOT NULL,
    price           DECIMAL(10,2) NOT NULL,
    is_active       BOOLEAN DEFAULT true,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE service_bookings (
    id              BIGSERIAL PRIMARY KEY,
    service_id      BIGINT NOT NULL REFERENCES services(id),
    customer_id     BIGINT REFERENCES customers(id),
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    provider_staff_id BIGINT REFERENCES staff_members(id),
    booking_date    DATE NOT NULL,
    time_slot       VARCHAR(20),
    status          VARCHAR(20) DEFAULT 'BOOKED', -- BOOKED, COMPLETED, CANCELLED, NO_SHOW
    is_recurring    BOOLEAN DEFAULT false,
    recurring_frequency VARCHAR(20), -- WEEKLY, MONTHLY
    cancel_reason   TEXT,
    reschedule_count INTEGER DEFAULT 0,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Gift Cards
CREATE TABLE gift_cards (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    code            VARCHAR(20) NOT NULL UNIQUE,
    denomination    DECIMAL(10,2) NOT NULL,
    balance         DECIMAL(10,2) NOT NULL,
    design_template VARCHAR(50),
    personal_message TEXT,
    sender_name     VARCHAR(100),
    recipient_email VARCHAR(255),
    recipient_phone VARCHAR(15),
    delivery_method VARCHAR(20), -- EMAIL, SMS, WHATSAPP
    is_corporate    BOOLEAN DEFAULT false,
    expires_at      TIMESTAMP,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE gift_card_transactions (
    id              BIGSERIAL PRIMARY KEY,
    gift_card_id    BIGINT NOT NULL REFERENCES gift_cards(id),
    order_id        BIGINT REFERENCES orders(id),
    type            VARCHAR(10) NOT NULL, -- REDEEM, REFUND
    amount          DECIMAL(10,2) NOT NULL,
    balance_after   DECIMAL(10,2) NOT NULL,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Product Bundles
CREATE TABLE product_bundles (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    name            VARCHAR(200) NOT NULL,
    slug            VARCHAR(200) NOT NULL,
    description     TEXT,
    bundle_price    DECIMAL(10,2) NOT NULL,
    original_price  DECIMAL(10,2) NOT NULL, -- sum of individual prices
    is_mix_match    BOOLEAN DEFAULT false,
    mix_match_count INTEGER, -- "Pick any 3"
    is_active       BOOLEAN DEFAULT true,
    created_at      TIMESTAMP DEFAULT NOW(),
    UNIQUE(store_id, slug)
);

CREATE TABLE bundle_items (
    bundle_id       BIGINT NOT NULL REFERENCES product_bundles(id) ON DELETE CASCADE,
    product_id      BIGINT NOT NULL REFERENCES products(id),
    quantity        INTEGER DEFAULT 1,
    PRIMARY KEY (bundle_id, product_id)
);

-- Flash Sales
CREATE TABLE flash_sales (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    name            VARCHAR(200) NOT NULL,
    discount_value  DECIMAL(10,2) NOT NULL,
    discount_type   VARCHAR(10) NOT NULL, -- FLAT, PERCENT
    start_time      TIMESTAMP NOT NULL,
    end_time        TIMESTAMP NOT NULL,
    max_stock       INTEGER,
    sold_count      INTEGER DEFAULT 0,
    is_active       BOOLEAN DEFAULT true,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE flash_sale_products (
    flash_sale_id   BIGINT NOT NULL REFERENCES flash_sales(id) ON DELETE CASCADE,
    product_id      BIGINT NOT NULL REFERENCES products(id),
    sale_price      DECIMAL(10,2) NOT NULL,
    stock_allocated INTEGER,
    PRIMARY KEY (flash_sale_id, product_id)
);

-- Affiliate Program
CREATE TABLE affiliate_partners (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    name            VARCHAR(100) NOT NULL,
    email           VARCHAR(255) NOT NULL,
    referral_code   VARCHAR(30) NOT NULL UNIQUE,
    commission_pct  DECIMAL(5,2) NOT NULL,
    tier            VARCHAR(20) DEFAULT 'BRONZE', -- BRONZE, SILVER, GOLD
    total_clicks    INTEGER DEFAULT 0,
    total_sales     INTEGER DEFAULT 0,
    total_earned    DECIMAL(10,2) DEFAULT 0,
    min_payout      DECIMAL(10,2) DEFAULT 500,
    status          VARCHAR(20) DEFAULT 'ACTIVE',
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE affiliate_clicks (
    id              BIGSERIAL PRIMARY KEY,
    partner_id      BIGINT NOT NULL REFERENCES affiliate_partners(id),
    order_id        BIGINT REFERENCES orders(id),
    ip_address      INET,
    user_agent      TEXT,
    converted       BOOLEAN DEFAULT false,
    commission      DECIMAL(10,2),
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Live Chat
CREATE TABLE chat_conversations (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    customer_id     BIGINT REFERENCES customers(id),
    assigned_staff  BIGINT REFERENCES staff_members(id),
    status          VARCHAR(20) DEFAULT 'OPEN', -- OPEN, AI_HANDLING, HUMAN, CLOSED
    last_message_at TIMESTAMP,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE chat_messages (
    id              BIGSERIAL PRIMARY KEY,
    conversation_id BIGINT NOT NULL REFERENCES chat_conversations(id),
    sender_type     VARCHAR(10) NOT NULL, -- CUSTOMER, SELLER, AI
    content         TEXT NOT NULL,
    attachment_url  VARCHAR(500),
    is_canned       BOOLEAN DEFAULT false,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Webhook Configuration
CREATE TABLE webhook_endpoints (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    url             VARCHAR(500) NOT NULL,
    secret          VARCHAR(255) NOT NULL, -- HMAC secret
    event_types     JSONB NOT NULL, -- ["order.created", "payment.success"]
    is_active       BOOLEAN DEFAULT true,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE webhook_delivery_logs (
    id              BIGSERIAL PRIMARY KEY,
    endpoint_id     BIGINT NOT NULL REFERENCES webhook_endpoints(id),
    event_type      VARCHAR(50) NOT NULL,
    payload         JSONB NOT NULL,
    http_status     INTEGER,
    response_body   TEXT,
    retry_count     INTEGER DEFAULT 0,
    delivered_at    TIMESTAMP,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE api_keys (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    key_hash        VARCHAR(255) NOT NULL UNIQUE,
    key_prefix      VARCHAR(10) NOT NULL, -- first 8 chars for identification
    name            VARCHAR(100) NOT NULL,
    scopes          JSONB DEFAULT '["read"]',
    last_used_at    TIMESTAMP,
    expires_at      TIMESTAMP,
    is_active       BOOLEAN DEFAULT true,
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Store Policies
CREATE TABLE store_policies (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    type            VARCHAR(30) NOT NULL, -- RETURN, REFUND, SHIPPING, PRIVACY, TERMS
    content         TEXT NOT NULL,
    ai_generated    BOOLEAN DEFAULT false,
    version         INTEGER DEFAULT 1,
    published_at    TIMESTAMP,
    created_at      TIMESTAMP DEFAULT NOW(),
    updated_at      TIMESTAMP DEFAULT NOW(),
    UNIQUE(store_id, type)
);

-- Blog / CMS
CREATE TABLE blog_categories (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    name            VARCHAR(100) NOT NULL,
    slug            VARCHAR(100) NOT NULL,
    UNIQUE(store_id, slug)
);

CREATE TABLE blog_posts (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    category_id     BIGINT REFERENCES blog_categories(id),
    title           VARCHAR(300) NOT NULL,
    slug            VARCHAR(300) NOT NULL,
    content         TEXT NOT NULL,
    excerpt         TEXT,
    cover_image_url VARCHAR(500),
    meta_title      VARCHAR(200),
    meta_desc       TEXT,
    ai_generated    BOOLEAN DEFAULT false,
    status          VARCHAR(20) DEFAULT 'DRAFT', -- DRAFT, PUBLISHED, SCHEDULED
    published_at    TIMESTAMP,
    scheduled_at    TIMESTAMP,
    created_at      TIMESTAMP DEFAULT NOW(),
    UNIQUE(store_id, slug)
);

-- Customer Segmentation
CREATE TABLE customer_segments (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    name            VARCHAR(100) NOT NULL,
    type            VARCHAR(20) NOT NULL, -- VIP, AT_RISK, NEW, DORMANT, CHAMPION, CUSTOM
    filter_criteria JSONB, -- {"min_spend": 5000, "min_orders": 3}
    is_auto         BOOLEAN DEFAULT false, -- AI auto-segment
    customer_count  INTEGER DEFAULT 0,
    created_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE customer_segment_members (
    segment_id      BIGINT NOT NULL REFERENCES customer_segments(id) ON DELETE CASCADE,
    customer_id     BIGINT NOT NULL REFERENCES customers(id),
    rfm_score       JSONB, -- {"recency": 5, "frequency": 3, "monetary": 4}
    added_at        TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (segment_id, customer_id)
);

-- Social Commerce
CREATE TABLE social_proof_events (
    id              BIGSERIAL PRIMARY KEY,
    store_id        BIGINT NOT NULL REFERENCES stores(id),
    customer_name   VARCHAR(50),
    city            VARCHAR(50),
    product_name    VARCHAR(200),
    event_type      VARCHAR(20), -- PURCHASE, REVIEW, SIGNUP
    created_at      TIMESTAMP DEFAULT NOW()
);

-- Store Vacation
ALTER TABLE stores ADD COLUMN IF NOT EXISTS vacation_enabled BOOLEAN DEFAULT false;
ALTER TABLE stores ADD COLUMN IF NOT EXISTS vacation_order_behavior VARCHAR(20) DEFAULT 'BLOCK'; -- BLOCK, DELAY
ALTER TABLE stores ADD COLUMN IF NOT EXISTS vacation_start_date DATE;
ALTER TABLE stores ADD COLUMN IF NOT EXISTS vacation_end_date DATE;
```

---

## 3. API Endpoint Catalog (500+ endpoints)

### 3.1 Authentication (`/api/v1/auth`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/customer/otp/send` | Send OTP to phone | Public |
| POST | `/customer/otp/verify` | Verify OTP → JWT | Public |
| POST | `/customer/social/google` | Google OAuth login | Public |
| POST | `/seller/register` | Seller signup | Public |
| POST | `/seller/login` | Seller email+password login | Public |
| POST | `/seller/2fa/verify` | Verify 2FA TOTP | Public |
| POST | `/admin/login` | Admin login + 2FA | Public |
| POST | `/refresh` | Refresh access token | Refresh Token |
| POST | `/logout` | Blacklist token | Bearer |

### 3.2 Admin (`/api/v1/admin`)

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/sellers` | List all sellers (paginated) | SUPER, OPS |
| POST | `/sellers/{id}/approve` | Approve seller | SUPER, OPS |
| POST | `/sellers/{id}/suspend` | Suspend seller | SUPER, OPS |
| GET | `/analytics/dashboard` | Platform KPIs | SUPER |
| GET | `/finance/transactions` | All transactions | FINANCE |
| POST | `/finance/payouts/process` | Process seller payouts | FINANCE |
| GET | `/finance/gst/report` | GST report | FINANCE |
| GET | `/support/tickets` | Support tickets | SUPPORT |
| POST | `/support/tickets/{id}/resolve` | Resolve ticket | SUPPORT |
| POST | `/marketing/banners` | Create banner | MARKETING |
| POST | `/marketing/campaigns` | Create campaign | MARKETING |
| GET | `/roles` | List roles | SUPER |
| POST | `/roles` | Create role | SUPER |

### 3.3 Seller (`/api/v1/seller`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/profile` | Get seller profile |
| PUT | `/profile` | Update profile |
| POST | `/kyc/upload` | Upload KYC documents |
| GET | `/staff` | List staff members |
| POST | `/staff` | Create staff |
| DELETE | `/staff/{id}` | Deactivate staff |
| GET | `/payouts` | Payout history |
| POST | `/bank-account` | Add/update bank |
| GET | `/dashboard` | Dashboard KPIs |

### 3.4 Store (`/api/v1/stores/{storeId}`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get store details |
| PUT | `/settings` | Update settings |
| PUT | `/theme` | Change theme |
| POST | `/domain` | Connect custom domain |
| GET | `/analytics` | Store analytics |
| PUT | `/vacation` | Toggle vacation mode |

### 3.5 Products (`/api/v1/stores/{storeId}/products`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | List products (paginated, filtered) |
| POST | `/` | Create product |
| GET | `/{id}` | Get product |
| PUT | `/{id}` | Update product |
| DELETE | `/{id}` | Soft delete product |
| POST | `/{id}/variants` | Add variant |
| POST | `/{id}/images` | Upload images |
| POST | `/bulk/import` | CSV bulk import |
| GET | `/bulk/export` | CSV export |

### 3.6 Orders (`/api/v1/stores/{storeId}/orders`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | List orders (filtered by status) |
| GET | `/{id}` | Get order details |
| PATCH | `/{id}/status` | Update order status |
| POST | `/{id}/ship` | Mark as shipped (enter AWB) |
| GET | `/{id}/invoice` | Download invoice PDF |
| POST | `/{id}/return` | Initiate return |

### 3.7 Customer Storefront (`/api/v1/storefront/{storeSlug}`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Browse products |
| GET | `/products/{slug}` | Product detail page |
| GET | `/categories` | Category tree |
| GET | `/search?q=` | Search products |
| POST | `/cart/items` | Add to cart |
| GET | `/cart` | Get cart |
| POST | `/checkout` | Initiate checkout |
| POST | `/checkout/payment/verify` | Verify payment |
| GET | `/orders` | Customer order history |
| POST | `/reviews` | Submit review |
| POST | `/wishlist` | Add to wishlist |
| DELETE | `/wishlist/{id}` | Remove from wishlist |
| GET | `/wishlist` | Get wishlist |

### 3.8 Wallet (`/api/v1/storefront/{storeSlug}/wallet`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/balance` | Get wallet balance |
| POST | `/topup` | Topup via gateway |
| GET | `/transactions` | Transaction history |
| POST | `/cashback/apply` | Apply cashback to order |

### 3.9 Subscriptions (`/api/v1/storefront/{storeSlug}/subscriptions`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/plans` | List subscription plans |
| POST | `/` | Subscribe to plan |
| GET | `/active` | My active subscriptions |
| POST | `/{id}/pause` | Pause subscription |
| POST | `/{id}/resume` | Resume subscription |
| POST | `/{id}/cancel` | Cancel subscription |
| GET | `/{id}/deliveries` | Delivery calendar |
| POST | `/{id}/deliveries/{did}/skip` | Skip a delivery |

### 3.10 Returns (`/api/v1/storefront/{storeSlug}/returns`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Initiate return request |
| GET | `/{id}` | Return status |
| POST | `/{id}/pickup` | Schedule pickup |

### 3.11 Notifications (`/api/v1/stores/{storeId}/notifications`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/templates` | List templates |
| POST | `/templates` | Create template |
| PUT | `/templates/{id}` | Update template |
| POST | `/templates/{id}/test` | Send test notification |
| GET | `/logs` | Delivery logs |
| GET | `/analytics` | Open/click/bounce rates |

### 3.12 Categories (`/api/v1/stores/{storeId}/categories`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Category tree |
| POST | `/` | Create category |
| PUT | `/{id}` | Update category |
| DELETE | `/{id}` | Delete category |
| POST | `/reorder` | Reorder categories |

### 3.13 Reviews (`/api/v1/stores/{storeId}/reviews`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | List all reviews (seller view) |
| PATCH | `/{id}/approve` | Approve review |
| PATCH | `/{id}/reject` | Reject review |
| POST | `/{id}/reply` | Seller reply |

### 3.14 Delivery Zones (`/api/v1/stores/{storeId}/delivery-zones`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | List zones |
| POST | `/` | Create zone |
| PUT | `/{id}` | Update zone |
| DELETE | `/{id}` | Delete zone |
| GET | `/{id}/slots` | List time slots |
| POST | `/{id}/slots` | Create time slot |
| POST | `/check-pin?pincode=` | Check pincode serviceability |

### 3.15 Reports (`/api/v1/stores/{storeId}/reports`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/sales` | Sales report |
| POST | `/inventory` | Inventory report |
| POST | `/customers` | Customer report |
| POST | `/tax` | Tax/GST report |
| GET | `/export/{jobId}` | Download generated report |
| POST | `/schedule` | Schedule recurring report |

### 3.16 AI (`/api/v1/stores/{storeId}/ai`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/assistant/chat` | Send message to AI assistant |
| GET | `/assistant/history` | Chat history |
| POST | `/assistant/action` | Execute AI action (create product, etc.) |
| POST | `/catalogue/upload` | Upload for AI catalogue builder |
| GET | `/catalogue/batches/{id}` | Batch processing status |
| POST | `/catalogue/preview/{id}/approve` | Approve AI products |
| POST | `/catalogue/publish` | Publish approved products |
| POST | `/website/setup` | AI website builder setup |
| GET | `/website/preview` | Preview AI-generated website |
| POST | `/website/publish` | Publish AI website |
| GET | `/usage` | AI usage stats |

### 3.17 CMS / Website Builder (`/api/v1/stores/{storeId}/cms`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/pages` | List pages |
| POST | `/pages` | Create page |
| PUT | `/pages/{id}` | Update page |
| POST | `/pages/{id}/publish` | Publish page |
| GET | `/pages/{id}/widgets` | Get widgets |
| POST | `/pages/{id}/widgets` | Add widget |
| PUT | `/widgets/{id}` | Update widget |
| DELETE | `/widgets/{id}` | Remove widget |

### 3.18 Print & Packaging (`/api/v1/stores/{storeId}/print`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/shipping-label/{orderId}` | Generate shipping label |
| POST | `/invoice/{orderId}` | Generate invoice PDF |
| POST | `/packing-slip/{orderId}` | Generate packing slip |
| POST | `/bulk` | Bulk print (labels/invoices) |
| GET | `/templates` | List print templates |
| PUT | `/templates/{type}` | Update print template |

### 3.19 Recommendations (`/api/v1/storefront/{storeSlug}/recommendations`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/similar/{productId}` | Similar products |
| GET | `/bought-together/{productId}` | Frequently bought together |
| GET | `/personalized` | Personalized feed |
| GET | `/trending` | Trending products |

### 3.20 Phase 12 APIs — Services, Gift Cards, Bundles, Flash Sales, Chat, Affiliates, Webhooks, Policies, Blog

#### Services (`/api/v1/stores/{storeId}/services`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | List services |
| POST | `/` | Create service |
| PUT | `/{id}` | Update service |
| DELETE | `/{id}` | Delete service |
| POST | `/{id}/bookings` | Create booking |
| GET | `/bookings` | List bookings |
| PATCH | `/bookings/{id}/status` | Update booking status (complete/cancel) |
| POST | `/bookings/{id}/reschedule` | Reschedule booking |

#### Gift Cards (`/api/v1/stores/{storeId}/gift-cards`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | List gift cards |
| POST | `/` | Create gift card |
| POST | `/bulk` | Bulk corporate gift cards |
| GET | `/check/{code}` | Check balance |
| POST | `/redeem` | Redeem at checkout |

#### Product Bundles (`/api/v1/stores/{storeId}/bundles`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | List bundles |
| POST | `/` | Create bundle |
| PUT | `/{id}` | Update bundle |
| DELETE | `/{id}` | Delete bundle |
| GET | `/suggestions` | Cross-sell bundle suggestions (cart-based) |

#### Flash Sales (`/api/v1/stores/{storeId}/flash-sales`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | List flash sales |
| POST | `/` | Create flash sale |
| PUT | `/{id}` | Update flash sale |
| GET | `/active` | Get currently active sale |

#### Live Chat (`/api/v1/stores/{storeId}/chat`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/conversations` | List conversations (seller view) |
| POST | `/conversations` | Start conversation (customer) |
| GET | `/conversations/{id}/messages` | Get messages in conversation |
| POST | `/conversations/{id}/messages` | Send message |
| PATCH | `/conversations/{id}/assign` | Assign to staff |
| POST | `/conversations/{id}/close` | Close conversation |

#### Affiliates (`/api/v1/stores/{storeId}/affiliates`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | List affiliates |
| POST | `/apply` | Apply to be affiliate |
| GET | `/dashboard` | Affiliate dashboard (clicks, sales, earnings) |
| GET | `/{id}/payouts` | Payout history |
| POST | `/{id}/payouts/process` | Process payout |

#### Webhooks (`/api/v1/stores/{storeId}/webhooks`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/endpoints` | List webhook endpoints |
| POST | `/endpoints` | Create webhook endpoint |
| PUT | `/endpoints/{id}` | Update endpoint |
| DELETE | `/endpoints/{id}` | Delete endpoint |
| GET | `/endpoints/{id}/logs` | Delivery logs |
| POST | `/endpoints/{id}/test` | Send test event |
| GET | `/api-keys` | List API keys |
| POST | `/api-keys` | Generate new API key |
| DELETE | `/api-keys/{id}` | Revoke API key |

#### Store Policies (`/api/v1/stores/{storeId}/policies`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | List all policies |
| GET | `/{type}` | Get policy (RETURN, REFUND, SHIPPING, PRIVACY, TERMS) |
| PUT | `/{type}` | Update policy |
| POST | `/ai-generate` | AI auto-generate from store config |

#### Blog (`/api/v1/stores/{storeId}/blog`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/posts` | List blog posts |
| POST | `/posts` | Create post |
| PUT | `/posts/{id}` | Update post |
| DELETE | `/posts/{id}` | Delete post |
| POST | `/posts/ai-generate` | AI generate blog post |
| GET | `/categories` | List blog categories |
| POST | `/categories` | Create blog category |

#### Customer Segmentation (`/api/v1/stores/{storeId}/segments`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | List segments |
| POST | `/` | Create custom segment |
| POST | `/rfm/analyze` | Run RFM analysis |
| GET | `/{id}/customers` | List customers in segment |
| POST | `/{id}/campaign` | Send targeted campaign to segment |

#### Guest Checkout (`/api/v1/storefront/{storeSlug}/guest-checkout`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Initiate guest checkout |
| GET | `/lookup?email=&order=` | Order lookup by email + order# |
| POST | `/convert` | Convert guest to account |

#### Order Customization (part of order flow)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/orders/{id}/notes` | Add delivery instructions |
| POST | `/orders/{id}/gift` | Set gift options (wrap, message, hide price) |
| POST | `/orders/{id}/seller-notes` | Add internal seller notes |

#### Social Commerce (`/api/v1/stores/{storeId}/social`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/whatsapp/sync` | Sync products to WhatsApp Business catalogue |
| GET | `/proof/recent` | Get recent social proof events |
| GET | `/influencer/stats` | Influencer campaign stats |

#### Vacation Mode (part of store settings)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/stores/{storeId}/vacation/enable` | Enable vacation mode |
| POST | `/stores/{storeId}/vacation/disable` | Disable vacation mode |
| PUT | `/stores/{storeId}/vacation/schedule` | Schedule vacation dates |

#### Multi-Store (`/api/v1/seller/stores`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | List all seller's stores |
| POST | `/switch/{storeId}` | Switch active store context |
| POST | `/products/copy` | Copy products between stores |
| GET | `/unified-dashboard` | Unified analytics across stores |

#### Store Migration (`/api/v1/stores/{storeId}/migration`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/shopify` | Import from Shopify (API key) |
| POST | `/woocommerce` | Import from WooCommerce |
| POST | `/csv` | Generic CSV import with field mapping |
| GET | `/jobs/{id}` | Check migration job status |
| POST | `/url-redirects` | Set URL redirect map |

---

## 4. Multi-Tenancy Strategy

```java
// Tenant resolution via store slug or X-Store-Id header
@Component
public class TenantFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest req, ...) {
        String storeId = req.getHeader("X-Store-Id");
        if (storeId == null) {
            // Extract from subdomain or path
            storeId = extractFromRequest(req);
        }
        TenantContext.setCurrentTenant(Long.parseLong(storeId));
        filterChain.doFilter(req, res);
        TenantContext.clear();
    }
}

// All store-scoped queries auto-filter by tenant
// Using Hibernate @Filter annotation
@Entity
@FilterDef(name = "tenantFilter", parameters = @ParamDef(name = "storeId", type = Long.class))
@Filter(name = "tenantFilter", condition = "store_id = :storeId")
public class Product { ... }
```

---

## 5. Caching Strategy (Redis)

| Key Pattern | TTL | Purpose |
|-------------|-----|---------|
| `store:{id}:config` | 1h | Store settings |
| `product:{id}` | 30m | Product details |
| `category:{storeId}:tree` | 1h | Category hierarchy |
| `cart:{customerId}` | 7d | Shopping cart |
| `otp:{phone}` | 5m | OTP verification |
| `token:blacklist:{jti}` | 15m | Revoked JWT tokens |
| `ratelimit:{ip}` | 1m | API rate counters |
| `search:popular:{storeId}` | 6h | Popular search terms |
| `dashboard:{storeId}` | 15m | Dashboard KPIs |
| `flashsale:{storeId}:active` | 1m | Active flash sale data |
| `giftcard:{code}:balance` | 5m | Gift card balance |
| `chat:{conversationId}:messages` | 30m | Chat message history |
| `segment:{storeId}:rfm` | 24h | RFM analysis results |
| `vacation:{storeId}` | 1h | Vacation mode status |
| `bundle:{storeId}:suggestions` | 1h | Bundle cross-sell suggestions |
| `loyalty:{customerId}:{storeId}` | 30m | Loyalty points balance |
| `wishlist:{customerId}:count` | 1h | Wishlist item count |
| `notification:delivery:{id}` | 5m | Notification delivery status |
| `coupon:{storeId}:best` | 15m | Best available coupons |
| `recommendation:{productId}` | 6h | Product recommendations |
| `ai:tokens:{storeId}:daily` | 24h | AI daily token usage counter |

---

## 6. Event-Driven Architecture (RabbitMQ)

### Queues & Exchanges

| Exchange | Queue | Events | Consumer |
|----------|-------|--------|----------|
| `order.exchange` | `order.notification` | ORDER_CREATED, ORDER_SHIPPED, ORDER_DELIVERED | NotificationService |
| `order.exchange` | `order.analytics` | ORDER_CREATED | AnalyticsService |
| `order.exchange` | `order.inventory` | ORDER_CREATED, ORDER_CANCELLED | InventoryService |
| `payment.exchange` | `payment.process` | PAYMENT_SUCCESS, PAYMENT_FAILED | PaymentService |
| `notification.exchange` | `notification.email` | SEND_EMAIL | EmailService |
| `notification.exchange` | `notification.sms` | SEND_SMS | SmsService |
| `notification.exchange` | `notification.whatsapp` | SEND_WHATSAPP | WhatsAppService |
| `notification.exchange` | `notification.push` | SEND_PUSH | PushService |
| `ai.exchange` | `ai.catalogue` | CATALOGUE_BATCH | AiCatalogueService |
| `report.exchange` | `report.generate` | GENERATE_REPORT | ReportService |
| `chat.exchange` | `chat.message` | MESSAGE_SENT, AI_RESPONSE | ChatService |
| `webhook.exchange` | `webhook.deliver` | WEBHOOK_TRIGGER | WebhookDeliveryService |
| `migration.exchange` | `migration.process` | IMPORT_BATCH | MigrationService |
| `flashsale.exchange` | `flashsale.stock` | STOCK_DECREMENT, SALE_ENDED | FlashSaleService |
| `segmentation.exchange` | `segment.compute` | RFM_REFRESH, SEGMENT_UPDATE | SegmentationService |
| `loyalty.exchange` | `loyalty.points` | POINTS_EARNED, POINTS_REDEEMED, TIER_CHANGE | LoyaltyService |
| `vacation.exchange` | `vacation.mode` | VACATION_ENABLED, VACATION_DISABLED | VacationService |
| `social.exchange` | `social.sync` | PRODUCT_SYNC_WHATSAPP, PRODUCT_SYNC_INSTAGRAM | SocialCommerceService |
| `wishlist.exchange` | `wishlist.alert` | BACK_IN_STOCK, PRICE_DROP | WishlistAlertService |
| `subscription.exchange` | `subscription.billing` | BILLING_DUE, PAYMENT_FAILED, SUBSCRIPTION_RENEWED | SubscriptionBillingService |

---

## 7. Security Implementation

### 7.1 JWT Token Structure

```json
{
  "sub": "user_123",
  "iss": "vyapaarpe",
  "iat": 1709280000,
  "exp": 1709280900,
  "type": "CUSTOMER|SELLER|ADMIN",
  "storeId": 456,
  "roles": ["SELLER"],
  "permissions": ["PRODUCT_WRITE", "ORDER_READ"],
  "fingerprint": "sha256_of_device_info"
}
```

### 7.2 API Security Checklist

- [x] JWT with RS256 signing (asymmetric keys)
- [x] Refresh token rotation (one-time use)
- [x] Token blacklist on logout (Redis)
- [x] Rate limiting: 100 req/min per IP (Bucket4j)
- [x] CORS: per-store domain whitelist
- [x] CSRF: Double-submit cookie pattern
- [x] Input validation: Jakarta Bean Validation 3.0
- [x] SQL injection: JPA parameterized queries only
- [x] XSS: OWASP HTML sanitizer on all text fields
- [x] File upload: type + size validation, virus scan
- [x] PII encryption: AES-256 for phone, email, PAN (field-level)
- [x] Secrets: AWS KMS / HashiCorp Vault
- [x] Admin: IP whitelist + mandatory 2FA
- [x] Webhook: HMAC-SHA256 signature verification

---

## 8. Infrastructure & DevOps

### 8.1 Docker Compose (Development)

```yaml
version: '3.8'
services:
  app:
    build: .
    ports: ["8080:8080"]
    environment:
      SPRING_PROFILES_ACTIVE: dev
      DB_URL: jdbc:postgresql://postgres:5432/vyapaarpe
      REDIS_HOST: redis
      RABBITMQ_HOST: rabbitmq
    depends_on: [postgres, redis, rabbitmq, elasticsearch]

  postgres:
    image: postgres:16-alpine
    ports: ["5432:5432"]
    environment:
      POSTGRES_DB: vyapaarpe
      POSTGRES_PASSWORD: dev_password
    volumes: [pgdata:/var/lib/postgresql/data]

  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]

  rabbitmq:
    image: rabbitmq:3-management-alpine
    ports: ["5672:5672", "15672:15672"]

  elasticsearch:
    image: elasticsearch:8.12.0
    ports: ["9200:9200"]
    environment:
      discovery.type: single-node
      xpack.security.enabled: "false"

volumes:
  pgdata:
```

### 8.2 CI/CD Pipeline (GitHub Actions)

```
Push to main → Lint → Unit Tests → Integration Tests (Testcontainers)
     → Build Docker → Push to ECR → Deploy to ECS (staging)
     → Smoke Tests → Manual Approval → Deploy to Production (rolling)
```

### 8.3 Monitoring Stack

| Tool | Purpose |
|------|---------|
| **Micrometer** | App metrics (JVM, HTTP, custom) |
| **Prometheus** | Metrics collection & storage |
| **Grafana** | Dashboards & alerts |
| **Logback + ELK** | Structured JSON logging → Elasticsearch |
| **Sentry** | Error tracking & alerting |
| **Spring Boot Actuator** | Health checks, info, metrics endpoints |

---

## 9. Performance Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| API P95 Latency | < 200ms | Redis cache, query optimization, connection pooling |
| Concurrent Users | 50,000+ | Horizontal scaling, stateless JWT |
| Database Connections | 100 per instance | HikariCP pool (min=10, max=100) |
| Search Latency | < 100ms | Elasticsearch with proper indexing |
| File Upload | < 5 seconds | Direct S3 presigned URL upload |
| Notification Delivery | < 30s | RabbitMQ with dedicated consumer threads |
| Order Processing | < 500ms | Optimistic locking, async inventory update |
| Report Generation | < 60s (large) | Background job with progress tracking |

---

## 10. Key Design Patterns Used

| Pattern | Where Used |
|---------|-----------|
| **Repository Pattern** | All data access via Spring Data JPA |
| **Service Layer** | Business logic separated from controllers |
| **DTO Pattern** | Request/Response DTOs, never expose entities |
| **Event Sourcing (partial)** | Order status history, wallet transactions |
| **CQRS (partial)** | Analytics reads from Redis/ES, writes to PostgreSQL |
| **Strategy Pattern** | Payment gateways, notification channels, courier partners |
| **Observer Pattern** | Spring Events for order → notification → analytics |
| **Factory Pattern** | AI model provider selection (GPT/Claude/Gemini) |
| **Builder Pattern** | Complex query building, report generation |
| **Circuit Breaker** | External API calls (Resilience4j) |
| **Tenant Filter** | Multi-tenancy via Hibernate filters |

---

*TRD v2.0 — VyapaarPe Backend Technical Requirements*  
*Java 21 + Spring Boot 3.x + PostgreSQL 16 + Redis 7 + RabbitMQ + Elasticsearch 8*  
*110+ DB Tables | 600+ API Endpoints | 140+ Edge Cases Cataloged*  
*Last Updated: 10 March 2026*
