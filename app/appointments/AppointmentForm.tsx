"use client";
import { Appointment, Customer, Staff, Service } from "@prisma/client";
import { Form } from "@radix-ui/react-form";
import {
  Box,
  Button,
  Heading,
  Text,
  TextField,
  Callout,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ServiceSelect from "./ServiceSelect";
import GetStaffButton from "./GetStaffsButton";
import GetCustomerButton from "./GetCustomerButton";
import MyCalendar from "./Calendar";
import { zodResolver } from "@hookform/resolvers/zod";
//import { createAppointmentSchema } from "../validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";

//type AppointmentForm = z.infer<typeof createAppointmentSchema>;

interface AppointmentDetail extends Appointment {
  customer: Customer;
  staff: Staff;
  service: Service;
}

const AppointmentForm = ({
  appointment,
  onSuccess,
}: {
  appointment?: AppointmentDetail;
  onSuccess: (appointment: Appointment) => void;
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Appointment>({
    /* resolver: zodResolver(createAppointmentSchema)*/
  });
  const [customer, setCustomer] = useState<Customer>();
  const [staff, setStaff] = useState<Staff>();
  const [service, setService] = useState<Service>();
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    if (data.time) {
      data.time = new Date(data.time);
    }

    try {
      if (appointment) {
        const response = await fetch("/api/appointment/" + appointment.id, {
          method: "PATCH",
          body: JSON.stringify(data),
        });
        router.push("/appointments");
        const updatedAppointment: Appointment = await response.json();
        onSuccess(updatedAppointment);
      } else {
        setSubmitting(true);
        await fetch("/api/appointment", {
          method: "POST",
          body: JSON.stringify(data),
        });
        router.push("/appointments");
      }
    } catch (error) {
      setError("An unexpcted error  occurred.");
      setSubmitting(false);
    }
  });

  useEffect(() => {
    if (appointment) {
      setCustomer(appointment.customer);
      setStaff(appointment.staff);
      setService(appointment.service);
    }
  }, [appointment]);

  return (
    <div className="flex items-center max-w-7xl mx-auto w-full">
      <Form className="w-full" onSubmit={onSubmit}>
        <div className="flex flex-col w-full">
          {error && (
            <Callout.Root color="red" className="mb-5">
              <Callout.Text> {error}</Callout.Text>
            </Callout.Root>
          )}
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
                {/*<ErrorMessage>{errors?.customerId?.message}</ErrorMessage> */}
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
                {/*<ErrorMessage>{errors?.customerId?.message}</ErrorMessage> */}
              </Box>
              <label className="w-full">
                <Text as="div" size="2" mb="1" weight="bold">
                  Service
                </Text>
                <ServiceSelect
                  name="serviceId"
                  label="Service"
                  placeholder="Service"
                  control={control}
                />
                {/*<ErrorMessage>{errors?.customerId?.message}</ErrorMessage> */}
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
                {/*<ErrorMessage>{errors?.customerId?.message}</ErrorMessage> */}
              </label>

              <div>
                <MyCalendar />
              </div>
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
