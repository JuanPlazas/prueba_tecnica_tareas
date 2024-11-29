export const createUserQuery = (dataForm) => `
  query createUserQuery{
    createUser(input: {
      email: "${dataForm.email}"
      name: "${dataForm.nombre}"
      password: "${dataForm.password}"
      provider: "${dataForm.provider}"
      id_rol: 3
    }) {
      id
    }
  }
`;