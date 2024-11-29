import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export { default } from "next-auth/middleware"

export async function middleware(req: NextRequest){

  const session = await getToken({req, secret: process.env.NEXTAUTH_SECRET})

  if(!session) {
    const url = req.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect( url )
  }

  return NextResponse.next()
}

export const config = { matcher: ['/', "/tareas", "/pageAdmin"] }