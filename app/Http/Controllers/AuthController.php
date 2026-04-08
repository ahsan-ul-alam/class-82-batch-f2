<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function login()
    {
        return Inertia::render('Auth/Login');
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return redirect()->route('dashboard');
        }

        return back()->withErrors([
            'email' => 'Invalid credentials.',
        ]);
    }

    public function dashboard()
    {
        $posts = Post::latest()->get();

        return Inertia::render('Admin/Dashboard', [
            'posts' => $posts,
            'drafts' => $posts->where('status', 'draft')->count(),
            'totalPosts' => $posts->count(),
            'user' => Auth::user(),
        ]);
    }

    public function allposts()
    {
        return Inertia::render('Admin/Posts', [
            'posts' => Post::latest()->get(),
        ]);
    }

    public function createPost()
    {
        return Inertia::render('Admin/CreatePost');
    }

    public function storePost(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
            'image' => 'nullable|image',
        ]);

        $slug = Str::slug($request->title);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('posts', 'public');
        }

        Post::create([
            'title' => $request->title,
            'slug' => $slug,
            'content' => $request->content,
            'status' => $request->status,
            'image' => $imagePath,
        ]);

        return redirect()->route('admin.posts.index');
    }

    public function draftPosts()
    {
        return Inertia::render('Admin/Posts', [
            'posts' => Post::where('status', 'draft')->latest()->get(),
        ]);
    }

    public function editPost($id)
    {
        return Inertia::render('Admin/EditPost', [
            'post' => Post::findOrFail($id),
        ]);
    }

    public function updatePost(Request $request, $id)
    {
        $post = Post::findOrFail($id);

        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required'],
            'status' => ['required', 'in:draft,published'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ]);

        $imagePath = $post->image;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('posts', 'public');
        }

        $slug = Str::slug($request->title);
        $originalSlug = $slug;
        $count = 1;

        while (
            Post::where('slug', $slug)
                ->where('id', '!=', $post->id)
                ->exists()
        ) {
            $slug = $originalSlug.'-'.$count++;
        }

        $post->update([
            'title' => $request->title,
            'slug' => $slug,
            'content' => $request->content,
            'status' => $request->status,
            'image' => $imagePath,
        ]);

        return redirect()->route('admin.posts.index');
    }

    public function deletePost($id)
    {
        Post::findOrFail($id)->delete();

        return redirect()->route('admin.posts.index');
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
