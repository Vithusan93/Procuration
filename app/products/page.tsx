import prisma from '@/prisma/client'
import Link from 'next/link'
import React from 'react'
import { Table} from '@radix-ui/themes'

const Products = async () => {
const products = await prisma.product.findMany();
  return (
    <>
           <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Description</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Price</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Stock</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {products.map((product)=> (
            <Table.Row  key={product.id}>
                <Table.Cell className='hidden md:table-cell'>{product.name}</Table.Cell>
                <Table.Cell className='hidden md:table-cell'>{product.description}</Table.Cell>
                <Table.Cell className='hidden md:table-cell'>{product.price.toString()}</Table.Cell>
                <Table.Cell className='hidden md:table-cell'>{product.stock.toString()}</Table.Cell>
            </Table.Row>
        ))}
            </Table.Body>
        
        </Table.Root>
    <Link href={"/products/new"}>
        <button>Add New Product</button>
    </Link>
    </>
  )
}
export const dynamic = "force-dynamic"
export const revalidate = false

export default Products