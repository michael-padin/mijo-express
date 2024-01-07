import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "./lib/jwt";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    if (req.nextUrl.pathname.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.rewrite(new URL("/not-found", req.url));
    }

    if (
      req.nextUrl.pathname.startsWith("/provider") &&
      token?.role !== "provider" &&
      token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/not-found", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Supports both a single string value or an array of matchers
export const config = {
  matcher: ["/admin/:path*", "/customer/:path*", "/provider/:path*"],
};
