import Customers from "@/app/customers/page";
import { Appointment } from "@prisma/client";
import React from "react";
import {
  Button,
  Table,
  Theme,
  Box,
  Heading,
  Container,
} from "@radix-ui/themes";
import Link from "next/link";

const AppointmentDetails = ({ appointment }: { appointment: Appointment }) => {
  return (
    <div>
      <Container size="4">
        <div className="flex flex-col w-full">
          <div className="bg-gray-200 w-full p-4">
            <Heading className="text-gray-900">
              {" "}
              {appointment ? " Appointment Details " : "New Appointment"}
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
                      Service Name
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="hidden md:table-cell">
                      Status
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
                  <Table.Row>
                    <Table.Cell className="hidden md:table-cell">
                      <Link href={`/appointments/${appointment.id}`}>
                   {/*     <p>{appointment.customerId}</p>*/}
                      </Link>
                    </Table.Cell>
                    <Table.Cell className="hidden md:table-cell">
                      {" "}
                   {/*   <p>{appointment.serviceId}</p>*/}
                    </Table.Cell>

                    <Table.Cell className="hidden md:table-cell">
                   {/*   <p>{appointment.status}</p>*/}
                    </Table.Cell>
                    <Table.Cell className="hidden md:table-cell">
                   {/*   <p>{appointment.time.toLocaleDateString()}</p>*/}
                    </Table.Cell>
                    <Table.Cell className="hidden md:table-cell">
                   {/* */}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
                
              </Table.Root>
            </Box>
          </div>
        </div>
      </Container>
    </div>
  );
};
export const dynamic = "force-dynamic";
export const revalidate = false;

export default AppointmentDetails;
