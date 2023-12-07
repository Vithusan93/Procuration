"use client";
import React from "react";
import { Flex, Heading, Box, Button, TextField,Callout,Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { Product } from "@prisma/client";
import { Form } from "@radix-ui/react-form";
import { useForm } from "react-hook-form";
import { createProductSchema } from "../validationSchemas";
import { z } from "zod";
import {zodResolver} from '@hookform/resolvers/zod';
import { useState } from "react";
import ErrorMessage from "@/components/ErrorMessage";

type ProductForm = z.infer<typeof createProductSchema>;

const ProductForm = ({ product }: { product?: Product }) => {
  const router = useRouter();
  const { register, handleSubmit,formState:{errors}  } = useForm<Product>({resolver: zodResolver(createProductSchema)});
  const [error, setError] = useState("");

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
            setError('An unexpcted error  occurred.');
          }
        })}
      >
        <div className="flex flex-col w-full">
        {error &&<Callout.Root color="red" className="mb-5">
        <Callout.Text> {error}</Callout.Text>
        </Callout.Root>}
          <div className="bg-gray-200 w-full p-4">
            <Heading className="text-gray-900">
              {product ? " Edit Product" : "New Product"}
            </Heading>
          </div>
        </div>
        <div className="flex p-2 bg-gray-100">
          <Flex gap="1">
            <Box className="w-1/2" p="2">
              <span className="font-semibold">Name</span>
              <TextField.Root>
                <TextField.Input
                  radius="large"
                  variant="classic"
                  size="3"
                  defaultValue={product?.name}
                  placeholder="Product Name"
                  {...register("name")}
                />
              </TextField.Root>
              <ErrorMessage>{errors.name?.message}</ErrorMessage>
            </Box>
            <Box className="w-1/2" p="2">
              <span className="font-semibold">Description</span>
              <TextField.Root>
                <TextField.Input
                  radius="large"
                  variant="classic"
                  size="3"
                  defaultValue={product?.description}
                  placeholder="Product Description"
                  {...register("description")}
                />
              </TextField.Root>
              <ErrorMessage>{errors.description?.message}</ErrorMessage>
            </Box>
            <Box className="w-1/2" p="2">
              <span className="font-semibold">Price</span>
              <TextField.Root>
                <TextField.Input
                  radius="large"
                  variant="classic"
                  size="3"
                  defaultValue={product?.price.toString()}
                  placeholder="Product Price"
                  {...register("price")}
                />
              </TextField.Root>
              <ErrorMessage>{errors.price?.message}</ErrorMessage>
            </Box>
            <Box className="w-1/2" p="2">
              <span className="font-semibold">Stock</span>
              <TextField.Root>
                <TextField.Input
                  radius="large"
                  variant="classic"
                  size="3"
                  defaultValue={product?.stock}
                  placeholder="Product Stock"
                  {...register("stock")}
                />
              </TextField.Root>
              <ErrorMessage>{errors.stock?.message}</ErrorMessage>
            </Box>
          </Flex>
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
