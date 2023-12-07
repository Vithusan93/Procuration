import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createAppointmentSchema } from "@/app/validationSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createAppointmentSchema.safeParse(body);
  console.log(body);

  const appointment = await prisma.appointment.create({
    data: {
      customerId: parseInt(body.customerId),
      staffId: parseInt(body.staffId),
      serviceId: parseInt(body.serviceId),
      duration: parseInt(body.duration),
      time: body.time,
      status: "pending",
    },
    include: {
      customer: true,
    },
  });

  return NextResponse.json(appointment, { status: 201 });
}
