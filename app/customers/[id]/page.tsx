import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import { Grid, Box, Theme } from "@radix-ui/themes";
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
        <Grid columns="3" gap="3" width="auto">
          <Box height="9">
            <CustomerDetails customer={customer} />

            <EditCustomerButton customerId={customer.id} />
          </Box>
        </Grid>
      </Theme>
    </div>
  );
};

export default CustomerDetailPage;