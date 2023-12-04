"use client";
import { Customer } from "@prisma/client";
import { Form } from "@radix-ui/react-form";
import { Box, Button, Flex, Heading, TextField } from "@radix-ui/themes";
import { useForm } from "react-hook-form";

const CustomerForm = ({
  customer,
  onSuccess,
}: {
  customer?: Customer;
  onSuccess: (customer: Customer) => void;
}) => {
  const { register, handleSubmit } = useForm<Customer>();

  return (
    <div className="flex items-center max-w-7xl mx-auto w-full">
      <Form
        className="w-full "
        onSubmit={handleSubmit(async (data) => {
          try {
            if (customer) {
              const response = await fetch("/api/customers/" + customer.id, {
                method: "PATCH",
                body: JSON.stringify(data),
              });
              const updatedCustomer: Customer = await response.json();
              onSuccess(updatedCustomer);
            } else {
              const response = await fetch("/api/customers", {
                method: "POST",
                body: JSON.stringify(data),
              });
              const newCustomer: Customer = await response.json();
              onSuccess(newCustomer);
            }
          } catch (error) {
            console.log(error);
          }
        })}
      >
        <div className="flex flex-col w-full">
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
              </Box>

              <Box className="w-1/2" p="2">
                <span className="font-semibold">Phone Number</span>
                <TextField.Root>
                  <TextField.Input
                    radius="large"
                    variant="classic"
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
