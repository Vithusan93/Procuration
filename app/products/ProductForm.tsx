"use client";
import React from "react";
import { Theme } from "@radix-ui/themes";
import { Flex, Heading, Box, Button, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { Product } from "@prisma/client";
import { Form } from "@radix-ui/react-form";
import { useForm } from "react-hook-form";

const ProductForm = ({ product }: { product?: Product }) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<Product>();

  return (
    <div className="flex items-center max-w-7xl mx-auto w-full">
      <Form
        className="w-full "
        onSubmit={handleSubmit(async (data) => {
          try {
            if (product) {
              await fetch("/api/products/" + product.id, {
                method: "PATCH",
                body: JSON.stringify(data),
              });
              router.push("/products");
            } else {
              await fetch("/api/products", {
                method: "POST",
                body: JSON.stringify(data),
              });
              router.push("/products");
            }
          } catch (error) {
            console.log(error);
          }
        })}
      >
        <div className="flex flex-col w-full">
          <div className="bg-gray-200 w-full p-4">
            <Heading className="text-gray-900">
              {product ? " Edit Product" : "New Product"}
            </Heading>
          </div>
        </div>
        <div className="flex p-2 bg-gray-100">
          <div className="w-1/4">
            <Flex direction="column" gap="3" style={{ maxWidth: 400 }}>
              <Box height="9">
                Name
                <TextField.Root>
                  <TextField.Input
                    defaultValue={product?.name}
                    placeholder="Product Name"
                    {...register("name")}
                  />
                </TextField.Root>
              </Box>
              <Box height="9">
                Description
                <TextField.Root>
                  <TextField.Input
                    defaultValue={product?.description}
                    placeholder="Product Description"
                    {...register("description")}
                  />
                </TextField.Root>
              </Box>
              <Box height="9">
                Price
                <TextField.Root>
                  <TextField.Input
                    defaultValue={product?.price}
                    placeholder="Product Price"
                    {...register("price")}
                  />
                </TextField.Root>
              </Box>
              <Box height="9">
                Stock
                <TextField.Root>
                  <TextField.Input
                    defaultValue={product?.stock}
                    placeholder="Product Stock"
                    {...register("stock")}
                  />
                </TextField.Root>
              </Box>
            </Flex>
          </div>
        </div>
        <div className="flex bg-gray-200 p-6 justify-center items-center gap-2">
          <Button size="3" variant="classic">
            {product ? "Update Product" : "Submit New Product"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ProductForm;
