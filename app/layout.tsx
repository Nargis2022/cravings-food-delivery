import './globals.css';
import { CartProvider } from '@/components/CartContext';
import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';

const inter = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cravings — Good food, good mood',
  description: 'Thoughtfully made meals from the best local kitchens, brought warm to your doorstep.',
  openGraph: {
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}><CartProvider>{children}</CartProvider></body>
    </html>
  );
}
