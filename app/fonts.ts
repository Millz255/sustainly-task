import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

export const gilroy = localFont({
  src: [
    {
      path: '../public/fonts/Gilroy-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Gilroy-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-gilroy',
  display: 'swap',
});

export const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});