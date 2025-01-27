import React from "react";
import { string } from "zod";
import prisma from "@/prisma/client";
import { parse } from "path";
import { Product } from "@prisma/client";
import CustomerForm from "../../CustomerForm";
import CustomerManager from "../../CustomerManager";

interface Props {
  params: { id: string };
}

const EditCustomerPage = async ({ params }: Props) => {
  const customer = await prisma.customer.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!customer) return;
  return <CustomerManager customer={customer} />;
};

export default EditCustomerPage;
