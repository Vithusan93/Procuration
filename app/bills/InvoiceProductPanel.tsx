"use client";
import { Bill, InvoiceProduct } from "@prisma/client";
import React from "react";
import { Table, TextField } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { Form } from "@radix-ui/react-form";

const InvoiceProductPanel = ({ bill }: { bill: Bill }) => {
  const { register, handleSubmit } = useForm<InvoiceProduct>();

  return <div></div>;
};

export default InvoiceProductPanel;
