import { NextResponse } from "next/server";
import { getTasks, createTask } from "@/lib/tasks";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchQuery = searchParams.get("search") || "";

    let tasks = getTasks();
    if (searchQuery) {
      tasks = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (task.description &&
            task.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener las tareas" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.title) {
      return NextResponse.json(
        { error: "El título de la tarea es obligatorio" },
        { status: 400 }
      );
    }

    const newTask = createTask(body);

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear la tarea" },
      { status: 500 }
    );
  }
}
