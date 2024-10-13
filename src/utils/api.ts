
export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};


export type User = {
  id: number;
  email: string;
  username: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
  };
  phone: string;
};

import axios from 'axios';

// Fetch men's products from specific categories
export const getMenProducts = async (): Promise<Product[]> => {
  const menCategories: string[] = ["men's clothing", 'jewelery', 'electronics']; // Specify the men's categories
  const allProducts: Product[] = [];

  try {
    const response = await axios.get<Product[]>('https://fakestoreapi.com/products'); // Fetch all products
    const products = response.data;

    
    const filteredProducts = products.filter((product: Product) =>
      menCategories.includes(product.category)
    );

    allProducts.push(...filteredProducts); 
  } catch (error) {
    console.error('Error fetching men’s products:', (error as Error).message);
  }

  return allProducts; // Return the filtered men's products array
};

// Fetch all users
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>('https://fakestoreapi.com/users'); 
    return response.data; 
  } catch (error) {
    console.error('Error fetching users:', (error as Error).message); 
    return []; 
  }
};
