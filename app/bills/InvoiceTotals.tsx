// app/bills/invoiceTotals.tsx

import { useEffect, useState } from "react";
import { Box, Button, Flex, Table, Select } from "@radix-ui/themes";
import { Bill } from "@prisma/client";

interface InvoiceTotalsProps {
  invoiceId?: number;
}

const InvoiceTotals: React.FC<InvoiceTotalsProps> = ({ invoiceId }) => {
  const [bills, setBills] = useState<Bill[]>([]);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await fetch(`/api/bills?invoiceId=${invoiceId}`);
        const data: Bill[] = await response.json();
        setBills(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des factures:", error);
      }
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
              <Table.ColumnHeaderCell>Total Paid</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {bills.map((bill) => (
              <Table.Row key={bill.id}>
                <Table.Cell>
                  <Flex>
                    <Select.Root value="cash" onValueChange={() => {}}>
                      <Select.Trigger />
                      <Select.Content position="popper" sideOffset={5}>
                        <Select.Item value="cash">Cash</Select.Item>
                        <Select.Item value="card">Card</Select.Item>
                      </Select.Content>
                    </Select.Root>
                  </Flex>
                </Table.Cell>

                <Table.Cell>{Number(bill.TotalAmount).toFixed(2)}</Table.Cell>
                <Table.Cell>{Number(bill.TotalPaid).toFixed(2)}</Table.Cell>
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
