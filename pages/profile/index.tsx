import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { DashboardLayout } from '@/components/DashboardLayout/DashboardLayout';
import styles from './Profile.module.scss';

const Profile: NextPage = (props): JSX.Element => {
  const { data: session, status } = useSession();

  return status === 'authenticated' ? (
    <DashboardLayout title="Profile">
      <div className={styles.container}>
        <div className={styles.Profile}>
        </div>
      </div>
    </DashboardLayout>
  ) : (
    <></>
  );
};

export default Profile;
