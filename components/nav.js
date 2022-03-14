import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Link from 'next/link';
import clsx from 'clsx';
import Logo from '../components/logo';
import Moon from '../components/moon';
import Sun from '../components/sun';
import { Theme, useTheme } from '../contexts/theme-provider';

const navItems = [
    { href: '/#', text: 'Uno' },
    { href: '/#', text: 'Dos' },
    { href: '/#', text: 'Tres' },
    { href: '/#', text: 'Cuatro' },
    { href: '/#', text: 'Cinco' },
    { href: '/#', text: 'Seis' },
];

function handleMouseOut(event) {
    event.target.blur();
}

function NavItem({ href, text }) {
    const { pathname } = useRouter();
    const active = href === pathname || pathname.startsWith(href);
    return (
        <li className="px-8 py-2">
            <Link href={href}>
                <a
                    className={clsx(
                        'block focus:outline-none dark:focus:text-pink-300 dark:hover:text-pink-300 focus:text-pink-400 hover:text-pink-400 text-lg underlined',
                        {
                            'active dark:text-pink-300 text-pink-400': active,
                        },
                    )}
                    onMouseOut={handleMouseOut}
                >
                    {text}
                </a>
            </Link>
        </li>
    );
}

NavItem.propTypes = {
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

function Nav() {
    const [theme, setTheme] = useTheme();

    function handleClick() {
        setTheme(previousTheme => (previousTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK));
    }

    return (
        <div className="px-5vw py-4 lg:py-8">
            <nav className="flex items-center justify-between max-w-8xl mx-auto">
                <ul className="flex items-center justify-center">
                    <li>
                        <Link href="/">
                            <a className="group focus:outline-none inline-block px-5 py-2" onMouseOut={handleMouseOut}>
                                <Logo />
                            </a>
                        </Link>
                    </li>
                </ul>
                <ul className="hidden lg:flex">
                    {navItems.map(({ href, text }) => (
                        <NavItem key={text.toLowerCase().replace(/\s/g, '-')} href={href} text={text} />
                    ))}
                </ul>
                <ul className="hidden lg:flex items-center justify-center">
                    <li>
                        <button
                            className="group focus:outline-none inline-block px-5 py-2"
                            onClick={handleClick}
                            onMouseOut={handleMouseOut}
                        >
                            {theme === Theme.DARK ? <Moon /> : <Sun />}
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Nav;
