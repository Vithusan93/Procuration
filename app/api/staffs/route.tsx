import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createStaffSchema } from "@/app/validationSchemas";

export async function GET(request: NextRequest) {
  const staffs = await prisma.staff.findMany({
    orderBy: { firstname: "asc" },
  });
  return NextResponse.json(staffs);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createStaffSchema.safeParse(body);
  console.log(body);

  const staff = await prisma.staff.create({
    data: {
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      phone: parseInt(body.phone),
    },
  });

  return NextResponse.json(staff, { status: 201 });
}
