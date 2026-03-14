import Link from 'next/link';
import styles from './page.module.css';
import HeroCarousel from './HeroCarousel';
import CategoryPills from '@/components/CategoryPills';
import DealTimer from '@/components/DealTimer';
import PromoBanners from '@/components/PromoBanners';
import RecentlyViewed from '@/components/RecentlyViewed';
import SubCategoryStrip from '@/components/SubCategoryStrip';
import StillLooking from '@/components/StillLooking';
import { getFeaturedProducts, getTrendingProducts } from '@/data/products';
import AddToCartButton from '@/components/product/AddToCartButton';

interface HomeProps {
  searchParams: Promise<{ category?: string; platform?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const activeCategory = params.category || '';
  const activePlatform = params.platform || 'vyaparpe';

  const featured = getFeaturedProducts(activeCategory);
  const trending = getTrendingProducts(activeCategory);

  return (
    <main className={styles.main}>

      <CategoryPills activeCategory={activeCategory} platform={activePlatform} />
      <SubCategoryStrip platform={activePlatform} category={activeCategory} />
      <HeroCarousel category={activeCategory} />


      <DealTimer category={activeCategory} />

      <div className="container">

        {/* Personalized "Still Looking" Section */}
        <StillLooking />

        {/* PROMO BANNERS */}
        <PromoBanners category={activeCategory} />

        {/* Featured Products */}
        <section className={styles.featuredSection}>
          <div className={styles.sectionHeader}>
            <h2>🔥 Featured Products</h2>
            <Link href="/products" className={styles.viewAll}>View All →</Link>
          </div>

          <div className={styles.productGrid}>
            {featured.map((product: any) => (
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
                        {product.highlights.slice(0, 3).map((highlight: string, idx: number) => (
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
            {trending.map((product: any, index: number) => (
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

        {/* Shop by Brand */}
        {(() => {
          const brandSet = new Set<string>();
          [...featured, ...trending].forEach(p => brandSet.add(p.brand));
          const dynamicBrands = Array.from(brandSet).slice(0, 8);
          
          if (dynamicBrands.length === 0) return null;

          return (
            <section className={styles.featuredSection}>
              <div className={styles.sectionHeader}>
                <h2>🏷️ Shop by Brand {activeCategory && `in ${activeCategory}`}</h2>
              </div>
              <div className={styles.brandGrid}>
                {dynamicBrands.map((brand) => (
                  <Link href={`/products?brand=${encodeURIComponent(brand)}`} key={brand} className={`glass-panel ${styles.brandCard}`}>
                    <div className={styles.brandName}>{brand}</div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })()}

        {/* Recently Viewed */}
        <RecentlyViewed category={activeCategory} />

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
