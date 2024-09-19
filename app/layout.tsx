import './globals.css'


// Import the SessionProvider from next-auth/react
import SessionProviderWrapper from "./components/SessionProviderWrapper";
import { UserProvider } from '@/context/UserContext';
import { Navbar } from '@/components/Nav/NavBar';
// This should wrap your entire app component tree
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <body>
        <SessionProviderWrapper>
          <UserProvider>
            <Navbar />
            {children}
          </UserProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}