import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const prisma = new PrismaClient();

// Zod schema for email validation
const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email format"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate the request body using the Zod schema
    const result = resetPasswordSchema.safeParse(body);

    if (!result.success) {
      // Return validation errors if validation fails
      return NextResponse.json({ error: result.error.errors.map(err => err.message) }, { status: 400 });
    }

    const { email } = result.data;

    // Check if the user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Generate a token
    const token = uuidv4();
    const hashedToken = await bcrypt.hash(token, 10);

    // Set token expiry (1 hour)
    const expires = new Date();
    expires.setHours(expires.getHours() + 1);

    // Store the token in the database
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: hashedToken,
        expires,
      },
    });

    // Send reset link (for now, we just log it)
    const resetLink = `http://localhost:3000/reset-password?token=${token}&email=${email}`;
    console.log(`Password reset link: ${resetLink}`);

    return NextResponse.json({ message: "Password reset link sent" });
  } catch (error) {
    console.error("Error sending password reset link:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
