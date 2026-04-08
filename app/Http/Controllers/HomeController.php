<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $post = Post::orderByDesc('created_at')->where('status', 'published')->take(6)->get();

        return Inertia::render('welcome', [
            'posts' => $post,
        ]);
    }
}
