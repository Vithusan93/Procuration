"use client";
import { InvoiceService } from "@prisma/client";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

const InvoiceServicesCard = ({ invoiceId }: { invoiceId?: number }) => {
  const [invoiceServices, setInvoiceServices] = useState<InvoiceService[]>([]);

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

  const total: { duration: number; price: number } = { duration: 0, price: 0 };

  invoiceServices.forEach((invoiceService) => {
    total.duration += invoiceService.duration;
    total.price +=
      parseFloat(invoiceService.price.toString()) * invoiceService.duration;
  });

  return (
    <Card>
      <Flex gap="3" align="center">
        <Box>
          <Text as="div" size="2" weight="bold">
            Services
          </Text>
          <Text as="div" size="2" color="gray">
            Total Amount: {total.price.toString()} Euros
          </Text>
          <Text as="div" size="2" color="gray">
            For {total.duration.toString()} service
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};

export default InvoiceServicesCard;
