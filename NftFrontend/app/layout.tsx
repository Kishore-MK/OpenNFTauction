import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { WalletButton } from '@/components/ui/wallet-button';
import Link from 'next/link';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ordinals NFT Auctions',
  description: 'Discover and bid on unique Bitcoin Ordinals NFTs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="fixed w-full bg-gray-900/80 backdrop-blur-md z-50">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-white">
              Open NFT 
            </Link>
            <nav className="space-x-6">
              <Link href="/auctions" className="text-gray-300 hover:text-white">
                Live Auctions
              </Link>
              <Link href="/ended" className="text-gray-300 hover:text-white">
                Ended Auctions
              </Link>
              <Link href="/my-nfts" className="text-gray-300 hover:text-white">
                My Auctions
              </Link>
              <Link href="/my-bids" className="text-gray-300 hover:text-white">
                My Bids
              </Link>
              <WalletButton />
            </nav>
          </div>
        </header>
        <main className="pt-16">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}