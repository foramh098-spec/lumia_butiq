'use client';

import React, { useState } from 'react';
import { Star, CheckCircle, Plus, X } from 'lucide-react';
import { Review } from '@/types';
import Button from '@/components/common/Button';
import { useToast } from '@/context/ToastContext';

interface ReviewSectionProps {
  reviews: Review[];
  rating: number;
  reviewCount: number;
  productName: string;
}

export default function ReviewSection({
  reviews: initialReviews,
  rating,
  reviewCount: initialCount,
  productName,
}: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const { showToast } = useToast();

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment || !newTitle) {
      showToast('Please complete all required fields', 'error');
      return;
    }

    const createdReview: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      location: newLocation || 'Verified Patron',
      date: 'Just now',
      rating: newRating,
      verified: true,
      title: newTitle,
      comment: newComment,
      fit: 'True to size',
      sizePurchased: 'S',
      colorPurchased: 'Selected Atelier Shade',
    };

    setReviews([createdReview, ...reviews]);
    setIsWriteModalOpen(false);
    showToast('Review Submitted', 'success', 'Thank you for your feedback on this piece.');
    setNewAuthor('');
    setNewTitle('');
    setNewComment('');
  };

  return (
    <div className="pt-12 border-t border-[#26262F] space-y-10">
      
      {/* Reviews Header & Score breakdown */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-[#26262F]">
        <div className="space-y-2">
          <span className="text-[10px] tracking-widest-luxury uppercase text-[#FF5DA2] font-medium">
            Client Impressions
          </span>
          <h3 className="font-serif text-3xl text-white">Customer Reviews</h3>
          <div className="flex items-center gap-3">
            <div className="flex text-[#FF3B8A]">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 fill-[#FF3B8A]" />
              ))}
            </div>
            <span className="text-sm font-medium text-white">{rating} out of 5</span>
            <span className="text-xs text-neutral-400 font-light">
              Based on {reviews.length + (initialCount > reviews.length ? initialCount - reviews.length : 0)} verified reviews
            </span>
          </div>
        </div>

        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsWriteModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Write a Review</span>
          </Button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <div className="p-8 bg-[#18181E] text-center space-y-2 border border-[#26262F]">
            <p className="font-serif text-lg text-white">Be the first to review {productName}</p>
            <p className="text-xs text-neutral-400 font-light">
              Share your fit notes, fabric impressions, and styling advice with fellow patrons.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 bg-[#121216] border border-[#26262F] space-y-3 flex flex-col justify-between shadow-md"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex text-[#FF3B8A]">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#FF3B8A]" />
                      ))}
                    </div>
                    <span className="text-[10px] text-neutral-500 font-light">{rev.date}</span>
                  </div>

                  <h4 className="font-serif text-base text-white font-medium leading-snug">
                    {rev.title}
                  </h4>

                  <p className="text-xs text-neutral-300 font-light leading-relaxed">
                    &quot;{rev.comment}&quot;
                  </p>
                </div>

                <div className="pt-3 border-t border-[#26262F] flex items-center justify-between text-[11px] text-neutral-400">
                  <div>
                    <span className="font-medium text-[#FF5DA2]">{rev.author}</span>
                    <span className="text-neutral-500"> ({rev.location})</span>
                  </div>
                  {rev.verified && (
                    <div className="flex items-center gap-1 text-[#FF5DA2] text-[10px] uppercase font-medium">
                      <CheckCircle className="w-3 h-3 text-[#FF3B8A]" />
                      <span>Verified Patron</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Write Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={() => setIsWriteModalOpen(false)}
          />

          <div className="relative min-h-screen px-4 flex items-center justify-center py-8">
            <div className="relative w-full max-w-lg bg-[#121216] p-6 sm:p-8 shadow-2xl border border-[#26262F] text-white animate-in zoom-in-95 duration-200">
              
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <form onSubmit={handleAddReview} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] tracking-widest-luxury uppercase text-[#FF5DA2] font-medium">
                    Atelier Feedback
                  </span>
                  <h3 className="font-serif text-2xl text-white">Review {productName}</h3>
                </div>

                {/* Rating selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white">Your Rating</label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= newRating ? 'fill-[#FF3B8A] text-[#FF3B8A]' : 'text-neutral-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] tracking-wider uppercase text-neutral-400 font-medium">Your Name *</label>
                    <input
                      type="text"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      required
                      placeholder="Eleanor V."
                      className="w-full bg-[#18181E] border border-[#2D2D38] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF3B8A]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] tracking-wider uppercase text-neutral-400 font-medium">Location</label>
                    <input
                      type="text"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      placeholder="London, UK"
                      className="w-full bg-[#18181E] border border-[#2D2D38] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF3B8A]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] tracking-wider uppercase text-neutral-400 font-medium">Review Title *</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                    placeholder="e.g. Exceptional cut and drape"
                    className="w-full bg-[#18181E] border border-[#2D2D38] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF3B8A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] tracking-wider uppercase text-neutral-400 font-medium">Your Comments *</label>
                  <textarea
                    rows={4}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                    placeholder="How does the garment fit? What do you think of the fabric weight and feel?"
                    className="w-full bg-[#18181E] border border-[#2D2D38] px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF3B8A]"
                  />
                </div>

                <div className="pt-2">
                  <Button variant="primary" fullWidth type="submit">
                    Submit Verified Review
                  </Button>
                </div>
              </form>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
