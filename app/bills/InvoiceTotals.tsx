"use client";
import GetPaymentButton from "@/components/payments/GetPaymentButton";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Box, Button, Flex, Table, Select } from "@radix-ui/themes";
import { Bill } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { Product, Service } from "@prisma/client";

interface InvoiceTotal extends Bill {
  service: Service;
  produit: Product;
}

const InvoiceTotals = ({ invoiceId }: { invoiceId?: number }) => {
  const { register, handleSubmit, setValue, watch } = useForm<Bill>();
  const [invoiceBills, setInvoiceBills] = useState<InvoiceTotal[]>([]);

  useEffect(() => {
    const getInvoiceTotals = async () => {
      try {
        const response = await fetch(`/api/bills/${invoiceId}`, {
          cache: "no-store",
        });
        const data: InvoiceTotal[] = await response.json();
        setInvoiceBills(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des factures:", error);
      }
    };

    if (invoiceId) {
      getInvoiceTotals();
    }
  }, [invoiceId]);

  const onSubmit = async () => {
    try {
      const response = await fetch("/api/bills ", {
        method: "POST",
        body: JSON.stringify({}),
      });

      if (response.status === 201) {
        const invoiceBills = await response.json();
        setInvoiceBills(invoiceBills);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la facture:", error);
    }
  };

  if (invoiceId === undefined) {
    return <div>Services can be added only after the invoice is saved</div>;
  }

  return (
    <div>
      <Box>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Payment Method</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Total Amount</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Total Paid</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Add</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              //invoiceBills.length > 0 ? (
              invoiceBills.map((invoiceBills) => (
                <Table.Row key={invoiceBills.id}>
                  <Table.Cell>
                    <GetPaymentButton
                      onPaymentSelect={function (bill: {
                        id: number;
                        staffId: number;
                        customerId: number;
                        billnumber: number;
                        TotalAmount: Decimal;
                        TotalPaid: Decimal;
                        invoiceDate: Date;
                        createdAt: Date;
                      }): void {
                        throw new Error("Function not implemented.");
                      }}
                    />
                  </Table.Cell>
                  <Table.Cell>{invoiceBills.TotalAmount.toString()}</Table.Cell>

                  <Table.Cell>{invoiceBills.TotalPaid.toString()}</Table.Cell>
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
              ))
              /*)  {: (
              <Table.Row>
                <Table.Cell colSpan={4}>
                  <div className="text-center p-2 text-gray-600 text-lg">
                    <span>No payment added</span>
                  </div>
                </Table.Cell>
              </Table.Row>
            )}

            <Table.Row>
              
              <Table.Cell width={"50%"}>
                <Flex justify={"start"} align={"center"}>
                  <div className="">
                    {bill
                      ? service.name
                      : "Click the button to select service"}
                  </div>
                  <div>
                    <GetServiceButton
                      onServiceSelect={(service) => {
                        setValue("price", service.price);
                        setValue("serviceId", service.id);
                        setService(service);
                      }}
                      buttonLabel={
                        service ? "Change Service" : "Select Service"
                      }
                    />
                  </div>
                </Flex>
              </Table.Cell>
              <Table.Cell>
                <TextField.Input
                  {...register("duration")}
                  type="number"
                  defaultValue={"1"}
                ></TextField.Input>
              </Table.Cell>
              <Table.Cell>
                <TextField.Input
                  {...register("price")}
                  type="number"
                  min="0.00"
                  step="0.01"
                  defaultValue={"0.00"}
                ></TextField.Input>
              </Table.Cell>
              <Table.Cell>
                <Text>
                  {(duration * parseFloat(price?.toString())).toFixed(2)}
                </Text>
              </Table.Cell>
              
            
                    </Table.Row>*/
            }
          </Table.Body>
        </Table.Root>
      </Box>
    </div>
  );
};

export default InvoiceTotals;
