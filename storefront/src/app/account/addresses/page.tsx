import styles from '../AccountPages.module.css';

export default function AddressesPage() {
    return (
        <div>
            <div className={styles.pageHeader}>
                <h2>Saved Addresses</h2>
            </div>

            <div className={styles.addressGrid}>

                <div className={styles.addressCard}>
                    <span className={styles.defaultBadge}>Default</span>
                    <div className={styles.addressName}>Aryan Kumar (Home)</div>
                    <div className={styles.addressText}>
                        123 Park Street, Apartment 4B<br />
                        Chembur East<br />
                        Mumbai, Maharashtra 400071<br />
                        +91 9876543210
                    </div>
                    <div className={styles.addressActions}>
                        <button>Edit</button>
                        <button style={{ color: 'var(--danger)' }}>Delete</button>
                    </div>
                </div>

                <div className={styles.addressCard}>
                    <div className={styles.addressName}>Aryan Kumar (Office)</div>
                    <div className={styles.addressText}>
                        Vyaparpe Tech Hub, Unit 901<br />
                        Bandra Kurla Complex<br />
                        Mumbai, Maharashtra 400051<br />
                        +91 9988776655
                    </div>
                    <div className={styles.addressActions}>
                        <button>Edit</button>
                        <button>Set as Default</button>
                        <button style={{ color: 'var(--danger)' }}>Delete</button>
                    </div>
                </div>

                <div className={`${styles.addressCard} ${styles.addAddressCard}`}>
                    <div className={styles.addIcon}>+</div>
                    <span style={{ color: 'white', fontWeight: 600 }}>Add New Address</span>
                </div>

            </div>
        </div>
    );
}
