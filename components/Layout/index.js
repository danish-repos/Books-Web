import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import styles from './Layout.module.css';

const Layout = (props) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.className = theme;
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((previous) => (previous === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Link href="/" className={styles.homeLink}>View Featured Books</Link>
        <button className={styles.themeToggle} onClick={toggleTheme}>
          {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        </button>
      </header>

      <main className={styles.main}>{props.children}</main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <nav className={styles.footerNav}>
            <Link href="/info" className={styles.infoLink}>Learn More</Link>
            <Link href="/genres" className={styles.infoLink}>Genres</Link>
            <Link href="/authors" className={styles.infoLink}>Authors</Link>
          </nav>
        </div>
      </footer>


    </div>
  );
};

export default Layout;