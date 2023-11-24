import React from "react";

import { string } from "zod";
import prisma from "@/prisma/client";
import { parse } from "path";
import { Product } from "@prisma/client";
import StaffForm from "../../StaffForm";

interface Props {
  params: { id: string };
}

const EditStaffPage = async ({ params }: Props) => {
  const staff = await prisma.staff.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!staff) return;
  return <StaffForm staff={staff} />;
};

export default EditStaffPage;
