import { Customer } from "@prisma/client";
import React from "react";
import Link from "next/link";

import { Flex, Text, Table, Box, Heading, Container } from "@radix-ui/themes";
const CustomerDetails = ({ customer }: { customer: Customer }) => {
  return (
    <div>
      <Container size="4">
        <div className="flex flex-col w-full">
          <div className="bg-gray-200 w-full p-4">
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
      </Container>
    </div>
  );
};

export default CustomerDetails;
