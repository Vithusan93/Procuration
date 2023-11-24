"use client";
import React from "react";
import { Theme } from "@radix-ui/themes";
import { Flex, Text, Card, Button, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { Product } from "@prisma/client";
import { Form } from "@radix-ui/react-form";
import { useForm } from "react-hook-form";

const ProductForm = ({ product }: { product?: Product }) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<Product>();

  return (
    <div>
      <Form
        className="max-w-xl space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await fetch("/api/products", {
              method: "POST",
              body: JSON.stringify(data),
            });
            router.push("/products");
          } catch (error) {
            console.log(error);
          }
        })}
      >
        <Flex direction="column" gap="3" style={{ maxWidth: 350 }}>
          <Card variant="surface">
            Name
            <TextField.Root>
              <TextField.Input
                defaultValue={product?.name}
                placeholder="Product Name"
                {...register("name")}
              />
            </TextField.Root>
            Description
            <TextField.Root>
              <TextField.Input
                defaultValue={product?.description}
                placeholder="Product Description"
                {...register("description")}
              />
            </TextField.Root>
            Price
            <TextField.Root>
              <TextField.Input
                defaultValue={product?.price}
                placeholder="Product Price"
                {...register("price")}
              />
            </TextField.Root>
            Stock
            <TextField.Root>
              <TextField.Input
                defaultValue={product?.stock}
                placeholder="Product Stock"
                {...register("stock")}
              />
            </TextField.Root>
            <Button size="3" variant="soft">
              Add Product
            </Button>
          </Card>
        </Flex>
      </Form>
    </div>
  );
};

export default ProductForm;
