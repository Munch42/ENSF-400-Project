import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationRibbon from './NavigationRibbon';
import styles from './LandingPage.module.css';

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <NavigationRibbon />
            <main>
                <section className={styles.startSection}>
                    <p style={{
                        fontSize:'30px',
                        marginTop:'0px',
                        paddingBottom:'0px',
                        textAlign:'center'}}>
                        Get Interviewed by the Best AIs
                    </p>
                    <p style={{
                        textAlign:'center', 
                        marginTop:'0px', 
                        marginBottom:'30px',
                        paddingLeft:'50px', 
                        paddingRight:'50px'}}>
                        Leverage artificial intelligence to prepare for your most difficult interview in seconds!
                    </p>
                    <button type="button" onClick={() => navigate('/upload')} className={styles.startButton}>
                        Get Started Now
                    </button>
                </section>
                <h1>TODO: Complete Landing Page</h1>
            </main>
        </div>
    );
};

export default LandingPage;