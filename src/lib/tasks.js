import { v4 as uuidv4 } from "uuid";

let tasks = [];

export const getTasks = () => tasks;

export const createTask = (taskData) => {
  const newTask = {
    id: uuidv4(),
    title: taskData.title,
    description: taskData.description || "",
    completed: taskData.completed || false,
    createdAt: new Date(),
  };
  tasks.push(newTask);

  console.log("Array de tareas antes de la operación:", tasks);
  return newTask;
};

export const updateTask = (taskId, taskData) => {
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  if (taskIndex === -1) return null;

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...taskData,
    id: taskId,
  };

  console.log("Array de tareas antes de la operación:", tasks);
  return tasks[taskIndex];
};

export const deleteTask = (taskId) => {
  const initialLength = tasks.length;
  tasks = tasks.filter((task) => task.id !== taskId);
  return tasks.length !== initialLength;
};
