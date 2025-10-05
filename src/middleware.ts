import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicpath = path === '/login' || path === '/signup' || path === '/verifyemail'
    const token = request.cookies.get("token")?.value || null;

    if(isPublicpath && token){
        return NextResponse.redirect(new URL('/profile', request.nextUrl))
    }

    if(!isPublicpath && !token){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
              
    }
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/profile',
        '/signup',
        '/verifyemail'
    ]
};