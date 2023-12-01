import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const bill = await prisma.bill.findMany({
    // orderBy: { firstname: "asc" },
  });
  return NextResponse.json(bill);
}
export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("dans le request post api");
  console.log(body);

  const bill = await prisma.bill.create({
    data: {
      createdAt: body.createdAt,
      billnumber: parseInt(body.billnumber),
      customerId: parseInt(body.customerId),
      staffId: parseInt(body.staffId),
    },
  });

  return NextResponse.json(bill, { status: 201 });
}