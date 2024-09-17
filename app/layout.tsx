
// Import the SessionProvider from next-auth/react
import SessionProviderWrapper from "./components/SessionProviderWrapper";

// This should wrap your entire app component tree
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}