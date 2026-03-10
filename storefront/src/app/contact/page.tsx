'use client';
import styles from './Contact.module.css';

export default function ContactPage() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thank you for contacting us! We will get back to you shortly.');
    };

    return (
        <main className={styles.contactContainer}>
            <div className="container">
                <div className={styles.contactHeader}>
                    <h1>Contact Us</h1>
                    <p>Have a question or need assistance? We&apos;re here to help.</p>
                </div>

                <div className={styles.contactGrid}>
                    {/* Contact Information */}
                    <div className={styles.contactInfo}>
                        <div className={`glass-panel ${styles.infoCard}`}>
                            <div className={styles.iconBox}>📍</div>
                            <div>
                                <h3>Our Office</h3>
                                <p>Vyaparpe Tech Hub, Unit 901<br />Bandra Kurla Complex<br />Mumbai, Maharashtra 400051</p>
                            </div>
                        </div>

                        <div className={`glass-panel ${styles.infoCard}`}>
                            <div className={styles.iconBox}>📞</div>
                            <div>
                                <h3>Phone</h3>
                                <p>+91 1800-123-4567<br />Mon-Fri, 9am - 6pm IST</p>
                            </div>
                        </div>

                        <div className={`glass-panel ${styles.infoCard}`}>
                            <div className={styles.iconBox}>✉️</div>
                            <div>
                                <h3>Email</h3>
                                <p>support@vyaparpe.com<br />business@vyaparpe.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className={`glass-panel ${styles.formCard}`}>
                        <h2>Send a Message</h2>
                        <form onSubmit={handleSubmit} className={styles.contactForm}>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label>First Name</label>
                                    <input type="text" required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Last Name</label>
                                    <input type="text" required />
                                </div>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Email Address</label>
                                <input type="email" required />
                            </div>

                            <div className={styles.formGroup}>
                                <label>Subject</label>
                                <select required>
                                    <option value="">Select a topic...</option>
                                    <option value="order">Order Inquiry</option>
                                    <option value="return">Returns & Refunds</option>
                                    <option value="product">Product Information</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label>Message</label>
                                <textarea rows={5} required></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
