<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EmployeeTaskSeeder extends Seeder
{
    public function run(): void
    {
        // Insert employees
        DB::table('employees')->insert([
            ['id' => 1, 'name' => 'Nafsirudin', 'position' => 'Developer'],
            ['id' => 2, 'name' => 'Putri', 'position' => 'Designer'],
        ]);

        // Insert tasks
        DB::table('tasks')->insert([
            [
                'id' => 1,
                'employees_id' => 1,
                'task_name' => 'Mengerjakan API',
                'due_date' => '2024-09-15'
            ],
            [
                'id' => 2,
                'employees_id' => 2,
                'task_name' => 'Membuat desain UI halaman create',
                'due_date' => '2024-09-20'
            ],
            [
                'id' => 3,
                'employees_id' => 1,
                'task_name' => 'Slicing HTML',
                'due_date' => '2024-08-02'
            ],
            [
                'id' => 4,
                'employees_id' => 2,
                'task_name' => 'Membuat icon',
                'due_date' => '2024-10-03'
            ],
            [
                'id' => 5,
                'employees_id' => 2,
                'task_name' => 'Mengubah ukuran gambar',
                'due_date' => '2024-10-03'
            ],
        ]);
    }
} 