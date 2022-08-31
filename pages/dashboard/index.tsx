import { NextPage } from 'next';
import { signOut } from 'next-auth/react';
import { PrimaryButton } from '../../components/Buttons/Buttons';
import { Layout } from '../../components/Layout/Layout';
import styles from './Dashboard.module.scss';

const Dashboard: NextPage = (props): JSX.Element => {
  return (
    <div className={styles.dashboard}>
      <PrimaryButton onClick={() => signOut()} title="Sign Out" />
    </div>
  );
};

export default Dashboard;
