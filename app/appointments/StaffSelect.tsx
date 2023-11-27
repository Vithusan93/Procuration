"use client";
import { Staff } from "@prisma/client";
import SelectControl from "@/components/SelectControl";
import { useEffect, useState } from "react";
const StaffSelect = ({
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
  const [staffs, setStaffs] = useState<Staff[]>([]);

  useEffect(() => {
    const fetchStaffs = async () => {
      const response = await fetch("/api/staffs", { cache: "no-store" });
      const data = await response.json();
      setStaffs(data);
    };
    fetchStaffs();
  }, []);

  const options = staffs.map((staff) => ({
    value: staff.id.toString(),
    label: staff.firstname,
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

export default StaffSelect;
