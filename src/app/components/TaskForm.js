'use client';

import { useState, useEffect } from 'react';

export default function TaskForm({ onCreateTask, onUpdateTask, editingTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || '');
      setCompleted(editingTask.completed || false);
    } else {
      setTitle('');
      setDescription('');
      setCompleted(false);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      completed
    };

    if (editingTask) {
      onUpdateTask(editingTask.id, taskData);
    } else {
      onCreateTask(taskData);
    }

    setTitle('');
    setDescription('');
    setCompleted(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <fieldset>
        <label htmlFor="title" className="sr-only">Título de la tarea</label>
        <input 
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título de la tarea"
          required
          className="text-purple-900 w-full px-4 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
        />
      </fieldset>

      <fieldset>
        <label htmlFor="description" className="sr-only">Descripción (opcional)</label>
        <textarea 
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción (opcional)"
          className="text-purple-900 w-full px-4 py-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 resize-y"
          rows="3"
        />
      </fieldset>

      <fieldset className="flex items-center">
        <input 
          type="checkbox"
          id="completed"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-purple-300 rounded"
        />
        <label 
          htmlFor="completed" 
          className="ml-2 block text-sm text-purple-900"
        >
          Completada
        </label>
      </fieldset>

      <footer>
        <button 
          type="submit" 
          className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        >
          {editingTask ? 'Actualizar Tarea' : 'Crear Tarea'}
        </button>
      </footer>
    </form>
  );
}