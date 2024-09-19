import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const prisma = new PrismaClient();

// Zod schema to validate the request body
const registrationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate the request body using the Zod schema
    const result = registrationSchema.safeParse(body);

    if (!result.success) {
      // Return validation errors if validation fails
      return NextResponse.json({ error: result.error.errors.map(err => err.message) }, { status: 400 });
    }

    const { name, email, password } = result.data;

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    console.log(user)

    // Generate a verification token
    const token = uuidv4();
    const hashedToken = await bcrypt.hash(token, 10);

    // Set token expiry (e.g., 24 hours)
    const expires = new Date();
    expires.setHours(expires.getHours() + 24);

    // Store the verification token
    await prisma.verificationToken.create({
      data: {
        identifier: email,  // Use the email as the identifier
        token: hashedToken,  // Store the hashed token
        expires,
      },
    });

    // Send verification email (for now, we just log the link)
    const verificationLink = `http://localhost:3000/verify-email?token=${token}&email=${email}`;
    console.log(`Email verification link: ${verificationLink}`);

    return NextResponse.json({ message: "Registration successful! Please check your email for a verification link." });
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
