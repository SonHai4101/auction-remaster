import { useEffect, useState } from "react";
import type { Auction } from "@/constants/types";

export const useRandomAuction = (allAuctions: Auction[] | undefined) => {
  const HOURS_INTERVAL = 3;
  const [randomAuction, setRandomAuction] = useState<Auction | null>(null);

  useEffect(() => {
    if (!allAuctions || allAuctions.length === 0) return;
    const stored = localStorage.getItem("randomAuctionData");
    const now = Date.now();

    if (stored && stored !== "undefined") {
      try {
        const parsed = JSON.parse(stored);
        const { auction, timeStamp } = parsed || {};
        const hoursPassed = (now - timeStamp) / (1000 * 60 * 60);

        if (hoursPassed < HOURS_INTERVAL && auction) {
          setRandomAuction(auction);
          return;
        }
      } catch (err) {
        // if stored value is invalid JSON (for example the string 'undefined'), clear it
        localStorage.removeItem("randomAuctionData");
      }
    }
    const randomIndex = Math.floor(Math.random() * allAuctions.length);
    const auction = allAuctions[randomIndex];

    setRandomAuction(auction);
    localStorage.setItem(
      "randomAuctionData",
      JSON.stringify({ auction, timeStamp: now })
    );
  }, [allAuctions?.length]);

  return randomAuction;
};
