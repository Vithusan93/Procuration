"use client";
import React from "react";
import CustomerForm from "./CustomerForm";
import { useRouter } from "next/navigation";
import { Customer } from "@prisma/client";

const CustomerManager = ({ customer }: { customer?: Customer }) => {
  const router = useRouter();

  return (
    <CustomerForm
      customer={customer}
      onSuccess={(customer) => {
        router.push("/customers");
      }}
    />
  );
};

export default CustomerManager;
