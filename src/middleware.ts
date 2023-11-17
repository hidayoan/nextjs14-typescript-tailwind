
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    const restrictedRoutes = ['/login', '/register'];

    // Check if the user is already logged in and trying to access a restricted route
    if (token) {
      if (restrictedRoutes.includes(pathname)) {
        const url = req.nextUrl.clone();
        url.pathname = '/'; // Redirect to home page
        return NextResponse.redirect(url);
      }
    } else {
      if (!restrictedRoutes.includes(req.nextUrl.pathname)) {
        const url = req.nextUrl.clone();
        url.pathname = '/login'; // Redirect to login page
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.log(error);

  }
}

export const config = { matcher: ["/", '/login', '/register', '/api/auth/chat'] }