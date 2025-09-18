import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Text } from "@/components/retroui/Text";
import { FaArrowTrendUp } from "react-icons/fa6";

export const index = () => {
  return (
    <>
      <div className="w-full items-center mt-10">
        <div className="flex w-full justify-between p-10">
          <div className="flex flex-col gap-4 flex-1 p-6">
            <div className="flex gap-3 bg-amber-400 items-center w-fit py-1 px-2 rounded-md">
              <FaArrowTrendUp />
              <Text>Trusted by 50,000+ collectors</Text>
            </div>
            <div className="flex flex-col gap-3">
              <Text as="h1" className="text-[52px]">
                Discover Premium
              </Text>
              <Text as="h1" className="text-amber-400 text-[52px]">
                Auction Items
              </Text>
            </div>
            <Text className="max-w-[512px]">
              Join the world's most trusted auction platform. Bid on rare
              collectibles, luxury items, and unique treasures from verified
              sellers worldwide.
            </Text>

            <div className="flex gap-3 mt-6">
              <Button variant="secondary">Start Bidding</Button>
              <Button>Browse Auction</Button>
            </div>

            <div className="flex justify-between border-t-2 p-10 mt-6">
              <div>
                <Text as="h5" className="text-center">$2.4M+</Text>
                <Text>Items Sold</Text>
              </div>

              <div>
                <Text as="h5" className="text-center">15K+</Text>
                <Text>Active Users</Text>
              </div>
              <div>
                <Text as="h5" className="text-center">99.8%</Text>
                <Text>Success Rate</Text>
              </div>
            </div>
          </div>

          <div className="flex-1 text-center">
            <Card className="w-[450px] shadow-none hover:shadow-none">
              <Card.Content className="pb-0">
                <img
                  src="/icon/item-icon.png"
                  className="w-full h-full"
                  alt="Gameboy"
                />
              </Card.Content>
              <Card.Header className="pb-0 text-start">
                <Card.Title>Classic 8-bit Gameboy</Card.Title>
              </Card.Header>
              <Card.Content className="flex justify-between items-center">
                <p className="text-lg font-semibold">$29.90</p>
                <Button>Add to cart</Button>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};
