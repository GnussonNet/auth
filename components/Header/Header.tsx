// Imports
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'react-feather';

// Styles
import styles from './Header.module.scss';

export default function Header() {
  // Open, close state for the mobile menu
  const [menuOpen, setMenuOpen] = useState(false);

  // Size of the current window is used to know if the menu should be accessible or not
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  // Update the size state to current window size
  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menu if screen size larger then 992px (md breakpoint) or the user clicks on a link or close button
  useEffect(() => {
    if (size.width > 992 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  return (
    // Animates from the top with opacity
    <header className={styles.header}>
      <div className={styles.content}>
        {/* Logo with text */}
        <Link href="/" replace={true} className={styles.logo}>
          <h4 className={styles.logo__title}>Gnusson Auth</h4>
        </Link>

        <nav className={`${styles.nav} ${menuOpen && size.width < 992 ? styles.isMenu : ''}`}>
          <ul>
            <li>
              <Link href="/signup">Create free account</Link>
            </li>
            <li>
              <Link href="/signin">Sign In</Link>
            </li>
          </ul>
        </nav>

        {/* Menu- or close button only visible on small screens  */}
        <div className={styles.toggle}>{!menuOpen ? <Menu onClick={() => setMenuOpen(true)} /> : <X onClick={() => setMenuOpen(false)} />}</div>
      </div>
    </header>
  );
}
