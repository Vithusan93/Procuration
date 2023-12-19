import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  console.log(body);

  const cashTransaction = await prisma.cashTransaction.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!cashTransaction)
    return NextResponse.json({ error: "Invalid Cash Transaction" }, { status: 404 });

  const updateCashTransaction = await prisma.cashTransaction.update({
    where: { id: cashTransaction.id },
    data: {
      billId: parseInt(body.billId),
      invoiceserviceId: parseInt(body.invoiceserviceId),
      invoiceproductId: parseInt(body.invoiceproductId),
      staffId: parseInt(body.staffId),
      amount: parseFloat(body.amount),
      type: body.type,
      createdAt: new Date(body.createdAt),
    },
  });

  return NextResponse.json(updateCashTransaction);
}
