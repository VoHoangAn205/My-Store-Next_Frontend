import { NextRequest, NextResponse } from "next/server";

export const proxy = (req: NextRequest) => {
    if (!req.cookies.has('jwt')) {
        const url = new URL('/login', req.url);
        url.searchParams.set("from", req.nextUrl.pathname);
        return NextResponse.redirect(url)
    }
    return NextResponse.next()
}

export const config = { matcher: ["/manager/:path*", "/account/:path*"]}