import { Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function Header() {
    const { url } = usePage();

    const navLink = (href, label) => (
        <Link
            href={href}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                url === new URL(href).pathname
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
            }`}
        >
            {label}
        </Link>
    );

    return (
        <header className="border-b bg-white shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
                {/* Logo */}
                <Link
                    href={route('home')}
                    className="text-xl font-bold text-blue-600"
                >
                    AR Blog
                </Link>

                {/* Nav Links */}
                <nav className="flex items-center gap-2">
                    {navLink(route('home'), 'Home')}
                    {navLink(route('articles.index'), 'Articles')}
                </nav>

                {/* Auth Links */}
                <div className="flex items-center gap-2">
                    {navLink(route('login'), 'Login')}
                </div>
            </div>
        </header>
    );
}
