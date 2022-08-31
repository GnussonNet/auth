import React, { MouseEventHandler } from 'react';
import styles from './Buttons.module.scss';

interface buttonsTitle {
  title: string;
  onClick?: MouseEventHandler;
}

export const PrimaryButton = ({ title, onClick }: buttonsTitle) => {
  return <input className={`${styles.button} ${styles['button--primary_button']}`} onClick={onClick} type="submit" value={title} />;
};

export const SecondaryButton = ({ title, onClick }: buttonsTitle) => {
  return <input className={`${styles.button} ${styles['button--secondary_button']}`} type="submit" value={title} />;
};

export const AlternativeButton = ({ title, onClick }: buttonsTitle) => {
  return <input className={`${styles.button} ${styles['button--alternative_button']}`} type="submit" value={title} />;
};

export const SuccessButton = ({ title, onClick }: buttonsTitle) => {
  return <input className={`${styles.button} ${styles['button--success_button']}`} type="submit" value={title} />;
};

export const WarningButton = ({ title, onClick }: buttonsTitle) => {
  return <input className={`${styles.button} ${styles['button--warning_button']}`} type="submit" value={title} />;
};

export const ErrorButton = ({ title, onClick }: buttonsTitle) => {
  return <input className={`${styles.button} ${styles['button--error_button']}`} type="submit" value={title} />;
};
