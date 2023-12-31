import { Payment } from "@prisma/client";
import { Box, Button, Flex, Table, TextField } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdDelete, MdEdit } from "react-icons/md";

const InvoicePayments = ({ invoiceId }: { invoiceId?: number }) => {
  const [invoicePayments, setInvoicePayments] = useState<Payment[]>([]);
  const { register, handleSubmit } = useForm<Payment>();

  useEffect(() => {
    const getInvoicePayments = async () => {
      const response = await fetch(`/api/bills/${invoiceId}/payments`, {
        cache: "no-store",
      });
      const data: Payment[] = await response.json();
      setInvoicePayments(data);
    };
    if (invoiceId) {
      getInvoicePayments();
    }
  }, [invoiceId]);

  const onSubmit = handleSubmit(async (data) => {
    if (invoiceId) {
      try {
        const response = await fetch("/api/payments/", {
          method: "POST",
          body: JSON.stringify({
            amount: data.amount,
            paymentMethod: data.paymentMethod,
            billId: invoiceId,
          }),
        });
        if (response.status === 201) {
          const invoicePayment = await response.json();
          const invoicePaymentList = [...invoicePayments];
          invoicePaymentList.push(invoicePayment);
          setInvoicePayments(invoicePaymentList);
        }
      } catch (error) {}
    }
  });

  const deleteInvoicePayment = async (invoicePaymentId: number) => {
    await fetch("/api/payments/" + invoicePaymentId, {
      method: "DELETE",
    });

    setInvoicePayments(
      invoicePayments.filter(
        (invoicePayment) => invoicePayment.id !== invoicePaymentId
      )
    );
  };

  if (invoiceId === undefined) {
    return <div>Services can be added only after the invoice is saved</div>;
  }
  return (
    <div className="bg-purple-100 p-2 rounded-md">
      <div className="text-lg font-semibold">Payments</div>
      <Box>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Payment Method</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {invoicePayments.length > 0 ? (
              invoicePayments.map((invoicePayment) => (
                <Table.Row key={invoicePayment.id}>
                  <Table.Cell>
                    <span className="font-semibold">
                      {invoicePayment.paymentMethod}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    {parseFloat(invoicePayment.amount.toString())}
                  </Table.Cell>

                  <Table.Cell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        color="red"
                        type="button"
                        onClick={() => {
                          deleteInvoicePayment(invoicePayment.id);
                        }}
                      >
                        <MdDelete size={20} />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan={4}>
                  <div className="text-center p-2 text-gray-600 text-lg">
                    <span>No payments registered</span>
                  </div>
                </Table.Cell>
              </Table.Row>
            )}
            <Table.Row>
              <Table.Cell width={"50%"}>
                <Flex justify={"start"} align={"center"}>
                  <select {...register("paymentMethod")}>
                    <option value="CARD">Card</option>
                    <option value="CASH">Cash</option>
                  </select>
                </Flex>
              </Table.Cell>
              <Table.Cell>
                <TextField.Input
                  {...register("amount")}
                  type="number"
                  min="0.00"
                  step="0.01"
                  defaultValue={"0.00"}
                ></TextField.Input>
              </Table.Cell>
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
          </Table.Body>
        </Table.Root>
      </Box>
    </div>
  );
};

export default InvoicePayments;
