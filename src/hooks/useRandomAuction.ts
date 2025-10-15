import { useEffect, useState } from "react";
import type { Auction } from "@/constants/types";

export const useRandomAuction = (allAuctions: Auction[] | undefined) => {
  const HOURS_INTERVAL = 3;
  const [randomAuction, setRandomAuction] = useState<Auction | null>(null);

  useEffect(() => {
    if (!allAuctions || allAuctions.length === 0) return;

    const activeAuctions = allAuctions.filter((auction) => auction.status === "ACTIVE");
    if (activeAuctions.length === 0) {
      setRandomAuction(null);
      localStorage.removeItem("randomAuctionData");
      return;
    }
    
    const stored = localStorage.getItem("randomAuctionData");
    const now = Date.now();

    if (stored && stored !== "undefined") {
      try {
        const parsed = JSON.parse(stored);
        const { auction, timeStamp } = parsed || {};
        const hoursPassed = (now - timeStamp) / (1000 * 60 * 60);

        if (hoursPassed < HOURS_INTERVAL && activeAuctions) {
          setRandomAuction(auction);
          return;
        }
      } catch (err) {
        // if stored value is invalid JSON (for example the string 'undefined'), clear it
        localStorage.removeItem("randomAuctionData");
      }
    }
    const randomIndex = Math.floor(Math.random() * activeAuctions.length);
    const auction = activeAuctions[randomIndex];

    setRandomAuction(auction);
    localStorage.setItem(
      "randomAuctionData",
      JSON.stringify({ auction, timeStamp: now })
    );
  }, [allAuctions?.length, JSON.stringify(allAuctions?.map((a) => a.status))]);

  return randomAuction;
};
