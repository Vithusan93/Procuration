import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import { Box } from "@radix-ui/themes";
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
    <div className="flex items-center max-w-7xl mx-auto w-full">
      <div className="w-full p-20">
        <Box height="9">
          <StaffDetails staff={staff} />

          <EditStaffButton staffId={staff.id} />
        </Box>
      </div>
    </div>
  );
};

export default StaffDetailPage;
