import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import { ChevronDown } from 'react-feather';
import { NavProfileButton } from '../Buttons/Buttons';
import Header from '../Header/Header';
import styles from './DashboardLayout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const DashboardLayout = ({ children, title }: LayoutProps) => {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="GAuth" />
        <meta name="application-name" content="GAuth" />
        <meta name="apple-mobile-web-app-title" content="GAuth" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=1.0.0" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=1.0.0" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=1.0.0" />
        <link rel="manifest" href="/site.webmanifest?v=1.0.0" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg?v=1.0.0" color="#5683ff" />
        <link rel="shortcut icon" href="/favicon.ico?v=1.0.0" />
        <meta name="msapplication-TileColor" content="#5683ff" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png?v=1.0.0" />
        <meta name="theme-color" content="#121212" />
        <title>{title || 'GnussonAuth Dashboard'}</title>
      </Head>
      <Header>
        <li>
          <NavProfileButton onClick={() => signOut()}>
            <ChevronDown />
            <p>{session?.user?.name}</p>
            <Image src={session?.user?.image as string} width="50" height="50" alt="test" />
          </NavProfileButton>
        </li>
      </Header>
      <div className={styles.container}>{children}</div>
    </>
  );
};
