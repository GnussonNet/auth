import { NextPage } from 'next';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/Buttons/Buttons';
import styles from './Profile.module.scss';
import Image from 'next/image';
import { Layout } from '@/components/Layout/Layout';
import { Router } from 'next/router';

interface Props {
  userInfo: {
    displayName: string;
    id: string;
    image: string;
  };
}

const UserProfile: NextPage<Props> = ({ userInfo }) => {
  const { data: session, status } = useSession();

  return (
    <Layout title="Profile">
      {userInfo === null ? (
        <div>
          <div className={styles.container}>
            <div className={styles.image_container}>
              <Image src="https://gnusson.net/assets/img/default.jpg" width="100" height="100" alt="" />
            </div>
            <h2>No user found!</h2>
          </div>
        </div>
      ) : status === 'authenticated' && session?.user?.id === userInfo.id ? (
        <div>
          <div className={styles.container}>
            <div className={styles.image_container}>
              <Image src={userInfo.image as string} width="100" height="100" alt="" />
            </div>
            <h2>{session.user.displayName || session.user.id}</h2>
            <p>id: {session.user.id}</p>
            <p>Name: {session.user.name}</p>
            <p>Email: {session.user.email}</p>
            <Button type="primary" title="Sign Out" onClick={() => signOut({ callbackUrl: `${window.location.origin}` })} />
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.container}>
            <div className={styles.image_container}>
              <Image src={userInfo.image as string} width="100" height="100" alt="" />
            </div>
            <h2>{userInfo.displayName}</h2>
            <p>id: {userInfo.id}</p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export async function getServerSideProps(context: any) {
  const { params } = context;
  const { resolvedUrl } = context;  

  const { user } = params;

  const { userInfo } = await fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user }),
  }).then((res) => res.json());
  

  if (resolvedUrl === `/profile/${userInfo.id}` && userInfo.displayName) {
    return {
      redirect: {
        destination: `/profile/${userInfo.displayName}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      userInfo: userInfo ?? null,
    },
  };
}

export default UserProfile;
