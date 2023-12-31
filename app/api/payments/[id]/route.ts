import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const payment = await prisma.payment.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!payment)
    return NextResponse.json({ error: "Invalid Payment" }, { status: 404 });

  const updatePayment = await prisma.payment.update({
    where: { id: payment.id },
    data: {
      amount: parseFloat(body.amount),
      paymentMethod: body.paymentMethod,
      billId: parseInt(body.billId),
    },
  });

  return NextResponse.json(updatePayment);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const payment = await prisma.payment.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!payment)
    return NextResponse.json(
      { error: "Invalid Invoice-payment" },
      { status: 404 }
    );

  await prisma.payment.delete({
    where: { id: payment.id },
  });

  return NextResponse.json({});
}
