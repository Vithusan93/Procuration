import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";


export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    const body = await request.json();
    console.log(body);
  
    const staff = await prisma.staff.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });
    if (!staff)
      return NextResponse.json({ error: "Invalid customer" }, { status: 404 });
  
    const updatedStaff = await prisma.staff.update({
      where: { id: staff.id },
      data: { firstname: body.firstname, lastname: body.lastname , email: body.email , phone: parseInt(body.phone),},
    });
  
    return NextResponse.json(updatedStaff);
  }
  