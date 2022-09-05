import { NextPage } from 'next';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Buttons from '../../components/Buttons/Buttons';
import styles from './Dashboard.module.scss';

const Dashboard: NextPage = (props): JSX.Element => {
  const { data: session, status } = useSession();

  return (
    <div className={styles.dashboard}>
      <Buttons type="primary" onClick={() => signOut()} title="Sign Out" />
      {status === 'authenticated' && <Image src={session?.user?.image as string} width={30} height={30} alt="test" />}
    </div>
  );
};

export default Dashboard;
