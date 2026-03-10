import Link from 'next/link';
import styles from './Blog.module.css';

export default function BlogPage() {
    const posts = [
        { id: 1, title: '10 Must-Have Gadgets for 2026', excerpt: 'From wireless earbuds to smart home devices, discover the tech that\'s defining this year.', category: 'Tech', date: 'Mar 8, 2026', readTime: '5 min', image: '📱' },
        { id: 2, title: 'The Ultimate Guide to Organic Grocery Shopping', excerpt: 'Learn how to shop smart, save money, and eat healthy with our complete organic grocery guide.', category: 'Lifestyle', date: 'Mar 5, 2026', readTime: '8 min', image: '🥦' },
        { id: 3, title: 'How to Style Your Home on a Budget', excerpt: 'Transform your living space with these affordable and trendy home décor ideas.', category: 'Home', date: 'Mar 1, 2026', readTime: '6 min', image: '🏠' },
        { id: 4, title: 'Top 5 Dry Fruit Combos for Health Enthusiasts', excerpt: 'Boost your immunity and energy with these power-packed dry fruit combinations.', category: 'Health', date: 'Feb 25, 2026', readTime: '4 min', image: '🥜' },
        { id: 5, title: 'Festival Shopping Guide: Holi Edition', excerpt: 'Everything you need for a colorful and joyful Holi celebration — colors, sweets, and more.', category: 'Festival', date: 'Feb 20, 2026', readTime: '7 min', image: '🎨' },
    ];

    const categories = ['All', 'Tech', 'Lifestyle', 'Home', 'Health', 'Festival'];

    return (
        <main className={styles.blogContainer}>
            <div className="container">
                <div className={styles.blogHeader}>
                    <h1>Our Blog</h1>
                    <p>Stories, tips, and inspiration for everyday life</p>
                </div>

                <div className={styles.categoryTabs}>
                    {categories.map((cat) => (
                        <button key={cat} className={`${styles.catTab} ${cat === 'All' ? styles.active : ''}`}>{cat}</button>
                    ))}
                </div>

                {/* Featured Post */}
                <Link href="/blog" className={`glass-panel ${styles.featuredPost}`}>
                    <div className={styles.featuredImage}>{posts[0].image}</div>
                    <div className={styles.featuredContent}>
                        <span className={styles.catBadge}>{posts[0].category}</span>
                        <h2>{posts[0].title}</h2>
                        <p>{posts[0].excerpt}</p>
                        <div className={styles.postMeta}>{posts[0].date} · {posts[0].readTime} read</div>
                    </div>
                </Link>

                {/* Post Grid */}
                <div className={styles.postGrid}>
                    {posts.slice(1).map((post) => (
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
            </div>
        </main>
    );
}
