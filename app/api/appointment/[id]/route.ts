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
      data:{
       // email: body.email,
        service: body.service,
        //date: body.date,
        staff: body.staff,
        //isPublished: body.isPublished,
      },
    });
  
    return NextResponse.json(updatedAppointment);
  }
  