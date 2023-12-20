"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface CashTransactionFormProps {
  onSubmit: SubmitHandler<CashTransactionFormData>;
}

interface CashTransactionFormData {
  staffId: number;
  amount: number;
  type: TransactionType;
  billId: number;
  invoiceproductId: number;
  invoiceserviceId: number;
}

enum TransactionType {
  Income = "income",
  Expense = "expense",
}

const CashTransactionForm = (
  {
    //onSubmit,
  }
) => {
  const { register, handleSubmit } = useForm<CashTransactionFormData>();

  const handleFormSubmit = async (data: CashTransactionFormData) => {
    try {
      await data;
    } catch (error) {
      // Gérer les erreurs
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <h2>Gestion de Trésorerie</h2>

      <div>
        <label htmlFor="staffId">ID du Personnel</label>
        <input type="number" />
      </div>

      <div>
        <label htmlFor="amount">Montant</label>
        <input type="number" step="0.01" />
      </div>

      <div>
        <label htmlFor="type">Type de Transaction</label>
        <select>
          <option>Revenu</option>
          <option>Dépense</option>
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

      <button type="submit">Ajouter une Transaction</button>
    </form>
  );
};
//<input {...register("staffId", { required: true })} type="number" />
export default CashTransactionForm;
