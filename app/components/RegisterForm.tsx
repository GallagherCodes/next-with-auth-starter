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
import { registrationSchema } from "@/zod/schemas"


export function RegisterForm() {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof registrationSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (data.error) {
      console.log(data.error);
    } 

    const loginResult = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password
    });

    if (loginResult?.error) {
      console.log(loginResult.error);
    } else {
      router.push("/"); // Redirect to homepage after successful login
    }

  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormDescription>
                Name:
              </FormDescription>
              <FormControl>
                <Input placeholder="name" {...field} type="name" />
              </FormControl>
              <FormMessage />
            </FormItem>

          )}
        />
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormDescription>
                Password:
              </FormDescription>
              <FormControl>
                <Input placeholder="password" {...field} type="password" />
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
