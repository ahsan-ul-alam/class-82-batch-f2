import MainLayout from '@/layouts/MainLayout';
import { Link } from '@inertiajs/react';

export default function Welcome({ posts }: any) {
    return (
        <MainLayout>
            {/* Hero */}
            <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <span className="inline-flex rounded-full bg-blue-100 px-4 py-1 text-sm font-medium text-blue-700">
                            Welcome to My Blog
                        </span>

                        <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                            Read ideas, stories, and useful articles
                        </h1>

                        <p className="mt-4 text-lg leading-8 text-gray-600">
                            Discover simple, helpful, and engaging content
                        </p>
                    </div>
                </div>
            </section>

            {/* Posts */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 flex items-end justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                Latest Posts
                            </h2>
                        </div>

                        <Link
                            href="/articles"
                            className="hidden text-sm font-semibold text-blue-600 hover:text-blue-700 sm:inline-block"
                        >
                            View all →
                        </Link>
                    </div>

                    {posts.length > 0 ? (
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {posts.map((post: any) => (
                                <article
                                    key={post.id}
                                    className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-xl"
                                >
                                    {/* 🔥 Image */}
                                    <div className="h-48 w-full overflow-hidden bg-gray-100">
                                        {post.image ? (
                                            <img
                                                src={`/storage/${post.image}`}
                                                alt={post.title}
                                                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-sm text-gray-400">
                                                No Image
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                                            Blog Post
                                        </span>

                                        <h3 className="mt-3 line-clamp-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                                            {post.title}
                                        </h3>

                                        <p className="mt-2 line-clamp-3 text-sm text-gray-600">
                                            {post.content.replace(
                                                /<[^>]+>/g,
                                                '',
                                            )}
                                        </p>

                                        <div className="mt-4">
                                            <Link
                                                href={`/articles/${post.slug}`}
                                                className="text-sm font-medium text-blue-600 hover:underline"
                                            >
                                                Read More →
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center">
                            No posts available
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
