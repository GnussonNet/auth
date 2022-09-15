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
        <title>{title || 'Dashboard'}</title>
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
