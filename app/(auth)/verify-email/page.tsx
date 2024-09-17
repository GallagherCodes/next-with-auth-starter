"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  useEffect(() => {
    if (!email || !token) return;  // Prevent unnecessary requests if query parameters are missing

    const verifyEmail = async () => {
      try {
        const res = await fetch(`/api/verify-email?email=${email}&token=${token}`);
        const data = await res.json();
        setMessage(data.message || data.error);
      } catch (error) {
        setMessage("Something went wrong while verifying your email.");
      } finally {
        setLoading(false); // Stop loading once the verification is complete
      }
    };

    verifyEmail();
  }, [email, token]);  // Trigger the effect only when email and token are present

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while the verification is in progress
  }

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{message}</p>
    </div>
  );
}
