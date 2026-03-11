import Link from 'next/link';
import styles from '../AccountPages.module.css';

export default function OrdersPage() {
    const mockOrders = [
        {
            id: 'ORD-84A29B',
            date: 'March 10, 2026',
            total: 32988,
            status: 'Processing',
            items: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800']
        },
        {
            id: 'ORD-99Z11A',
            date: 'March 08, 2026',
            total: 4500,
            status: 'Shipped',
            items: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800']
        },
        {
            id: 'ORD-12X99D',
            date: 'March 05, 2026',
            total: 169900,
            status: 'Delivered',
            items: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800']
        },
        {
            id: 'ORD-77F12C',
            date: 'February 14, 2026',
            total: 125000,
            status: 'Delivered',
            items: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=800']
        },
        {
            id: 'ORD-55K22L',
            date: 'March 01, 2026',
            total: 2999,
            status: 'Canceled',
            items: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800']
        },
        {
            id: 'ORD-33R44M',
            date: 'February 20, 2026',
            total: 8999,
            status: 'Returned',
            items: ['https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=800']
        }
    ];

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'Delivered': return styles.statusDelivered;
            case 'Processing': return styles.statusProcessing;
            case 'Shipped': return styles.statusShipped;
            case 'Canceled': return styles.statusCanceled;
            case 'Returned': return styles.statusReturned;
            default: return '';
        }
    };

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
                            <div className={`${styles.orderStatus} ${getStatusClass(order.status)}`}>
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
                                <Link href={`/account/orders/${order.id}`} className="btn btn-outline" style={{ textDecoration: 'none' }}>View Details</Link>
                                {(order.status !== 'Delivered' && order.status !== 'Canceled' && order.status !== 'Returned') && (
                                    <Link href={`/account/orders/${order.id}`} className="btn btn-outline" style={{ textDecoration: 'none' }}>Track Order</Link>
                                )}
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}
