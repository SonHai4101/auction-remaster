import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Dialog } from "@/components/retroui/Dialog";
import { Text } from "@/components/retroui/Text";
import { useCreateAuction } from "@/hooks/admin/useAdmin";
import { TiPlus } from "react-icons/ti";
import { useForm } from "react-hook-form";
import { formatNumber, toIOSTime } from "@/utils/ConvertUnit";
import { useGetAllAuctions } from "@/hooks/useAuction";
import { DynamicForm } from "@/components/admin/DynamicForm";
import { useState } from "react";

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
  const { data: allAuctions } = useGetAllAuctions({ page: 1, limit: 9999 });
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
          setOpen(false)
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
        {allAuctions &&
          allAuctions?.data?.map((item) => (
            <Card
              className="max-w-[350px] shadow-none hover:shadow-none"
              key={item.id}
            >
              <Card.Content className="pb-0">
                <img
                  src="/public/icon/item-icon.png"
                  className="w-full h-full"
                  alt="Gameboy"
                />
              </Card.Content>
              <Card.Header className="pb-0">
                <Card.Title>{item.product.title}</Card.Title>
              </Card.Header>
              <Card.Content className="flex flex-col gap-3 pt-0">
                <p className="text-lg font-semibold">{item.description}</p>

                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <p className="text-lg font-semibold">Current:</p>
                    <p className="text-lg font-semibold">
                      ${" "}
                      {item.bids && item.bids?.[0]?.bids
                        ? formatNumber(item.bids?.[0]?.bids)
                        : formatNumber(Number(item.startPrice))}
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-lg font-semibold">Buy now:</p>
                    <p className="text-lg font-semibold">
                      $ {formatNumber(Number(item.buyNowPrice))}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <p>
                    Status: <span className="text-red-500"> {item.status}</span>
                  </p>
                  <Button className="w-fit">Bid</Button>
                </div>
              </Card.Content>
            </Card>
          ))}
      </div>
    </div>
  );
};
