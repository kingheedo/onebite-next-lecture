import React from 'react';
import BookItemSkeleton from './book-item-skeleton';

const BookListSkeleton = ({ count }: { count: number }) => {
  return Array.from({ length: count }, (_, i) => i).map((_, i) => (
    <BookItemSkeleton key={`book-item-skeleton-${i}`} />
  ));
};

export default BookListSkeleton;
