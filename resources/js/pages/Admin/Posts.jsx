import AuthLayout from '@/Layouts/AuthLayout';
import { router, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function Posts({ posts }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this post?')) {
            router.delete(route('admin.posts.delete', id));
        }
    };

    return (
        <AuthLayout>
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900">All Posts</h1>

                <Link
                    href={route('admin.posts.create')}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    + Create Post
                </Link>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                    {/* Head */}
                    <thead className="bg-slate-50 text-slate-500">
                        <tr>
                            <th className="px-6 py-3 font-medium">Title</th>
                            <th className="px-6 py-3 font-medium">Status</th>
                            <th className="px-6 py-3 font-medium">Date</th>
                            <th className="px-6 py-3 text-right font-medium">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody className="divide-y divide-slate-200">
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <tr key={post.id} className="hover:bg-slate-50">
                                    {/* Title */}
                                    <td className="px-6 py-4 font-medium text-slate-900">
                                        {post.title}
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4">
                                        {post.status === 'published' ? (
                                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                                Published
                                            </span>
                                        ) : (
                                            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                                                Draft
                                            </span>
                                        )}
                                    </td>

                                    {/* Date */}
                                    <td className="px-6 py-4 text-slate-500">
                                        {post.created_at
                                            ? new Date(
                                                  post.created_at,
                                              ).toLocaleDateString()
                                            : '—'}
                                    </td>

                                    {/* Actions */}
                                    <td className="space-x-2 px-6 py-4 text-right">
                                        {/* Edit */}
                                        <Link
                                            href={route(
                                                'admin.posts.edit',
                                                post.id,
                                            )}
                                            className="rounded-md bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200"
                                        >
                                            Edit
                                        </Link>

                                        {/* Delete */}
                                        <button
                                            onClick={() =>
                                                handleDelete(post.id)
                                            }
                                            className="rounded-md bg-red-100 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-200"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="px-6 py-6 text-center text-slate-500"
                                >
                                    No posts found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AuthLayout>
    );
}
