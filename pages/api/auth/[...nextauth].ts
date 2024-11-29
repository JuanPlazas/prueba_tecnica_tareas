import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from '@/lib/db'
import jwt from "jsonwebtoken"

const finUserByEmail = async (email: string) => {
  const userFound = await db.user.findUnique({
    where: {
      email: email
    }
  })

  return userFound
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      //@ts-ignore
      async authorize(credentials, req) {
        const userFound = await finUserByEmail(credentials.email)

        if (!userFound) throw new Error('Usuario no registrado')

        if (credentials.password != userFound.password) throw new Error('Contraseña incorrecta')
        const { password: _, ...user } = userFound;
        return user
      },
    }
    )
  ],
  callbacks: {
    async signIn(params) {

      let userDb = await finUserByEmail(params.user.email)

      const token = Math.random().toString(36).substring(7)
      const tokenjwt = jwt.sign({
        token,
        id_user: userDb.id
      }, process.env.SECRET_KEY);

      const LoginFound = await db.login.findUnique({
        where: {
          id_user: userDb.id
        }
      })

      if (!LoginFound) {
        await db.login.create({
          data: {
            id_user: userDb.id,
            token: tokenjwt,
          },
        })
      } else {
        await db.login.update({
          where: {
            id_user: userDb.id
          },
          data: {
            token: tokenjwt,
          }
        })
      }

      params.user.id_rol = userDb.id_rol
      params.user.id = userDb.id
      params.user.name = userDb.name
      params.user.authorization = tokenjwt
      return true; // Devuelve true para permitir que el proceso de inicio de sesión continúe
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});