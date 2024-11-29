export const getTareasQuery = `
  query getTareasQuery {
    getTareas {
      id
      nombre
      descripcion
      estado
    } 
  }
`;

export const createTareaQuery = (dataForm) => `
  query createTareasQuery {
    createTarea(input: {
      nombre: "${dataForm.nombre}"
      descripcion: "${dataForm.descripcion}"
      estado: "${dataForm.estado}"
    }) {
      id
    }
  }
`;

export const deleteTareaQuery = (idTarea) => `
  query deleteTareasQuery {
    deleteTarea(input: {
      id: ${idTarea}
    }) {
      id
    }
  }
`;

export const updateTareaQuery = (dataForm) => `
  query updateTareasQuery {
    updateTarea(input: {
      id: ${dataForm.id}
      nombre: "${dataForm.nombre}"
      descripcion: "${dataForm.descripcion}"
      estado: "${dataForm.estado}"
    }) {
      id
    }
  }
`;
