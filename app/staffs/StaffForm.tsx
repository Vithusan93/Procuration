"use client";
import React from "react";
import { Theme } from "@radix-ui/themes";
import { Flex, Text, Card, Button, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { Staff } from "@prisma/client";
import { Form } from "@radix-ui/react-form";
import { useForm } from "react-hook-form";

const StaffForm = ({ staff }: { staff?: Staff }) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<Staff>();

  return (
    <div>
      <Form
        className="max-w-xl space-y-3"
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
        <Flex direction="column" gap="3" style={{ maxWidth: 350 }}>
          <Card variant="surface">
            FirstName
            <TextField.Root>
              <TextField.Input
                defaultValue={staff?.firstname}
                placeholder="Staff FisrtName"
                {...register("firstname")}
              />
            </TextField.Root>
            LastName
            <TextField.Root>
              <TextField.Input
                defaultValue={staff?.lastname}
                placeholder="StaffLastName"
                {...register("lastname")}
              />
            </TextField.Root>
            Email
            <TextField.Root>
              <TextField.Input
                defaultValue={staff?.email}
                placeholder="Staff Email"
                {...register("email")}
              />
            </TextField.Root>
            Phone Number
            <TextField.Root>
              <TextField.Input
                defaultValue={staff?.phone}
                placeholder="Staff Number"
                {...register("phone")}
              />
            </TextField.Root>
            <Button size="3" variant="soft">
              {staff ? "Update Staff" : "Submit New Staff"}
            </Button>
          </Card>
        </Flex>
      </Form>
    </div>
  );
};

export default StaffForm;
