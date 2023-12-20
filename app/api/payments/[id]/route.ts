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
        staffId: parseInt(body.staffId),
        customerId: parseInt(body.customerId),
        amount: parseFloat(body.amount),
        paymentMethod: body.paymentMethod,
        createdAt: new Date(body.createdAt),
        billId: parseInt(body.billId),
        invoiceserviceId: parseInt(body.invoiceServiceId), // Modifiez le nom de la propriété ici
        invoiceproductId: parseInt(body.invoiceProductId),
    },
  });

  return NextResponse.json(updatePayment);
}
