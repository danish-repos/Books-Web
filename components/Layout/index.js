import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import styles from './Layout.module.css';

const Layout = (props) => {
  const [theme, setTheme] = useState('light');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { data: session, status } = useSession(); 
  

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.className = theme;
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/auth/signin' }); 
  }

  if(status === 'loading'){
    return <div>Loading...</div>
  }

  return (
    <div className={styles.layout}>

      <header className={styles.header}>

        <div className={styles.headerLeft}>
          {/* Any left-aligned content can go here */}
        </div>

        <div className={styles.headerRight}>

          {session?.user?.username && (

            <div className={styles.userWrapper}>

              <span className={styles.username} onClick={() => setIsPopupVisible((prev) => !prev)}>
                {session.user.username}
              </span>

              {isPopupVisible && (

                <div className={styles.popup}>
                  <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
                </div>
                
              )}
            </div>
          )}

          <div className={styles.themeSwitch}>
            <label className={styles.switch}>
              <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
              <span className={styles.slider}></span>
            </label>

            <span className={styles.themeLabel}>
              {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
            </span>
          </div>
        </div>
      </header>

      <main className={styles.main}>{props.children}</main>

      {session && (
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <nav className={styles.footerNav}>
              <Link href="/" className={styles.navLink}>Featured Books</Link>
              <Link href="/info" className={styles.navLink}>Learn More</Link>
              <Link href="/genres" className={styles.navLink}>Genres</Link>
              <Link href="/authors" className={styles.navLink}>Authors</Link>
            </nav>
          </div>
        </footer>
      )}

    </div>
  )
}

export default Layout;
