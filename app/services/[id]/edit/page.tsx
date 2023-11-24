import React from "react";

import ServiceForm from "../../ServiceForm";
import { string } from "zod";
import prisma from "@/prisma/client";
import { parse } from "path";
import { Service } from "@prisma/client";

interface Props {
  params: { id: string };
}

const EditServicePage = async ({ params }: Props) => {
  const service = await prisma.service.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!service) return;
  return <ServiceForm service={service} />;
};

export default EditServicePage;
