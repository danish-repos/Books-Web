import React from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/General.module.css'

const InfoSlugPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <header className={styles.heading}>Info Page - {slug}</header>
      <p>This is the dynamic info page for {slug}</p>
    </div>
  );
};

export default InfoSlugPage;