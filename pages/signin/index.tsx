import { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { FormEventHandler, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { Layout } from '../../components/Layout/Layout';
import styles from './Signin.module.scss';
import Buttons from '../../components/Buttons/Buttons';
import { AlertCircle, AtSign, Lock } from 'react-feather';

const SignIn: NextPage = (props): JSX.Element => {
  const EMAIL_FORMAT = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const PASSWORD_FORMAT = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const [inputError, setInputError] = useState({ email: '', password: '', credentials: '' });
  const [isValid, setIsValid] = useState(false);
  const [isFocus, setIsFocus] = useState({ email: false, password: false });

  // If user successfully signed in, redirect to dashboard page
  const { status } = useSession();
  if (status === 'authenticated') Router.push('/dashboard');

  // Handle submit and update inputError state if there is an error
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // validate your userinfo
    e.preventDefault();

    // Call signIn function from next-auth
    const res = await signIn('credentials', {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });

    setInputError({ ...inputError, credentials: res?.error as string });
  };

  // Choose which error message to display
  const showErrorMessage = () => {
    if (inputError.credentials) {
      return (
        <div className={styles.errorContainer}>
          <AlertCircle />
          <p>{inputError.credentials}</p>
        </div>
      );
    } else if (inputError.email) {
      return (
        <div className={styles.warningContainer}>
          <AlertCircle />
          <p>{inputError.email}</p>
        </div>
      );
    } else if (inputError.password) {
      return (
        <div className={styles.warningContainer}>
          <AlertCircle />
          <p>{inputError.password}</p>
        </div>
      );
    }
  };

  // Check if the email and password are valid
  useEffect(() => {
    if (userInfo.email === '' || userInfo.password === '') {
      setIsValid(false);
    } else if (EMAIL_FORMAT.test(userInfo.email) && PASSWORD_FORMAT.test(userInfo.password)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.email, userInfo.password]);

  // If any email validation errors when user is typing, remove the error message. Display error when blur
  useEffect(() => {
    if (userInfo.email === '') {
      setInputError({ ...inputError, email: '' });
    } else if (EMAIL_FORMAT.test(userInfo.email)) {
      setInputError({ ...inputError, email: '' });
    } else {
      if (!isFocus.email) {
        setInputError({ ...inputError, email: 'Invalid email format' });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocus.email, userInfo.email]);

  // If any password validation errors when user is typing, remove the error message. Display error when blur
  useEffect(() => {
    if (userInfo.password === '') {
      setInputError({ ...inputError, password: '' });
    } else if (PASSWORD_FORMAT.test(userInfo.password)) {
      setInputError({ ...inputError, password: '' });
    } else {
      if (!isFocus.password) {
        setInputError({ ...inputError, password: 'Invalid password format' });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocus.password, userInfo.password]);

  // If user have entered wrong credentials, remove the error message when user is changing the input
  useEffect(() => {
    if (inputError.credentials) {
      setInputError({ ...inputError, credentials: '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.email, userInfo.password]);

  return (
    <Layout title="GnussonAuth | Sign In">
      <div className={styles.signin}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Sign in</h2>
          <label htmlFor="email">Email</label>
          <div className={styles.inputContainer}>
            <div className={styles.iconContainer}>
              <AtSign />
            </div>
            <input
              className={styles.userInput}
              onFocus={() => {
                setIsFocus({ ...isFocus, email: true });
              }}
              onBlur={() => {
                setIsFocus({ ...isFocus, email: false });
              }}
              name="email"
              value={userInfo.email}
              onChange={({ target }) => setUserInfo({ ...userInfo, email: target.value })}
              type="text"
              placeholder="Support@gnusson.net"
            />
          </div>
          <label htmlFor="password">Password</label>
          <div className={styles.inputContainer}>
            <div className={styles.iconContainer}>
              <Lock />
            </div>
            <input
              className={`${styles.userInput} ${styles['userInput--password']}`}
              onFocus={() => {
                setIsFocus({ ...isFocus, password: true });
              }}
              onBlur={() => {
                setIsFocus({ ...isFocus, password: false });
              }}
              name="password"
              value={userInfo.password}
              onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })}
              type="password"
              placeholder="Password"
            />
          </div>

          {showErrorMessage()}

          <Buttons type="primary" disabled={!isValid} title="Sign In" />
          <p className={styles.forgotCredentials}>
            Forgotten your password? <a href="#">Reset password</a>{' '}
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default SignIn;
