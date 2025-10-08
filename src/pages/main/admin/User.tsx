import { Badge } from "@/components/retroui/Badge";
import { Loader } from "@/components/retroui/Loader";
import { Table } from "@/components/retroui/Table";
import { Text } from "@/components/retroui/Text";
import { useGetUsers } from "@/hooks/admin/useAdmin";

export const User = () => {
  const { data: allUser, isLoading: loadingUser } = useGetUsers();
  return (
    <div className="h-96 overflow-auto border-2 w-full">
      <Table className="border-0 shadow-none">
        <Table.Header className="sticky top-0 z-10">
          <Table.Row className="bg-primary hover:bg-primary">
            <Table.Head className="w-[100px] text-primary-foreground">
              ID
            </Table.Head>
            <Table.Head className="text-primary-foreground">User</Table.Head>
            
            <Table.Head className="text-primary-foreground">
            Email
            </Table.Head>
            <Table.Head className="text-primary-foreground">
              Role
            </Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {loadingUser ? (
            <Table.Row>
              <Table.Cell colSpan={5} className="h-[150px] text-end">
                <div className="grid place-content-center">
                  <Loader />
                </div>
              </Table.Cell>
            </Table.Row>
          ) : allUser && allUser?.length > 0 ? (
            allUser?.map((user) => (
              <Table.Row key={user.id}>
                <Table.Cell className="font-medium">{user.id}</Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-3">
                    
                  <img className="size-10 rounded-full" src={user.avatarUrl ?? "/default_avatar.png"} />
                {user.username}
                  </div>
                </Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>
                  <Badge
                    variant={user.role === "ADMIN" ? "solid" : "outline"}
                    size="sm"
                  >
                    {user.role}
                  </Badge>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={5} className="h-[150px] text-center">
                <Text as="h4">No user found :'(</Text>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};
