import Head from 'next/head';
import styles from './layout.module.css';

export const fullName = 'Christopher Bradley';

export default function Layout({ children }) {
    return (
        <div className={styles.container}>
            <Head></Head>
            <header className={styles.header}></header>
            <main>{children}</main>
            <footer></footer>
        </div>
    );
}
