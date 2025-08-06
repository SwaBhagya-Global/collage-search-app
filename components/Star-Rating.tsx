'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  initialRating?: number;
  onRate?: (rating: number) => void;
  onSubmit?: (rating: number) => void;
}

export default function StarRating({ initialRating = 0, onRate, onSubmit }: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClick = (value: number) => {
    if (isSubmitted) return;
    setRating(value);
    if (onRate) onRate(value);
  };

  const handleSubmit = () => {
    if (rating === 0 || isSubmitted) return;
    setIsSubmitted(true);
    if (onSubmit) onSubmit(rating);
    alert(`Submitted rating: ${rating}`);
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= (isSubmitted ? rating : hover || rating);
          return (
            <Star
              key={star}
              className={`w-5 h-5 transition 
                ${isFilled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                ${isSubmitted ? 'cursor-default' : 'cursor-pointer'}`}
              onClick={() => handleClick(star)}
              onMouseEnter={() => {
                if (!isSubmitted) setHover(star);
              }}
              onMouseLeave={() => {
                if (!isSubmitted) setHover(0);
              }}
            />
          );
        })}
      </div>

      <button
        onClick={handleSubmit}
        disabled={rating === 0 || isSubmitted}
        className={`px-3 py-1 text-sm rounded-md ${
          rating === 0 || isSubmitted
            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {isSubmitted ? 'Submitted' : 'Submit'}
      </button>
    </div>
  );
}
