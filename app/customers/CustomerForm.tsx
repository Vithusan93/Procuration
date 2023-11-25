"use client";
import React from "react";
import { Theme } from "@radix-ui/themes";
import { Flex, Text, Card, Button, TextField } from "@radix-ui/themes";
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
        className="max-w-xl space-y-3 space-x-2 "
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
        <Flex
          direction="column"
          gap="6"
          style={{ maxWidth: 350 }}
          align="center"
          justify="center"
        >
          <Card variant="surface">
            FirstName
            <TextField.Root>
              <TextField.Input
                defaultValue={customer?.firstname}
                placeholder="Customer FisrtName"
                {...register("firstname")}
              />
            </TextField.Root>
            LastName
            <TextField.Root>
              <TextField.Input
                defaultValue={customer?.lastname}
                placeholder="Customer LastName"
                {...register("lastname")}
              />
            </TextField.Root>
            Email
            <TextField.Root>
              <TextField.Input
                defaultValue={customer?.email}
                placeholder="Customer Email"
                {...register("email")}
              />
            </TextField.Root>
            Phone Number
            <TextField.Root>
              <TextField.Input
                defaultValue={customer?.phone}
                placeholder="Customer Number"
                {...register("phone")}
              />
            </TextField.Root>
            <Button size="3" variant="classic">
              {customer ? "Update Customer" : "Submit New Customer"}
            </Button>
          </Card>
        </Flex>
      </Form>
    </div>
  );
};

export default CustomerForm;
