import styles from '../Legal.module.css';

export default function PrivacyPolicyPage() {
    return (
        <>
            <h1 className={styles.title}>Privacy Policy</h1>
            <div className={styles.documentMeta}>Last Updated: March 10, 2026</div>

            <h2>1. Introduction</h2>
            <p>
                Welcome to Vyaparpe. We respect your privacy and are committed to protecting your personal data.
                This privacy policy will inform you as to how we look after your personal data when you visit our
                website and tell you about your privacy rights.
            </p>

            <h2>2. The Data We Collect About You</h2>
            <p>
                Personal data, or personal information, means any information about an individual from which that
                person can be identified. We may collect, use, store and transfer different kinds of personal data:
            </p>
            <ul>
                <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                <li><strong>Financial Data</strong> includes bank account and payment card details (processed securely via our gateways).</li>
                <li><strong>Transaction Data</strong> includes details about payments to and from you and details of products you purchased.</li>
            </ul>

            <h2>3. How We Use Your Data</h2>
            <p>
                We will only use your personal data when the law allows us to. Most commonly, we will use your data to:
            </p>
            <ul>
                <li>Process and deliver your orders.</li>
                <li>Manage your account and loyalty points.</li>
                <li>Send you service or support messages, such as updates and security alerts.</li>
                <li>Provide targeted marketing where you have explicitly opted in.</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally
                lost, used, or accessed in an unauthorized way, altered, or disclosed. All transactions are encrypted
                using modern cryptographic protocols.
            </p>

            <h2>5. Contact Details</h2>
            <p>
                If you have any questions about this privacy policy or our privacy practices, please contact us at
                privacy@vyaparpe.com.
            </p>
        </>
    );
}
