import {
  assert,
  ByteString,
  hash256,
  method,
  prop,
  PubKey,
  Sig,
  SmartContract,
  Utils,
  bsv,
  pubKey2Addr,
  toByteString,
  FixedArray,
} from 'scrypt-ts';

enum AuctionStatus {
  CREATED,
  LISTED,
  BIDDING,
  SOLD,
}

type Auction = {
  readonly nftId: ByteString;
  owner: PubKey;
  auctionStatus: AuctionStatus;
  minimumBid: bigint;
  currentBid: bigint;
  currentHighestBidder: PubKey;
  readonly auctionDeadline: bigint;
};

export class OpenNFTAuction extends SmartContract {
  // Simulated dynamic array using a fixed-length array
  @prop(true)
  auctions: Auction;

  // Tracks the number of active auctions in the array
  @prop(true)
  auctionCount: bigint;

  constructor() {
      super(...arguments);

      // Initialize auctions array with default values
      const placeholderPubKey = PubKey(
          toByteString('020000000000000000000000000000000000000000000000000000000000000000')
      );

      this.auctions = {
          nftId: toByteString(''),
          owner: placeholderPubKey,
          auctionStatus: AuctionStatus.CREATED,
          minimumBid: 0n,
          currentBid: 0n,
          currentHighestBidder: placeholderPubKey,
          auctionDeadline: 0n,
      };

      
      this.auctionCount=0n;
  }

  @method()
  public createAuction(
      nftId: ByteString,
      owner: PubKey,
      minimumBid: bigint,
      auctionDeadline: bigint
  ) {
      // Ensure we don't exceed the array's capacity
      assert(this.auctionCount < 1000n, 'Maximum auction limit reached');

      // Create the new auction
      const newAuction: Auction = {
          nftId: nftId,
          owner: owner,
          auctionStatus: AuctionStatus.CREATED,
          minimumBid: minimumBid,
          currentBid: 0n,
          currentHighestBidder: owner,
          auctionDeadline: auctionDeadline,
      };

      // Add the auction at the next available index
      this.auctions= newAuction;

      // Increment the auction count
      this.auctionCount += 1n;

      // Verify outputs
      let outputs = this.buildStateOutput(1n);
      outputs += this.buildChangeOutput();

      assert(
          hash256(outputs) == this.ctx.hashOutputs,
          'hashOutputs check failed'
      );
  }

  @method()
  public list(auctionIndex: bigint, lister: PubKey) {
      // Ensure the index is valid
      assert(
          auctionIndex < this.auctionCount,
          'Invalid auction index'
      );

      const auction = this.auctions;

      // Only the owner can list
      assert(
          lister == auction.owner,
          'Only owner can list the NFT'
      );

      auction.auctionStatus = AuctionStatus.LISTED;

      this.auctions = auction;

      let outputs = this.buildStateOutput(1n);
      outputs += this.buildChangeOutput();

      assert(
          hash256(outputs) == this.ctx.hashOutputs,
          'hashOutputs check failed'
      );
  }
}


//   // Method for placing a bid
//   @method()
//   public bid(auctionIndex: bigint, bidder: PubKey, bidAmount: bigint) {
//     // Validate auction index
//     assert(
//       auctionIndex < this.a.length,
//       "Invalid auction index"
//     );

//     // Get the specific auction
//     let auction = this.a[Number(auctionIndex)];

//     // Check if NFT is listable for bidding
//     assert(
//       auction.auctionStatus == AuctionStatus.LISTED ||
//       auction.auctionStatus == AuctionStatus.BIDDING,
//       "NFT is not available for bidding"
//     );

//     // Check auction deadline
//     assert(
//       !this.timeLock(auction.auctionDeadline),
//       "Auction has already ended"
//     );

//     // Validate bid amount
//     assert(
//       bidAmount > auction.currentBid &&
//       bidAmount >= auction.minimumBid,
//       "Bid must be higher than current bid and meet minimum bid"
//     );

//     // Store previous highest bidder and bid
//     const prevHighestBidder = auction.currentHighestBidder;
//     const prevHighestBid = auction.currentBid;

//     // Update auction details
//     auction.currentHighestBidder = bidder;
//     auction.currentBid = bidAmount;
//     auction.auctionStatus = AuctionStatus.BIDDING;

//     // Update auction in array
//     this.a[Number(auctionIndex)] = auction;

//     // Prepare outputs
//     // 1. Auction contract output with updated state
//     const auctionOutput: ByteString = this.buildStateOutput(bidAmount);

//     // 2. Refund output for previous highest bidder
//     const refundOutput: ByteString = prevHighestBid > 0n
//       ? Utils.buildPublicKeyHashOutput(pubKey2Addr(prevHighestBidder),
//           prevHighestBid
//         ): toByteString("");

//     // Combine outputs
//     let outputs: ByteString = auctionOutput + refundOutput;

//     // Add change output
//     outputs += this.buildChangeOutput();

//     // Verify outputs
//     assert(
//       hash256(outputs) == this.ctx.hashOutputs,
//       "hashOutputs check failed"
//     );
//   }

//   // Method to close the auction and transfer NFT
//   @method()
//   public close(auctionIndex: bigint, sigOwner: Sig) {
//     // Validate auction index
//     assert(
//       auctionIndex < this.a.length,
//       "Invalid auction index"
//     );

//     // Get the specific auction
//     let auction = this.a[Number(auctionIndex)];

//     // Check if auction deadline is passed
//     assert(
//       this.timeLock(auction.auctionDeadline),
//       "Auction is not yet over"
//     );

//     // Verify owner's signature
//     assert(
//       this.checkSig(sigOwner, auction.owner),
//       "Invalid owner signature"
//     );

//     // If no bids were made, return to original owner
//     const finalBidder: PubKey = auction.currentBid > 0n
//       ? auction.currentHighestBidder
//       : auction.owner;

//     // Update auction status
//     auction.auctionStatus = AuctionStatus.SOLD;

//     // Update auction in array
//     this.a[Number(auctionIndex)] = auction;

//     // Prepare outputs
//     // 1. Transfer NFT (symbolically represented by 1 satoshi)
//     let outputs = Utils.buildPublicKeyHashOutput(pubKey2Addr(finalBidder), 1n);

//     // 2. Pay auction proceeds to original owner (if sold)
//     if (auction.currentBid > 0n) {
//       outputs += Utils.buildPublicKeyHashOutput(
//         pubKey2Addr(auction.owner),
//         auction.currentBid
//       );
//     }

//     // Add change output
//     outputs += this.buildChangeOutput();

//     // Verify outputs
//     assert(
//       hash256(outputs) == this.ctx.hashOutputs,
//       "hashOutputs mismatch"
//     );
//   }
// }
