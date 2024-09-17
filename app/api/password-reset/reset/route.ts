import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, token, newPassword } = await req.json();

    // Retrieve the most recent verification token (sorted by expires field in descending order)
    const storedToken = await prisma.verificationToken.findFirst({
      where: {
        identifier: email,
      },
      orderBy: {
        expires: 'desc',  // Order by 'expires' to get the latest token
      },
    });

    // Check if token exists and is not expired
    if (!storedToken || storedToken.expires < new Date()) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    // Compare the provided token with the stored hashed token
    const isValidToken = await bcrypt.compare(token, storedToken.token);
    if (!isValidToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    // Delete the token after successful password reset
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: email,
          token: storedToken.token,  // Use the stored (hashed) token
        },
      },
    });

    return NextResponse.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error during password reset:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
