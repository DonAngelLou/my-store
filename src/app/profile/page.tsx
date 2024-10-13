'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image'; 
import { motion } from 'framer-motion';

const Profile = () => {
  const { user, logout } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login'); 
    } else {
      setLoading(false); 
    }
  }, [user, router]);

  if (loading) {
    return <div className="text-center mt-20 text-xl">Loading...</div>;
  }

  // Fallback values for missing fields
  const userName = user?.name || 'User Name';
  const userEmail = user?.email || 'Email not available';
  const userJoinedDate = user?.createdAt ? new Date(user.createdAt).toDateString() : 'N/A';

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gray-100 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Profile Picture */}
          <Image
            src="/profile-placeholder.jpg" 
            alt="Profile Picture"
            width={128}
            height={128}
            className="w-32 h-32 rounded-full mb-4 object-cover border-2 border-indigo-500"
          />

          {/* User Information */}
          <h1 className="text-2xl font-bold text-gray-800 mb-1">{userName}</h1>
          <p className="text-gray-600 mb-4">{userEmail}</p>
          <p className="text-sm text-gray-500 mb-6">Joined on {userJoinedDate}</p>

          {/* Edit Profile Button */}
          <Button
            className="bg-indigo-600 text-white w-full mb-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            onClick={() => router.push('/profile/edit')}
          >
            Edit Profile
          </Button>

          {/* Logout Button */}
          <Button
            className="bg-red-500 text-white w-full py-2 rounded-md hover:bg-red-600 transition-colors"
            onClick={logout}
          >
            Logout
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile;
