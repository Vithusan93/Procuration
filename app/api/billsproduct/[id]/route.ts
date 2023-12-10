import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  console.log(body);

  const invoiceProduct = await prisma.invoiceProduct.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!invoiceProduct)
    return NextResponse.json(
      { error: "Invalid Invoice-Product" },
      { status: 404 }
    );

  const updateinvoiceProduct = await prisma.invoiceProduct.update({
    where: { id: invoiceProduct.id },
    data: {
      billId: parseInt(body.billId),
      productId: parseInt(body.productId),
      price: parseInt(body.price),
      quantity: parseInt(body.quantity),
    },
  });

  return NextResponse.json(updateinvoiceProduct);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const invoiceProduct = await prisma.invoiceProduct.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!invoiceProduct)
    return NextResponse.json(
      { error: "Invalid Invoice-Product" },
      { status: 404 }
    );

  await prisma.invoiceProduct.delete({
    where: { id: invoiceProduct.id },
  });

  return NextResponse.json({});
}
