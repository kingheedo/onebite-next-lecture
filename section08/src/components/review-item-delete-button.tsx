'use client';

import deleteReviewAction from '@/actions/delete-review-action';
import React from 'react';
import style from './review-item-delete-button.module.css';

const ReviewItemDeleteButton = ({
  id,
  bookId,
}: {
  id: number;
  bookId: number;
}) => {
  return (
    <button
      className={style.delete_btn}
      onClick={() =>
        deleteReviewAction({
          id,
          bookId,
        })
      }
    >
      삭제하기
    </button>
  );
};

export default ReviewItemDeleteButton;
