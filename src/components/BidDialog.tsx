import React from "react";
import { Dialog } from "./retroui/Dialog";
import { Text } from "./retroui/Text";
import { DynamicForm } from "./admin/DynamicForm";

type BiddingForm = {
  auctionId: string;
  amount: number;
  isAutoBid: boolean;
  maxAmount: number;
};

interface BidDialogProps {
  selectAuction: string | null;
  setSelectAuction: React.Dispatch<React.SetStateAction<string | null>>;
  handleBid: (data: BiddingForm) => void;
  pendingBid: boolean;
}

const bidField = [
  {
    name: "auctionId",
    label: "Auction ID",
    required: true,
    placeholder: "",
    readOnly: true,
  },
  {
    name: "amount",
    label: "Amount",
    required: true,
    placeholder: "Enter your amount",
  },
  {
    name: "isAutoBid",
    label: "Auto Bit",
    required: false,
    type: "switch",
  },
  {
    name: "maxAmount",
    label: "Your maximum payment amount",
    required: false,
    placeholder: "Enter the maximum you can pay",
  },
];

export const BidDialog = ({
  selectAuction,
  setSelectAuction,
  handleBid,
  pendingBid,
}: BidDialogProps) => {
  return (
    <Dialog
      open={!!selectAuction}
      onOpenChange={(i) => !i && setSelectAuction(null)}
    >
      <Dialog.Content size={"md"}>
        <Dialog.Header>
          <Text as="h5">Create Bid</Text>
        </Dialog.Header>
        {selectAuction && (
          <DynamicForm
            key={selectAuction}
            fields={bidField}
            onSubmit={handleBid}
            submitLabel={pendingBid ? "Bidding..." : "Bid"}
            defaultValues={{ auctionId: selectAuction }}
          />
        )}
      </Dialog.Content>
    </Dialog>
  );
};
