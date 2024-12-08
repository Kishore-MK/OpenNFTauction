"use client";

import { useState, useEffect } from 'react';
import { NFTCard } from '@/components/ui/nft-card';
import { motion } from 'framer-motion';
import { NFT } from '@/lib/types';

const MOCK_NFTS: NFT[] = [
  {
    id: '1',
    name: 'Ordinal Punk #1',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500&h=500',
    description: 'A rare Ordinal Punk NFT',
    currentBid: 0.5,
    minBid: 0.6,
    endTime: new Date(Date.now() + 86400000),
    status: 'live',
    owner: '0x123...',
  },
  // Add more mock NFTs here
];

export default function AuctionsPage() {
  const [nfts, setNfts] = useState<NFT[]>(MOCK_NFTS);

  const handleBid = async (nftId: string, amount: number) => {
    // Implement bidding logic here
    console.log(`Placing bid of ${amount} BTC on NFT ${nftId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8"
        >
          Live Auctions
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.map((nft) => (
            <NFTCard
              key={nft.id}
              nft={nft}
              onBid={(amount) => handleBid(nft.id, amount)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}