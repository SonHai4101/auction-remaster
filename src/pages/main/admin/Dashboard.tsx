import { Button } from "@/components/retroui/Button";
import { Dialog } from "@/components/retroui/Dialog";
import { Text } from "@/components/retroui/Text";
import { useCreateAuction, useUpdateAuction } from "@/hooks/admin/useAdmin";
import { TiPlus } from "react-icons/ti";
import { toIOSTime } from "@/utils/ConvertUnit";
import { useGetAllAuctions } from "@/hooks/useAuction";
import { DynamicForm } from "@/components/admin/DynamicForm";
import { useState } from "react";
import { Loader } from "@/components/retroui/Loader";
import { AuctionCard } from "@/components/AuctionCard";
import {
  Tabs,
  TabsContent,
  TabsPanels,
  TabsTrigger,
  TabsTriggerList,
} from "@/components/retroui/Tab";
import type { Auction } from "@/constants/types";
import { notifyError, notifySuccess } from "@/components/CustomToast";
import { getErrorMessage } from "@/utils/getErrorMessage";

type AuctionForm = {
  title: string;
  description: string;
  startPrice: number;
  buyNowPrice: number;
  startTime: string;
  endTime: string;
  productId: string;
};

const auctionFields = [
  {
    name: "title",
    label: "Title",
    required: true,
    placeholder: "Type title",
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Type description",
  },
  { name: "startPrice", label: "Start Price", type: "number" },
  {
    name: "buyNowPrice",
    label: "Buy Now Price",
    type: "number",
    required: true,
  },
  {
    name: "startTime",
    label: "Start Time",
    type: "datetime-local",
    required: true,
  },
  {
    name: "endTime",
    label: "End Time",
    type: "datetime-local",
    required: true,
  },
  {
    name: "productId",
    label: "Product Id",
    required: true,
    placeholder: "Type product Id",
  },
];

const auctionTabs = [
  { label: "Ongoing", status: "ACTIVE", color: "text-green-500" },
  { label: "Pending", status: "PENDING", color: "text-blue-400" },
  { label: "Ended", status: "ENDED", color: "text-red-600" },
  { label: "Draft", status: "DRAFT", color: "text-gray-600" },
  { label: "Cancelled", status: "CANCELLED", color: "text-yellow-500" },
];

export const Dashboard = () => {
  const { data: allAuctions, isLoading } = useGetAllAuctions({
    page: 1,
    limit: 9999,
  });
  const { mutate: createAuction } = useCreateAuction();
  const [open, setOpen] = useState(false);
  const { mutate: updateAuction, isPending: updatePending } =
    useUpdateAuction();
  const [editAuction, setEditAuction] = useState<Auction | null>(null);

  const onSubmit = (data: AuctionForm) => {
    createAuction(
      {
        ...data,
        startPrice: Number(data.startPrice),
        buyNowPrice: Number(data.buyNowPrice),
        startTime: toIOSTime(data.startTime),
        endTime: toIOSTime(data.endTime),
      },
      {
        onSuccess: () => {
          setOpen(false);
          notifySuccess("Create auction successfully");
        },
        onError(error) {
          notifyError(getErrorMessage(error));
        },
      }
    );
  };

  const handleUpdateAuction = async (data: AuctionForm) => {
    if (!editAuction) return;
    updateAuction(
      {
        auctionId: editAuction.id,
        body: {
          title: data.title,
          description: data.description,
          startPrice: Number(data.startPrice),
          buyNowPrice: Number(data.buyNowPrice),
          startTime: toIOSTime(data.startTime),
          endTime: toIOSTime(data.endTime),
          productId: data.productId,
        },
      },
      {
        onSuccess: () => {
          setEditAuction(null);
        },
      }
    );
  };

  return (
    <div>
      <div className="flex justify-between">
        <Text as="h2">Dashboard</Text>
        <Dialog open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <Button>
              <TiPlus />
              &nbsp;Create
            </Button>
          </Dialog.Trigger>
          <Dialog.Content size={"auto"}>
            <Dialog.Header position={"fixed"}>
              <Text as="h5">Create a new auction</Text>
            </Dialog.Header>
            <DynamicForm
              fields={auctionFields}
              onSubmit={onSubmit}
              submitLabel="Create"
            />
          </Dialog.Content>
        </Dialog>
      </div>

      <div className=" mt-5 p-5 border-4 border-double">
        <Tabs>
          <TabsTriggerList>
            {auctionTabs.map((tab) => (
              <TabsTrigger key={tab.status}>{tab.label}</TabsTrigger>
            ))}
          </TabsTriggerList>
          <TabsPanels>
            {auctionTabs.map((tab) => {
              const filterAuctions = allAuctions?.data.filter(
                (auction) => auction.status === tab.status
              );
              return (
                <TabsContent key={tab.status}>
                  <Text
                    as="h3"
                    className={`${tab.color} ${
                      tab.status === "ACTIVE"
                        ? "animate-pulse animation-duration-[0.5s]"
                        : ""
                    } `}
                  >
                    {tab.label} Auction
                  </Text>
                  <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 mt-2 ">
                    {isLoading ? (
                      <div className="grid place-content-center">
                        <Loader />
                      </div>
                    ) : filterAuctions && filterAuctions.length > 0 ? (
                      filterAuctions?.map((item) => (
                        <AuctionCard
                          key={item.id}
                          auction={item}
                          onEdit={setEditAuction}
                        />
                      ))
                    ) : (
                      <div className="h-[150px] grid place-content-center">
                        <Text as="h4">No auction found :'(</Text>
                      </div>
                    )}
                  </div>
                </TabsContent>
              );
            })}
          </TabsPanels>
        </Tabs>
        <Dialog
          open={!!editAuction}
          onOpenChange={(i) => !i && setEditAuction(null)}
        >
          <Dialog.Content size={"md"}>
            <Dialog.Header>
              <Text as="h5">Edit product</Text>
            </Dialog.Header>
            {editAuction && (
              <DynamicForm
                key={editAuction.id}
                fields={auctionFields}
                onSubmit={handleUpdateAuction}
                submitLabel={updatePending ? "Saving..." : "Save"}
                defaultValues={{
                  title: editAuction.title,
                  description: editAuction.description,
                  startPrice: editAuction.startPrice,
                  buyNowPrice: editAuction.buyNowPrice,
                  startTime: editAuction.startTime,
                  endTime: editAuction.endTime,
                  productId: editAuction.productId,
                }}
              />
            )}
          </Dialog.Content>
        </Dialog>
      </div>
    </div>
  );
};
