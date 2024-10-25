'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

// Define the CartItem type
type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
};

const Checkout = () => {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Retrieve cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  // Calculate subtotal, tax, and total
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.07; // 7% tax rate
  const totalPrice = subtotal + tax;

  // Handle form inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'shipping' | 'payment') => {
    const { name, value } = e.target;

    if (type === 'shipping') {
      setShippingDetails((prev) => ({ ...prev, [name]: value }));
    } else {
      setPaymentDetails((prev) => ({ ...prev, [name]: value }));
    }

    if (!value.trim()) {
      setErrors((prev: Record<string, string>) => ({
        ...prev,
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`,
      }));
    } else {
      setErrors((prev: Record<string, string>) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateFields = () => {
    const validationErrors: Record<string, string> = {};

    if (currentStep === 1) {
      Object.entries(shippingDetails).forEach(([key, value]) => {
        if (!value) {
          validationErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
        }
      });
    } else if (currentStep === 2) {
      Object.entries(paymentDetails).forEach(([key, value]) => {
        if (!value) {
          validationErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
        }
      });
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateFields()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleConfirm = () => {
    localStorage.setItem('shippingDetails', JSON.stringify(shippingDetails));
    localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));
    localStorage.setItem('subtotal', subtotal.toFixed(2));
    localStorage.setItem('tax', tax.toFixed(2));
    localStorage.setItem('totalPrice', totalPrice.toFixed(2));

    router.push('/confirmation');
  };

  if (cart.length === 0) {
    return <div className="text-center text-lg mt-10">Your cart is empty.</div>;
  }

  return (
    <motion.div className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">Checkout</h2>

      {/* Error Display */}
      {Object.values(errors).filter(Boolean).length > 0 && (
        <motion.div
          className="bg-red-100 text-red-700 p-3 mb-4 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ul>
            {Object.entries(errors)
              .filter(([, error]) => error)
              .map(([field, error]) => (
                <li key={field}>{error}</li>
              ))}
          </ul>
        </motion.div>
      )}

      {currentStep === 1 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Shipping Details */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Shipping Details</h3>
            <Input
              type="text"
              name="name"
              placeholder="Full Name"
              value={shippingDetails.name}
              onChange={(e) => handleInputChange(e, 'shipping')}
              className={`mb-3 ${errors.name ? 'border-red-500' : ''}`}
            />
            <Input
              type="text"
              name="address"
              placeholder="Address"
              value={shippingDetails.address}
              onChange={(e) => handleInputChange(e, 'shipping')}
              className={`mb-3 ${errors.address ? 'border-red-500' : ''}`}
            />
            <Input
              type="text"
              name="city"
              placeholder="City"
              value={shippingDetails.city}
              onChange={(e) => handleInputChange(e, 'shipping')}
              className={`mb-3 ${errors.city ? 'border-red-500' : ''}`}
            />
            <Input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={shippingDetails.postalCode}
              onChange={(e) => handleInputChange(e, 'shipping')}
              className={`mb-3 ${errors.postalCode ? 'border-red-500' : ''}`}
            />
            <Input
              type="text"
              name="country"
              placeholder="Country"
              value={shippingDetails.country}
              onChange={(e) => handleInputChange(e, 'shipping')}
              className={`mb-3 ${errors.country ? 'border-red-500' : ''}`}
            />
          </div>

          {/* Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button onClick={handleNextStep} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md">
              Next: Payment Info
            </Button>
          </motion.div>
        </motion.div>
      )}

      {currentStep === 2 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Payment Details */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Payment Details</h3>
            <Input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={paymentDetails.cardNumber}
              onChange={(e) => handleInputChange(e, 'payment')}
              className={`mb-3 ${errors.cardNumber ? 'border-red-500' : ''}`}
            />
            <Input
              type="text"
              name="expiryDate"
              placeholder="Expiry Date (MM/YY)"
              value={paymentDetails.expiryDate}
              onChange={(e) => handleInputChange(e, 'payment')}
              className={`mb-3 ${errors.expiryDate ? 'border-red-500' : ''}`}
            />
            <Input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={paymentDetails.cvv}
              onChange={(e) => handleInputChange(e, 'payment')}
              className={`mb-3 ${errors.cvv ? 'border-red-500' : ''}`}
            />
          </div>

          <div className="flex justify-between gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={handlePreviousStep} className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-md">
                Back
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={handleConfirm} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md">
                Confirm and Review Order
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}

      {currentStep === 3 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Review Order */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Review Your Order</h3>
            <div>
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between border-b py-2">
                  <div>{item.title}</div>
                  <div>
                    ${item.price} x {item.quantity}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-right font-bold mt-4 text-lg">Subtotal: ${subtotal.toFixed(2)}</div>
            <div className="text-right font-bold mt-4 text-lg">Tax (7%): ${tax.toFixed(2)}</div>
            <div className="text-right font-bold mt-4 text-xl">Total: ${totalPrice.toFixed(2)}</div>
          </div>

          <div className="flex justify-between gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={handlePreviousStep} className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-md">
                Back
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Checkout;
