// app/layout.js
import './styles/globals.css';
import './styles/theme.css';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'My Portfolio',
  description: 'Website Portofolio dengan Tema Gelap dan Terang',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
