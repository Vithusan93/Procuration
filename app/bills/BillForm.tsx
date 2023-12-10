"use client";
import { Bill, Customer, Staff, Product, Service } from "@prisma/client";
import { Form } from "@radix-ui/react-form";
import {
  Box,
  Button,
  Dialog,
  Flex,
  Heading,
  TextField,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import CustomerForm from "../customers/CustomerForm";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import InvoiceProductForm from "./InvoiceProductForm";
import GetCustomerButton from "./GetCustomerButton";
import GetStaffButton from "./GetStaffsButton";
import GetProductButton from "./GetProductButton";
import GetServiceButton from "./GetServiceButton";

const BillFormPage = ({ bill }: { bill?: Bill }) => {
  const { register, handleSubmit, control, setValue } = useForm<Bill>();
  const [addingNewCustomer, setAddingNewCustomer] = useState<boolean>(false);
  const [addingProduct, setAddingProduct] = useState<boolean>(false);
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer>();
  const [staff, setStaff] = useState<Staff>();
  const [service, setService] = useState<Service>();
  const [product, setProduct] = useState<Product>();
  const onSubmit = handleSubmit(async (data) => {
    if (data.createdAt) {
      data.createdAt = new Date(data.createdAt);
    }
    try {
      if (bill) {
        await fetch("/api/bills/" + bill.id, {
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
  });

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
      <Form className="w-full" onSubmit={onSubmit}>
        <div className="flex flex-col w-full">
          <div className="bg-gray-200 w-full p-4">
            <Heading className="text-gray-900">
              {bill ? " Edit Invoice" : " New Invoice"}
            </Heading>
          </div>
          <div className="bg-gray-100">
            <Flex gap="2">
              <Box className="w-1/2" p="2">
                <span className="font-semibold">Invoice Number</span>
                <TextField.Root>
                  <TextField.Input
                    radius="large"
                    variant="classic"
                    size="3"
                    defaultValue={bill?.billnumber}
                    placeholder="Bill Number"
                    {...register("billnumber")}
                  />
                </TextField.Root>
                <Box className="">
                  <div className="text-gray-800 text-sm font-semibold">
                    Customer
                  </div>
                  <div className="bg-gray-300 rounded-md p-2">
                    {customer ? (
                      <span className="text-md text-gray-900 font-semibold ">
                      {customer.firstname} {customer.lastname}
                      </span>
                    ) : (
                      <span>Customer not selected</span>
                    )}
                  </div>
                  <GetCustomerButton
                    onCustomerSelect={(customer) => {
                      setCustomer(customer);
                      setValue("customerId", customer.id);
                    }}
                  />
                </Box>

                <Box className="">
                  <div className="text-gray-800 text-sm font-semibold">
                    Staff
                  </div>
                  <div className="bg-gray-300 rounded-md p-2">
                    {staff ? (
                      <span className="text-md text-gray-900 font-semibold ">
                        {staff.firstname} {staff.lastname}
                      </span>
                    ) : (
                      <span>Staff not selected</span>
                    )}
                  </div>
                  <GetStaffButton
                    onStaffSelect={(staff) => {
                      setStaff(staff);
                      setValue("staffId", staff.id);
                    }}
                  />
                </Box>

                <Box className="">
                  <div className="text-gray-800 text-sm font-semibold">
                    Product
                  </div>
                  <div className="bg-gray-300 rounded-md p-2">
                    {product ? (
                      <span className="text-md text-gray-900 font-semibold ">
                        {product.name} {product.price.toString()}
                      </span>
                    ) : (
                      <span>Product not selected</span>
                    )}
                  </div>
                  <GetProductButton
                    onProductSelect={(product) => {
                      setProduct(product);
                      setValue("productId", product.id);
                    }}
                  />
                </Box>

                <Box className="">
                  <div className="text-gray-800 text-sm font-semibold">
                    Service
                  </div>
                  <div className="bg-gray-300 rounded-md p-2">
                    {service ? (
                      <span className="text-md text-gray-900 font-semibold ">
                        {service.name} {service.price.toString()}{" "}
                        {service.duration.toString()}
                      </span>
                    ) : (
                      <span>Service not selected</span>
                    )}
                  </div>
                  <GetServiceButton
                    onServiceSelect={(service) => {
                      setService(service);
                      setValue("serviceId", service.id);
                    }}
                  />
                </Box>

                <Flex gap="3" align={"center"}>
                  <Button
                    variant="outline"
                    color="gray"
                    type="button"
                    onClick={() => setAddingNewCustomer(true)}
                  >
                    Add new customer
                  </Button>
                  <div> </div>
                </Flex>
              </Box>

              <Box className="w-1/2" p="2">
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

            {/* <Flex direction="column" gap="1">
              <div className="bg-gray-300 w-full p-1 direction=row">
                {false && (
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
                        <Table.Cell className="hidden md:table-cell">
                          {}
                        </Table.Cell>
                        <Table.Cell className="hidden md:table-cell">
                          {}
                        </Table.Cell>
                        <Table.Cell className="hidden md:table-cell">
                          {}
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table.Root>
                )}
              </div>
            </Flex> */}

            <div className="flex p-2 justify-end">
              <Button
                variant="outline"
                color="gray"
                onClick={() => setAddingProduct(true)}
                type="button"
              >
                <IoMdAdd />
                Add Product
              </Button>
            </div>
          </div>
        </div>
        <div className="flex bg-gray-200 p-6 justify-center items-center gap-2">
          <Button color="gray" size="3" variant="outline">
            Create Draft
          </Button>
          <Button size="3" variant="classic">
            {bill ? "Update Invoice" : "Create Invoice"}
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
      <Dialog.Root open={addingProduct} onOpenChange={setAddingProduct}>
        <Dialog.Content className="p-0">
          <InvoiceProductForm />
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default BillFormPage;
