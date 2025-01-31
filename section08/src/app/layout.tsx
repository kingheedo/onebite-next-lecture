import './globals.css';
import Link from 'next/link';
import style from './layout.module.css';
import { SERVER_URL } from '@/constants/server-url';
import { BookData } from '@/types';
import { ReactNode } from 'react';

async function Footer() {
  const response = await fetch(`${SERVER_URL}/book`, { cache: 'force-cache' });
  if (!response.ok) {
    return <footer>제작 @winterlood</footer>;
  }
  // throw new Error();

  const allBooks: BookData[] = await response.json();
  const bookCounts = allBooks.length;

  return (
    <footer>
      <div>제작 @winterlood</div>
      <div>{bookCounts}개의 도서가 등록되어 있습니다.</div>
    </footer>
  );
}

export default function RootLayout({
  modal,
  children,
}: Readonly<{
  modal: ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={'/'}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
        {modal}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
