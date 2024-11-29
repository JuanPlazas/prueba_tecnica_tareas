/** La finalidad de este file es reutilizar la informacion de las paginas para
 *  la navegacion, esta siendo usado en HomePage y el componente Sidebar */

/** info sacada de la tabla de parametrizacion UserRol */
const Admin = { id: 1, rol: "admin" }
const User = { id: 3, rol: "user" }

export const dataPages = [
  {
    title: "Tareas",
    url: "/tareas",
    description: "Sistema de gestion de Tareas",
    userRol: User
  },
  {
    title: "Pagina Administrador",
    url: "/pageAdmin",
    description: "Pagina Administrador",
    userRol: Admin
  },
]