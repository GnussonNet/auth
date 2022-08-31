import type { NextPage } from 'next';
import styles from '../styles/modules/Home.module.scss';
import { useSession } from 'next-auth/react';
import { Layout } from '../components/Layout/Layout';
import { PrimaryButton, SecondaryButton } from '../components/Buttons/Buttons';

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  return (
    status && (
      <Layout>
        <main className={styles.main}>
          <section className={styles.landing_page}>
            <div className={styles.landing_page__left}>
              <h1 className={styles.title}>Secure authentication for the future</h1>
              <p className={styles.description}>GnussonNet is a Decentralized solution to Credentials Authentications; where Users always hold the private key of their account, the credentials match and are always valid. This protects Users from many attacks and phishing attempts.</p>

              <div className={styles.buttons}>
                <PrimaryButton title="Create free account" />
                <SecondaryButton title="Learn more" />
              </div>
            </div>
            <div className={styles.landing_page__right}></div>
          </section>
        </main>
      </Layout>
    )
  );
};

export default Home;
