"use client";

import { motion } from 'framer-motion';
import { Diamond, Sparkles, Bitcoin, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0D0D2F] overflow-hidden relative">
      <div className="relative max-w-6xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <div className="relative mb-12">
            <motion.div
              className="relative"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <Diamond className="w-32 h-32 text-purple-500 mx-auto mb-8" />
              <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 text-purple-300/20" />
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-7xl font-bold mb-6 text-white"
          >
            Ordinals NFT Auctions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-purple-200/80 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Discover, bid, and collect unique Bitcoin Ordinals NFTs in our
            decentralized auction platform. Connect your UniSat wallet to start
            bidding!
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Bitcoin,
                title: "Bitcoin Native",
                description: "Built on Bitcoin, secured by the strongest network",
              },
              {
                icon: Diamond,
                title: "Rare Ordinals",
                description: "Access to exclusive and rare digital artifacts",
              },
              {
                icon: Wallet,
                title: "Easy Bidding",
                description: "Simple and secure bidding with UniSat wallet",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.2 }}
                className="glass p-6 rounded-xl text-center"
              >
                <feature.icon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-purple-200/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="relative"
          >
            <Link href="/auctions">
              <Button className="bg-purple-600 hover:bg-purple-700 text-lg px-12 py-6 rounded-full">
                Explore Auctions
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}