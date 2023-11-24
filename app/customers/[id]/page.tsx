import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import { Button, Theme } from "@radix-ui/themes";
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
    <div>
      <Theme>
        <div>
          <CustomerDetails customer={customer} />
        </div>
        <div>
          <EditCustomerButton customerId={customer.id} />
        </div>
      </Theme>
    </div>
  );
};

export default CustomerDetailPage;
