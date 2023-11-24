import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import { Button, Theme } from "@radix-ui/themes";
import Link from "next/link";
import EditServiceButton from "./EditServiceButton";
import ServiceDetails from "./ServiceDetails";

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
      <Theme>
        <div>
          <ServiceDetails service={service} />
        </div>
        <div>
          <EditServiceButton serviceId={service.id} />
        </div>
      </Theme>
    </div>
  );
};

export default ServiceDetailPage;
