import { NextPage, NextPageContext } from 'next';
import { Layout } from '@/components/Layout/Layout';
import styles from '@/styles/modules/Error.module.scss';
import Image from 'next/image';

interface Props {
  statusCode?: number;
}

const Error: NextPage<Props> = ({ statusCode }) => {
  return (
    <Layout title={statusCode ? `GnussonAuth | ${statusCode}` : 'GnussonAuth | An error occurred on client'}>
      <div className={styles.container}>
        {statusCode === 404 && <Image src="/404.svg" alt="Error" width={750} height={500} />}
        <h3>{statusCode ? `An ${statusCode} error occurred on server` : 'An error occurred on client'}</h3>
        {statusCode === 404 && <a href="https://storyset.com/online">Online illustrations by Storyset</a>}
      </div>
    </Layout>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
