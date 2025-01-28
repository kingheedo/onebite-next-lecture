import BookItem from '@/components/book-item';
import { SERVER_URL } from '@/constants/server-url';
import { BookData } from '@/types';

const SearchBooks = async ({ query }: { query?: string }) => {
  const response = await fetch(`${SERVER_URL}/book/search?q=${query}`, {
    cache: 'force-cache',
  });

  if (!response.ok) {
    return <div>도서 검색에 실패하였습니다...</div>;
  }
  const books: BookData[] = await response.json();
  return books.map((book) => <BookItem key={book.id} {...book} />);
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  const { q } = await searchParams;
  return (
    <div>
      <SearchBooks query={q} />
    </div>
  );
}
