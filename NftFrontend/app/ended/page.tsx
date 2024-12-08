"use client";

import { useState } from 'react';
import { NFTCard } from '@/components/ui/nft-card';
import { motion } from 'framer-motion';
import { NFT } from '@/lib/types';

const MOCK_ENDED_NFTS: NFT[] = [
  {
    id: '2',
    name: 'Ordinal Gem #2',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500&h=500',
    description: 'A beautiful Ordinal Gem NFT',
    currentBid: 1.2,
    minBid: 1.0,
    endTime: new Date(Date.now() - 86400000),
    status: 'ended',
    owner: '0x456...',
  },
];

export default function EndedAuctionsPage() {
  const [nfts] = useState<NFT[]>(MOCK_ENDED_NFTS);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8"
        >
          Ended Auctions
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.map((nft) => (
            <NFTCard key={nft.id} nft={nft} />
          ))}
        </div>
      </div>
    </div>
  );
}