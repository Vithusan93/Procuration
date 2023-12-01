"use client";
import React from "react";
import { Theme } from "@radix-ui/themes";
import { Flex, Button, TextField, Heading, Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { Bill, Customer } from "@prisma/client";
import { Form } from "@radix-ui/react-form";
import { useForm } from "react-hook-form";
import StaffSelect from "./StaffSelect";
import CustomerSelect from "./CustomerSelect";

import { useEffect } from "react";
import jsPDF from "jspdf";

const BillFormPage = ({ bills }: { bills?: Bill }) => {
  const { register, handleSubmit, control } = useForm<Bill>();
  //console.log(register("customer"));
  const router = useRouter();

  /*  useEffect(() => {
    const generatePDF = () => {
      const pdf = new jsPDF();

      // Ajouter le contenu de la facture au PDF
      pdf.text("Facture", 20, 20);
      pdf.text("Détails du client", 20, 30);
      // Ajouter d'autres détails de la facture

      // Sauvegarder le fichier PDF
      pdf.save("facture.pdf");
    };

    // Appeler la fonction de génération de PDF
    generatePDF();
  }, []); */
  return (
    <div className="flex items-center max-w-7xl mx-auto w-full">
      <Form
        className="w-full"
        onSubmit={handleSubmit(async (data) => {
          if (data.createdAt) {
            data.createdAt = new Date(data.createdAt);
          }
          try {
            if (bills) {
              await fetch("/api/bills/" + bills.id, {
                method: "PATCH",
                body: JSON.stringify(data),
              });
              router.push("/bills");
            } else {
              await fetch("/api/bills", {
                method: "POST",
                body: JSON.stringify(data),
              });
              router.push("/bills");
            }
          } catch (error) {
            console.log(error);
          }
        })}
      >
        <div className="flex flex-col w-full">
          <div className="bg-gray-200 w-full p-4">
            <Heading className="text-gray-900">
              {bills ? " Edit Invoice" : " New Invoice"}
            </Heading>
          </div>
          <div className="flex p-2 bg-gray-100">
            <div className="w-1/4">
              <Flex gap="3" direction="column" style={{ maxWidth: 400 }}>
                <span className="font-semibold">Invoice Number</span>
                <TextField.Root>
                  <TextField.Input
                    radius="large"
                    variant="classic"
                    size="3"
                    defaultValue={bills?.billnumber}
                    placeholder="Bill Number"
                    {...register("billnumber")}
                  />
                </TextField.Root>
                <span className="font-semibold">Customer</span>
                <CustomerSelect
                  name="customerId"
                  label="Customer"
                  placeholder="Customer"
                  control={control}
                />
                <span className="font-semibold">Staff</span>
                <Select.Root size="3" defaultValue="apple">
                  <StaffSelect
                    name="staffId"
                    label="Staff"
                    placeholder="Staff"
                    control={control}
                  />
                </Select.Root>
                <label htmlFor="time">
                  <span className="font-semibold">Date Facture</span>
                  <TextField.Root>
                    <TextField.Input
                      type="date"
                      placeholder="Date"
                      {...register("createdAt")}
                    />
                  </TextField.Root>
                </label>
              </Flex>
            </div>
          </div>
        </div>
        <div className="flex bg-gray-200 p-6 justify-center items-center gap-2">
          <Button color="gray" size="3" variant="outline">
            Save
          </Button>
          <Button size="3" variant="classic">
            {bills ? "Update Invoice" : "Save Invoice Customer"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default BillFormPage;
