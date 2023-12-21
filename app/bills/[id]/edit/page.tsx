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

  const convertedBill = JSON.parse(JSON.stringify(bill));
  console.log("edit", convertedBill);

  return (
    <div className="">
      <BillFormPage bill={convertedBill} />
    </div>
  );
};

export default EditBillPage;

export const dynamic = "force-dynamic";
export const revalidate = 0;
