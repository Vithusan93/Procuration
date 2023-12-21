import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const payments = await prisma.payment.findMany();
  return NextResponse.json(payments);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("Dans la requête POST de l'API");
  console.log(body);

  const payment = await prisma.payment.create({
    data: {
      amount: parseFloat(body.amount),
      paymentMethod: body.paymentMethod,
      createdAt: new Date(body.createdAt),
      billId: parseInt(body.billId),
    },
  });

  return NextResponse.json(payment, { status: 201 });
}
