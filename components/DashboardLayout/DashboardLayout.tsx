import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
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
  const router = useRouter()
  

  return (
    <>
      <Head>
        <title>{title || 'Dashboard'}</title>
      </Head>
      <Header>
        <li>
          <NavProfileButton onClick={() => router.push(`/profile/${session?.user?.displayName}`)}>
            <ChevronDown />
            <p>{session?.user?.displayName}</p>
            <Image src={session?.user?.image as string} width="50" height="50" alt="user profile" />
          </NavProfileButton>
        </li>
      </Header>
      <div className={styles.container}>{children}</div>
    </>
  );
};
