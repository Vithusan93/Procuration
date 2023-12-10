import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const invoiceproduct = await prisma.invoiceProduct.findMany({
    // orderBy: { firstname: "asc" },
  });
  return NextResponse.json(invoiceproduct);
}
export async function POST(request: NextRequest) {
  const body = await request.json();

  const invoiceProduct = await prisma.invoiceProduct.create({
    data: {
      billId: parseInt(body.billId),
      productId: parseInt(body.productId),
      price: parseInt(body.price),
      quantity: parseInt(body.quantity),
    },
    include: { product: true },
  });

  return NextResponse.json(invoiceProduct, { status: 201 });
}
