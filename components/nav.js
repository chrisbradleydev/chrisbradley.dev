import Link from 'next/link';
import styles from './nav.module.scss';

const Nav = () => (
    <nav className={styles.nav}>
        <section className={styles.nav__section}>
            <ul className={styles.nav__right}></ul>
            <ul className={styles.nav__left}>
                <li>
                    <Link href="/">
                        <a>CBD</a>
                    </Link>
                </li>
            </ul>
        </section>
    </nav>
);

export default Nav;
