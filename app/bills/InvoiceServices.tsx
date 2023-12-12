"use client";
import GetServiceButton from "../../components/services/GetServiceButton";
import { InvoiceService, Service } from "@prisma/client";
import { Box, Button, Flex, Table, Text, TextField } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdDelete, MdEdit } from "react-icons/md";
interface InvoiceServiceDetail extends InvoiceService {
  service: Service;
}

const InvoiceServices = ({ invoiceId }: { invoiceId?: number }) => {
  const { register, handleSubmit, setValue, watch } = useForm<InvoiceService>();
  const [invoiceServices, setInvoiceServices] = useState<
    InvoiceServiceDetail[]
  >([]);

  const [service, setService] = useState<Service>();

  const duration = watch("duration");
  const price = watch("price");

  useEffect(() => {
    if (invoiceId) {
      setValue("billId", invoiceId);
    }
  }, [invoiceId]);

  useEffect(() => {
    const getInvoiceServices = async () => {
      const response = await fetch(`/api/bills/${invoiceId}/services`, {
        cache: "no-store",
      });
      const data: InvoiceServiceDetail[] = await response.json();
      setInvoiceServices(data);
    };
    if (invoiceId) {
      getInvoiceServices();
    }
  }, [invoiceId]);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    try {
      const response = await fetch("/api/billsservice", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.status === 201) {
        const invoiceService = await response.json();
        const invoiceServiceList = [...invoiceServices];
        invoiceServiceList.push(invoiceService);
        setInvoiceServices(invoiceServiceList);
      }
    } catch (error) {}
  });

  const deleteInvoiceService = async (invoiceServiceId: number) => {
    await fetch("/api/billsservice/" + invoiceServiceId, {
      method: "DELETE",
    });

    setInvoiceServices(
      invoiceServices.filter(
        (invoiceService) => invoiceService.id !== invoiceServiceId
      )
    );
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
              <Table.ColumnHeaderCell>Service</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Duration</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Total Price</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {invoiceServices.length > 0 ? (
              invoiceServices.map((invoiceService) => (
                <Table.Row key={invoiceService.id}>
                  <Table.Cell>
                    <span className="font-semibold">
                      {invoiceService.service?.name}
                    </span>
                  </Table.Cell>
                  <Table.Cell>{invoiceService.duration}</Table.Cell>
                  <Table.Cell>{invoiceService.price.toString()}</Table.Cell>
                  <Table.Cell>
                    {(
                      invoiceService.duration *
                      parseFloat(invoiceService.price?.toString())
                    ).toFixed(2)}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2">
                      <Button variant="outline" color="gray" type="button">
                        <MdEdit size={20} />
                      </Button>
                      <Button
                        variant="outline"
                        color="red"
                        type="button"
                        onClick={() => {
                          deleteInvoiceService(invoiceService.id);
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
                    <span>No services added</span>
                  </div>
                </Table.Cell>
              </Table.Row>
            )}
            <Table.Row>
              <Table.Cell width={"50%"}>
                <Flex justify={"start"} align={"center"}>
                  <div className="">
                    {service
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

export default InvoiceServices;
