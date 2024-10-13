'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { getMenProducts } from '../utils/api';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Loader2 } from 'lucide-react';
import { useUser } from '@/context/UserContext';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: { rate: number; count: number };
  available: boolean;
  stock: number;
};

// Product details modal
const ProductDetailsDialog = ({
  product,
  isOpen,
  onClose,
}: {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-6 bg-gradient-to-tr from-gray-900 to-gray-800 text-white rounded-lg shadow-lg">
        <DialogHeader>
          <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
        </DialogHeader>
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={400}
          className="object-cover rounded-lg"
        />
        <p className="text-gray-400 mt-4">
          Price: <span className="font-semibold">${product.price}</span>
        </p>
        <p className="text-sm text-gray-300 mt-2">{product.description}</p>
        <Button onClick={onClose} className="mt-6 bg-indigo-600 hover:bg-indigo-700">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

const ProductCard = () => {
  const { user } = useUser();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [addToCartLoading, setAddToCartLoading] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('all');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [minRating, setMinRating] = useState<number>(0);
  const [availability, setAvailability] = useState<string>('all');
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 6;
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  // Fetch products from the API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const fetchedProducts = await getMenProducts();

        
        const updatedProducts = fetchedProducts.map((product) => ({
          ...product,
          stock: product.rating.count, 
          available: product.rating.count > 0, 
        }));

        setProducts(updatedProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products', error);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const handleAddToCart = (product: Product) => {
    if (!user) {
      alert('Please log in to add items to your cart.');
      return;
    }

    if (product.stock > 0) {
      setAddToCartLoading(product.id);
      setTimeout(() => {
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
        });
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === product.id ? { ...p, stock: p.stock - 1, available: p.stock - 1 > 0 } : p
          )
        );
        setAddToCartLoading(null);
      }, 1000);
    }
  };

  const filteredProducts = products
    .filter((product) => (category !== 'all' ? product.category === category : true))
    .filter((product) => product.price >= minPrice && product.price <= maxPrice)
    .filter((product) => product.rating.rate >= minRating)
    .filter((product) =>
      availability === 'all'
        ? true
        : availability === 'available'
        ? product.available
        : !product.available
    );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-600">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="p-8 bg-gray-100 text-gray-900 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center"></h2>

      {/* Filters and Sorting */}
      <div className="mb-8 flex flex-wrap justify-between gap-6 p-4 bg-gradient-to-r from-blue-800 to-black rounded-lg shadow-lg">
        {/* Category filter */}
        <Select onValueChange={setCategory}>
          <SelectTrigger className="w-[200px] bg-gray-800 text-white shadow-md rounded-md">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 text-white">
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="men's clothing">Men&apos;s Apparel</SelectItem>
              <SelectItem value="jewelery">Accessories</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Price filter */}
        <div className="flex space-x-4">
          <Input
            type="number"
            value={minPrice}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMinPrice(Number(e.target.value))}
            placeholder="Min Price"
            className="w-[100px] bg-gray-800 text-white shadow-md rounded-md"
          />
          <Input
            type="number"
            value={maxPrice}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMaxPrice(Number(e.target.value))}
            placeholder="Max Price"
            className="w-[100px] bg-gray-800 text-white shadow-md rounded-md"
          />
        </div>

        {/* Rating filter */}
        <Select onValueChange={(value: string) => setMinRating(Number(value))}>
          <SelectTrigger className="w-[200px] bg-gray-800 text-white shadow-md rounded-md">
            <SelectValue placeholder="Rating" />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 text-white">
            <SelectGroup>
              <SelectLabel>Rating</SelectLabel>
              <SelectItem value="0">All Ratings</SelectItem>
              <SelectItem value="4">4 Stars & Up</SelectItem>
              <SelectItem value="3">3 Stars & Up</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Availability filter */}
        <Select onValueChange={setAvailability}>
          <SelectTrigger className="w-[200px] bg-gray-800 text-white shadow-md rounded-md">
            <SelectValue placeholder="Availability" />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 text-white">
            <SelectGroup>
              <SelectLabel>Availability</SelectLabel>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="unavailable">Unavailable</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentProducts.map((product) => (
          <motion.div
            key={product.id}
            className="border p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-gray-800 text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Tooltip>
              <TooltipTrigger>
                <Image
                  src={product.image}
                  alt={product.title}
                  width={250}
                  height={250}
                  className="cursor-pointer hover:scale-105 transition-transform rounded-lg object-cover w-full h-[250px]" // Adjusted size
                  onClick={() => handleProductClick(product)}
                />
              </TooltipTrigger>
              <TooltipContent className="bg-gray-700 text-white">Click for more details</TooltipContent>
            </Tooltip>

            <h2 className="text-lg font-semibold mt-4">{product.title}</h2>
            <p className="text-gray-400">${product.price.toFixed(2)}</p>
            <p className="text-yellow-500">
              {'★'.repeat(Math.round(product.rating.rate))}
              {'☆'.repeat(5 - Math.round(product.rating.rate))}
            </p>
            <p className={product.available ? 'text-green-400' : 'text-red-500'}>
              {product.available ? 'In Stock' : 'Out of Stock'}
            </p>
            <p className="text-gray-400">Stock: {product.stock}</p>
            <Button
              onClick={() => handleAddToCart(product)}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700"
              disabled={addToCartLoading === product.id || product.stock === 0}
            >
              {addToCartLoading === product.id ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding...
                </>
              ) : product.stock === 0 ? (
                'Out of Stock'
              ) : (
                'Add to Cart'
              )}
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Product Details Dialog */}
      {selectedProduct && (
        <ProductDetailsDialog
          product={selectedProduct}
          isOpen={isDialogOpen}
          onClose={() => setDialogOpen(false)}
        />
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between mt-10">
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          variant="outline"
          className="bg-gray-700 text-white"
        >
          Previous
        </Button>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
          variant="outline"
          className="bg-gray-700 text-white"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
