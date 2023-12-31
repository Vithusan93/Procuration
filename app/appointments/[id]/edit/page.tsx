import prisma from "@/prisma/client";
import AppointmentForm from "../../AppointmentForm";

interface Props {
  params: { id: string };
}

const EditAppointmentPage = async ({ params }: Props) => {
  const appointment = await prisma.appointment.findUnique({
    where: { id: parseInt(params.id) },
    include: { customer: true, staff: true, service: true },
  });

  if (!appointment) return;
  return <AppointmentForm appointment={appointment} onSuccess={() => {}} />;
};

export default EditAppointmentPage;
