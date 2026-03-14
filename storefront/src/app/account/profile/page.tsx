export default function AccountProfilePage() {
    return (
        <div>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '1.5rem', fontFamily: "'Outfit', sans-serif" }}>
                Profile Overview
            </h2>

            {/* Loyalty Tier Badge */}
            <div className="glass-panel" style={{ padding: '1.25rem 1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ fontSize: '2rem' }}>🥈</div>
                    <div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Your Loyalty Tier</div>
                        <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#c0c0c0' }}>Silver Member</div>
                    </div>
                </div>
                <div style={{ flex: 1, minWidth: '200px', maxWidth: '350px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                        <span>2,340 pts</span>
                        <span>5,000 pts for 🥇 Gold</span>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '6px', height: '6px', overflow: 'hidden' }}>
                        <div style={{ width: '47%', height: '100%', background: 'linear-gradient(90deg, #c0c0c0, #fbbf24)', borderRadius: '6px' }} />
                    </div>
                </div>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.25rem' }}>Personal Information</h3>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>First Name</label>
                            <input type="text" defaultValue="Aryan" style={{ background: 'var(--bg-body)', border: '1px solid var(--border-color)', color: 'var(--text-main)', padding: '0.75rem', borderRadius: '4px' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>Last Name</label>
                            <input type="text" defaultValue="Kumar" style={{ background: 'var(--bg-body)', border: '1px solid var(--border-color)', color: 'var(--text-main)', padding: '0.75rem', borderRadius: '4px' }} />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>Email Address</label>
                            <input type="email" defaultValue="aryan@example.com" style={{ background: 'var(--bg-body)', border: '1px solid var(--border-color)', color: 'var(--text-main)', padding: '0.75rem', borderRadius: '4px' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>Mobile Number</label>
                            <input type="tel" defaultValue="+91 9876543210" style={{ background: 'var(--bg-body)', border: '1px solid var(--border-color)', color: 'var(--text-main)', padding: '0.75rem', borderRadius: '4px' }} />
                        </div>
                    </div>

                    <button type="button" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>
                        Save Changes
                    </button>
                </form>
            </div>

            <div className="glass-panel" style={{ padding: '2rem' }}>
                <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.25rem' }}>Password Settings</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>You can update your login password here.</p>
                <button className="btn btn-outline" style={{ color: 'var(--text-main)', borderColor: 'var(--border-color)' }}>Change Password</button>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', marginTop: '2rem' }}>
                <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', fontSize: '1.25rem' }}>Notification Preferences</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                        <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} />
                        <span style={{ fontSize: '0.95rem' }}>Order Updates & Shipping (Email & SMS)</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                        <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} />
                        <span style={{ fontSize: '0.95rem' }}>Promotional Offers & Discounts (Email)</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                        <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} />
                        <span style={{ fontSize: '0.95rem' }}>Price Drop Alerts (Push Notifications)</span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                        <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} />
                        <span style={{ fontSize: '0.95rem' }}>Monthly Newsletter</span>
                    </label>
                </div>
                <button type="button" className="btn btn-outline" style={{ marginTop: '1.5rem' }}>Update Preferences</button>
            </div>
        </div>
    );
}
