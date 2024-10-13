// app/signup/page.tsx
'use client';

import React, { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const { signup } = useUser(); 
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // Error state
  const [loading, setLoading] = useState(false); // Loading state

  const handleSignup = async () => {
    setError(null); // Clear error before signup attempt
    setLoading(true); // Start loading
    try {
      await signup(email, password); 
      setLoading(false);
      router.push('/profile'); // Redirect to profile after successful signup
    } catch (error) {
      setLoading(false);
      setError(error instanceof Error ? error.message : 'Error during signup. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
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
        <Button
          onClick={handleSignup}
          className="w-full bg-blue-600 text-white"
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </Button>
        <p className="mt-4 text-center text-blue-600">
          Already have an account? <a href="/login" className="underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
