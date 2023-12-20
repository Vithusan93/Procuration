import { Form } from "@radix-ui/react-form";
import { Box, Button, Flex, Heading, TextField } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Spinner from "@/components/Spinner";
import { IoMdAdd } from "react-icons/io";

interface Payment {
  customerId: number;
  amount: number;
}

interface PaymentFormProps {
  payment?: Payment;
  //onSubmit: (data: Payment) => Promise<void>;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ payment }) => {
  const { register, handleSubmit, setValue } = useForm<Payment>();

  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (payment) {
      setValue("customerId", payment.customerId);
      setValue("amount", payment.amount);
    }
  }, [payment, setValue]);

  return (
    <form>
      <h2>Gestion de Payment</h2>
      <div>
        <label htmlFor="customerId">ID du customer </label>
        <input type="number" />
      </div>
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
    </form>
  );
};

export default PaymentForm;
