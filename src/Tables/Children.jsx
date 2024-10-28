/* eslint-disable react-hooks/exhaustive-deps */
import { EditIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorMode,
  useDisclosure,
  useTheme,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AddChildModal from "../Modals/Child/AddChildModal";
import { useOutletContext } from "react-router";

function Children() {
  const data = useOutletContext();
  const children = data?.children;
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const [searchTerm, setSearchTerm] = useState("");
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isAddModal,
    onOpen: onAddModalOpen,
    onClose: onAddModalClose,
  } = useDisclosure();
  // const {
  //   isOpen: isEditModal,
  //   onOpen: onEditModalOpen,
  //   onClose: onEditModalClose,
  // } = useDisclosure();
  // const {
  //   isOpen: isViewModal,
  //   onOpen: onViewModalOpen,
  //   onClose: onViewModalClose,
  // } = useDisclosure();
  const [filteredData, setFilteredData] = useState(children);

  useEffect(() => {
    setFilteredData(children);
  }, []);
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filteredResults = children.filter(
      (item) =>
        item.fullname.toLowerCase().includes(value.toLowerCase()) ||
        item.certificate_No.includes(value)
    );

    setFilteredData(filteredResults);
  };

  return (
    <Box
      bg={theme.colors.background[colorMode]}
      color={theme.colors.text[colorMode]}
      borderRadius={".4rem"}
      padding={"20px"}
    >
      <Flex py={"10px"} justify={"space-between"}>
        <InputGroup
          bg={theme.colors.primary[colorMode]}
          w={"300px"}
          borderRadius={".4rem"}
          border={"none"}
        >
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            border={"none"}
            outline={"none"}
            placeholder="Search by name/cert no"
            value={searchTerm}
            onChange={handleSearch}
          />
        </InputGroup>
        <Button
          bg={
            "linear-gradient(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)"
          }
          color={"#fff"}
          _hover={{
            bg: "linear-gradient(to bottom right, rgba(33,121,243,1) 25%, rgba(65,202,227,1) 100%)",
          }}
          onClick={onAddModalOpen}
        >
          Add new
        </Button>
        <AddChildModal isOpen={isAddModal} onClose={onAddModalClose} />
      </Flex>
      <Table variant="simple" padding={"8px"}>
        <TableCaption>children</TableCaption>
        <Thead
          borderRadius={".4rem"}
          sx={{
            bg: colorMode === "light" ? "#1A202C" : "#ebf2fa",
            color: colorMode === "light" ? "#ebf2fa" : "#1A202C",
            th: {
              color: colorMode === "light" ? "#ebf2fa" : "#1A202C",
            },
          }}
        >
          <Tr>
            <Th>Cert No</Th>
            <Th>Name </Th>
            <Th>Gender</Th>
            <Th isNumeric>Age</Th>
            <Th isNumeric>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredData.map((element, index) => (
            <Tr key={index}>
              <Td>{element.certificate_No}</Td>
              <Td>{element.fullname}</Td>
              <Td>{element.gender}</Td>
              <Td isNumeric>
                {(() => {
                  const ageParts = element.age.split(",");

                  for (let part of ageParts) {
                    let value = parseInt(part);
                    if (value !== 0) {
                      return part;
                    }
                  }

                  return "0 days";
                })()}
              </Td>
              <Td isNumeric>
                <EditIcon cursor={"pointer"} size={"20px"} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default Children;
