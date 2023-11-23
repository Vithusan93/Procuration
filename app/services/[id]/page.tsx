import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const ServiceDetailPage = async ({ params }: Props) => {
  const service = await prisma.service.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!service) notFound();

  return (
    <div>
      <p>{service.name}</p>
      <p>{service.duration}</p>
      <p>{service.price}</p>
    </div>
  );
};

export default ServiceDetailPage;
