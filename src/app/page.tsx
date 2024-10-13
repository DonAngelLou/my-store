'use client';

import ProductCard from '../components/ProductCard';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useUser } from '@/context/UserContext'; 
import { Button } from '@/components/ui/button'; 
import { useState } from 'react';

export default function Home() {
  const { user, login, signup, logout } = useUser(); 
  const [error, setError] = useState<string | null>(null); 
  const [isSignup, setIsSignup] = useState<boolean>(false); 
  const [loading, setLoading] = useState(false); 

  const handleLogin = async () => {
    try {
      setError(null);
      setLoading(true);
      await login('user@example.com', 'password'); // Mock login
      setLoading(false);
    } catch {
      setError('Invalid credentials');
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    try {
      setError(null);
      setLoading(true);
      await signup('newuser@example.com', 'newpassword'); // Mock signup
      await login('newuser@example.com', 'newpassword'); // Log in after signup
      setLoading(false);
    } catch {
      setError('Error during signup');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen py-12 overflow-hidden">
        
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/mens-fashion-hero.jpg"
            alt="Men's Apparel"
            fill 
            style={{ objectFit: 'cover', objectPosition: 'top' }} 
            quality={100}
            className="opacity-75"
          />
        </div>

        <div className="absolute inset-0 bg-black opacity-40 z-0" /> 

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10 text-center relative px-4"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white">
            Unleash Your Style
          </h1>
          <p className="text-lg md:text-xl font-light mb-8 max-w-lg mx-auto text-gray-200">
            Explore premium men&apos;s apparel crafted for those who lead with strength and style.
          </p>

          {/* Error message display */}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Conditionally render login/signup buttons if not logged in */}
          {!user ? (
            <div className="flex flex-col items-center space-y-4">
              {!isSignup ? (
                <Button
                  onClick={handleLogin}
                  className="bg-blue-600 text-white py-3 px-6 rounded-full shadow-md"
                  disabled={loading}
                >
                  {loading ? 'Logging In...' : 'Log In'}
                </Button>
              ) : (
                <Button
                  onClick={handleSignup}
                  className="bg-gray-900 text-white py-3 px-6 rounded-full shadow-md"
                  disabled={loading}
                >
                  {loading ? 'Signing Up...' : 'Sign Up with Email'}
                </Button>
              )}

              <p
                className="text-gray-400 underline cursor-pointer"
                onClick={() => setIsSignup(!isSignup)}
              >
                {isSignup ? 'Already have an account? Log in' : 'You do not have an account? Sign up'}
              </p>
            </div>
          ) : (
            <>
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Link href="#products">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300">
                    Shop Now
                  </button>
                </Link>
              </motion.div>
              <Button
                onClick={logout}
                className="mt-4 bg-gray-600 hover:bg-gray-700 text-white py-2 px-6 rounded-full shadow-md"
              >
                Log Out
              </Button>
            </>
          )}
        </motion.div>
      </section>

      {/* Featured Products Section */}
      <section id="products" className="py-20 bg-gray-100 text-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Featured Men&apos;s Collection
          </motion.h2>

          <ProductCard /> 

          <div className="flex justify-center mt-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Link href="/cart">
                <button className="bg-black hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300">
                  View Cart
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-black text-gray-400 py-8">
        <div className="container mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <Link href="#">
              <span className="hover:text-white transition">About Us</span>
            </Link>
            <Link href="#">
              <span className="hover:text-white transition">Contact</span>
            </Link>
            <Link href="#">
              <span className="hover:text-white transition">Privacy Policy</span>
            </Link>
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} Men&apos;s Fashion. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
