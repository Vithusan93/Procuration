"use client";
import { Appointment, Customer, Staff } from "@prisma/client";
import { Form } from "@radix-ui/react-form";
import { Box, Button, Heading, Text, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ServiceSelect from "./ServiceSelect";
import StaffSelect from "./StaffSelect";
import GetStaffButton from "./GetStaffsButton";
import GetCustomerButton from "./GetCustomerButton";

const AppointmentForm = ({ appointment }: { appointment?: Appointment }) => {
  const router = useRouter();
  const { register, handleSubmit, control, setValue } = useForm<Appointment>();

  const [customer, setCustomer] = useState<Customer>();
  const [staff, setStaff] = useState<Staff>();

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
            <div className="w-1/4 p-2">
              <Box className="shadow p-2 bg-gray-100 w-full">
                <div className="text-gray-800 text-sm font-semibold">
                  Customer
                </div>
                <div className="bg-gray-300 rounded-md p-2">
                  {customer ? (
                    <span className="text-md text-gray-900 font-semibold ">
                      {customer.firstname} {customer.lastname}
                    </span>
                  ) : (
                    <span>Customer not selected</span>
                  )}
                </div>
                <GetCustomerButton
                  onCustomerSelect={(customer) => {
                    setCustomer(customer);
                    setValue("customerId", customer.id);
                  }}
                />
              </Box>

              <Box className="shadow p-2 bg-gray-100 w-full">
                <div className="text-gray-800 text-sm font-semibold">Staff</div>
                <div className="bg-gray-300 rounded-md p-2">
                  {staff ? (
                    <span className="text-md text-gray-900 font-semibold ">
                      {staff.firstname} {staff.lastname}
                    </span>
                  ) : (
                    <span>Staff not selected</span>
                  )}
                </div>
                <GetStaffButton
                  onStaffSelect={(staff) => {
                    setStaff(staff);
                    setValue("staffId", staff.id);
                  }}
                />
              </Box>
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
                  Duration
                  <span className="text-gray-800 text-sm ml-2">Minutes</span>
                </span>
                <TextField.Root>
                  <TextField.Input
                    type="number"
                    placeholder="Duration in Minutes"
                    defaultValue={appointment?.duration}
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
