import { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { FormEventHandler, useState } from 'react';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { Layout } from '../../components/Layout/Layout';
import styles from './Signup.module.scss';
import axios from 'axios';
import { PrimaryButton } from '../../components/Buttons/Buttons';

const Signup: NextPage = (props): JSX.Element => {
  const [userInfo, setUserInfo] = useState({ name: '', username: '', email: '', password: '' });

  const { status } = useSession();
  if (status === 'authenticated') Router.push('/dashboard');

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // validate your userinfo
    e.preventDefault();

    const res = axios
      .post('/api/signup', userInfo, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(
        async () =>
          await signIn('credentials', {
            email: userInfo.email,
            password: userInfo.password,
            redirect: false,
          })
      )
      .catch((err) => console.log(err));
  };
  return (
    <Layout title="GnussonAuth | Sign Up">
      <div className={styles.signup}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <label htmlFor="name">Full name</label>
          <input className={styles.userInput} value={userInfo.name} onChange={({ target }) => setUserInfo({ ...userInfo, name: target.value })} type="text" placeholder="Full name" />
          <label htmlFor="name">Username</label>
          <input className={styles.userInput} value={userInfo.username} onChange={({ target }) => setUserInfo({ ...userInfo, username: target.value })} type="text" placeholder="username" />
          <label htmlFor="name">Email</label>
          <input className={styles.userInput} value={userInfo.email} onChange={({ target }) => setUserInfo({ ...userInfo, email: target.value })} type="email" placeholder="email@domain.com" />
          <label htmlFor="name">Password</label>
          <input className={styles.userInput} value={userInfo.password} onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })} type="password" placeholder="password" />
          <PrimaryButton title="Create free account" />
        </form>
      </div>
    </Layout>
  );
};

export default Signup;
