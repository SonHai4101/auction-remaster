import { AuctionRequestCard } from "@/components/AuctionRequestCard";
import { notifyError, notifySuccess } from "@/components/CustomToast";
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
import type { DURATION, SellRequest } from "@/constants/types";
import { useCreateAuction } from "@/hooks/admin/useAdmin";
import { useCreateProduct } from "@/hooks/useProduct";
import {
  useApproveSellRequest,
  useGetAllSellRequest,
  useRejectSellRequest,
} from "@/hooks/useSellRequest";
import { durationToMs } from "@/utils/ConvertUnit";
import { getErrorMessage } from "@/utils/getErrorMessage";

const requestTabs = [
  { key: "TOTAL", bg: "white", des: "Total Request", label: "All Request" },
  { key: "PENDING", bg: "yellow-300", des: "Pending", label: "Pending" },
  { key: "APPROVED", bg: "green-300", des: "Approved", label: "Approved" },
  { key: "REJECTED", bg: "red-300", des: "Rejected", label: "Rejected" },
];

export const Request = () => {
  const { data: allSellRequest, isLoading: loadingSellRequest } =
    useGetAllSellRequest();
  const { mutate: approveSellRequest } = useApproveSellRequest();
  const { mutate: rejectSellRequest } = useRejectSellRequest();
  const { mutate: createProduct } = useCreateProduct();
  const { mutate: createAuction } = useCreateAuction();

  const handleApprove = (sellReq: SellRequest) => {
    approveSellRequest(sellReq.id, {
      onSuccess: () => {
        notifySuccess("The request has been approved.");

        createProduct(
          {
            categoryId: sellReq.categoryId,
            title: sellReq.productName,
            description: sellReq.description,
            images: sellReq.images.map((item) => item.url),
          },
          {
            onSuccess: (response) => {
              const productData = response.data;
              const startTime = new Date(Date.now() + 10 * 60 * 1000); // 10 mins from now
            const endTime = new Date(
              startTime.getTime() + durationToMs(sellReq.duration as DURATION)
            );
              createAuction(
                {
                  title: sellReq.productName,
                  description: sellReq.description,
                  startPrice: Number(sellReq.startPrice),
                  buyNowPrice: Number(sellReq.buyNowPrice),
                  startTime: startTime.toISOString(),
                  endTime: endTime.toISOString(),
                  productId: productData.id,
                },
                {
                  onSuccess: () => {
                    notifySuccess("Auction created successfully!");
                  },
                  onError(error) {
                    notifyError(getErrorMessage(error));
                  },
                }
              );
            },
            onError(error) {
              notifyError(getErrorMessage(error));
            },
          }
        );
      },
      onError(error) {
        notifyError(getErrorMessage(error));
      },
    });
  };
  const handleReject = (id: string) => {
    rejectSellRequest(id, {
      onSuccess: () => {
        notifySuccess("The request has been rejected.");
      },
      onError(error) {
        notifyError(getErrorMessage(error));
      },
    });
  };
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
                      <AuctionRequestCard
                        onApproved={() => handleApprove(item)}
                        onRejected={() => handleReject(item.id)}
                        key={item.id}
                        auctionRequest={item}
                      />
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
