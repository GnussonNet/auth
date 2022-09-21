import React, { MouseEventHandler } from 'react';
import styles from './Buttons.module.scss';

interface buttonProps {
  title: React.ReactNode;
  onClick?: MouseEventHandler;
  disabled?: boolean;
  type: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger';
}

interface navButtonProps {
  title: React.ReactNode;
  onClick?: MouseEventHandler;
  type: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger';
  disabled?: boolean;
}

interface navProfileButtonProps {
  children: React.ReactNode;
  onClick?: MouseEventHandler;
}


export const Button = ({ title, onClick, disabled, type }: buttonProps): JSX.Element => {
  return (
    <button className={`${styles.button} ${styles[`button--${type}_button`]}`} onClick={onClick} type="submit" disabled={disabled}>
      {title}
    </button>
  );
};

export const NavButton = ({ title, onClick, type, disabled }: navButtonProps): JSX.Element => {
  return (
    <button className={`${styles.nav_button} ${styles[`nav_button--${type}_button`]}`} onClick={onClick} type="submit" disabled={disabled}>
      {title}
    </button>
  );
}

export const NavProfileButton = ({ onClick, children }: navProfileButtonProps): JSX.Element => {
  return (
    <div className={`${styles.nav_profile_button}`} onClick={onClick}>
      <>
        {children}
      </>
    </div>
  );
};
