// app/api/user/update/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// Define Zod schema to validate the user update input
const updateUserSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address"),
});

export async function POST(req: Request) {
  try {
    // Get session information
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Validate the request body using Zod
    const result = updateUserSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.errors }, { status: 400 });
    }

    const { name, email } = result.data;

    // Validate that the email being updated is the same as the session email
    if (email !== session.user.email) {
      return NextResponse.json({ error: "You can only update your own account" }, { status: 403 });
    }

    // Update the user's data
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { name, email },
    });

    // Update the session with the new user data
    const updatedSession = {
      ...session,
      user: {
        ...session.user,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    };

    return NextResponse.json({
      message: "User updated successfully",
      user: updatedUser,
      session: updatedSession,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
