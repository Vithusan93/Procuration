import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import { Button, Theme } from "@radix-ui/themes";
import Link from "next/link";
import EditProductButton from "./EditProductButton";
import ProductDetails from "./ProductDetails";

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
        <div>
          <ProductDetails product={product} />
        </div>
        <div>
          <EditProductButton productId={product.id} />
        </div>
      </Theme>
    </div>
  );
};

export default ProductDetailPage;
