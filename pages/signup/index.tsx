import { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { FormEventHandler, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { Layout } from '../../components/Layout/Layout';
import styles from './Signup.module.scss';
import axios from 'axios';
import {Button} from '../../components/Buttons/Buttons';
import { AlertCircle, AtSign, Eye, Link, Lock, User } from 'react-feather';

const Signup: NextPage = (props): JSX.Element => {
  const NAME_FORMAT = /^\s*([A-Öa-ö]{1,}([\.,] |[-']| ))+[A-Öa-ö]+\.?\s*$/;
  const DISPLAY_NAME_FORMAT = /^[a-zA-Z0-9]{3,20}$/;
  const EMAIL_FORMAT = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const PASSWORD_FORMAT = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  const [userInfo, setUserInfo] = useState({ name: '', displayName: '', email: '', password: '' });
  const [inputError, setInputError] = useState({ name: '', displayName: '', email: '', password: '', credentials: '' });
  const [isValid, setIsValid] = useState(false);
  const [isFocus, setIsFocus] = useState({ name: false, displayName: false, email: false, password: false });

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
      .catch((err) => setInputError({ ...inputError, credentials: err.response.data.error }));
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
    } else if (inputError.name) {
      return (
        <div className={styles.warningContainer}>
          <AlertCircle />
          <p>{inputError.name}</p>
        </div>
      );
    } else if (inputError.displayName) {
      return (
        <div className={styles.warningContainer}>
          <AlertCircle />
          <p>{inputError.displayName}</p>
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
    if (userInfo.name === '' || userInfo.displayName === '' || userInfo.email === '' || userInfo.password === '') {
      setIsValid(false);
    } else if (NAME_FORMAT.test(userInfo.name) && DISPLAY_NAME_FORMAT.test(userInfo.displayName) && EMAIL_FORMAT.test(userInfo.email) && PASSWORD_FORMAT.test(userInfo.password)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.email, userInfo.password]);

  // If any name validation errors when user is typing, remove the error message. Display error when blur
  useEffect(() => {
    if (userInfo.name === '') {
      setInputError({ ...inputError, name: '' });
    } else if (NAME_FORMAT.test(userInfo.name)) {
      setInputError({ ...inputError, name: '' });
    } else {
      if (!isFocus.name) {
        setInputError({ ...inputError, name: 'Invalid name format' });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocus.name, userInfo.name]);

  // If any display name validation errors when user is typing, remove the error message. Display error when blur
  useEffect(() => {
    if (userInfo.displayName === '') {
      setInputError({ ...inputError, displayName: '' });
    } else if (DISPLAY_NAME_FORMAT.test(userInfo.displayName)) {
      setInputError({ ...inputError, displayName: '' });
    } else {
      if (!isFocus.displayName) {
        setInputError({ ...inputError, displayName: 'Invalid displayName format' });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocus.displayName, userInfo.displayName]);

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
    <Layout title="GnussonAuth | Sign Up">
      <div className={styles.signup}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <label htmlFor="name">Name</label>
          <div className={styles.inputContainer}>
            <div className={styles.iconContainer}>
              <User />
            </div>
            <input
              className={styles.userInput}
              onFocus={() => {
                setIsFocus({ ...isFocus, name: true });
              }}
              onBlur={() => {
                setIsFocus({ ...isFocus, name: false });
              }}
              name="name"
              value={userInfo.name}
              onChange={({ target }) => setUserInfo({ ...userInfo, name: target.value })}
              type="text"
              placeholder="John Doe"
            />
          </div>
          <label htmlFor="displayName">Display Name</label>
          <div className={styles.inputContainer}>
            <div className={styles.iconContainer}>
              <Eye />
            </div>
            <input
              className={styles.userInput}
              onFocus={() => {
                setIsFocus({ ...isFocus, displayName: true });
              }}
              onBlur={() => {
                setIsFocus({ ...isFocus, displayName: false });
              }}
              name="name"
              value={userInfo.displayName}
              onChange={({ target }) => setUserInfo({ ...userInfo, displayName: target.value })}
              type="text"
              placeholder="JohnDoe"
            />
          </div>
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
              placeholder="John@doe.com"
            />
          </div>
          <label htmlFor="password">Password</label>
          <div className={styles.inputContainer}>
            <div className={styles.iconContainer}>
              <Lock />
            </div>
            <input
              className={styles.userInput}
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

          <Button type="primary" disabled={!isValid} title="Sign Up" />
          <p className={styles.forgotCredentials}>
            Already have an account? <a href="#">Sign in</a>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Signup;
