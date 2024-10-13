'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'; 
import { motion } from 'framer-motion'; 

const Confirmation = () => {
  const router = useRouter();

  const mockOrderNumber = Math.floor(Math.random() * 1000000000); // Simulated order number
  const mockShippingDetails = {
    name: 'John Doe',
    address: '123 Fashion St',
    city: 'New York',
    postalCode: '10001',
    country: 'USA',
  };

  const mockOrderSummary = [
    { title: 'Men\'s Casual Jacket', price: 120, quantity: 1 },
    { title: 'Classic White Shirt', price: 40, quantity: 2 },
  ];

  const totalPrice = mockOrderSummary.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="p-8 bg-gray-100 min-h-screen text-gray-900">
      {/* Order confirmation message */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-green-600">Thank You For Your Order!</h1>
        <p className="text-lg mt-4">Your order has been placed successfully.</p>
      </motion.div>

      {/* Order Number */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-2">Order Number: #{mockOrderNumber}</h2>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        <ul>
          {mockOrderSummary.map((item, index) => (
            <li key={index} className="flex justify-between border-b py-2">
              <span>{item.title} x {item.quantity}</span>
              <span>${item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="text-right font-bold mt-4">Total: ${totalPrice.toFixed(2)}</div>
      </div>

      {/* Shipping Information */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
        <div className="text-sm">
          <p>{mockShippingDetails.name}</p>
          <p>{mockShippingDetails.address}</p>
          <p>{mockShippingDetails.city}, {mockShippingDetails.postalCode}</p>
          <p>{mockShippingDetails.country}</p>
        </div>
      </div>

      {/* Back to Home Button */}
      <div className="text-center">
        <Button
          className="bg-blue-600 text-white px-6 py-2 rounded-md"
          onClick={() => router.push('/')}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default Confirmation;
