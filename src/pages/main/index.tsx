import { AuctionCard } from "@/components/AuctionCard";
import { Button } from "@/components/retroui/Button";
import { Loader } from "@/components/retroui/Loader";
import { Text } from "@/components/retroui/Text";
import { useGetAllAuctions } from "@/hooks/useAuction";
import { useCreateBid } from "@/hooks/useBid";
import { useRandomAuction } from "@/hooks/useRandomAuction";
import { useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { notifyError, notifySuccess } from "@/components/CustomToast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { BidDialog } from "@/components/BidDialog";

type BiddingForm = {
  auctionId: string;
  amount: number;
  isAutoBid: boolean;
  maxAmount: number;
};

export const index = () => {
  const [selectAuction, setSelectAuction] = useState<string | null>(null);
  const { data: allAuctions, isLoading: loadingAuctions } = useGetAllAuctions({
    page: 1,
    limit: 9999,
  });
  const randomAuction = useRandomAuction(
    allAuctions?.data.filter(
      (item) => item.status === "ACTIVE" || item.status === "ENDED"
    ) ?? undefined
  );
  const { mutate: createBid, isPending: pendingBid } = useCreateBid();
  const handleBid = (data: BiddingForm) => {
    createBid(
      {
        auctionId: data.auctionId,
        body: {
          amount: Number(data.amount),
          isAutoBid: data.isAutoBid,
          maxAmount: Number(data.maxAmount),
        },
      },
      {
        onSuccess: () => {
          setSelectAuction(null);
          notifySuccess("Bid placed successfully");
        },
        onError(error) {
          notifyError(getErrorMessage(error));
        },
      }
    );
  };

  return (
    <>
      <div className="w-full items-center mt-10">
        <div className="flex w-full justify-between p-10">
          <div className="flex flex-col gap-4 flex-1 p-6">
            <div className="flex gap-3 bg-amber-400 items-center w-fit py-1 px-2 rounded-md">
              <FaArrowTrendUp />
              <Text>Trusted by 50,000+ collectors</Text>
            </div>
            <div className="flex flex-col gap-3">
              <Text as="h1" className="text-[52px]">
                Discover Premium
              </Text>
              <Text as="h1" className="text-amber-400 text-[52px]">
                Auction Items
              </Text>
            </div>
            <Text className="max-w-[512px]">
              Join the world's most trusted auction platform. Bid on rare
              collectibles, luxury items, and unique treasures from verified
              sellers worldwide.
            </Text>

            <div className="flex gap-3 mt-6">
              <Button variant="secondary">Start Bidding</Button>
              <Button>Browse Auction</Button>
            </div>

            <div className="flex justify-between border-t-2 p-10 mt-6">
              <div>
                <Text as="h5" className="text-center">
                  $2.4M+
                </Text>
                <Text>Items Sold</Text>
              </div>

              <div>
                <Text as="h5" className="text-center">
                  15K+
                </Text>
                <Text>Active Users</Text>
              </div>
              <div>
                <Text as="h5" className="text-center">
                  99.8%
                </Text>
                <Text>Success Rate</Text>
              </div>
            </div>
          </div>

          <div className="flex-1 text-center">
            {loadingAuctions ? (
              <div className="grid place-content-center">
                <Loader />
              </div>
            ) : randomAuction ? (
              <AuctionCard
                auction={randomAuction}
                type="user"
                onBid={setSelectAuction}
              />
            ) : (
              <div className="h-[150px] grid place-content-center">
                <Text as="h4">No auctions at the moment :'(</Text>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-3">
            <Text as="h3">Featured Auctions</Text>
            <Text>
              Discover exceptional items from our curated selection of premium
              auctions
            </Text>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {loadingAuctions ? (
              <div className="grid place-content-center">
                <Loader />
              </div>
            ) : allAuctions &&
              allAuctions.data.filter(
                (item) => item.status === "ACTIVE" || item.status === "ENDED"
              ).length > 0 ? (
              allAuctions?.data
                ?.filter((item) => item.status === "ACTIVE")
                .map((item) => (
                  <AuctionCard
                    key={item.id}
                    auction={item}
                    type="user"
                    onBid={setSelectAuction}
                    // onEdit={setEditAuction}
                  />
                ))
            ) : (
              <div className="h-[150px] grid col-span-full place-content-center">
                <Text as="h4">No auctions at the moment :'(</Text>
              </div>
            )}
            <BidDialog
              selectAuction={selectAuction}
              setSelectAuction={setSelectAuction}
              handleBid={handleBid}
              pendingBid={pendingBid}
            />
          </div>
        </div>
        <div className="grid place-content-center my-10">
          <Button variant="outline">View All Auctions</Button>
        </div>
      </div>
    </>
  );
};
