import React from 'react';
import styles from './Header.module.scss';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Buttons from '../Buttons/Buttons';

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link href="/">
          <h4>Gnusson Auth</h4>
        </Link>
      </div>
      <div className={styles.right}>
        {status === 'authenticated' ? (
          <>
            <Link href="/dashboard">
              Dashboard
            </Link>
          </>
        ) : (
          <>
            <Link href="/signup">
              Create free account
            </Link>
            <Link href="/signin">Sign in</Link>
          </>
        )}
      </div>
    </header>
  );
}
