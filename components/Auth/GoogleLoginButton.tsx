"use client"


import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button"

export function GoogleLoginButton() {
    const handleGoogleSignIn = () => {
        signIn("google", { callbackUrl: "/" }); // Redirect to home after Google login
      };
  return (
      <Button onClick={handleGoogleSignIn}>Sign In With Google</Button>
  )
}
