"use client";

import Spinner from "@/components/Spinner";
import { Bill, Customer, Staff } from "@prisma/client";
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
import CustomerForm from "../customers/CustomerForm";
import GetCustomerButton from "./GetCustomerButton";
import GetStaffButton from "./GetStaffsButton";
import InvoiceProducts from "./InvoiceProducts";
import InvoiceServices from "./InvoiceServices";
import InvoicePayments from "./_components/InvoicePayments";
import InvoiceSummary from "./_components/InvoiceSummary";

interface BillDetail extends Bill {
  customer: Customer;
  staff: Staff;
}

const BillFormPage = ({ bill }: { bill?: BillDetail }) => {
  const defaultValues = { ...bill };

  if (defaultValues) {
    defaultValues.invoiceDate = undefined;
  }

  const { register, handleSubmit, control, setValue } = useForm<Bill>({
    defaultValues: defaultValues,
  });

  const [addingNewCustomer, setAddingNewCustomer] = useState<boolean>(false);
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer>();
  const [staff, setStaff] = useState<Staff>();

  const onSubmit = handleSubmit(async (data) => {
    if (data.invoiceDate) {
      data.invoiceDate = new Date(data.invoiceDate);
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
  const [isSubmitting, setSubmitting] = useState(false);

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
                    // defaultValue={bill?.billnumber}
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
                <Flex align={"center"} gap="2">
                  <div className="text-gray-800 text-sm font-semibold">
                    Staff
                  </div>
                  <div className="grow bg-gray-300 rounded-md px-2 py-1">
                    {staff ? (
                      <span className="text-md text-gray-900 font-semibold ">
                        {staff.firstname} {staff.lastname}
                      </span>
                    ) : (
                      <span>Staff not selected</span>
                    )}
                  </div>
                  <div>
                    <GetStaffButton
                      onStaffSelect={(staff) => {
                        setStaff(staff);
                        setValue("staffId", staff.id);
                      }}
                    />
                  </div>
                </Flex>
              </Box>

              <Box className="w-1/2" p="2">
                <label htmlFor="invoiceDate">
                  <span className="font-semibold">Date Facture</span>
                  <TextField.Root>
                    <TextField.Input
                      type="date"
                      placeholder="Date"
                      defaultValue={bill?.invoiceDate.toString().split("T")[0]}
                      {...register("invoiceDate")}
                    />
                  </TextField.Root>
                </label>
              </Box>
            </Flex>
          </div>
        </div>

        <div className="flex flex-col gap-2 p-2">
          <InvoiceSummary invoiceId={bill?.id} />
          <InvoiceProducts invoiceId={bill?.id} />
          <InvoiceServices invoiceId={bill?.id} />
          <InvoicePayments invoiceId={bill?.id} />
        </div>

        <div className="flex bg-purple-100 p-6 justify-center items-center gap-2">
          <Button color="gray" size="3" variant="outline">
            Create Draft
          </Button>
          <Button size="3" variant="solid" disabled={isSubmitting}>
            {bill ? "Update Invoice" : "Create Invoice"}
            {isSubmitting && <Spinner />}
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
