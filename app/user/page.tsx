"use client";

import { UserProfileCard } from "@/components/Cards/UserProfileCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useUser } from "@/context/UserContext";

export default function UserPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const {user} = useUser()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Show loading while session is being fetched
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // If session exists, display user data
  if (session) {
    return (
        <UserProfileCard user={user}/>
    );
  }

  return null;
}
