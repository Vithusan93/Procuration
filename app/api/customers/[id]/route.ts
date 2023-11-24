import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";


export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    const body = await request.json();
    console.log(body);
  
    const customer = await prisma.customer.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });
    if (!customer)
      return NextResponse.json({ error: "Invalid customer" }, { status: 404 });
  
    const updatedCustomer = await prisma.customer.update({
      where: { id: customer.id },
      data: { firstname: body.firstname, lastname: body.lastname , email: body.email , phone: parseInt(body.phone),},
    });
  
    return NextResponse.json(updatedCustomer);
  }
  