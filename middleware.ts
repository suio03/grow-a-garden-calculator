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
        // Enable a redirect to a matching locale at the root
        "/",

        // Set a cookie to remember the previous locale for
        // all requests that have a locale prefix
        "/(en|zh|jp|ko|es|fr|de|it|pt|ru|ar|hi|nl)/:path*",

        // Enable redirects that add missing locales
        // (e.g. `/pathnames` -> `/en/pathnames`)
        "/((?!en|zh|jp|ko|es|fr|de|it|pt|ru|ar|hi|nl|_next|_vercel|.*\\..*|api/|robots\\.txt|sitemap\\.xml).*)",
    ],
};
