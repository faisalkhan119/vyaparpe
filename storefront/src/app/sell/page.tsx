'use client';
import { useState } from 'react';
import styles from './Sell.module.css';

export default function SellPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        businessName: '',
        phone: '',
        email: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call to submit lead
        setTimeout(() => setIsSubmitted(true), 800);
    };

    return (
        <main className={styles.sellContainer}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.circle1}></div>
                <div className={styles.circle2}></div>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Become a VyaparPe Seller Today</h1>
                    <p className={styles.heroSubtitle}>
                        Join India's fastest-growing e-commerce platform. Reach millions of customers
                        across 29 states and 7 union territories with 0% commission on your first 100 orders!
                    </p>
                    <button
                        className={styles.startBtn}
                        onClick={() => document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Start Selling Now
                    </button>
                </div>
            </section>

            {/* Benefits Section */}
            <section className={styles.benefitsSection}>
                <h2 className={styles.sectionTitle}>Why Sell on VyaparPe?</h2>
                <div className={styles.benefitsGrid}>
                    <div className={styles.benefitCard}>
                        <div className={styles.icon}>💸</div>
                        <h3 className={styles.benefitTitle}>0% Commission Cost</h3>
                        <p className={styles.benefitDesc}>Keep 100% of your profits for the first 3 months. Simple and transparent pricing thereafter with no hidden charges.</p>
                    </div>
                    <div className={styles.benefitCard}>
                        <div className={styles.icon}>🚀</div>
                        <h3 className={styles.benefitTitle}>Superfast Onboarding</h3>
                        <p className={styles.benefitDesc}>Get your store live in under 15 minutes. Just upload your GST and PAN details, and you're good to start receiving orders.</p>
                    </div>
                    <div className={styles.benefitCard}>
                        <div className={styles.icon}>🚚</div>
                        <h3 className={styles.benefitTitle}>Pan-India Delivery</h3>
                        <p className={styles.benefitDesc}>Leverage our vast logistics network. We pick up from your warehouse and deliver straight to the customer's doorstep.</p>
                    </div>
                </div>
            </section>

            {/* Lead Capture Form Section */}
            <section id="registration-form" className={styles.leadSection}>
                <div className={styles.leadContainer}>
                    <h2>Ready to grow your business?</h2>
                    <p>Leave your details below and our onboarding team will call you within 24 hours.</p>

                    {isSubmitted ? (
                        <div className={styles.successMessage}>
                            <h3>🎉 Details Submitted Successfully!</h3>
                            <p>Thank you for your interest in VyaparPe. One of our seller onboarding executives will contact you at <strong>{formData.phone}</strong> shortly.</p>
                        </div>
                    ) : (
                        <form className={styles.leadForm} onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label>Your Full Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Ramesh Kumar"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Business / Company Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Ramesh Electronics"
                                    value={formData.businessName}
                                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Mobile Number</label>
                                <input
                                    type="tel"
                                    required
                                    pattern="[0-9]{10}"
                                    placeholder="9876543210"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="contact@company.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <button type="submit" className={styles.submitBtn}>
                                Request Callback
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </main>
    );
}
