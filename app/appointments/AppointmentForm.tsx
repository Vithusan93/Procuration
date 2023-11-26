"use client";
import { Appointment } from "@prisma/client";
import { Form } from "@radix-ui/react-form";
import { Button, Heading, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import CustomerSelect from "./CustomerSelect";
import StaffSelect from "./StaffSelect";
import SelectControl from "@/components/SelectControl";
import ServiceSelect from "./ServiceSelect";

const AppointmentForm = ({ appointment }: { appointment?: Appointment }) => {
  const router = useRouter();
  const { register, handleSubmit, control } = useForm<Appointment>();
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
        className="w-full"
        onSubmit={handleSubmit(async (data) => {
          console.log(data);

          try {
            if (appointment) {
              await fetch("/api/appointment/" + appointment.id, {
                method: "PATCH",
                body: JSON.stringify(data),
              });
              router.push("/appointments");
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
        <div className="flex flex-col w-full">
          <div className="bg-gray-200 w-full p-4">
            <Heading className="text-gray-900">Book Appointment</Heading>
          </div>
          <div className="flex p-2 bg-gray-100">
            <div className="w-1/4">
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Customer
                </Text>
                <CustomerSelect
                  name="customerId"
                  label="Customer"
                  placeholder="Customer"
                  control={control}
                />
              </label>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Staff
                </Text>
                <StaffSelect
                  name="staffId"
                  label="Staff"
                  placeholder="Staff"
                  control={control}
                />
              </label>
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Service
                </Text>
                <ServiceSelect
                  name="serviceId"
                  label="Service"
                  placeholder="Service"
                  control={control}
                />
              </label>
            </div>

            {/* <Flex
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
              </Card>
            </Flex> */}
            <div className="bg-gray-300 w-full p-2">
              <div className="">Calendar view (TODO)</div>
            </div>
          </div>
          <div className="flex bg-gray-200 p-3 justify-center items-center gap-2">
            <Button color="gray" size="3" variant="outline">
              Cancel
            </Button>
            <Button size="3" variant="solid">
              {appointment ? "Update Appointment" : "Book"}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AppointmentForm;
