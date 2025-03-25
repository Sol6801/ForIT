'use client';

import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import SearchBar from './components/SearchBar';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async (query = '') => {
    try {
      const response = await fetch(`/api/tasks?search=${encodeURIComponent(query)}`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const createTask = async (taskData) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData)
      });

      if (response.ok) {
        const newTask = await response.json();
        // Refresh tasks with current search query
        fetchTasks(searchQuery);
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const updateTask = async (taskId, updatedTaskData) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTaskData)
      });

      if (response.ok) {
        const updatedTask = await response.json();
        // Refresh tasks with current search query
        fetchTasks(searchQuery);
        setEditingTask(null);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Refresh tasks with current search query
        fetchTasks(searchQuery);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchTasks(query);
  };

  return (
    <main className="min-h-screen bg-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <section className="max-w-xl mx-auto space-y-8">
        <header>
          <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-6">
            Gestor de Tareas
          </h1>
        </header>


        <article className="bg-white shadow-md rounded-xl p-6 border border-purple-100">
          <TaskForm 
            onCreateTask={createTask}
            onUpdateTask={updateTask}
            editingTask={editingTask}
          />
        </article>

        <SearchBar onSearch={handleSearch} />
        <section>
          <TaskList 
            tasks={tasks} 
            onEditTask={setEditingTask}
            onDeleteTask={deleteTask}
          />
        </section>
      </section>
    </main>
  );
}