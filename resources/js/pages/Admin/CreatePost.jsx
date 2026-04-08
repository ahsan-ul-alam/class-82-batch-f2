import AuthLayout from '@/Layouts/AuthLayout';
import { useForm } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function CreatePost() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        status: 'draft',
        image: null,
    });

    const [preview, setPreview] = useState(null);

    const handleImage = (e) => {
        const file = e.target.files[0];
        setData('image', file);

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.posts.store'), {
            forceFormData: true,
        });
    };

    return (
        <AuthLayout>
            <div className="mx-auto max-w-5xl">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Create New Post
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Write, format, and publish your content professionally.
                    </p>
                </div>

                <form
                    onSubmit={submit}
                    className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Post Title
                        </label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Enter your post title"
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                        {errors.title && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Featured Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                            className="block w-full rounded-xl border border-slate-300 p-3"
                        />
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="mt-4 h-48 w-full rounded-2xl border border-slate-200 object-cover"
                            />
                        )}
                        {errors.image && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.image}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Content
                        </label>
                        <div className="overflow-hidden rounded-2xl border border-slate-300">
                            <ReactQuill
                                theme="snow"
                                value={data.content}
                                onChange={(value) => setData('content', value)}
                                className="bg-white"
                            />
                        </div>
                        {errors.content && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.content}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Status
                        </label>
                        <select
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-70"
                        >
                            {processing ? 'Saving...' : 'Create Post'}
                        </button>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}
