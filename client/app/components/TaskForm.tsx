'use client';

import { useState } from 'react';

interface Employee {
  id: number;
  name: string;
  position: string;
}

interface Task {
  id: number;
  task_name: string;
  due_date: string;
}

interface TaskFormProps {
  employee: Employee;
  task?: Task | null;
  isEditing?: boolean;
  onSubmit: (taskData: {
    task_name: string;
    due_date: string;
  }) => void;
  onClose: () => void;
}

export default function TaskForm({ employee, task, isEditing, onSubmit, onClose }: TaskFormProps) {
  const [taskData, setTaskData] = useState({
    task_name: task?.task_name || '',
    due_date: task?.due_date ? new Date(task.due_date).toISOString().split('T')[0] : '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(taskData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            {isEditing ? 'Edit Task' : 'Add Task'} for {employee.name}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="task_name" className="block text-sm font-medium text-gray-700">
                Task Name
              </label>
              <input
                type="text"
                id="task_name"
                value={taskData.task_name}
                onChange={(e) => setTaskData({ ...taskData, task_name: e.target.value })}
                className="mt-1 block w-full px-3 py-2 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="due_date" className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                id="due_date"
                value={taskData.due_date}
                onChange={(e) => setTaskData({ ...taskData, due_date: e.target.value })}
                className="mt-1 block w-full px-3 py-2 text-gray-900 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isEditing ? 'Update Task' : 'Add Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 