'use client';

import React, { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { Button } from '@/components/ui/button'; 
import { useRouter } from 'next/navigation';

const CartPage = () => {
  const { cart, removeFromCart, updateCartItemQuantity, clearCart } = useCart();
  const router = useRouter();

  // Store cart data in localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cart));
  }, [cart]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-6 border-b pb-4">
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
                      <Button className="ml-4 bg-red-500 hover:bg-red-600 text-white" onClick={() => removeFromCart(item.id)}>
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <Button className="bg-red-600 hover:bg-red-700 text-white mt-4" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>

          {/* Cart Summary */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full lg:w-1/3">
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
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white w-full mt-6"
              onClick={() => router.push('/checkout')}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
