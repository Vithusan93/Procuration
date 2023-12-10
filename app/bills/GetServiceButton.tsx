import { Button, Dialog, Flex, Table, TextField, Box } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Appointment, Service } from "@prisma/client";

const GetServiceButton = ({
  onServiceSelect,
}: {
  onServiceSelect: (service: Service) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetch(`/api/services?search=${search}`, {
        cache: "no-store",
      });
      const data: Service[] = await response.json();
      setServices(data);
    };
    fetchServices();
  }, [search]);

  return (
    <div className="flex justify-center w-full p-2">
      <Button
        type="button"
        variant="outline"
        color="gray"
        onClick={() => setOpen(true)}
      >
        Select Service
      </Button>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Select Service</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            search for exising service
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <TextField.Root>
              <TextField.Slot>
                <FaSearch />
              </TextField.Slot>
              <TextField.Input
                placeholder="Search services"
                value={search}
                onChange={({ target }) => {
                  setSearch(target.value);
                }}
              />
            </TextField.Root>
          </Flex>

          {services && (
            <Box>
              <Table.Root>
                <Table.Body>
                  {services.map((service) => (
                    <Table.Row
                      key={service.id}
                      onClick={() => {
                        onServiceSelect(service);
                        setOpen(false);
                      }}
                    >
                      <Table.Cell>
                        {service.name} {service.price.toString()}{" "}
                        {service.duration.toString()}
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

export default GetServiceButton;
