import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import styles from './Profile.module.scss';
import { Layout } from '@/components/Layout/Layout';

const Profile: NextPage = (props): JSX.Element => {
  const { data: session, status } = useSession();

  return status === 'authenticated' ? (
    <Layout title="Profile">
      <div className={styles.container}>
        <div className={styles.Profile}>
        </div>
      </div>
    </Layout>
  ) : (
    <></>
  );
};

export default Profile;
