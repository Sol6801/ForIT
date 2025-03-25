import { NextResponse } from "next/server";
import { updateTask, deleteTask } from "@/lib/tasks";

export async function PUT(request, context) {
  try {
    const body = await request.json();
    const { id: taskId } = await context.params;

    const updatedTask = updateTask(taskId, body);

    if (!updatedTask) {
      return NextResponse.json(
        { error: "Tarea no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al actualizar la tarea" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, context) {
  try {
    const { id: taskId } = await context.params;

    const taskDeleted = deleteTask(taskId);

    if (!taskDeleted) {
      return NextResponse.json(
        { error: "Tarea no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Tarea eliminada exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error al eliminar la tarea" },
      { status: 500 }
    );
  }
}
