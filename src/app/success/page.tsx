'use client';

import React from 'react';
import Link from 'next/link';

const SuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
        <p className="text-gray-500 mb-8">Thank you for your purchase. Your items will be shipped soon.</p>
        <Link href="/">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
