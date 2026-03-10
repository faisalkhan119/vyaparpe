import Link from 'next/link';
import styles from './CartPage.module.css';

export default function CartPage() {
    // Mock cart items same as drawer for demo
    const cartItems = [
        {
            id: 'c1',
            name: 'Sony WH-1000XM5 Wireless Headphones',
            price: 29990,
            quantity: 1,
            image: '📸',
            color: 'Midnight Black'
        },
        {
            id: 'c2',
            name: 'Premium Leather Headphone Stand',
            price: 1499,
            quantity: 2,
            image: '📸',
            color: 'Brown'
        }
    ];

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const taxes = subtotal * 0.18; // 18% mock tax
    const shipping = subtotal > 50000 ? 0 : 500;
    const total = subtotal + taxes + shipping;

    return (
        <main className={styles.cartContainer}>
            <div className="container">
                <h1 className={styles.pageTitle}>Your Shopping Cart</h1>

                <div className={styles.cartGrid}>
                    {/* Left Column: Cart Items List */}
                    <div className={styles.itemsColumn}>
                        <div className={styles.tableHeader}>
                            <div className={styles.colProduct}>Product</div>
                            <div className={styles.colQuantity}>Quantity</div>
                            <div className={styles.colTotal}>Total</div>
                        </div>

                        <div className={styles.cartList}>
                            {cartItems.map(item => (
                                <div key={item.id} className={styles.cartItemRow}>
                                    <div className={styles.colProduct}>
                                        <div className={styles.itemImage}>{item.image}</div>
                                        <div className={styles.itemDetails}>
                                            <h4><Link href={`/product/p1`}>{item.name}</Link></h4>
                                            <p className={styles.itemVariant}>Color: {item.color}</p>
                                            <button className={styles.removeBtn}>Remove</button>
                                        </div>
                                    </div>

                                    <div className={styles.colQuantity}>
                                        <div className={styles.qtyControls}>
                                            <button>−</button>
                                            <span>{item.quantity}</span>
                                            <button>+</button>
                                        </div>
                                    </div>

                                    <div className={styles.colTotal}>
                                        <span className={styles.itemPrice}>₹{(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className={styles.summaryColumn}>
                        <div className={`glass-panel ${styles.summaryCard}`}>
                            <h3>Order Summary</h3>

                            <div className={styles.summaryRow}>
                                <span>Subtotal ({cartItems.length} items)</span>
                                <span>₹{subtotal.toLocaleString()}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Estimated Taxes (18%)</span>
                                <span>₹{taxes.toLocaleString()}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                            </div>

                            <div className={styles.promoCodeBox}>
                                <input type="text" placeholder="Promo code or gift card" className={styles.promoInput} />
                                <button className="btn btn-outline">Apply</button>
                            </div>

                            <hr className={styles.divider} />

                            <div className={styles.totalRow}>
                                <span>Total</span>
                                <span>₹{total.toLocaleString()}</span>
                            </div>

                            <Link href="/checkout" className={`btn btn-primary ${styles.checkoutBtn}`}>
                                Proceed to Checkout
                            </Link>

                            <div className={styles.secureCheckout}>
                                <span className="icon">🔒</span> Secure Checkout
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
