import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationRibbon from './NavigationRibbon';
import Footer from './Footer';
import styles from './InterviewPage.module.css';

const InterviewPage = () => {
    const navigate = useNavigate();
    const questions = JSON.parse(localStorage.getItem('interviewQuestions') || '[]');

    const [messages, setMessages] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [inputText, setInputText] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const chatEndRef = useRef(null);
    
    useEffect(() => {
        if (questions.length === 0) {
            navigate('/upload');
            return;
        }
        setMessages([{ role: 'ai', text: questions[0] }]);
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const addMessage = (role, text) => {
        setMessages(prev => [...prev, { role, text }]);
    };

    const handleSubmit = () => {
        const trimmed = inputText.trim();
        if (!trimmed || isComplete) return;

        addMessage('user', trimmed);
        setInputText('');

        const session = JSON.parse(localStorage.getItem('interviewSession') || '[]');
        session.push({ question: questions[currentQuestionIndex], answer: trimmed });
        localStorage.setItem('interviewSession', JSON.stringify(session));

        const nextIndex = currentQuestionIndex + 1;

        if (nextIndex < questions.length) {
            setTimeout(() => {
                addMessage('ai', questions[nextIndex]);
                setCurrentQuestionIndex(nextIndex);
            }, 600);
        } else {
            setIsComplete(true);
            setTimeout(() => {
                addMessage('ai', "Great work! Generating your feedback now...");
                setTimeout(() => navigate('/exportFeedback'), 2000);
            }, 600);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className={styles.page}>
            <NavigationRibbon />
            <main className={styles.main}>
                <p className={styles.title}>Interview Session</p>
                <p className={styles.subtitle}>
                    Question {Math.min(currentQuestionIndex + 1, questions.length)} of {questions.length} &mdash; Type your answer and press Enter or click Submit.
                </p>

                <div className={styles.chatContainer}>
                    {messages.map((msg, i) => (
                        <div key={i} className={msg.role === 'ai' ? styles.aiMessage : styles.userMessage}>
                            <span className={styles.messageLabel}>
                                {msg.role === 'ai' ? 'AI Interviewer' : 'You'}
                            </span>
                            <div className={msg.role === 'ai' ? styles.aiBubble : styles.userBubble}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                <div className={styles.inputRow}>
                    <textarea
                        className={styles.textInput}
                        placeholder={isComplete ? "Interview complete!" : "Type your answer here..."}
                        value={inputText}
                        onChange={e => setInputText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isComplete}
                        rows={3}
                    />
                    <button
                        className={styles.submitButton}
                        onClick={handleSubmit}
                        disabled={isComplete || !inputText.trim()}
                    >
                        Submit
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default InterviewPage;