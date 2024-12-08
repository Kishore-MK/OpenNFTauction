"use client";

import { useState } from 'react';
import { Button } from './button';
import { Wallet } from 'lucide-react';
import { connectUnisat } from '@/lib/wallet';
import { useToast } from '@/hooks/use-toast';

export function WalletButton() {
  const [address, setAddress] = useState<string | null>(null);
  const { toast } = useToast();

  const handleConnect = async () => {
    try {
      const userAddress = await connectUnisat();
      setAddress(userAddress);
      toast({
        title: "Wallet Connected",
        description: `Connected to ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`,
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Please make sure you have Unisat wallet installed",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={handleConnect}
      className="bg-purple-600 hover:bg-purple-700 text-white font-semibold"
    >
      <Wallet className="mr-2 h-4 w-4" />
      {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Connect Wallet"}
    </Button>
  );
}