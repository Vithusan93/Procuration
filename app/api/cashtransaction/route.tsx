// app/api/cashtransaction/routs.tsx
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const cashtransaction = await prisma.cashTransaction.findMany();
  return NextResponse.json(cashtransaction);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log("Dans la requête POST de l'API");
  console.log(body);

  const cashtransaction = await prisma.cashTransaction.create({
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

  return NextResponse.json(cashtransaction, { status: 201 });
}
