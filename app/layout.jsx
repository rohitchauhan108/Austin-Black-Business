import './globals.css';
import { Suspense } from 'react';
import { SearchProvider } from '../components/SearchContext.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import SearchModal from '../components/SearchModal.jsx';

export const metadata = {
  title: 'Austin Black Business Journal & Community News magazine',
  description: "The premier digital magazine celebrating African American excellence, Black-owned businesses, healthcare pioneers, Finance champions, and tech innovators across Austin and Central Texas.",
  openGraph: {
    title: 'Austin Black Business Journal & Community News magazine',
    description: "The premier digital magazine celebrating African American excellence, Black-owned businesses, healthcare pioneers, Finance champions, and tech innovators across Austin and Central Texas.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const viewport = {
  themeColor: '#8B0000',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Playfair+Display:ital,wght@0,600..900;1,600..900&family=Plus+Jakarta+Sans:ital,wght@0,400..800;1,400..800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#F8F7F4] text-[#171717] antialiased selection:bg-[#8B0000] selection:text-white">
        <SearchProvider>
          <div className="min-h-screen flex flex-col bg-[#F8F7F4] text-[#171717]">
            <Suspense fallback={null}>
              <Header />
            </Suspense>
            <main className="flex-1">{children}</main>
            <Footer />
            <Suspense fallback={null}>
              <SearchModal />
            </Suspense>
          </div>
        </SearchProvider>
      </body>
    </html>
  );
}
