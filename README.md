# MyBlog ( Class 82 , Batch f-2 )

A modern, full-stack blog application built with Laravel 13 and React 19.

## 🚀 Features

- **Public Article Section**: Browse and read published articles with slug-based routing.
- **Admin Dashboard**: Secure area for managing blog content.
    - **CRUD Operations**: Create, read, update, and delete posts.
    - **Draft System**: Save posts as drafts before publishing.
    - **Image Management**: Support for post thumbnails/images.
    - **Statistics**: Overview of total posts and drafts.
- **Modern Tech Stack**:
    - **Backend**: [Laravel 13](https://laravel.com/) (PHP 8.3+)
    - **Frontend**: [React 19](https://react.dev/), [Inertia.js 3](https://inertiajs.com/), [TypeScript](https://www.typescriptlang.org/)
    - **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
    - **State/Routing**: [Ziggy](https://github.com/tighten/ziggy) for Laravel routes in JavaScript.
    - **Rich Text Editing**: [React Quill](https://github.com/gtgalone/react-quill-new) for post content.

## 🛠️ Tech Stack

- **Framework**: Laravel 13
- **Frontend**: React 19 + TypeScript
- **Communication**: Inertia.js (The Modern Monolith)
- **Styling**: Tailwind CSS 4
- **Database**: SQLite (Default)
- **Testing**: Pest
- **Linting/Formatting**: Laravel Pint, ESLint, Prettier
- **Build Tool**: Vite

## 🏁 Getting Started

### Prerequisites

- PHP 8.3 or higher
- Composer
- Node.js & NPM
- SQLite (or your preferred database)

### Installation & Setup

You can use the built-in setup command to handle most of the installation:

```bash
composer setup
```

This command will:

1. Install PHP dependencies.
2. Create your `.env` file from `.env.example`.
3. Generate the application key.
4. Run database migrations.
5. Install NPM dependencies.
6. Build the frontend assets.

### Development

To start the development environment (Server, Vite, and Queue):

```bash
composer dev
```

The application will be available at `http://localhost:8000`.

## 🧪 Testing & Quality

### Running Tests

```bash
composer test
```

### Linting & Formatting

```bash
# Run all linters (Pint, ESLint, Prettier, TSC)
composer ci:check

# Fix linting issues
composer lint
npm run lint
npm run format
```

## 📂 Project Structure

- `app/Http/Controllers`: Backend logic for Articles and Authentication.
- `app/Models`: `Post` and `User` Eloquent models.
- `resources/js/pages`: React components for different views (Articles, Admin, Auth).
- `routes/`: Web and Auth route definitions.
- `database/migrations`: Database schema for users and posts.

## 📜 License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
