import { Bill } from "@prisma/client";
import React from "react";
import Link from "next/link";
import prisma from "@/prisma/client";

import { Flex, Text, Table, Box, Heading, Container } from "@radix-ui/themes";

const BillDetails = ({ bill }: { bill: Bill }) => {
  return (
    <div>
      <Container size="4">
        <div className="flex flex-col w-full">
          <div className="bg-gray-200 w-full p-4">
            <Heading className="text-gray-900">
              {bill ? " Bill Detail" : " New Invoice"}
            </Heading>

            <Box
              style={{
                background: "var(--gray-a2)",
                borderRadius: "var(--radius-3)",
              }}
            >
              <Table.Root variant="surface">
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeaderCell className="hidden md:table-cell">
                      Customer Name
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="hidden md:table-cell">
                      Invoice Number
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="hidden md:table-cell">
                      Date
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="hidden md:table-cell">
                      Staff Name
                    </Table.ColumnHeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Cell className="hidden md:table-cell">
                    {" "}
                    {/*bill.customer.firstname*/}
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    {bill.billnumber}
                  </Table.Cell>

                  <Table.Cell className="hidden md:table-cell">
                    {bill.createdAt.toString()}
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    {/*bill.staff.firstname*/}
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

export default BillDetails;
