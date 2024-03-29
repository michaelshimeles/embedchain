import { authMiddleware } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { getAuth, redirectToSignIn } from "@clerk/nextjs/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/auth/webhook",
    "/api/template",
    "/api/embeds",
    "/api/payments/webhook",
    "/api/perma",
    "/api/storage/read"
  ],
  apiRoutes:[
    "/api/storage/read"
  ]
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
