"use client";
import React from "react";
import { Theme } from "@radix-ui/themes";
import {
  Flex,
  Text,
  Button,
  TextField,
  Heading,
  Grid,
  Box,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { Customer } from "@prisma/client";
import { Form } from "@radix-ui/react-form";
import { useForm } from "react-hook-form";

import { useEffect } from "react";
import jsPDF from "jspdf";

interface BillForm {
  customer: String;
  service: String;
  product: String;
  staff: String;
}

const BillPage = () => {
  const { register, handleSubmit } = useForm<BillForm>();
  console.log(register("customer"));
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
          await fetch("/api/appointment", {
            method: "POST",
            body: JSON.stringify(data),
          });
          router.push("/");
        })}
      >
        <div className="flex flex-col w-full">
          <div className="bg-gray-200 w-full p-4">
            <Heading className="text-gray-900">
              New Bill{/*{customer ? " Edit Customer" : "New Customer"}*/}
            </Heading>
          </div>
          <div className="flex p-2 bg-gray-100">
            <div className="w-1/4">
              <Flex gap="3" direction="column" style={{ maxWidth: 400 }}>
                <Box height="9">
                  Customer
                  <TextField.Root>
                    <TextField.Input
                      radius="large"
                      variant="classic"
                      size="3"
                      //defaultValue={customer?.firstname}
                      placeholder="Customer "
                      {...register("customer")}
                    />
                  </TextField.Root>
                </Box>
                <Box height="9">
                  Service
                  <TextField.Root>
                    <TextField.Input
                      radius="large"
                      size="3"
                      //defaultValue={customer?.lastname}
                      placeholder="Service "
                      {...register("service")}
                    />
                  </TextField.Root>
                </Box>
                <Box height="9">
                  Product
                  <TextField.Root>
                    <TextField.Input
                      radius="large"
                      size="3"
                      //defaultValue={customer?.email}
                      placeholder="Product"
                      {...register("product")}
                    />
                  </TextField.Root>
                </Box>
                <Box height="9">
                  Staff
                  <TextField.Root>
                    <TextField.Input
                      radius="large"
                      size="3"
                      //defaultValue={customer?.phone}
                      placeholder="Staff"
                      {...register("staff")}
                    />
                  </TextField.Root>
                </Box>
              </Flex>
            </div>
          </div>
        </div>
        <div className="flex bg-gray-200 p-6 justify-center items-center gap-2">
          <Button size="3" variant="classic">
            Create Bill
            {/* {customer ? "Update Customer" : "Submit New Customer"}*/}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default BillPage;
