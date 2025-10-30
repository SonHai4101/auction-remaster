import { Text } from "@/components/retroui/Text";
import { Table } from "@/components/retroui/Table";
import { Loader } from "@/components/retroui/Loader";
import { useSellerListings, useSellerSales, useSellerRevenue } from "@/hooks/useSellerDashboard";

// Type definitions for clarity
interface Listing {
  id: string;
  title: string;
  currentPrice: number | string;
  numBids: number | string;
}
interface Sale {
  id: string;
  title: string;
  finalPrice: number | string;
  buyer: string;
}

export const SellerDashboard = () => {
  const { data: listings = [], isLoading: loadingListings } = useSellerListings();
  const { data: sales = [], isLoading: loadingSales } = useSellerSales();
  const { data: revenue, isLoading: loadingRevenue } = useSellerRevenue();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <Text as="h2" className="text-3xl font-black">Seller Dashboard</Text>

      <section>
        <Text as="h3" className="text-xl font-bold mb-3">Current Listings</Text>
        {loadingListings ? (
          <div className="h-[120px] grid place-content-center"><Loader /></div>
        ) : listings.length > 0 ? (
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Head>Title</Table.Head>
                <Table.Head>Current Price</Table.Head>
                <Table.Head>Bids</Table.Head>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {listings.map((l: Listing) => (
                <Table.Row key={l.id}>
                  <Table.Cell>{l.title}</Table.Cell>
                  <Table.Cell>${l.currentPrice}</Table.Cell>
                  <Table.Cell>{l.numBids}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <Text>No listings</Text>
        )}
      </section>

      <section>
        <Text as="h3" className="text-xl font-bold mb-3">Sold Items</Text>
        {loadingSales ? (
          <div className="h-[120px] grid place-content-center"><Loader /></div>
        ) : sales.length > 0 ? (
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Head>Title</Table.Head>
                <Table.Head>Final Price</Table.Head>
                <Table.Head>Buyer</Table.Head>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {sales.map((s: Sale) => (
                <Table.Row key={s.id}>
                  <Table.Cell>{s.title}</Table.Cell>
                  <Table.Cell>${s.finalPrice}</Table.Cell>
                  <Table.Cell>{s.buyer}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <Text>No sales yet</Text>
        )}
      </section>

      <section>
        <Text as="h3" className="text-xl font-bold mb-3">Revenue</Text>
        {loadingRevenue ? (
          <div className="h-[120px] grid place-content-center"><Loader /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="border-2 p-4"><Text>Total: ${revenue?.total ?? 0}</Text></div>
            <div className="border-2 p-4"><Text>Last 30d: ${revenue?.last30Days ?? 0}</Text></div>
            <div className="border-2 p-4"><Text>Avg sale: ${revenue?.average ?? 0}</Text></div>
          </div>
        )}
      </section>
    </div>
  );
};


