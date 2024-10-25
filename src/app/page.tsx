'use client';

import ProductCard from '../components/ProductCard';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'; // Import the useRouter for navigation

export default function Home() {
  const { user, logout } = useUser(); // Removed login and signup as we will navigate to other pages
  const router = useRouter(); // Initialize the router

  const handleNavigateToLogin = () => {
    router.push('/login'); // Redirect to the login page
  };

  const handleNavigateToSignup = () => {
    router.push('/signup'); // Redirect to the signup page
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

          {/* Conditionally render login/signup buttons if not logged in */}
          {!user ? (
            <div className="flex flex-col items-center space-y-4">
              <Button
                onClick={handleNavigateToLogin} // Navigate to the login page
                className="bg-blue-600 text-white py-3 px-6 rounded-full shadow-md"
              >
                Log In
              </Button>

              <Button
                onClick={handleNavigateToSignup} // Navigate to the signup page
                className="bg-gray-900 text-white py-3 px-6 rounded-full shadow-md"
              >
                Sign Up with Email
              </Button>
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
