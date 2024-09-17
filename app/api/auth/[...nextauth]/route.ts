import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET ?? '',

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? (() => { throw new Error("Missing GOOGLE_CLIENT_ID"); })(), // Ensure clientId is a string
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? (() => { throw new Error("Missing GOOGLE_CLIENT_SECRET"); })(), // Ensure clientSecret is a string
          }),
        // Add more providers here
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'database',
    },
    callbacks: {
        async session({ session, user }) {
            if (session.user) {
              session.user.id = user.id;  // Safely access session.user.id
            }
            return session;
          },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
