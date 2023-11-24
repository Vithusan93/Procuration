import { Staff } from "@prisma/client";
import React from "react";

const StaffDetails = ({ staff }: { staff: Staff }) => {
  return (
    <div>
      <p>{staff.firstname}</p>
      <p>{staff.lastname}</p>
      <p>{staff.email}</p>
      <p>{staff.phone}</p>
    </div>
  );
};

export default StaffDetails;
