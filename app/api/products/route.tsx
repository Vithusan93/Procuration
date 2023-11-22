import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"

export async function POST(request: NextRequest){
  //TODO: Add authentication
  const body = await request.json()
  console.log(body);
  
  const product = await prisma.product.create({
    data: { name: body.name,  description: body.description, price: parseInt(body.price), stock: parseInt(body.stock)}
  })

  // Validate the input
  // Add the product to database
  return NextResponse.json(product, {status: 201})
  
} 
