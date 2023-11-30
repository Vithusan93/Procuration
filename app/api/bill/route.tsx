import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import BillPage from "@/app/bills/page";

export async function GET(request: NextRequest) {
  const bills = await prisma.bill.findMany({
    // orderBy: { firstname: "asc" },
  });
  return NextResponse.json(bills);
}
{
  /*
export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);

  const staff = await prisma.staff.findUnique({
    where:{
      id: ,
    }
  });

  const bill = await prisma.bill.create({
    data: {
      staff:{
        connect:{
          id: staff.id,
        }
      },
      //       customerId?: body.id,
      //       productId: body.id,
      //     serviceId: body.id,
      //   staffId: parseInt(body.phone),
    },
  });

  return NextResponse.json(bill, { status: 201 });
}
*/
}
