"use client";

import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { NavUserCard } from "./NavUserCard";
import { useUser } from "@/context/UserContext";

export function Navbar() {
    const { data: session } = useSession(); // Get session data to check if user is logged in
    const {user} = useUser()
 
    return (
        <div className="flex justify-between items-center p-4 bg-white shadow-md">
            {/* Left aligned links */}
            <NavigationMenu>
                <NavigationMenuList className="flex space-x-8">
                    {/* Home Link */}
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/" className="text-gray-700 hover:text-gray-900 font-medium">
                                Home
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    {/* About Link */}
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/about" className="text-gray-700 hover:text-gray-900 font-medium">
                                About
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>

                    {/* Contact Link */}
                    <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                            <Link href="/contact" className="text-gray-700 hover:text-gray-900 font-medium">
                                Contact
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            {/* Right aligned user info and Logout/Register Buttons */}
            <div className="flex items-center space-x-4">
                {session ? (
                    <>
                    <NavUserCard user={user} />
                        
                        {/* Logout Button */}
                        <Button onClick={() => signOut()} className="bg-red-600 text-white hover:bg-red-700">
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        {/* Register Button */}
                        <Button asChild className="bg-green-600 text-white hover:bg-green-700">
                            <Link href="/register">Register</Link>
                        </Button>

                        {/* Login Button */}
                        <Button asChild className="bg-blue-600 text-white hover:bg-blue-700">
                            <Link href="/login">Login</Link>
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}
