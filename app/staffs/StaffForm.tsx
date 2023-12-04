"use client";
import React from "react";
import { Theme } from "@radix-ui/themes";
import { Flex, Heading, Box, Button, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { Staff } from "@prisma/client";
import { Form } from "@radix-ui/react-form";
import { useForm } from "react-hook-form";

const StaffForm = ({ staff }: { staff?: Staff }) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<Staff>();

  return (
    <div className="flex items-center max-w-7xl mx-auto w-full">
      <Form
        className="w-full "
        onSubmit={handleSubmit(async (data) => {
          try {
            if (staff) {
              await fetch("/api/staffs/" + staff.id, {
                method: "PATCH",
                body: JSON.stringify(data),
              });
              router.push("/staffs");
            } else {
              await fetch("/api/staffs", {
                method: "POST",
                body: JSON.stringify(data),
              });
              router.push("/staffs");
            }
          } catch (error) {
            console.log(error);
          }
        })}
      >
        <div className="flex flex-col w-full">
          <div className="bg-gray-200 w-full p-4">
            <Heading className="text-gray-900">
              {staff ? " Edit Staff" : "New Staff"}
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
                    defaultValue={staff?.firstname}
                    placeholder="Staff FisrtName"
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
                    defaultValue={staff?.lastname}
                    placeholder="StaffLastName"
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
                    defaultValue={staff?.email}
                    placeholder="Staff Email"
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
                    defaultValue={staff?.phone}
                    placeholder="Staff Number"
                    {...register("phone")}
                  />
                </TextField.Root>
              </Box>
            </Flex>
          </div>
          <div className="flex bg-gray-200 p-6 justify-center items-center gap-2">
            <Button size="3" variant="classic">
              {staff ? "Update Staff" : "Submit New Staff"}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default StaffForm;
