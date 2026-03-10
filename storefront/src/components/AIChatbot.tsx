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
