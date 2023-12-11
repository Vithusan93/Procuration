import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const invoiceservice = await prisma.invoiceService.findMany({
    where: { billId: parseInt(params.id) },
    include: { service: true },
  });
  return NextResponse.json(invoiceservice);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  console.log("dans le request post api");
  console.log(body);

  const invoiceService = await prisma.invoiceService.create({
    data: {
      billId: parseInt(params.id),
      serviceId: parseInt(body.serviceId),
      price: parseInt(body.price),
      duration: parseInt(body.duration),
    },
  });

  return NextResponse.json(invoiceService, { status: 201 });
}