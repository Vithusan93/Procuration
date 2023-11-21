import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { appointmentSchema } from "../../validationSchemas";

export async function POST(request: NextRequest){
  const body = await request.json();
  const validation = appointmentSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newAppointment = await prisma.appointment.create({
    data: { 
        date: body.date,
        mail: body.mail,
        service: body.service,
        isPublished: body.isPublished, 
    }
  })  

  return NextResponse.json(newAppointment, { status: 201 } )
}
