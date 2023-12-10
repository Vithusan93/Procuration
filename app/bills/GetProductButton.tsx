import { Button, Dialog, Flex, Table, TextField, Box } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Appointment, Product } from "@prisma/client";

const GetProductButton = ({
  onProductSelect,
}: {
  onProductSelect: (product: Product) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`/api/products?search=${search}`, {
        cache: "no-store",
      });
      const data: Product[] = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, [search]);

  return (
    <div className="flex justify-center w-full p-2">
      <Button
        type="button"
        variant="outline"
        color="gray"
        onClick={() => setOpen(true)}
      >
        Select Product
      </Button>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Select Product</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            search for exising product
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <TextField.Root>
              <TextField.Slot>
                <FaSearch />
              </TextField.Slot>
              <TextField.Input
                placeholder="Search products"
                value={search}
                onChange={({ target }) => {
                  setSearch(target.value);
                }}
              />
            </TextField.Root>
          </Flex>

          {products && (
            <Box>
              <Table.Root>
                <Table.Body>
                  {products.map((product) => (
                    <Table.Row
                      key={product.id}
                      onClick={() => {
                        onProductSelect(product);
                        setOpen(false);
                      }}
                    >
                      <Table.Cell>
                        {product.name} {product.price.toString()}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Box>
          )}

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default GetProductButton;
