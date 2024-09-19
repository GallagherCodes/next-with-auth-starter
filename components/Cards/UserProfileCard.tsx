"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Modal } from "../Modals/BaseModal"; // Assuming you have the Modal component
import { EditUserForm } from "../Modals/EditUserForm"; // Import the EditUserForm component

interface UserCardProps {
  user: {
      id?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
  } | null;
}

export function UserProfileCard({ user }: UserCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card className="w-full max-w-md p-4 shadow-lg">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>Edit or update your information</CardDescription>
        </CardHeader>

        <div className="mt-4">
          <p><strong>Name:</strong> {user?.name || "Not provided"}</p>
          <p><strong>Email:</strong> {user?.email || "Not provided"}</p>
          {user?.image && (
            <img
              src={user.image}
              alt="User Avatar"
              className="mt-4 w-24 h-24 rounded-full"
            />
          )}
        </div>

        <div className="mt-4">
          <Button onClick={handleModalOpen} className="bg-blue-600 text-white">
            Edit Profile
          </Button>
        </div>
      </Card>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose} title="Edit Profile">
          {/* Use the reusable form component */}
          <EditUserForm
            defaultValues={{
              name: user?.name || "",
              email: user?.email || "",
            }}
            onClose={handleModalClose}
          />
        </Modal>
      )}
    </>
  );
}
