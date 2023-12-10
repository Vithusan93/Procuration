import prisma from "@/prisma/client";
import Link from "next/link";
import React from "react";
import { Button, Table, Theme, Heading, Container } from "@radix-ui/themes";

const Services = async () => {
  const services = await prisma.service.findMany();
  return (
    <>
      <Theme>
        <Container size="4">
          <div className="flex flex-col w-full">
            <div className="bg-gray-200 w-full p-4">
              <Heading className="text-gray-900">Service Liste</Heading>
            </div>
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
                    {service.duration.toString()}
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    {service.price.toString()}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Container>
        <Container className="mb-5 ">
          <div className="flex bg-gray-200 p-6 justify-center items-center gap-2">
            <Button size="3" variant="classic">
              <Link href={"/services/new"}>Add Service</Link>
            </Button>
          </div>
        </Container>
      </Theme>
    </>
  );
};
export const dynamic = "force-dynamic";
export const revalidate = false;

export default Services;
