import Head from 'next/head';
import PropTypes from 'prop-types';
import styles from './layout.module.scss';
import Nav from './nav';

export const fullName = 'Chris Bradley';

function Layout({ children }) {
    return (
        <div className={styles.container}>
            <Head />
            <Nav />
            <header />
            <main>{children}</main>
            <footer />
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.array.isRequired,
};

export default Layout;
