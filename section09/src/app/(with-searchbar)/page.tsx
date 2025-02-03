import BookItem from '@/components/book-item';
import style from './page.module.css';
import { BookData } from '@/types';
import { SERVER_URL } from '@/constants/server-url';
import { Suspense } from 'react';
import BookListSkeleton from '@/components/skeleton/book-list-skeleton';
import { Metadata } from 'next';

// export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '한입 북스',
  description: '한입 북스에 등록된 도서를 만나보세요',
  openGraph: {
    title: '한입 북스',
    description: '한입 북스에 등록된 도서를 만나보세요',
    images: ['/thumbnail.png'], // public 폴더 내부의 파일을 가르킴
  },
};

const AllBooks = async () => {
  const response = await fetch(`${SERVER_URL}/book`, {
    cache: 'force-cache',
  });
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }
  const allBooks: BookData[] = await response.json();
  return allBooks.map((book) => <BookItem key={book.id} {...book} />);
};

const RecommendBooks = async () => {
  const response = await fetch(`${SERVER_URL}/book/random`, {
    next: { revalidate: 3 },
  });
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }
  const books: BookData[] = await response.json();

  return books.map((book) => <BookItem key={book.id} {...book} />);
};

export default async function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {/* <Suspense fallback={<BookListSkeleton count={3} />}> */}
        <RecommendBooks />
        {/* </Suspense> */}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {/* <Suspense fallback={<BookListSkeleton count={10} />}> */}
        <AllBooks />
        {/* </Suspense> */}
      </section>
    </div>
  );
}
