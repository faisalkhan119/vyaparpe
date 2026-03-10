export default function AccountProfilePage() {
    return (
        <div>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '1.5rem', fontFamily: "'Outfit', sans-serif" }}>
                Profile Overview
            </h2>

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
        </div>
    );
}
