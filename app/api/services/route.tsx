import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"

export async function POST(request: NextRequest){
  
  const body = await request.json()
  console.log(body);
  
  const service = await prisma.service.create({
    data: { name: body.name,  duration: parseInt(body.duration), price: parseInt(body.price)}
  })


  return NextResponse.json(service, {status: 201})
  
} 
