"use client";
import SelectControl from "@/components/SelectControl";
import { Service } from "@prisma/client";
import { useEffect, useState } from "react";

const ServiceSelect = ({
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
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetch("/api/services", { cache: "no-store" });
      const data: Service[] = await response.json();
      setServices(data);
    };
    fetchServices();
  }, []);

  const options = services.map((service) => ({
    value: service.id.toString(),
    label: service.name,
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

export default ServiceSelect;
