import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("dans le request post api");
  console.log(body);

  const appointment = await prisma.appointment.create({
    data: {
      customerId: parseInt(body.customerId),
      staffId: parseInt(body.staffId),
      serviceId: parseInt(body.serviceid),
      duration: parseInt(body.duration),
      staff: { connect: { id: parseInt(body.staffId) } },
      time: body.time,
      status: "pending",
    },
  });

  return NextResponse.json(appointment, { status: 201 });
}
