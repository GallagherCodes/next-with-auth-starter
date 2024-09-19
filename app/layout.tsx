import './globals.css'


// Import the SessionProvider from next-auth/react
import SessionProviderWrapper from "./components/SessionProviderWrapper";
import { Navbar } from '@/components/NavBar';
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
          <Navbar />
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}