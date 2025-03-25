"use client";

export default function TaskList({ tasks, onEditTask, onDeleteTask }) {
  return (
    <section className="mt-6">
      {tasks.length === 0 ? (
        <p className="text-center text-purple-500 italic">No hay tareas</p>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center hover:shadow-lg transition duration-300 border border-purple-100"
            >
              <article className="flex-grow mr-4">
                <h2
                  className={`font-semibold ${
                    task.completed
                      ? "line-through text-purple-400"
                      : "text-purple-800"
                  }`}
                >
                  {task.title}
                </h2>
                {task.description && (
                  <p className="text-sm text-purple-600 mt-1">
                    {task.description}
                  </p>
                )}
              </article>
              <footer className="flex space-x-2">
                <button
                  aria-label="Editar tarea"
                  onClick={() => onEditTask(task)}
                  className="text-purple-500 hover:text-purple-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-300 rounded-full p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button
                  aria-label="Eliminar tarea"
                  onClick={() => onDeleteTask(task.id)}
                  className="text-purple-500 hover:text-purple-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-300 rounded-full p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </footer>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
