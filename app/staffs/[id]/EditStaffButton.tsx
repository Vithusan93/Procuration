import { Button, Theme } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditStaffButton = ({ staffId }: { staffId: number }) => {
  return (
    <div>
      <Button>
        <Link href={`/staffs/${staffId}/edit`}>Editer Staff</Link>
      </Button>
    </div>
  );
};

export default EditStaffButton;
