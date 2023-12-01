import { Appointment } from "@prisma/client";
import React from "react";

const AppointmentDetails = ({ appointment }: { appointment: Appointment }) => {
  return (
    <div>
      <p>{appointment.customerId.}</p>
      <p>{appointment.service}</p>
      <p>{appointment.staff}</p>
      <p>{appointment.date.toString()}</p>
      <p>{appointment.isPublished}</p>
    </div>
  );
};

export default AppointmentDetails;
