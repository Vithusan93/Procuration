import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  console.log(body);

  const bill = await prisma.bill.findUnique({
    where: {
      id: parseInt(params.id),
    },
    include: { InvoiceProducts: true, InvoiceServices: true },
  });
  if (!bill)
    return NextResponse.json({ error: "Invalid Invoice" }, { status: 404 });

  //  TODO Check prisma queries for aggregation
  let totalAmount: number = 0.0;

  bill.InvoiceProducts.forEach((product) => {
    totalAmount += product.price.toNumber() * product.quantity;
  });

  bill.InvoiceServices.forEach((service) => {
    totalAmount += service.price.toNumber() * service.duration;
  });

  const updatedBill = await prisma.bill.update({
    where: { id: bill.id },
    data: {
      invoiceDate: body.invoiceDate,
      billnumber: parseInt(body.billnumber),
      customerId: parseInt(body.customerId),
      staffId: parseInt(body.staffId),
      TotalAmount: totalAmount,
      TotalPaid: parseInt(body.TotalAmount),
    },
  });

  return NextResponse.json(updatedBill);
}
