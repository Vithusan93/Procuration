import { Customer } from "@prisma/client";
import React from "react";

const CustomerDetails = ({ customer }: { customer: Customer }) => {
  return (
    <div>
      <p>{customer.firstname}</p>
      <p>{customer.lastname}</p>
      <p>{customer.email}</p>
      <p>{customer.phone}</p>
    </div>
  );
};

export default CustomerDetails;
