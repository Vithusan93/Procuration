import React from "react";

import { string } from "zod";
import prisma from "@/prisma/client";
import { parse } from "path";
import { Product } from "@prisma/client";
import ProductForm from "../../ProductForm";

interface Props {
  params: { id: string };
}

const EditProductPage = async ({ params }: Props) => {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!product) return;
  return <ProductForm product={product} />;
};

export default EditProductPage;
