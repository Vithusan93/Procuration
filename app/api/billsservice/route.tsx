import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const invoiceservice = await prisma.invoiceService.findMany({
    // orderBy: { firstname: "asc" },
  });
  return NextResponse.json(invoiceservice);
}
export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("dans le request post api");
  console.log(body);

  const invoiceservice = await prisma.invoiceService.create({
    data: {
      billId: parseInt(body.billId),
      serviceId: parseInt(body.serviceId),
      price: parseInt(body.price),
      duration: parseInt(body.duration),
    },
  });

  return NextResponse.json(invoiceservice, { status: 201 });
}
