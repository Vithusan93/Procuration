import { Customer } from "@prisma/client";
import { Box, Button, Dialog, Flex, Table, TextField } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const GetCustomerButton = ({
  onCustomerSelect,
}: {
  onCustomerSelect: (customer: Customer) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch(`/api/customers?search=${search}`, {
        cache: "no-store",
      });
      const data: Customer[] = await response.json();
      setCustomers(data);
    };
    fetchCustomers();
  }, [search]);

  return (
    <div className="flex justify-center w-full p-2">
      <Button
        type="button"
        variant="outline"
        color="gray"
        onClick={() => setOpen(true)}
      >
        Select Customer
      </Button>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Select Customer</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            search for exising customer
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <TextField.Root>
              <TextField.Slot>
                <FaSearch />
              </TextField.Slot>
              <TextField.Input
                placeholder="Search customers"
                value={search}
                onChange={({ target }) => {
                  setSearch(target.value);
                }}
              />
            </TextField.Root>
          </Flex>

          {customers && (
            <Box>
              <Table.Root>
                <Table.Body>
                  {customers.map((customer) => (
                    <Table.Row
                      key={customer.id}
                      onClick={() => {
                        onCustomerSelect(customer);
                        setOpen(false);
                      }}
                    >
                      <Table.Cell>
                        {customer.firstname} {customer.lastname}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Box>
          )}

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default GetCustomerButton;
