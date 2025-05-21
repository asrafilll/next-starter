import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";
import { auth } from "@/auth"; // Import your auth function
import type { Session } from "next-auth"; // Import Session type

/**
 * Defines an interface for the session user, focusing on the ID.
 * Adjust this based on what user data you expect/need in actions.
 */
export interface SessionUser extends NonNullable<Session["user"]> {
  id: string;
  // name, email, image are already part of Session['user']
  // role?: string; // Example: if you add a role to your session user
}

/**
 * Custom error class for action-specific errors.
 */
export class ActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ActionError";
  }
}

// Base client with a default server error handler.
const actionClient = createSafeActionClient({
  // You can define a metadata schema for all actions using this client.
  // defineMetadataSchema() {
  //   return z.object({
  //     actionName: z.string(),
  //   });
  // },
  handleServerError(e) {
    // Log the error for server-side observability
    console.error("Unhandled action error:", e.name, e.message, e.stack);

    if (e instanceof ActionError) {
      return e.message; // Return specific message for ActionError
    }

    // For other errors, return a generic message
    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});

/**
 * Public action client (no authentication check).
 */
export const publicAction = actionClient;

/**
 * Protected action client (requires authentication).
 * This client uses middleware to check for an authenticated user.
 */
export const protectedAction = actionClient.use(async ({ next }) => {
  const session = await auth();
  const user = session?.user as SessionUser | undefined; // Cast to ensure 'id' is expected

  if (!user?.id) {
    throw new ActionError("User not authenticated. Please sign in.");
  }

  // Pass the user object to the context of the action
  return next({ ctx: { user } });
});

// Example of further extending the protected client for specific roles (if needed)
// export const adminAction = protectedAction.use(async ({ ctx, next }) => {
//   if (ctx.user.role !== 'admin') {
//     throw new ActionError("Admin privileges required.");
//   }
//   return next({ ctx }); // Pass the existing context along
// });
