import prisma from "@/prisma/client";
import Link from "next/link";
import React from "react";
import { Table, Button, Theme, Container, Heading } from "@radix-ui/themes";

const Products = async () => {
  const products = await prisma.product.findMany();
  return (
    <>
      <Theme>
        <Container size="4">
          <div className="flex flex-col w-full">
            <div className="bg-gray-200 w-full p-4">
              <Heading className="text-gray-900">Product Liste</Heading>
            </div>
          </div>
          <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell className="hidden md:table-cell">
                  Name
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="hidden md:table-cell">
                  Description
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="hidden md:table-cell">
                  Price
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="hidden md:table-cell">
                  Stock
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {products.map((product) => (
                <Table.Row key={product.id}>
                  <Table.Cell className="hidden md:table-cell">
                    <Link href={`/products/${product.id}`}>{product.name}</Link>
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    {product.description}
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    {product.price.toString()}
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    {product.stock.toString()}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Container>
        <Container className="mb-5 ">
          <div className="flex bg-gray-200 p-6 justify-center items-center gap-2">
            <Button size="3" variant="classic">
              <Link href={"/products/new"}>Add Product</Link>
            </Button>
          </div>
        </Container>
      </Theme>
    </>
  );
};
export const dynamic = "force-dynamic";
export const revalidate = false;

export default Products;
