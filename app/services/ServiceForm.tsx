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
            <div className="w-1/4"></div>
            <Flex direction="column" gap="3" style={{ maxWidth: 400 }}>
              <Box height="9">
                Name
                <Flex
                  direction="column"
                  gap="3"
                  style={{ maxWidth: 400 }}
                ></Flex>
                <TextField.Root>
                  <TextField.Input
                    defaultValue={service?.name}
                    placeholder="Service Name"
                    {...register("name")}
                  />
                </TextField.Root>
              </Box>
              <Box height="9">
                Duration
                <TextField.Root>
                  <TextField.Input
                    defaultValue={service?.duration}
                    placeholder="Service Duration"
                    {...register("duration")}
                  />
                </TextField.Root>
              </Box>
              <Box height="9">
                Price
                <TextField.Root>
                  <TextField.Input
                    defaultValue={service?.price.toString()}
                    placeholder="Service Price"
                    {...register("price")}
                  />
                </TextField.Root>
              </Box>
            </Flex>
          </div>
          <div className="flex bg-gray-200 p-6 justify-center items-center gap-2">
            <Button size="3" variant="soft">
              {service ? "Update Service" : "Submit New Service"}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ServiceForm;
