import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createServiceSchema } from "@/app/validationSchemas";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search");

  if (search) {
    const services = await prisma.service.findMany({
      where: {
        OR: [{ name: { contains: search, mode: "insensitive" } }],
      },
    });
    return NextResponse.json(services);
  }

  const services = await prisma.service.findMany({
    orderBy: { name: "asc" },
  });
  return NextResponse.json(services);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createServiceSchema.safeParse(body);

  console.log(body);

  const service = await prisma.service.create({
    data: {
      name: body.name,
      duration: parseInt(body.duration),
      price: parseInt(body.price),
    },
  });

  return NextResponse.json(service, { status: 201 });
}
