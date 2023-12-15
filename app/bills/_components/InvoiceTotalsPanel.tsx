"use client";
import { InvoiceService } from "@prisma/client";
import { InvoiceProduct } from "@prisma/client";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

const InvoiceTotalsCard = ({ invoiceId }: { invoiceId?: number }) => {
  const [invoiceServices, setInvoiceServices] = useState<InvoiceService[]>([]);
  const [invoiceProducts, setInvoiceProducts] = useState<InvoiceProduct[]>([]);

  useEffect(() => {
    const getInvoiceServices = async () => {
      const response = await fetch(`/api/bills/${invoiceId}/services`, {
        cache: "no-store",
      });
      const data: InvoiceService[] = await response.json();
      setInvoiceServices(data);
    };
    getInvoiceServices();
  }, [invoiceId]);

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

  const totalservice: { duration: number; price: number } = {
    duration: 0,
    price: 0,
  };

  invoiceServices.forEach((invoiceService) => {
    totalservice.duration += invoiceService.duration;
    totalservice.price +=
      parseFloat(invoiceService.price.toString()) * invoiceService.duration;
  });

  const totalproduct: { quantity: number; price: number } = {
    quantity: 0,
    price: 0,
  };

  invoiceProducts.forEach((invoiceProduct) => {
    totalproduct.quantity += invoiceProduct.quantity;
    totalproduct.price +=
      parseFloat(invoiceProduct.price.toString()) * invoiceProduct.quantity;
  });

  const TotalAmounts = (totalproduct.price + totalservice.price).toString();
  const TotalItems = (totalproduct.quantity + totalservice.duration).toString();

  return (
    <Card>
      <Flex gap="3" align="center">
        <Box>
          <Text as="div" size="2" weight="bold">
            Total Amount
          </Text>
          <Text as="div" size="2" color="gray">
            Total : {TotalAmounts.toString()} Euros
          </Text>
          <Text as="div" size="2" color="gray">
            For {TotalItems} Items
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};

export default InvoiceTotalsCard;
