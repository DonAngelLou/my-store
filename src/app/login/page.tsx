// app/login/page.tsx
'use client';

import React, { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

const Login = () => {
  const { login } = useUser();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // Error state

  const handleLogin = async () => {
    setError(null); // Clear error before login attempt
    try {
      await login(email, password);
      router.push('/profile'); // Redirect to profile after successful login
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error */}
        <Button onClick={handleLogin} className="w-full bg-blue-600 text-white">
          Login
        </Button>
        <p className="mt-4 text-center text-blue-600">
          Don&apos;t have an account? <a href="/signup" className="underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
