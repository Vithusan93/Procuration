import prisma from "@/prisma/client";

import BillFormPage from "../../BillForm";

interface Props {
  params: { id: string };
}

const EditBillPage = async ({ params }: Props) => {
  const bill = await prisma.bill.findUnique({
    where: { id: parseInt(params.id) },
    include: { customer: true, staff: true },
  });

  if (!bill) return;
  return (
    <div className="max-w-7xl mx-auto">
      <BillFormPage bill={bill} />
    </div>
  );
};

export default EditBillPage;
