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
                        fontWeight:'600',
                        marginTop:'0px',
                        paddingBottom:'0px',
                        textAlign:'center',}}>
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
                <section className={styles.subSection}>
                    <p className={styles.sectionTitle}>How It Works</p>
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly', gap:'20px'}}>
                        <div className={styles.stepBox}>
                            <p className={styles.stepTitle}>1. Upload Your Resume</p>
                            <p>Provide the job description and your up to date resume.</p>
                        </div>
                        <div className={styles.stepBox}>
                            <p className={styles.stepTitle}>2. Let AI Do the Work</p>
                            <p>Our AI analyzes the job description and resume, and asks you interview questions related to the job.</p>
                        </div>
                        <div className={styles.stepBox}>
                            <p className={styles.stepTitle}>3. Review & Apply</p>
                            <p>Once you answer the questions, our AI will analyze your responses and give you feedback to ace your next interview.</p>
                        </div>
                    </div>
                </section>
                <section className={styles.subSection}>
                    <p className={styles.sectionTitle}>Testimonials</p>
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly', gap:'20px'}}>
                        <div className={styles.testimonialBox}>
                            <p className={styles.testimonialContent}>
                                "Resume Wizard helped me land an amazing internship this upcoming year."
                            </p>
                            <p className={styles.testimonialName}>Aidan J.</p>
                        </div>
                        <div className={styles.testimonialBox}>
                            <p className={styles.testimonialContent}>
                                "I never thought AI could be this useful. The AI suggestions really helped me to forumlate my responses for my interview."
                            </p>
                            <p className={styles.testimonialName}>Tiffany P.</p>
                        </div>
                        <div className={styles.testimonialBox}>
                            <p className={styles.testimonialContent}>
                                "Extremely helpful for practicing the STAR format Highly recommend to students and new grads looking for jobs."
                            </p>
                            <p style={{fontWeight:'600'}}>Ayden D.</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default LandingPage;