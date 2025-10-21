import { useState } from "react";
import { useCreateBid } from "./useBid";
import { notifyError, notifySuccess } from "@/components/CustomToast";
import { getErrorMessage } from "@/utils/getErrorMessage";

type BiddingForm = {
  auctionId: string;
  amount: number;
  isAutoBid: boolean;
  maxAmount: number;
};

export const useBidForm = () => {
  const [selectAuction, setSelectAuction] = useState<string | null>(null);
  const { mutate: createBid, isPending: pendingBid } = useCreateBid();
  const handleBid = (data: BiddingForm) => {
    createBid(
      {
        auctionId: data.auctionId,
        body: {
          amount: Number(data.amount),
          isAutoBid: data.isAutoBid,
          maxAmount: Number(data.maxAmount),
        },
      },
      {
        onSuccess: () => {
          setSelectAuction(null);
          notifySuccess("Bid placed successfully");
        },
        onError(error) {
          notifyError(getErrorMessage(error));
        },
      }
    );
  };
  return { selectAuction, setSelectAuction, handleBid, pendingBid };
};
