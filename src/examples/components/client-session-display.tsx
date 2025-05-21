"use client";

import type { Session } from "next-auth";

interface ClientSessionDisplayProps {
  initialSession: Session | null;
}

export default function ClientSessionDisplay({
  initialSession,
}: ClientSessionDisplayProps) {
  const session = initialSession;

  if (!session?.user) {
    return (
      <p>No active session found on client. (Rendered from Client Component)</p>
    );
  }

  return (
    <div>
      <h2>Client Component Displaying Session</h2>
      <p>User: {session.user.name ?? "User"}</p>
      <p>Email: {session.user.email}</p>
      <p>ID: {session.user.id}</p>
    </div>
  );
}
