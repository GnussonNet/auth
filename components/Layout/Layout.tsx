import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { Button } from '../Buttons/Buttons';
import Header from '../Header/Header';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const Layout = ({ children, title }: LayoutProps) => {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>{title || 'GnussonAuth'}</title>
      </Head>
      <Header>
        {status === 'authenticated' ? (
          <li>
            <Link href="/dashboard">
              <a>
                <Button type="primary" title="Dashboard" />
              </a>
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Link href="/signup">
                <a>
                  <Button type="primary" title="Create free account" />
                </a>
              </Link>
            </li>
            <li>
              <Link href="/signin">Sign In</Link>
            </li>
          </>
        )}
      </Header>
      <div className={styles.container}>{children}</div>
    </>
  );
};
