import BookItem from '@/components/book-item';
import BookListSkeleton from '@/components/skeleton/book-list-skeleton';
import { SERVER_URL } from '@/constants/server-url';
import { BookData } from '@/types';
import { Metadata } from 'next';
import { Suspense } from 'react';

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

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;

  return {
    title: `${q} : 한입북스 검색`,
    description: `${q}의 검색 결과입니다`,
    openGraph: {
      title: `${q} : 한입북스 검색`,
      description: `${q}의 검색 결과입니다`,
      images: ['./thumbnail.png'],
    },
  };
}

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
      <Suspense key={q || ''} fallback={<BookListSkeleton count={10} />}>
        <SearchBooks query={q || ''} />
      </Suspense>
    </div>
  );
}
