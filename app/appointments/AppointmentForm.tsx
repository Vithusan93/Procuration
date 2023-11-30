"use client";
import { Appointment } from "@prisma/client";
import { Form } from "@radix-ui/react-form";
import { Button, Heading, Text, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import CustomerSelect from "./CustomerSelect";
import ServiceSelect from "./ServiceSelect";
import StaffSelect from "./StaffSelect";

const AppointmentForm = ({ appointment }: { appointment?: Appointment }) => {
  const router = useRouter();
  const { register, handleSubmit, control } = useForm<Appointment>();

  return (
    <div className="flex items-center max-w-7xl mx-auto w-full">
      <Form
        className="w-full"
        onSubmit={handleSubmit(async (data) => {
          console.log(data);

          if (data.time) {
            data.time = new Date(data.time);
          }

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

            <div className="bg-gray-300 w-full p-2">
              <div className="">Calendar view (TODO)</div>
              <label htmlFor="time">
                <span className="font-semibold">Appointment Time</span>
                <TextField.Root>
                  <TextField.Input
                    type="datetime-local"
                    placeholder="Appointment Date"
                    {...register("time")}
                  />
                </TextField.Root>
              </label>
              <label htmlFor="time">
                <span className="font-semibold">
                  Duration{" "}
                  <span className="text-gray-800 text-sm ml-2">Minutes</span>
                </span>
                <TextField.Root>
                  <TextField.Input
                    type="number"
                    placeholder="Duration in Minutes"
                    {...register("duration")}
                  />
                </TextField.Root>
              </label>
            </div>
          </div>
          <div className="flex bg-gray-200 p-3 justify-center items-center gap-2">
            <Button color="gray" size="3" variant="outline">
              Cancel
            </Button>
            <Button size="3" variant="classic">
              {appointment ? "Update Appointment" : "Book"}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AppointmentForm;
