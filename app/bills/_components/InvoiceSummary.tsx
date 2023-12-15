import React from "react";
import { Box, Heading, Card, Flex, Text, Grid } from "@radix-ui/themes";
import ProductsCard from "./InvoiceProductsCard";
import ServicesCard from "./InvoiceServicesCard";
import TotalsCard from "./InvoiceTotalsPanel";

const InvoiceSummary = ({ invoiceId }: { invoiceId?: number }) => {
  return (
    <Box p="2">
      <Box className="rounded-md border" p="2">
        <Heading>Invoice Summary</Heading>
        <Grid gap={"2"} columns={"4"} py={"2"}>
          <ProductsCard invoiceId={invoiceId} />
          <ServicesCard invoiceId={invoiceId} />
          <TotalsCard invoiceId={invoiceId} />
          <Card>
            <Flex gap="3" align="center">
              <Box>
                <Text as="div" size="2" weight="bold">
                  Payments
                </Text>
                <Text as="div" size="2" color="gray">
                  Total: 2 500 Euros
                </Text>
                <Text as="div" size="2" color="gray">
                  Quantity: 16
                </Text>
              </Box>
            </Flex>
          </Card>
        </Grid>
      </Box>
    </Box>
  );
};

export default InvoiceSummary;
