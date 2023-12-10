"use client";
import { InvoiceProduct } from "@prisma/client";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

const InvoiceProductsCard = ({ invoiceId }: { invoiceId?: number }) => {
  const [invoiceProducts, setInvoiceProducts] = useState<InvoiceProduct[]>([]);

  useEffect(() => {
    const getInvoiceProducts = async () => {
      const response = await fetch(`/api/bills/${invoiceId}/products`, {
        cache: "no-store",
      });
      const data: InvoiceProduct[] = await response.json();
      setInvoiceProducts(data);
    };
    getInvoiceProducts();
  }, [invoiceId]);

  const total: { quantity: number; price: number } = { quantity: 0, price: 0 };

  invoiceProducts.forEach((invoiceProduct) => {
    total.quantity += invoiceProduct.quantity;
    total.price +=
      parseFloat(invoiceProduct.price.toString()) * invoiceProduct.quantity;
  });

  return (
    <Card>
      <Flex gap="3" align="center">
        <Box>
          <Text as="div" size="2" weight="bold">
            Products
          </Text>
          <Text as="div" size="2" color="gray">
            Total Amount: {total.price.toString()} Euros
          </Text>
          <Text as="div" size="2" color="gray">
            For {total.quantity.toString()} items
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};

export default InvoiceProductsCard;
