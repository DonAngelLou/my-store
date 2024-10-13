'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { Button } from '@/components/ui/button'; 
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation'; 

const CartPage = () => {
  const { cart, removeFromCart, updateCartItemQuantity, clearCart } = useCart();
  const router = useRouter(); 

  // Calculate cart totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.07; 
  const total = subtotal + tax;

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <motion.div
            className="flex-1"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {cart.map((item) => (
              <motion.div
                key={item.id}
                className="flex justify-between items-center mb-6 border-b pb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-4">
                  <Image src={item.image} alt={item.title} width={80} height={80} className="rounded" />
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-gray-500">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateCartItemQuantity(item.id, Number(e.target.value))}
                        className="w-16 p-2 border rounded"
                        min={1}
                      />
                      {/* Using Shadcn Button with motion */}
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          className="ml-4 bg-red-500 hover:bg-red-600 text-white"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              </motion.div>
            ))}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button className="bg-red-600 hover:bg-red-700 text-white mt-4" onClick={clearCart}>
                Clear Cart
              </Button>
            </motion.div>
          </motion.div>

          {/* Cart Summary */}
          <motion.div
            className="bg-gray-100 p-6 rounded-lg shadow-lg w-full lg:w-1/3"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
            <div className="flex justify-between mb-2">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Tax (7%)</p>
              <p>${tax.toFixed(2)}</p>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white w-full mt-6"
                onClick={() => router.push('/checkout')} // Add navigation to checkout
              >
                Proceed to Checkout
              </Button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
