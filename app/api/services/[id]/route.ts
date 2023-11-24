import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";


export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    const body = await request.json();
    console.log(body);
  
    const service = await prisma.service.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });
    if (!service)
      return NextResponse.json({ error: "Invalid service" }, { status: 404 });
  
    const updatedService = await prisma.service.update({
      where: { id: service.id },
      data: {
        name: body.name,
        duration: parseInt(body.duration),
        price: parseInt(body.price),
      },
    });
  
    return NextResponse.json(updatedService);
  }
  