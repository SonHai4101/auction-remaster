import { Card } from "./retroui/Card";
import { formatNumber } from "@/utils/ConvertUnit";
import { Button } from "./retroui/Button";
import type { Auction } from "@/constants/types";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  TbArrowBadgeLeftFilled,
  TbArrowBadgeRightFilled,
} from "react-icons/tb";
import { CountDownTimer } from "./CountDownTimer";

interface AuctionCardProps {
  auction: Auction;
}

export const AuctionCard = ({ auction }: AuctionCardProps) => {
  const [timeLeft, setTimeLeft] = useState()
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  return (
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
              className="size-60 object-cover border-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.2 }}
            />
          </AnimatePresence>
        ) : (
          <img
            src="/icon/item-icon.png"
            className="size-52 object-cover border-2"
            alt="Gameboy"
          />
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
      <Card.Content className="flex flex-col gap-3 pt-0 justify-between">
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
              {auction.winner ?? "None"}
            </p>
          </div>
        )}
        {auction.status === "ACTIVE" && (
          <div className="flex justify-between">
            <p className="text-lg font-semibold">Time left:</p>
            <p className="text-lg font-semibold text-red-500">
              <CountDownTimer endTime={auction.endTime} />
            </p>
          </div>
        )}
        <div className="flex justify-between items-center mb-auto">
          <p>
            Status:{" "}
            <span
              className={
                auction.status === "ACTIVE" ? "text-green-500" : "text-red-500"
              }
            >
              {" "}
              {auction.status}
            </span>
          </p>
          {auction.status === "ACTIVE" && (
            <Button className="w-fit">Bid</Button>
          )}
        </div>
      </Card.Content>
    </Card>
  );
};
