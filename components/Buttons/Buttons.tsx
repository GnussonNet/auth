import React, { MouseEventHandler } from 'react';
import styles from './Buttons.module.scss';

interface buttonProps {
  title: string;
  onClick?: MouseEventHandler;
  disabled?: boolean;
  type: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger';
}

const Buttons = ({ title, onClick, disabled, type }: buttonProps): JSX.Element => {
  return <input className={`${styles.button} ${styles[`button--${type}_button`]}`} onClick={onClick} type="submit" disabled={disabled} value={title} />;
};

export default Buttons;
