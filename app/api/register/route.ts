import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

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
}
