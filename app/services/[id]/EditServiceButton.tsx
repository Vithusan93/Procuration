import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditServiceButton = ({ serviceId }: { serviceId: number }) => {
  return (
    <div>
      <Button>
        <Link href={`/services/${serviceId}/edit`}>Editer Service</Link>
      </Button>
    </div>
  );
};

export default EditServiceButton;
