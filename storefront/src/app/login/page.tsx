'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './Auth.module.css';

export default function LoginPage() {
    const [loginMethod, setLoginMethod] = useState<'email' | 'otp'>('otp');
    const [phone, setPhone] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (loginMethod === 'otp' && phone) {
            // Simulate OTP verification and login
            const mockUser = {
                phone: phone,
                name: '',
                email: '',
                isProfileComplete: false // Triggers the popup later
            };
            localStorage.setItem('userAuth', JSON.stringify(mockUser));
        } else if (loginMethod === 'email') {
            // Simulate regular email login
            const mockUser = {
                email: 'user@example.com',
                name: 'Existing User',
                phone: '', // Intentionally missing to trigger popup
                isProfileComplete: false
            };
            localStorage.setItem('userAuth', JSON.stringify(mockUser));
        }

        window.location.href = '/account/orders';
    };

    const handleSocialLogin = (provider: string) => {
        const mockUser = {
            email: `user@${provider}.com`,
            name: `${provider} User`,
            phone: '', // Intentionally missing to trigger popup
            isProfileComplete: false
        };
        localStorage.setItem('userAuth', JSON.stringify(mockUser));
        window.location.href = '/account/orders';
    };

    return (
        <main className={styles.authContainer}>
            <div className={`glass-panel ${styles.authCard}`}>
                <div className={styles.authHeader}>
                    <h2>Welcome Back</h2>
                    <p>Login to access your orders and saved details.</p>
                </div>

                <div className={styles.methodToggle}>
                    <button
                        className={`${styles.toggleBtn} ${loginMethod === 'email' ? styles.active : ''}`}
                        onClick={() => setLoginMethod('email')}
                    >
                        Email
                    </button>
                    <button
                        className={`${styles.toggleBtn} ${loginMethod === 'otp' ? styles.active : ''}`}
                        onClick={() => setLoginMethod('otp')}
                    >
                        Mobile OTP
                    </button>
                </div>

                <div className={styles.socialAuth}>
                    <button className={styles.socialBtn} onClick={() => handleSocialLogin('Google')}>
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} />
                        Continue with Google
                    </button>
                    <button className={styles.socialBtn} onClick={() => handleSocialLogin('Apple')}>
                        <img src="https://www.svgrepo.com/show/512008/apple-173.svg" alt="Apple" width={20} style={{ filter: 'invert(1)' }} />
                        Continue with Apple
                    </button>
                </div>

                <div className={styles.divider}>
                    <span>OR</span>
                </div>

                <form onSubmit={handleLogin} className={styles.authForm}>
                    {loginMethod === 'email' ? (
                        <>
                            <div className={styles.formGroup}>
                                <label>Email Address</label>
                                <input type="email" placeholder="you@example.com" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Password</label>
                                <input type="password" placeholder="••••••••" required />
                            </div>
                            <div className={styles.forgotPassword}>
                                <a href="#">Forgot your password?</a>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={styles.formGroup}>
                                <label>Mobile Number</label>
                                <div className={styles.phoneInput}>
                                    <span className={styles.countryCode}>+91</span>
                                    <input
                                        type="tel"
                                        placeholder="9876543210"
                                        required
                                        pattern="[0-9]{10}"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                    />
                                </div>
                            </div>
                            <p className={styles.otpHint}>We will send a 6-digit OTP to your number.</p>
                        </>
                    )}

                    <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
                        {loginMethod === 'email' ? 'Login' : 'Send OTP'}
                    </button>
                </form>

                <div className={styles.authFooter}>
                    <p>Don&apos;t have an account? <Link href="/signup">Sign up here</Link></p>
                </div>
            </div>
        </main>
    );
}
