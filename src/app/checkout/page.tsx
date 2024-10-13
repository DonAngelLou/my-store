'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion'; 

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

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

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'shipping' | 'payment') => {
    const { name, value } = e.target;

    if (type === 'shipping') {
      setShippingDetails((prev) => ({ ...prev, [name]: value }));
    } else if (type === 'payment') {
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

  const handlePlaceOrder = () => {
    if (validateFields()) {
      setIsLoading(true);
      setPaymentStatus(null);

      setTimeout(() => {
        const paymentSuccess = Math.random() > 0.3;

        if (paymentSuccess) {
          setPaymentStatus('Payment successful! Your order has been placed.');
          clearCart();
          setTimeout(() => {
            setIsLoading(false);
            router.push('/confirmation');
          }, 2000);
        } else {
          setPaymentStatus('Payment failed. Please try again.');
          setIsLoading(false);
        }
      }, 3000);
    }
  };

  const handleNextStep = () => {
    if (validateFields()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  if (cart.length === 0) {
    return <div className="text-center text-lg mt-10">Your cart is empty.</div>;
  }

  return (
    <motion.div className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
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
              <Button onClick={handleNextStep} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md">
                Next: Review Order
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
                  <div>${item.price} x {item.quantity}</div>
                </div>
              ))}
            </div>
            <div className="text-right font-bold mt-4 text-xl">Total: ${totalPrice.toFixed(2)}</div>
          </div>

          <div className="flex justify-between gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={handlePreviousStep} className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-md">
                Back
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button onClick={handlePlaceOrder} className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing Payment...
                  </>
                ) : (
                  'Place Order'
                )}
              </Button>
            </motion.div>
          </div>

          {paymentStatus && (
            <motion.div
              className={`mt-4 text-center text-lg font-semibold ${paymentStatus.includes('failed') ? 'text-red-500' : 'text-green-500'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {paymentStatus}
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Checkout;
