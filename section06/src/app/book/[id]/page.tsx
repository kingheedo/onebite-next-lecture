import { SERVER_URL } from '@/constants/server-url';
import style from './page.module.css';
import { BookData } from '@/types';
import { notFound } from 'next/navigation';

// export const dynamicParams = false;

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

const bookDetail = async ({ bookId }: { bookId: number }) => {
  const response = await fetch(`${SERVER_URL}/book/${bookId}`);
  if (!response.ok) {
    if (response.status === 404) {
      //데이터가 없을 때 not found 페이지로 이동
      notFound();
    }
    return null;
  }
  const book: BookData = await response.json();
  return book;
};

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  const { id } = await params;

  const book = await bookDetail({
    bookId: Number(id),
  });

  return (
    <div className={style.container}>
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
    </div>
  );
}
