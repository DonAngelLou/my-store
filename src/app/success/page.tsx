'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const SuccessPage = () => {
  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  const { clearCart } = useCart();

  useEffect(() => {
    // Ensure this only runs on the client side
    if (typeof window === 'undefined') return;

    // Retrieve or generate the order number
    const savedOrderNumber = localStorage.getItem('orderNumber');
    if (!savedOrderNumber) {
      const newOrderNumber = Math.floor(Math.random() * 1000000000).toString();
      localStorage.setItem('orderNumber', newOrderNumber);
      setOrderNumber(parseInt(newOrderNumber));
    } else {
      setOrderNumber(parseInt(savedOrderNumber));
    }

    // Clear the cart and remove localStorage items
    clearCart();
    ['cartItems', 'totalPrice', 'shippingDetails'].forEach((item) =>
      localStorage.removeItem(item)
    );

  }, [clearCart]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Thank You for Your Order!</h1>
        <p className="text-gray-500 mb-2">Order Number: #{orderNumber}</p>
        <p className="text-gray-500 mb-8">Your order has been placed successfully and will be shipped soon.</p>
        <Link href="/" passHref>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
