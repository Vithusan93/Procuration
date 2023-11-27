"use client";
import React from "react";
import { Theme } from "@radix-ui/themes";
import {
  Flex,
  Text,
  Button,
  TextField,
  Heading,
  Grid,
  Box,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { Customer } from "@prisma/client";
import { Form } from "@radix-ui/react-form";
import { useForm } from "react-hook-form";

const CustomerForm = ({ customer }: { customer?: Customer }) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<Customer>();

  return (
    <div className="flex items-center max-w-7xl mx-auto w-full">
      <Form
        className="w-full "
        onSubmit={handleSubmit(async (data) => {
          try {
            if (customer) {
              await fetch("/api/customers/" + customer.id, {
                method: "PATCH",
                body: JSON.stringify(data),
              });
              router.push("/customers");
            } else {
              await fetch("/api/customers", {
                method: "POST",
                body: JSON.stringify(data),
              });
              router.push("/customers");
            }
          } catch (error) {
            console.log(error);
          }
        })}
      >
        {" "}
        <div className="flex flex-col w-full">
          <div className="bg-gray-200 w-full p-4">
            <Heading className="text-gray-900">
              {customer ? " Edit Customer" : "New Customer"}
            </Heading>
          </div>
          <div className="flex p-2 bg-gray-100">
            <div className="w-1/4">
              <Flex gap="3" direction="column" style={{ maxWidth: 400 }}>
                <Box height="9">
                  FirstName
                  <Flex
                    direction="column"
                    gap="3"
                    style={{ maxWidth: 400 }}
                  ></Flex>
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
                </Box>
                <Box height="9">
                  LastName
                  <TextField.Root>
                    <TextField.Input
                      radius="large"
                      size="3"
                      defaultValue={customer?.lastname}
                      placeholder="Customer LastName"
                      {...register("lastname")}
                    />
                  </TextField.Root>
                </Box>
                <Box height="9">
                  Email
                  <TextField.Root>
                    <TextField.Input
                      radius="large"
                      size="3"
                      defaultValue={customer?.email}
                      placeholder="Customer Email"
                      {...register("email")}
                    />
                  </TextField.Root>
                </Box>
                <Box height="9">
                  Phone Number
                  <TextField.Root>
                    <TextField.Input
                      radius="large"
                      size="3"
                      defaultValue={customer?.phone}
                      placeholder="Customer Number"
                      {...register("phone")}
                    />
                  </TextField.Root>
                </Box>
              </Flex>
            </div>
          </div>
        </div>
        <div className="flex bg-gray-200 p-6 justify-center items-center gap-2">
          <Button size="3" variant="classic">
            {customer ? "Update Customer" : "Submit New Customer"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CustomerForm;
