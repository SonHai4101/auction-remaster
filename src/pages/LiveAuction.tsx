import { AuctionCard } from "@/components/AuctionCard";
import { Loader } from "@/components/retroui/Loader";
import {
  Tabs,
  TabsContent,
  TabsPanels,
  TabsTrigger,
  TabsTriggerList,
} from "@/components/retroui/Tab";
import { useEndingSoonAuctions, useGetAllAuctions } from "@/hooks/useAuction";

// const liveAuctionTabs = [
//   { label: "Ongoing" },
//   { label: "Ongoing" },
//   { label: "Ongoing" },
// ]

export const LiveAuction = () => {
  const { data: allActiveAuctions, isLoading } = useGetAllAuctions({
    page: 1,
    limit: 9999,
    status: "ACTIVE",
  });
  console.log("auction", allActiveAuctions);

  const endingSoonAuctions = useEndingSoonAuctions(allActiveAuctions?.data, 1);

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
            <TabsTrigger>ALL AUCTIONS</TabsTrigger>
            <TabsTrigger>ACTIVE</TabsTrigger>
            <TabsTrigger>ENDING SOON</TabsTrigger>
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
          <TabsContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                <div className="h-[150px] grid col-span-full place-content-center">
                  <Loader />
                </div>
              ) : allActiveAuctions?.data ? (
                allActiveAuctions.data.map((item) => (
                  <AuctionCard key={item.id} auction={item} type="user" />
                ))
              ) : (
                <div className="h-[150px] grid col-span-full place-content-center">
                  No auctions found in this category
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                <div className="h-[150px] grid col-span-full place-content-center">
                  <Loader />
                </div>
              ) : allActiveAuctions?.data ? (
                allActiveAuctions.data
                  .filter(
                    (item) =>
                      !endingSoonAuctions.some((end) => end.id === item.id)
                  )
                  .map((item) => (
                    <AuctionCard key={item.id} auction={item} type="user" />
                  ))
              ) : (
                <div className="h-[150px] grid col-span-full place-content-center">
                  No auctions found in this category
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent>
            {isLoading ? (
              <div className="h-[150px] grid place-content-center">
                <Loader />
              </div>
            ) : endingSoonAuctions.length > 0 ? (
              endingSoonAuctions.map((item) => (
                <AuctionCard key={item.id} auction={item} type="user" />
              ))
            ) : (
              <div className="h-[150px] grid place-content-center">
                No auctions found in this category
              </div>
            )}
          </TabsContent>
        </TabsPanels>
      </Tabs>
    </div>
  );
};
