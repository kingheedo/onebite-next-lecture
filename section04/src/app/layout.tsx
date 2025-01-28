import './globals.css';
import Link from 'next/link';
import style from './layout.module.css';
import { SERVER_URL } from '@/constants/server-url';
import { BookData } from '@/types';

async function Footer() {
  const response = await fetch(`${SERVER_URL}/book`, { cache: 'no-store' });
  if (!response.ok) {
    return <footer>제작 @winterlood</footer>;
  }
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
  children,
}: Readonly<{
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
      </body>
    </html>
  );
}
