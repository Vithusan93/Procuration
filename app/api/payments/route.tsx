import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const payments = await prisma.payment.findMany();
  return NextResponse.json(payments);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const payment = await prisma.payment.create({
    data: {
      amount: parseFloat(body.amount),
      paymentMethod: body.paymentMethod,
      billId: parseInt(body.billId),
    },
  });

  return NextResponse.json(payment, { status: 201 });
}
