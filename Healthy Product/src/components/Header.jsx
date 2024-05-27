import styles from "./Header.module.css";
import { memo, useState } from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';

function Header({ loginStatus, setLoginStatus }) {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);

    const handleLogout = () => {
        setLoginStatus(false);
        localStorage.removeItem('loginStatus');
        localStorage.removeItem('Token');
        localStorage.removeItem('order');
        setAccountMenuOpen(false); // Close account menu on logout
    };

    const handleClick = (path) => {
        setMenuOpen(false); // Close hamburger menu
        setAccountMenuOpen(false); // Close account menu
        navigate(path); // Navigate to the desired path
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleAccountMenu = () => {
        setAccountMenuOpen(!accountMenuOpen);
    };

    return (
        <header className={styles.header}>
            <div className={styles.leftSection}>
                <button className={styles.hamburger} onClick={toggleMenu}>
                    <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
                </button>
                <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
                    <Link to="/home" className={styles.navLink} onClick={() => handleClick('/home')}>
                        Home
                    </Link>
                    <Link to="/about" className={styles.navLink} onClick={() => handleClick('/about')}>
                        About
                    </Link>
                    <Link to="/contact" className={styles.navLink} onClick={() => handleClick('/contact')}>
                        Contact
                    </Link>
                    <Link to="/blogs" className={styles.navLink} onClick={() => handleClick('/blogs')}>
                        Blogs
                    </Link>
                    <Link to="/store" className={styles.navLink} onClick={() => handleClick('/store')}>
                        Store
                    </Link>
                </nav>
            </div>
            <div className={styles.centerSection}>
                <Link to="/" className={!loginStatus ? styles.logoA : styles.logoB}>Healthy Products</Link>
            </div>
            <div className={styles.rightSection}>
                <div className={styles.auth}>
                    {!loginStatus ? (
                        <button className={styles.accountIcon} onClick={toggleAccountMenu}>
                            <FontAwesomeIcon icon={faUser} />
                        </button>
                    ) : (
                        <div className={styles.authLinks}>
                            <Link to="/myorder" className={styles.myorder} onClick={() => handleClick('/myorder')}>MyOrder</Link>
                            <Link to="/" className={styles.logout} onClick={handleLogout}>Logout</Link>
                        </div>
                    )}
                </div>
                {accountMenuOpen && !loginStatus && (
                    <div className={styles.accountMenu}>
                        <Link to="/login" className={styles.login} onClick={() => handleClick('/login')}>Login</Link>
                        <Link to="/signup" className={styles.signup} onClick={() => handleClick('/signup')}>SignUp</Link>
                    </div>
                )}
            </div>
            <Outlet />
        </header>
    );
}

export default memo(Header);
