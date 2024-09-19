"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { passwordResetSchema } from "@/zod/schemas";

export function SetNewPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();  // Use useSearchParams to get query parameters
  const token = searchParams.get("token");  // Get the 'token' from the URL
  const email = searchParams.get("email");  // Get the 'email' from the URL

  // 1. Define your form with zodResolver.
  const form = useForm<z.infer<typeof passwordResetSchema>>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      token: "",
      email: "",
      newPassword: "",
    },
  });

  // 2. Update the form default values based on URL search params using useEffect.
  useEffect(() => {
    if (token && email) {
      form.reset({
        token,
        email,
        newPassword: "", // Reset the new password field as empty
      });
    }
  }, [token, email, form]);

  // 3. Define a submit handler.
  async function onSubmit(values: z.infer<typeof passwordResetSchema>) {
    console.log(values);
    const res = await fetch("/api/password-reset/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const data = await res.json();
    console.log(data.message);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormLabel> Password Reset</FormLabel>

        {/* Hidden Token Field */}
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} type="hidden" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Hidden Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} type="hidden" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* New Password Field */}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="New password" {...field} type="password" />
              </FormControl>
              <FormDescription>
                Please enter your new password.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
