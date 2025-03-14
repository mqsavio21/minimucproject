'use client';

import { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';

interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  tasks: Task[];
}

interface Task {
  id: number;
  name: string;
  description: string;
  due_date: string;
  status: 'pending' | 'in_progress' | 'completed';
  employee_id: number;
}

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleAddTask = async (taskData: Omit<Task, 'id'>) => {
    try {
      const response = await fetch('http://localhost:8000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        fetchEmployees(); // Refresh the employee list to show the new task
        setShowTaskForm(false);
      } else {
        const errorData = await response.json();
        alert('Error adding task: ' + JSON.stringify(errorData.errors));
      }
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Error adding task. Please try again.');
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-4">{employee.name}</h2>
            <p className="text-gray-600 mb-2">{employee.position}</p>
            <p className="text-gray-600 mb-4">{employee.email}</p>
            
            <h3 className="font-semibold mb-2">Tasks:</h3>
            <ul className="space-y-2 mb-4">
              {employee.tasks.map((task) => (
                <li
                  key={task.id}
                  className="bg-gray-50 p-3 rounded hover:bg-gray-100 transition-colors"
                >
                  <p className="font-medium">{task.name}</p>
                  <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-600">
                      Due: {new Date(task.due_date).toLocaleDateString()}
                    </p>
                    <span className={`inline-block px-2 py-1 text-xs rounded ${getStatusColor(task.status)}`}>
                      {task.status.replace('_', ' ')}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            
            <button
              onClick={() => {
                setSelectedEmployee(employee);
                setShowTaskForm(true);
              }}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Add Task
            </button>
          </div>
        ))}
      </div>

      {showTaskForm && selectedEmployee && (
        <TaskForm
          employee={selectedEmployee}
          onSubmit={handleAddTask}
          onClose={() => setShowTaskForm(false)}
        />
      )}
    </div>
  );
} 