import Link from 'next/link';
import Logo from '../components/logo';
import styles from './nav.module.scss';

function Nav() {
    return (
        <nav className={styles.nav}>
            <section className={styles.nav__section}>
                <ul className={styles.nav__right}></ul>
                <ul className={styles.nav__left}>
                    <li>
                        <Link href="/">
                            <a>
                                <Logo />
                            </a>
                        </Link>
                    </li>
                </ul>
            </section>
        </nav>
    );
}

export default Nav;
