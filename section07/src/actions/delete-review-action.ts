'use server';

import { SERVER_URL } from '@/constants/server-url';
import { revalidateTag } from 'next/cache';

const deleteReviewAction = async ({
  id,
  bookId,
}: {
  id: number;
  bookId: number;
}) => {
  try {
    const response = await fetch(`${SERVER_URL}/review/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      console.error('리뷰 삭제에 실패하였습니다.', response.statusText);
      throw new Error(response.statusText);
    }
    revalidateTag(`review-${bookId}`);
  } catch (err) {
    console.error('err', err);
  }
};

export default deleteReviewAction;
