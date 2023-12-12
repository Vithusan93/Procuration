import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import { Box } from "@radix-ui/themes";
import { Form } from "@radix-ui/react-form";
import Link from "next/link";
import EditCustomerButton from "./EditCustomerButton";
import CustomerDetails from "./CustomerDetails";

interface Props {
  params: { id: string };
}

const CustomerDetailPage = async ({ params }: Props) => {
  const customer = await prisma.customer.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!customer) notFound();

  return (
    <div className="flex items-center max-w-7xl mx-auto w-full">
      <div className="w-full p-20">
        <Box height="9">
          <CustomerDetails customer={customer} />

          <EditCustomerButton customerId={customer.id} />
        </Box>
      </div>
    </div>
  );
};

export default CustomerDetailPage;
