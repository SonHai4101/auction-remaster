

import type { Auction } from '@/constants/types'
import { Loader } from './retroui/Loader';
import { AuctionCard } from './AuctionCard';
import { Text } from './retroui/Text';

interface AuctionGridProps {
  auctions?: Auction[],
  isLoading?: boolean,
  emptyMessage?: string;
  onBid: (auctionId: string) => void;
}

export const AuctionGrid = ({
  auctions,
  isLoading,
  emptyMessage = "No auctions found in this category",
  onBid
}: AuctionGridProps) => {
  if (isLoading) return (
    <div className="h-[150px] grid col-span-full place-content-center">
        <Loader />
      </div>
  )

  if (!auctions || auctions.length === 0) return (
    <div className="h-[150px] grid col-span-full place-content-center">
        <Text>{emptyMessage}</Text>
      </div>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {auctions.map((item) => (
        <AuctionCard key={item.id} auction={item} onBid={onBid} type="user" />
      ))}
    </div>
  )

}
