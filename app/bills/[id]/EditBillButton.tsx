import { Button, Theme } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditBillButton = ({ billId }: { billId: number }) => {
  return (
    <div>
      <Theme>
        <div className="flex bg-gray-200 p-6 justify-center items-center gap-2">
          <Button>
            <Link href={`/bills/${billId}/edit`}>Editer Bill</Link>
          </Button>
        </div>
      </Theme>
    </div>
  );
};

export default EditBillButton;
