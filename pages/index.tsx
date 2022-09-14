import type { NextPage } from 'next';
import styles from '../styles/modules/Home.module.scss';
import { useSession } from 'next-auth/react';
import { Layout } from '../components/Layout/Layout';
import { Button } from '../components/Buttons/Buttons';
import Link from 'next/link';

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  return (
    status && (
      <Layout>
        <main className={styles.main}>
          <section className={styles.landing_page}>
            <div className={styles.landing_page__left}>
              <h1 className={styles.title}>
                Simple, secure and <span>user-friendly</span> authentication
              </h1>
              <p className={styles.description}>GnussonNet is dedicated to providing the best authentication service on the internet. Gnusson Net will develop all of its services with security and usability in mind. Our users are the foundation of our company.</p>

              <div className={styles.buttons}>
                {status === 'authenticated' ? (
                  <Link href="/dashboard" replace={true} className={styles.logo}>
                    <a>
                      <Button type="primary" title="Dashboard" />
                    </a>
                  </Link>
                ) : (
                  <Link href="/signup" replace={true} className={styles.logo}>
                    <a>
                      <Button type="primary" title="Create free account" />
                    </a>
                  </Link>
                )}
                <Link href="/" replace={true} className={styles.logo}>
                  <a>
                    <Button type="secondary" title="Learn more" />
                  </a>
                </Link>
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
