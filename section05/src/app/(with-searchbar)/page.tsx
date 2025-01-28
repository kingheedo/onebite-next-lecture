import BookItem from '@/components/book-item';
import style from './page.module.css';
import { BookData } from '@/types';
import { SERVER_URL } from '@/constants/server-url';

// export const dynamic = 'force-dynamic';

const AllBooks = async () => {
  const response = await fetch(`${SERVER_URL}/book`, { cache: 'force-cache' });
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
        <RecommendBooks />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  );
}
