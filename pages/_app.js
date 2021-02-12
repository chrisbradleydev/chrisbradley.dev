import PropTypes from 'prop-types';
import { useEffect } from 'react';
import debounce from '@@/utils/debounce';
import '@@/styles/global.scss';

function App({ Component, pageProps }) {
    useEffect(() => {
        const debouncedScroll = debounce(handleScroll);
        document.addEventListener('scroll', debouncedScroll);
        return () => document.removeEventListener('scroll', debouncedScroll);
    }, []);

    function handleScroll() {
        document.body.classList.toggle('scrolled', window.scrollY > 0);
    }

    return <Component {...pageProps} />;
}

App.propTypes = {
    Component: PropTypes.func.isRequired,
    pageProps: PropTypes.object.isRequired,
};

export default App;
