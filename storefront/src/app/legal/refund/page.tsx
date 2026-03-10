import styles from '../Legal.module.css';

export default function RefundPolicyPage() {
    return (
        <>
            <h1 className={styles.title}>Refund & Returns Policy</h1>
            <div className={styles.documentMeta}>Last Updated: March 10, 2026</div>

            <h2>1. General Return Policy</h2>
            <p>
                We want you to be completely satisfied with your purchase. If for any reason you are not entirely
                pleased with a product you purchased from Vyaparpe, you may return it within 7 days of delivery for
                a full refund or an exchange, subject to the conditions listed below.
            </p>

            <h2>2. Conditions for Returns</h2>
            <ul>
                <li>The item must be unused, in the same condition that you received it, and in its original packaging.</li>
                <li>Tags, manuals, and warranty cards must remain intact.</li>
                <li>Items such as perishable goods, custom products, intimacy items, and software downloads are exempt from being returned.</li>
            </ul>

            <h2>3. The Refund Process</h2>
            <p>
                Once your return is received and inspected, we will send you an email to notify you that we have
                received your returned item. We will also notify you of the approval or rejection of your refund.
                If approved, your refund will be processed, and a credit will automatically be applied to your wallet
                or original method of payment within 5-7 business days.
            </p>

            <h2>4. Late or Missing Refunds</h2>
            <p>
                If you haven&apos;t received a refund yet, first check your bank account again. Then contact your credit
                card company; it may take some time before your refund is officially posted. Next, contact your bank.
                There is often some processing time before a refund is posted. If you&apos;ve done all of this and you
                still have not received your refund, please contact us at support@vyaparpe.com.
            </p>

            <h2>5. Exchanges</h2>
            <p>
                We only replace items if they are defective or damaged. If you need to exchange it for the same item,
                send us an email or initiate an exchange request directly from your Account Dashboard.
            </p>
        </>
    );
}
