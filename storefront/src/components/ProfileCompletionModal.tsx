'use client';
import { useState, useEffect } from 'react';
import styles from './ProfileCompletionModal.module.css';

export default function ProfileCompletionModal() {
    const [isOpen, setIsOpen] = useState(false);

    // Track what exactly is missing
    const [needsName, setNeedsName] = useState(false);
    const [needsEmail, setNeedsEmail] = useState(false);
    const [needsPhone, setNeedsPhone] = useState(false);

    // Form states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        // Run logic only on client side after a short delay
        const timer = setTimeout(() => {
            const userStr = localStorage.getItem('userAuth');
            if (userStr) {
                try {
                    const user = JSON.parse(userStr);

                    const isNameMissing = !user.name;
                    const isEmailMissing = !user.email;
                    const isPhoneMissing = !user.phone;

                    // If ANY of the critical profile fields are missing
                    if (isNameMissing || isEmailMissing || isPhoneMissing) {
                        setNeedsName(isNameMissing);
                        setNeedsEmail(isEmailMissing);
                        setNeedsPhone(isPhoneMissing);

                        setName(user.name || '');
                        setEmail(user.email || '');
                        setPhone(user.phone || '');

                        const lastPromptStr = localStorage.getItem('lastProfilePrompt');
                        const now = new Date().getTime();

                        // Show if never prompted, or if 5 minutes have passed since last prompt
                        const fiveMinutes = 5 * 60 * 1000;
                        if (!lastPromptStr || (now - parseInt(lastPromptStr)) > fiveMinutes) {
                            setIsOpen(true);
                            // Record that we prompted them now
                            localStorage.setItem('lastProfilePrompt', now.toString());
                        }
                    } else if (user.isProfileComplete === false) {
                        // Data is actually complete but flag was wrong, fix it silently
                        user.isProfileComplete = true;
                        localStorage.setItem('userAuth', JSON.stringify(user));
                    }
                } catch (e) {
                    console.error("Error parsing user auth data", e);
                }
            }
        }, 3000); // 3-second delay after page load

        return () => clearTimeout(timer);
    }, []);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        // Update user state to mark profile complete
        const userStr = localStorage.getItem('userAuth');
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                if (needsName) user.name = name;
                if (needsEmail) user.email = email;
                if (needsPhone) user.phone = phone;
                user.isProfileComplete = true; // No longer prompt
                localStorage.setItem('userAuth', JSON.stringify(user));
            } catch (e) { }
        }

        setIsOpen(false);
    };

    const handleSkip = () => {
        // Just close it, they will be prompted again after the timer expires
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <div className={styles.iconWrapper}>👤</div>
                    <h3>Complete Your Profile</h3>
                    <p>Add your missing details to track orders and receive exclusive offers.</p>
                </div>

                <form onSubmit={handleSave}>
                    {needsName && (
                        <div className={styles.formGroup}>
                            <label>Full Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    )}

                    {needsEmail && (
                        <div className={styles.formGroup}>
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    )}

                    {needsPhone && (
                        <div className={styles.formGroup}>
                            <label>Mobile Number <span>*</span></label>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <span style={{ padding: '0.75rem', background: 'var(--bg-body)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-muted)' }}>+91</span>
                                <input
                                    type="tel"
                                    placeholder="9876543210"
                                    required
                                    pattern="[0-9]{10}"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                    style={{ flex: 1 }}
                                />
                            </div>
                        </div>
                    )}

                    <div className={styles.actions}>
                        <button type="submit" className={styles.submitBtn}>
                            Save Details
                        </button>
                        <button type="button" onClick={handleSkip} className={styles.skipBtn}>
                            Skip for now
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
