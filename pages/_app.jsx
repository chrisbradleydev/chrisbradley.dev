import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Theme, ThemeProvider } from '@@/contexts/theme-provider';
import debounce from '@@/utils/debounce';
import '@@/styles/globals.css';
import '@@/styles/app.css';

function App({ Component, pageProps }) {
    useEffect(() => {
        const debouncedScroll = debounce(handleScroll, 50);
        document.addEventListener('scroll', debouncedScroll);
        return () => document.removeEventListener('scroll', debouncedScroll);
    }, []);

    function handleScroll() {
        document.body.classList.toggle('scrolled', window.scrollY > 0);
    }

    return (
        <ThemeProvider specifiedTheme={Theme.DARK}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

App.propTypes = {
    Component: PropTypes.func.isRequired,
    pageProps: PropTypes.object.isRequired,
};

export default App;
