import styles from "./Header.module.css";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Header({ loginStatus, setLoginStatus }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        setLoginStatus(false);
        localStorage.removeItem('loginStatus', false);
        localStorage.removeItem('Token');
        localStorage.removeItem('order');
    };

    const handleClick = (e) => {
        if (!loginStatus) {
            e.preventDefault();
            navigate('/login');
        }
    };

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link to="/home" className={styles.navLink} onClick={handleClick}>
                    Home
                </Link>
                <Link to="/about" className={styles.navLink} onClick={handleClick}>
                    About
                </Link>
                <Link to="/contact" className={styles.navLink} onClick={handleClick}>
                    Contact
                </Link>
                <Link to="/blogs" className={styles.navLink} onClick={handleClick}>
                    Blogs
                </Link>
                <Link to="/store" className={styles.navLink} onClick={handleClick}>
                    Store
                </Link>
            </nav>
            <Link to="/" className={!loginStatus ? styles.logoA : styles.logoB}>Healthy Products</Link>
            <div className={styles.auth}>
                {!loginStatus ? (
                    <>
                        <Link to="/login" className={styles.login}>Login</Link>
                        <Link to="/signup" className={styles.signup}>SignUp</Link>
                    </>
                ) : (
                    <>
                    <Link to="/" className={styles.logout} onClick={handleLogout}>Logout</Link>
                    <Link to="/myorder" className={styles.myorder}>MyOrder</Link>
                    </>
                )}
            </div>
            <Outlet />
        </header>
    );
}

export default Header;
