'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Review = {
  id: number;
  name: string;
  rating: number;
  comment: string;
};

type NewReview = {
  name: string;
  rating: number;
  comment: string;
};

const ProductReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<NewReview>({
    name: '',
    rating: 0,
    comment: '',
  });

  // Fetch existing reviews (mocked with JSONPlaceholder)
  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
        setReviews(response.data.slice(0, 5)); 
      } catch (error) {
        console.error('Error fetching reviews', error);
      }
    }

    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // POST request to add a new review (simulated)
      const response = await axios.post('https://jsonplaceholder.typicode.com/comments', {
        name: newReview.name,
        rating: newReview.rating,
        comment: newReview.comment,
      });
      setReviews([response.data, ...reviews]); 
      setNewReview({ name: '', rating: 0, comment: '' }); 
    } catch (error) {
      console.error('Error posting review', error);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold">Customer Reviews</h3>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 border rounded">
            <div className="flex items-center space-x-2">
              <span className="font-bold">{review.name}</span>
              <span className="text-yellow-500">
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </span>
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Form for adding new review */}
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={newReview.name}
            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
            required
            className="border p-2 rounded"
          />
          <select
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
            required
            className="border p-2 rounded"
          >
            <option value={0}>Rating</option>
            <option value={1}>1 Star</option>
            <option value={2}>2 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={5}>5 Stars</option>
          </select>
          <textarea
            placeholder="Your Review"
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            required
            className="border p-2 rounded"
          ></textarea>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductReviews;
