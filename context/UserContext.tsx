"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';

interface User {
  name: string;
  email: string;
  image: string;
}

interface UserContextType {
  user: User | null;
  updateUser: (newInfo: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (session && session.user) {
      setUser({
        name: session.user.name || '',
        email: session.user.email || '',
        image: session.user.image || ''
      });
    }
  }, [session]);

  const updateUser = (newInfo: Partial<User>) => {
    setUser((prevUser) => (prevUser ? { ...prevUser, ...newInfo } : null));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Helper hook to access the context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

