import { InvoiceProduct } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";
import { Text, TextField } from "@radix-ui/themes";
import ProductSelect from "./ProductSelect";

const InvoiceProductForm = () => {
  const { register, handleSubmit, control } = useForm<InvoiceProduct>();
  return (
    <div>
      <form>
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Product
          </Text>
          <ProductSelect
            name="productId"
            label="Product"
            placeholder="Product"
            control={control}
          />
        </label>
        <label htmlFor="quantity">
          <Text as="div" size="2" mb="1" weight="bold">
            Quantity
          </Text>
          <TextField.Root>
            <TextField.Input
              type="number"
              placeholder="Quantity"
              defaultValue={1}
              {...register("quantity")}
            />
          </TextField.Root>
        </label>
        <label htmlFor="price">
          <Text as="div" size="2" mb="1" weight="bold">
            Price
          </Text>
          <TextField.Root>
            <TextField.Input
              type="number"
              placeholder="Price"
              {...register("price")}
            />
          </TextField.Root>
        </label>{" "}
      </form>
    </div>
  );
};

export default InvoiceProductForm;
