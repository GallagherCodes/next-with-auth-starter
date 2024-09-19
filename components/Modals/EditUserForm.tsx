"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { userInfoSchema } from "@/zod/schemas";
import { useSession } from "next-auth/react"; // Import useSession for session management
import { useUser } from "@/context/UserContext";

interface EditUserFormProps {
  defaultValues: {
    name: string;
    email: string;
  };
  onClose: () => void;
}

export function EditUserForm({ defaultValues, onClose }: EditUserFormProps) {
  const { updateUser } = useUser();

  const { data: session, update: updateSession } = useSession(); // Destructure session and update from useSession
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(userInfoSchema), // Validate against Zod schema
    defaultValues,
  });

  const { reset } = form;

  const onSubmit = async (values: z.infer<typeof userInfoSchema>) => {
    setIsSubmitting(true);

    // Call your API to update the user info
    const res = await fetch("/api/user/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();
    console.log(data)

    if (res.ok) {
      // After the API call, refresh the session data
      updateUser(data.user);

      onClose(); // Close the modal after submission
    } else {
      console.error("Error updating user:", data.error);
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name">Name</label>
        <Input
          {...form.register("name")}
          placeholder="Enter your name"
          id="name"
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <Input
          {...form.register("email")}
          type="email"
          placeholder="Enter your email"
          id="email"
          className="w-full"
        />
      </div>

      <div className="mt-4">
        <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white">
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
