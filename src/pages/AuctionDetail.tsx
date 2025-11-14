import { CountDownTimer } from "@/components/CountDownTimer";
import { Badge } from "@/components/retroui/Badge";
import { Button } from "@/components/retroui/Button";
import { Label } from "@/components/retroui/Label";
import { Loader } from "@/components/retroui/Loader";
import { Text } from "@/components/retroui/Text";
import { useGetAuctionById } from "@/hooks/useAuction";
import { useCreateBid } from "@/hooks/useBid";
import { formatNumber } from "@/utils/ConvertUnit";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import {
  TbArrowBadgeLeftFilled,
  TbArrowBadgeRightFilled,
} from "react-icons/tb";
import { useParams } from "react-router";

export const AuctionDetail = () => {
  const params = useParams<{ id: string }>();
  const auctionId = String(params.id);
  const { data: auction, isLoading } = useGetAuctionById(auctionId);
  const {  mutate: createBid } = useCreateBid();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return isLoading ? (
    <div className="h-[50vh] grid place-content-center">
      <Loader />
    </div>
  ) : auction ? (
    <div className="flex flex-col gap-16 py-16">
      <div className="grid grid-cols-3 gap-8">
        <div className="flex flex-col gap-8 col-span-2">
          <div className="border-4 p-6 relative">
            {auction.product?.images?.length > 0 ? (
              <AnimatePresence mode="wait">
                <motion.img
                  key={auction.product?.images?.[currentImageIndex]?.id}
                  src={
                    auction.product?.images?.[currentImageIndex]?.url ||
                    "/icon/item-icon.png"
                  }
                  alt={`Post image ${currentImageIndex + 1}`}
                  className="object-cover border-2 w-full"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>
            ) : (
              <img
                src="/icon/item-icon.png"
                className="w-full object-cover border-2"
                alt="Gameboy"
              />
            )}
            {new Date(auction.endTime).getTime() - Date.now() <=
              60 * 60 * 1000 &&
              auction.status === "ACTIVE" && (
                <div className="absolute bottom-0 w-[310px] h-[310px] bg-red-500/30 flex items-center justify-center">
                  <span className="bg-white px-2 py-1 text-red-500 text-xl border-2 border-red-500 font-semibold animate-blink">
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
                      prev === 0
                        ? auction.product?.images?.length - 1
                        : prev - 1
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
                      prev === auction.product?.images?.length - 1
                        ? 0
                        : prev + 1
                    )
                  }
                >
                  <TbArrowBadgeRightFilled className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
          <div className="border-4 p-6 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Text as="h3">{auction.product.title}</Text>
              <p className="text-gray-500">
                Auction #{auction?.id ?? "undefine"}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="w-full flex items-center justify-between">
                <p>Category: </p>
                <p>{auction?.product.category.name}</p>
              </div>
              <div className="w-full flex items-center justify-between">
                <p>Status: </p>
                <Badge
                  variant="outline"
                  className={`${
                    auction?.status === "PENDING"
                      ? "bg-yellow-300"
                      : auction?.status === "ACTIVE"
                      ? "bg-green-300"
                      : "bg-red-300"
                  }`}
                >
                  {auction?.status}
                </Badge>
              </div>{" "}
              <div className="w-full flex items-center justify-between">
                <p>Time Left: </p>
                <p>
                  <CountDownTimer endTime={auction?.endTime} />
                </p>
              </div>
            </div>
            <hr className="border-2"></hr>
            <Text as="h4">Description</Text>
            <p>{auction.product.description}</p>
            <div className="flex flex-col gap-3 bg-[#f5f1ed] p-4 border-2">
              <Text as="h5">Specifications</Text>
              <div className="w-full flex justify-between">
                <p>Condition:</p>
                <p>Excellent</p>
              </div>
              <hr className=""></hr>
              <div className="w-full flex justify-between">
                <p>Year:</p>
                <p>2023</p>
              </div>
              <hr className=""></hr>
              <div className="w-full flex justify-between">
                <p>Authenticity:</p>
                <p className="text-green-500">✓ Verified</p>
              </div>
              <hr className=""></hr>
              <div className="w-full flex justify-between">
                <p>Seller Rating:</p>
                <p>★★★★★ 5/5</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col border-4 p-6 gap-6">
            <Text as="h4">Place Your Bid</Text>
            <div className="flex flex-col gap-4">
              <div className="p-4 bg-[#f5f1ed] border-2">
                <p className="text-sm text-gray-500">Current Bid</p>
                <p className="text-2xl text-yellow-500 font-extrabold">
                  $
                  {auction.bids && auction.bids.length > 0
                    ? formatNumber(Number(auction.bids[0].amount))
                    : formatNumber(Number(auction.startPrice))}
                </p>
              </div>
              <div className="p-4 bg-[#f5f1ed] border-2">
                <p className="text-sm text-gray-500">Buy Now Price</p>
                <p className="text-2xl font-extrabold">
                  ${formatNumber(Number(auction.buyNowPrice))}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="yourAmount" className="text-sm font-bold">
                  Your Bid Amount
                </Label>
                <div className="flex">
                  <div className="border-2 py-2 px-4 bg-[#ffdb33]">$</div>
                  <input
                    className="w-full border-y-2 border-r-2 p-2 focus:outline-none"
                    type="text"
                    id="yourAmount"
                    placeholder="Enter amount"
                  ></input>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button className="justify-center">PLACE BID</Button>
                <Button className="justify-center" variant="secondary">
                  BUY NOW
                </Button>
              </div>
            </div>
            <hr className="border-2"></hr>
            <p className="text-sm font-bold">
              By placing a bid, you agree to our auction terms and conditions.
              Winning bids are binding.
            </p>
          </div>
          <div className="flex flex-col border-4 p-6 gap-4">
            <Text as="h4">Seller Information</Text>
            <div className="flex flex-col">
              <p className="text-sm text-gray-500">Seller</p>
              <p className="font-bold">{auction.creator.username}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-gray-500">Member Since</p>
              <p className="font-bold">2015</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-gray-500">Positive Feedback</p>
              <p className="font-bold text-yellow-500">99.8%</p>
            </div>
            <Button variant="secondary" className="mt-4 justify-center">
              CONTACT SELLER
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-6 gap-6 border-4">
        <Text as="h3">Bid History</Text>
        <div className="flex flex-col gap-3">
          <div className="w-full flex p-4 border-4 items-center bg-[#f5f1ed] justify-between">
            <div className="flex flex-col">
              <p className="text-xl font-bold">user 1</p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
            <p className="text-yellow-500">$65,000</p>
          </div>
          <div className="w-full flex p-4 border-4 items-center bg-[#f5f1ed] justify-between">
            <div className="flex flex-col">
              <p className="text-xl font-bold">user 1</p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
            <p className="text-yellow-500">$65,000</p>
          </div>
          <div className="w-full flex p-4 border-4 items-center bg-[#f5f1ed] justify-between">
            <div className="flex flex-col">
              <p className="text-xl font-bold">user 1</p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
            <p className="text-yellow-500">$65,000</p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="h-[50vh] grid place-content-center text-3xl font-bold">
      NOT FOUND
    </div>
  );
};
