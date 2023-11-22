import prisma from '@/prisma/client'
import Link from 'next/link'
import React from 'react'

const Products = async () => {
    const products = await prisma.product.findMany();
  return (
    <>
    <div>Products</div>
    <div>
        {products.map((product)=> (
            <div key={product.id}>
                <div>{product.name}</div>
            </div>
        ))}
    </div>
    <Link href={"/products/new"}>
        <button>Add New Product</button>
    </Link>
    </>
  )
}

export default Products