<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/login', [AuthController::class, 'authenticate'])->name('login.store');
});
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [AuthController::class, 'dashboard'])->name('dashboard');
    Route::get('/dashboard/posts', [AuthController::class, 'allposts'])->name('admin.posts.index');
    Route::get('/dashboard/post/create', [AuthController::class, 'createPost'])->name('admin.posts.create');
    Route::post('/dashboard/posts', [AuthController::class, 'storePost'])->name('admin.posts.store');
    Route::get('/dashboard/posts/edit/{id}', [AuthController::class, 'editPost'])->name('admin.posts.edit');
    Route::put('/admin/posts/{id}', [AuthController::class, 'updatePost'])->name('admin.posts.update');
    Route::get('/dashboard/posts/draft', [AuthController::class, 'draftPosts'])
        ->name('admin.posts.draft');
    Route::delete('/admin/posts/{id}/delete', [AuthController::class, 'deletePost'])->name('admin.posts.delete');
});
