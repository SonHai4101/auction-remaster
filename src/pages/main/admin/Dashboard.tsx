import { Button } from "@/components/retroui/Button";
import { Dialog } from "@/components/retroui/Dialog";
import { Text } from "@/components/retroui/Text";
import { useCreateAuction } from "@/hooks/admin/useAdmin";
import { TiPlus } from "react-icons/ti";
import { toIOSTime } from "@/utils/ConvertUnit";
import { useGetAllAuctions } from "@/hooks/useAuction";
import { DynamicForm } from "@/components/admin/DynamicForm";
import { useState } from "react";
import { Loader } from "@/components/retroui/Loader";
import { AuctionCard } from "@/components/AuctionCard";

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

  console.log("all auction", allAuctions);

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
          <Dialog.Content size={"md"}>
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

      <div className="grid grid-cols-4 gap-4 mt-5 p-5 border-4 border-double">
        {isLoading ? (
          <Loader />
        ) : allAuctions && allAuctions.data.length > 0 ? (
          allAuctions?.data?.map((item) => (
            <AuctionCard key={item.id} auction={item} />
          ))
        ) : (
          <div className="h-[150px] grid place-content-center">
            <Text as="h4">No auction found :'(</Text>
          </div>
        )}
      </div>
    </div>
  );
};
