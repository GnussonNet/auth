import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { DashboardLayout } from '@/components/DashboardLayout/DashboardLayout';
import styles from './Dashboard.module.scss';

const Dashboard: NextPage = (props): JSX.Element => {
  const { data: session, status } = useSession();

  return status === 'authenticated' ? (
    <DashboardLayout title="Dashboard">
      <div className={styles.container}>
        <div className={styles.dashboard}>
        </div>
      </div>
    </DashboardLayout>
  ) : (
    <></>
  );
};

export default Dashboard;
