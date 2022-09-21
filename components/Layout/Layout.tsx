import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { ChevronDown } from 'react-feather';
import { Button, NavProfileButton } from '../Buttons/Buttons';
import Header from '../Header/Header';
import styles from './Layout.module.scss';
import Image from 'next/image';
import router from 'next/router';

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
          <>
            <li>
              <Link href="/dashboard">
                <a>
                  <Button type="navbar" title="Dashboard" />
                </a>
              </Link>
            </li>
            <li>
              <NavProfileButton onClick={() => router.push(`/profile/${session?.user?.displayName}`)}>
                <ChevronDown />
                <p>{session?.user?.displayName}</p>
                <Image src={session?.user?.image as string} width="50" height="50" alt="user profile" />
              </NavProfileButton>
            </li>
          </>
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
