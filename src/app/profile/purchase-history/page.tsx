'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

// Define types for order and shipping details
type OrderItem = {
  title: string;
  price: number;
  quantity: number;
};

type Purchase = {
  orderNumber: number;
  date: string;
  orderSummary: OrderItem[];
  shippingDetails: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  totalPrice: string;
};

const PurchaseHistory = () => {
  const [purchaseHistory, setPurchaseHistory] = useState<Purchase[]>([]);

  // Fetch purchase history from localStorage
  useEffect(() => {
    const history = localStorage.getItem('purchaseHistory');
    if (history) {
      // Use JSON.parse safely and only update the state if data exists
      const parsedHistory = JSON.parse(history);
      if (Array.isArray(parsedHistory)) {
        setPurchaseHistory(parsedHistory);
      }
    }
  }, []); // Empty dependency array ensures this effect runs only once

  if (purchaseHistory.length === 0) {
    return <div className="text-center text-lg mt-10">No purchases made yet.</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen text-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-center">Purchase History</h1>

      {purchaseHistory.map((purchase, index) => (
        <motion.div
          key={index}
          className="bg-white p-6 rounded-lg shadow-md mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold mb-4">Order Number: {purchase.orderNumber}</h3>
          <p className="text-sm text-gray-500 mb-4">Order Date: {new Date(purchase.date).toLocaleDateString()}</p>

          <div className="mb-6">
            <h4 className="text-lg font-semibold">Order Summary</h4>
            <ul>
              {purchase.orderSummary.map((item, idx) => (
                <li key={idx} className="flex justify-between border-b py-2">
                  <span>{item.title} x {item.quantity}</span>
                  <span>${item.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="text-right font-bold mt-4">Total: ${purchase.totalPrice}</div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold">Shipping Information</h4>
            <p className="text-sm">{purchase.shippingDetails.name}</p>
            <p className="text-sm">{purchase.shippingDetails.address}</p>
            <p className="text-sm">{purchase.shippingDetails.city}, {purchase.shippingDetails.postalCode}</p>
            <p className="text-sm">{purchase.shippingDetails.country}</p>
          </div>
        </motion.div>
      ))}

      <div className="text-center">
        <Link href="/" passHref legacyBehavior>
          <Button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PurchaseHistory;
