import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

import Link from "next/link";
import EditProductButton from "./EditProductButton";
import ProductDetails from "./ProductDetails";
import { Grid, Box, Theme } from "@radix-ui/themes";
interface Props {
  params: { id: string };
}

const ProductDetailPage = async ({ params }: Props) => {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!product) notFound();

  return (
    <div>
      <Theme>
        <Grid columns="3" gap="3" width="auto">
          <Box height="9">
            <ProductDetails product={product} />

            <EditProductButton productId={product.id} />
          </Box>
        </Grid>
      </Theme>
    </div>
  );
};

export default ProductDetailPage;
