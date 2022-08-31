import { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { FormEventHandler, useState } from 'react';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { Layout } from '../../components/Layout/Layout';
import styles from './Signin.module.scss';
import { PrimaryButton } from '../../components/Buttons/Buttons';

const SignIn: NextPage = (props): JSX.Element => {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });

  const { status } = useSession();
  if (status === 'authenticated') Router.push('/dashboard');

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // validate your userinfo
    e.preventDefault();

    const res = await signIn('credentials', {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });
  };
  return (
    <Layout title="GnussonAuth | Sign In">
      <div className={styles.signin}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Sign in</h2>
          <label htmlFor="email">Email</label>
          <input className={styles.userInput} name="email" value={userInfo.email} onChange={({ target }) => setUserInfo({ ...userInfo, email: target.value })} type="text" placeholder="email@domain.com" />
          <label htmlFor="password">Password</label>
          <input className={styles.userInput} name="password" value={userInfo.password} onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })} type="password" placeholder="password" />
          <PrimaryButton title="Sign In" />
        </form>
      </div>
    </Layout>
  );
};

export default SignIn;
