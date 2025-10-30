import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

type Transaction = {
  id: string;
  date: string;
  type: string;
  amount: number;
  status: string;
  auction?: { id: string; title: string; finalPrice: number };
};

export const useTransactions = () => {
  const query = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/me/transactions");
      return res.data as Transaction[];
    },
  });

  const downloadReceipt = (id: string) => {
    // Placeholder: implement real receipt download when backend is ready
    const blob = new Blob([`Receipt for ${id}`], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt-${id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return { ...query, downloadReceipt };
};


