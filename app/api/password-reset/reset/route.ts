import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// Zod schema for password reset validation
const passwordResetSchema = z.object({
  email: z.string().email("Invalid email format"),
  token: z.string().min(1, "Token is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters long"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate the request body using the Zod schema
    const result = passwordResetSchema.safeParse(body);

    if (!result.success) {
      // Return validation errors if validation fails
      return NextResponse.json({ error: result.error.errors.map(err => err.message) }, { status: 400 });
    }

    const { email, token, newPassword } = result.data;

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
