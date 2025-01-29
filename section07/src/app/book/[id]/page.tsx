import { SERVER_URL } from '@/constants/server-url';
import style from './page.module.css';
import { BookData } from '@/types';
import { notFound } from 'next/navigation';
import { createReviewAction } from '@/actions/create-review.action';

// export const dynamicParams = false;

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

const BookDetail = async ({ bookId }: { bookId: string }) => {
  const response = await fetch(`${SERVER_URL}/book/${bookId}`);
  if (!response.ok) {
    if (response.status === 404) {
      //데이터가 없을 때 not found 페이지로 이동
      notFound();
    }
  }
  const book: BookData = await response.json();
  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${book?.coverImgUrl}')` }}
      >
        <img src={book?.coverImgUrl} />
      </div>
      <div className={style.title}>{book?.title}</div>
      <div className={style.subTitle}>{book?.subTitle}</div>
      <div className={style.author}>
        {book?.author} | {book?.publisher}
      </div>
      <div className={style.description}>{book?.description}</div>
    </section>
  );
};

const ReviewEditor = ({ bookId }: { bookId: string }) => {
  return (
    <section>
      <form action={createReviewAction}>
        <input readOnly name="bookId" type="text" value={bookId} hidden />
        <input required name="content" type="text" placeholder="리뷰 내용" />
        <input required name="author" type="text" placeholder="작성자" />
        <button type="submit">작성하기</button>
      </form>
    </section>
  );
};

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className={style.container}>
      <BookDetail bookId={id} />
      <ReviewEditor bookId={id} />
    </div>
  );
}
