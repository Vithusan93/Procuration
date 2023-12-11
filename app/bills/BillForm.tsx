"use client";
import { Bill, Customer, Product, Service, Staff } from "@prisma/client";
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";
import CustomerForm from "../customers/CustomerForm";
import GetCustomerButton from "./GetCustomerButton";
import GetServiceButton from "./GetServiceButton";
import GetStaffButton from "./GetStaffsButton";
import InvoiceProducts from "./InvoiceProducts";
import InvoiceSummary from "./_components/InvoiceSummary";
import InvoiceServices from "./InvoiceServices";

interface BillDetail extends Bill {
  customer: Customer;
  staff: Staff;
}

const BillFormPage = ({ bill }: { bill?: BillDetail }) => {
  const { register, handleSubmit, control, setValue } = useForm<Bill>();
  const [addingNewCustomer, setAddingNewCustomer] = useState<boolean>(false);
  const [addingProduct, setAddingProduct] = useState<boolean>(false);
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer>();
  const [staff, setStaff] = useState<Staff>();
  const [service, setService] = useState<Service>();

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

  useEffect(() => {
    if (bill) {
      setCustomer(bill.customer);
      setStaff(bill.staff);
    }
  }, [bill]);

  return (
    <div className="flex items-center w-full">
      <Form className="w-full" onSubmit={onSubmit}>
        <div className="flex flex-col w-full bg-gray-100">
          <div className="bg-purple-200 w-full p-4">
            <Heading className="text-gray-900">
              {bill ? " Edit Invoice" : " New Invoice"}
            </Heading>
          </div>
          <div className="bg-purple-50">
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
                <Flex align={"center"} gap="2">
                  <div className="text-gray-800 text-sm font-semibold">
                    Customer
                  </div>
                  <div className="grow bg-gray-300 rounded-md px-2 py-1">
                    {customer ? (
                      <span className="text-md text-gray-900 font-semibold">
                        {customer.firstname} {customer.lastname}
                      </span>
                    ) : (
                      <span>Customer not selected</span>
                    )}
                  </div>
                  <div>
                    <GetCustomerButton
                      onCustomerSelect={(customer) => {
                        setCustomer(customer);
                        setValue("customerId", customer.id);
                      }}
                    />
                  </div>
                </Flex>

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

        <InvoiceSummary invoiceId={bill?.id} />
        <InvoiceProducts invoiceId={bill?.id} />
        <InvoiceServices invoiceId={bill?.id} />

        <div className="flex bg-purple-100 p-6 justify-center items-center gap-2">
          <Button color="gray" size="3" variant="outline">
            Create Draft
          </Button>
          <Button size="3" variant="solid">
            {bill ? "Update Invoice" : "Create Invoice"}
          </Button>
        </div>
      </Form>

      <Dialog.Root open={addingNewCustomer} onOpenChange={setAddingNewCustomer}>
        <Dialog.Content className="p-0">
          <CustomerForm
            onSuccess={(customer) => {
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
