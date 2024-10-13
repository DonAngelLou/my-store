'use client'; // Ensure this is a client-side component

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface User {
  id: number;
  email: string;
  name?: string;      
  createdAt?: string; 
}

interface UserContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check if user is stored in localStorage on mount (client-side)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    const mockUser = { 
      id: 1, 
      email: 'user@example.com', 
      name: 'Juan Dela Cruz',              
      createdAt: '2023-01-01T12:00:00Z' 
    };
    const mockPassword = 'password';

    if (email.toLowerCase() === mockUser.email && password === mockPassword) {
      setUser(mockUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(mockUser)); 
      }
    } else {
      throw new Error('Invalid credentials');
    }
  };

  // Mock signup function
  const signup = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    const newUser = { 
      id: Date.now(), 
      email, 
      name: 'New User',                
      createdAt: new Date().toISOString() 
    };
    setUser(newUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(newUser)); 
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user'); 
    }
  };

  return (
    <UserContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </UserContext.Provider>
  );
};
