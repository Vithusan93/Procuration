import React from "react";

import { string } from "zod";
import prisma from "@/prisma/client";
import { parse } from "path";
import AppointmentForm from "../../AppointmentForm";

interface Props {
  params: { id: string };
}

const EditAppointmentPage = async ({ params }: Props) => {
  const appointment = await prisma.appointment.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!appointment) return;
  return <AppointmentForm appointment={appointment} />;
};

export default EditAppointmentPage;
