import Link from 'next/link';
import styles from './page.module.css';
import HeroCarousel from './HeroCarousel';
import CategoryPills from '@/components/CategoryPills';
import DealTimer from '@/components/DealTimer';
import PromoBanners from '@/components/PromoBanners';
import { getFeaturedProducts, getTrendingProducts, getRecentlyViewed } from '@/data/products';
import AddToCartButton from '@/components/product/AddToCartButton';

export default function Home() {
  const featured = getFeaturedProducts();
  const trending = getTrendingProducts();
  const recentlyViewed = getRecentlyViewed();

  return (
    <main className={styles.main}>

      <HeroCarousel />
      <CategoryPills />
      <DealTimer />

      <div className="container">

        {/* PROMO BANNERS */}
        <PromoBanners />

        {/* Featured Products */}
        <section className={styles.featuredSection}>
          <div className={styles.sectionHeader}>
            <h2>🔥 Featured Products</h2>
            <Link href="/products" className={styles.viewAll}>View All →</Link>
          </div>

          <div className={styles.productGrid}>
            {featured.map((product) => (
              <div key={product.id} className={`glass-panel ${styles.productCard}`}>
                <Link href={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {product.badge && <span className={styles.badge}>{product.badge}</span>}
                  <div className={styles.productImagePlaceholder}>
                    <div className={styles.imageIcon}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={product.image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                  </div>
                  <div className={styles.productInfo}>
                    <span className={styles.productCategory}>{product.category}</span>
                    <h3>{product.title}</h3>
                    <div className={styles.productMeta}>
                      <div className={styles.productPrice}>
                        <span className={styles.currentPrice}>₹{product.price.toLocaleString()}</span>
                        {product.originalPrice > product.price && (
                          <span className={styles.originalPrice}>₹{product.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                      <div className={styles.productRating}>★ {product.rating}</div>
                    </div>
                    {product.highlights && product.highlights.length > 0 && (
                      <ul className={styles.cardHighlights}>
                        {product.highlights.slice(0, 3).map((highlight, idx) => (
                          <li key={idx}>{highlight}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Link>
                <div className={styles.cardAction} style={{ padding: '0 1.25rem 1.25rem 1.25rem' }}>
                  <AddToCartButton
                    productId={product.id}
                    name={product.title}
                    price={product.price}
                    image={product.image}
                    inStock={product.inStock}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trending Now */}
        <section className={styles.featuredSection}>
          <div className={styles.sectionHeader}>
            <h2>📈 Trending Now</h2>
            <Link href="/products" className={styles.viewAll}>View All →</Link>
          </div>

          <div className={styles.trendingGrid}>
            {trending.map((product, index) => (
              <Link href={`/product/${product.id}`} key={product.id} className={`glass-panel ${styles.trendingCard}`}>
                <div className={styles.trendRank}>#{index + 1}</div>
                <div className={styles.trendImage}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className={styles.trendInfo}>
                  <h4>{product.title}</h4>
                  <div className={styles.trendMeta}>
                    <span className={styles.currentPrice}>₹{product.price.toLocaleString()}</span>
                    <span className={styles.trendReviews}>{product.reviewsCount.toLocaleString()} reviews</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recently Viewed */}
        <section className={styles.featuredSection}>
          <div className={styles.sectionHeader}>
            <h2>👁️ Recently Viewed</h2>
          </div>

          <div className={styles.recentGrid}>
            {recentlyViewed.map((product) => (
              <div key={product.id} className={`glass-panel ${styles.recentCard}`}>
                <Link href={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', gap: '1rem', width: '100%' }}>
                  <div className={styles.recentImage}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-md)' }} />
                  </div>
                  <div className={styles.recentInfo}>
                    <span className={styles.productCategory}>{product.brand}</span>
                    <h4>{product.title}</h4>
                    <span className={styles.currentPrice}>₹{product.price.toLocaleString()}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Shop by Brand */}
        <section className={styles.featuredSection}>
          <div className={styles.sectionHeader}>
            <h2>🏷️ Shop by Brand</h2>
          </div>
          <div className={styles.brandGrid}>
            {['Sony', 'Samsung', 'Apple', 'Nike', "Levi's", 'boAt', 'Dyson', 'Prestige'].map((brand) => (
              <Link href={`/products?brand=${encodeURIComponent(brand)}`} key={brand} className={`glass-panel ${styles.brandCard}`}>
                <div className={styles.brandName}>{brand}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Why Shop With Us */}
        <section className={styles.featuredSection}>
          <div className={styles.sectionHeader}>
            <h2>🌟 Why Shop with Vyaparpe?</h2>
          </div>
          <div className={styles.whyGrid}>
            <div className={styles.whyCard}>
              <span className={styles.whyIcon}>🚚</span>
              <h4>Free Delivery</h4>
              <p>On orders above ₹499</p>
            </div>
            <div className={styles.whyCard}>
              <span className={styles.whyIcon}>🔄</span>
              <h4>Easy Returns</h4>
              <p>7-day hassle-free returns</p>
            </div>
            <div className={styles.whyCard}>
              <span className={styles.whyIcon}>🛡️</span>
              <h4>Genuine Products</h4>
              <p>100% authentic guarantee</p>
            </div>
            <div className={styles.whyCard}>
              <span className={styles.whyIcon}>💳</span>
              <h4>Secure Payments</h4>
              <p>UPI, Cards, Wallets, COD</p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
