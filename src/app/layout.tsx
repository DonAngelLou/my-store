'use client'; 

import { TooltipProvider } from '@/components/ui/tooltip';
import { CartProvider } from '../context/CartContext';
import { UserProvider, useUser } from '../context/UserContext'; 
import Header from '@/components/Header'; 
import localFont from 'next/font/local';
import '../styles/globals.css';
import { Button } from '@/components/ui/button'; 


const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});


const AuthButton = () => {
  const { user, login, logout } = useUser(); 
  
  if (!user) {
    return (
      <div className="flex justify-end p-4">
        
        <Button onClick={() => login('user@example.com', 'password')}>Login</Button>
      </div>
    );
  }

  return (
    <div className="flex justify-end p-4">
      <span className="mr-4">Hello, {user.email}</span>
      
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Wrap with TooltipProvider and CartProvider */}
        <UserProvider> 
          <TooltipProvider> 
            <CartProvider> 
              
              <Header />
              
              
              <AuthButton /> 

              {/* Render children pages/components */}
              {children}
            </CartProvider>
          </TooltipProvider>
        </UserProvider>
      </body>
    </html>
  );
}
