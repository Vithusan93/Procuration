import { Customer } from "@prisma/client";
import React from "react";
import Link from "next/link";

import { Flex, Text, Table, Box, Heading, Container } from "@radix-ui/themes";
const CustomerDetails = ({ customer }: { customer: Customer }) => {
  return (
    <div>
      <div className="bg-gray-200 p-4">
        <Heading className="text-gray-900">
          {customer ? " Customer Details " : "New Customer"}
        </Heading>

        <Box
          style={{
            background: "var(--gray-a2)",
            borderRadius: "var(--radius-3)",
          }}
        >
          <Table.Root variant="surface">
            <Table.Body>
              <Table.Cell className="hidden md:table-cell">
                <p>{customer.firstname}</p>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <p>{customer.lastname}</p>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <p>{customer.email}</p>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <p>{customer.phone}</p>
              </Table.Cell>
            </Table.Body>
          </Table.Root>
        </Box>
      </div>
    </div>
  );
};

export default CustomerDetails;
