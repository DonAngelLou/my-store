'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

// Define types for order summary and shipping details
type OrderItem = {
  title: string;
  price: number;
  quantity: number;
};

type ShippingDetails = {
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

const Confirmation = () => {
  const router = useRouter();
  const [orderSummary, setOrderSummary] = useState<OrderItem[]>([]);
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // Fetch data from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    const savedShippingDetails = localStorage.getItem('shippingDetails');
    const savedTotalPrice = localStorage.getItem('totalPrice');

    // Retrieve and parse the order summary (cart items)
    if (savedCart) {
      setOrderSummary(JSON.parse(savedCart));
    }

    // Retrieve and parse the shipping details
    if (savedShippingDetails) {
      setShippingDetails(JSON.parse(savedShippingDetails));
    }

    // Retrieve and parse the total price
    if (savedTotalPrice) {
      setTotalPrice(parseFloat(savedTotalPrice));
    }
  }, []);

  // Function to handle saving the purchase in history
  const savePurchaseInHistory = () => {
    const purchaseHistory = localStorage.getItem('purchaseHistory');
    const newPurchase = {
      orderNumber: Math.floor(Math.random() * 1000000000), // Simulated order number
      date: new Date().toISOString(),
      orderSummary,
      shippingDetails,
      totalPrice: totalPrice.toFixed(2),
    };

    // Add the new purchase to the history
    const updatedHistory = purchaseHistory
      ? [...JSON.parse(purchaseHistory), newPurchase]
      : [newPurchase];
    localStorage.setItem('purchaseHistory', JSON.stringify(updatedHistory));
  };

  // Confirm and Place the order
  const handlePlaceOrder = () => {
    // Save the purchase in history
    savePurchaseInHistory();

    // Clear the cart
    localStorage.removeItem('cartItems');
    localStorage.removeItem('totalPrice');

    // Navigate to success page
    router.push('/success');
  };

  const handleEditShipping = () => {
    router.push('/checkout'); // Go back to the checkout page to edit shipping
  };

  if (!shippingDetails || orderSummary.length === 0) {
    return <div className="text-center text-lg mt-10">No order details available. Please go back to the cart.</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen text-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold">Review Your Order</h1>
        <p className="text-lg mt-4">Please confirm your shipping information and order summary.</p>
      </motion.div>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        <ul>
          {orderSummary.map((item, index) => (
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
        {shippingDetails && (
          <div className="text-sm">
            <p><strong>Name:</strong> {shippingDetails.name}</p>
            <p><strong>Address:</strong> {shippingDetails.address}</p>
            <p><strong>City:</strong> {shippingDetails.city}, {shippingDetails.postalCode}</p>
            <p><strong>Country:</strong> {shippingDetails.country}</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button
          className="bg-gray-600 text-white px-6 py-2 rounded-md"
          onClick={handleEditShipping}
        >
          Edit Shipping
        </Button>

        <Button
          className="bg-green-600 text-white px-6 py-2 rounded-md"
          onClick={handlePlaceOrder}
        >
          Confirm and Place Order
        </Button>
      </div>
    </div>
  );
};

export default Confirmation;
