// components/UserCard.tsx
"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

// Utility function to get the first letter of a name
const getInitials = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "U"; // Default to 'U' if no name is provided
};

interface UserCardProps {
    user: {
        id?: string | null;
        name?: string | null;
        email?: string | null;
        image?: string | null;
    } | null;
}

export function NavUserCard({ user }: UserCardProps) {
    return (
        <div className="flex items-center space-x-4">
            <Link href={'/user'} passHref>

                <Card className="flex items-center space-x-2 p-1">
                    {/* If user has an image, show the avatar */}
                    {user?.image ? (
                        <img
                            src={user.image}
                            alt="User Avatar"
                            className="w-8 h-8 rounded-full"
                        />
                    ) : (
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white text-lg font-semibold">
                            {getInitials(user?.name || "Guest")}
                        </div>
                    )}

                    <CardHeader className="p-0">
                        <CardTitle className="text-sm">{user?.name || "Guest"}</CardTitle>
                        <CardDescription className="text-xs text-gray-500">{user?.email || "guest@example.com"}</CardDescription>
                    </CardHeader>
                </Card>
            </Link>
        </div>
    );
}