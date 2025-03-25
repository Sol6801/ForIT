import { NextResponse } from 'next/server';
import { getTasks, createTask } from '@/lib/tasks';

// Endpoint para obtener todas las tareas
export async function GET(request) {
  try {
    // Obtener los parámetros de búsqueda de la URL
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get('search') || '';

    // Obtener todas las tareas
    let tasks = getTasks();

    // Filtrar tareas si hay un término de búsqueda
    if (searchQuery) {
      tasks = tasks.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener las tareas' }, 
      { status: 500 }
    );
  }
}

// Endpoint para crear una nueva tarea
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validar datos de entrada
    if (!body.title) {
      return NextResponse.json(
        { error: 'El título de la tarea es obligatorio' }, 
        { status: 400 }
      );
    }

    

    // Crear nueva tarea
    const newTask = createTask(body);

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear la tarea' }, 
      { status: 500 }
    );
  }
}