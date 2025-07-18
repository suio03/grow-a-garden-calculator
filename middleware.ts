import createIntlMiddleware from "next-intl/middleware";
import type { NextRequest } from 'next/server';
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

export default function middleware(request: NextRequest) {
    // Get response from the intl middleware
    const response = intlMiddleware(request);
    
    // Set the pathname cookie
    if (response) {
        response.cookies.set('x-pathname', request.nextUrl.pathname);
    }
    
    return response;
}
export const config = {
    matcher: [
        // Skip all internal paths (_next) and static files with extensions (e.g. .xml, .txt, .ico)
        '/((?!api|_next/static|_next/image|.*\\..*).*)',
        
        // Match all paths that have a locale prefix
        '/(en|zh|jp|ko|es|fr|de|it|pt|ru|ar|hi|nl)/:path*'
    ]
};
