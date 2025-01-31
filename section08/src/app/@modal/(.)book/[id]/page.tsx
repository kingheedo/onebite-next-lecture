import BookPage from '@/app/book/[id]/page';
import Modal from '@/components/modal';
import React from 'react';

const BookPageIntercept = (props: any) => {
  return (
    <Modal>
      <BookPage {...props} />
    </Modal>
  );
};

export default BookPageIntercept;
