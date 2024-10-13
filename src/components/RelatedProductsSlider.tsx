'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'; 
import { Autoplay, Pagination, Navigation } from 'swiper/modules'; 
import 'swiper/swiper-bundle.min.css'; 
import Image from 'next/image';
import Link from 'next/link';

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type RelatedProductsSliderProps = {
  relatedProducts: Product[];
};

const RelatedProductsSlider = ({ relatedProducts }: RelatedProductsSliderProps) => {
  return (
    <div className="my-8">
      <h3 className="text-2xl font-bold mb-6">Related Products</h3>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={3}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        navigation
      >
        {relatedProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="relative">
              <Link href={`/product/${product.id}`}>
                <Image
                  src={product.image}
                  alt={product.title}
                  width={250}
                  height={250}
                  className="rounded-lg object-cover"
                />
                <div className="text-center mt-2">
                  <h4 className="font-semibold">{product.title}</h4>
                  <p className="text-gray-500">${product.price.toFixed(2)}</p>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RelatedProductsSlider;
