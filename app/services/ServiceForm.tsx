"use client";
import React from "react";
import {
  Flex,
  Text,
  Button,
  TextField,
  Heading,
  Grid,
  Box,
} from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Form } from "@radix-ui/react-form";
import { useRouter } from "next/navigation";
import { Service } from "@prisma/client";

const ServiceForm = ({ service }: { service?: Service }) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<Service>();

  console.log();

  return (
    <div className="flex items-center max-w-7xl mx-auto w-full">
      <Form
        className="w-full "
        onSubmit={handleSubmit(async (data) => {
          try {
            if (service) {
              await fetch("/api/services/" + service.id, {
                method: "PATCH",
                body: JSON.stringify(data),
              });
              router.push("/services");
            } else {
              await fetch("/api/services", {
                method: "POST",
                body: JSON.stringify(data),
              });
              router.push("/services");
            }
          } catch (error) {
            console.log(error);
          }
        })}
      >
        <div className="flex flex-col w-full">
          <div className="bg-gray-200 w-full p-4">
            <Heading className="text-gray-900">
              {service ? " Edit Service" : "New Service"}
            </Heading>
          </div>

          <div className="flex p-2 bg-gray-100">
            <Flex gap="1">
              <Box className="w-1/2" p="2">
                <span className="font-semibold">Service Name</span>
                <TextField.Root>
                  <TextField.Input
                    radius="large"
                    variant="classic"
                    size="3"
                    defaultValue={service?.name}
                    placeholder="Service Name"
                    {...register("name")}
                  />
                </TextField.Root>
              </Box>
              <Box className="w-1/2" p="2">
                <span className="font-semibold">Duration</span>
                <TextField.Root>
                  <TextField.Input
                    radius="large"
                    variant="classic"
                    size="3"
                    defaultValue={service?.duration}
                    placeholder="Service Duration"
                    {...register("duration")}
                  />
                </TextField.Root>
              </Box>
              <Box className="w-1/2" p="2">
                <span className="font-semibold">Price</span>
                <TextField.Root>
                  <TextField.Input
                    radius="large"
                    variant="classic"
                    size="3"
                    defaultValue={service?.price.toString()}
                    placeholder="Service Price"
                    {...register("price")}
                  />
                </TextField.Root>
              </Box>
            </Flex>
          </div>
          <div className="flex bg-gray-200 p-6 justify-center items-center gap-2">
            <Button size="3" variant="classic">
              {service ? "Update Service" : "Submit New Service"}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ServiceForm;
