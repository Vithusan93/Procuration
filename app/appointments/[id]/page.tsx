import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import { Box } from "@radix-ui/themes";
import Link from "next/link";
import EditAppointmentButton from "./EditAppointmentButton";
import AppointmentDetails from "./AppointmentDetails";

interface Props {
  params: { id: string };
}

const AppointmentDetailPage = async ({ params }: Props) => {
  const appointment = await prisma.appointment.findUnique({
    where: { id: parseInt(params.id) },
    include: { customer: true },
  });

  if (!appointment) notFound();

  appointment.customer.firstname;

  return (
    <div className="flex items-center max-w-7xl mx-auto w-full">
      <div className="w-full p-20">
        <Box height="9">
          <AppointmentDetails appointment={appointment} />

          <EditAppointmentButton appointmentId={appointment.id} />
        </Box>
      </div>
    </div>
  );
};

export default AppointmentDetailPage;
