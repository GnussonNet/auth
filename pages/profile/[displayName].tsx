import { NextPage } from 'next';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/Buttons/Buttons';
import styles from './Profile.module.scss';
import Image from 'next/image';
import { Layout } from '@/components/Layout/Layout';

interface Props {
  displayName: string;
}

const UserProfile: NextPage<Props> = ({ displayName }) => {
  const { data: session, status } = useSession();

  return status === 'authenticated' && session && session.user ? (
    <Layout title="Profile">
      <div className={styles.container}>
        <div className={styles.image_container}>
          <Image src={session.user.image as string} width="100" height="100" alt="" />
        </div>
        <h2>{displayName}</h2>
        <p>{session.user.email}</p>
        <Button type="primary" title="Sign Out" onClick={() => signOut()} />
      </div>
    </Layout>
  ) : (
    <></>
  );
};

export async function getServerSideProps(context: any) {
  const { params } = context;
  const { displayName } = params;

  return {
    props: {
      displayName: displayName,
    },
  };
}

export default UserProfile;
