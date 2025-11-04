import { AuctionRequestCard } from "@/components/AuctionRequestCard";
import { Accordion } from "@/components/retroui/Accordion";
import { Card } from "@/components/retroui/Card";
import { Loader } from "@/components/retroui/Loader";
import {
  Tabs,
  TabsContent,
  TabsPanels,
  TabsTrigger,
  TabsTriggerList,
} from "@/components/retroui/Tab";
import { Text } from "@/components/retroui/Text";
import { useGetAllSellRequest } from "@/hooks/useSellRequest";

const requestTabs = [
  { key: "TOTAL", bg: "white", des: "Total Request", label: "All Request" },
  { key: "PENDING", bg: "yellow-300", des: "Pending", label: "Pending" },
  { key: "APPROVE", bg: "green-300", des: "Approved", label: "Approved" },
  { key: "REJECT", bg: "red-300", des: "Rejected", label: "Rejected" },
];

export const Request = () => {
  const { data: allSellRequest, isLoading: loadingSellRequest } =
    useGetAllSellRequest();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-between pb-5 border-b-4">
        <Text as="h2">Auction Request</Text>
        <Text as="h6">Manage Seller Requests</Text>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {requestTabs.map((item) => {
          const count =
            item.key === "TOTAL"
              ? allSellRequest?.length || 0
              : allSellRequest?.filter((i) => i.status === item.key).length ||
                0;
          return (
            <Card
              className={`grid place-content-center text-center bg-${item.bg}`}
            >
              <Card.Header>
                <Card.Title>{count}</Card.Title>
                <Card.Description>{item.des}</Card.Description>
              </Card.Header>
            </Card>
          );
        })}
      </div>
      <Tabs>
        <TabsTriggerList>
          {requestTabs.map((item) => (
            <TabsTrigger key={item.key}>{item.label}</TabsTrigger>
          ))}
        </TabsTriggerList>
        <TabsPanels>
          {requestTabs.map((item) => {
            const filterData =
              item.key === "TOTAL"
                ? allSellRequest
                : allSellRequest?.filter((req) => req.status === item.key);
            return (
              <TabsContent>
                <Accordion
                  type="single"
                  collapsible
                  className="space-y-4 w-full"
                >
                  {loadingSellRequest ? (
                    <div className="h-[150px] grid place-content-center">
                      <Loader />
                    </div>
                  ) : filterData && filterData?.length > 0 ? (
                    filterData?.map((item) => (
                      <AuctionRequestCard key={item.id} auctionRequest={item} />
                    ))
                  ) : (
                    <div className="h-[150px] grid place-content-center">
                      No Request found
                    </div>
                  )}
                </Accordion>
              </TabsContent>
            );
          })}
        </TabsPanels>
      </Tabs>
    </div>
  );
};
