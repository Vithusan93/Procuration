import prisma from "@/prisma/client";
import Link from "next/link";
import React from "react";
import { Button, Table } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";

const Services = async () => {
  const services = await prisma.service.findMany();
  return (
    <>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Name
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Duration
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Price
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {services.map((service) => (
            <Table.Row key={service.id}>
              <Table.Cell className="hidden md:table-cell">
                {service.name}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {service.duration}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {service.price.toString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Link href={"/services/new"}>
        <Button>Add Service</Button>
      </Link>
    </>
  );
};
export const dynamic = "force-dynamic";
export const revalidate = false;

export default Services;
