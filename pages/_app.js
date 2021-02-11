import PropTypes from 'prop-types';
import { useEffect } from 'react';
import '../styles/global.scss';

function App({ Component, pageProps }) {
    useEffect(() => {
        document.addEventListener('scroll', handleScroll);
        return () => document.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    function handleScroll() {
        document.documentElement.dataset.scroll = window.scrollY;
    }

    return <Component {...pageProps} />;
}

App.propTypes = {
    Component: PropTypes.func.isRequired,
    pageProps: PropTypes.object.isRequired,
};

export default App;
