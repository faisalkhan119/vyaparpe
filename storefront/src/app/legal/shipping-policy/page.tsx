import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Shipping Policy | VyaparPe Demo',
    description: 'Shipping and delivery information for VyaparPe Demo store.',
};

export default function ShippingPolicyPage() {
    return (
        <main style={{ padding: '6rem 1.5rem', minHeight: '80vh', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--text-main)', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Shipping & Delivery Policy</h1>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                <section>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Order Processing Time</h2>
                    <p>All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery.</p>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Shipping Rates & Delivery Estimates</h2>
                    <p>Shipping charges for your order will be calculated and displayed at checkout.</p>
                    <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse', textAlign: 'left', border: '1px solid var(--border-color)' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                                <th style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Shipment Method</th>
                                <th style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Estimated Delivery Time</th>
                                <th style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Shipment Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Standard Delivery</td>
                                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>3-5 business days</td>
                                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Free</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>Express Delivery</td>
                                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>1-2 business days</td>
                                <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>₹500</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Shipment Confirmation & Order Tracking</h2>
                    <p>You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.</p>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Digital & Service Products</h2>
                    <p>For digital products, download links are provided instantly upon successful payment. For services, our team will contact you within 24 hours of booking to confirm your appointment slot and provider details.</p>
                </section>

                <section style={{ background: 'rgba(99,102,241,0.05)', padding: '1.5rem', borderRadius: '8px', border: '1px solid rgba(99,102,241,0.2)' }}>
                    <h2 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>Questions Check?</h2>
                    <p style={{ margin: 0 }}>If you have any questions about the status of your shipment, please <Link href="/contact" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>contact our support team</Link>.</p>
                </section>
            </div>
        </main>
    );
}
