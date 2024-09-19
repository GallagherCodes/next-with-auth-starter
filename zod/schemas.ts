// schemas.ts
import { z } from "zod";

// User registration schema
export const registrationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

// User login schema
export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

// Password reset request schema
export const passwordResetRequestSchema = z.object({
  email: z.string().email("Invalid email format"),
});

// Password reset schema
export const passwordResetSchema = z.object({
  email: z.string().email("Invalid email format"),
  token: z.string().min(1, "Token is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters long"),
});

// Email verification schema
export const verifyEmailSchema = z.object({
  email: z.string().email("Invalid email format"),
  token: z.string().min(1, "Token is required"),
});


export const userInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
});

