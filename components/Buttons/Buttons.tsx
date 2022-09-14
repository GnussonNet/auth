import React, { Children, MouseEventHandler } from 'react';
import styles from './Buttons.module.scss';

interface buttonProps {
  title: React.ReactNode;
  onClick?: MouseEventHandler;
  disabled?: boolean;
  type: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger';
}

interface navButtonProps {
  children: React.ReactNode;
  onClick?: MouseEventHandler;
  disabled?: boolean;
}


export const Button = ({ title, onClick, disabled, type }: buttonProps): JSX.Element => {
  return (
    <button className={`${styles.button} ${styles[`button--${type}_button`]}`} onClick={onClick} type="submit" disabled={disabled}>
      {title}
    </button>
  );
};

export const NavButton = ({ onClick, disabled, children }: navButtonProps): JSX.Element => {
  return (
    <button className={`${styles.nav_button}`} onClick={onClick} disabled={disabled}>
      <>
        {children}
      </>
    </button>
  );
};
