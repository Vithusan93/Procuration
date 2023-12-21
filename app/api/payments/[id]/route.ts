import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  console.log(body);

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
        createdAt: new Date(body.createdAt),
        billId: parseInt(body.billId),

    },
  });

  return NextResponse.json(updatePayment);
}
