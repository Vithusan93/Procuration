"use client";
import { Bill, Staff, Customer } from "@prisma/client";
import { Box, Button, Flex, Tabs, Text, TextField } from "@radix-ui/themes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";

interface BillDetail extends Bill {
  staff: Staff;
  customer: Customer;
}

const InvoiceListPanel = () => {
  const [invoices, setInvoices] = useState<BillDetail[]>([]);

  useEffect(() => {
    const getInvoices = async () => {
      const reponse = await fetch("/api/bills", { cache: "no-store" });
      const fetchedBills = await reponse.json();
      setInvoices(fetchedBills);
    };
    getInvoices();
  }, []);
  return (
    <Box className="bg-gray-50 h-screen w-1/4">
      <Tabs.Root defaultValue="account">
        <Tabs.List size={"2"}>
          <Tabs.Trigger value="account">IN PROGRESS</Tabs.Trigger>
          <Tabs.Trigger value="documents">ISSUED INVOICES</Tabs.Trigger>
        </Tabs.List>
        <Flex p="2" gap={"1"}>
          <TextField.Root className="grow">
            <TextField.Slot>
              <FaSearch />
            </TextField.Slot>
            <TextField.Input placeholder="Search" />
          </TextField.Root>
          <Link href={"/bills/new"}>
            <Button type="button" variant="outline" color="gray">
              <IoIosAddCircleOutline /> New
            </Button>
          </Link>
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
      <Box>
        {invoices.map((invoice) => (
          <Link href={`/bills/${invoice.id}/edit`}>
            <div className="flex flex-col py-2 px-1 hover:bg-purple-100">
              <div>
                {invoice.customer.firstname} {invoice.customer.lastname}
              </div>
              <div>{invoice.createdAt}</div>
            </div>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default InvoiceListPanel;
