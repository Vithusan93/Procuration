import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";


export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    const body = await request.json();
    console.log(body);
  
    const bill = await prisma.bill.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });
    if (!bill)
      return NextResponse.json({ error: "Invalid Invoice" }, { status: 404 });
  
    const updatedBill = await prisma.bill.update({
      where: { id: bill.id },
      data: {
        createdAt: body.createdAt,
        billnumber: parseInt(body.billnumber),
        customerId: parseInt(body.customerId),
        staffId: parseInt(body.staffId),
        TotalAmount: parseInt(body.TotalAmount),
        TotalPaid: parseInt(body.TotalAmount),
      },
    });
  
    return NextResponse.json(updatedBill);
  }
    