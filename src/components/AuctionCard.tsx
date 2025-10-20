import { Card } from "./retroui/Card";
import { formatNumber } from "@/utils/ConvertUnit";
import { Button } from "./retroui/Button";
import type { Auction } from "@/constants/types";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  TbArrowBadgeLeftFilled,
  TbArrowBadgeRightFilled,
} from "react-icons/tb";
import { CountDownTimer } from "./CountDownTimer";
import { VscEdit } from "react-icons/vsc";
import { Loader } from "./retroui/Loader";
import { PiTrashSimpleFill } from "react-icons/pi";
import {
  useChangeAuctionStatus,
  useDeleteAuction,
} from "@/hooks/admin/useAdmin";
import { useBuyNow } from "@/hooks/useBid";
import { Select } from "./retroui/Select";
import { notifyError, notifySuccess } from "./CustomToast";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useModal } from "@ebay/nice-modal-react";
import { AnnouncementModal } from "./AnnouncementModal";

interface AuctionCardProps {
  auction: Auction;
  onEdit?: (auction: Auction) => void;
  onBid?: (auctionId: string) => void;
  type?: "admin" | "user";
}

export const AuctionCard = ({
  auction,
  onEdit,
  onBid,
  type = "admin",
}: AuctionCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { mutate: deleteAuction, isPending: deletePending } =
    useDeleteAuction();
  const images = auction.product?.images || [];
  const { mutate: buyNow } = useBuyNow();
  const { mutate: changeAuctionStatus, isPending: pendingChangeStatus } =
    useChangeAuctionStatus();
  const modal = useModal(AnnouncementModal);

  const handleBuyNow = () => {
    modal.show({
      title: <>Buy this {auction.product.title}</>,
      description: (
        <>
          Do you want to buy this item for ${" "}
          {formatNumber(Number(auction.buyNowPrice))}?
        </>
      ),
      confirmButtonText: "Absolutely!!!",
      cancelButtonText: "Nah!",
      onCancel: () => modal.hide(),
      onConfirm: () => {
        buyNow(auction.id, {
          onSuccess: () => {
            notifySuccess("Buy successfully");
          },
          onError(error) {
            notifyError(getErrorMessage(error));
          },
        });
      },
    });
  };

  const handleDelete = () => {
    modal.show({
      title: <>Delete {auction.title}</>,
      description: "Are you sure???",
      confirmButtonText: "Absolutely!!!",
      cancelButtonText: "Nah!",
      onCancel: () => modal.hide(),
      onConfirm: () => {
        deleteAuction(auction.id, {
          onSuccess: () => {
            notifySuccess("Delete successfully");
          },
          onError(error) {
            notifyError(getErrorMessage(error));
          },
        });
      },
    });
  };

  const handleChange = (status: string) => {
    changeAuctionStatus(
      { auctionId: auction.id, body: { status } },
      {
        onSuccess: () => {
          notifySuccess("Change successfully");
        },
        onError(error) {
          notifyError(getErrorMessage(error));
        },
      }
    );
  };

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div>
      <Card className="max-w-[350px] shadow-none hover:shadow-none">
        <Card.Content className="relative pb-0">
          {auction.product?.images?.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.img
                key={auction.product?.images?.[currentImageIndex]?.id}
                src={
                  auction.product?.images?.[currentImageIndex]?.url ||
                  "/icon/item-icon.png"
                }
                alt={`Post image ${currentImageIndex + 1}`}
                className="w-[310px] h-[310px] object-cover border-2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.2 }}
              />
            </AnimatePresence>
          ) : (
            <img
              src="/icon/item-icon.png"
              className="w-[310px] h-[310px] object-cover border-2"
              alt="Gameboy"
            />
          )}
          {new Date(auction.endTime).getTime() - Date.now() <=
            60 * 60 * 1000 && (
            <div className="absolute bottom-0 w-[310px] h-[310px] bg-red-500/30 flex items-center justify-center">
              <span className="text-red-500 text-3xl font-semibold animate-blink">
                Ending Soon
              </span>
            </div>
          )}
          {auction.product?.images?.length > 1 && (
            <>
              <Button
                size="icon"
                className="absolute top-1/2 left-1.5 -translate-y-1/2 hover:-translate-y-2"
                onClick={() =>
                  setCurrentImageIndex((prev) =>
                    prev === 0 ? auction.product?.images?.length - 1 : prev - 1
                  )
                }
              >
                <TbArrowBadgeLeftFilled className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                className="absolute top-1/2 right-1.5 -translate-y-1/2 hover:-translate-y-2"
                onClick={() =>
                  setCurrentImageIndex((prev) =>
                    prev === auction.product?.images?.length - 1 ? 0 : prev + 1
                  )
                }
              >
                <TbArrowBadgeRightFilled className="w-4 h-4" />
              </Button>
            </>
          )}
        </Card.Content>
        <Card.Header className="pb-0">
          <Card.Title>{auction.product.title}</Card.Title>
        </Card.Header>
        <Card.Content
          className={`flex flex-col gap-3 justify-between ${
            type === "admin" ? "py-0" : ""
          }`}
        >
          <p className="text-lg font-semibold">{auction.description}</p>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <p className="text-lg font-semibold">Current:</p>
              <p className="text-lg font-semibold">
                ${" "}
                {auction.bids && auction.bids.length > 0
                  ? formatNumber(
                      Math.max(...auction.bids.map((bid) => Number(bid.amount)))
                    )
                  : formatNumber(Number(auction.startPrice))}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg font-semibold">Buy now:</p>
              <p className="text-lg font-semibold">
                $ {formatNumber(Number(auction.buyNowPrice))}
              </p>
            </div>
          </div>
          {auction.status === "ENDED" && (
            <div className="flex justify-between">
              <p className="text-lg font-semibold">Winner:</p>
              <p className="text-lg font-semibold">
                {auction?.winner?.username ?? "None"}
              </p>
            </div>
          )}
          {auction.status === "ACTIVE" && (
            <div className="flex justify-between">
              <p className="text-lg font-semibold">Time left:</p>
              <div className="text-lg font-semibold text-red-500">
                <CountDownTimer endTime={auction.endTime} />
              </div>
            </div>
          )}
          <div className="flex justify-between items-center mb-auto">
            <p>
              Status:{" "}
              <span
                className={
                  auction.status === "ACTIVE"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {" "}
                {auction.status}
              </span>
            </p>
            {type === "user" && auction.status === "ACTIVE" && (
              <div className="flex gap-2">
                <Button
                  className="w-fit text-sm"
                  onClick={() => onBid?.(auction.id)}
                >
                  Bid
                </Button>
                <Button
                  className="w-fit text-sm"
                  variant="secondary"
                  onClick={handleBuyNow}
                >
                  Buy now
                </Button>
              </div>
            )}
            {type === "admin" && (
              <Select
                onValueChange={handleChange}
                disabled={pendingChangeStatus}
              >
                <Select.Trigger className="text-sm">
                  <Select.Value placeholder="Change status" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Group>
                    <Select.Item value="ACTIVE">ACTIVE</Select.Item>
                    <Select.Item value="DRAFT">DRAFT</Select.Item>
                    <Select.Item value="CANCELLED">CANCELLED</Select.Item>
                    <Select.Item value="PENDING">PENDING</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select>
            )}
          </div>
        </Card.Content>
        {type === "admin" && (
          <Card.Content className="flex gap-2 flex-none justify-end">
            <Button
              className="bg-destructive text-white hover:bg-destructive/90"
              onClick={handleDelete}
            >
              {deletePending ? (
                <div className="h-[150px] grid place-content-center">
                  <Loader />
                </div>
              ) : (
                <>
                  <PiTrashSimpleFill className="h-4 w-4 mr-2" /> Delete
                </>
              )}
            </Button>
            <Button
              className="bg-amber-600 text-white hover:bg-amber-500"
              onClick={() => onEdit?.(auction)}
            >
              <VscEdit className="h-4 w-4 mr-2" /> Edit
            </Button>
          </Card.Content>
        )}
      </Card>
    </div>
  );
};
