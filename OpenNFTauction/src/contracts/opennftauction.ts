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
    slice,
    pubKey2Addr,
    toByteString,
} from 'scrypt-ts'

import Transaction = bsv.Transaction
import Script = bsv.Script

// Enum for Auction status
enum AuctionStatus {
    CREATED,
    LISTED,
    BIDDING,
    SOLD,
}

// Auction type definition
type Auction = {
    readonly nftId: ByteString
    owner: PubKey
    auctionStatus: AuctionStatus
    minimumBid: bigint
    currentBid: bigint
    currentHighestBidder: PubKey
    readonly auctionDeadline: bigint
}

export class OpenNFTAuction extends SmartContract {
    // Dynamic array of auctions
    @prop(true)
    a: bigint

    constructor() {
        super(...arguments)

        // Initialize with an empty array
        this.a = 10n
    }

    @method()
    public createAuction(
        nftId: ByteString,
        owner: PubKey,
        minimumBid: bigint,
        auctionDeadline: bigint
    ) {
        // Create new auction
        const newAuction: Auction = {
            nftId: nftId,
            owner: owner,
            auctionStatus: AuctionStatus.CREATED,
            minimumBid: minimumBid,
            currentBid: 0n,
            currentHighestBidder: owner,
            auctionDeadline: auctionDeadline,
        }

        // Add auction to array
        // this.a.push(newAuction);

        // Verify outputs
        let outputs = this.buildStateOutput(1n)
        outputs += this.buildChangeOutput()

        assert(
            hash256(outputs) == this.ctx.hashOutputs,
            'hashOutputs check failed'
        )

        // Return the index of the newly created auction
        // Note: This is a conceptual return, as Scrypt doesn't support direct returns
    }
}
//   // Method to list an existing auction
//   @method()
//   public list(auctionIndex: bigint, lister: PubKey) {
//     // Validate auction index
//     assert(
//       auctionIndex < this.a.length,
//       "Invalid auction index"
//     );

//     // Get the specific auction
//     let auction = this.a[Number(auctionIndex)];

//     // Ensure only owner can list
//     assert(lister == auction.owner, "Only owner can list the NFT");

//     // Update auction status
//     auction.auctionStatus = AuctionStatus.LISTED;

//     // Update auction in array
//     this.a[Number(auctionIndex)] = auction;

//     // Verify outputs
//     let outputs = this.buildStateOutput(1n);
//     outputs += this.buildChangeOutput();

//     assert(
//       hash256(outputs) == this.ctx.hashOutputs,
//       "hashOutputs check failed"
//     );
//   }

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
