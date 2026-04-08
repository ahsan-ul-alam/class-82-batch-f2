import AuthLayout from '@/Layouts/AuthLayout';
import { useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function EditPost({ post }) {
    const {
        data,
        setData,
        post: submitPost,
        processing,
        errors,
    } = useForm({
        _method: 'put',
        title: post.title || '',
        content: post.content || '',
        status: post.status || 'draft',
        image: null,
    });

    const [preview, setPreview] = useState(
        post.image ? `/storage/${post.image}` : null,
    );

    const handleImage = (e) => {
        const file = e.target.files[0];
        setData('image', file);

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();

        submitPost(route('admin.posts.update', post.id), {
            forceFormData: true,
        });
    };

    return (
        <AuthLayout>
            <div className="mx-auto max-w-5xl">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-slate-900">
                        ✏️ Edit Post
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Update your blog content easily
                    </p>
                </div>

                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">
                                Post Title
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                                className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700">
                                Featured Image
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImage}
                                className="mt-2"
                            />

                            {preview && (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="mt-4 h-48 w-full rounded-xl border object-cover"
                                />
                            )}
                            {errors.image && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.image}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Content
                            </label>

                            <ReactQuill
                                theme="snow"
                                value={data.content}
                                onChange={(value) => setData('content', value)}
                            />

                            {errors.content && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.content}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700">
                                Status
                            </label>

                            <select
                                value={data.status}
                                onChange={(e) =>
                                    setData('status', e.target.value)
                                }
                                className="mt-2 w-full rounded-xl border px-4 py-3"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                            >
                                {processing ? 'Updating...' : 'Update Post'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthLayout>
    );
}
