import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";


export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    const body = await request.json();
    console.log(body);
  
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });
    if (!product)
      return NextResponse.json({ error: "Invalid service" }, { status: 404 });
  
    const updatedProduct = await prisma.product.update({
      where: { id: product.id },
      data: {
        name: body.name,  description: body.description,       price: parseInt(body.price),
        stock: parseInt(body.stock),
      },
    });
  
    return NextResponse.json(updatedProduct);
  }
  