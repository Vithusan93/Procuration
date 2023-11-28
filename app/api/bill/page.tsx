import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const bills = await prisma.bill.findMany({
    // orderBy: { firstname: "asc" },
  });
  return NextResponse.json(bills);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);

  const bill = await prisma.bill.create({
    data: {
        
    
            customerId?: body.id,
            productId: body.id,
            serviceId: body.id,
            staffId: parseInt(body.phone),
        

        }
    //  firstname: body.firstname,
     // lastname: body.lastname,
     // email: body.email,
     // phone: parseInt(body.phone),
    },
  });

  return NextResponse.json(bill, { status: 201 });
}
