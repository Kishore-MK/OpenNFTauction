"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';

interface CreateAuctionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateAuctionDialog({ open, onOpenChange }: CreateAuctionDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    minBid: '',
    duration: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement auction creation logic here
    console.log('Creating auction:', formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 text-white border border-purple-500/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create New Auction</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="space-y-2">
            <Label htmlFor="name">NFT Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-gray-800 border-gray-700"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-gray-800 border-gray-700"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="minBid">Minimum Bid (BTC)</Label>
            <Input
              id="minBid"
              type="number"
              step="0.00001"
              value={formData.minBid}
              onChange={(e) => setFormData({ ...formData, minBid: e.target.value })}
              className="bg-gray-800 border-gray-700"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (hours)</Label>
            <Input
              id="duration"
              type="number"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="bg-gray-800 border-gray-700"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            Create Auction
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}