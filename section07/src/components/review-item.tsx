import React from 'react';
import style from './review-item.module.css';
import { ReviewData } from '@/types';

const ReviewItem = ({ id, createdAt, content, author, bookId }: ReviewData) => {
  return (
    <div className={style.container}>
      <div className={style.author}>{author}</div>
      <div className={style.content}>{content}</div>
      <div className={style.bottom_container}>
        <div className={style.date}>{new Date(createdAt).toLocaleString()}</div>
        <button className={style.delete_btn}>삭제하기</button>
      </div>
    </div>
  );
};

export default ReviewItem;
