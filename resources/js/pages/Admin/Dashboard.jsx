import AuthLayout from '@/layouts/AuthLayout';

export default function Dashboard({ posts, drafts, totalPosts, user }) {
    return (
        <AuthLayout>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">
                    Welcome back, {user.name} 👋
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Here’s what’s happening with your blog today.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Total Posts */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm text-slate-500">Total Posts</p>
                    <h2 className="mt-2 text-3xl font-bold text-slate-900">
                        {totalPosts}
                    </h2>
                </div>

                {/* Drafts */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm text-slate-500">Draft Posts</p>
                    <h2 className="mt-2 text-3xl font-bold text-yellow-600">
                        {drafts}
                    </h2>
                </div>

                {/* Published */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm text-slate-500">Published</p>
                    <h2 className="mt-2 text-3xl font-bold text-green-600">
                        {totalPosts - drafts}
                    </h2>
                </div>
            </div>

            {/* Recent Posts Table */}
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Recent Posts
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500">
                            <tr>
                                <th className="px-6 py-3 font-medium">Title</th>
                                <th className="px-6 py-3 font-medium">
                                    Status
                                </th>
                                <th className="px-6 py-3 font-medium">Date</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-200">
                            {posts && posts.length > 0 ? (
                                posts.slice(0, 5).map((post) => (
                                    <tr
                                        key={post.id}
                                        className="hover:bg-slate-50"
                                    >
                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            {post.title}
                                        </td>

                                        <td className="px-6 py-4">
                                            {post.is_published ? (
                                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                                    Published
                                                </span>
                                            ) : (
                                                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                                                    Draft
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-6 py-4 text-slate-500">
                                            {post.created_at
                                                ? new Date(
                                                      post.created_at,
                                                  ).toLocaleDateString()
                                                : '—'}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="px-6 py-6 text-center text-slate-500"
                                    >
                                        No posts found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthLayout>
    );
}
