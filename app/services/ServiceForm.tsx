"use client";
import React from "react";
import {
  Flex,
  Text,
  Button,
  TextField,
  Heading,
  Callout,
  Box,
} from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { createServiceSchema } from "../validationSchemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import ErrorMessage from "@/components/ErrorMessage";
import "easymde/dist/easymde.min.css";
import { Form } from "@radix-ui/react-form";
import { useRouter } from "next/navigation";
import { Service } from "@prisma/client";
import Spinner from "@/components/Spinner";

type ServiceForm = z.infer<typeof createServiceSchema>;

const ServiceForm = ({ service }: { service?: Service }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Service>({ resolver: zodResolver(createServiceSchema) });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      if (service) {
        await fetch("/api/services/" + service.id, {
          method: "PATCH",
          body: JSON.stringify(data),
        });
        router.push("/services");
      } else {
        setSubmitting(true);
        await fetch("/api/services", {
          method: "POST",
          body: JSON.stringify(data),
        });
        router.push("/services");
      }
    } catch (error) {
      setError("An unexpcted error  occurred.");
      setSubmitting(false);
    }
  });

  return (
    <div className="flex items-center max-w-7xl mx-auto w-full">
      <Form className="w-full " onSubmit={onSubmit}>
        <div className="flex flex-col w-full">
          {error && (
            <Callout.Root color="red" className="mb-5">
              <Callout.Text> {error}</Callout.Text>
            </Callout.Root>
          )}
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
                <ErrorMessage>{errors.name?.message}</ErrorMessage>
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
                <ErrorMessage>{errors.duration?.message}</ErrorMessage>
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
                <ErrorMessage>{errors.price?.message}</ErrorMessage>
              </Box>
            </Flex>
          </div>
          <div className="flex bg-gray-200 p-6 justify-center items-center gap-2">
            <Button size="3" variant="classic" disabled={isSubmitting}>
              {service ? "Update Service" : "Submit New Service"}
              {isSubmitting && <Spinner />}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ServiceForm;
