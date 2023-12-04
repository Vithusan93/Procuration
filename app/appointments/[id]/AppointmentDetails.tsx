import { Appointment } from "@prisma/client";
import React from "react";

const AppointmentDetails = ({ appointment }: { appointment: Appointment }) => {
  return (
    <div>
      <p>{appointment.customerId}</p>
      <p>{appointment.serviceId}</p>
      <p>{appointment.status}</p>
      <p>{appointment.time.toString()}</p>
      <p>{appointment.duration}</p>
    </div>
  );
};

export default AppointmentDetails;
