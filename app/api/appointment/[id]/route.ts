import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  console.log(body);

  const appointment = await prisma.appointment.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!appointment)
    return NextResponse.json({ error: "Invalid appointment" }, { status: 404 });

  const updatedAppointment = await prisma.appointment.update({
    where: { id: appointment.id },
    data: {
      serviceId: parseInt(body.serviceId),
      customerId: parseInt(body.customerId),
      staffId: parseInt(body.staffId),
      duration: parseInt(body.duration),
      
    },
    include: { customer: true },
  });

  return NextResponse.json(updatedAppointment);
}
