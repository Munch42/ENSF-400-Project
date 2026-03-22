import React, { useEffect, useState } from 'react';
import NavigationRibbon from './NavigationRibbon';
import Footer from './Footer';
import styles from './ExportPage.module.css';

const ExportPage = () => {
    const [session, setSession] = useState([]);
    const [feedbackStatus, setFeedbackStatus] = useState('loading'); 

    useEffect(() => {
        const storedSession = JSON.parse(localStorage.getItem('interviewSession') || '[]');
        const resume = localStorage.getItem('resumeText') || '';
        const jobPosting = localStorage.getItem('jobPostingText') || '';

        if (storedSession.length === 0) {
            setFeedbackStatus('error');
            return;
        }

        const fetchFeedback = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/feedback', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        resume,
                        'job-posting': jobPosting,
                        questions: storedSession.map(item => item.question),
                        'question-answers': storedSession.map(item => item.answer),
                    })
                });

                const data = await response.json();

                // integration of feedback into session data
                const feedbackArray = data.feedback || [];
                const merged = storedSession.map((item, i) => ({...item, feedback: feedbackArray[i] || null,
                }));

                setSession(merged);
                setFeedbackStatus('ready');
            } catch (err) {
                console.error('Feedback fetch error:', err);
                setSession(storedSession);
                setFeedbackStatus('ready');
            }
        };

        fetchFeedback();
    }, []);

    return (
        <div className={styles.page}>
            <NavigationRibbon />
            <main className={styles.main}>
                <div className={styles.headerRow}>
                    <p className={styles.title}>Interview Feedback</p>
                    <button
                        className={styles.exportButton}
                        //onClick={handleExportPDF}
                        disabled={feedbackStatus !== 'ready' || session.length === 0}
                    >
                        ⬇ Download PDF
                    </button>
                </div>
                <p className={styles.subtitle}>
                    Review your answers below. Download a PDF copy for your records.
                </p>

                {feedbackStatus === 'loading' && (
                    <div className={styles.emptyState}>
                        <p>Generating your feedback, please wait...</p>
                    </div>
                )}

                {feedbackStatus === 'error' && (
                    <div className={styles.emptyState}>
                        <p>No interview session found. Complete an interview first.</p>
                    </div>
                )}

                {feedbackStatus === 'ready' && (
                    <div className={styles.feedbackList}>
                        {session.map((item, index) => (
                            <div key={index} className={styles.feedbackCard}>
                                <p className={styles.questionLabel}>Q{index + 1}</p>
                                <p className={styles.questionText}>{item.question}</p>
                                <p className={styles.answerLabel}>Your Answer</p>
                                <p className={styles.answerText}>{item.answer}</p>
                                {item.feedback ? (
                                    <>
                                        <p className={styles.feedbackLabel}>Feedback</p>
                                        <p className={styles.feedbackText}>{item.feedback}</p>
                                    </>
                                ) : (
                                    <>
                                        <p className={styles.feedbackLabel}>Feedback</p>
                                        <p className={styles.feedbackText} style={{ color: '#aaa' }}>
                                            Feedback not yet available — complete the backend /api/feedback route to enable this.
                                        </p>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default ExportPage;