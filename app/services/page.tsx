import prisma from "@/prisma/client";
import Link from "next/link";
import React from "react";
import { Button, Table, Theme } from "@radix-ui/themes";

const Services = async () => {
  const services = await prisma.service.findMany();
  return (
    <div>
      <Theme>
        <div className="mb-5 ">
          <Button radius="large" variant="soft">
            <Link href={"/services/new"}>Add Service</Link>
          </Button>
        </div>
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
                  <Link href={`/services/${service.id}`}>{service.name}</Link>
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
      </Theme>
    </div>
  );
};
export const dynamic = "force-dynamic";
export const revalidate = false;

export default Services;
