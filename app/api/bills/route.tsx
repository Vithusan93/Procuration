import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const bills = await prisma.bill.findMany({
    include: { staff: true, customer: true },
  });
  return NextResponse.json(bills);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("dans le request post api");
  console.log(body);

  const bill = await prisma.bill.create({
    data: {
      createdAt: new Date(body.createdAt),
      billnumber: parseInt(body.billnumber),
      customerId: parseInt(body.customerId),
      staffId: parseInt(body.staffId),
      TotalAmount: parseInt(body.TotalAmount),
      TotalPaid: parseInt(body.TotalAmount),
    },
  });

  return NextResponse.json(bill, { status: 201 });
}
