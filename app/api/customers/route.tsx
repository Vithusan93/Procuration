import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createCustomerSchema } from "@/app/validationSchemas";




export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search");

  // Define the default orderBy option
  if (search) {
    const customers = await prisma.customer.findMany({
      where: {
        OR: [
          { firstname: { contains: search, mode: "insensitive" } },
          { lastname: { contains: search, mode: "insensitive" } },
        ],
      },
    });
    return NextResponse.json(customers);
  }
  const customers = await prisma.customer.findMany({
    orderBy: { firstname: "asc" },
  });
  return NextResponse.json(customers);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createCustomerSchema.safeParse(body);
  if(!validation.success)
  return NextResponse.json(validation.error.format(),{status:400});
  console.log(body);

  const customer = await prisma.customer.create({
    data: {
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      phone: parseInt(body.phone),
    },
  });

  return NextResponse.json(customer, { status: 201 });
}
