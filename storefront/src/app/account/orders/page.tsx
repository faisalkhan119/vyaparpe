import styles from '../AccountPages.module.css';

export default function OrdersPage() {
    const mockOrders = [
        {
            id: 'ORD-84A29B',
            date: 'March 10, 2026',
            total: 32988,
            status: 'Processing',
            items: ['📸', '📸']
        },
        {
            id: 'ORD-77F12C',
            date: 'February 14, 2026',
            total: 4500,
            status: 'Delivered',
            items: ['📱']
        },
        {
            id: 'ORD-12X99D',
            date: 'January 05, 2026',
            total: 125000,
            status: 'Delivered',
            items: ['💻', '⌚']
        }
    ];

    return (
        <div>
            <div className={styles.pageHeader}>
                <h2>My Orders</h2>
            </div>

            <div className={styles.ordersList}>
                {mockOrders.map((order) => (
                    <div key={order.id} className={styles.orderCard}>

                        <div className={styles.orderHeader}>
                            <div className={styles.orderMeta}>
                                <span className={styles.orderId}>{order.id}</span>
                                <span className={styles.orderDate}>Placed on {order.date}</span>
                            </div>
                            <div className={`${styles.orderStatus} ${order.status === 'Delivered' ? styles.statusDelivered : styles.statusProcessing}`}>
                                {order.status}
                            </div>
                        </div>

                        <div className={styles.orderItems}>
                            {order.items.map((img, idx) => (
                                <div key={idx} className={styles.itemThumb}>{img}</div>
                            ))}
                        </div>

                        <div className={styles.orderFooter}>
                            <div className={styles.orderTotal}>Total: ₹{order.total.toLocaleString()}</div>
                            <div className={styles.orderActions}>
                                <button className="btn btn-outline">View Details</button>
                                <button className="btn btn-outline">Track Order</button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}
