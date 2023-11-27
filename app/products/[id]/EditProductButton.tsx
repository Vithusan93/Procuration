import { Button, Theme } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditProductButton = ({ productId }: { productId: number }) => {
  return (
    <div>
      <Theme>
        <div className="flex bg-gray-200 p-6 justify-center items-center gap-2">
          <Button>
            <Link href={`/products/${productId}/edit`}>Editer Product</Link>
          </Button>
        </div>
      </Theme>
    </div>
  );
};

export default EditProductButton;
