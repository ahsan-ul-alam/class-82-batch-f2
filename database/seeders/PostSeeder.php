<?php

namespace Database\Seeders;

use App\Models\Post;
use Faker\Factory;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 10; $i++) {
            Post::create([
                'title' => Factory::create()->sentence(6),
                'slug' => Factory::create()->slug(),
                'content' => Factory::create()->paragraph(3),
            ]);
        }
    }
}
