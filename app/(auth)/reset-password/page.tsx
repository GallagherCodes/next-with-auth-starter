import { SetNewPasswordForm } from "@/app/components/SetNewPasswordForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function PasswordReset() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-4 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle>Enter Your Email</CardTitle>
        </CardHeader>
        <CardContent>
          <SetNewPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
