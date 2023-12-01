"use client";
import { Product } from "@prisma/client";
import SelectControl from "@/components/SelectControl";
import { useEffect, useState } from "react";
const ProductSelect = ({
  name,
  label,
  placeholder,
  control,
}: {
  name: string;
  label: string;
  placeholder?: string;
  control: any;
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products", { cache: "no-store" });
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const options = products.map((product) => ({
    value: product.id.toString(),
    label: product.name,
  }));

  return (
    <SelectControl
      name={name}
      label={label}
      placeholder={placeholder}
      options={options}
      control={control}
    />
  );
};

export default ProductSelect;
