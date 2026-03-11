'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './BottomNav.module.css';
import { useCart } from '@/context/CartContext';

export default function BottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  const navItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Products', path: '/products', icon: '🛍️' },
    { name: 'Top Deals', path: '/deals', icon: '🔥' },
    { name: 'Account', path: '/account', icon: '👤' },
    { name: `Cart`, path: '/cart', icon: '🛒' },
  ];

  return (
    <nav className={styles.bottomNav}>
      {navItems.map((item) => {
        const isActive = item.path === '/' ? pathname === '/' : pathname?.startsWith(item.path);
        
        return (
          <Link 
            key={item.name} 
            href={item.path} 
            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
          >
            <span className={styles.icon} style={{ position: 'relative' }}>
              {item.icon}
              {item.name === 'Cart' && totalItems > 0 && (
                <span style={{
                  position: 'absolute', top: '-6px', right: '-10px',
                  background: 'var(--primary)', color: 'white',
                  borderRadius: '50%', width: '18px', height: '18px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.65rem', fontWeight: 700
                }}>{totalItems}</span>
              )}
            </span>
            <span className={styles.label}>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
