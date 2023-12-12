"use client";
import { Customer } from "@prisma/client";
import { Form } from "@radix-ui/react-form";
import {
  Box,
  Button,
  Flex,
  Heading,
  TextField,
  Callout,
  Text,
} from "@radix-ui/themes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCustomerSchema } from "../validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";

type CustomerForm = z.infer<typeof createCustomerSchema>;

const CustomerForm = ({
  customer,
  onSuccess,
}: {
  customer?: Customer;
  onSuccess: (customer: Customer) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Customer>({
    resolver: zodResolver(createCustomerSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (customer) {
        const response = await fetch("/api/customers/" + customer.id, {
          method: "PATCH",
          body: JSON.stringify(data),
        });
        const updatedCustomer: Customer = await response.json();
        onSuccess(updatedCustomer);
      } else {
        setSubmitting(true);
        const response = await fetch("/api/customers/", {
          method: "POST",
          body: JSON.stringify(data),
        });
        const newCustomer: Customer = await response.json();
        onSuccess(newCustomer);
      }
    } catch (error) {
      setError("An unexpcted error  occurred.");
      setSubmitting(false);
    }
  });

  return (
    <div className="flex items-center max-w-7xl mx-auto w-full">
      <Form className="w-full p-20" onSubmit={onSubmit}>
        <div className="flex flex-col w-full">
          {error && (
            <Callout.Root color="red" className="mb-5">
              <Callout.Text> {error}</Callout.Text>
            </Callout.Root>
          )}
          <div className="bg-gray-200 w-full p-4">
            <Heading className="text-gray-900">
              {customer ? " Edit Customer" : "New Customer"}
            </Heading>
             
          </div>
          <div className="flex p-2 bg-gray-100">
            <Flex gap="1">
              <Box className="w-1/2" p="2">
                <span className="font-semibold">FirstName</span>
                <TextField.Root>
                  <TextField.Input
                    radius="large"
                    variant="classic"
                    size="3"
                    defaultValue={customer?.firstname}
                    placeholder="Customer FisrtName"
                    {...register("firstname")}
                  />
                </TextField.Root>
                <ErrorMessage>{errors.firstname?.message}</ErrorMessage>
              </Box>

              <Box className="w-1/2" p="2">
                <span className="font-semibold">LastName</span>
                <TextField.Root>
                  <TextField.Input
                    radius="large"
                    variant="classic"
                    size="3"
                    defaultValue={customer?.lastname}
                    placeholder="Customer LastName"
                    {...register("lastname")}
                  />
                </TextField.Root>
                <ErrorMessage>{errors.lastname?.message}</ErrorMessage>
              </Box>

              <Box className="w-1/2" p="2">
                <span className="font-semibold">Email</span>
                <TextField.Root>
                  <TextField.Input
                    radius="large"
                    variant="classic"
                    size="3"
                    defaultValue={customer?.email}
                    placeholder="Customer Email"
                    {...register("email")}
                  />
                </TextField.Root>
                <ErrorMessage>{errors.email?.message}</ErrorMessage>
              </Box>

              <Box className="w-1/2" p="2">
                <span className="font-semibold">Phone Number</span>
                <TextField.Root>
                  <TextField.Input
                    radius="large"
                    variant="classic"
                    defaultValue={customer?.phone}
                    placeholder="Customer Number"
                    {...register("phone")}
                  />
                </TextField.Root>
                <ErrorMessage>{errors.phone?.message}</ErrorMessage>
              </Box>
            </Flex>
          </div>
        </div>
        <div className="flex bg-gray-200 p-6 justify-center items-center gap-2">
          <Button size="3" variant="classic" disabled={isSubmitting}>
            {customer ? "Update Customer" : "Submit New Customer"}
            {isSubmitting && <Spinner />}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CustomerForm;
