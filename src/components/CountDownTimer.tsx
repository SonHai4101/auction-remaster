import { getTimeRemaining } from "@/utils/GetTime";
import { useEffect, useState } from "react";

interface CountDownTimerProps {
  endTime: string;
}

export const CountDownTimer = ({ endTime }: CountDownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(endTime));
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining(endTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  if (timeLeft.total <= 0) {
    return <span className="text-red-500 font-semibold">Expired</span>;
  }
  return (
    <div>
      {timeLeft.days > 0 && <span>{timeLeft.days}d </span>}
      <span>
        {String(timeLeft.hours).padStart(2, "0")}:
        {String(timeLeft.minutes).padStart(2, "0")}:
        {String(timeLeft.seconds).padStart(2, "0")}
      </span>
    </div>
  );
};
