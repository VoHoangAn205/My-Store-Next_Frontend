import { NextRequest, NextResponse } from "next/server";

const middleware = (req: NextRequest) => {
    if (!req.cookies.has('jwt')) {
        const url = new URL('/login', req.url);
        url.searchParams.set("from", req.nextUrl.pathname);
        return NextResponse.redirect(url)
    }
    return NextResponse.next()
}

export default middleware;