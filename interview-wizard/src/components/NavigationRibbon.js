import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavigationRibbon.module.css';

const NavigationRibbon = () => {
    return (
        <header className={styles.header} >
            <div>
                <h1 className={styles.title}>Interview Wizard</h1>
            </div>
            <nav className={styles.nav} >
                <Link to='/' className={styles.navLink} >Home</Link>
                <Link to='/contactUs' className={styles.navLink} >Contact Us</Link>
            </nav>
        </header>
    );
};

export default NavigationRibbon;