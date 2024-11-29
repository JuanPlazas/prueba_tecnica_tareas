export const TareasTypeDefs = `
  type Query {
    getTareas: [Tarea]!
  }

  type Query {
    createTarea(input: TareaInput!): Tarea
  }

  type Query {
    getTarea(input: TareaIdInput!): Tarea
  }

  type Query {
    updateTarea(input: TareaInput!): Tarea
  }

  type Query {
    deleteTarea(input: TareaIdInput!): Tarea
  }

  input TareaIdInput {
    id: Int
  }

  input TareaInput {
    id: Int
    nombre: String
    descripcion: String
    estado: String
  }

  type Tarea {
    id: Int
    nombre: String
    descripcion: String
    estado: String
  }
`