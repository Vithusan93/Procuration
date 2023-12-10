import React from "react";
import InvoiceListPanel from "./_components/InvoiceListPanel";
import { Box, Flex } from "@radix-ui/themes";

const InvoicingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex>
      <InvoiceListPanel />
      <Box width={"100%"}>{children}</Box>
    </Flex>
  );
};

export default InvoicingLayout;
