export default function PoliciesPage() {
    return (
        <main className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem', minHeight: '60vh' }}>
            <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Store Policies</h1>

            <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <section>
                    <h2 style={{ color: 'var(--primary-color)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>1. Return & Refund Policy</h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                        We accept returns within 7 days of delivery. Items must be unused, in original packaging, and with all tags attached. Refunds are processed within 5-7 business days after inspection.
                    </p>
                </section>

                <section>
                    <h2 style={{ color: 'var(--primary-color)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>2. Shipping Policy</h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                        Standard delivery takes 3-5 business days. Express delivery (where applicable) takes 1-2 business days. Free shipping on orders above ₹1,999. You can track your order using the Order Tracking page.
                    </p>
                </section>

                <section>
                    <h2 style={{ color: 'var(--primary-color)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>3. Cancellation Policy</h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                        You may cancel your order at any time before it has been dispatched from our warehouse. Once dispatched, the order cannot be canceled, but you may initiate a return upon receipt.
                    </p>
                </section>

                <section>
                    <h2 style={{ color: 'var(--primary-color)', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>4. Warranty Information</h2>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                        All electronic devices are covered by a minimum 1-year manufacturer warranty. Please retain your digital invoice for warranty claims. Physical damage and liquid damage are generally excluded.
                    </p>
                </section>
            </div>
        </main>
    );
}
