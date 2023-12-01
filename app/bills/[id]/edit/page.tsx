import React from "react";

import { string } from "zod";
import prisma from "@/prisma/client";
import { parse } from "path";

import BillFormPage from "../../BillForm";

interface Props {
  params: { id: string };
}

const EditBillPage = async ({ params }: Props) => {
  const bill = await prisma.bill.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!bill) return;
  return <BillFormPage bills={bill} />;
};

export default EditBillPage;