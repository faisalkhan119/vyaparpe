'use client';
import { useState } from 'react';
import styles from './AIChatbot.module.css';

export default function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hi! I am the Vyaparpe AI Assistant. How can I help you today?' },
    ]);
    const [inputQuery, setInputQuery] = useState('');

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputQuery.trim()) return;

        // User message
        const newMessages = [...messages, { sender: 'user', text: inputQuery }];
        setMessages(newMessages);
        setInputQuery('');

        // Simulate AI response
        setTimeout(() => {
            let botReply = "I can help you track orders, find products, or answer FAQs.";
            const q = inputQuery.toLowerCase();

            if (q.includes('track') || q.includes('order')) {
                botReply = "Please enter your Order ID (e.g., ORD-123) and I will track it for you.";
            } else if (q.includes('return') || q.includes('refund')) {
                botReply = "You can return items within 7 days of delivery. Visit your Order History to start a return.";
            } else if (q.includes('delivery')) {
                botReply = "Standard delivery takes 3-5 days. Express delivery takes 1-2 days.";
            } else if (q.includes('human') || q.includes('agent')) {
                botReply = "Connecting you to a human agent... please wait.";
            }

            setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
        }, 800);
    };

    return (
        <>
            <button className={styles.chatFab} onClick={toggleChat} aria-label="Open AI Support">
                <span className={styles.chatIcon}>✨</span>
            </button>

            {isOpen && (
                <div className={styles.chatWindow}>
                    <div className={styles.chatHeader}>
                        <div className={styles.headerInfo}>
                            <span className={styles.botAvatar}>🤖</span>
                            <div>
                                <h4>Vyaparpe AI Support</h4>
                                <span className={styles.onlineStatus}>Online</span>
                            </div>
                        </div>
                        <button className={styles.closeBtn} onClick={toggleChat}>✕</button>
                    </div>

                    <div className={styles.chatBody}>
                        {messages.map((msg, i) => (
                            <div key={i} className={`${styles.message} ${msg.sender === 'user' ? styles.msgUser : styles.msgBot}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    <div className={styles.chatSuggestions}>
                        <button onClick={() => setInputQuery('Track my last order')}>Track Order</button>
                        <button onClick={() => setInputQuery('What is your return policy?')}>Return Policy</button>
                    </div>
                    
                    <div style={{ padding: '0.5rem 1rem 0', textAlign: 'center', borderTop: '1px solid var(--border-color)', marginTop: '0.5rem', paddingTop: '0.5rem' }}>
                         <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>AI can't help? Talk to a human:</p>
                         <a 
                             href="https://wa.me/916386854875?text=Hi!%20I%20need%20help%20with%20my%20order" 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="btn btn-outline"
                             style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.4rem', fontSize: '0.85rem', color: '#25D366', borderColor: '#25D366', borderRadius: '8px', textDecoration: 'none' }}
                         >
                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                             </svg>
                             Chat on WhatsApp
                         </a>
                    </div>

                    <form className={styles.chatFooter} onSubmit={handleSend}>
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={inputQuery}
                            onChange={(e) => setInputQuery(e.target.value)}
                        />
                        <button type="submit" className={styles.sendBtn}>➤</button>
                    </form>
                </div>
            )}
        </>
    );
}
