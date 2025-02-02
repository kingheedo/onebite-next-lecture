import { SERVER_URL } from '@/constants/server-url';
import style from './page.module.css';
import { BookData, ReviewData } from '@/types';
import { notFound } from 'next/navigation';
import ReviewItem from '@/components/review-item';
import ReviewEditor from '@/components/review-editor';
import Image from 'next/image';
import { Metadata } from 'next';

// export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const response = await fetch(`${SERVER_URL}/book/${id}`, {
    cache: 'force-cache',
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const book: BookData = await response.json();

  return {
    title: `${book.title} - 한입북스`,
    description: `${book.description}`,
    openGraph: {
      title: `${book.title} - 한입북스`,
      description: `${book.description}`,
      images: [book.coverImgUrl],
    },
  };
}

export async function generateStaticParams() {
  try {
    const response = await fetch(`${SERVER_URL}/book`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const books: BookData[] = await response.json();

    return books.map((book) => ({ id: String(book.id) }));
  } catch (err) {
    console.error('책 목록을 불러오는데 실패하였습니다.', err);
    return [];
  }
}

const BookDetail = async ({ bookId }: { bookId: string }) => {
  const response = await fetch(`${SERVER_URL}/book/${bookId}`, {
    cache: 'force-cache',
  });
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
        <div
          style={{
            position: 'relative',
            width: 275,
            height: 350,
          }}
        >
          <Image
            src={book?.coverImgUrl}
            alt={`도서 ${book.coverImgUrl}의 상세 이미지`}
            fill
          />
        </div>
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

const ReviewList = async ({ bookId }: { bookId: string }) => {
  const response = await fetch(`${SERVER_URL}/review/book/${bookId}`, {
    next: { tags: [`review-${bookId}`] },
  });
  if (!response.ok) {
    throw new Error(`Review fetch failed ${response.statusText}`);
  }
  const reviewList: ReviewData[] = await response.json();

  return (
    <section>
      {reviewList.map((review) => (
        <ReviewItem key={review.id} {...review} />
      ))}
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
      <ReviewList bookId={id} />
    </div>
  );
}
