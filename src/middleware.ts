import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { prisma } from "./server/db";
import checkHasAccessByPathname from "./utils/checkHasAccessByPathname";

export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = await getToken({ req, secret: process.env.SECRET });

    if (req.nextauth.token && pathname.startsWith("/admin")) {
      if (token?.isAdmin) {
        return NextResponse.next();
      }
      return NextResponse.rewrite(new URL("/404", req.url));
    }

    if (req.nextauth.token && pathname.endsWith("/setting") && pathname.startsWith("/my-clubs/")) {
      const result = checkHasAccessByPathname(token?.owner!, pathname);
      //   if (result) {
      //     return NextResponse.next();
      //   }
      //   return NextResponse.rewrite(new URL("/404", req.url));
      return NextResponse.next();
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (token) {
          return true;
        }
        return false;
      },
    },
  }
);

export const config = {
  matcher: ["/club/add", "/my-clubs/:path*", "/my-account", "/club/edit/:path*", "/admin/:path*"],
};
