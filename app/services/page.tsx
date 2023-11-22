import prisma from '@/prisma/client'
import Link from 'next/link'
import React from 'react'

const Services = async () => {
const services = await prisma.service.findMany();
  return (
    <>
    <div>Services</div>
    <div>
        {services.map((service)=> (
            <div key={service.id}>
                <div>{service.name}</div>
                <div>{service.duration}</div>
                <div>{service.price}</div>
            </div>
        ))}
    </div>
    <Link href={"/services/new"}>
        <button>Add Service</button>
    </Link>
    </>
  )
}
export const dynamic = "force-dynamic"
export const revalidate = false

export default Services