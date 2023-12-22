import { PrismaClient, Bill } from "@prisma/client";
import { Box, Button, Flex, Table, Select } from "@radix-ui/themes";
import { useEffect, useState } from "react";

const prisma = new PrismaClient();

const InvoiceTotals = ({ invoiceId }: { invoiceId?: number }) => {
  const [bills, setBills] = useState<Bill[]>([]);

  useEffect(() => {
    const fetchBills = async () => {
      const response = await fetch("/api/bills");
      const data: Bill[] = await response.json();
      setBills(data);
    };

    if (invoiceId) {
      fetchBills();
    }
  }, [invoiceId]);

  const onSubmit = async () => {
    try {
      const response = await fetch("/api/bills", {
        method: "POST",
        body: JSON.stringify({}),
      });

      if (response.status === 201) {
        const newBill = await response.json();
        setBills([...bills, newBill]);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la facture:", error);
    }
  };

  return (
    <div>
      <Box>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Payment Method</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Total Amount</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {bills.map((bill) => (
              <Table.Row key={bill.id}>
                <Table.Cell>
                  <Flex justify={"start"} align={"center"}>
                    <div>
                      <Select.Root value="cash" onValueChange={() => {}}>
                        <Select.Trigger />
                        <Select.Content position="popper" sideOffset={5}>
                          <Select.Item value="cash">Cash</Select.Item>
                          <Select.Item value="card">Card</Select.Item>
                        </Select.Content>
                      </Select.Root>
                    </div>
                  </Flex>
                </Table.Cell>

                {/* Placeholder for Total Amount calculation */}
                <Table.Cell>{Number(bill.TotalAmount).toFixed(2)}</Table.Cell>

                <Table.Cell>Action buttons here</Table.Cell>

                <Table.Cell>
                  <Button
                    type="button"
                    variant="outline"
                    color="gray"
                    onClick={onSubmit}
                    className="w-full"
                  >
                    Add
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </div>
  );
};

export default InvoiceTotals;
