export interface NFT {
  id: string;
  name: string;
  image: string;
  description: string;
  currentBid: number;
  minBid: number;
  endTime: Date;
  status: 'live' | 'ended';
  owner: string;
}

export interface Bid {
  id: string;
  nftId: string;
  bidder: string;
  amount: number;
  timestamp: Date;
}

export interface WalletState {
  connected: boolean;
  address: string | null;
  balance: number;
  nfts: NFT[];
}