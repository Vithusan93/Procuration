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
    include: { customer: true, staff: true },
  });

  if (!bill) notFound();

  return (
    <div className="flex items-center max-w-7xl mx-auto w-full">
      <div className="w-full p-20">
        <Box height="9">
          <BillDetails bill={bill} />

          <EditBillButton billId={bill.id} />
        </Box>
      </div>
    </div>
  );
};

export default BillDetailPage;
