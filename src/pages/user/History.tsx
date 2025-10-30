import { Text } from "@/components/retroui/Text";
import { Table } from "@/components/retroui/Table";
import { Loader } from "@/components/retroui/Loader";
import { Button } from "@/components/retroui/Button";
import { useTransactions } from "@/hooks/useTransactions";

export const History = () => {
  const { data: txs, isLoading, downloadReceipt } = useTransactions();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Text as="h2" className="text-3xl font-black mb-6">Your History</Text>
      {isLoading ? (
        <div className="h-[120px] grid place-content-center"><Loader /></div>
      ) : txs && txs.length > 0 ? (
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Head>Date</Table.Head>
              <Table.Head>Type</Table.Head>
              <Table.Head>Amount</Table.Head>
              <Table.Head>Status</Table.Head>
              <Table.Head></Table.Head>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {txs.map(t => (
              <Table.Row key={t.id}>
                <Table.Cell>{t.date}</Table.Cell>
                <Table.Cell>{t.type}</Table.Cell>
                <Table.Cell>${t.amount}</Table.Cell>
                <Table.Cell>{t.status}</Table.Cell>
                <Table.Cell>
                  <Button size="sm" onClick={() => downloadReceipt(t.id)}>Receipt</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <Text>No history yet</Text>
      )}
    </div>
  );
};


