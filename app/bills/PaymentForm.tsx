import { Form } from "@radix-ui/react-form";
import { Box, Button, Flex, Heading, TextField } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Customer, Payment, Staff } from "@prisma/client";
import CustomerForm from "../customers/CustomerForm";
import Spinner from "@/components/Spinner";
import { IoMdAdd } from "react-icons/io";
import { string } from "zod";
import { useRouter } from "next/navigation";
import router from "next/router";

interface BillDetail extends Payment {
  customer: Customer;
  staff: Staff;
}

const PaymentFormPage = ({ payment }: { payment?: BillDetail }) => {
  const { register, handleSubmit, setValue } = useForm<Payment>();
  const [customer, setCustomer] = useState<Customer>();
  const [staff, setStaff] = useState<Staff>();
  const onSubmit = handleSubmit(async (data) => {
    //if (data.createdAt) {
    //data.createdAt = new Date(data.createdAt);
    //}
    try {
      if (payment) {
        await fetch("/api/payments/" + payment.id, {
          method: "PATCH",
          body: JSON.stringify(data),
        });
        router.push("/bills");
      } else {
        await fetch("/api/payments", {
          method: "POST",
          body: JSON.stringify(data),
        });
        router.push("/bills");
      }
    } catch (error) {
      console.log(error);
    }
  });
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (payment) {
      setCustomer(payment.customer);
      setStaff(payment.staff);
    }
  }, [payment]);

  return (
    <Form onSubmit={onSubmit}>
      <Box>
        <h2>Gestion de Payment</h2>
        <span className="font-semibold">Customer</span>
        <TextField.Root>
          <TextField.Input
            radius="large"
            variant="classic"
            size="3"
            defaultValue={customer?.firstname}
            placeholder="customer name"
            {...register("customerId")}
          />
        </TextField.Root>
        <div>
          <label htmlFor="amount">Montant</label>
          <input type="number" step="0.01" />
        </div>
        <div>
          <label htmlFor="type">Type de payment</label>
          <select>
            <option>Cash</option>
            <option>Card</option>
          </select>
        </div>
        <div>
          <label htmlFor="billId">ID de la Facture</label>
          <input type="number" />
        </div>
        <div>
          <label htmlFor="invoiceproductId">ID du Produit de Facturation</label>
          <input type="number" />
        </div>
        <div>
          <label htmlFor="invoiceserviceId">ID du Service de Facturation</label>
          <input type="number" />
        </div>
        <div>
          <input type="checkbox" id="coding" name="interest" value="coding" />
          <label>Cash</label>
        </div>{" "}
        <div>
          <input type="checkbox" id="coding" name="interest" value="coding" />
          <label>Card</label>
        </div>
      </Box>
    </Form>
  );
};

export default PaymentFormPage;
