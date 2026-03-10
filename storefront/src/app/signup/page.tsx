'use client';
import Link from 'next/link';
import styles from '../login/Auth.module.css'; // Reusing login styles

export default function SignupPage() {
    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        window.location.href = '/account/orders';
    };

    return (
        <main className={styles.authContainer}>
            <div className={`glass-panel ${styles.authCard}`}>
                <div className={styles.authHeader}>
                    <h2>Create an Account</h2>
                    <p>Join Vyaparpe to earn loyalty points and track orders.</p>
                </div>

                <div className={styles.socialAuth} style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
                    <button className={styles.socialBtn}>
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} />
                        Continue with Google
                    </button>
                    <button className={styles.socialBtn}>
                        <img src="https://www.svgrepo.com/show/512008/apple-173.svg" alt="Apple" width={20} style={{ filter: 'invert(1)' }} />
                        Continue with Apple
                    </button>
                </div>

                <div className={styles.divider}>
                    <span>OR</span>
                </div>

                <form onSubmit={handleSignup} className={styles.authForm}>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label>First Name</label>
                            <input type="text" placeholder="John" required />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Last Name</label>
                            <input type="text" placeholder="Doe" required />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Email Address</label>
                        <input type="email" placeholder="you@example.com" required />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Mobile Number</label>
                        <div className={styles.phoneInput}>
                            <span className={styles.countryCode}>+91</span>
                            <input type="tel" placeholder="9876543210" required pattern="[0-9]{10}" />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Password</label>
                        <input type="password" placeholder="Create a strong password" required />
                    </div>

                    <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
                        Create Account
                    </button>

                    <p className={styles.termsNote}>
                        By signing up, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </form>

                <div className={styles.authFooter}>
                    <p>Already have an account? <Link href="/login">Log in instead</Link></p>
                </div>
            </div>
        </main>
    );
}
