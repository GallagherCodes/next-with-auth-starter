"use client";
import { SetNewPasswordForm } from "../../components/Auth/SetNewPasswordForm";
import { GetNewPasswordForm } from "../../components/Auth/GetNewPasswordForm";
import { LoginForm } from "../../components/Auth/LoginForm";
import { RegisterForm } from "../../components/Auth/RegisterForm";
import { useSession } from "next-auth/react";

export default function Test() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div>
      <GetNewPasswordForm />
      <SetNewPasswordForm />
    </div>
  );
}