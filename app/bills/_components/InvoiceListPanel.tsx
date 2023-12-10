"use client";
import { Box, Flex, Tabs, Text, TextField } from "@radix-ui/themes";
import React from "react";
import { FaSearch } from "react-icons/fa";
const InvoiceListPanel = () => {
  return (
    <Box style={{ width: "25%" }}>
      <Tabs.Root defaultValue="account">
        <Tabs.List size={"2"}>
          <Tabs.Trigger value="account">IN PROGRESS</Tabs.Trigger>
          <Tabs.Trigger value="documents">ISSUED INVOICES</Tabs.Trigger>
        </Tabs.List>
        <Flex p="2">
          <TextField.Root>
            <TextField.Slot>
              <FaSearch height="16" width="16" />
            </TextField.Slot>
            <TextField.Input placeholder="Search" />
          </TextField.Root>
        </Flex>
        <Box px="4" pt="3" pb="2">
          <Tabs.Content value="account">
            <Text size="2">Make changes to your account.</Text>
          </Tabs.Content>
          <Tabs.Content value="documents">
            <Text size="2">Access and update your documents.</Text>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Box>
  );
};

export default InvoiceListPanel;
