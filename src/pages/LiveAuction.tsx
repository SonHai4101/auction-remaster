import { AuctionCard } from "@/components/AuctionCard";
import { Loader } from "@/components/retroui/Loader";
import {
  Tabs,
  TabsContent,
  TabsPanels,
  TabsTrigger,
  TabsTriggerList,
} from "@/components/retroui/Tab";
import { useGetAllAuctions } from "@/hooks/useAuction";

// const liveAuctionTabs = [
//   { label: "Ongoing" },
//   { label: "Ongoing" },
//   { label: "Ongoing" },
// ]

export const LiveAuction = () => {
  const { data: allActiveAuctions, isLoading } = useGetAllAuctions({
    page: 0,
    limit: 9999,
    status: "ACTIVE",
  });
  console.log("auction", allActiveAuctions);
  
  return (
    <div>
      <section className="bg-background border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-8 bg-accent border-3 border-black animate-pulse"></div>
            <span className="font-black text-accent text-sm">LIVE NOW</span>
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

      <section className="bg-background border-b-4 border-black sticky top-20 z-40">
        <Tabs>
          <TabsTriggerList>
            <span className="font-black text-black text-sm">FILTER:</span>
            <TabsTrigger>ALL AUCTIONS</TabsTrigger>
            <TabsTrigger>ACTIVE</TabsTrigger>
            <TabsTrigger>ENDING SOON</TabsTrigger>
            <div className="ml-auto text-sm font-black text-gray-600">
              {allActiveAuctions?.data.length} auctions live
            </div>
          </TabsTriggerList>
          <TabsPanels>
            <TabsContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                  <div className="h-[150px] grid place-content-center">
                    <Loader />
                  </div>
                ) : allActiveAuctions?.data ? (
                  allActiveAuctions.data.map((item) => (
                    <AuctionCard key={item.id} auction={item} />
                  ))
                ) : (
                  <div className="h-[150px] grid place-content-center">
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
              ) : allActiveAuctions?.data ? (
                allActiveAuctions.data
                  .filter(
                    (i) =>
                      new Date(i.endTime).getTime() - Date.now() >
                      60 * 60 * 1000
                  )
                  .map((item) => <AuctionCard key={item.id} auction={item} />)
              ) : (
                <div className="h-[150px] grid place-content-center">
                  No auctions found in this category
                </div>
              )}
            </TabsContent>
            <TabsContent>
              {isLoading ? (
                <div className="h-[150px] grid place-content-center">
                  <Loader />
                </div>
              ) : allActiveAuctions?.data ? (
                allActiveAuctions.data
                  .filter(
                    (i) =>
                      new Date(i.endTime).getTime() - Date.now() <
                      60 * 60 * 1000
                  )
                  .map((item) => <AuctionCard key={item.id} auction={item} />)
              ) : (
                <div className="h-[150px] grid place-content-center">
                  No auctions found in this category
                </div>
              )}
            </TabsContent>
          </TabsPanels>
        </Tabs>
      </section>
    </div>
  );
};
