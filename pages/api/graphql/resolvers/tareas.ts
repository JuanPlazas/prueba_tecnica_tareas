import db from "@/lib/db"

const getTareas = async () => {
  const tareas = await db.tareas.findMany()

  return tareas
}

const createTarea = async (_: any, { input }: any) => {
  const newTarea = await db.tareas.create({
    data: input,
  })
  return newTarea
}

const getTarea = async (_: any, { input }: any) => {
  const tarea = await db.tareas.findUnique({
    where: {
      id: input.id
    },
  })

  return tarea
}

const updateTarea = async (_: any, { input }: any) => {
  const updatedTarea = await db.tareas.update({
    where: {
      id: input.id
    },
    data: input,
  })
  return updatedTarea
}

const deleteTarea = async (_: any, { input }: any) => {
  const deletedTarea = await db.tareas.delete({
    where: {
      id: input.id
    }
  })

  return deletedTarea
}

export default {
  getTareas,
  createTarea,
  getTarea,
  updateTarea,
  deleteTarea,
}