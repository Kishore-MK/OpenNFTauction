"use client";

import { useState } from 'react';
import { NFTCard } from '@/components/ui/nft-card';
import { motion } from 'framer-motion';
import { NFT } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { CreateAuctionDialog } from '@/components/ui/create-auction-dialog';

const MOCK_MY_NFTS: NFT[] = [
  {
    id: '3',
    name: 'My Ordinal #3',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500&h=500',
    description: 'My personal Ordinal NFT',
    currentBid: 0,
    minBid: 0.8,
    endTime: new Date(Date.now() + 86400000),
    status: 'live',
    owner: '0x789...',
  },
];

export default function MyNFTsPage() {
  const [nfts] = useState<NFT[]>(MOCK_MY_NFTS);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold"
          >
            My NFTs
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Auction
            </Button>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.map((nft) => (
            <NFTCard key={nft.id} nft={nft} />
          ))}
        </div>
      </div>
      
      <CreateAuctionDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}