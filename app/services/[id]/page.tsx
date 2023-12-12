import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import Link from "next/link";
import EditServiceButton from "./EditServiceButton";
import ServiceDetails from "./ServiceDetails";
import { Grid, Box, Theme } from "@radix-ui/themes";

interface Props {
  params: { id: string };
}

const ServiceDetailPage = async ({ params }: Props) => {
  const service = await prisma.service.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!service) notFound();

  return (
    <div className="flex items-center max-w-7xl mx-auto w-full">
      <div className="w-full p-20">
        <Box height="9">
          <ServiceDetails service={service} />

          <EditServiceButton serviceId={service.id} />
        </Box>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
