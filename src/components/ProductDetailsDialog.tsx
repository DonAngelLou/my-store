'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.min.css';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useCart } from '@/context/CartContext';

type Product = {
  id: number;
  title: string;
  description: string;
  specifications: string;
  price: number;
  stock: number;
  images: string[];
};

type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
};

type ProductDetailsDialogProps = {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
};

const ProductDetailsDialog = ({ product, isOpen, onClose }: ProductDetailsDialogProps) => {
  const { addToCart } = useCart();
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.images[0],
    };
    addToCart(cartItem);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* Set fixed max-width and height for the modal */}
      <DialogContent className="p-6 bg-gray-800 text-white rounded-lg shadow-lg max-w-[800px] max-h-[85vh] overflow-auto">
        <DialogHeader>
          <h2 className="text-2xl font-bold">{product.title}</h2>
        </DialogHeader>

        <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-6">
          {/* SwiperJS Image Slider */}
          <motion.div className="relative w-full lg:w-1/2" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <Tooltip>
              <TooltipTrigger>
                <Swiper
                  modules={[Autoplay, Pagination, Navigation]}
                  spaceBetween={30}
                  slidesPerView={1}
                  autoplay={{ delay: 2500 }}
                  pagination={{ clickable: true }}
                  navigation
                >
                  {product.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      {/* Ensure the image is contained and centered without distortion */}
                      <Image
                        src={image}
                        alt={`Product Image ${index + 1}`}
                        width={400}
                        height={400}
                        className="object-contain rounded-lg cursor-pointer w-full h-[400px]"
                        onClick={handleZoomToggle}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </TooltipTrigger>
              <TooltipContent>Click to zoom</TooltipContent>
            </Tooltip>
          </motion.div>

          {/* Product Details */}
          <div className="w-full lg:w-1/2">
            <Tabs defaultValue="description">
              <TabsList className="space-x-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="text-sm">
                <p>{product.description}</p>
              </TabsContent>
              <TabsContent value="specifications" className="text-sm">
                <p>{product.specifications}</p>
              </TabsContent>
              <TabsContent value="reviews" className="text-sm">
                <p>Customer reviews go here.</p>
              </TabsContent>
            </Tabs>

            {/* Stock and Price */}
            <p className={`mt-4 font-bold ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'} (Stock: {product.stock})
            </p>
            <p className="text-xl font-semibold mt-2">${product.price.toFixed(2)}</p>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="bg-blue-600 hover:bg-blue-700 text-white mt-4 w-full"
            >
              Add to Cart
            </Button>
          </div>
        </div>

        <Button onClick={onClose} className="mt-4 bg-gray-700 hover:bg-gray-800">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;
