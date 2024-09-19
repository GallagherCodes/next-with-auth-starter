import { GoogleLoginButton } from "@/app/components/GoogleLoginButton";
import { LoginForm } from "@/app/components/LoginForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-4 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle>Log In</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <div className="mt-4">
            <GoogleLoginButton />
          </div>
          <div className="mt-4">
            <Button>
              <Link href="/reset-password-request">Forgot Your Password?</Link>
              </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

