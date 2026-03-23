import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from './ContactForm.module.css';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await emailjs.send(
                process.env.REACT_APP_EMAILJS_SERVICE_ID,
                process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
                {
                    from_name: name,
                    from_email: email,
                    subject: subject,
                    message: content,
                },
                process.env.REACT_APP_EMAILJS_PUBLIC_KEY
            );
            setFormSubmitted(true);
            setError('');
            setName('');
            setEmail('');
            setSubject('');
            setContent('');
        } catch (err) {
            console.error('EmailJS error:', err);
            setError('Failed to send message. Please try again.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        placeholder='Enter your name'
                        onChange={(e) => { setName(e.target.value); setFormSubmitted(false); }}
                        required
                        className={styles.inputField}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        placeholder='Enter your email'
                        onChange={(e) => { setEmail(e.target.value); setFormSubmitted(false); }}
                        required
                        className={styles.inputField}
                    />
                </div>
                <div>
                    <label htmlFor="subject">Subject:</label>
                    <input
                        type="text"
                        id="subject"
                        value={subject}
                        placeholder='What is this about?'
                        onChange={(e) => { setSubject(e.target.value); setFormSubmitted(false); }}
                        required
                        className={styles.inputField}
                    />
                </div>
                <div>
                    <label htmlFor="content">Message:</label>
                    <textarea
                        id="content"
                        value={content}
                        placeholder='Type your message here...'
                        onChange={(e) => { setContent(e.target.value); setFormSubmitted(false); }}
                        required
                        className={styles.contentField}
                    />
                </div>
                {formSubmitted && <p style={{ color: '#008074', textAlign: 'center' }}>Message sent successfully!</p>}
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                <div style={{ textAlign: 'center' }}>
                    <button type="submit" className={styles.submitButton}>
                        Send Message
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
