import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ContactForm.module.css'

const LoginForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);

    return (
        <div>
            <form>
                <div>
                    <label htmlFor="name">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        placeholder='Enter your name'
                        onChange={(e) => {
                        setName(e.target.value);
                        setFormSubmitted(false);
                        }}
                        required
                        className={styles.inputField}
                    />
                </div>
                <div>
                    <label htmlFor="email">
                        Email:
                    </label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        placeholder='Enter your email'
                        onChange={(e) => {
                        setEmail(e.target.value);
                        setFormSubmitted(false);
                        }}
                        required
                        className={styles.inputField}
                    />
                </div>
                <div>
                    <label htmlFor="subject">
                        Subject:
                    </label>
                    <input
                        type="text"
                        id="subject"
                        value={subject}
                        placeholder='What is this about?'
                        onChange={(e) => {
                        setSubject(e.target.value);
                        setFormSubmitted(false);
                        }}
                        required
                        className={styles.inputField}
                    />
                </div>
                <div>
                    <label htmlFor="content">
                        Message:
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        placeholder='Type your message here...'
                        onChange={(e) => {
                        setContent(e.target.value);
                        setFormSubmitted(false);
                        }}
                        required
                        className={styles.contentField}
                    />
                </div>
                <div style={{textAlign: 'center'}}>
                <button 
                    type="submit" 
                    className={styles.submitButton}
                    >
                    Send Message
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;