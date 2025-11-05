import { Accordion } from "./retroui/Accordion";
import { Badge } from "./retroui/Badge";
import { Text } from "./retroui/Text";
import { Button } from "./retroui/Button";
import { FaCheck } from "react-icons/fa6";
import { CgClose } from "react-icons/cg";
import type { SellRequest } from "@/constants/types";
import { formatDateTime } from "@/utils/GetTime";

interface AuctionRequestCardProps {
  auctionRequest: SellRequest;
  onApproved: () => void;
  onRejected: () => void;
}

export const AuctionRequestCard = ({
  auctionRequest,
  onApproved,
  onRejected,
}: AuctionRequestCardProps) => {
  return (
    <Accordion.Item value={auctionRequest.id}>
      <Accordion.Header className="items-center">
        <div>
          <div className="flex items-center gap-2">
            {auctionRequest.productName}
            <Badge
              className={`text-black font-normal border-2 ${
                auctionRequest.status === "PENDING"
                  ? "bg-yellow-300"
                  : auctionRequest.status === "APPROVE"
                  ? "bg-green-300"
                  : "bg-red-300"
              }`}
            >
              {auctionRequest.status}
            </Badge>
          </div>
          <Text className="text-start">
            {auctionRequest.user.username} • {auctionRequest.category.name}
          </Text>
        </div>
      </Accordion.Header>
      <Accordion.Content className="border-t-4">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between gap-4">
            <div className="flex flex-col gap-2 w-full">
              <Text as="h6" className="border-b-2 py-2">
                ITEM DETAIL
              </Text>
              <Text>
                <span className="font-extrabold">Request ID:</span>{" "}
                {auctionRequest.id}
              </Text>
              <Text>
                <span className="font-extrabold">Category:</span>{" "}
                {auctionRequest.category.name}
              </Text>
              <Text>
                <span className="font-extrabold">Condition:</span>{" "}
                {auctionRequest.condition}
              </Text>
              <Text>
                <span className="font-extrabold">Duration:</span>{" "}
                {auctionRequest.duration}
              </Text>
              <Text>
                <span className="font-extrabold">Starting Bid:</span>{" "}
                {auctionRequest.startPrice}
              </Text>
              <Text>
                <span className="font-extrabold">Buy Now:</span>{" "}
                {auctionRequest.buyNowPrice}
              </Text>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Text as="h6" className="border-b-2 py-2">
                SELLER INFO
              </Text>
              <Text>
                <span className="font-extrabold">Name:</span>{" "}
                {auctionRequest.user.username}
              </Text>
              <Text>
                <span className="font-extrabold">Email:</span>{" "}
                {auctionRequest.user.email}
              </Text>
              <Text>
                <span className="font-extrabold">Submitted:</span>{" "}
                {formatDateTime(auctionRequest.createdAt)}
              </Text>
            </div>
          </div>
          <div className="flex flex-col gap-2 border-b-4 pb-5">
            <Text as="h6" className="border-b-2 py-2">
              DESCRIPTION
            </Text>
            <div className="p-3 bg-[#e8e4df] border-2">
              {auctionRequest.description}
            </div>
          </div>
          {auctionRequest.images.length > 0 && (
            <div className="flex flex-col gap-2">
              <Text as="h6" className="border-b-2 py-2">
                ITEM IMAGES
              </Text>
              <div className="flex gap-3 ">
                {auctionRequest.images.map((item) => (
                  <img
                    key={item.id}
                    src={item.url || "/placeholder.svg"}
                    alt={`Preview ${item.id}`}
                    className="border-2 h-32 object-cover"
                  />
                ))}
              </div>
            </div>
          )}
          {auctionRequest.status === "PENDING" && (
            <div className="flex justify-between gap-4">
              <Button
                onClick={() => onApproved()}
                className="w-full justify-center bg-green-400 gap-2"
              >
                <FaCheck />
                Approve
              </Button>
              <Button
                onClick={() => onRejected()}
                className="w-full justify-center bg-red-400 gap-2"
              >
                <CgClose />
                Reject
              </Button>
            </div>
          )}
        </div>
      </Accordion.Content>
    </Accordion.Item>
  );
};
