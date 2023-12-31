import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const payments = await prisma.payment.findMany({
    where: { billId: parseInt(params.id) },
  });
  return NextResponse.json(payments);
}
