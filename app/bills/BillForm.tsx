"use client";
import prisma from "@/prisma/client";
import { Bill } from "@prisma/client";
import { Form } from "@radix-ui/react-form";
import {
  Box,
  Button,
  Dialog,
  Flex,
  Heading,
  Table,
  TextField,
  Text,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import CustomerSelect from "./CustomerSelect";
import ProductSelect from "./ProductSelect";
import ServiceSelect from "./ServiceSelect";
import StaffSelect from "./StaffSelect";
import CustomerForm from "../customers/CustomerForm";
import { useState } from "react";

const BillFormPage = ({ bills }: { bills?: Bill }) => {
  const { register, handleSubmit, control, setValue } = useForm<Bill>();
  const [addingNewCustomer, setAddingNewCustomer] = useState<boolean>(false);
  //console.log(register("customer"));
  const router = useRouter();

  async function fetchServices() {
    try {
      const services = await prisma.service.findMany();
      console.log(services);
    } catch (error) {
      console.error("Erreur lors de la récupération des services:", error);
    }
  }

  fetchServices();

  /*  useEffect(() => {
    const generatePDF = () => {
      const pdf = new jsPDF();

      // Ajouter le contenu de la facture au PDF
      pdf.text("Facture", 20, 20);
      pdf.text("Détails du client", 20, 30);
      // Ajouter d'autres détails de la facture

      // Sauvegarder le fichier PDF
      pdf.save("facture.pdf");
    };

    // Appeler la fonction de génération de PDF
    generatePDF();
  }, []); */
  return (
    <div className="flex items-center max-w-7xl mx-auto w-full">
      <Form
        className="w-full"
        onSubmit={handleSubmit(async (data) => {
          if (data.createdAt) {
            data.createdAt = new Date(data.createdAt);
          }
          try {
            if (bills) {
              await fetch("/api/bills/" + bills.id, {
                method: "PATCH",
                body: JSON.stringify(data),
              });
              router.push("/bills");
            } else {
              await fetch("/api/bills", {
                method: "POST",
                body: JSON.stringify(data),
              });
              router.push("/bills");
            }
          } catch (error) {
            console.log(error);
          }
        })}
      >
        <div className="flex flex-col w-full">
          <div className="bg-gray-200 w-full p-4">
            <Heading className="text-gray-900">
              {bills ? " Edit Invoice" : " New Invoice"}
            </Heading>
          </div>

          <Flex gap="2">
            <Box className="w-1/2" p="2">
              <span className="font-semibold">Invoice Number</span>
              <TextField.Root>
                <TextField.Input
                  radius="large"
                  variant="classic"
                  size="3"
                  defaultValue={bills?.billnumber}
                  placeholder="Bill Number"
                  {...register("billnumber")}
                />
              </TextField.Root>
              <Flex gap="2" align={"center"}>
                <label
                  htmlFor="customerId"
                  className="flex align-middle gap-2 items-center my-2"
                >
                  <span className="font-semibold">Customer</span>
                  <CustomerSelect
                    name="customerId"
                    label="Customer"
                    placeholder="Customer"
                    control={control}
                  />
                </label>
                <Button
                  variant="outline"
                  color="gray"
                  type="button"
                  onClick={() => setAddingNewCustomer(true)}
                >
                  Add new customer
                </Button>
              </Flex>
            </Box>
            <Box className="w-1/2" p="2">
              <span className="font-semibold">Staff</span>
              <StaffSelect
                name="staffId"
                label="Staff"
                placeholder="Staff"
                control={control}
              />

              <label htmlFor="time">
                <span className="font-semibold">Date Facture</span>
                <TextField.Root>
                  <TextField.Input
                    type="date"
                    placeholder="Date"
                    {...register("createdAt")}
                  />
                </TextField.Root>
              </label>
            </Box>
          </Flex>

          <Flex direction="row" gap="6">
            <div className="bg-gray-300 w-full p-1 direction=row">
              <span className="font-semibold">Service</span>
              <ServiceSelect
                name="serviceId"
                label="Service"
                placeholder="Service"
                control={control}
              />
              <Table.Root variant="surface">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell className="hidden md:table-cell">
                      Buy
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="hidden md:table-cell">
                      Label
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="hidden md:table-cell">
                      Quantity
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="hidden md:table-cell">
                      Price
                    </Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell className="hidden md:table-cell">
                      <span className="font-semibold">Service</span>
                    </Table.Cell>
                    <Table.Cell className="hidden md:table-cell">{}</Table.Cell>
                    <Table.Cell className="hidden md:table-cell">{}</Table.Cell>
                    <Table.Cell className="hidden md:table-cell">{}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table.Root>
            </div>
          </Flex>

          <Flex direction="column">
            <span className="font-semibold">Product</span>
            <ProductSelect
              name="productId"
              label="Product"
              placeholder="Product"
              control={control}
            />
            <div className="bg-gray-300 w-full p-1 direction=column">
              <Table.Root variant="surface">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell className="hidden md:table-cell">
                      Buy
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="hidden md:table-cell">
                      Label
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="hidden md:table-cell">
                      Quantity
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="hidden md:table-cell">
                      Price
                    </Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body></Table.Body>
              </Table.Root>
            </div>
          </Flex>
        </div>

        <div className="flex bg-gray-200 p-6 justify-center items-center gap-2">
          <Button color="gray" size="3" variant="outline">
            Save
          </Button>
          <Button size="3" variant="classic">
            {bills ? "Update Invoice" : "Save Invoice Customer"}
          </Button>
        </div>
      </Form>
      <Dialog.Root open={addingNewCustomer} onOpenChange={setAddingNewCustomer}>
        <Dialog.Content className="p-0">
          <CustomerForm
            onSuccess={(customer) => {
              console.log(customer);
              setValue("customerId", customer.id);
              setAddingNewCustomer(false);
            }}
          />
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default BillFormPage;
