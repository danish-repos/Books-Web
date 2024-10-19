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
    <>
      <header className={styles.header}>
      <Link href="/" className={styles.homeLink}>View Featured Books</Link>

      <button className={styles.themeToggle} onClick={toggleTheme}>
          {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        </button>
      </header>

      <main>{props.children}</main>
    </>
  );
};

export default Layout;