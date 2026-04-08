import { Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useState } from 'react';
import { LayoutDashboard, FileText, FileEdit, Menu, X } from 'lucide-react';

export default function AuthLayout({ children }) {
    const { url } = usePage();
    const [open, setOpen] = useState(false);

    const navItems = [
        {
            name: 'Overview',
            href: route('dashboard'),
            icon: LayoutDashboard,
            active: url === '/dashboard',
        },
        {
            name: 'All Posts',
            href: route('admin.posts.index'),
            icon: FileText,
            active: url.startsWith('/admin/posts'),
        },
        {
            name: 'Drafts',
            href: route('admin.posts.draft'),
            icon: FileEdit,
            active: url.startsWith('/admin/drafts'),
        },
    ];

    return (
        <div className="min-h-screen bg-slate-100">
            <div className="flex min-h-screen">
                {/* Sidebar */}
                <aside
                    className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
                        open ? 'translate-x-0' : '-translate-x-full'
                    }`}
                >
                    <div className="flex items-center justify-between border-b px-6 py-5">
                        <div>
                            <h1 className="text-xl font-bold text-slate-900">
                                AR Blog
                            </h1>
                            <p className="text-xs text-slate-500">
                                Admin Panel
                            </p>
                        </div>

                        {/* Close button (mobile) */}
                        <button
                            className="lg:hidden"
                            onClick={() => setOpen(false)}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <nav className="mt-6 space-y-2 px-4">
                        {navItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                                        item.active
                                            ? 'bg-blue-600 text-white shadow'
                                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                    }`}
                                >
                                    <Icon size={18} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-auto border-t px-6 py-4 text-xs text-slate-500">
                        Manage your content easily 🚀
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex flex-1 flex-col">
                    {/* Header */}
                    <header className="sticky top-0 z-30 border-b bg-white/90 backdrop-blur">
                        <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                            {/* Left */}
                            <div className="flex items-center gap-3">
                                <button
                                    className="lg:hidden"
                                    onClick={() => setOpen(true)}
                                >
                                    <Menu size={22} />
                                </button>

                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900">
                                        Dashboard
                                    </h2>
                                    <p className="text-sm text-slate-500">
                                        Manage your blog
                                    </p>
                                </div>
                            </div>

                            {/* Right */}
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/"
                                    className="rounded-lg border px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                                >
                                    Visit Site
                                </Link>

                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                                >
                                    Logout
                                </Link>
                            </div>
                        </div>
                    </header>

                    {/* Page Content */}
                    <main className="flex-1 p-4 sm:p-6 lg:p-8">
                        <div className="rounded-2xl border bg-white p-6 shadow-sm">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
