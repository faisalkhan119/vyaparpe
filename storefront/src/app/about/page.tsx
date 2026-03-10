import Link from 'next/link';

export default function AboutPage() {
    return (
        <main style={{ padding: '120px 0 4rem 0', minHeight: 'calc(100vh - 300px)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '3rem', color: 'white', marginBottom: '1rem', fontFamily: "'Outfit', sans-serif" }}>About Vyaparpe</h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                        Empowering commerce with cutting-edge technology and unparalleled design.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
                    <div className="glass-panel" style={{ padding: '2.5rem' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
                        <h2 style={{ color: 'white', marginBottom: '1rem' }}>Our Mission</h2>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                            We believe in making digital commerce accessible, fast, and secure for everyone.
                            Our mission is to bridge the gap between premium quality products and seamless digital experiences.
                        </p>
                    </div>

                    <div className="glass-panel" style={{ padding: '2.5rem' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💎</div>
                        <h2 style={{ color: 'white', marginBottom: '1rem' }}>Our Promise</h2>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                            We carefully curate every item on our platform, ensuring that when you shop with Vyaparpe,
                            you are getting nothing but the absolute best in class, with a guarantee of quality.
                        </p>
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), transparent)' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1.5rem' }}>Join the Journey</h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
                        Over 1 Million customers trust us for their daily needs. Experience the next generation of e-commerce today.
                    </p>
                    <Link href="/products" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                        Explore Our Catalog
                    </Link>
                </div>
            </div>
        </main>
    );
}
