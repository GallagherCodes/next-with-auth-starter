import { GoogleLoginButton } from "@/components/Auth/GoogleLoginButton";
import { RegisterForm } from "@/components/Auth/RegisterForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() { 
 return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <Card className="w-full max-w-md p-4 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <RegisterForm />
        <div className="mt-4">
          <GoogleLoginButton />
        </div>
      </CardContent>
    </Card>
  </div>
  );
}
