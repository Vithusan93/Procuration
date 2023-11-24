import { Button, Theme } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditCustomerButton = ({ customerId }: { customerId: number }) => {
  return (
    <div>
      <Button>
        <Link href={`/customers/${customerId}/edit`}>Editer Customer</Link>
      </Button>
    </div>
  );
};

export default EditCustomerButton;
