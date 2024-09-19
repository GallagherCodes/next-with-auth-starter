"use client";

import { useSession } from "next-auth/react";
import { Navbar } from "@/components/NavBar";

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div>
      <h1>Welcome, {session.user?.name}</h1>
      <p>Your email: {session.user?.email}</p>
      <p>Your user ID: {session.user?.id}</p>
    </div>
  );
}