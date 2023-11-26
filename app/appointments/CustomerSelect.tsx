"use client";
import SelectControl from "@/components/SelectControl";
import { Customer } from "@prisma/client";
import { useEffect, useState } from "react";

const CustomerSelect = ({
  name,
  label,
  placeholder,
  control,
}: {
  name: string;
  label: string;
  placeholder?: string;
  control: any;
}) => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch("/api/customers", { cache: "no-store" });
      const data: Customer[] = await response.json();
      setCustomers(data);
    };
    fetchCustomers();
  });

  const options = customers.map((customer) => ({
    value: customer.id.toString(),
    label: customer.firstname,
  }));

  return (
    <SelectControl
      name={name}
      label={label}
      placeholder={placeholder}
      options={options}
      control={control}
    />
  );
};

export default CustomerSelect;
