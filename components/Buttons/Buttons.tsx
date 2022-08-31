import React from 'react';
import styles from './Buttons.module.scss';

interface buttonsTitle {
  title: string;
}

export const PrimaryButton = ({ title }: buttonsTitle) => {
  return <input className={`${styles.button} ${styles['button--primary_button']}`} type="submit" value={title} />;
};

export const SecondaryButton = ({ title }: buttonsTitle) => {
  return <input className={`${styles.button} ${styles['button--secondary_button']}`} type="submit" value={title} />;
};

export const AlternativeButton = ({ title }: buttonsTitle) => {
  return <input className={`${styles.button} ${styles['button--alternative_button']}`} type="submit" value={title} />;
};

export const SuccessButton = () => {
  return <div>SuccessButton</div>;
};

export const WarningButton = () => {
  return <div>WarningButton</div>;
};

export const ErrorButton = () => {
  return <div>ErrorButton</div>;
};
