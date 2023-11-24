"use client";
import React from "react";
import {
  Flex,
  Text,
  Card,
  Button,
  TextArea,
  TextField,
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
    <div>
      <Form
        className="max-w-xl space-y-3"
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
        <Flex direction="column" gap="3" style={{ maxWidth: 350 }}>
          <Card variant="surface">
            Name
            <TextField.Root>
              <TextField.Input
                defaultValue={service?.name}
                placeholder="Service Name"
                {...register("name")}
              />
            </TextField.Root>
            Duration
            <TextField.Root>
              <TextField.Input
                defaultValue={service?.duration}
                placeholder="Service Duration"
                {...register("duration")}
              />
            </TextField.Root>
            Price
            <TextField.Root>
              <TextField.Input
                defaultValue={service?.price}
                placeholder="Service Price"
                {...register("price")}
              />
            </TextField.Root>
            <Button size="3" variant="soft">
              {service ? "Update Service" : "Submit New Service"}
            </Button>
          </Card>
        </Flex>
      </Form>
    </div>
  );
};

export default ServiceForm;
