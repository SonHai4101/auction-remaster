import { DynamicForm } from "@/components/admin/DynamicForm";
import { AuctionCard } from "@/components/AuctionCard";
import { Button } from "@/components/retroui/Button";
import { Dialog } from "@/components/retroui/Dialog";
import { Loader } from "@/components/retroui/Loader";
import { Text } from "@/components/retroui/Text";
import type { Auction } from "@/constants/types";
import { useGetAllAuctions } from "@/hooks/useAuction";
import { useCreateBid } from "@/hooks/useBid";
import { useRandomAuction } from "@/hooks/useRandomAuction";
import { useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";

export const index = () => {
  const bidField = [
    {
      name: "amount",
      label: "Amount",
      required: true,
      placeholder: "Enter your amount",
    },
    {
      name: "isAutoBid",
      label: "Auto Bit",
      required: true,
      type: "switch"
    },
    {
      name: "maxAmount",
      label: "Your maximum payment amount",
      required: true,
      placeholder: "Enter the maximum you can pay",
    },
  ];
  const [selectAuction, setSelectAuction] = useState<Auction | null>(null);
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
    // const handleBid = () => {
    //   createBid({ auctionId: auction.id, body: {
        
    //   }})
    // } 


  const handleBid = () => {

  }
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
              <AuctionCard auction={randomAuction} type="user" />
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
          <div className="grid grid-cols-4 gap-4">
            {loadingAuctions ? (
              <div className="grid place-content-center">
                <Loader />
              </div>
            ) : allAuctions &&
              allAuctions.data.filter((item) => item.status === "ACTIVE" || item.status === "ENDED")
                .length > 0 ? (
              allAuctions?.data
                ?.filter((item) => item.status === "ACTIVE")
                .map((item) => (
                  <AuctionCard
                    key={item.id}
                    auction={item}
                    type="user"
                    // onEdit={setEditAuction}
                  />
                ))
            ) : (
              <div className="h-[150px] grid place-content-center">
                <Text as="h4">No auctions at the moment :'(</Text>
              </div>
            )}
            <Dialog
            open={!!selectAuction}
            onOpenChange={(i) => !i && setSelectAuction(null)}
          >
            <Dialog.Content size={"md"}>
              <Dialog.Header>
                <Text as="h5">Edit product</Text>
              </Dialog.Header>
              {selectAuction && (
                <DynamicForm
                  key={selectAuction.id}
                  fields={bidField}
                  onSubmit={handleBid}
                  submitLabel={pendingBid ? "Bidding..." : "Bid"}
                />
              )}
            </Dialog.Content>
          </Dialog>
          </div>
        </div>
        <div className="grid place-content-center my-10">
          <Button variant="outline">View All Auctions</Button>
        </div>
      </div>
    </>
  );
};
