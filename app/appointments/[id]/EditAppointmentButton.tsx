import { Button, Theme } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditAppointmentButton = ({
  appointmentId,
}: {
  appointmentId: number;
}) => {
  return (
    <div className="flex bg-gray-200 p-6 justify-center items-center gap-2">
      <Button>
        <Link href={`/appointments/${appointmentId}/edit`}>
          Editer Appointment
        </Link>
      </Button>
    </div>
  );
};

export default EditAppointmentButton;
