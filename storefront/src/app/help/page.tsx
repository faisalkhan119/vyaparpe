'use client';
import { useState } from 'react';
import styles from './Help.module.css';

export default function HelpPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            q: "How long does delivery take?",
            a: "Standard delivery typically takes 3-5 business days. Express delivery is available for eligible pin codes and usually delivers within 1-2 business days."
        },
        {
            q: "What is your return policy?",
            a: "We offer a 7-day hassle-free return policy for most items. The product must be in its original packaging and unused. Some electronics may only be eligible for replacement in case of defects."
        },
        {
            q: "How can I track my order?",
            a: "Once your order is shipped, you will receive an SMS and an email with the tracking link. You can also track your order directly from your Account Dashboard under 'My Orders'."
        },
        {
            q: "Do you offer direct EMI options?",
            a: "Yes! We support No-Cost EMI via major credit cards and partner NBFCs. You can explore the exact tenure options on the payment page during checkout."
        },
        {
            q: "What do I do if my payment fails but money was deducted?",
            a: "Please wait 24 hours. Usually, the amount bounces back to your source account automatically. If it doesn't, contact our support team with your transaction reference."
        }
    ];

    return (
        <main className={styles.helpContainer}>
            <div className="container">
                <div className={styles.helpHeader}>
                    <h1>Help Center & FAQs</h1>
                    <p>Find answers to common questions below or search for a specific topic.</p>

                    <div className={styles.searchBar}>
                        <input type="text" placeholder="Search for help..." />
                        <button className="btn btn-primary">Search</button>
                    </div>
                </div>

                <div className={styles.faqSection}>
                    <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>

                    <div className={styles.accordionContainer}>
                        {faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className={`${styles.accordionItem} ${openIndex === idx ? styles.active : ''}`}
                            >
                                <div
                                    className={styles.accordionHeader}
                                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                >
                                    <h3>{faq.q}</h3>
                                    <span className={styles.chevron}>{openIndex === idx ? '−' : '+'}</span>
                                </div>

                                {openIndex === idx && (
                                    <div className={styles.accordionContent}>
                                        <p>{faq.a}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.contactPrompt}>
                    <h3>Still need help?</h3>
                    <p>Our support team is available 24/7 to assist you.</p>
                    <a href="/contact" className="btn btn-outline">Contact Support</a>
                </div>
            </div>
        </main>
    );
}
