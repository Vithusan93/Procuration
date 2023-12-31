"use client";
import { Select } from "@radix-ui/themes";
import { Controller } from "react-hook-form";

const SelectControl = ({
  name,
  options,
  label,
  placeholder,
  control,
}: {
  name: string;
  options: { value: string; label: string }[];
  label: string;
  placeholder?: string;
  control: any;
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select.Root onValueChange={field.onChange} defaultValue={field.value}>
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Label>{label}</Select.Label>
              {options.map((option) => (
                <Select.Item key={option.value} value={option.value}>
                  {option.label}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Content>
        </Select.Root>
      )}
    />
  );
};

export default SelectControl;
