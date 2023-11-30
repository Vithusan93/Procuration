import { Button, Theme } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditStaffButton = ({ staffId }: { staffId: number }) => {
  return (
    <div>
      <div className="flex bg-gray-200 p-6 justify-center items-center gap-2">
        <Button>
          <Link href={`/staffs/${staffId}/edit`}>Editer Staff</Link>
        </Button>
      </div>
    </div>
  );
};

export default EditStaffButton;
