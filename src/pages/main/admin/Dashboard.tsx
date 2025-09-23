import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Dialog } from "@/components/retroui/Dialog";
import { Input } from "@/components/retroui/Input";
import { Text } from "@/components/retroui/Text";
import { useCreateAuction } from "@/hooks/admin/useAdmin";
import { TiPlus } from "react-icons/ti";
import { useForm } from "react-hook-form";
import { toIOSTime } from "@/utils/ConvertToIOSTime";

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
  const autionCard = [
    {
      id: 1,
      img: "/icon/item-icon.png",
      name: "Vintage Ferrari Model",
      description: "Rare 1:18 scale Ferrari collection from the 1960s",
      currentBid: "$850",
      bidder: "12 bidders",
    },
    {
      id: 2,
      img: "/icon/item-icon.png",
      name: "Vintage Ferrari Model",
      description: "Rare 1:18 scale Ferrari collection from the 1960s",
      currentBid: "$850",
      bidder: "12 bidders",
    },
    {
      id: 3,
      img: "/icon/item-icon.png",
      name: "Vintage Ferrari Model",
      description: "Rare 1:18 scale Ferrari collection from the 1960s",
      currentBid: "$850",
      bidder: "12 bidders",
    },
    {
      id: 4,
      img: "/icon/item-icon.png",
      name: "Vintage Ferrari Model",
      description: "Rare 1:18 scale Ferrari collection from the 1960s",
      currentBid: "$850",
      bidder: "12 bidders",
    },
  ];
  const { mutate: createAuction } = useCreateAuction();
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   createAuction();
  // }
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuctionForm>();
  const onSubmit = (data: AuctionForm) => {
    const payload = {
      ...data,
      startTime: toIOSTime(data.startTime),
      endTime: toIOSTime(data.endTime),
    };
    createAuction(payload, {
      onSuccess: () => {
        reset();
      },
    });
  };
  console.log(errors);
  return (
    <div className="">
      <div className="flex justify-between">
        <Text as="h2">Dashboard</Text>
        <Dialog>
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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col p-4 gap-4">
                <div className="flex-col gap-2">
                  <label htmlFor="name">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Type title"
                    {...register("title", { required: "Title is required" })}
                  />
                  {errors.title && (
                    <span className="text-red-500">{errors.title.message}</span>
                  )}
                </div>
                <div className="flex-col gap-2">
                  <label htmlFor="name">Description</label>
                  <Input
                    placeholder="Type description"
                    {...register("description")}
                  />
                </div>
                <div className="flex-col gap-2">
                  <label htmlFor="name">Start Price</label>
                  <Input
                    type="number"
                    placeholder="Type start price"
                    {...register("startPrice", { valueAsNumber: true })}
                  />
                </div>
                <div className="flex-col gap-2">
                  <label htmlFor="name">
                    Buy Now Price <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Type buy now price"
                    {...register("buyNowPrice", {
                      required: "Buy Now Price is required",
                      valueAsNumber: true,
                    })}
                  />
                  {errors.buyNowPrice && (
                    <span className="text-red-500">
                      {errors.buyNowPrice.message}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <div className="flex-col gap-2">
                    <label htmlFor="name">
                      Start Time <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="datetime-local"
                      {...register("startTime", {
                        required: "start Time is required",
                      })}
                    />
                    {errors.startTime && (
                      <span className="text-red-500">
                        {errors.startTime.message}
                      </span>
                    )}
                  </div>
                  <div className="flex-col gap-2">
                    <label htmlFor="name">
                      End Time <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="datetime-local"
                      {...register("endTime", {
                        required: "End Time is required",
                      })}
                    />
                    {errors.endTime && (
                      <span className="text-red-500">
                        {errors.endTime.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex-col gap-2">
                  <label htmlFor="name">
                    Product Id <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Type product Id"
                    {...register("productId", {
                      required: "Product Id isbuyNowPrice required",
                    })}
                  />
                  {errors.productId && (
                    <span className="text-red-500">
                      {errors.productId.message}
                    </span>
                  )}
                </div>
              </div>
              <Dialog.Footer>
                <Dialog.Trigger asChild>
                  <Button type="submit">Create</Button>
                </Dialog.Trigger>
              </Dialog.Footer>
            </form>
          </Dialog.Content>
        </Dialog>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-5 p-5 border-4 border-double">
        {autionCard.map((item) => (
          <Card className="max-w-[350px] shadow-none hover:shadow-none">
            <Card.Content className="pb-0">
              <img src={item.img} className="w-full h-full" alt="Gameboy" />
            </Card.Content>
            <Card.Header className="pb-0">
              <Card.Title>{item.name}</Card.Title>
            </Card.Header>
            <Card.Content className="flex flex-col gap-3 items-center pt-0">
              <p className="text-lg font-semibold">{item.description}</p>
              <div className="flex justify-between items-center w-full">
                <p className="text-lg font-semibold">{item.currentBid}</p>
                <Button>Add to cart</Button>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>
    </div>
  );
};
