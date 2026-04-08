import MainLayout from '@/layouts/MainLayout';
import { Link } from '@inertiajs/react';

export default function Index({ posts = [] }) {
    return (
        <MainLayout>
            <section className="bg-gradient-to-b from-slate-50 via-white to-white py-12 sm:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-10 text-center">
                        <span className="inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
                            Articles
                        </span>
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Explore All Blog Posts
                        </h1>
                        <p className="mt-3 text-base text-slate-600 sm:text-lg">
                            Read useful articles, insights, and ideas from our
                            latest collection.
                        </p>
                    </div>

                    {/* Posts Grid */}
                    {posts.data && posts.data.length > 0 ? (
                        <>
                            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                {posts.data.map((post) => (
                                    <article
                                        key={post.id}
                                        className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                                    >
                                        {/* Image */}
                                        <div className="h-52 w-full overflow-hidden bg-slate-100">
                                            {post.image ? (
                                                <img
                                                    src={`/storage/${post.image}`}
                                                    alt={post.title}
                                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-sm font-medium text-slate-400">
                                                    No Image
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="p-5">
                                            <div className="mb-3">
                                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                                    Blog Post
                                                </span>
                                            </div>

                                            <h2 className="line-clamp-2 text-xl font-bold text-slate-900 transition group-hover:text-blue-600">
                                                {post.title}
                                            </h2>

                                            <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                                                {post.content
                                                    .replace(/<[^>]*>/g, '')
                                                    .substring(0, 140)}
                                                ...
                                            </p>

                                            <div className="mt-5 flex items-center justify-between">
                                                <Link
                                                    href={`/articles/${post.slug}`}
                                                    className="inline-flex items-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
                                                >
                                                    Read More
                                                </Link>

                                                <span className="text-xs text-slate-400">
                                                    Article
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
                                {posts.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url || '#'}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                        className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                                            link.active
                                                ? 'bg-blue-600 text-white'
                                                : link.url
                                                  ? 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                                                  : 'cursor-not-allowed bg-slate-100 text-slate-400'
                                        }`}
                                        preserveScroll
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
                            <h3 className="text-xl font-semibold text-slate-800">
                                No posts available
                            </h3>
                            <p className="mt-2 text-slate-600">
                                New articles will appear here once they are
                                published.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
