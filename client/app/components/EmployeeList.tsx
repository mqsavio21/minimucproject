'use client';

import { useState, useEffect } from 'react';
import TaskForm from './TaskForm';

interface Employee {
  id: number;
  name: string;
  position: string;
  tasks: Task[];
}

interface Task {
  id: number;
  task_name: string;
  due_date: string;
  employees_id: number;
}

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Attempting to fetch employees...');
      
      const response = await fetch('http://localhost:8000/api/employees', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`);
      }

      const data = await response.json();
      console.log('Received data:', data);
      setEmployees(data);
    } catch (err: any) {
      console.error('Fetch error:', err);
      setError(`Failed to fetch employees: ${err.message || 'Unknown error occurred'}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDeleteTask = async (taskId: number) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        await fetchEmployees();
      } else {
        throw new Error('Failed to delete task');
      }
    } catch (err: any) {
      console.error('Error:', err);
      setError(`Failed to delete task: ${err.message || 'Unknown error occurred'}`);
    }
  };

  const handleEditClick = (employee: Employee, task: Task) => {
    setSelectedEmployee(employee);
    setSelectedTask(task);
    setIsEditing(true);
    setShowTaskForm(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-800">Employee Tasks</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Task Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map(employee => (
              employee.tasks.length > 0 ? (
                employee.tasks.map(task => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                      <div className="text-sm text-gray-500">{employee.position}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{task.task_name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(task.due_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditClick(employee, task)}
                          className="inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => {
                            setSelectedEmployee(employee);
                            setSelectedTask(null);
                            setIsEditing(false);
                            setShowTaskForm(true);
                          }}
                          className="inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Add Task
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                    <div className="text-sm text-gray-500">{employee.position}</div>
                  </td>
                  <td colSpan={2} className="px-6 py-4 text-sm text-gray-500 italic">
                    No tasks assigned
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => {
                        setSelectedEmployee(employee);
                        setSelectedTask(null);
                        setIsEditing(false);
                        setShowTaskForm(true);
                      }}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Add Task
                    </button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>

      {/* Task Form Modal */}
      {showTaskForm && selectedEmployee && (
        <TaskForm
          employee={selectedEmployee}
          task={selectedTask}
          isEditing={isEditing}
          onClose={() => {
            setShowTaskForm(false);
            setSelectedTask(null);
            setIsEditing(false);
          }}
          onSubmit={async (taskData) => {
            try {
              const url = isEditing 
                ? `http://localhost:8000/api/tasks/${selectedTask?.id}`
                : 'http://localhost:8000/api/tasks';
              
              const response = await fetch(url, {
                method: isEditing ? 'PUT' : 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  ...taskData,
                  employees_id: selectedEmployee.id
                }),
              });

              if (response.ok) {
                await fetchEmployees();
                setShowTaskForm(false);
                setSelectedTask(null);
                setIsEditing(false);
              }
            } catch (error) {
              console.error('Error:', error);
            }
          }}
        />
      )}
    </div>
  );
} 