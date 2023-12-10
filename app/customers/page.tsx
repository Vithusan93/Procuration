import prisma from "@/prisma/client";
import Link from "next/link";
import React from "react";
import { Button, Table, Theme, Heading, Container } from "@radix-ui/themes";
import 'react-loading-skeleton/dist/skeleton.css'
import delay from 'delay';
import CustomerAction from "./CustomerAction";


const Customers = async () => {
  const customers = await prisma.customer.findMany();
  await delay(2000);

  return (
    <>
      
      
        <Container size="4">
          <div className="flex flex-col w-full">
            <div className="bg-gray-200 w-full p-4">
              <Heading className="text-gray-900">Customer Liste</Heading>
            </div>
          </div>
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
          <Link href={`/customers/${customer.id}`}>
              {customer.firstname}
            </Link>
          </Table.Cell>
          <Table.Cell className="hidden md:table-cell">
            {customer.lastname}
          </Table.Cell>
          <Table.Cell className="hidden md:table-cell">
            {customer.email}
          </Table.Cell>
          <Table.Cell className="hidden md:table-cell">
            {customer.phone}
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
  <CustomerAction/>
        </Container>
          
        

      
    </>
  );
};
export const dynamic = "force-dynamic";
export const revalidate = false;

export default Customers;
