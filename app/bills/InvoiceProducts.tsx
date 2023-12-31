"use client";
import GetProductButton from "@/components/products/GetProductButton";
import { InvoiceProduct, Product } from "@prisma/client";
import { Box, Button, Flex, Table, Text, TextField } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdDelete, MdEdit } from "react-icons/md";
interface InvoiceProductDetail extends InvoiceProduct {
  product: Product;
}

const InvoiceProducts = ({ invoiceId }: { invoiceId?: number }) => {
  const { register, handleSubmit, setValue, watch } = useForm<InvoiceProduct>();
  const [invoiceProducts, setInvoiceProducts] = useState<
    InvoiceProductDetail[]
  >([]);

  const [product, setProduct] = useState<Product>();

  const quantity = watch("quantity");
  const price = watch("price");

  useEffect(() => {
    if (invoiceId) {
      setValue("billId", invoiceId);
    }
  }, [invoiceId]);

  useEffect(() => {
    const getInvoiceProducts = async () => {
      const response = await fetch(`/api/bills/${invoiceId}/products`, {
        cache: "no-store",
      });
      const data: InvoiceProductDetail[] = await response.json();
      setInvoiceProducts(data);
    };
    if (invoiceId) {
      getInvoiceProducts();
    }
  }, [invoiceId]);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    try {
      const response = await fetch("/api/billsproduct", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.status === 201) {
        const invoiceProduct = await response.json();
        const invoiceProductList = [...invoiceProducts];
        invoiceProductList.push(invoiceProduct);
        setInvoiceProducts(invoiceProductList);
      }
    } catch (error) {}
  });

  const deleteInvoiceProduct = async (invoiceProductId: number) => {
    await fetch("/api/billsproduct/" + invoiceProductId, {
      method: "DELETE",
    });

    setInvoiceProducts(
      invoiceProducts.filter(
        (invoiceProduct) => invoiceProduct.id !== invoiceProductId
      )
    );
  };

  if (invoiceId === undefined) {
    return <div>Products can be added only after the invoice is saved</div>;
  }

  return (
    <div className="bg-purple-100 p-2 rounded-md">
      <div className="text-lg font-semibold">Products</div>
      <Box>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Product</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Quantity</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Price</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Total Price</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {invoiceProducts.length > 0 ? (
              invoiceProducts.map((invoiceProduct) => (
                <Table.Row key={invoiceProduct.id}>
                  <Table.Cell>
                    <span className="font-semibold">
                      {invoiceProduct.product.name}
                    </span>
                  </Table.Cell>
                  <Table.Cell>{invoiceProduct.quantity}</Table.Cell>
                  <Table.Cell>{invoiceProduct.price.toString()}</Table.Cell>
                  <Table.Cell>
                    {(
                      invoiceProduct.quantity *
                      parseFloat(invoiceProduct.price?.toString())
                    ).toFixed(2)}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2">
                      <Button variant="outline" color="gray" type="button">
                        <MdEdit size={20} />
                      </Button>
                      <Button
                        variant="outline"
                        color="red"
                        type="button"
                        onClick={() => {
                          deleteInvoiceProduct(invoiceProduct.id);
                        }}
                      >
                        <MdDelete size={20} />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan={4}>
                  <div className="text-center p-2 text-gray-600 text-lg">
                    <span>No products added</span>
                  </div>
                </Table.Cell>
              </Table.Row>
            )}
            <Table.Row>
              <Table.Cell width={"50%"}>
                <Flex justify={"start"} align={"center"}>
                  <div className="">
                    {product
                      ? product.name
                      : "Click the button to select product"}
                  </div>
                  <div>
                    <GetProductButton
                      onProductSelect={(product) => {
                        setValue("price", product.price);
                        setValue("productId", product.id);
                        setProduct(product);
                      }}
                      buttonLabel={
                        product ? "Change Product" : "Select Product"
                      }
                    />
                  </div>
                </Flex>
              </Table.Cell>
              <Table.Cell>
                <TextField.Input
                  {...register("quantity")}
                  type="number"
                  defaultValue={"1"}
                ></TextField.Input>
              </Table.Cell>
              <Table.Cell>
                <TextField.Input
                  {...register("price")}
                  type="number"
                  min="0.00"
                  step="0.01"
                  defaultValue={"0.00"}
                ></TextField.Input>
              </Table.Cell>
              <Table.Cell>
                <Text>
                  {(quantity * parseFloat(price?.toString())).toFixed(2)}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Button
                  type="button"
                  variant="outline"
                  color="gray"
                  onClick={onSubmit}
                  className="w-full"
                >
                  Add
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Box>
    </div>
  );
};

export default InvoiceProducts;
