"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bid, NFT } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const MOCK_BIDS: (Bid & { nft: NFT })[] = [
  {
    id: '1',
    nftId: '1',
    bidder: '0x123...',
    amount: 0.5,
    timestamp: new Date(),
    nft: {
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
  },
];

export default function MyBidsPage() {
  const [bids] = useState(MOCK_BIDS);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8"
        >
          My Bids
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800 rounded-lg overflow-hidden"
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NFT</TableHead>
                <TableHead>Bid Amount</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bids.map((bid) => (
                <TableRow key={bid.id}>
                  <TableCell className="font-medium">{bid.nft.name}</TableCell>
                  <TableCell>{bid.amount} BTC</TableCell>
                  <TableCell>{bid.timestamp.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs bg-purple-500/20 text-purple-300">
                      {bid.nft.status === 'live' ? 'Active' : 'Ended'}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </div>
  );
}