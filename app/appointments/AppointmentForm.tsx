"use client";
import React from "react";
import { Theme } from "@radix-ui/themes";
import { Flex, Text, Card, Button, TextField, Switch } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { Appointment } from "@prisma/client";
import { Form } from "@radix-ui/react-form";
import { useForm } from "react-hook-form";

const AppointmentForm = ({ appointment }: { appointment?: Appointment }) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<Appointment>();
  {
    /* 
                defaultValue={
                  appointment?.date
                    ? appointment?.date.toISOString().slice(0, 16)
                    : undefined
                }*/
  }
  console.log(register("email"));
  const isoDateString = appointment?.date
    ? appointment?.date.toISOString()
    : undefined;

  return (
    <div className="flex items-center max-w-7xl mx-auto w-full">
      <Form
        className="max-w-xl space-y-3 space-x-2 "
        onSubmit={handleSubmit(async (data) => {
          try {
            if (appointment) {
              await fetch("/api/appointment/" + appointment.id, {
                method: "PATCH",
                body: JSON.stringify(data),
              });
              router.push("/appointments ");
            } else {
              await fetch("/api/appointment", {
                method: "POST",
                body: JSON.stringify(data),
              });
              router.push("/appointments");
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
            Email
            <TextField.Root>
              <TextField.Input
                defaultValue={appointment?.email}
                placeholder="Appointment Email"
                {...register("email")}
              />
            </TextField.Root>
            Service
            <TextField.Root>
              <TextField.Input
                defaultValue={appointment?.service}
                placeholder="Appointment Service"
                {...register("service")}
              />
            </TextField.Root>
            Date
            <TextField.Root>
              <TextField.Input
                type="datetime-local"
                placeholder="Appointment Date"
                {...register("date")}
              />
            </TextField.Root>
            Staff
            <TextField.Root>
              <TextField.Input
                defaultValue={appointment?.staff}
                placeholder="Appointment Staff"
                {...register("staff")}
              />
              Statue
            </TextField.Root>
            <Text as="label" size="2">
              <Flex gap="2">
                <Switch
                  defaultChecked={appointment?.isPublished}
                  {...register("isPublished")}
                />
                Sync settings
              </Flex>
            </Text>
            <Button size="3" variant="classic">
              {appointment ? "Update Appointment" : "Submit New Appointment"}
            </Button>
          </Card>
        </Flex>
      </Form>
    </div>
  );
};

export default AppointmentForm;
