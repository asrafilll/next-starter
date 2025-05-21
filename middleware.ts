// middleware.ts
export { auth as middleware } from "@/auth";

// Optionally, define which routes are protected
export const config = {
  matcher: [
    "/dashboard/:path*", // Protect all routes under /dashboard
    "/profile", // Protect the /profile route
    // Add other routes you want to protect
    // Example to protect all routes except API, NextAuth, static files, and root:
    // "/((?!api|_next/static|_next/image|favicon.ico|auth|.*\..*).*)",
  ],
};
