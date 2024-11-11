'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard'; 
import { Button } from '@/components/ui/button'; 

const Shop = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="container mx-auto py-16 px-8"
      >
        {/* Page Heading */}
        <h1 className="text-5xl font-bold mb-8 text-center">Shop Men&apos;s Apparel & Accessories</h1>

        {/* ProductCard handles its own data fetching and rendering */}
        <ProductCard />

        {/* Footer Section */}
        <div className="flex justify-center mt-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Button className="bg-gray-700 text-white py-3 px-6 rounded-full shadow-md transition duration-300">
              View Cart
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Shop;
