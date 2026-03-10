import styles from '../Legal.module.css';

export default function TermsOfServicePage() {
    return (
        <>
            <h1 className={styles.title}>Terms of Service</h1>
            <div className={styles.documentMeta}>Last Updated: March 10, 2026</div>

            <h2>1. Acceptance of Terms</h2>
            <p>
                By accessing and using Vyaparpe, you accept and agree to be bound by the terms and provisions
                of this agreement. If you do not agree to abide by these terms, please do not use this platform.
            </p>

            <h2>2. User Accounts</h2>
            <p>
                To use certain features of the platform, you must register for an account. You agree to provide
                accurate information and to keep it updated. You are responsible for maintaining the confidentiality
                of your account and password and for restricting access to your computer or device.
            </p>

            <h2>3. Pricing and Availability</h2>
            <p>
                All prices are inclusive of legally applicable VAT/GST. We list availability information for products
                on the website. However, beyond what we indicate on the website, we cannot be more specific about
                availability. If a product becomes unavailable after you place an order, we will notify you and
                refund the entire amount immediately.
            </p>

            <h2>4. User Conduct</h2>
            <p>
                You must not use the website in any way that causes, or is likely to cause, the website or access
                to it to be interrupted, damaged, or impaired. You understand that you, and not Vyaparpe, are
                responsible for all electronic communications and content sent from your computer.
            </p>

            <h2>5. Intellectual Property</h2>
            <p>
                All content included on the website, such as text, graphics, logos, button icons, images, audio clips,
                digital downloads, data compilations, and software, is the property of Vyaparpe or its affiliates.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
                Vyaparpe will not be liable for any indirect, incidental, punitive, or consequential damages of any
                kind arising from the use of this site or from any information, content, materials, or services
                included on or otherwise made available to you.
            </p>
        </>
    );
}
