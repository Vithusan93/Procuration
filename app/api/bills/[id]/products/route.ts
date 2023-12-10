import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const invoiceproduct = await prisma.invoiceProduct.findMany({
    where: { billId: parseInt(params.id) },
    include: { product: true },
  });
  return NextResponse.json(invoiceproduct);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  console.log("dans le request post api");
  console.log(body);

  const invoiceProduct = await prisma.invoiceProduct.create({
    data: {
      billId: parseInt(params.id),
      productId: parseInt(body.productId),
      price: parseInt(body.price),
      quantity: parseInt(body.quantity),
    },
  });

  return NextResponse.json(invoiceProduct, { status: 201 });
}
