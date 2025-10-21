import { AuctionGrid } from "@/components/AuctionGrid";
import { BidDialog } from "@/components/BidDialog";
import { notifyError, notifySuccess } from "@/components/CustomToast";
import {
  Tabs,
  TabsContent,
  TabsPanels,
  TabsTrigger,
  TabsTriggerList,
} from "@/components/retroui/Tab";
import { useEndingSoonAuctions, useGetAllAuctions } from "@/hooks/useAuction";
import { useCreateBid } from "@/hooks/useBid";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useState } from "react";

type BiddingForm = {
  auctionId: string;
  amount: number;
  isAutoBid: boolean;
  maxAmount: number;
};

export const LiveAuction = () => {
  const { data: allActiveAuctions, isLoading } = useGetAllAuctions({
    page: 1,
    limit: 9999,
    status: "ACTIVE",
  });
  const [selectAuction, setSelectAuction] = useState<string | null>(null);
  const endingSoonAuctions = useEndingSoonAuctions(allActiveAuctions?.data, 1);
  const tabs = [
    { label: "ALL AUCTIONS", filter: allActiveAuctions?.data },
    {
      label: "ACTIVE",
      filter: allActiveAuctions?.data.filter(
        (item) => !endingSoonAuctions.some((end) => end.id === item.id)
      ),
    },
    { label: "ENDING SOON", filter: endingSoonAuctions },
  ];
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
    <div>
      <section className="bg-background">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-8 bg-red-400 border-3 border-black animate-pulse animation-duration-[1s]"></div>
            <span className="font-black text-red-400 text-sm">LIVE NOW</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-black mb-4">
            Live Auctions
          </h1>
          <p className="text-lg font-bold text-gray-700 max-w-2xl">
            Join thousands of bidders in real-time auctions. Watch prices climb,
            place your bids, and win premium items as they happen.
          </p>
        </div>
      </section>
      <Tabs>
        <div className="w-screen sticky top-20 left-0 z-40 -mx-[50vw] bg-background border-y-4 border-black py-5">
          <TabsTriggerList className="items-center max-w-[1202px] mx-auto">
            <span className="font-black text-black text-sm">FILTER:</span>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.label}>{tab.label}</TabsTrigger>
            ))}
            <div className="ml-auto text-sm font-black text-gray-600">
              {allActiveAuctions?.data.length} auction
              {allActiveAuctions?.data && allActiveAuctions.data.length > 0
                ? "s"
                : ""}{" "}
              live
            </div>
          </TabsTriggerList>
        </div>
        <TabsPanels>
          {tabs.map((tab) => (
            <TabsContent key={tab.label}>
              <AuctionGrid
                auctions={tab.filter}
                isLoading={isLoading}
                onBid={setSelectAuction}
              />
            </TabsContent>
          ))}
        </TabsPanels>
        <BidDialog
          selectAuction={selectAuction}
          setSelectAuction={setSelectAuction}
          handleBid={handleBid}
          pendingBid={pendingBid}
        />
      </Tabs>
    </div>
  );
};
