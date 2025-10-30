import { Text } from "@/components/retroui/Text";
import { Table } from "@/components/retroui/Table";
import { Loader } from "@/components/retroui/Loader";
import { useBuyerActiveBids, useBuyerWins } from "@/hooks/useBuyerDashboard";

// Type definitions for records returned by API
interface ActiveBid {
  id: string;
  title: string;
  amount: number;
  leading: boolean;
}
interface Win {
  id: string;
  title?: string;
  auction?: { title?: string };
  finalPrice?: number | string;
  amount?: number | string;
  paymentStatus?: string;
  status?: string;
}

export const BuyerDashboard = () => {
  const { data: activeBids = [], isLoading: loadingBids } = useBuyerActiveBids();
  const { data: wins = [], isLoading: loadingWins } = useBuyerWins();

  // Payment status section uses wins array
  const payments = wins.map((win: Win) => ({
    id: win.id,
    reference: win.title || win.auction?.title || win.id,
    amount: win.finalPrice || win.amount || "",
    status: win.paymentStatus || win.status || "N/A"
  }));
  const loadingPayments = loadingWins;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <Text as="h2" className="text-3xl font-black">Buyer Dashboard</Text>

      <section>
        <Text as="h3" className="text-xl font-bold mb-3">Active Bids</Text>
        {loadingBids ? (
          <div className="h-[120px] grid place-content-center"><Loader /></div>
        ) : activeBids.length > 0 ? (
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Head>Auction</Table.Head>
                <Table.Head>Your Bid</Table.Head>
                <Table.Head>Status</Table.Head>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {activeBids.map((b: ActiveBid) => (
                <Table.Row key={b.id}>
                  <Table.Cell>{b.title}</Table.Cell>
                  <Table.Cell>${b.amount}</Table.Cell>
                  <Table.Cell>{b.leading ? "Leading" : "Outbid"}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <Text>No active bids</Text>
        )}
      </section>

      <section>
        <Text as="h3" className="text-xl font-bold mb-3">Won Auctions</Text>
        {loadingWins ? (
          <div className="h-[120px] grid place-content-center"><Loader /></div>
        ) : wins.length > 0 ? (
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Head>Auction</Table.Head>
                <Table.Head>Final Price</Table.Head>
                <Table.Head>Payment</Table.Head>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {wins.map((w: Win) => (
                <Table.Row key={w.id}>
                  <Table.Cell>{w.title}</Table.Cell>
                  <Table.Cell>${w.finalPrice}</Table.Cell>
                  <Table.Cell>{w.paymentStatus}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <Text>No wins yet</Text>
        )}
      </section>

      <section>
        <Text as="h3" className="text-xl font-bold mb-3">Payment Status</Text>
        {loadingPayments ? (
          <div className="h-[120px] grid place-content-center"><Loader /></div>
        ) : payments.length > 0 ? (
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Head>Reference</Table.Head>
                <Table.Head>Amount</Table.Head>
                <Table.Head>Status</Table.Head>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {payments.map((p: typeof payments[0]) => (
                <Table.Row key={p.id}>
                  <Table.Cell>{p.reference}</Table.Cell>
                  <Table.Cell>${p.amount}</Table.Cell>
                  <Table.Cell>{p.status}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <Text>No payments yet</Text>
        )}
      </section>
    </div>
  );
};


