"use client";
import { Bill, InvoiceService } from "@prisma/client";
import React from "react";
import { Table, TextField } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { Form } from "@radix-ui/react-form";

const InvoiceServicePanel = ({ bill }: { bill: Bill }) => {
  const { register, handleSubmit } = useForm<InvoiceService>();

  return (
    <div>
      <Form>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Service
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Label
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
            <Table.Row>
              <Table.Cell className="hidden md:table-cell"></Table.Cell>
              <Table.Cell className="hidden md:table-cell">value</Table.Cell>
              <Table.Cell className="hidden md:table-cell">value</Table.Cell>
              <Table.Cell className="hidden md:table-cell">value</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="table-cell">
                <TextField.Root>
                  <TextField.Input
                    radius="large"
                    variant="classic"
                    size="3"
                    placeholder="Bill Number"
                    {...register("price")}
                  />
                </TextField.Root>
              </Table.Cell>
              <Table.Cell className="table-cell">value</Table.Cell>
              <Table.Cell className="table-cell">value</Table.Cell>
              <Table.Cell className="table-cell">value</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Form>
    </div>
  );
};

export default InvoiceServicePanel;
