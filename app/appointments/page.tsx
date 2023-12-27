import AppointmentStatusBadge from "@/components/AppointmentStatusBadge";
import prisma from "@/prisma/client";
import {
  Button,
  Table,
  Theme,
  Heading,
  Container,
  Flex,
} from "@radix-ui/themes";
import Link from "next/link";
import MyCalendar from "./Calendar";
import moment from "moment";

const Appointment = async () => {
  const appointments = await prisma.appointment.findMany({
    include: { customer: true, staff: true, service: true },
  });

  return (
    <div>
      <Theme>
        <Container size="4">
          <div className="flex flex-col w-full">
            <div className="bg-gray-200 w-full p-4">
              <Heading className="text-gray-900">Appointment Liste</Heading>
            </div>
          </div>
          <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell className="hidden md:table-cell">
                  Customer
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="hidden md:table-cell">
                  Service
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="hidden md:table-cell">
                  Staff
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="hidden md:table-cell">
                  Date
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="hidden md:table-cell">
                  Status
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {appointments.map((appointment) => (
                <Table.Row key={appointment.id}>
                  <Table.Cell className="hidden md:table-cell">
                    <Link href={`/appointments/${appointment.id}`}>
                      {appointment.customer.firstname}{" "}
                      {appointment.customer.lastname}
                    </Link>
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    {" "}
                    {appointment.service.name}
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    {" "}
                    {appointment.staff.firstname} {appointment.staff.lastname}
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    {appointment.time.toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    <AppointmentStatusBadge status={appointment.status} />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Container>

        <Container className="mb-5 ">
          <div className="flex bg-gray-200 p-6 justify-center items-center gap-2">
            <Button size="3" variant="classic">
              <Link href={"/appointments/new"}>Add Appointment</Link>
            </Button>
          </div>
        </Container>
      </Theme>
    </div>
  );
};

export const dynamic = "force-dynamic";
export const revalidate = false;
export default Appointment;
