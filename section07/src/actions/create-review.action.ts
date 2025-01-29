'use server';

import { SERVER_URL } from '@/constants/server-url';

export const createReviewAction = async (formData: FormData) => {
  const bookId = formData.get('bookId')?.toString();
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();

  if (!content || !author) {
    return;
  }

  try {
    const response = await fetch(`${SERVER_URL}/review`, {
      method: 'POST',
      body: JSON.stringify({ bookId, content, author }),
    });

    console.log(response.status);
  } catch (err) {
    console.error(err);
    return;
  }
};
