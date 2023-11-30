import { Staff } from "@prisma/client";
import React from "react";
import { Flex, Text, Table, Box, Heading, Container } from "@radix-ui/themes";

const StaffDetails = ({ staff }: { staff: Staff }) => {
  return (
    <div>
      <Container size="4">
        <div className="flex flex-col w-full">
          <div className="bg-gray-200 w-full p-4">
            <Heading className="text-gray-900">
              {staff ? " Staff Details " : "New Staff"}
            </Heading>

            <Box
              style={{
                background: "var(--gray-a2)",
                borderRadius: "var(--radius-3)",
              }}
            >
              <Table.Root variant="surface">
                <Table.Body>
                  <Table.Cell className="hidden md:table-cell">
                    <p>{staff.firstname}</p>
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    <p>{staff.lastname}</p>
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    <p>{staff.email}</p>
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    <p>{staff.phone}</p>
                  </Table.Cell>
                </Table.Body>
              </Table.Root>
            </Box>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default StaffDetails;
