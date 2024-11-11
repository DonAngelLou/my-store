'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const SuccessPage = () => {
  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  const { clearCart } = useCart();

  const stableClearCart = useCallback(() => {
    clearCart();
  }, [clearCart]);

  useEffect(() => {
    // Check if order number exists in localStorage, otherwise generate and save a new one
    const savedOrderNumber = localStorage.getItem('orderNumber');
    if (!savedOrderNumber) {
      const newOrderNumber = Math.floor(Math.random() * 1000000000).toString(); // Generate a new order number
      localStorage.setItem('orderNumber', newOrderNumber); // Save to localStorage
      setOrderNumber(parseInt(newOrderNumber));
    } else {
      setOrderNumber(parseInt(savedOrderNumber)); // Use the existing order number
    }

    // Clear the cart and relevant localStorage items only once after mounting
    stableClearCart();
    localStorage.removeItem('cartItems');
    localStorage.removeItem('totalPrice');
    localStorage.removeItem('shippingDetails');
    
    // Empty dependency array ensures this only runs once when the component mounts
  }, [stableClearCart]); // Include stableClearCart as a dependency

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Thank You for Your Order!</h1>
        <p className="text-gray-500 mb-2">Order Number: #{orderNumber}</p>
        <p className="text-gray-500 mb-8">Your order has been placed successfully and will be shipped soon.</p>
        <Link href="/" passHref>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
