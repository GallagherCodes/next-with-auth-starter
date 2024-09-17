import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  // Check if the user's email is already verified
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  if (user.emailVerified) {
    return NextResponse.json({ message: "Email is already verified!" }, { status: 200 });
  }

  // Retrieve the stored verification token
  const storedToken = await prisma.verificationToken.findFirst({
    where: { identifier: email },
    orderBy: { expires: 'desc' },  // Retrieve the latest token
  });

  // Check if token exists and is not expired
  if (!storedToken || storedToken.expires < new Date()) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
  }

  // Compare the token
  const isValidToken = await bcrypt.compare(token, storedToken.token);
  if (!isValidToken) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  // Mark the email as verified
  await prisma.user.update({
    where: { email },
    data: { emailVerified: new Date() },
  });

  // Delete the token after verification
  await prisma.verificationToken.delete({
    where: { identifier_token: { identifier: email, token: storedToken.token } },
  });

  return NextResponse.json({ message: "Email verified successfully!" });
}
