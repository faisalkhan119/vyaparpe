'use client';
import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import CartDrawer from './cart/CartDrawer';
import NotificationDrawer from './NotificationDrawer';
import styles from './Navbar.module.css';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const profileRef = useRef<HTMLDivElement>(null);
    const { totalItems: cartCount } = useCart();
    const [userName, setUserName] = useState('Guest User');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setMounted(true);
        try {
            const auth = localStorage.getItem('userAuth');
            if (auth) {
                const parsed = JSON.parse(auth);
                setUserName(parsed.name || parsed.email || 'User');
                setIsLoggedIn(true);
            }
        } catch { /* ignore */ }
    }, []);

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredProducts = useMemo(() => {
        if (!searchQuery.trim()) return [];
        const lowerQ = searchQuery.toLowerCase();
        return products.filter(p =>
            p.title.toLowerCase().includes(lowerQ) ||
            p.category.toLowerCase().includes(lowerQ) ||
            p.brand.toLowerCase().includes(lowerQ)
        );
    }, [searchQuery]);

    const handleSearchSelect = (productId: string) => {
        setIsSearchOpen(false);
        setSearchQuery('');
        router.push(`/product/${productId}`);
    };

    const currentThemeLabel = !mounted ? 'System' : theme === 'dark' ? '🌙 Dark' : theme === 'light' ? '☀️ Light' : '💻 System';

    return (
        <>
            <nav className={styles.navbar}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
                    <Link href="/" className={styles.logo}>
                        <Image src="/vyapaarpe_logo.jpg" alt="VyaparPe" width={140} height={44} className={styles.logoImg} priority />
                    </Link>
                    <nav className={styles.navLinks}>
                        <Link href="/products" className={styles.navLink}>Products</Link>
                        <Link href="/blog" className={styles.navLink}>Blog</Link>
                        <Link href="/deals" className={styles.navLink}>Deals</Link>
                        <Link href="/gift-cards" className={styles.navLink}>Gift Cards</Link>
                        <Link href="/track-order" className={styles.navLink}>Track Order</Link>
                    </nav>
                    <div className={styles.navActions}>
                        <button
                            className={styles.searchCommand}
                            onClick={() => setIsSearchOpen(true)}
                            suppressHydrationWarning={true}
                        >
                            <span>🔍 Search...</span>
                            <kbd>Ctrl+K</kbd>
                        </button>
                        <button className={styles.bellBtn} onClick={() => setIsNotifOpen(true)} title="Notifications">
                            🔔
                            <span className={styles.bellDot}></span>
                        </button>
                        <button className={`btn btn-primary ${styles.mobileHide}`} onClick={() => setIsCartOpen(true)}>🛒 Cart ({cartCount})</button>

                        {/* User Profile Dropdown */}
                        <div className={`${styles.profileWrapper} ${styles.mobileHide}`} ref={profileRef}>
                            <button
                                className={styles.profileBtn}
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                title="Account & Settings"
                            >
                                <span className={styles.profileAvatar}>👤</span>
                            </button>

                            {isProfileOpen && (
                                <div className={styles.profileDropdown}>
                                    <div className={styles.profileHeader}>
                                        <div className={styles.profileAvatarLg}>👤</div>
                                        <div>
                                            <div className={styles.profileName}>{userName}</div>
                                            {!isLoggedIn ? (
                                                <Link href="/login" className={styles.profileLoginLink} onClick={() => setIsProfileOpen(false)}>
                                                    Login / Sign Up →
                                                </Link>
                                            ) : (
                                                <button
                                                    className={styles.profileLoginLink}
                                                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'var(--primary)' }}
                                                    onClick={() => {
                                                        localStorage.removeItem('userAuth');
                                                        setUserName('Guest User');
                                                        setIsLoggedIn(false);
                                                        setIsProfileOpen(false);
                                                    }}
                                                >
                                                    Logout →
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className={styles.profileDivider} />

                                    <div className={styles.profileSection}>
                                        <div className={styles.profileSectionTitle}>Account</div>
                                        <Link href="/account" className={styles.profileMenuItem} onClick={() => setIsProfileOpen(false)}>
                                            � My Orders
                                        </Link>
                                        <Link href="/account/wishlist" className={styles.profileMenuItem} onClick={() => setIsProfileOpen(false)}>
                                            ❤️ Wishlist
                                        </Link>
                                        <Link href="/account/wallet" className={styles.profileMenuItem} onClick={() => setIsProfileOpen(false)}>
                                            💰 Wallet
                                        </Link>
                                    </div>

                                    <div className={styles.profileDivider} />

                                    <div className={styles.profileSection}>
                                        <div className={styles.profileSectionTitle}>Preferences</div>
                                        <div className={styles.profileSettingRow}>
                                            <span>🎨 Theme</span>
                                            {mounted && (
                                                <div className={styles.themeOptions}>
                                                    <button
                                                        className={`${styles.themeBtn} ${theme === 'light' ? styles.themeBtnActive : ''}`}
                                                        onClick={() => setTheme('light')}
                                                    >☀️</button>
                                                    <button
                                                        className={`${styles.themeBtn} ${theme === 'dark' ? styles.themeBtnActive : ''}`}
                                                        onClick={() => setTheme('dark')}
                                                    >🌙</button>
                                                    <button
                                                        className={`${styles.themeBtn} ${theme === 'system' ? styles.themeBtnActive : ''}`}
                                                        onClick={() => setTheme('system')}
                                                    >💻</button>
                                                </div>
                                            )}
                                        </div>
                                        <div className={styles.profileSettingRow}>
                                            <span>🌐 Language</span>
                                            <select className={styles.settingSelect} defaultValue="en">
                                                <option value="en">English</option>
                                                <option value="hi">हिंदी</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className={styles.profileDivider} />

                                    <Link href="/help" className={styles.profileMenuItem} onClick={() => setIsProfileOpen(false)}>
                                        ❓ Help & Support
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div >
            </nav >

            {/* Global Search Modal */}
            {
                isSearchOpen && (
                    <div className={styles.searchModalOverlay} onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}>
                        <div className={`glass-panel ${styles.searchModal}`} onClick={(e) => e.stopPropagation()}>
                            <div className={styles.searchInputWrapper}>
                                <span>🔍</span>
                                <input
                                    type="text"
                                    placeholder="Search products, brands, and categories..."
                                    className={styles.searchInput}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                />
                                <button className={styles.closeBtn} onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}>✕</button>
                            </div>

                            {searchQuery.trim() === '' ? (
                                <div className={styles.searchResults}>
                                    <div className={styles.suggestionGroup}>
                                        <h4>Recent Searches</h4>
                                        <div className={styles.tagCloud}>
                                            <span className={styles.tag} onClick={() => setSearchQuery('Sony')}>Sony Headphones</span>
                                            <span className={styles.tag} onClick={() => setSearchQuery('Samsung')}>Samsung S24</span>
                                            <span className={styles.tag} onClick={() => setSearchQuery('Nike')}>Nike</span>
                                        </div>
                                    </div>

                                    <div className={styles.suggestionGroup}>
                                        <h4>Popular Categories</h4>
                                        <div className={styles.categoryList}>
                                            <Link href="/products" onClick={() => setIsSearchOpen(false)}>📱 Electronics</Link>
                                            <Link href="/products" onClick={() => setIsSearchOpen(false)}>👕 Fashion</Link>
                                            <Link href="/products" onClick={() => setIsSearchOpen(false)}>🛒 Groceries</Link>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.searchResultsList}>
                                    {filteredProducts.length > 0 ? (
                                        filteredProducts.map(product => (
                                            <div key={product.id} className={styles.searchResultItem} onClick={() => handleSearchSelect(product.id)}>
                                                <div className={styles.searchResultEmoji}>
                                                    {product.image?.startsWith('http') || product.image?.startsWith('/') || product.image?.startsWith('data:') ? (
                                                        <img src={product.image} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                                                    ) : (
                                                        product.image
                                                    )}
                                                </div>
                                                <div className={styles.searchResultInfo}>
                                                    <h5 className={styles.searchResultTitle}>{product.title}</h5>
                                                    <span className={styles.searchResultPrice}>₹{product.price.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className={styles.noResults}>
                                            <p>No products found matching &quot;{searchQuery}&quot;</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )
            }

            {/* Notification Drawer */}
            <NotificationDrawer isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />

            {/* Slide-out Cart Drawer */}
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
