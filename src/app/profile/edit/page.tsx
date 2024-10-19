'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

const ProfileEdit = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');

  // Load user data from localStorage or mock data
  useEffect(() => {
    const storedUsername = localStorage.getItem('username') || 'John Doe';
    setUsername(storedUsername);
  }, []);

  // Handle input validation
  const validateForm = () => {
    const validationErrors: Record<string, string> = {};

    if (!username.trim()) {
      validationErrors.username = 'Username is required';
    }

    if (newPassword && newPassword !== confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Simulate saving data to localStorage (or make an API call)
      localStorage.setItem('username', username);

      // If password change is successful
      if (newPassword) {
        // In a real app, you'd also update the password with an API
        setSuccessMessage('Profile and password updated successfully!');
      } else {
        setSuccessMessage('Profile updated successfully!');
      }

      // Clear the form after submission
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        setSuccessMessage('');
        router.push('/profile'); // Redirect back to the profile page
      }, 2000);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-100 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Profile</h2>

        {successMessage && (
          <motion.div
            className="bg-green-100 text-green-700 p-4 rounded-lg mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {successMessage}
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
            <Input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`${errors.username ? 'border-red-500' : ''}`}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          {/* Current Password */}
          <div className="mb-4">
            <label htmlFor="currentPassword" className="block text-gray-700 mb-2">Current Password</label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={`${errors.currentPassword ? 'border-red-500' : ''}`}
            />
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-gray-700 mb-2">New Password</label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`${errors.newPassword ? 'border-red-500' : ''}`}
            />
          </div>

          {/* Confirm New Password */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm New Password</label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`${errors.confirmPassword ? 'border-red-500' : ''}`}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md"
          >
            Save Changes
          </Button>
        </form>

        <Button
          className="mt-4 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-md"
          onClick={() => router.push('/profile')}
        >
          Cancel
        </Button>
      </div>
    </motion.div>
  );
};

export default ProfileEdit;
