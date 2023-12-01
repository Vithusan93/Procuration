import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";


export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    const body = await request.json();
    console.log(body);
  
    const invoiceService = await prisma.invoiceService.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });
    if (!invoiceService)
      return NextResponse.json({ error: "Invalid Invoice-Service" }, { status: 404 });
  
    const updateinvoiceService = await prisma.invoiceService.update({
      where: { id: invoiceService.id },
      data: {
        billId: parseInt(body.billId),
        serviceId: parseInt(body.serviceId),
        price: parseInt(body.price),
        duration: parseInt(body.duration),
      },
    });
  
    return NextResponse.json(updateinvoiceService);
  }
    