import { Service } from "@prisma/client";
import React from "react";
import { Text } from "@radix-ui/themes";

const ServiceDetails = ({ service }: { service: Service }) => {
  return (
    <div>
      <p>{service.name}</p>
      <p>{service.duration}</p>
      <p>{service.price}</p>
    </div>
  );
};

export default ServiceDetails;
