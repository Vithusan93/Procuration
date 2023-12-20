import { Form } from "@radix-ui/react-form";
import { Box, Button, Flex, Heading, TextField } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Spinner from "@/components/Spinner";
import { IoMdAdd } from "react-icons/io";

interface Payment {
  staffId: number;
  amount: number;
}

interface PaymentFormProps {
  payment?: Payment;
  onSubmit: (data: Payment) => Promise<void>;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ payment, onSubmit }) => {
  const { register, handleSubmit, setValue } = useForm<Payment>();

  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (payment) {
      setValue("staffId", payment.staffId);
      setValue("amount", payment.amount);
    }
  }, [payment, setValue]);

  const handleFormSubmit = async (data: Payment) => {
    setSubmitting(true);
    try {
      await onSubmit(data);
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };

  return <Form onSubmit={handleSubmit(handleFormSubmit)}>{/* */}</Form>;
};

export default PaymentForm;
