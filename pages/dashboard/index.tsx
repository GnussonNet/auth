import { NextPage } from 'next';
import { signOut } from 'next-auth/react';
import { Layout } from '../../components/Layout/Layout';
import styles from './Dashboard.module.scss';

const Dashboard: NextPage = (props): JSX.Element => {
  return (
    <div className={styles.dashboard}>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
};

export default Dashboard;
