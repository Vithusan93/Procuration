import { Button, Theme } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditServiceButton = ({ serviceId }: { serviceId: number }) => {
  return (
    <div>
      <Theme>
        <Button>
          <Link href={`/services/${serviceId}/edit`}>Editer Service</Link>
        </Button>
      </Theme>
    </div>
  );
};

export default EditServiceButton;
