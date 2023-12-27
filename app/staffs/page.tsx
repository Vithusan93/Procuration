import prisma from "@/prisma/client";
import Link from "next/link";
import React from "react";
import { Button, Table, Theme, Heading, Container } from "@radix-ui/themes";
import StaffAction from "./StaffAction";

const Staffs = async () => {
  const staffs = await prisma.staff.findMany();
  return (
    <>
      <Theme>
        <Container size="4">
          <div className="flex flex-col w-full">
            <div className="bg-gray-200 w-full p-4">
              <Heading className="text-gray-900">Staff Liste</Heading>
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
              {staffs.map((staff) => (
                <Table.Row key={staff.id}>
                  <Table.Cell className="hidden md:table-cell">
                    <Link href={`/staffs/${staff.id}`}>{staff.firstname}</Link>
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    {staff.lastname}
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    {staff.email}
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    {staff.phone.toString()}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Container>
        <StaffAction />
      </Theme>
    </>
  );
};
export const dynamic = "force-dynamic";
export const revalidate = false;

export default Staffs;
