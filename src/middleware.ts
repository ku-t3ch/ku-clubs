import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { prisma } from "./server/db";

export default withAuth(
  async function middleware(req) {
    if (req.nextauth.token && req.nextUrl.pathname.startsWith("/admin")) {
      const token = await getToken({ req, secret: process.env.SECRET });
      if (token?.isAdmin) {
        return NextResponse.next();
      }
      return NextResponse.rewrite(new URL("/404", req.url));
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
  matcher: ["/club/add", "/my-clubs", "/my-account", "/club/edit/:path*", "/admin/:path*"],
};
