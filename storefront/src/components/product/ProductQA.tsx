'use client';
import { useState } from 'react';
import styles from './ProductQA.module.css';

interface QA {
    id: string;
    question: string;
    answer: string;
    date: string;
    author: string;
    upvotes: number;
}

const mockQAs: QA[] = [
    {
        id: 'q1',
        question: 'Does this come with international warranty?',
        answer: 'Yes, it includes a 1-year global manufacturer warranty valid worldwide.',
        date: '2 months ago',
        author: 'Rahul Sharma',
        upvotes: 14
    },
    {
        id: 'q2',
        question: 'What is the exact return window?',
        answer: 'You can return the product no-questions-asked within 7 days of delivery.',
        date: '1 week ago',
        author: 'Vyaparpe Support',
        upvotes: 45
    }
];

export default function ProductQA() {
    const [qas, setQas] = useState<QA[]>(mockQAs);
    const [newQuestion, setNewQuestion] = useState('');

    const handleAsk = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newQuestion.trim()) return;

        alert('Your question has been submitted for review. You will be notified when it gets answered.');
        setNewQuestion('');
    };

    return (
        <section className={styles.qaContainer}>
            <div className={styles.qaHeader}>
                <h2>Customer Questions & Answers</h2>
                <button className="btn btn-outline" onClick={() => document.getElementById('qa-input')?.focus()}>Ask a Question</button>
            </div>

            <form className={styles.askForm} onSubmit={handleAsk}>
                <input
                    id="qa-input"
                    type="text"
                    placeholder="Have a question? Search for answers or ask the community..."
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    className={styles.qaInput}
                />
                <button type="submit" className={styles.askBtn}>Post</button>
            </form>

            <div className={styles.qaList}>
                {qas.map(qa => (
                    <div key={qa.id} className={styles.qaItem}>
                        <div className={styles.voteColumn}>
                            <button className={styles.voteBtn}>▲</button>
                            <span>{qa.upvotes}</span>
                            <button className={styles.voteBtn}>▼</button>
                        </div>
                        <div className={styles.qaContent}>
                            <div className={styles.question}>
                                <span className={styles.badgeQ}>Q</span>
                                <h4>{qa.question}</h4>
                            </div>
                            <div className={styles.answer}>
                                <span className={styles.badgeA}>A</span>
                                <div>
                                    <p>{qa.answer}</p>
                                    <div className={styles.qaMeta}>
                                        By {qa.author} • {qa.date}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button className={styles.viewMoreBtn}>View All 15 Questions</button>
        </section>
    );
}
