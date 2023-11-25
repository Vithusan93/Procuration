import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("dans le request post api");
  console.log(body);

  const appointment = await prisma.appointment.create({
    data: {
      email: body.email,
      service: body.service,
      //date: body.date,
      staff: body.staff,
      //isPublished: body.isPublished,
    },
  });

  return NextResponse.json(appointment, { status: 201 });
}
