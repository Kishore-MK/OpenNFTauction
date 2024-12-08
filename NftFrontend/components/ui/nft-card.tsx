"use client";

import { NFT } from '@/lib/types';
import { Card } from './card';
import { Button } from './button';
import { Timer, ArrowUpRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './dialog';
import { Input } from './input';

interface NFTCardProps {
  nft: NFT;
  onBid?: (amount: number) => void;
}

export function NFTCard({ nft, onBid }: NFTCardProps) {
  const [bidAmount, setBidAmount] = useState(nft.minBid);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
        <div className="relative aspect-square group">
          <img
            src={nft.image}
            alt={nft.name}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <motion.button
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white"
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart
              className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`}
            />
          </motion.button>
        </div>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">{nft.name}</h3>
            <p className="text-sm text-gray-400">{nft.description}</p>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400">Current Bid</p>
              <p className="text-2xl font-bold text-purple-400">
                {nft.currentBid} BTC
              </p>
            </div>
            <div className="flex items-center text-gray-400">
              <Timer className="w-4 h-4 mr-1" />
              <span className="text-sm">
                {new Date(nft.endTime).toLocaleString()}
              </span>
            </div>
          </div>
          
          {nft.status === 'live' && (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700 transition-colors duration-300"
                  variant="default"
                >
                  Place Bid
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 text-white border border-purple-500/20">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">Place a Bid</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 p-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">
                      Bid Amount (BTC)
                    </label>
                    <Input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(Number(e.target.value))}
                      min={nft.minBid}
                      step="0.00001"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                    <p className="text-sm text-gray-400">
                      Minimum bid: {nft.minBid} BTC
                    </p>
                  </div>
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => onBid?.(bidAmount)}
                  >
                    Confirm Bid
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </Card>
    </motion.div>
  );
}