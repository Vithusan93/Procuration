import { Product } from "@prisma/client";
import React from "react";
import { Flex, Text, Table, Box, Heading, Container } from "@radix-ui/themes";

const ProductDetails = ({ product }: { product: Product }) => {
  return (
    <div>
      <Container size="4">
        <div className="flex flex-col w-full">
          <div className="bg-gray-200 w-full p-4">
            <Heading className="text-gray-900">
              {product ? " Product Details " : "New Product"}
            </Heading>

            <Box
              style={{
                background: "var(--gray-a2)",
                borderRadius: "var(--radius-3)",
              }}
            >
              <Table.Root variant="surface">
                <Table.Body>
                  <Table.Cell className="hidden md:table-cell">
                    <p>{product.name}</p>
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    <p>{product.description}</p>
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    <p>{product.price}</p>
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    <p>{product.stock}</p>
                  </Table.Cell>
                </Table.Body>
              </Table.Root>
            </Box>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetails;
