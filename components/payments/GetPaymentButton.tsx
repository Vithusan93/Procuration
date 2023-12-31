"use client";
import React from "react";
import { Bill } from "@prisma/client";
import { Flex, Select } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const GetPaymentButton = ({
  onPaymentSelect,
  buttonLabel,
}: {
  onPaymentSelect: (bill: Bill) => void;
  buttonLabel?: string;
}) => {
  const [open, setOpen] = useState(false);
  //const [bills, setBills] = useState<Bill[]]>([]);
  const [search, setSearch] = useState("");

  return (
    <div>
      <Flex>
        <Select.Root value="cash" onValueChange={() => {}}>
          <Select.Trigger />
          <Select.Content position="popper" sideOffset={5}>
            <Select.Item value="cash">Cash</Select.Item>
            <Select.Item value="card">Card</Select.Item>
          </Select.Content>
        </Select.Root>
      </Flex>
    </div>
  );
};

export default GetPaymentButton;
