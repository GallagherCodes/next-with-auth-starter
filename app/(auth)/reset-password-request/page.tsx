import { GetNewPasswordForm } from "@/app/components/GetNewPasswordForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PasswordResetRequest() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-4 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle>Enter Your Email</CardTitle>
        </CardHeader>
        <CardContent>
          <GetNewPasswordForm />

        </CardContent>
      </Card>
    </div>
  );
}
