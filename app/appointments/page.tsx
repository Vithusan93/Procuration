import prisma from "@/prisma/client";
import { Button, Container, Table } from "@radix-ui/themes";
import Link from "next/link";

const Appointment = async () => {
  const appointments = await prisma.appointment.findMany({
    include: { customer: true, staff: true, service: true },
  });

  return (
    <div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Email
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
                  {appointment.customer.firstname}
                </Link>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {" "}
                {appointment.service.name}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {" "}
                {appointment.staff.firstname}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {appointment.time.toString()}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {appointment.status}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Container className="mb-5 ">
        <Button size="3" variant="classic">
          <Link href={"/appointments/new"}>Add Appointment</Link>
        </Button>
      </Container>
    </div>
  );
};

export const dynamic = "force-dynamic";
export const revalidate = false;
export default Appointment;
