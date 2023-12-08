"use client";
import React from "react";
import { Flex, Heading, Box, Button, TextField,Callout } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { Staff } from "@prisma/client";
import { Form } from "@radix-ui/react-form";
import { useForm } from "react-hook-form";
import { createStaffSchema } from "../validationSchemas";
import { z } from "zod";
import {zodResolver} from '@hookform/resolvers/zod';
import { useState } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";

type StaffForm = z.infer<typeof createStaffSchema>;

const StaffForm = ({ staff }: { staff?: Staff }) => {
  const router = useRouter();
  const { register, handleSubmit,formState:{errors}  } = useForm<Staff>({resolver: zodResolver(createStaffSchema)});
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false)

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
              setSubmitting(true);
              await fetch("/api/staffs", {
                method: "POST",
                body: JSON.stringify(data),
              });
              router.push("/staffs");
            }
          } catch (error) {
            setError('An unexpcted error  occurred.');
            setSubmitting(false);
          }
        })}
      >
        <div className="flex flex-col w-full">
        {error &&<Callout.Root color="red" className="mb-5">
        <Callout.Text> {error}</Callout.Text>
        </Callout.Root>}
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
                <ErrorMessage>{errors.firstname?.message}</ErrorMessage>
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
                <ErrorMessage>{errors.lastname?.message}</ErrorMessage>
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
                <ErrorMessage>{errors.email?.message}</ErrorMessage>
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
                <ErrorMessage>{errors.phone?.message}</ErrorMessage>
              </Box>
            </Flex>
          </div>
          <div className="flex bg-gray-200 p-6 justify-center items-center gap-2">
            <Button size="3" variant="classic" disabled={isSubmitting}>
              {staff ? "Update Staff" : "Submit New Staff"}
              {isSubmitting && <Spinner/>}</Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default StaffForm;
