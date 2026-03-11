'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './Blog.module.css';

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const posts = [
        { id: 1, title: '10 Must-Have Gadgets for 2026', excerpt: 'From wireless earbuds to smart home devices, discover the tech that\'s defining this year.', category: 'Tech', date: 'Mar 8, 2026', readTime: '5 min', image: '📱' },
        { id: 2, title: 'The Ultimate Guide to Organic Grocery Shopping', excerpt: 'Learn how to shop smart, save money, and eat healthy with our complete organic grocery guide.', category: 'Lifestyle', date: 'Mar 5, 2026', readTime: '8 min', image: '🥦' },
        { id: 3, title: 'How to Style Your Home on a Budget', excerpt: 'Transform your living space with these affordable and trendy home décor ideas.', category: 'Home', date: 'Mar 1, 2026', readTime: '6 min', image: '🏠' },
        { id: 4, title: 'Top 5 Dry Fruit Combos for Health Enthusiasts', excerpt: 'Boost your immunity and energy with these power-packed dry fruit combinations.', category: 'Health', date: 'Feb 25, 2026', readTime: '4 min', image: '🥜' },
        { id: 5, title: 'Festival Shopping Guide: Holi Edition', excerpt: 'Everything you need for a colorful and joyful Holi celebration — colors, sweets, and more.', category: 'Festival', date: 'Feb 20, 2026', readTime: '7 min', image: '🎨' },
    ];
    const categories = ['All', 'Tech', 'Lifestyle', 'Home', 'Health', 'Festival'];

    const filteredPosts = posts.filter(post => activeCategory === 'All' || post.category === activeCategory);
    
    // Safety check in case a category has no posts
    const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
    const remainingPosts = filteredPosts.slice(1);

    return (
        <main className={styles.blogContainer}>
            <div className="container">
                <div className={styles.blogHeader}>
                    <h1>Our Blog</h1>
                    <p>Stories, tips, and inspiration for everyday life</p>
                </div>

                <div className={styles.categoryTabs}>
                    {categories.map((cat) => (
                        <button 
                            key={cat} 
                            onClick={() => setActiveCategory(cat)}
                            className={`${styles.catTab} ${cat === activeCategory ? styles.active : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Featured Post */}
                {featuredPost && (
                    <Link href="/blog" className={`glass-panel ${styles.featuredPost}`}>
                        <div className={styles.featuredImage}>{featuredPost.image}</div>
                        <div className={styles.featuredContent}>
                            <span className={styles.catBadge}>{featuredPost.category}</span>
                            <h2>{featuredPost.title}</h2>
                            <p>{featuredPost.excerpt}</p>
                            <div className={styles.postMeta}>{featuredPost.date} · {featuredPost.readTime} read</div>
                        </div>
                    </Link>
                )}

                {filteredPosts.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
                        <h3 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>No posts found</h3>
                        <p>No articles available in this category yet.</p>
                    </div>
                )}

                {/* Post Grid */}
                {remainingPosts.length > 0 && (
                    <div className={styles.postGrid}>
                        {remainingPosts.map((post) => (
                            <Link href="/blog" key={post.id} className={`glass-panel ${styles.postCard}`}>
                                <div className={styles.cardImage}>{post.image}</div>
                                <div className={styles.cardContent}>
                                    <span className={styles.catBadge}>{post.category}</span>
                                    <h3 className={styles.cardTitle}>{post.title}</h3>
                                    <p className={styles.cardExcerpt}>{post.excerpt}</p>
                                    <div className={styles.postMeta}>{post.date} · {post.readTime} read</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
