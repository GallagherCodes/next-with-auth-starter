"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


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
import { passwordResetRequestSchema } from "@/zod/schemas";

export function GetNewPasswordForm() {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof passwordResetRequestSchema>>({
    resolver: zodResolver(passwordResetRequestSchema),
    defaultValues: {
      email: ""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof passwordResetRequestSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const res = await fetch("/api/password-reset/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( values ),
    });

    const data = await res.json();
    console.log(data.message)

  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormDescription>
                Email:
              </FormDescription>
              <FormControl>
                <Input placeholder="email" {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
