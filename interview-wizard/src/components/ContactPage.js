import React from 'react';
import NavigationRibbon from './NavigationRibbon';
import Footer from './Footer';
import ContactForm from './ContactForm';
import styles from './ContactPage.module.css';

const ContactPage = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <NavigationRibbon />
            <main>
                <div className={styles.contactSection} >
                    <p style={{
                        fontSize:'30px',
                        fontWeight:'600',
                        margin:'0px',
                        paddingBottom:'0px',
                        textAlign:'center',
                        color: '#008074'}} >Contact Us
                    </p>
                    <p>We'd love to hear from you! Reach out with any questions or suggestions.</p>
                </div>
                <div className={styles.formSection} >
                    <ContactForm />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ContactPage;