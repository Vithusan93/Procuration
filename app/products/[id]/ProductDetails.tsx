import { Product } from "@prisma/client";
import React from "react";

const ProductDetails = ({ product }: { product: Product }) => {
  return (
    <div>
      <p>{product.name}</p>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <p>{product.stock}</p>
    </div>
  );
};

export default ProductDetails;
