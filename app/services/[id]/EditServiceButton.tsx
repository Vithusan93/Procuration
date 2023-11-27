import { Button, Theme } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditServiceButton = ({ serviceId }: { serviceId: number }) => {
  return (
    <div>
      <div className="flex bg-gray-200 p-6 justify-center items-center gap-2">
        <Button>
          <Link href={`/services/${serviceId}/edit`}>Editer Service</Link>
        </Button>
      </div>
    </div>
  );
};

export default EditServiceButton;
