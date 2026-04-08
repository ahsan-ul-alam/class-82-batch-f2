import MainLayout from '@/Layouts/MainLayout';
import { Link } from '@inertiajs/react';

export default function Show({ article, allPosts }) {
    const relatedPosts =
        allPosts?.filter((post) => post.id !== article.id).slice(0, 6) || [];

    return (
        <MainLayout>
            <section className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white py-10 sm:py-14">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-12 xl:gap-10">
                        {/* Main Content */}
                        <div className="lg:col-span-8 xl:col-span-9">
                            <article className="overflow-hidden rounded-[28px] border bg-white shadow-sm">
                                {/* 🔥 Featured Image */}
                                {article.image && (
                                    <div className="h-[260px] w-full overflow-hidden sm:h-[320px] lg:h-[400px]">
                                        <img
                                            src={`/storage/${article.image}`}
                                            alt={article.title}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                )}

                                {/* Top Bar */}
                                <div className="border-b px-5 py-4 sm:px-8 lg:px-10">
                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                        <Link
                                            href="/articles"
                                            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                                        >
                                            ← Back
                                        </Link>

                                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">
                                            Article
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="px-5 py-8 sm:px-8 lg:px-10">
                                    <div className="mx-auto max-w-4xl">
                                        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl">
                                            {article.title}
                                        </h1>

                                        {/* Author */}
                                        <div className="mt-6 flex items-center gap-3 border-b pb-6">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 font-bold text-white">
                                                A
                                            </div>

                                            <div>
                                                <p className="text-sm font-medium text-slate-800">
                                                    Admin
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    Published recently
                                                </p>
                                            </div>
                                        </div>

                                        {/* 🔥 Content (HTML render) */}
                                        <div
                                            className="prose prose-lg mt-8 max-w-none text-slate-700"
                                            dangerouslySetInnerHTML={{
                                                __html: article.content,
                                            }}
                                        />
                                    </div>
                                </div>
                            </article>
                        </div>

                        {/* Sidebar */}
                        <aside className="lg:col-span-4 xl:col-span-3">
                            <div className="space-y-6 lg:sticky lg:top-24">
                                {/* Related */}
                                <div className="rounded-[24px] border bg-white p-5 shadow-sm">
                                    <h2 className="text-lg font-bold">
                                        More Articles
                                    </h2>

                                    <div className="mt-4 space-y-3">
                                        {relatedPosts.length > 0 ? (
                                            relatedPosts.map((post) => (
                                                <Link
                                                    key={post.id}
                                                    href={`/articles/${post.slug}`}
                                                    className="block rounded-xl p-3 hover:bg-slate-50"
                                                >
                                                    <h3 className="text-sm font-semibold">
                                                        {post.title}
                                                    </h3>
                                                </Link>
                                            ))
                                        ) : (
                                            <p className="text-sm text-slate-500">
                                                No articles found
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="rounded-[24px] bg-slate-900 p-5 text-white">
                                    <h3 className="text-lg font-bold">
                                        Explore more content
                                    </h3>

                                    <Link
                                        href="/articles"
                                        className="mt-4 inline-block rounded bg-white px-4 py-2 text-slate-900"
                                    >
                                        Browse Articles
                                    </Link>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
