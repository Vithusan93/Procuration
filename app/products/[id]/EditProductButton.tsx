import { Button, Theme } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditProductButton = ({ productId }: { productId: number }) => {
  return (
    <div>
      <Button>
        <Link href={`/products/${productId}/edit`}>Editer Product</Link>
      </Button>
    </div>
  );
};

export default EditProductButton;
