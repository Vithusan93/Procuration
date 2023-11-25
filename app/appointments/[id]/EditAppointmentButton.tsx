import { Button, Theme } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditAppointmentButton = ({
  appointmentId,
}: {
  appointmentId: number;
}) => {
  return (
    <div>
      <Button>
        <Link href={`/appointments/${appointmentId}/edit`}>
          Editer Appointment
        </Link>
      </Button>
    </div>
  );
};

export default EditAppointmentButton;
