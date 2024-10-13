import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ShoppingCart, User, LogOut, LogIn } from 'lucide-react';

const Header = () => {
  const { cart } = useCart(); 
  const cartCount = cart?.reduce((count, item) => count + item.quantity, 0) || 0; // Total cart items
  const { user, logout } = useUser(); 

  return (
    <header className="flex justify-between items-center p-6 bg-gradient-to-r from-blue-900 to-gray-900 text-white shadow-lg fixed w-full z-50 top-0">
      {/* Logo */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Link href="/">
          <h1 className="text-3xl font-extrabold tracking-tight cursor-pointer hover:scale-105 transition transform duration-200">
            Men&apos;s Fashion
          </h1>
        </Link>
      </motion.div>

      {/* Navigation */}
      <nav className="flex space-x-8 items-center">
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-lg font-medium hover:text-gray-300 transition duration-300"
          >
            Home
          </motion.div>
        </Link>

        <Link href="/shop">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-lg font-medium hover:text-gray-300 transition duration-300"
          >
            Shop
          </motion.div>
        </Link>

        {/* User Profile and Cart */}
        {user && (
          <Link href="/profile">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-lg font-medium flex items-center hover:text-gray-300 transition duration-300"
            >
              <User className="mr-2 h-5 w-5" /> Profile
            </motion.div>
          </Link>
        )}

        <Link href="/cart">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative text-lg font-medium flex items-center hover:text-gray-300 transition duration-300"
          >
            <Button className="bg-transparent text-white flex items-center">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </motion.div>
        </Link>

        {/* Login/Logout */}
        {user ? (
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              onClick={logout}
              className="text-lg font-medium hover:text-gray-300 transition duration-300 flex items-center"
            >
              <LogOut className="mr-2 h-5 w-5" /> Logout
            </Button>
          </motion.div>
        ) : (
          <Link href="/login">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button className="text-lg font-medium hover:text-gray-300 transition duration-300 flex items-center">
                <LogIn className="mr-2 h-5 w-5" /> Login
              </Button>
            </motion.div>
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
