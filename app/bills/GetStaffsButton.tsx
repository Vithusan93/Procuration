import { Staff } from "@prisma/client";
import { Box, Button, Dialog, Flex, Table, TextField } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const GetStaffButton = ({
  onStaffSelect,
}: {
  onStaffSelect: (staff: Staff) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchStaffs = async () => {
      const response = await fetch(`/api/staffs?search=${search}`, {
        cache: "no-store",
      });
      const data: Staff[] = await response.json();
      setStaffs(data);
    };
    fetchStaffs();
  }, [search]);

  return (
    <div className="flex justify-center w-full p-2">
      <Button
        type="button"
        variant="outline"
        color="gray"
        onClick={() => setOpen(true)}
      >
        Select Staff
      </Button>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>Select Staff</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            search for exising staff
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <TextField.Root>
              <TextField.Slot>
                <FaSearch />
              </TextField.Slot>
              <TextField.Input
                placeholder="Search staffs"
                value={search}
                onChange={({ target }) => {
                  setSearch(target.value);
                }}
              />
            </TextField.Root>
          </Flex>

          {staffs && (
            <Box>
              <Table.Root>
                <Table.Body>
                  {staffs.map((staff) => (
                    <Table.Row
                      key={staff.id}
                      onClick={() => {
                        onStaffSelect(staff);
                        setOpen(false);
                      }}
                    >
                      <Table.Cell>
                        {staff.firstname} {staff.lastname}
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

export default GetStaffButton;
