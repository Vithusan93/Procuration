import prisma from "@/prisma/client";
import Link from "next/link";
import React from "react";
import { Table, Button, Theme } from "@radix-ui/themes";

const Products = async () => {
  const products = await prisma.product.findMany();
  return (
    <>
      <Theme>
        <div className="mb-5 ">
          <Button radius="large" variant="soft">
            <Link href={"/products/new"}>Add Product</Link>
          </Button>
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
      </Theme>
    </>
  );
};
export const dynamic = "force-dynamic";
export const revalidate = false;

export default Products;
