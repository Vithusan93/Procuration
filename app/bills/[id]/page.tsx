import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import { Grid, Box, Theme } from "@radix-ui/themes";
import Link from "next/link";
import EditBillButton from "./EditBillButton";
import BillDetails from "./BillDetails";

interface Props {
  params: { id: string };
}

const BillDetailPage = async ({ params }: Props) => {
  const bill = await prisma.bill.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!bill) notFound();

  return (
    <div>
      <Theme>
        <Grid columns="3" gap="3" width="auto">
          <Box height="9">
            <BillDetails bill={bill} />

            <EditBillButton billId={bill.id} />
          </Box>
        </Grid>
      </Theme>
    </div>
  );
};

export default BillDetailPage;
