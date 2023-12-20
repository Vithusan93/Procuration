import React from "react";
import prisma from "@/prisma/client";
import { Button, Table, Theme, Heading, Container } from "@radix-ui/themes";
import Link from "next/link";

const Bill = async () => {
  const bills = await prisma.bill.findMany({
    include: { customer: true, staff: true },
  });

  return (
    <Theme>
      <Container size="4">
        <div className="flex flex-col w-full">
          <div className="bg-gray-200 w-full p-4">
            <Heading className="text-gray-900">Invoice Liste</Heading>
          </div>
        </div>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Firstname
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
            {bills.map((bill) => (
              <Table.Row key={bill.id}>
                <Table.Cell className="hidden md:table-cell">
                  <Link href={`/bills/${bill.id}`}>
                    {bill.customer.firstname}
                  </Link>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {bill.billnumber}
                </Table.Cell>

                <Table.Cell className="hidden md:table-cell">
                  {bill.createdAt.toLocaleDateString()}
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {bill.staff.firstname}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Container>
      <Container className="mb-5 ">
        <div className="flex bg-gray-200 p-6 justify-center items-center gap-2">
          <Button size="3" variant="classic">
            <Link href={"/bills/new"}>Add Invoice</Link>
          </Button>
          <div>
            {" "}
            <Button size="3" variant="classic">
              <Link href={"/bills/newtransaction"}>Transaction</Link>
            </Button>
            <Button size="3" variant="classic">
              <Link href={"/bills/newpayment"}>payment method</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Theme>
  );
};
export const dynamic = "force-dynamic";
export const revalidate = false;
export default Bill;
