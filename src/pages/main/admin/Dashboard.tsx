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

export const Dashboard = () => {
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
            <TabsTrigger>Ongoing</TabsTrigger>
            <TabsTrigger>End</TabsTrigger>
            <TabsTrigger>Draft</TabsTrigger>
            <TabsTrigger>Cancel</TabsTrigger>
          </TabsTriggerList>
          <TabsPanels>
            <TabsContent>
              <Text
                as="h3"
                className="text-green-500 animate-pulse animation-duration-[0.5s]"
              >
                Ongoing auction
              </Text>
              <div className="grid grid-cols-3 gap-4 mt-2 ">
                {isLoading ? (
                  <div className="grid place-content-center">
                    <Loader />
                  </div>
                ) : allAuctions &&
                  allAuctions.data.filter((item) => item.status === "ACTIVE")
                    .length > 0 ? (
                  allAuctions?.data
                    ?.filter((item) => item.status === "ACTIVE")
                    .map((item) => (
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
            <TabsContent>
              <Text as="h3" className="text-red-600">
                Ended auction
              </Text>
              <div className="grid grid-cols-3 gap-4 mt-2 ">
                {isLoading ? (
                  <div className="grid place-content-center">
                    <Loader />
                  </div>
                ) : allAuctions &&
                  allAuctions.data.filter((item) => item.status === "ENDED")
                    .length > 0 ? (
                  allAuctions?.data
                    ?.filter((item) => item.status === "ENDED")
                    .map((item) => (
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
            <TabsContent>
              <Text as="h3" className="text-gray-600">
                Pending Auction
              </Text>
              <div className="grid grid-cols-3 gap-4 mt-2 ">
                {isLoading ? (
                  <div className="grid place-content-center">
                    <Loader />
                  </div>
                ) : allAuctions &&
                  allAuctions.data.filter((item) => item.status === "DRAFT")
                    .length > 0 ? (
                  allAuctions?.data
                    ?.filter((item) => item.status === "DRAFT")
                    .map((item) => (
                      <AuctionCard
                        key={item.id}
                        auction={item}
                        onEdit={setEditAuction}
                      />
                    ))
                ) : (
                  <div className="h-[150px] grid col-span-full place-content-center">
                    <Text as="h4">No auction found :'(</Text>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent>
              <Text as="h3" className="text-yellow-500">
                Cancelled Auction
              </Text>
              <div className="grid grid-cols-3 gap-4 mt-2 ">
                {isLoading ? (
                  <div className="grid place-content-center">
                    <Loader />
                  </div>
                ) : allAuctions &&
                  allAuctions.data.filter((item) => item.status === "CANCELLED")
                    .length > 0 ? (
                  allAuctions?.data
                    ?.filter((item) => item.status === "CANCELLED")
                    .map((item) => (
                      <AuctionCard
                        key={item.id}
                        auction={item}
                        onEdit={setEditAuction}
                      />
                    ))
                ) : (
                  <div className="h-[150px] grid col-span-full place-content-center">
                    <Text as="h4">No auction found :'(</Text>
                  </div>
                )}
              </div>
            </TabsContent>
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
