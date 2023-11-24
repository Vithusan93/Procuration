import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
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
