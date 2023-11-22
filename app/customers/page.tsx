import prisma from '@/prisma/client'
import Link from 'next/link'
import React from 'react'

const Customers= async () => {
const customers= await prisma.customer.findMany();
  return (
    <>
    <div>Customers</div>
    <div>
        {customers.map((customer)=> (
            <div key={customer.id}>
                <div>{customer.firstname}</div>
                <div>{customer.lastname}</div>
                <div>{customer.email}</div>
                <div>{customer.phone}</div>
            </div>
        ))}
    </div>
    <Link href={"/customers/new"}>
        <button>Add Customer</button>
    </Link>
    </>
  )
}
export const dynamic = "force-dynamic"
export const revalidate = false

export default Customers