import prisma from "@/prisma/client";
import Link from "next/link";
import React from "react";
import { Button, Table, Theme } from "@radix-ui/themes";

const Customers = async () => {
  const customers = await prisma.customer.findMany();
  return (
    <>
      <Theme>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                FirstName
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                LastName
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Email
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Phone
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {customers.map((customer) => (
              <Table.Row key={customer.id}>
                <Table.Cell className="hidden md:table-cell">
                  {customer.firstname}
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {customer.lastname}
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {customer.email}
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {customer.phone.toString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
        <Link href={"/customers/new"}>
          <Button>Add Customer</Button>
        </Link>
      </Theme>
    </>
  );
};
export const dynamic = "force-dynamic";
export const revalidate = false;

export default Customers;
