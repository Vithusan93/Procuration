import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import { Button, Theme } from "@radix-ui/themes";
import Link from "next/link";
import EditStaffButton from "./EditStaffButton";
import StaffDetails from "./StaffDetails";

interface Props {
  params: { id: string };
}

const StaffDetailPage = async ({ params }: Props) => {
  const staff = await prisma.staff.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!staff) notFound();

  return (
    <div>
      <Theme>
        <div>
          <StaffDetails staff={staff} />
        </div>
        <div>
          <EditStaffButton staffId={staff.id} />
        </div>
      </Theme>
    </div>
  );
};

export default StaffDetailPage;
