import { NextPage, NextPageContext } from 'next';
import { Layout } from '@/components/Layout/Layout';
import styles from '@/styles/modules/Error.module.scss';

interface Props {
  statusCode?: number;
}

const Error: NextPage<Props> = ({ statusCode }) => {
  return (
    <Layout title={statusCode ? `GAuth | ${statusCode}` : 'GAuth | An error occurred on client'}>
      <div className={styles.container}>
        <h3>{statusCode ? `An ${statusCode} error occurred on server` : 'An error occurred on client'}</h3>
      </div>
    </Layout>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;