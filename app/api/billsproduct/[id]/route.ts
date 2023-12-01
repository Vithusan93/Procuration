import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";


export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    const body = await request.json();
    console.log(body);
  
    const updateinvoiceProduct = await prisma.invoiceProduct.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });
    if (!updateinvoiceProduct )
      return NextResponse.json({ error: "Invalid Invoice-Product" }, { status: 404 });
  
    const updatedBill = await prisma.invoiceProduct.update({
      where: { id: updateinvoiceProduct.id },
      data: {
        billId: parseInt(body.billId),
        productId: parseInt(body.productId),
        price: parseInt(body.price),
        quantity: parseInt(body.quantity),
      },
    });
  
    return NextResponse.json(updateinvoiceProduct);
  }
    