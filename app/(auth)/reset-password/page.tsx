"use client"; // Make sure this is a client component

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PasswordReset() {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();  // Use useSearchParams to get query parameters
  const router = useRouter();  // Still using useRouter for navigation

  const token = searchParams.get("token");  // Get the 'token' from the URL
  const email = searchParams.get("email");  // Get the 'email' from the URL

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/password-reset/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, email, newPassword }),
    });

    const data = await res.json();
    setMessage(data.message || data.error);

    if (!data.error) {
      // Redirect to login after success
      router.push("/login");
    }
  };

  return (
    <div>
      <h1>Reset Your Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
