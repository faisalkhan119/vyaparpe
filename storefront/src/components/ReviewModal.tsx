'use client';
import { useState } from 'react';
import styles from './ReviewModal.module.css';

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    items: { name: string; image: string }[];
}

export default function ReviewModal({ isOpen, onClose, items }: ReviewModalProps) {
    const [selectedItem, setSelectedItem] = useState(items[0]?.name || '');
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (rating === 0) {
            alert("Please select a star rating first!");
            return;
        }
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                setRating(0);
                setReviewText('');
                onClose();
            }, 2000);
        }, 1200);
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={`glass-panel ${styles.modal}`} onClick={(e) => e.stopPropagation()}>
                {isSuccess ? (
                    <div className={styles.successState}>
                        <div className={styles.successIcon}>✨</div>
                        <h3>Review Submitted!</h3>
                        <p>Thank you for your valuable feedback.</p>
                    </div>
                ) : (
                    <>
                        <div className={styles.header}>
                            <h3>Write a Review</h3>
                            <button className={styles.closeBtn} onClick={onClose}>×</button>
                        </div>

                        <div className={styles.body}>
                            <label className={styles.label}>Select Item to Review</label>
                            <select
                                className={styles.select}
                                value={selectedItem}
                                onChange={(e) => setSelectedItem(e.target.value)}
                            >
                                {items.map((item, i) => (
                                    <option key={i} value={item.name}>{item.name}</option>
                                ))}
                            </select>

                            <label className={styles.label}>Rate your experience</label>
                            <div className={styles.starRating}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        className={`${styles.star} ${(hoverRating || rating) >= star ? styles.active : ''}`}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        onClick={() => setRating(star)}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>

                            <label className={styles.label}>Your Review (Optional)</label>
                            <textarea
                                className={styles.textarea}
                                rows={4}
                                placeholder="What did you like or dislike about this product?"
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                            />

                            <div className={styles.actions}>
                                <button className="btn btn-outline" onClick={onClose} disabled={isSubmitting}>
                                    Cancel
                                </button>
                                <button className="btn btn-primary" onClick={handleSubmit} disabled={isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
